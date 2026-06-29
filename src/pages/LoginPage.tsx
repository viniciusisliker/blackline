import { FormEvent, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { BlackLineLogo } from '../components/BlackLineLogo';
import { useAuth } from '../contexts/AuthContext';
import styles from './LoginPage.module.css';

export function LoginPage() {
  const { session, signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname ?? '/dashboard';

  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  if (session) {
    return <Navigate to={from} replace />;
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signIn(usuario, password);
      navigate(from, { replace: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <button
        type="button"
        className={styles.themeToggle}
        onClick={() => {
          const root = document.documentElement;
          const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
          root.setAttribute('data-theme', next);
        }}
        aria-label="Alternar tema"
      >
        <span className="material-symbols-outlined">brightness_4</span>
      </button>

      <div className={`card ${styles.card}`}>
        <div className={styles.cardGlow} aria-hidden />
        <div className={styles.logoWrap}>
          <BlackLineLogo size="lg" showSubtitle />
        </div>
        <div className={styles.header}>
          <h1 className={styles.title}>Entrar</h1>
          <p className={styles.subtitle}>Acesso restrito à equipe BlackLine</p>
          <p className={styles.mockNote}>Modo demonstração — qualquer usuário e senha funcionam.</p>
        </div>

        <form className={styles.form} onSubmit={(e) => void handleSubmit(e)}>
          <label className={styles.field}>
            <span className="sr-only">Usuário</span>
            <div className={styles.fieldShell}>
              <span className={`material-symbols-outlined ${styles.fieldIcon}`}>person</span>
              <input
                className={styles.fieldInput}
                type="text"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                placeholder="Usuário ou e-mail"
                autoComplete="username"
              />
            </div>
          </label>
          <label className={styles.field}>
            <span className="sr-only">Senha</span>
            <div className={styles.fieldShell}>
              <span className={`material-symbols-outlined ${styles.fieldIcon}`}>lock</span>
              <input
                className={styles.fieldInput}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Senha"
                autoComplete="current-password"
              />
            </div>
          </label>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Entrando…' : 'Entrar'}
          </button>
        </form>

        <p className={styles.back}>
          <a href={`${import.meta.env.BASE_URL}site/home.html`}>← Voltar ao site</a>
        </p>
      </div>
    </div>
  );
}
