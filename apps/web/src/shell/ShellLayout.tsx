import { NavLink, Outlet } from "react-router-dom";
import { useState } from "react";
import type { MeResponse } from "../lib/api";
import { logout } from "../lib/api";
import { rotuloGrupo } from "../lib/grupos";
import { StatusBar } from "./StatusBar";
import { usePanelWidth } from "./usePanelWidth";

export function ShellLayout({
  me,
  onLogout,
}: {
  me: MeResponse;
  onLogout: () => void;
}) {
  const left = usePanelWidth("bp:left", 248, 180, 420);
  const right = usePanelWidth("bp:right", 300, 180, 480);
  const [ctxOpen, setCtxOpen] = useState(true);
  const [infoOpen, setInfoOpen] = useState(true);

  const leftW = left.collapsed ? 44 : left.width;
  const rightW = right.collapsed ? 44 : right.width;

  return (
    <div className="bp-root">
      <div
        className="app-shell"
        style={{
          gridTemplateColumns: `${leftW}px minmax(0, 1fr) ${rightW}px`,
        }}
      >
        <aside className={`sidebar ${left.collapsed ? "is-collapsed" : ""}`} style={{ width: leftW }}>
          <div className="panel-chrome">
            <button
              type="button"
              className="chrome-btn"
              title={left.collapsed ? "Expandir menu" : "Recolher menu"}
              onClick={() => left.setCollapsed((v) => !v)}
            >
              {left.collapsed ? "⟩" : "⟨"}
            </button>
            {!left.collapsed && <span className="chrome-title">Navegação</span>}
          </div>
          {!left.collapsed && (
            <>
              <div className="brand">
                Portal PET Saúde
                <small>{me.usuario.nome}</small>
              </div>
              <nav>
                <ul className="nav-list">
                  {me.menu.grupos.map((g) => (
                    <li key={g}>
                      <NavLink to={`/${g.toLowerCase()}`}>{rotuloGrupo(g)}</NavLink>
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
            </>
          )}
          <div
            className="resize-handle resize-handle-right"
            onMouseDown={(e) => left.onDragStart(e, "left")}
            title="Arrastar para ajustar largura"
          />
        </aside>

        <main className="workspace">
          <Outlet />
        </main>

        <aside className={`right-panels ${right.collapsed ? "is-collapsed" : ""}`} style={{ width: rightW }}>
          <div
            className="resize-handle resize-handle-left"
            onMouseDown={(e) => right.onDragStart(e, "right")}
            title="Arrastar para ajustar largura"
          />
          <div className="panel-chrome">
            <button
              type="button"
              className="chrome-btn"
              title={right.collapsed ? "Expandir painéis" : "Recolher painéis"}
              onClick={() => right.setCollapsed((v) => !v)}
            >
              {right.collapsed ? "⟨" : "⟩"}
            </button>
            {!right.collapsed && <span className="chrome-title">Painéis</span>}
          </div>
          {!right.collapsed && (
            <>
              <section className={`panel ${ctxOpen ? "" : "panel-collapsed"}`}>
                <header onClick={() => setCtxOpen((v) => !v)}>
                  <h3>Contexto da sessão</h3>
                  <span>{ctxOpen ? "–" : "+"}</span>
                </header>
                {ctxOpen && (
                  <div className="panel-body">
                    <div>SAM: {me.usuario.adSam}</div>
                    <div>Gestor PET: {me.usuario.gestorPet ? "sim" : "não"}</div>
                    <div>Vínculos ativos: {me.vinculos.length}</div>
                  </div>
                )}
              </section>
              <section className={`panel ${infoOpen ? "" : "panel-collapsed"}`}>
                <header onClick={() => setInfoOpen((v) => !v)}>
                  <h3>Atalhos</h3>
                  <span>{infoOpen ? "–" : "+"}</span>
                </header>
                {infoOpen && (
                  <div className="panel-body">
                    <div>Menu e painéis: botões ⟨ ⟩</div>
                    <div>Largura: arraste a borda</div>
                    <div>Preferências salvas neste navegador</div>
                  </div>
                )}
              </section>
            </>
          )}
        </aside>
      </div>
      <StatusBar usuario={me.usuario.adSam} ipCliente={me.ipCliente} />
    </div>
  );
}
