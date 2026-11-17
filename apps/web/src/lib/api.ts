const API_BASE = import.meta.env.VITE_API_URL ?? "";

export type MeResponse = {
  usuario: {
    id: string;
    adSam: string;
    nome: string;
    email: string | null;
    gestorPet: boolean;
  };
  vinculos: Array<{ id: string; grupo: string; papel: string; ativo: boolean }>;
  menu: {
    grupos: string[];
    cadastros: boolean;
    configuracoes: boolean;
    relatorios: boolean;
    documentos: boolean;
    sobre: boolean;
  };
  g1: { lerFaq: boolean; escreverFaq: boolean; verPii: boolean };
  ipCliente?: string | null;
};

function authHeaders(): HeadersInit {
  const token = localStorage.getItem("portal_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function login(usuario: string, senha: string) {
  const res = await fetch(`${API_BASE}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ usuario, senha }),
  });
  if (!res.ok) throw new Error("Credenciais invalidas");
  return res.json() as Promise<{ token: string; usuario: MeResponse["usuario"] }>;
}

export async function logout() {
  await fetch(`${API_BASE}/api/auth/logout`, {
    method: "POST",
    headers: { ...authHeaders() },
  });
  localStorage.removeItem("portal_token");
}

export async function fetchMe(): Promise<MeResponse> {
  const res = await fetch(`${API_BASE}/api/auth/me`, { headers: { ...authHeaders() } });
  if (!res.ok) throw new Error("Sessao invalida");
  return res.json();
}

export async function fetchFaqs(busca?: string) {
  const q = busca ? `?busca=${encodeURIComponent(busca)}` : "";
  const res = await fetch(`${API_BASE}/api/g1/faqs${q}`, { headers: { ...authHeaders() } });
  if (res.status === 503) throw new Error("Workspace G1 temporariamente indisponivel");
  if (!res.ok) throw new Error("Falha ao listar FAQs");
  return res.json();
}

export async function createFaq(input: { pergunta: string; resposta: string; categoria?: string }) {
  const res = await fetch(`${API_BASE}/api/g1/faqs`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error("Falha ao criar FAQ");
  return res.json();
}

export async function fetchConversas() {
  const res = await fetch(`${API_BASE}/api/g1/conversas`, { headers: { ...authHeaders() } });
  if (res.status === 403) throw new Error("Sem permissao para PII");
  if (res.status === 503) throw new Error("Conversas G1 indisponiveis");
  if (!res.ok) throw new Error("Falha ao listar conversas");
  return res.json();
}

export async function healthcheck() {
  const res = await fetch(`${API_BASE}/api/health`);
  if (!res.ok) throw new Error("API down");
  return res.json();
}

export type Documento = {
  id: string;
  titulo: string;
  slug: string;
  categoria: string;
  corpoMd: string;
  publicado: boolean;
  versao: string;
  atualizadoEm: string;
};

export async function fetchDocumentos(todos = false): Promise<Documento[]> {
  const q = todos ? "?todos=1" : "";
  const res = await fetch(`${API_BASE}/api/documentos${q}`, { headers: { ...authHeaders() } });
  if (!res.ok) throw new Error("Falha ao listar documentos");
  return res.json();
}

export async function fetchDocumento(slug: string): Promise<Documento> {
  const res = await fetch(`${API_BASE}/api/documentos/${encodeURIComponent(slug)}`, {
    headers: { ...authHeaders() },
  });
  if (!res.ok) throw new Error("Documento nao encontrado");
  return res.json();
}

export async function createDocumento(input: {
  titulo: string;
  slug: string;
  categoria: string;
  corpoMd: string;
  versao: string;
  publicado?: boolean;
}): Promise<Documento> {
  const res = await fetch(`${API_BASE}/api/documentos`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error("Falha ao criar documento");
  return res.json();
}

export type SobrePayload = {
  titulo: string;
  descricao: string;
  dominio: string;
  chatCidadao: string;
  espelhoDashboardG1: string;
  releases: Array<{ versao: string; data: string; notas: string }>;
  repositorios: Array<{ grupo: string; nome: string; status: string; url: string | null }>;
  notaGitness: string;
};

export async function fetchSobre(): Promise<SobrePayload> {
  const res = await fetch(`${API_BASE}/api/sobre`, { headers: { ...authHeaders() } });
  if (!res.ok) throw new Error("Falha ao carregar Sobre");
  return res.json();
}

export type RelatorioMvp = {
  geradoEm: string;
  indicadores: Array<{
    id: string;
    grupo: string;
    titulo: string;
    valor: number | null;
    unidade: string | null;
    status: string;
    nota: string;
  }>;
};

export async function fetchRelatoriosMvp(): Promise<RelatorioMvp> {
  const res = await fetch(`${API_BASE}/api/relatorios/mvp`, { headers: { ...authHeaders() } });
  if (!res.ok) throw new Error("Falha ao carregar relatorios");
  return res.json();
}
