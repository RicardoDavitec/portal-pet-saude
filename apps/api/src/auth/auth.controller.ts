import {
  Body,
  Controller,
  Get,
  Headers,
  Inject,
  Post,
  Req,
  UnauthorizedException,
} from "@nestjs/common";
import type { Request } from "express";
import {
  loginComDiretorio,
  logoutSessao,
  resolverSessao,
  menuVisivel,
  permsG1,
} from "@portal/application";
import type { UserDirectory, SessionStore, UsuarioStore, VinculoStore } from "@portal/ports";
import {
  SESSION_STORE,
  USER_DIRECTORY,
  USUARIO_STORE,
  VINCULO_STORE,
} from "../common/infrastructure.module";

@Controller("auth")
export class AuthController {
  constructor(
    @Inject(USER_DIRECTORY) private readonly directory: UserDirectory,
    @Inject(USUARIO_STORE) private readonly usuarios: UsuarioStore,
    @Inject(SESSION_STORE) private readonly sessoes: SessionStore,
    @Inject(VINCULO_STORE) private readonly vinculos: VinculoStore,
  ) {}

  @Post("login")
  async login(
    @Body() body: { usuario?: string; senha?: string },
    @Req() req: Request,
  ) {
    const usuario = body.usuario?.trim();
    const senha = body.senha ?? "";
    if (!usuario || !senha) throw new UnauthorizedException();
    const result = await loginComDiretorio({
      directory: this.directory,
      usuarios: this.usuarios,
      sessoes: this.sessoes,
      usuario,
      senha,
      userAgent: req.headers["user-agent"],
    });
    if (!result) throw new UnauthorizedException();
    return {
      token: result.token,
      expiraEm: result.expiraEm,
      usuario: result.usuario,
    };
  }

  @Post("logout")
  async logout(@Headers("authorization") authorization?: string) {
    const token = bearer(authorization);
    if (token) {
      await logoutSessao({ sessoes: this.sessoes, token });
    }
    return { ok: true };
  }

  @Get("me")
  async me(@Headers("authorization") authorization?: string) {
    const token = bearer(authorization);
    if (!token) throw new UnauthorizedException();
    const sessao = await resolverSessao({
      sessoes: this.sessoes,
      usuarios: this.usuarios,
      vinculos: this.vinculos,
      token,
    });
    if (!sessao) throw new UnauthorizedException();
    const ctx = { usuario: sessao.usuario, vinculos: sessao.vinculos };
    return {
      usuario: sessao.usuario,
      vinculos: sessao.vinculos,
      menu: menuVisivel(ctx),
      g1: permsG1(ctx),
    };
  }
}

function bearer(authorization?: string): string | null {
  if (!authorization?.startsWith("Bearer ")) return null;
  return authorization.slice(7).trim() || null;
}
