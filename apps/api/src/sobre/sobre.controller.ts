import { Controller, Get, UseGuards } from "@nestjs/common";
import { AuthGuard } from "../auth/auth.guard";

/** Conteúdo institucional + links Gitness (REQ-007 / F2.S5.P2). */
@Controller("sobre")
@UseGuards(AuthGuard)
export class SobreController {
  @Get()
  obter() {
    return {
      titulo: "Portal PET Saude Digital",
      descricao:
        "Painel municipal multi-grupo para governanca, cadastros, workspaces e documentos do PET Saude / I&SD 2025.",
      dominio: "https://petsaude.franca.sp.gov.br",
      chatCidadao: "https://chatbots.franca.sp.gov.br",
      espelhoDashboardG1: "https://dashboard-pet-saude-seven.vercel.app/",
      releases: [
        { versao: "0.1.0", data: "2026-11-17", notas: "F1 documentacao hexagonal" },
        { versao: "0.2.0", data: "2026-11-17", notas: "F2.S1–S4 identidade, shell, adapter G1, ambiente" },
        { versao: "0.3.0", data: "2026-11-17", notas: "F2.S5 documentos, sobre, placeholders, relatorios MVP" },
      ],
      repositorios: [
        { grupo: "G1", nome: "api-chat-bot", status: "ativo", url: null as string | null },
        { grupo: "G1", nome: "Dashboard-PetSaude (Nest)", status: "ativo", url: null },
        { grupo: "G2", nome: "api-painel", status: "ativo", url: null },
        { grupo: "G2", nome: "web-painel", status: "ativo", url: null },
        { grupo: "G3", nome: "totem-api", status: "ativo", url: null },
        { grupo: "G3", nome: "totem-web", status: "ativo", url: null },
        { grupo: "G4", nome: "api-gestao-antirrabica", status: "ativo", url: null },
        { grupo: "G4", nome: "sgar-web", status: "ativo", url: null },
        { grupo: "G5", nome: "(sem repo no inventario Gitness)", status: "gap", url: null },
        { grupo: "portal", nome: "portal-pet-saude", status: "ativo", url: "https://github.com/RicardoDavitec/portal-pet-saude" },
      ],
      notaGitness:
        "URLs internas do Gitness municipal serao preenchidas quando o DTI publicar os endpoints estaveis; nomes seguem o inventario multi-grupos.",
    };
  }
}
