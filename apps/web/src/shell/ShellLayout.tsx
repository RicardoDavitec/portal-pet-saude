import { NavLink, Outlet } from "react-router-dom";
import { useState } from "react";
import type { MeResponse } from "../lib/api";
import { logout } from "../lib/api";

export function ShellLayout({
  me,
  onLogout,
}: {
  me: MeResponse;
  onLogout: () => void;
}) {
  const [rightOpen, setRightOpen] = useState(true);
  const [panelOpen, setPanelOpen] = useState(true);

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          Portal PET Saúde
          <small>{me.usuario.nome}</small>
        </div>
        <nav>
          <ul className="nav-list">
            {me.menu.grupos.map((g) => (
              <li key={g}>
                <NavLink to={`/${g.toLowerCase()}`}>{g}</NavLink>
              </li>
            ))}
            {me.menu.cadastros && (
              <li>
                <NavLink to="/cadastros">Cadastros</NavLink>
              </li>
            )}
            {me.menu.relatorios && (
              <li>
                <NavLink to="/relatorios">Relatórios</NavLink>
              </li>
            )}
            {me.menu.configuracoes && (
              <li>
                <NavLink to="/config">Configurações</NavLink>
              </li>
            )}
            {me.menu.documentos && (
              <li>
                <NavLink to="/documentos">Documentos</NavLink>
              </li>
            )}
            {me.menu.sobre && (
              <li>
                <NavLink to="/sobre">Sobre</NavLink>
              </li>
            )}
          </ul>
        </nav>
        <button
          className="btn secondary"
          style={{ marginTop: "auto" }}
          onClick={async () => {
            await logout();
            onLogout();
          }}
        >
          Sair
        </button>
      </aside>

      <main className="workspace">
        <Outlet />
      </main>

      <aside className={`right-panels ${rightOpen ? "" : "collapsed"}`}>
        <button className="btn secondary" onClick={() => setRightOpen((v) => !v)}>
          {rightOpen ? "⟩" : "⟨"}
        </button>
        <section className="panel">
          <header onClick={() => setPanelOpen((v) => !v)}>
            <h3>Contexto</h3>
            <span>{panelOpen ? "–" : "+"}</span>
          </header>
          {panelOpen && (
            <div className="panel-body">
              <div>SAM: {me.usuario.adSam}</div>
              <div>Gestor: {me.usuario.gestorPet ? "sim" : "não"}</div>
              <div>Vínculos: {me.vinculos.length}</div>
            </div>
          )}
        </section>
      </aside>
    </div>
  );
}
