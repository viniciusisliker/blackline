(async function () {
  const currentPage = document.body.dataset.page ?? '';

  async function loadPartial(filename) {
    const root = window.location.href.replace(/\/[^/]*$/, '/').replace(/\/+$/, '/');
    const res = await fetch(`${root}components/${filename}`);
    if (!res.ok) throw new Error(`Falha ao carregar ${filename}`);
    return res.text();
  }

  function inject(id, html) {
    const el = document.getElementById(id);
    if (el) el.innerHTML = html;
  }

  function setActiveLink() {
    document.querySelectorAll('.nav-link').forEach((link) => {
      link.classList.toggle('is-active', link.dataset.page === currentPage);
    });
  }

  try {
    const [navbar, footer] = await Promise.all([loadPartial('navbar.html'), loadPartial('footer.html')]);
    inject('bl-navbar', navbar);
    inject('bl-footer', footer);
    setActiveLink();
    window.BlackLineSite?.initMobileNav?.();
    window.BlackLine?.initNavScroll?.();
    window.BlackLine?.initReveal?.();
    window.BlackLine?.injectWaFloat?.();
  } catch (err) {
    console.error('[BlackLine components.js]', err);
  }
})();
