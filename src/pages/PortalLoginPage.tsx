import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BlackLineLogo } from '../components/BlackLineLogo';
import { findWarrantyByPlaca } from '../lib/hubStore';
import styles from './PortalLoginPage.module.css';

const PORTAL_KEY = 'blackline-portal-session';

export function getPortalSession() {
  try {
    const raw = localStorage.getItem(PORTAL_KEY);
    return raw ? (JSON.parse(raw) as { placa: string }) : null;
  } catch {
    return null;
  }
}

export function PortalLoginPage() {
  const navigate = useNavigate();
  const [placa, setPlaca] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    const warranty = findWarrantyByPlaca(placa);
    if (!warranty) {
      setError('Placa não encontrada. Verifique os dados ou fale com a equipe.');
      return;
    }
    localStorage.setItem(PORTAL_KEY, JSON.stringify({ placa: warranty.placa }));
    navigate('/portal/dashboard');
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <BlackLineLogo size="lg" />
        <h1 className={styles.title}>Portal do Cliente</h1>
        <p className={styles.sub}>Consulte garantia e histórico do seu veículo pela placa.</p>
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
            Acessar portal
          </button>
        </form>
        <p className={styles.hint}>Demo: ABC1D23 ou JKL7M89</p>
        <a href={`${import.meta.env.BASE_URL}site/index.html`} className={styles.back}>
          ← Voltar ao site
        </a>
      </div>
    </div>
  );
}
