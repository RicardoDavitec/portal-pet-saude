import type { MeResponse } from "../lib/api";

export function CadastrosPage({ me }: { me: MeResponse }) {
  return (
    <>
      <h1>Cadastros</h1>
      <p className="lead">Vínculos usuário–grupo–papel (REQ-004).</p>
      <div className="placeholder">
        API pronta em <code>/api/vinculos</code>. UI completa de CRUD segue refinamentos de S2/S5.
        Você: {me.usuario.nome}
      </div>
    </>
  );
}
