import type { PrismaClient } from "@prisma/client";
import type { SessaoRegistro, SessionStore } from "@portal/ports";

function map(s: {
  id: string;
  usuarioId: string;
  tokenHash: string;
  criadaEm: Date;
  expiraEm: Date;
  revogadaEm: Date | null;
  userAgent: string | null;
}): SessaoRegistro {
  return { ...s };
}

export class PrismaSessionStore implements SessionStore {
  constructor(private readonly prisma: PrismaClient) {}

  async criar(input: {
    usuarioId: string;
    tokenHash: string;
    expiraEm: Date;
    userAgent?: string;
  }): Promise<SessaoRegistro> {
    const s = await this.prisma.sessao.create({
      data: {
        usuarioId: input.usuarioId,
        tokenHash: input.tokenHash,
        expiraEm: input.expiraEm,
        userAgent: input.userAgent,
      },
    });
    return map(s);
  }

  async buscarPorTokenHash(tokenHash: string): Promise<SessaoRegistro | null> {
    const s = await this.prisma.sessao.findFirst({ where: { tokenHash } });
    return s ? map(s) : null;
  }

  async revogar(id: string): Promise<void> {
    await this.prisma.sessao.update({
      where: { id },
      data: { revogadaEm: new Date() },
    });
  }

  async revogarTodasDoUsuario(usuarioId: string): Promise<void> {
    await this.prisma.sessao.updateMany({
      where: { usuarioId, revogadaEm: null },
      data: { revogadaEm: new Date() },
    });
  }
}
