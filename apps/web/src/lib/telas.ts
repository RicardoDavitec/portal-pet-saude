import { nomeGrupo } from "./grupos";

/** Descritor formal da tela/painel aberto (rodapé Bot_Pan). */
export function descritorTela(pathname: string): string {
  const path = pathname.replace(/\/+$/, "") || "/";
  if (path === "/" || path === "") return "Início";
  if (path.startsWith("/g1")) return `Workspace ${nomeGrupo("G1")} — FAQ / Dashboard`;
  if (path === "/g2") return `Workspace ${nomeGrupo("G2")} — placeholder`;
  if (path === "/g3") return `Workspace ${nomeGrupo("G3")} — placeholder`;
  if (path === "/g4") return `Workspace ${nomeGrupo("G4")} — placeholder`;
  if (path === "/g5") return `Workspace ${nomeGrupo("G5")} — gap`;
  if (path === "/cadastros") return "Cadastros — vínculos usuário × grupo × papel";
  if (path === "/relatorios") return "Relatórios PET — indicadores MVP";
  if (path === "/config") return "Configurações do portal";
  if (path === "/documentos") return "Documentos públicos";
  if (path.startsWith("/documentos/")) return "Documentos públicos — leitura";
  if (path === "/sobre") return "Sobre o Portal PET Saúde Digital";
  return path;
}
