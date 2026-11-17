import { useEffect, useState } from "react";
import { fetchRelatoriosMvp, type RelatorioMvp } from "../lib/api";

export function RelatoriosPage() {
  const [data, setData] = useState<RelatorioMvp | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    fetchRelatoriosMvp()
      .then(setData)
      .catch((e) => setErro(e instanceof Error ? e.message : "Erro"));
  }, []);

  if (erro) return <div className="error">{erro}</div>;
  if (!data) return <p className="lead">Carregando…</p>;

  return (
    <>
      <h1>Relatórios</h1>
      <p className="lead">MVP PET — indicador G1 e placeholders (REQ-008). Gerado em {data.geradoEm}.</p>
      <table className="faq-table">
        <thead>
          <tr>
            <th>Indicador</th>
            <th>Grupo</th>
            <th>Valor</th>
            <th>Status</th>
            <th>Nota</th>
          </tr>
        </thead>
        <tbody>
          {data.indicadores.map((i) => (
            <tr key={i.id}>
              <td>{i.titulo}</td>
              <td>{i.grupo}</td>
              <td>
                {i.valor == null ? "—" : `${i.valor}${i.unidade ? ` ${i.unidade}` : ""}`}
              </td>
              <td>{i.status}</td>
              <td>{i.nota}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
