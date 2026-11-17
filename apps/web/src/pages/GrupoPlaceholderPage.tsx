const META: Record<
  string,
  { titulo: string; repos: string[]; descricao: string; gap?: boolean }
> = {
  G2: {
    titulo: "G2 — Painel",
    repos: ["api-painel", "web-painel"],
    descricao: "Workspace do painel setorial. Integração via adapter Gitness quando certificados estiverem ok.",
  },
  G3: {
    titulo: "G3 — Totem",
    repos: ["totem-api", "totem-web"],
    descricao: "Workspace do totem de atendimento. Placeholder até API/web estabilizados no inventário.",
  },
  G4: {
    titulo: "G4 — SGAR / Antirrábica",
    repos: ["api-gestao-antirrabica", "sgar-web"],
    descricao: "Gestão antirrábica. UI e adapter serão ligados após autenticação comum no portal.",
  },
  G5: {
    titulo: "G5 — (a definir)",
    repos: [],
    descricao: "Grupo sem repositório listado no inventário Gitness — gap conhecido.",
    gap: true,
  },
};

export function GrupoPlaceholderPage({ grupo }: { grupo: string }) {
  const meta = META[grupo] ?? {
    titulo: grupo,
    repos: [] as string[],
    descricao: "Placeholder de workspace.",
  };

  return (
    <>
      <h1>{meta.titulo}</h1>
      <p className="lead">{meta.descricao}</p>
      <div className="placeholder">
        {meta.gap ? (
          <p>Status: <strong>gap</strong> — aguardando definição de repositório no Gitness.</p>
        ) : (
          <>
            <p>Repositórios previstos:</p>
            <ul>
              {meta.repos.map((r) => (
                <li key={r}>
                  <code>{r}</code>
                </li>
              ))}
            </ul>
            <p>Este painel não incorpora o domínio do grupo — apenas o shell e o ponto de integração futuro.</p>
          </>
        )}
      </div>
    </>
  );
}
