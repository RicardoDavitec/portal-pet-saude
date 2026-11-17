import { FormEvent, useState } from "react";
import { fetchMe, login, type MeResponse } from "../lib/api";

export function LoginPage({ onLoggedIn }: { onLoggedIn: (me: MeResponse) => void }) {
  const [usuario, setUsuario] = useState("gestor");
  const [senha, setSenha] = useState("gestor");
  const [erro, setErro] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setErro(null);
    try {
      const r = await login(usuario, senha);
      localStorage.setItem("portal_token", r.token);
      const me = await fetchMe();
      onLoggedIn(me);
    } catch {
      setErro("Não foi possível autenticar.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={onSubmit}>
        <h1>Portal PET Saúde</h1>
        <p className="lead">Acesso com conta municipal (AD) ou modo dev.</p>
        <label>
          Usuário
          <input value={usuario} onChange={(e) => setUsuario(e.target.value)} autoComplete="username" />
        </label>
        <label>
          Senha
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            autoComplete="current-password"
          />
        </label>
        {erro && <div className="error">{erro}</div>}
        <button className="btn" disabled={busy}>
          {busy ? "Entrando…" : "Entrar"}
        </button>
      </form>
    </div>
  );
}
