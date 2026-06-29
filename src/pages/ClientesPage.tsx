import { useMemo, useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { getClients, saveClients, type HubClient } from '../lib/hubStore';
import styles from './ClientesPage.module.css';

const empty: Omit<HubClient, 'id'> = {
  nome: '',
  telefone: '',
  veiculo: '',
  placa: '',
  servico: '',
  status: 'Agendado',
};

export function ClientesPage() {
  const [clients, setClients] = useState<HubClient[]>(() => getClients());
  const [draft, setDraft] = useState(empty);
  const [filter, setFilter] = useState('');

  const filtered = useMemo(() => {
    const q = filter.trim().toLowerCase();
    if (!q) return clients;
    return clients.filter(
      (c) =>
        c.nome.toLowerCase().includes(q) ||
        c.veiculo.toLowerCase().includes(q) ||
        c.placa.toLowerCase().includes(q),
    );
  }, [clients, filter]);

  function persist(next: HubClient[]) {
    setClients(next);
    saveClients(next);
  }

  function addClient(e: React.FormEvent) {
    e.preventDefault();
    if (!draft.nome.trim()) return;
    const next: HubClient = {
      ...draft,
      id: crypto.randomUUID(),
      placa: draft.placa.toUpperCase(),
    };
    persist([next, ...clients]);
    setDraft(empty);
  }

  function removeClient(id: string) {
    persist(clients.filter((c) => c.id !== id));
  }

  return (
    <div>
      <PageHeader
        badge="CRM"
        title="Clientes"
        subtitle="Cadastro local da equipe — sincronizado no navegador."
      />

      <form className={styles.form} onSubmit={addClient}>
        <input
          placeholder="Nome"
          value={draft.nome}
          onChange={(e) => setDraft({ ...draft, nome: e.target.value })}
          required
        />
        <input
          placeholder="Telefone"
          value={draft.telefone}
          onChange={(e) => setDraft({ ...draft, telefone: e.target.value })}
        />
        <input
          placeholder="Veículo"
          value={draft.veiculo}
          onChange={(e) => setDraft({ ...draft, veiculo: e.target.value })}
        />
        <input
          placeholder="Placa"
          value={draft.placa}
          onChange={(e) => setDraft({ ...draft, placa: e.target.value.toUpperCase() })}
        />
        <input
          placeholder="Serviço"
          value={draft.servico}
          onChange={(e) => setDraft({ ...draft, servico: e.target.value })}
        />
        <select
          value={draft.status}
          onChange={(e) => setDraft({ ...draft, status: e.target.value as HubClient['status'] })}
        >
          <option value="Agendado">Agendado</option>
          <option value="Em andamento">Em andamento</option>
          <option value="Concluído">Concluído</option>
        </select>
        <button type="submit" className="btn-primary">
          Adicionar
        </button>
      </form>

      <input
        className={styles.search}
        placeholder="Buscar por nome, veículo ou placa…"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />

      <div className={styles.grid}>
        {filtered.map((c) => (
          <article key={c.id} className={styles.card}>
            <div className={styles.avatar}>{c.nome.charAt(0)}</div>
            <div className={styles.body}>
              <h3 className={styles.name}>{c.nome}</h3>
              <p className={styles.meta}>{c.veiculo} · {c.placa}</p>
              <p className={styles.service}>{c.servico}</p>
              <span className={styles.status}>{c.status}</span>
            </div>
            <button type="button" className={styles.remove} onClick={() => removeClient(c.id)} aria-label="Remover">
              ×
            </button>
          </article>
        ))}
      </div>
    </div>
  );
}
