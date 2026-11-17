export type DocumentoRegistro = {
  id: string;
  titulo: string;
  slug: string;
  categoria: string;
  corpoMd: string;
  publicado: boolean;
  versao: string;
  atualizadoEm: Date;
};

export interface DocumentoStore {
  listarPublicados(filtros?: { categoria?: string }): Promise<DocumentoRegistro[]>;
  listarTodos(): Promise<DocumentoRegistro[]>;
  obterPorSlug(slug: string): Promise<DocumentoRegistro | null>;
  obterPorId(id: string): Promise<DocumentoRegistro | null>;
  criar(input: {
    titulo: string;
    slug: string;
    categoria: string;
    corpoMd: string;
    publicado?: boolean;
    versao: string;
  }): Promise<DocumentoRegistro>;
  atualizar(
    id: string,
    patch: Partial<{
      titulo: string;
      slug: string;
      categoria: string;
      corpoMd: string;
      publicado: boolean;
      versao: string;
    }>,
  ): Promise<DocumentoRegistro>;
}
