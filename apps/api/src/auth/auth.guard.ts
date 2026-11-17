import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { resolverSessao } from "@portal/application";
import type { SessionStore, UsuarioStore, VinculoStore } from "@portal/ports";
import {
  SESSION_STORE,
  USUARIO_STORE,
  VINCULO_STORE,
} from "../common/infrastructure.module";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(USUARIO_STORE) private readonly usuarios: UsuarioStore,
    @Inject(SESSION_STORE) private readonly sessoes: SessionStore,
    @Inject(VINCULO_STORE) private readonly vinculos: VinculoStore,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<{
      headers: { authorization?: string };
      portalAuth?: unknown;
    }>();
    const header = req.headers.authorization;
    if (!header?.startsWith("Bearer ")) throw new UnauthorizedException();
    const token = header.slice(7).trim();
    const sessao = await resolverSessao({
      sessoes: this.sessoes,
      usuarios: this.usuarios,
      vinculos: this.vinculos,
      token,
    });
    if (!sessao) throw new UnauthorizedException();
    req.portalAuth = { usuario: sessao.usuario, vinculos: sessao.vinculos, sessaoId: sessao.sessaoId };
    return true;
  }
}
