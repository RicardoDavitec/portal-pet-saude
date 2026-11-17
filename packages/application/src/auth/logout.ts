import type { SessionStore } from "@portal/ports";
import { hashToken } from "./login";

export async function logoutSessao(deps: {
  sessoes: SessionStore;
  token: string;
}): Promise<void> {
  const sessao = await deps.sessoes.buscarPorTokenHash(hashToken(deps.token));
  if (sessao && !sessao.revogadaEm) {
    await deps.sessoes.revogar(sessao.id);
  }
}
