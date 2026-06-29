import { PageHeader } from '../components/PageHeader';

export function AgendaPage() {
  return (
    <div>
      <PageHeader
        badge="Em breve"
        title="Agenda"
        subtitle="Integração com calendário será adicionada em uma fase futura."
      />
      <div className="placeholder-card">
        <span className="material-symbols-outlined placeholder-card__icon">calendar_month</span>
        <p>Agendamentos de instalação e atendimento aparecerão aqui.</p>
      </div>
    </div>
  );
}
