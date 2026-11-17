import type { PrismaClient } from "@prisma/client";
import type { UsuarioRegistro, UsuarioStore } from "@portal/ports";

function map(u: {
  id: string;
  adSam: string;
  email: string | null;
  nome: string;
  gestorPet: boolean;
  ativo: boolean;
}): UsuarioRegistro {
  return {
    id: u.id,
    adSam: u.adSam,
    email: u.email,
    nome: u.nome,
    gestorPet: u.gestorPet,
    ativo: u.ativo,
  };
}

export class PrismaUsuarioStore implements UsuarioStore {
  constructor(private readonly prisma: PrismaClient) {}

  async upsertPorAdSam(input: {
    adSam: string;
    email?: string;
    nome: string;
  }): Promise<UsuarioRegistro> {
    const u = await this.prisma.usuario.upsert({
      where: { adSam: input.adSam },
      create: {
        adSam: input.adSam,
        email: input.email,
        nome: input.nome,
      },
      update: {
        email: input.email,
        nome: input.nome,
      },
    });
    return map(u);
  }

  async buscarPorId(id: string): Promise<UsuarioRegistro | null> {
    const u = await this.prisma.usuario.findUnique({ where: { id } });
    return u ? map(u) : null;
  }

  async buscarPorAdSam(adSam: string): Promise<UsuarioRegistro | null> {
    const u = await this.prisma.usuario.findUnique({ where: { adSam } });
    return u ? map(u) : null;
  }

  async definirGestorPet(usuarioId: string, gestorPet: boolean): Promise<UsuarioRegistro> {
    const u = await this.prisma.usuario.update({
      where: { id: usuarioId },
      data: { gestorPet },
    });
    return map(u);
  }
}
