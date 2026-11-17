import type { ChatbotAnalytics, ConversaResumo, FaqCatalog, FaqResumo } from "@portal/ports";

export type G1HttpConfig = {
  baseUrl: string;
  serviceToken?: string;
};

/**
 * Adapter HTTP ao Nest Dashboard G1 (ADR-003).
 * Falhas de rede propagam para o BFF isolar no workspace (REQ-006).
 */
export class G1DashboardHttpAdapter implements FaqCatalog, ChatbotAnalytics {
  constructor(private readonly cfg: G1HttpConfig) {}

  private async request<T>(path: string, init?: RequestInit): Promise<T> {
    const headers: Record<string, string> = {
      Accept: "application/json",
      ...(init?.headers as Record<string, string> | undefined),
    };
    if (this.cfg.serviceToken) {
      headers.Authorization = `Bearer ${this.cfg.serviceToken}`;
    }
    if (init?.body && !headers["Content-Type"]) {
      headers["Content-Type"] = "application/json";
    }
    const res = await fetch(`${this.cfg.baseUrl.replace(/\/$/, "")}${path}`, {
      ...init,
      headers,
    });
    if (!res.ok) {
      throw new Error(`HTTP ${res.status} em ${path}`);
    }
    if (res.status === 204) return undefined as T;
    return (await res.json()) as T;
  }

  async listar(filtros?: { busca?: string }): Promise<FaqResumo[]> {
    const q = filtros?.busca ? `?search=${encodeURIComponent(filtros.busca)}` : "";
    const data = await this.request<unknown>(`/faqs${q}`);
    return normalizarListaFaq(data);
  }

  async obter(id: string): Promise<FaqResumo | null> {
    try {
      const data = await this.request<Record<string, unknown>>(`/faqs/${encodeURIComponent(id)}`);
      return mapFaq(data);
    } catch {
      return null;
    }
  }

  async criar(input: {
    pergunta: string;
    resposta: string;
    categoria?: string;
  }): Promise<FaqResumo> {
    const data = await this.request<Record<string, unknown>>("/faqs", {
      method: "POST",
      body: JSON.stringify({
        question: input.pergunta,
        answer: input.resposta,
        category: input.categoria,
      }),
    });
    return mapFaq(data);
  }

  async atualizar(input: {
    id: string;
    pergunta?: string;
    resposta?: string;
    categoria?: string;
  }): Promise<FaqResumo> {
    const data = await this.request<Record<string, unknown>>("/faqs", {
      method: "PUT",
      body: JSON.stringify({
        id: input.id,
        question: input.pergunta,
        answer: input.resposta,
        category: input.categoria,
      }),
    });
    return mapFaq(data);
  }

  async listarConversas(filtros?: { situacao?: string }): Promise<ConversaResumo[]> {
    const q = filtros?.situacao ? `?situacao=${encodeURIComponent(filtros.situacao)}` : "";
    const data = await this.request<unknown>(`/conversas${q}`);
    if (Array.isArray(data)) {
      return data.map((c) => {
        const row = c as Record<string, unknown>;
        return {
          id: String(row.id ?? row._id ?? ""),
          iniciadaEm: row.createdAt ? String(row.createdAt) : undefined,
          situacao: row.situacao ? String(row.situacao) : undefined,
        };
      });
    }
    if (data && typeof data === "object" && Array.isArray((data as { items?: unknown }).items)) {
      return ((data as { items: unknown[] }).items).map((c) => {
        const row = c as Record<string, unknown>;
        return { id: String(row.id ?? row._id ?? "") };
      });
    }
    return [];
  }

  async obterConversa(id: string): Promise<unknown | null> {
    try {
      return await this.request(`/conversas/${encodeURIComponent(id)}`);
    } catch {
      return null;
    }
  }
}

function normalizarListaFaq(data: unknown): FaqResumo[] {
  const arr = Array.isArray(data)
    ? data
    : data && typeof data === "object" && Array.isArray((data as { items?: unknown }).items)
      ? (data as { items: unknown[] }).items
      : data && typeof data === "object" && Array.isArray((data as { data?: unknown }).data)
        ? (data as { data: unknown[] }).data
        : [];
  return arr.map((x) => mapFaq(x as Record<string, unknown>));
}

function mapFaq(row: Record<string, unknown>): FaqResumo {
  return {
    id: String(row.id ?? row._id ?? ""),
    pergunta: String(row.question ?? row.pergunta ?? ""),
    resposta: row.answer != null ? String(row.answer) : row.resposta != null ? String(row.resposta) : undefined,
    categoria: row.category != null ? String(row.category) : row.categoria != null ? String(row.categoria) : undefined,
  };
}
