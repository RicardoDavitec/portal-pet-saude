export type UsuarioRegistro = {
  id: string;
  adSam: string;
  email: string | null;
  nome: string;
  gestorPet: boolean;
  ativo: boolean;
};

export interface UsuarioStore {
  upsertPorAdSam(input: {
    adSam: string;
    email?: string;
    nome: string;
  }): Promise<UsuarioRegistro>;
  buscarPorId(id: string): Promise<UsuarioRegistro | null>;
  buscarPorAdSam(adSam: string): Promise<UsuarioRegistro | null>;
  definirGestorPet(usuarioId: string, gestorPet: boolean): Promise<UsuarioRegistro>;
}
