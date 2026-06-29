import { useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { BlackLineLogo } from '../components/BlackLineLogo';
import { NavIcon } from '../components/NavIcon';
import { HUB_NAV_ITEMS } from '../lib/hubNav';
import styles from './DashboardLayout.module.css';

const TEAM_NAME = 'Equipe BlackLine';

export function DashboardLayout() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

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
              <span className={styles.profileAvatar}>{TEAM_NAME.charAt(0)}</span>
              <span className={styles.profileName}>Equipe</span>
            </NavLink>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className={styles.mobileNav} role="presentation">
          <button type="button" className={styles.mobileBackdrop} onClick={() => setMenuOpen(false)} aria-label="Fechar" />
          <nav className={styles.mobileDrawer} aria-label="Menu mobile">
            <p className={styles.mobileUser}>{TEAM_NAME}</p>
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
          </nav>
        </div>
      )}

      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}
