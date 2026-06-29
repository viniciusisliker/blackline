import { Navigate, useNavigate } from 'react-router-dom';
import { BlackLineLogo } from '../components/BlackLineLogo';
import { findWarrantyByPlaca } from '../lib/hubStore';
import { getPortalSession } from './PortalLoginPage';
import styles from './PortalDashboardPage.module.css';

export function PortalDashboardPage() {
  const navigate = useNavigate();
  const session = getPortalSession();
  if (!session) return <Navigate to="/portal" replace />;

  const warranty = findWarrantyByPlaca(session.placa);
  if (!warranty) return <Navigate to="/portal" replace />;

  function signOut() {
    localStorage.removeItem('blackline-portal-session');
    navigate('/portal');
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <BlackLineLogo size="sm" />
        <button type="button" className="btn-ghost" onClick={signOut}>
          Sair
        </button>
      </header>
      <main className={styles.main}>
        <p className={styles.badge}>Portal do cliente</p>
        <h1 className={styles.title}>{warranty.cliente}</h1>
        <p className={styles.sub}>
          {warranty.veiculo} · {warranty.placa}
        </p>

        <div className={styles.grid}>
          <article className={styles.card}>
            <span className="material-symbols-outlined">verified</span>
            <h2>Serviço</h2>
            <p>{warranty.servico}</p>
          </article>
          <article className={styles.card}>
            <span className="material-symbols-outlined">event</span>
            <h2>Garantia até</h2>
            <p>{new Date(warranty.garantiaAte).toLocaleDateString('pt-BR')}</p>
          </article>
          <article className={styles.card}>
            <span className="material-symbols-outlined">shield</span>
            <h2>Status</h2>
            <p className={warranty.status === 'Ativa' ? styles.active : styles.expired}>{warranty.status}</p>
          </article>
        </div>

        <div className={styles.actions}>
          <a href="https://wa.me/5511939287036" className="btn-primary" target="_blank" rel="noopener">
            Falar com a equipe
          </a>
          <a href={`${import.meta.env.BASE_URL}site/garantia.html`} className="btn-ghost">
            Ver termos de garantia
          </a>
        </div>
      </main>
    </div>
  );
}
