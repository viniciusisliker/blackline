import { PageHeader } from '../components/PageHeader';

export function ConfiguracoesPage() {
  return (
    <div>
      <PageHeader
        badge="Sistema"
        title="Configurações"
        subtitle="Preferências do Hub — modo demonstração."
      />
      <div className="placeholder-card">
        <span className="material-symbols-outlined placeholder-card__icon">settings</span>
        <p>Configurações de equipe, notificações e integrações em desenvolvimento.</p>
      </div>
    </div>
  );
}
