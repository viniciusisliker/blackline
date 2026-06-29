import { PageHeader } from '../components/PageHeader';
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
        subtitle="Dados locais do Hub."
      />

      <div className={styles.grid}>
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
