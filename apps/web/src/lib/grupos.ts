/** Nomes formais — GLO-001. */
export type CodigoGrupo = "G1" | "G2" | "G3" | "G4" | "G5";

export const GRUPOS_PET: Record<
  CodigoGrupo,
  { codigo: CodigoGrupo; nome: string; tituloMenu: string }
> = {
  G1: { codigo: "G1", nome: "ChatBot", tituloMenu: "G1 — ChatBot" },
  G2: { codigo: "G2", nome: "Dashboard Serviços", tituloMenu: "G2 — Dashboard Serviços" },
  G3: { codigo: "G3", nome: "Totem", tituloMenu: "G3 — Totem" },
  G4: { codigo: "G4", nome: "Vacinas", tituloMenu: "G4 — Vacinas" },
  G5: { codigo: "G5", nome: "Educação Permanente", tituloMenu: "G5 — Educação Permanente" },
};

export function rotuloGrupo(codigo: string): string {
  const g = GRUPOS_PET[codigo as CodigoGrupo];
  return g ? g.tituloMenu : codigo;
}

export function nomeGrupo(codigo: string): string {
  const g = GRUPOS_PET[codigo as CodigoGrupo];
  return g ? `${g.codigo} — ${g.nome}` : codigo;
}
