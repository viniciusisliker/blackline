import { PageHeader } from '../components/PageHeader';
import { MOCK_CLIENTS } from '../data/blackline';
import styles from './ClientesPage.module.css';

export function ClientesPage() {
  return (
    <div>
      <PageHeader
        badge="CRM"
        title="Clientes"
        subtitle="Lista demonstrativa — dados estáticos para o shell do Hub."
      />
      <div className={styles.grid}>
        {MOCK_CLIENTS.map((c) => (
          <article key={c.id} className={styles.card}>
            <div className={styles.avatar}>{c.nome.charAt(0)}</div>
            <div>
              <h3 className={styles.name}>{c.nome}</h3>
              <p className={styles.meta}>{c.veiculo}</p>
              <p className={styles.service}>{c.servico}</p>
              <span className={styles.status}>{c.status}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
