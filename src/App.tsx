import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { DashboardLayout } from './layouts/DashboardLayout';
import { SiteRedirectPage } from './pages/SiteRedirectPage';
import { DashboardPage } from './pages/DashboardPage';
import { ProdutosPage } from './pages/ProdutosPage';
import { ClientesPage } from './pages/ClientesPage';
import { AgendaPage } from './pages/AgendaPage';
import { ConfiguracoesPage } from './pages/ConfiguracoesPage';
import { PerfilPage } from './pages/PerfilPage';
import { PortalPage } from './pages/PortalPage';

export default function App() {
  return (
    <BrowserRouter basename="/blackline">
      <Routes>
        <Route path="/" element={<SiteRedirectPage />} />
        <Route path="/portal" element={<PortalPage />} />
        <Route path="/login" element={<Navigate to="/dashboard" replace />} />
        <Route path="/portal/dashboard" element={<Navigate to="/portal" replace />} />
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/produtos" element={<ProdutosPage />} />
          <Route path="/clientes" element={<ClientesPage />} />
          <Route path="/agenda" element={<AgendaPage />} />
          <Route path="/configuracoes" element={<ConfiguracoesPage />} />
          <Route path="/perfil" element={<PerfilPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
