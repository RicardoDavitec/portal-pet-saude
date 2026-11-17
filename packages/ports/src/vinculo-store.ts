import type { GrupoPet, PapelGrupo } from "@portal/domain";

export type VinculoRegistro = {
  id: string;
  usuarioId: string;
  grupo: GrupoPet;
  papel: PapelGrupo;
  ativo: boolean;
  inicio: Date;
  fim: Date | null;
};

export type AuditoriaVinculoInput = {
  atorId: string;
  vinculoId?: string | null;
  acao: string;
  antes?: unknown;
  depois?: unknown;
};

export interface VinculoStore {
  listarPorUsuario(usuarioId: string, apenasAtivos?: boolean): Promise<VinculoRegistro[]>;
  listar(filtros?: { grupo?: GrupoPet; ativo?: boolean }): Promise<VinculoRegistro[]>;
  criar(input: {
    usuarioId: string;
    grupo: GrupoPet;
    papel: PapelGrupo;
    inicio: Date;
    fim?: Date | null;
  }): Promise<VinculoRegistro>;
  atualizar(
    id: string,
    patch: Partial<{ papel: PapelGrupo; ativo: boolean; fim: Date | null }>,
  ): Promise<VinculoRegistro>;
  encerrarTodosDoUsuario(usuarioId: string, fim: Date): Promise<number>;
  registrarAuditoria(input: AuditoriaVinculoInput): Promise<void>;
}
