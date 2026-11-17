-- CreateEnum
CREATE TYPE "GrupoPet" AS ENUM ('G1', 'G2', 'G3', 'G4', 'G5');

-- CreateEnum
CREATE TYPE "PapelGrupo" AS ENUM ('coordenador_grupo', 'tutor', 'preceptor', 'orientador_servico', 'monitor', 'participante');

-- CreateTable
CREATE TABLE "usuarios" (
    "id" TEXT NOT NULL,
    "ad_sam" TEXT NOT NULL,
    "email" TEXT,
    "nome" TEXT NOT NULL,
    "gestor_pet" BOOLEAN NOT NULL DEFAULT false,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "usuarios_ad_sam_key" ON "usuarios"("ad_sam");

CREATE TABLE "vinculos_grupo" (
    "id" TEXT NOT NULL,
    "usuario_id" TEXT NOT NULL,
    "grupo" "GrupoPet" NOT NULL,
    "papel" "PapelGrupo" NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "inicio" DATE NOT NULL,
    "fim" DATE,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "vinculos_grupo_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "vinculos_grupo_usuario_id_grupo_idx" ON "vinculos_grupo"("usuario_id", "grupo");

CREATE TABLE "sessoes" (
    "id" TEXT NOT NULL,
    "usuario_id" TEXT NOT NULL,
    "token_hash" TEXT NOT NULL,
    "criada_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expira_em" TIMESTAMP(3) NOT NULL,
    "revogada_em" TIMESTAMP(3),
    "user_agent" TEXT,
    CONSTRAINT "sessoes_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "auditoria_vinculos" (
    "id" TEXT NOT NULL,
    "ator_id" TEXT NOT NULL,
    "vinculo_id" TEXT,
    "acao" TEXT NOT NULL,
    "antes" JSONB,
    "depois" JSONB,
    "em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "auditoria_vinculos_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "documentos" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "categoria" TEXT NOT NULL,
    "corpo_md" TEXT NOT NULL,
    "publicado" BOOLEAN NOT NULL DEFAULT false,
    "versao" TEXT NOT NULL,
    "atualizado_em" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "documentos_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "documentos_slug_key" ON "documentos"("slug");

ALTER TABLE "vinculos_grupo" ADD CONSTRAINT "vinculos_grupo_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "sessoes" ADD CONSTRAINT "sessoes_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "auditoria_vinculos" ADD CONSTRAINT "auditoria_vinculos_ator_id_fkey" FOREIGN KEY ("ator_id") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
