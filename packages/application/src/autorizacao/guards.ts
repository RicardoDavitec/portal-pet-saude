import type { GrupoPet, PapelGrupo } from "@portal/domain";
import { podeEscreverFaqG1, podeLerFaqG1, podeVerPiiG1 } from "@portal/domain";
import type { VinculoRegistro, UsuarioRegistro } from "@portal/ports";

export type ContextoAuth = {
  usuario: UsuarioRegistro;
  vinculos: VinculoRegistro[];
};

export function papelNoGrupo(ctx: ContextoAuth, grupo: GrupoPet): PapelGrupo | undefined {
  return ctx.vinculos.find((v) => v.grupo === grupo && v.ativo)?.papel;
}

export function podeGerirCadastros(ctx: ContextoAuth, grupoAlvo?: GrupoPet): boolean {
  if (ctx.usuario.gestorPet) return true;
  if (!grupoAlvo) return false;
  return papelNoGrupo(ctx, grupoAlvo) === "coordenador_grupo";
}

export function podeAcessarGrupo(ctx: ContextoAuth, grupo: GrupoPet): boolean {
  if (ctx.usuario.gestorPet) return true;
  return papelNoGrupo(ctx, grupo) !== undefined;
}

export function menuVisivel(ctx: ContextoAuth): {
  grupos: GrupoPet[];
  cadastros: boolean;
  configuracoes: boolean;
  relatorios: boolean;
  documentos: boolean;
  sobre: boolean;
} {
  const todos: GrupoPet[] = ["G1", "G2", "G3", "G4", "G5"];
  const grupos = ctx.usuario.gestorPet
    ? todos
    : todos.filter((g) => papelNoGrupo(ctx, g) !== undefined);
  const temVinculo = grupos.length > 0 || ctx.usuario.gestorPet;
  return {
    grupos,
    cadastros: ctx.usuario.gestorPet || ctx.vinculos.some((v) => v.papel === "coordenador_grupo"),
    configuracoes: ctx.usuario.gestorPet,
    relatorios: temVinculo,
    documentos: true,
    sobre: true,
  };
}

export function permsG1(ctx: ContextoAuth) {
  const papel = papelNoGrupo(ctx, "G1");
  const opts = { gestorPet: ctx.usuario.gestorPet, papelNoG1: papel };
  return {
    lerFaq: podeLerFaqG1(opts),
    escreverFaq: podeEscreverFaqG1(opts),
    verPii: podeVerPiiG1(opts),
  };
}

export function traduzirPapelNestG1(ctx: ContextoAuth): "admin" | "editor" | "leitor" | null {
  const p = permsG1(ctx);
  if (p.verPii) return "admin";
  if (p.escreverFaq) return "editor";
  if (p.lerFaq) return "leitor";
  return null;
}
