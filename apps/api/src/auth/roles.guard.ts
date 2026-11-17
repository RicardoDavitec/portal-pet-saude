import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  SetMetadata,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import {
  podeAcessarGrupo,
  podeGerirCadastros,
  permsG1,
  type ContextoAuth,
} from "@portal/application";
import type { GrupoPet } from "@portal/domain";

export const REQUIRE_GESTOR = "require_gestor";
export const REQUIRE_CADASTROS_GRUPO = "require_cadastros_grupo";
export const REQUIRE_G1_PERM = "require_g1_perm";
export const REQUIRE_GRUPO = "require_grupo";

export const RequireGestor = () => SetMetadata(REQUIRE_GESTOR, true);
export const RequireCadastrosGrupo = () => SetMetadata(REQUIRE_CADASTROS_GRUPO, true);
export const RequireG1Perm = (perm: "lerFaq" | "escreverFaq" | "verPii") =>
  SetMetadata(REQUIRE_G1_PERM, perm);
export const RequireGrupo = (grupo: GrupoPet) => SetMetadata(REQUIRE_GRUPO, grupo);

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<{
      portalAuth?: ContextoAuth;
      body?: { grupo?: GrupoPet };
      query?: { grupo?: GrupoPet };
    }>();
    const auth = req.portalAuth;
    if (!auth) throw new ForbiddenException();

    if (this.reflector.getAllAndOverride<boolean>(REQUIRE_GESTOR, [context.getHandler(), context.getClass()])) {
      if (!auth.usuario.gestorPet) throw new ForbiddenException();
    }

    const grupoMeta = this.reflector.getAllAndOverride<GrupoPet>(REQUIRE_GRUPO, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (grupoMeta && !podeAcessarGrupo(auth, grupoMeta)) {
      throw new ForbiddenException();
    }

    if (
      this.reflector.getAllAndOverride<boolean>(REQUIRE_CADASTROS_GRUPO, [
        context.getHandler(),
        context.getClass(),
      ])
    ) {
      const grupo = req.body?.grupo ?? req.query?.grupo;
      if (!podeGerirCadastros(auth, grupo)) throw new ForbiddenException();
    }

    const g1perm = this.reflector.getAllAndOverride<"lerFaq" | "escreverFaq" | "verPii">(
      REQUIRE_G1_PERM,
      [context.getHandler(), context.getClass()],
    );
    if (g1perm) {
      const p = permsG1(auth);
      if (!p[g1perm]) throw new ForbiddenException();
    }

    return true;
  }
}
