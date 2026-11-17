import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { descritorTela } from "../lib/telas";

export function StatusBar({
  usuario,
  ipCliente,
}: {
  usuario: string;
  ipCliente?: string | null;
}) {
  const loc = useLocation();
  const [agora, setAgora] = useState(() => new Date());

  useEffect(() => {
    const id = window.setInterval(() => setAgora(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const dataHora = agora.toLocaleString("pt-BR", {
    timeZone: "America/Sao_Paulo",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <footer className="status-bar" role="contentinfo">
      <span title="IP do cliente (visto pelo servidor)">
        IP: {ipCliente?.trim() || "—"}
      </span>
      <span title="Usuário autenticado">Usuário: {usuario}</span>
      <span title="Data e hora locais">{dataHora}</span>
      <span className="status-descritor" title="Tela / painel aberto">
        {descritorTela(loc.pathname)}
      </span>
    </footer>
  );
}
