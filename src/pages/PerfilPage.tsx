import { PageHeader } from '../components/PageHeader';
import { useAuth } from '../contexts/AuthContext';

export function PerfilPage() {
  const { profile } = useAuth();

  return (
    <div>
      <PageHeader badge="Conta" title="Meu perfil" subtitle="Dados da sessão demonstrativa." />
      <dl className="profile-dl">
        <div>
          <dt>Nome</dt>
          <dd>{profile?.nome ?? '—'}</dd>
        </div>
        <div>
          <dt>Cargo</dt>
          <dd>{profile?.cargo ?? '—'}</dd>
        </div>
        <div>
          <dt>E-mail</dt>
          <dd>{profile?.email ?? '—'}</dd>
        </div>
      </dl>
    </div>
  );
}
