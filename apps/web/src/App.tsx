import { Navigate, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchMe, type MeResponse } from "./lib/api";
import { LoginPage } from "./pages/LoginPage";
import { ShellLayout } from "./shell/ShellLayout";
import { DocumentosPage } from "./pages/DocumentosPage";
import { SobrePage } from "./pages/SobrePage";
import { GrupoPlaceholderPage } from "./pages/GrupoPlaceholderPage";
import { G1WorkspacePage } from "./pages/G1WorkspacePage";
import { CadastrosPage } from "./pages/CadastrosPage";
import { RelatoriosPage } from "./pages/RelatoriosPage";
import { ConfigPage } from "./pages/ConfigPage";

export function App() {
  const [me, setMe] = useState<MeResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("portal_token");
    if (!token) {
      setLoading(false);
      return;
    }
    fetchMe()
      .then(setMe)
      .catch(() => localStorage.removeItem("portal_token"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="login-page">Carregando…</div>;
  if (!me) {
    return <LoginPage onLoggedIn={(m) => setMe(m)} />;
  }

  return (
    <Routes>
      <Route element={<ShellLayout me={me} onLogout={() => setMe(null)} />}>
        <Route index element={<Navigate to={defaultRoute(me)} replace />} />
        <Route path="g1/*" element={<G1WorkspacePage me={me} />} />
        <Route path="g2" element={<GrupoPlaceholderPage grupo="G2" />} />
        <Route path="g3" element={<GrupoPlaceholderPage grupo="G3" />} />
        <Route path="g4" element={<GrupoPlaceholderPage grupo="G4" />} />
        <Route path="g5" element={<GrupoPlaceholderPage grupo="G5" />} />
        <Route path="cadastros" element={<CadastrosPage me={me} />} />
        <Route path="relatorios" element={<RelatoriosPage />} />
        <Route path="config" element={<ConfigPage />} />
        <Route path="documentos" element={<DocumentosPage me={me} />} />
        <Route path="documentos/:slug" element={<DocumentosPage me={me} />} />
        <Route path="sobre" element={<SobrePage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function defaultRoute(me: MeResponse): string {
  if (me.menu.grupos.includes("G1")) return "/g1";
  if (me.menu.grupos[0]) return `/${me.menu.grupos[0].toLowerCase()}`;
  return "/documentos";
}
