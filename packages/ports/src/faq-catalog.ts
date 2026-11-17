/** Port de saída — catálogo de FAQs do G1 (adapter Nest). ADR-003. */

export type FaqResumo = {
  id: string;
  pergunta: string;
  categoria?: string;
};

export interface FaqCatalog {
  listar(filtros?: { busca?: string }): Promise<FaqResumo[]>;
  obter(id: string): Promise<FaqResumo | null>;
}
