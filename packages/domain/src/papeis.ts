/** Papéis institucionais PET — ver GLO-001 e RN-002/RN-003. */

export type GrupoPet = "G1" | "G2" | "G3" | "G4" | "G5";

export type PapelGrupo =
  | "coordenador_grupo"
  | "tutor"
  | "preceptor"
  | "orientador_servico"
  | "monitor"
  | "participante";

export type PapelGlobal = "gestor_pet";

/** Tutor implica participante (RN-003). */
export function ehParticipante(papel: PapelGrupo): boolean {
  return papel === "participante" || papel === "tutor";
}

/** Escrita de FAQ no G1 (RN-004). */
export function podeEscreverFaqG1(opts: {
  gestorPet: boolean;
  papelNoG1?: PapelGrupo;
}): boolean {
  if (opts.gestorPet) return true;
  return opts.papelNoG1 === "coordenador_grupo" || opts.papelNoG1 === "tutor";
}

/** Leitura de FAQ no G1. */
export function podeLerFaqG1(opts: {
  gestorPet: boolean;
  papelNoG1?: PapelGrupo;
}): boolean {
  if (opts.gestorPet) return true;
  return opts.papelNoG1 !== undefined;
}

/** Conversas/PII G1. */
export function podeVerPiiG1(opts: {
  gestorPet: boolean;
  papelNoG1?: PapelGrupo;
}): boolean {
  if (opts.gestorPet) return true;
  return opts.papelNoG1 === "coordenador_grupo" || opts.papelNoG1 === "tutor";
}
