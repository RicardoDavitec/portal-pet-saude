import type {
  SessionStore,
  UsuarioStore,
  VinculoStore,
  VinculoRegistro,
  UsuarioRegistro,
} from "@portal/ports";
import { hashToken } from "./login";

export type SessaoAtiva = {
  sessaoId: string;
  usuario: UsuarioRegistro;
  vinculos: VinculoRegistro[];
};

export async function resolverSessao(deps: {
  sessoes: SessionStore;
  usuarios: UsuarioStore;
  vinculos: VinculoStore;
  token: string;
}): Promise<SessaoAtiva | null> {
  const sessao = await deps.sessoes.buscarPorTokenHash(hashToken(deps.token));
  if (!sessao || sessao.revogadaEm) return null;
  if (sessao.expiraEm.getTime() < Date.now()) return null;
  const usuario = await deps.usuarios.buscarPorId(sessao.usuarioId);
  if (!usuario || !usuario.ativo) return null;
  const vinculos = await deps.vinculos.listarPorUsuario(usuario.id, true);
  return { sessaoId: sessao.id, usuario, vinculos };
}
