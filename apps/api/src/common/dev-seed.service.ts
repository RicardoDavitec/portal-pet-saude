import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import type { DocumentoStore, UsuarioStore, VinculoStore } from "@portal/ports";
import { DOCUMENTO_STORE, USUARIO_STORE, VINCULO_STORE } from "./tokens";

@Injectable()
export class DevSeedService implements OnModuleInit {
  constructor(
    @Inject(USUARIO_STORE) private readonly usuarios: UsuarioStore,
    @Inject(VINCULO_STORE) private readonly vinculos: VinculoStore,
    @Inject(DOCUMENTO_STORE) private readonly documentos: DocumentoStore,
  ) {}

  async onModuleInit() {
    if ((process.env.AUTH_MODE ?? "dev") !== "dev") {
      await this.ensureDocumentosBase();
      return;
    }
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
    await this.ensureDocumentosBase();
  }

  private async ensureDocumentosBase() {
    const seeds = [
      {
        slug: "politica-lgpd-portal",
        titulo: "Politica de privacidade (LGPD)",
        categoria: "lgpd",
        versao: "1.0.0",
        corpoMd:
          "## Escopo\n\nTratamento de dados no Portal PET Saude Digital.\n\n## Bases legais\n\nExecucao de politicas publicas e consentimento quando aplicavel.\n\nVer inventario `docs/09_dados_e_tabelas/lgpd/lgp_001_portal_e_g1.md`.",
      },
      {
        slug: "sobre-o-edital-pet",
        titulo: "Edital PET Saude / I&SD — sintese",
        categoria: "normativa",
        versao: "1.0.0",
        corpoMd:
          "## Programa\n\nO portal organiza governanca dos cinco grupos do PET Saude Digital 2025.\n\n## Acesso\n\nAutenticacao AD municipal; menu filtrado por vinculo (RN-001).",
      },
      {
        slug: "guia-uso-rapido",
        titulo: "Guia de uso rapido",
        categoria: "politica",
        versao: "1.0.0",
        corpoMd:
          "## Entrar\n\nUse a conta municipal.\n\n## Sem vinculo\n\nDocumentos e Sobre permanecem disponiveis.\n\n## G1\n\nFAQ e dashboard via adapter Nest.",
      },
    ];
    for (const s of seeds) {
      const existing = await this.documentos.obterPorSlug(s.slug);
      if (existing) continue;
      await this.documentos.criar({ ...s, publicado: true });
    }
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
