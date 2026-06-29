(function () {
  let navInitialized = false;
  let mobileBar = null;

  function setNavOpen(open) {
    const drawer = document.getElementById('bl-nav-drawer');
    const toggle = document.getElementById('bl-nav-toggle');
    if (!drawer || !toggle) return;
    drawer.classList.toggle('is-open', open);
    drawer.setAttribute('aria-hidden', open ? 'false' : 'true');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    document.body.classList.toggle('bl-nav-open', open);
    mobileBar?.classList.toggle('is-hidden', open);

    if (open) {
      document.body.dataset.navScrollY = String(window.scrollY);
      document.body.style.top = `-${window.scrollY}px`;
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      const y = parseInt(document.body.dataset.navScrollY || '0', 10);
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      delete document.body.dataset.navScrollY;
      window.scrollTo(0, y);
    }
  }

  function initMobileNav() {
    if (navInitialized) return true;
    const toggle = document.getElementById('bl-nav-toggle');
    const drawer = document.getElementById('bl-nav-drawer');
    const backdrop = document.getElementById('bl-nav-backdrop');
    const closeBtn = document.getElementById('bl-nav-close');
    if (!toggle || !drawer) return false;
    navInitialized = true;
    const closeNav = () => setNavOpen(false);
    toggle.addEventListener('click', () => setNavOpen(!drawer.classList.contains('is-open')));
    backdrop?.addEventListener('click', closeNav);
    closeBtn?.addEventListener('click', closeNav);
    drawer.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeNav));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawer.classList.contains('is-open')) closeNav();
    });
    return true;
  }

  function registerMobileBar(bar) {
    mobileBar = bar;
  }

  window.BlackLineSite = { initMobileNav, registerMobileBar };
  document.addEventListener('DOMContentLoaded', initMobileNav);
})();
