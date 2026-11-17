import { GRUPOS_PET, type CodigoGrupo, nomeGrupo } from "../lib/grupos";

const META: Record<
  CodigoGrupo,
  { repos: string[]; descricao: string; gap?: boolean }
> = {
  G1: {
    repos: ["api-chat-bot", "Dashboard-PetSaude"],
    descricao: "Workspace operacional via adapter Nest (FAQ / dashboard).",
  },
  G2: {
    repos: ["api-painel", "web-painel"],
    descricao:
      "Workspace do Dashboard de Serviços. Integração via adapter Gitness quando certificados estiverem ok.",
  },
  G3: {
    repos: ["totem-api", "totem-web"],
    descricao: "Workspace do Totem de atendimento. Placeholder até API/web estabilizados.",
  },
  G4: {
    repos: ["api-gestao-antirrabica", "sgar-web"],
    descricao: "Workspace Vacinas / gestão antirrábica. UI e adapter após autenticação comum.",
  },
  G5: {
    repos: [],
    descricao: "Educação Permanente — grupo sem repositório listado no inventário Gitness (gap).",
    gap: true,
  },
};

export function GrupoPlaceholderPage({ grupo }: { grupo: string }) {
  const codigo = grupo as CodigoGrupo;
  const meta = META[codigo] ?? { repos: [] as string[], descricao: "Placeholder de workspace." };
  const titulo = nomeGrupo(codigo);

  return (
    <>
      <h1>{titulo}</h1>
      <p className="lead">{meta.descricao}</p>
      <div className="placeholder">
        {meta.gap ? (
          <p>
            Status: <strong>gap</strong> — aguardando definição de repositório no Gitness.
          </p>
        ) : (
          <>
            <p>Repositórios previstos ({GRUPOS_PET[codigo]?.nome}):</p>
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
