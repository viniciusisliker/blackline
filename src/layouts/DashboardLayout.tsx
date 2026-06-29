import { useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { BlackLineLogo } from '../components/BlackLineLogo';
import { NavIcon } from '../components/NavIcon';
import { HUB_NAV_ITEMS } from '../lib/hubNav';
import { useAuth } from '../contexts/AuthContext';
import styles from './DashboardLayout.module.css';

export function DashboardLayout() {
  const { profile, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  const shortName = profile?.nome?.trim().split(/\s+/)[0] ?? 'Perfil';

  return (
    <div className={styles.shell}>
      <header className={styles.hubNav}>
        <div className={styles.hubNavBar}>
          <NavLink to="/dashboard" className={styles.brandBlock} aria-label="BlackLine Hub — painel">
            <BlackLineLogo size="sm" />
          </NavLink>

          <button
            type="button"
            className={`${styles.menuBtn} ${menuOpen ? styles.menuBtnOpen : ''}`}
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            <span className={styles.menuBars} aria-hidden>
              <span /><span /><span />
            </span>
          </button>

          <nav className={styles.hubNavLinks} aria-label="Navegação principal">
            {HUB_NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `${styles.hubNavLink} ${isActive ? styles.hubNavLinkActive : ''}`
                }
              >
                <NavIcon name={item.icon} className={styles.hubNavIcon} />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>

          <div className={styles.hubNavUtilities}>
            <a href={`${import.meta.env.BASE_URL}site/index.html`} className={styles.utilityLink}>
              Site
            </a>
            <NavLink to="/perfil" className={styles.profileBtn}>
              <span className={styles.profileAvatar}>{shortName.charAt(0).toUpperCase()}</span>
              <span className={styles.profileName}>{shortName}</span>
            </NavLink>
            <button type="button" className={styles.signOutBtn} onClick={() => void handleSignOut()}>
              Sair
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className={styles.mobileNav} role="presentation">
          <button type="button" className={styles.mobileBackdrop} onClick={() => setMenuOpen(false)} aria-label="Fechar" />
          <nav className={styles.mobileDrawer} aria-label="Menu mobile">
            <p className={styles.mobileUser}>{profile?.nome}</p>
            <ul className={styles.mobileNavList}>
              {HUB_NAV_ITEMS.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `${styles.mobileNavLink} ${isActive ? styles.mobileNavLinkActive : ''}`
                    }
                    onClick={() => setMenuOpen(false)}
                  >
                    <NavIcon name={item.icon} />
                    <span>{item.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
            <button type="button" className="btn-ghost" onClick={() => void handleSignOut()}>
              Sair
            </button>
          </nav>
        </div>
      )}

      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}
