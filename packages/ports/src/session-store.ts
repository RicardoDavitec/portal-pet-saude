export type SessaoRegistro = {
  id: string;
  usuarioId: string;
  tokenHash: string;
  criadaEm: Date;
  expiraEm: Date;
  revogadaEm: Date | null;
  userAgent?: string | null;
};

export interface SessionStore {
  criar(input: {
    usuarioId: string;
    tokenHash: string;
    expiraEm: Date;
    userAgent?: string;
  }): Promise<SessaoRegistro>;
  buscarPorTokenHash(tokenHash: string): Promise<SessaoRegistro | null>;
  revogar(id: string): Promise<void>;
  revogarTodasDoUsuario(usuarioId: string): Promise<void>;
}
