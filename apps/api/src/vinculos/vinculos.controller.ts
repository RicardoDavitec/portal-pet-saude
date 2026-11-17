import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
  BadRequestException,
} from "@nestjs/common";
import type { GrupoPet, PapelGrupo } from "@portal/domain";
import {
  criarVinculoComRegras,
  desativarVinculoComAuditoria,
  DominioVinculoError,
  podeGerirCadastros,
  promoverGestorPet,
  type ContextoAuth,
} from "@portal/application";
import type { SessionStore, UsuarioStore, VinculoStore } from "@portal/ports";
import { AuthGuard } from "../auth/auth.guard";
import {
  SESSION_STORE,
  USUARIO_STORE,
  VINCULO_STORE,
} from "../common/infrastructure.module";

type PortalReq = { portalAuth: ContextoAuth };

@Controller("vinculos")
@UseGuards(AuthGuard)
export class VinculosController {
  constructor(
    @Inject(USUARIO_STORE) private readonly usuarios: UsuarioStore,
    @Inject(VINCULO_STORE) private readonly vinculos: VinculoStore,
    @Inject(SESSION_STORE) private readonly sessoes: SessionStore,
  ) {}

  @Get()
  async listar(@Req() req: PortalReq, @Query("grupo") grupo?: GrupoPet) {
    const ctx = req.portalAuth;
    if (!podeGerirCadastros(ctx, grupo) && !ctx.usuario.gestorPet) {
      throw new ForbiddenException();
    }
    return this.vinculos.listar({ grupo, ativo: true });
  }

  @Post()
  async criar(
    @Req() req: PortalReq,
    @Body()
    body: {
      usuarioId: string;
      grupo: GrupoPet;
      papel: PapelGrupo;
      inicio?: string;
      fim?: string | null;
    },
  ) {
    const ctx = req.portalAuth;
    if (!podeGerirCadastros(ctx, body.grupo)) throw new ForbiddenException();
    try {
      return await criarVinculoComRegras({
        usuarios: this.usuarios,
        vinculos: this.vinculos,
        atorId: ctx.usuario.id,
        usuarioId: body.usuarioId,
        grupo: body.grupo,
        papel: body.papel,
        inicio: body.inicio ? new Date(body.inicio) : new Date(),
        fim: body.fim ? new Date(body.fim) : null,
      });
    } catch (e) {
      if (e instanceof DominioVinculoError) throw new BadRequestException(e.message);
      throw e;
    }
  }

  @Patch(":id/desativar")
  async desativar(
    @Req() req: PortalReq,
    @Param("id") id: string,
    @Body() body: { usuarioId: string; grupo: GrupoPet },
  ) {
    const ctx = req.portalAuth;
    if (!podeGerirCadastros(ctx, body.grupo)) throw new ForbiddenException();
    return desativarVinculoComAuditoria({
      vinculos: this.vinculos,
      sessoes: this.sessoes,
      atorId: ctx.usuario.id,
      vinculoId: id,
      usuarioId: body.usuarioId,
    });
  }

  @Post("promover-gestor")
  async promover(@Req() req: PortalReq, @Body() body: { usuarioId: string }) {
    if (!req.portalAuth.usuario.gestorPet) throw new ForbiddenException();
    try {
      await promoverGestorPet({
        usuarios: this.usuarios,
        vinculos: this.vinculos,
        sessoes: this.sessoes,
        atorId: req.portalAuth.usuario.id,
        alvoUsuarioId: body.usuarioId,
      });
      return { ok: true };
    } catch (e) {
      if (e instanceof DominioVinculoError) throw new BadRequestException(e.message);
      throw e;
    }
  }
}
