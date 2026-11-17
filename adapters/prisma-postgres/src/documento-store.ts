import type { PrismaClient } from "@prisma/client";
import type { DocumentoRegistro, DocumentoStore } from "@portal/ports";

function map(d: {
  id: string;
  titulo: string;
  slug: string;
  categoria: string;
  corpoMd: string;
  publicado: boolean;
  versao: string;
  atualizadoEm: Date;
}): DocumentoRegistro {
  return { ...d };
}

export class PrismaDocumentoStore implements DocumentoStore {
  constructor(private readonly prisma: PrismaClient) {}

  async listarPublicados(filtros?: { categoria?: string }): Promise<DocumentoRegistro[]> {
    const rows = await this.prisma.documento.findMany({
      where: {
        publicado: true,
        ...(filtros?.categoria ? { categoria: filtros.categoria } : {}),
      },
      orderBy: { titulo: "asc" },
    });
    return rows.map(map);
  }

  async listarTodos(): Promise<DocumentoRegistro[]> {
    const rows = await this.prisma.documento.findMany({ orderBy: { titulo: "asc" } });
    return rows.map(map);
  }

  async obterPorSlug(slug: string): Promise<DocumentoRegistro | null> {
    const d = await this.prisma.documento.findUnique({ where: { slug } });
    return d ? map(d) : null;
  }

  async obterPorId(id: string): Promise<DocumentoRegistro | null> {
    const d = await this.prisma.documento.findUnique({ where: { id } });
    return d ? map(d) : null;
  }

  async criar(input: {
    titulo: string;
    slug: string;
    categoria: string;
    corpoMd: string;
    publicado?: boolean;
    versao: string;
  }): Promise<DocumentoRegistro> {
    const d = await this.prisma.documento.create({
      data: {
        titulo: input.titulo,
        slug: input.slug,
        categoria: input.categoria,
        corpoMd: input.corpoMd,
        publicado: input.publicado ?? false,
        versao: input.versao,
      },
    });
    return map(d);
  }

  async atualizar(
    id: string,
    patch: Partial<{
      titulo: string;
      slug: string;
      categoria: string;
      corpoMd: string;
      publicado: boolean;
      versao: string;
    }>,
  ): Promise<DocumentoRegistro> {
    const d = await this.prisma.documento.update({ where: { id }, data: patch });
    return map(d);
  }
}
