import { useEffect, useState } from "react";
import { fetchSobre, type SobrePayload } from "../lib/api";

export function SobrePage() {
  const [data, setData] = useState<SobrePayload | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    fetchSobre()
      .then(setData)
      .catch((e) => setErro(e instanceof Error ? e.message : "Erro"));
  }, []);

  if (erro) return <div className="error">{erro}</div>;
  if (!data) return <p className="lead">Carregando…</p>;

  return (
    <>
      <h1>{data.titulo}</h1>
      <p className="lead">{data.descricao}</p>

      <div className="placeholder" style={{ marginBottom: "1rem" }}>
        <div>
          Portal: <a href={data.dominio}>{data.dominio}</a>
        </div>
        <div>
          Chat cidadão: <a href={data.chatCidadao}>{data.chatCidadao}</a>
        </div>
        <div>
          Espelho Dashboard G1: <a href={data.espelhoDashboardG1}>{data.espelhoDashboardG1}</a>
        </div>
      </div>

      <h2 style={{ fontFamily: "var(--bp-display)", fontSize: "1.25rem" }}>Releases</h2>
      <table className="faq-table">
        <thead>
          <tr>
            <th>Versão</th>
            <th>Data</th>
            <th>Notas</th>
          </tr>
        </thead>
        <tbody>
          {data.releases.map((r) => (
            <tr key={r.versao}>
              <td>{r.versao}</td>
              <td>{r.data}</td>
              <td>{r.notas}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 style={{ fontFamily: "var(--bp-display)", fontSize: "1.25rem", marginTop: "1.25rem" }}>
        Repositórios (Gitness / Git)
      </h2>
      <p className="lead">{data.notaGitness}</p>
      <table className="faq-table">
        <thead>
          <tr>
            <th>Grupo</th>
            <th>Repositório</th>
            <th>Status</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          {data.repositorios.map((r) => (
            <tr key={`${r.grupo}-${r.nome}`}>
              <td>{r.grupo}</td>
              <td>{r.nome}</td>
              <td>{r.status}</td>
              <td>{r.url ? <a href={r.url}>{r.url}</a> : "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
