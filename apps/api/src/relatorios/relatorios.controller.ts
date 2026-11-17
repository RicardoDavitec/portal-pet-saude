import {
  Controller,
  ForbiddenException,
  Get,
  Inject,
  Req,
  UseGuards,
} from "@nestjs/common";
import { menuVisivel, type ContextoAuth } from "@portal/application";
import type { FaqCatalog } from "@portal/ports";
import { AuthGuard } from "../auth/auth.guard";
import { FAQ_CATALOG } from "../common/tokens";

type PortalReq = { portalAuth: ContextoAuth };

@Controller("relatorios")
@UseGuards(AuthGuard)
export class RelatoriosController {
  constructor(@Inject(FAQ_CATALOG) private readonly faqs: FaqCatalog) {}

  @Get("mvp")
  async mvp(@Req() req: PortalReq) {
    const menu = menuVisivel(req.portalAuth);
    if (!menu.relatorios) throw new ForbiddenException();

    let faqCount: number | null = null;
    let g1Status: "ok" | "indisponivel" = "ok";
    try {
      const lista = await this.faqs.listar();
      faqCount = lista.length;
    } catch (e) {
      g1Status = "indisponivel";
    }

    return {
      geradoEm: new Date().toISOString(),
      indicadores: [
        {
          id: "g1_faq_total",
          grupo: "G1",
          titulo: "Total de FAQs no catalogo G1",
          valor: faqCount,
          unidade: "itens",
          status: g1Status,
          nota:
            g1Status === "ok"
              ? "Indicador MVP via adapter FaqCatalog (REQ-008)."
              : "G1 indisponivel — placeholder explicito; portal permanece operacional.",
        },
        {
          id: "g2_g5_placeholder",
          grupo: "G2-G5",
          titulo: "Indicadores demais grupos",
          valor: null,
          unidade: null,
          status: "placeholder",
          nota: "Aguardando certificados/APIs dos grupos (placeholders F2.S5.P3).",
        },
      ],
    };
  }
}
