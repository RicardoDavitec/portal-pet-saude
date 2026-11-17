/** Port de saída — catálogo de FAQs do G1 (adapter Nest). ADR-003. */

export type FaqResumo = {
  id: string;
  pergunta: string;
  resposta?: string;
  categoria?: string;
};

export type ConversaResumo = {
  id: string;
  iniciadaEm?: string;
  situacao?: string;
};

export interface FaqCatalog {
  listar(filtros?: { busca?: string }): Promise<FaqResumo[]>;
  obter(id: string): Promise<FaqResumo | null>;
  criar?(input: { pergunta: string; resposta: string; categoria?: string }): Promise<FaqResumo>;
  atualizar?(input: {
    id: string;
    pergunta?: string;
    resposta?: string;
    categoria?: string;
  }): Promise<FaqResumo>;
}

export interface ChatbotAnalytics {
  listarConversas(filtros?: { situacao?: string }): Promise<ConversaResumo[]>;
  obterConversa(id: string): Promise<unknown | null>;
}
