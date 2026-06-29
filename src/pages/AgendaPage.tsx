import { useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { getAgenda, saveAgenda, type HubAppointment } from '../lib/hubStore';
import styles from './AgendaPage.module.css';

const empty: Omit<HubAppointment, 'id'> = {
  clienteId: '',
  clienteNome: '',
  veiculo: '',
  servico: '',
  data: '',
  hora: '09:00',
  status: 'Agendado',
};

export function AgendaPage() {
  const [items, setItems] = useState<HubAppointment[]>(() => getAgenda());
  const [draft, setDraft] = useState(empty);

  function persist(next: HubAppointment[]) {
    setItems(next);
    saveAgenda(next);
  }

  function addItem(e: React.FormEvent) {
    e.preventDefault();
    if (!draft.clienteNome.trim() || !draft.data) return;
    persist([...items, { ...draft, id: crypto.randomUUID() }].sort((a, b) => a.data.localeCompare(b.data)));
    setDraft(empty);
  }

  function toggleStatus(id: string) {
    persist(
      items.map((item) =>
        item.id === id
          ? {
              ...item,
              status:
                item.status === 'Agendado'
                  ? 'Confirmado'
                  : item.status === 'Confirmado'
                    ? 'Concluído'
                    : 'Agendado',
            }
          : item,
      ),
    );
  }

  return (
    <div>
      <PageHeader
        badge="Operação"
        title="Agenda"
        subtitle="Agendamentos de instalação — dados salvos localmente."
      />

      <form className={styles.form} onSubmit={addItem}>
        <input
          placeholder="Cliente"
          value={draft.clienteNome}
          onChange={(e) => setDraft({ ...draft, clienteNome: e.target.value })}
          required
        />
        <input
          placeholder="Veículo"
          value={draft.veiculo}
          onChange={(e) => setDraft({ ...draft, veiculo: e.target.value })}
        />
        <input
          placeholder="Serviço"
          value={draft.servico}
          onChange={(e) => setDraft({ ...draft, servico: e.target.value })}
        />
        <input type="date" value={draft.data} onChange={(e) => setDraft({ ...draft, data: e.target.value })} required />
        <input type="time" value={draft.hora} onChange={(e) => setDraft({ ...draft, hora: e.target.value })} />
        <button type="submit" className="btn-primary">
          Agendar
        </button>
      </form>

      <ul className={styles.list}>
        {items.map((item) => (
          <li key={item.id} className={styles.item}>
            <div>
              <strong>{item.clienteNome}</strong>
              <span>{item.veiculo} — {item.servico}</span>
              <span>
                {new Date(item.data + 'T12:00:00').toLocaleDateString('pt-BR')} às {item.hora}
              </span>
            </div>
            <button type="button" className={styles.statusBtn} onClick={() => toggleStatus(item.id)}>
              {item.status}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
