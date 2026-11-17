import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Query,
  Req,
  ServiceUnavailableException,
  UseGuards,
} from "@nestjs/common";
import { permsG1, type ContextoAuth } from "@portal/application";
import type { ChatbotAnalytics, FaqCatalog } from "@portal/ports";
import { AuthGuard } from "../auth/auth.guard";
import { CHATBOT_ANALYTICS, FAQ_CATALOG } from "../common/infrastructure.module";

type PortalReq = { portalAuth: ContextoAuth };

@Controller("g1")
@UseGuards(AuthGuard)
export class G1Controller {
  constructor(
    @Inject(FAQ_CATALOG) private readonly faqs: FaqCatalog,
    @Inject(CHATBOT_ANALYTICS) private readonly analytics: ChatbotAnalytics,
  ) {}

  @Get("faqs")
  async listarFaqs(@Req() req: PortalReq, @Query("busca") busca?: string) {
    const p = permsG1(req.portalAuth);
    if (!p.lerFaq) throw new ForbiddenException();
    try {
      return await this.faqs.listar({ busca });
    } catch (e) {
      throw new ServiceUnavailableException(isolado(e));
    }
  }

  @Get("faqs/:id")
  async obterFaq(@Req() req: PortalReq, @Param("id") id: string) {
    if (!permsG1(req.portalAuth).lerFaq) throw new ForbiddenException();
    try {
      return await this.faqs.obter(id);
    } catch (e) {
      throw new ServiceUnavailableException(isolado(e));
    }
  }

  @Post("faqs")
  async criarFaq(
    @Req() req: PortalReq,
    @Body() body: { pergunta: string; resposta: string; categoria?: string },
  ) {
    if (!permsG1(req.portalAuth).escreverFaq) throw new ForbiddenException();
    if (!this.faqs.criar) throw new ServiceUnavailableException("escrita FAQ indisponivel");
    try {
      return await this.faqs.criar(body);
    } catch (e) {
      throw new ServiceUnavailableException(isolado(e));
    }
  }

  @Put("faqs")
  async atualizarFaq(
    @Req() req: PortalReq,
    @Body() body: { id: string; pergunta?: string; resposta?: string; categoria?: string },
  ) {
    if (!permsG1(req.portalAuth).escreverFaq) throw new ForbiddenException();
    if (!this.faqs.atualizar) throw new ServiceUnavailableException("escrita FAQ indisponivel");
    try {
      return await this.faqs.atualizar(body);
    } catch (e) {
      throw new ServiceUnavailableException(isolado(e));
    }
  }

  @Get("conversas")
  async conversas(@Req() req: PortalReq) {
    if (!permsG1(req.portalAuth).verPii) throw new ForbiddenException();
    try {
      return await this.analytics.listarConversas();
    } catch (e) {
      throw new ServiceUnavailableException(isolado(e));
    }
  }

  @Get("conversas/:id")
  async conversa(@Req() req: PortalReq, @Param("id") id: string) {
    if (!permsG1(req.portalAuth).verPii) throw new ForbiddenException();
    try {
      return await this.analytics.obterConversa(id);
    } catch (e) {
      throw new ServiceUnavailableException(isolado(e));
    }
  }
}

function isolado(e: unknown): string {
  return e instanceof Error ? `G1 indisponivel: ${e.message}` : "G1 indisponivel";
}
