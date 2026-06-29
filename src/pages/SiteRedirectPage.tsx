import { useEffect } from 'react';

const SITE_HOME = import.meta.env.BASE_URL + 'site/index.html';

export function SiteRedirectPage() {
  useEffect(() => {
    window.location.replace(SITE_HOME);
  }, []);

  return (
    <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--muted)' }}>
      A abrir o site BlackLine…
    </div>
  );
}
