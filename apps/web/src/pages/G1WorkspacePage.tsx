import { FormEvent, useEffect, useState } from "react";
import type { MeResponse } from "../lib/api";
import { createFaq, fetchConversas, fetchFaqs } from "../lib/api";

type Faq = { id: string; pergunta: string; resposta?: string; categoria?: string };

export function G1WorkspacePage({ me }: { me: MeResponse }) {
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [erro, setErro] = useState<string | null>(null);
  const [conversasMsg, setConversasMsg] = useState<string | null>(null);
  const [pergunta, setPergunta] = useState("");
  const [resposta, setResposta] = useState("");

  async function carregar() {
    try {
      setErro(null);
      const data = await fetchFaqs();
      setFaqs(Array.isArray(data) ? data : []);
    } catch (e) {
      setErro(e instanceof Error ? e.message : "Erro G1");
      setFaqs([]);
    }
  }

  useEffect(() => {
    if (me.g1.lerFaq) void carregar();
  }, [me.g1.lerFaq]);

  async function onCreate(e: FormEvent) {
    e.preventDefault();
    await createFaq({ pergunta, resposta });
    setPergunta("");
    setResposta("");
    await carregar();
  }

  async function onConversas() {
    try {
      const data = await fetchConversas();
      setConversasMsg(`${Array.isArray(data) ? data.length : 0} conversa(s)`);
    } catch (e) {
      setConversasMsg(e instanceof Error ? e.message : "Falha");
    }
  }

  if (!me.g1.lerFaq) {
    return (
      <>
        <h1>G1 — ChatBot</h1>
        <p className="lead">Sem vínculo G1 para FAQ.</p>
      </>
    );
  }

  return (
    <>
      <h1>G1 — FAQ / Dashboard</h1>
      <p className="lead">Workspace via adapter Nest (REQ-006 / RN-004).</p>
      {erro && <div className="error">{erro}</div>}

      {me.g1.escreverFaq && (
        <form onSubmit={onCreate} style={{ display: "grid", gap: "0.5rem", marginBottom: "1rem" }}>
          <input
            placeholder="Pergunta"
            value={pergunta}
            onChange={(e) => setPergunta(e.target.value)}
            required
          />
          <textarea
            placeholder="Resposta"
            value={resposta}
            onChange={(e) => setResposta(e.target.value)}
            required
            rows={3}
          />
          <button className="btn" type="submit">
            Salvar FAQ
          </button>
        </form>
      )}

      <table className="faq-table">
        <thead>
          <tr>
            <th>Pergunta</th>
            <th>Categoria</th>
          </tr>
        </thead>
        <tbody>
          {faqs.map((f) => (
            <tr key={f.id}>
              <td>{f.pergunta}</td>
              <td>{f.categoria ?? "—"}</td>
            </tr>
          ))}
          {!faqs.length && !erro && (
            <tr>
              <td colSpan={2}>Nenhuma FAQ retornada pelo Nest G1.</td>
            </tr>
          )}
        </tbody>
      </table>

      {me.g1.verPii && (
        <div style={{ marginTop: "1rem" }}>
          <button className="btn secondary" type="button" onClick={onConversas}>
            Carregar conversas (PII)
          </button>
          {conversasMsg && <p className="lead">{conversasMsg}</p>}
        </div>
      )}
    </>
  );
}
