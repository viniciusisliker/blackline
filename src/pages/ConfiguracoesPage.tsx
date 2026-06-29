import { PageHeader } from '../components/PageHeader';
import { FORMSPREE_ID } from '../lib/siteConfig';
import styles from './ConfiguracoesPage.module.css';

export function ConfiguracoesPage() {
  function clearHubData() {
    if (!window.confirm('Limpar clientes e agenda salvos neste navegador?')) return;
    localStorage.removeItem('blackline-hub-clients');
    localStorage.removeItem('blackline-hub-agenda');
    window.location.reload();
  }

  return (
    <div>
      <PageHeader
        badge="Sistema"
        title="Configurações"
        subtitle="Integrações e dados locais do Hub."
      />

      <div className={styles.grid}>
        <article className={styles.card}>
          <h2 className={styles.cardTitle}>
            <span className="material-symbols-outlined">mail</span>
            Formspree (orçamento)
          </h2>
          <p>
            ID: <strong>{FORMSPREE_ID || 'não configurado'}</strong>
          </p>
          <p className={styles.muted}>
            Adicione <code>VITE_FORMSPREE_ID</code> e a meta <code>blackline-formspree</code> na página de orçamento para envio por e-mail além do WhatsApp.
          </p>
        </article>

        <article className={styles.card}>
          <h2 className={styles.cardTitle}>
            <span className="material-symbols-outlined">database</span>
            Dados locais
          </h2>
          <p className={styles.muted}>Clientes e agenda ficam no localStorage deste navegador.</p>
          <button type="button" className="btn-ghost" onClick={clearHubData}>
            Restaurar dados demo
          </button>
        </article>
      </div>
    </div>
  );
}
