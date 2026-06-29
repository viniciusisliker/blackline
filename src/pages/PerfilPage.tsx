import { PageHeader } from '../components/PageHeader';

export function PerfilPage() {
  return (
    <div>
      <PageHeader badge="Equipe" title="Perfil" subtitle="BlackLine Studio Automotivo — operações." />
      <dl className="profile-dl">
        <div>
          <dt>Nome</dt>
          <dd>Equipe BlackLine</dd>
        </div>
        <div>
          <dt>Cargo</dt>
          <dd>Operações</dd>
        </div>
        <div>
          <dt>E-mail</dt>
          <dd>equipe@blackline.studio</dd>
        </div>
      </dl>
    </div>
  );
}
