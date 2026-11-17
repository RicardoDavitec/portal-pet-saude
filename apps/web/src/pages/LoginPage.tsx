import { FormEvent, useEffect, useState } from "react";
import { fetchMe, login, type MeResponse } from "../lib/api";

/**
 * Janela de login no padrão Bot_Pan: viewport de fundo + diálogo com chrome,
 * campos usuário/senha, Enter e Escape (fecha foco / limpa erro).
 */
export function LoginPage({ onLoggedIn }: { onLoggedIn: (me: MeResponse) => void }) {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setErro(null);
        setSenha("");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

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
      setErro("Credenciais inválidas ou diretório indisponível.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="login-stage">
      <div className="login-backdrop" aria-hidden />
      <form className="login-window" onSubmit={onSubmit} autoComplete="on">
        <header className="login-chrome">
          <span className="login-chrome-title">Acesso ao Portal PET Saúde</span>
          <span className="login-chrome-meta">AD municipal</span>
        </header>
        <div className="login-body">
          <div className="login-brand-block">
            <div className="login-mark" aria-hidden>
              PS
            </div>
            <div>
              <h1>Portal PET Saúde Digital</h1>
              <p>Identifique-se com a conta da Prefeitura (mesmo padrão Bot_Pan).</p>
            </div>
          </div>
          <label>
            Usuário
            <input
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              autoComplete="username"
              autoFocus
              required
            />
          </label>
          <label>
            Senha
            <div className="login-pass-row">
              <input
                type={mostrarSenha ? "text" : "password"}
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                className="btn secondary"
                onClick={() => setMostrarSenha((v) => !v)}
                title="Mostrar / ocultar senha"
              >
                {mostrarSenha ? "Ocultar" : "Mostrar"}
              </button>
            </div>
          </label>
          {erro && <div className="error">{erro}</div>}
          <div className="login-actions">
            <button className="btn" disabled={busy} type="submit">
              {busy ? "Autenticando…" : "Entrar"}
            </button>
            <button
              type="button"
              className="btn secondary"
              disabled={busy}
              onClick={() => {
                setUsuario("");
                setSenha("");
                setErro(null);
              }}
            >
              Limpar
            </button>
          </div>
          <p className="login-hint">Enter confirma · Esc limpa a senha e o erro</p>
        </div>
        <footer className="login-window-foot">
          petsaude.franca.sp.gov.br · shell Bot_Pan
        </footer>
      </form>
    </div>
  );
}
