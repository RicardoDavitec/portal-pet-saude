import { FormEvent, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  createDocumento,
  fetchDocumento,
  fetchDocumentos,
  type Documento,
  type MeResponse,
} from "../lib/api";

export function DocumentosPage({ me }: { me: MeResponse }) {
  const { slug } = useParams();
  if (slug) return <DocumentoDetalhe slug={slug} />;
  return <DocumentosLista me={me} />;
}

function DocumentosLista({ me }: { me: MeResponse }) {
  const [docs, setDocs] = useState<Documento[]>([]);
  const [erro, setErro] = useState<string | null>(null);
  const [titulo, setTitulo] = useState("");
  const [slugNovo, setSlugNovo] = useState("");
  const [corpoMd, setCorpoMd] = useState("");

  async function carregar() {
    try {
      setErro(null);
      setDocs(await fetchDocumentos(me.usuario.gestorPet));
    } catch (e) {
      setErro(e instanceof Error ? e.message : "Erro");
    }
  }

  useEffect(() => {
    void carregar();
  }, [me.usuario.gestorPet]);

  async function onCreate(e: FormEvent) {
    e.preventDefault();
    await createDocumento({
      titulo,
      slug: slugNovo,
      categoria: "politica",
      corpoMd,
      versao: "1.0.0",
      publicado: true,
    });
    setTitulo("");
    setSlugNovo("");
    setCorpoMd("");
    await carregar();
  }

  return (
    <>
      <h1>Documentos públicos</h1>
      <p className="lead">Normativas, políticas e LGPD — acessível sem vínculo (RN-001 / REQ-007).</p>
      {erro && <div className="error">{erro}</div>}

      <table className="faq-table">
        <thead>
          <tr>
            <th>Título</th>
            <th>Categoria</th>
            <th>Versão</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {docs.map((d) => (
            <tr key={d.id}>
              <td>{d.titulo}</td>
              <td>{d.categoria}</td>
              <td>{d.versao}{!d.publicado ? " (rascunho)" : ""}</td>
              <td>
                <Link to={`/documentos/${d.slug}`}>Abrir</Link>
              </td>
            </tr>
          ))}
          {!docs.length && (
            <tr>
              <td colSpan={4}>Nenhum documento publicado.</td>
            </tr>
          )}
        </tbody>
      </table>

      {me.usuario.gestorPet && (
        <form onSubmit={onCreate} style={{ display: "grid", gap: "0.5rem", marginTop: "1.25rem" }}>
          <h2 style={{ fontFamily: "var(--bp-display)", fontSize: "1.2rem", margin: 0 }}>Novo documento</h2>
          <input placeholder="Título" value={titulo} onChange={(e) => setTitulo(e.target.value)} required />
          <input placeholder="slug-url" value={slugNovo} onChange={(e) => setSlugNovo(e.target.value)} required />
          <textarea
            placeholder="Corpo Markdown"
            value={corpoMd}
            onChange={(e) => setCorpoMd(e.target.value)}
            rows={5}
            required
          />
          <button className="btn" type="submit">
            Publicar
          </button>
        </form>
      )}
    </>
  );
}

function DocumentoDetalhe({ slug }: { slug: string }) {
  const [doc, setDoc] = useState<Documento | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    fetchDocumento(slug)
      .then(setDoc)
      .catch((e) => setErro(e instanceof Error ? e.message : "Erro"));
  }, [slug]);

  if (erro) return <div className="error">{erro}</div>;
  if (!doc) return <p className="lead">Carregando…</p>;

  return (
    <>
      <p className="lead">
        <Link to="/documentos">← Documentos</Link> · {doc.categoria} · v{doc.versao}
      </p>
      <h1>{doc.titulo}</h1>
      <article className="placeholder" style={{ whiteSpace: "pre-wrap" }}>
        {doc.corpoMd}
      </article>
    </>
  );
}
