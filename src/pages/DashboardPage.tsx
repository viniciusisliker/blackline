import { PageHeader } from '../components/PageHeader';
import { BLACKLINE_PRODUCTS } from '../data/blackline';
import { getClients } from '../lib/hubStore';
import { useAuth } from '../contexts/AuthContext';
import styles from './DashboardPage.module.css';

export function DashboardPage() {
  const { profile } = useAuth();
  const clients = getClients();
  const emAndamento = clients.filter((c) => c.status === 'Em andamento').length;

  return (
    <div>
      <PageHeader
        badge="Overview"
        title="Painel"
        subtitle={
          profile?.nome
            ? `${profile.nome} — visão geral da BlackLine`
            : 'Visão geral da BlackLine'
        }
      />

      <div className={styles.kpiGrid}>
        <article className={styles.kpiCard}>
          <span className={styles.kpiLabel}>Produtos no catálogo</span>
          <strong className={styles.kpiValue}>{BLACKLINE_PRODUCTS.length}</strong>
        </article>
        <article className={styles.kpiCard}>
          <span className={styles.kpiLabel}>Clientes ativos</span>
          <strong className={styles.kpiValue}>{clients.length}</strong>
        </article>
        <article className={styles.kpiCard}>
          <span className={styles.kpiLabel}>Serviços em andamento</span>
          <strong className={styles.kpiValue}>{emAndamento}</strong>
        </article>
        <article className={styles.kpiCard}>
          <span className={styles.kpiLabel}>Garantia máxima</span>
          <strong className={styles.kpiValue}>10 anos</strong>
        </article>
      </div>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Serviços recentes</h2>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Veículo</th>
                <th>Serviço</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((c) => (
                <tr key={c.id}>
                  <td>{c.nome}</td>
                  <td>{c.veiculo}</td>
                  <td>{c.servico}</td>
                  <td>
                    <span className={`${styles.badge} ${styles[`badge--${c.status.replace(/\s/g, '')}`]}`}>
                      {c.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
