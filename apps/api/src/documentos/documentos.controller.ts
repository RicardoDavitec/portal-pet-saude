import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Inject,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from "@nestjs/common";
import type { ContextoAuth } from "@portal/application";
import type { DocumentoStore } from "@portal/ports";
import { AuthGuard } from "../auth/auth.guard";
import { DOCUMENTO_STORE } from "../common/tokens";

type PortalReq = { portalAuth: ContextoAuth };

@Controller("documentos")
@UseGuards(AuthGuard)
export class DocumentosController {
  constructor(@Inject(DOCUMENTO_STORE) private readonly docs: DocumentoStore) {}

  @Get()
  async listar(@Req() req: PortalReq, @Query("todos") todos?: string) {
    if (todos === "1" && req.portalAuth.usuario.gestorPet) {
      return this.docs.listarTodos();
    }
    return this.docs.listarPublicados();
  }

  @Get(":slug")
  async obter(@Param("slug") slug: string, @Req() req: PortalReq) {
    const doc = await this.docs.obterPorSlug(slug);
    if (!doc) throw new NotFoundException();
    if (!doc.publicado && !req.portalAuth.usuario.gestorPet) throw new NotFoundException();
    return doc;
  }

  @Post()
  async criar(
    @Req() req: PortalReq,
    @Body()
    body: {
      titulo: string;
      slug: string;
      categoria: string;
      corpoMd: string;
      versao: string;
      publicado?: boolean;
    },
  ) {
    if (!req.portalAuth.usuario.gestorPet) throw new ForbiddenException();
    return this.docs.criar(body);
  }

  @Patch(":id")
  async atualizar(
    @Req() req: PortalReq,
    @Param("id") id: string,
    @Body()
    body: Partial<{
      titulo: string;
      slug: string;
      categoria: string;
      corpoMd: string;
      versao: string;
      publicado: boolean;
    }>,
  ) {
    if (!req.portalAuth.usuario.gestorPet) throw new ForbiddenException();
    return this.docs.atualizar(id, body);
  }
}
