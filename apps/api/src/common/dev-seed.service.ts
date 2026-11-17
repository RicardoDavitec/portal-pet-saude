import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import type { UsuarioStore, VinculoStore } from "@portal/ports";
import { USUARIO_STORE, VINCULO_STORE } from "./tokens";

@Injectable()
export class DevSeedService implements OnModuleInit {
  constructor(
    @Inject(USUARIO_STORE) private readonly usuarios: UsuarioStore,
    @Inject(VINCULO_STORE) private readonly vinculos: VinculoStore,
  ) {}

  async onModuleInit() {
    if ((process.env.AUTH_MODE ?? "dev") !== "dev") return;
    const gestor = await this.usuarios.upsertPorAdSam({
      adSam: "gestor",
      nome: "Gestor PET Dev",
      email: "gestor@local",
    });
    if (!gestor.gestorPet) {
      await this.usuarios.definirGestorPet(gestor.id, true);
    }

    const coord = await this.usuarios.upsertPorAdSam({
      adSam: "coordg1",
      nome: "Coord G1 Dev",
      email: "coord@local",
    });
    const tutor = await this.usuarios.upsertPorAdSam({
      adSam: "tutor",
      nome: "Tutor G1 Dev",
      email: "tutor@local",
    });
    const leitor = await this.usuarios.upsertPorAdSam({
      adSam: "leitor",
      nome: "Participante G1 Dev",
      email: "leitor@local",
    });

    await ensureVinculo(this.vinculos, coord.id, "G1", "coordenador_grupo");
    await ensureVinculo(this.vinculos, tutor.id, "G1", "tutor");
    await ensureVinculo(this.vinculos, leitor.id, "G1", "participante");
  }
}

async function ensureVinculo(
  store: VinculoStore,
  usuarioId: string,
  grupo: "G1",
  papel: "coordenador_grupo" | "tutor" | "participante",
) {
  const existentes = await store.listarPorUsuario(usuarioId, true);
  if (existentes.some((v) => v.grupo === grupo && v.papel === papel)) return;
  await store.criar({
    usuarioId,
    grupo,
    papel,
    inicio: new Date(),
  });
}
