import { FormEvent, useState } from 'react';
import { BlackLineLogo } from '../components/BlackLineLogo';
import { findWarrantyByPlaca, type PortalWarranty } from '../lib/hubStore';
import styles from './PortalPage.module.css';

export function PortalPage() {
  const [placa, setPlaca] = useState('');
  const [error, setError] = useState('');
  const [warranty, setWarranty] = useState<PortalWarranty | null>(null);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    const found = findWarrantyByPlaca(placa);
    if (!found) {
      setWarranty(null);
      setError('Placa não encontrada. Verifique os dados ou fale com a equipe.');
      return;
    }
    setWarranty(found);
  }

  return (
    <div className={styles.page}>
      <div className={styles.wrap}>
        <BlackLineLogo size="lg" />
        <h1 className={styles.title}>Portal do Cliente</h1>
        <p className={styles.sub}>Consulte a garantia do seu veículo pela placa.</p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.label} htmlFor="placa">
            Placa do veículo
          </label>
          <input
            id="placa"
            className={styles.input}
            value={placa}
            onChange={(e) => setPlaca(e.target.value.toUpperCase())}
            placeholder="ABC1D23"
            required
            maxLength={8}
          />
          {error ? <p className={styles.error}>{error}</p> : null}
          <button type="submit" className="btn-primary">
            Consultar garantia
          </button>
        </form>

        <p className={styles.hint}>Demo: ABC1D23 ou JKL7M89</p>

        {warranty ? (
          <section className={styles.result} aria-live="polite">
            <p className={styles.badge}>Garantia encontrada</p>
            <h2 className={styles.clientName}>{warranty.cliente}</h2>
            <p className={styles.vehicle}>
              {warranty.veiculo} · {warranty.placa}
            </p>
            <div className={styles.grid}>
              <article className={styles.card}>
                <span className="material-symbols-outlined">verified</span>
                <h3>Serviço</h3>
                <p>{warranty.servico}</p>
              </article>
              <article className={styles.card}>
                <span className="material-symbols-outlined">event</span>
                <h3>Garantia até</h3>
                <p>{new Date(warranty.garantiaAte).toLocaleDateString('pt-BR')}</p>
              </article>
              <article className={styles.card}>
                <span className="material-symbols-outlined">shield</span>
                <h3>Status</h3>
                <p className={warranty.status === 'Ativa' ? styles.active : styles.expired}>{warranty.status}</p>
              </article>
            </div>
            <div className={styles.actions}>
              <a href="https://wa.me/5511939287036" className="btn-primary" target="_blank" rel="noopener">
                Falar com a equipe
              </a>
              <a href={`${import.meta.env.BASE_URL}site/garantia.html`} className="btn-ghost">
                Ver termos de garantia
              </a>
            </div>
          </section>
        ) : null}

        <a href={`${import.meta.env.BASE_URL}site/index.html`} className={styles.back}>
          ← Voltar ao site
        </a>
      </div>
    </div>
  );
}
