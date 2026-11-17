import type { GrupoPet, PapelGrupo } from "@portal/domain";
import type { SessionStore, UsuarioStore, VinculoStore, VinculoRegistro } from "@portal/ports";

export class DominioVinculoError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DominioVinculoError";
  }
}

export async function promoverGestorPet(deps: {
  usuarios: UsuarioStore;
  vinculos: VinculoStore;
  sessoes: SessionStore;
  atorId: string;
  alvoUsuarioId: string;
}): Promise<void> {
  const antes = await deps.usuarios.buscarPorId(deps.alvoUsuarioId);
  if (!antes) throw new DominioVinculoError("Usuario nao encontrado");
  const encerrados = await deps.vinculos.encerrarTodosDoUsuario(deps.alvoUsuarioId, new Date());
  const depois = await deps.usuarios.definirGestorPet(deps.alvoUsuarioId, true);
  await deps.sessoes.revogarTodasDoUsuario(deps.alvoUsuarioId);
  await deps.vinculos.registrarAuditoria({
    atorId: deps.atorId,
    acao: "promover_gestor_pet",
    antes: { gestorPet: antes.gestorPet, vinculosEncerrados: encerrados },
    depois: { gestorPet: depois.gestorPet },
  });
}

export async function criarVinculoComRegras(deps: {
  usuarios: UsuarioStore;
  vinculos: VinculoStore;
  atorId: string;
  usuarioId: string;
  grupo: GrupoPet;
  papel: PapelGrupo;
  inicio: Date;
  fim?: Date | null;
}): Promise<VinculoRegistro> {
  const usuario = await deps.usuarios.buscarPorId(deps.usuarioId);
  if (!usuario) throw new DominioVinculoError("Usuario nao encontrado");
  if (usuario.gestorPet) {
    throw new DominioVinculoError("Gestor PET nao mantem vinculo de grupo (RN-002)");
  }

  const ativos = await deps.vinculos.listarPorUsuario(deps.usuarioId, true);
  const noGrupo = ativos.filter((v) => v.grupo === deps.grupo);

  if (deps.papel === "tutor") {
    for (const v of noGrupo) {
      if (v.papel === "participante") {
        await deps.vinculos.atualizar(v.id, { ativo: false, fim: new Date() });
        await deps.vinculos.registrarAuditoria({
          atorId: deps.atorId,
          vinculoId: v.id,
          acao: "encerrar_participante_por_tutor",
          antes: v,
          depois: { ativo: false },
        });
      }
    }
  }
  if (deps.papel === "participante") {
    if (noGrupo.some((v) => v.papel === "tutor")) {
      throw new DominioVinculoError(
        "Tutor ja implica participante; nao criar participante separado (RN-003)",
      );
    }
  }

  const criado = await deps.vinculos.criar({
    usuarioId: deps.usuarioId,
    grupo: deps.grupo,
    papel: deps.papel,
    inicio: deps.inicio,
    fim: deps.fim ?? null,
  });
  await deps.vinculos.registrarAuditoria({
    atorId: deps.atorId,
    vinculoId: criado.id,
    acao: "criar_vinculo",
    depois: criado,
  });
  return criado;
}

export async function desativarVinculoComAuditoria(deps: {
  vinculos: VinculoStore;
  sessoes: SessionStore;
  atorId: string;
  vinculoId: string;
  usuarioId: string;
}): Promise<VinculoRegistro> {
  const atualizado = await deps.vinculos.atualizar(deps.vinculoId, {
    ativo: false,
    fim: new Date(),
  });
  await deps.vinculos.registrarAuditoria({
    atorId: deps.atorId,
    vinculoId: deps.vinculoId,
    acao: "desativar_vinculo",
    depois: atualizado,
  });
  await deps.sessoes.revogarTodasDoUsuario(deps.usuarioId);
  return atualizado;
}
