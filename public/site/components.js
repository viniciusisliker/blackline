(async function () {
  const currentPage = document.body.dataset.page ?? '';

  const PAGE_META = {
    peliculas: {
      label: 'Películas Térmicas',
      chips: [
        { icon: 'verified', text: '7–10 anos garantia' },
        { icon: 'wb_sunny', text: 'UV 99,9%' },
      ],
    },
    antivandalismo: {
      label: 'Antivandalismo',
      chips: [
        { icon: 'shield', text: 'Ps4 · 40 kg' },
        { icon: 'security', text: 'Ps8 · 65 kg' },
      ],
    },
    ppf: {
      label: 'PPF',
      chips: [
        { icon: 'layers', text: '10 anos garantia' },
        { icon: 'auto_awesome', text: 'Self-healing' },
      ],
    },
    sobre: {
      label: 'Sobre Nós',
      chips: [
        { icon: 'location_on', text: 'São Paulo' },
        { icon: 'handyman', text: 'Instalação profissional' },
      ],
    },
    orcamento: {
      label: 'Orçamento',
      chips: [
        { icon: 'chat', text: 'WhatsApp' },
        { icon: 'schedule', text: 'Resposta rápida' },
      ],
    },
    garantia: {
      label: 'Garantia',
      chips: [
        { icon: 'verified', text: 'Até 10 anos' },
        { icon: 'description', text: 'Documentada' },
      ],
    },
    galeria: {
      label: 'Galeria',
      chips: [
        { icon: 'photo_library', text: 'Resultados reais' },
        { icon: 'compare', text: 'Antes / depois' },
      ],
    },
  };

  const MAPS_URL =
    'https://www.google.com/maps/search/?api=1&query=Av.+Engenheiro+Caetano+%C3%81lvares,+3004,+S%C3%A3o+Paulo+-+SP';

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

  function enhancePageHero() {
    const hero = document.querySelector('.bl-page-hero');
    const meta = PAGE_META[currentPage];
    if (!hero || !meta) return;

    if (!hero.querySelector('.bl-page-hero__line')) {
      const line = document.createElement('div');
      line.className = 'bl-page-hero__line';
      line.setAttribute('aria-hidden', 'true');
      hero.appendChild(line);
    }

    const container = hero.querySelector('.bl-container');
    if (!container || container.dataset.enhanced === 'true') return;
    container.dataset.enhanced = 'true';

    const crumb = document.createElement('nav');
    crumb.className = 'bl-page-hero__crumb';
    crumb.setAttribute('aria-label', 'Navegação');
    crumb.innerHTML = `
      <a href="index.html">Início</a>
      <span class="bl-page-hero__crumb-sep" aria-hidden="true">/</span>
      <span class="bl-page-hero__crumb-current">${meta.label}</span>
    `;
    container.insertBefore(crumb, container.firstChild);

    const lead = container.querySelector('.bl-lead');
    if (lead && meta.chips?.length) {
      const chips = document.createElement('div');
      chips.className = 'bl-page-hero__chips';
      chips.innerHTML = meta.chips
        .map(
          (c) =>
            `<span class="bl-page-hero__chip"><span class="material-symbols-outlined" aria-hidden="true">${c.icon}</span>${c.text}</span>`,
        )
        .join('');
      lead.insertAdjacentElement('afterend', chips);
    }

    const cta = container.querySelector('.bl-btn');
    if (cta && !cta.closest('.bl-page-hero__actions')) {
      const actions = document.createElement('div');
      actions.className = 'bl-page-hero__actions';
      cta.style.marginTop = '';
      actions.appendChild(cta);
      container.appendChild(actions);
    }
  }

  function initBackToTop() {
    const btn = document.getElementById('bl-back-top');
    if (!btn) return;
    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  function enhanceTables() {
    document.querySelectorAll('.bl-table').forEach((table) => {
      if (table.parentElement?.classList.contains('bl-table-wrap')) return;
      const wrap = document.createElement('div');
      wrap.className = 'bl-table-wrap';
      wrap.setAttribute('tabindex', '0');
      wrap.setAttribute('role', 'region');
      wrap.setAttribute('aria-label', 'Tabela comparativa — deslize para ver mais');
      table.parentNode?.insertBefore(wrap, table);
      wrap.appendChild(table);
    });
  }

  function initMobileBar() {
    if (!window.matchMedia('(max-width: 767px)').matches) return;

    const bar = document.createElement('nav');
    bar.className = 'bl-mobile-bar is-visible';
    bar.id = 'bl-mobile-bar';
    bar.setAttribute('aria-label', 'Ações rápidas');
    bar.innerHTML = `
      <a href="https://wa.me/5511939287036?text=Ol%C3%A1!%20Gostaria%20de%20solicitar%20um%20or%C3%A7amento%20na%20BlackLine." class="bl-mobile-bar__item bl-mobile-bar__item--primary" target="_blank" rel="noopener">
        <span class="material-symbols-outlined" aria-hidden="true">request_quote</span>
        Orçamento
      </a>
      <a href="https://wa.me/5511939287036" class="bl-mobile-bar__item" target="_blank" rel="noopener">
        <span class="material-symbols-outlined" aria-hidden="true">chat</span>
        WhatsApp
      </a>
    `;
    document.body.appendChild(bar);
    document.body.classList.add('bl-has-mobile-bar');
    window.BlackLineSite?.registerMobileBar?.(bar);
  }

  try {
    const [navbar, footer] = await Promise.all([loadPartial('navbar.html'), loadPartial('footer.html')]);
    inject('bl-navbar', navbar);
    inject('bl-footer', footer);
    setActiveLink();
    enhancePageHero();
    enhanceTables();
    initBackToTop();
    initMobileBar();
    window.BlackLineSite?.initMobileNav?.();
    window.BlackLine?.initNavScroll?.();
    window.BlackLine?.initReveal?.();
    window.BlackLine?.initBaCompare?.();
    window.BlackLine?.initTintSimulator?.();
    window.BlackLine?.injectWaFloat?.();
    window.BlackLineSeo?.injectJsonLd?.();
  } catch (err) {
    console.error('[BlackLine components.js]', err);
  }
})();
