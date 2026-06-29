(function () {
  let navInitialized = false;

  function setNavOpen(open) {
    const drawer = document.getElementById('bl-nav-drawer');
    const toggle = document.getElementById('bl-nav-toggle');
    if (!drawer || !toggle) return;
    drawer.classList.toggle('is-open', open);
    drawer.setAttribute('aria-hidden', open ? 'false' : 'true');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    document.body.classList.toggle('bl-nav-open', open);
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

  window.BlackLineSite = { initMobileNav };
  document.addEventListener('DOMContentLoaded', initMobileNav);
})();
