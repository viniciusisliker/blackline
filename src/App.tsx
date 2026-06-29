import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { DashboardLayout } from './layouts/DashboardLayout';
import { ProtectedRoute } from './components/ProtectedRoute';
import { SiteRedirectPage } from './pages/SiteRedirectPage';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { ProdutosPage } from './pages/ProdutosPage';
import { ClientesPage } from './pages/ClientesPage';
import { AgendaPage } from './pages/AgendaPage';
import { ConfiguracoesPage } from './pages/ConfiguracoesPage';
import { PerfilPage } from './pages/PerfilPage';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter basename="/blackline">
        <Routes>
          <Route path="/" element={<SiteRedirectPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route element={<ProtectedRoute />}>
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/produtos" element={<ProdutosPage />} />
              <Route path="/clientes" element={<ClientesPage />} />
              <Route path="/agenda" element={<AgendaPage />} />
              <Route path="/configuracoes" element={<ConfiguracoesPage />} />
              <Route path="/perfil" element={<PerfilPage />} />
            </Route>
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
