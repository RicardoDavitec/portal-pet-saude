export function GrupoPlaceholderPage({ grupo }: { grupo: string }) {
  return (
    <>
      <h1>{grupo}</h1>
      <p className="lead">Workspace placeholder até certificados/APIs do grupo.</p>
      <div className="placeholder">Integração futura via adapters Gitness.</div>
    </>
  );
}
