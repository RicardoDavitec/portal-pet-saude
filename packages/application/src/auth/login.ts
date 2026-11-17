import { createHash, randomBytes } from "crypto";
import type { UserDirectory, SessionStore, UsuarioStore } from "@portal/ports";

export type LoginResult = {
  token: string;
  usuario: {
    id: string;
    adSam: string;
    nome: string;
    email: string | null;
    gestorPet: boolean;
  };
  expiraEm: Date;
};

export function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

export async function loginComDiretorio(deps: {
  directory: UserDirectory;
  usuarios: UsuarioStore;
  sessoes: SessionStore;
  usuario: string;
  senha: string;
  userAgent?: string;
  ttlHours?: number;
}): Promise<LoginResult | null> {
  const identidade = await deps.directory.autenticar(deps.usuario, deps.senha);
  if (!identidade) return null;

  const usuario = await deps.usuarios.upsertPorAdSam({
    adSam: identidade.samAccountName,
    email: identidade.email,
    nome: identidade.displayName,
  });
  if (!usuario.ativo) return null;

  const token = randomBytes(32).toString("hex");
  const ttl = deps.ttlHours ?? 8;
  const expiraEm = new Date(Date.now() + ttl * 60 * 60 * 1000);
  await deps.sessoes.criar({
    usuarioId: usuario.id,
    tokenHash: hashToken(token),
    expiraEm,
    userAgent: deps.userAgent,
  });

  return {
    token,
    usuario: {
      id: usuario.id,
      adSam: usuario.adSam,
      nome: usuario.nome,
      email: usuario.email,
      gestorPet: usuario.gestorPet,
    },
    expiraEm,
  };
}
