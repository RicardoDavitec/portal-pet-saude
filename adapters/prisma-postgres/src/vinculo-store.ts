import type { PrismaClient, GrupoPet as PGrupo, PapelGrupo as PPapel } from "@prisma/client";
import type { GrupoPet, PapelGrupo } from "@portal/domain";
import type { AuditoriaVinculoInput, VinculoRegistro, VinculoStore } from "@portal/ports";

function map(v: {
  id: string;
  usuarioId: string;
  grupo: PGrupo;
  papel: PPapel;
  ativo: boolean;
  inicio: Date;
  fim: Date | null;
}): VinculoRegistro {
  return {
    id: v.id,
    usuarioId: v.usuarioId,
    grupo: v.grupo as GrupoPet,
    papel: v.papel as PapelGrupo,
    ativo: v.ativo,
    inicio: v.inicio,
    fim: v.fim,
  };
}

export class PrismaVinculoStore implements VinculoStore {
  constructor(private readonly prisma: PrismaClient) {}

  async listarPorUsuario(usuarioId: string, apenasAtivos = false): Promise<VinculoRegistro[]> {
    const rows = await this.prisma.vinculoGrupo.findMany({
      where: { usuarioId, ...(apenasAtivos ? { ativo: true } : {}) },
      orderBy: { criadoEm: "desc" },
    });
    return rows.map(map);
  }

  async listar(filtros?: { grupo?: GrupoPet; ativo?: boolean }): Promise<VinculoRegistro[]> {
    const rows = await this.prisma.vinculoGrupo.findMany({
      where: {
        ...(filtros?.grupo ? { grupo: filtros.grupo as PGrupo } : {}),
        ...(filtros?.ativo !== undefined ? { ativo: filtros.ativo } : {}),
      },
      orderBy: { criadoEm: "desc" },
    });
    return rows.map(map);
  }

  async criar(input: {
    usuarioId: string;
    grupo: GrupoPet;
    papel: PapelGrupo;
    inicio: Date;
    fim?: Date | null;
  }): Promise<VinculoRegistro> {
    const v = await this.prisma.vinculoGrupo.create({
      data: {
        usuarioId: input.usuarioId,
        grupo: input.grupo as PGrupo,
        papel: input.papel as PPapel,
        inicio: input.inicio,
        fim: input.fim ?? null,
      },
    });
    return map(v);
  }

  async atualizar(
    id: string,
    patch: Partial<{ papel: PapelGrupo; ativo: boolean; fim: Date | null }>,
  ): Promise<VinculoRegistro> {
    const v = await this.prisma.vinculoGrupo.update({
      where: { id },
      data: {
        ...(patch.papel ? { papel: patch.papel as PPapel } : {}),
        ...(patch.ativo !== undefined ? { ativo: patch.ativo } : {}),
        ...(patch.fim !== undefined ? { fim: patch.fim } : {}),
      },
    });
    return map(v);
  }

  async encerrarTodosDoUsuario(usuarioId: string, fim: Date): Promise<number> {
    const r = await this.prisma.vinculoGrupo.updateMany({
      where: { usuarioId, ativo: true },
      data: { ativo: false, fim },
    });
    return r.count;
  }

  async registrarAuditoria(input: AuditoriaVinculoInput): Promise<void> {
    await this.prisma.auditoriaVinculo.create({
      data: {
        atorId: input.atorId,
        vinculoId: input.vinculoId ?? null,
        acao: input.acao,
        antes: input.antes as object | undefined,
        depois: input.depois as object | undefined,
      },
    });
  }
}
