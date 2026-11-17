/** Port de saída — diretório de usuários (AD). ADR-002. */

export type IdentidadeAd = {
  samAccountName: string;
  email?: string;
  displayName: string;
};

export interface UserDirectory {
  autenticar(usuario: string, senha: string): Promise<IdentidadeAd | null>;
}
