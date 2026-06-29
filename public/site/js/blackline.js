(function () {
  const WA = '5511939287036';

  function initPreloader() {
    const el = document.getElementById('bl-preloader');
    if (!el) return;
    window.addEventListener('load', () => {
      setTimeout(() => el.classList.add('is-done'), 600);
    });
    setTimeout(() => el.classList.add('is-done'), 2500);
  }

  function initNavScroll() {
    const nav = document.querySelector('.bl-nav');
    if (!nav) return;
    const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  function initReveal() {
    const els = document.querySelectorAll('.bl-reveal');
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    );
    els.forEach((el) => io.observe(el));
  }

  function initParallax() {
    const hero = document.querySelector('[data-parallax]');
    if (!hero || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const bg = hero.querySelector('.bl-hero__media-bg');
    if (!bg) return;
    window.addEventListener(
      'scroll',
      () => {
        const y = window.scrollY * 0.35;
        bg.style.transform = `scale(1.08) translateY(${y}px)`;
      },
      { passive: true },
    );
  }

  function initCounters() {
    document.querySelectorAll('[data-count]').forEach((el) => {
      const target = parseInt(el.getAttribute('data-count') || '0', 10);
      const suffix = el.getAttribute('data-suffix') || '';
      const io = new IntersectionObserver(
        (entries) => {
          if (!entries[0].isIntersecting) return;
          io.disconnect();
          let start = 0;
          const dur = 1200;
          const t0 = performance.now();
          const tick = (now) => {
            const p = Math.min((now - t0) / dur, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            el.textContent = Math.round(start + (target - start) * eased) + suffix;
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        },
        { threshold: 0.5 },
      );
      io.observe(el);
    });
  }

  function initHeatSlider() {
    const slider = document.getElementById('bl-heat-slider');
    if (!slider) return;
    const carbon = document.getElementById('bl-heat-carbon');
    const ceramic = document.getElementById('bl-heat-ceramic');
    const label = document.getElementById('bl-heat-label');
    const update = () => {
      const v = parseInt(slider.value, 10);
      if (carbon) carbon.style.width = `${35 + v * 0.15}%`;
      if (ceramic) ceramic.style.width = `${55 + v * 0.35}%`;
      if (label) {
        label.textContent =
          v < 33
            ? 'Conforto urbano — Carbon Black cobre a maioria dos dias quentes.'
            : v < 66
              ? 'Alta exposição solar — Ceramic Black entra em vantagem.'
              : 'Máxima performance — Ceramic Black com até 90% de rejeição IRR.';
      }
    };
    slider.addEventListener('input', update);
    update();
  }

  function initPpfHotspots() {
    const map = document.getElementById('bl-ppf-map');
    const legend = document.getElementById('bl-ppf-legend');
    if (!map || !legend) return;
    const zones = {
      '1': 'Capô — zona de maior impacto de detritos',
      '2': 'Para-choque dianteiro',
      '3': 'Para-lama dianteiro',
      '4': 'Retrovisor',
      '5': 'Porta dianteira',
      '6': 'Soleira',
      '7': 'Farol / DRL',
      '8': 'Teto (opcional)',
    };
    map.querySelectorAll('.bl-ppf-hotspot').forEach((dot) => {
      dot.addEventListener('click', () => {
        map.querySelectorAll('.bl-ppf-hotspot').forEach((d) => d.classList.remove('is-active'));
        dot.classList.add('is-active');
        const id = dot.getAttribute('data-zone') || '';
        legend.textContent = zones[id] || 'Selecione uma zona no mapa';
      });
    });
  }

  function initOrcamentoForm() {
    const form = document.getElementById('bl-orcamento-form');
    if (!form) return;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const nome = /** @type {HTMLInputElement} */ (document.getElementById('bl-nome'))?.value.trim();
      const tel = /** @type {HTMLInputElement} */ (document.getElementById('bl-tel'))?.value.trim();
      const veiculo = /** @type {HTMLInputElement} */ (document.getElementById('bl-veiculo'))?.value.trim();
      const servico = /** @type {HTMLSelectElement} */ (document.getElementById('bl-servico'))?.selectedOptions[0]?.text;
      const msg = /** @type {HTMLTextAreaElement} */ (document.getElementById('bl-msg'))?.value.trim();
      const lines = [
        'Olá, BlackLine! Gostaria de um orçamento.',
        nome ? `Nome: ${nome}` : '',
        tel ? `WhatsApp: ${tel}` : '',
        veiculo ? `Veículo: ${veiculo}` : '',
        servico ? `Serviço: ${servico}` : '',
        msg ? `Detalhes: ${msg}` : '',
      ].filter(Boolean);
      window.open(`https://wa.me/${WA}?text=${encodeURIComponent(lines.join('\n'))}`, '_blank', 'noopener');
    });
  }

  function injectWaFloat() {
    if (document.querySelector('.bl-wa-float')) return;
    const a = document.createElement('a');
    a.href = `https://wa.me/${WA}`;
    a.target = '_blank';
    a.rel = 'noopener';
    a.className = 'bl-wa-float';
    a.setAttribute('aria-label', 'WhatsApp BlackLine');
    a.innerHTML = '<span class="material-symbols-outlined">chat</span>';
    document.body.appendChild(a);
  }

  window.BlackLine = {
    initPreloader,
    initNavScroll,
    initReveal,
    initParallax,
    initCounters,
    initHeatSlider,
    initPpfHotspots,
    initOrcamentoForm,
    injectWaFloat,
    initAll() {
      initPreloader();
      initNavScroll();
      initReveal();
      initParallax();
      initCounters();
      initHeatSlider();
      initPpfHotspots();
      initOrcamentoForm();
      injectWaFloat();
    },
  };

  document.addEventListener('DOMContentLoaded', () => {
    initPreloader();
    initParallax();
    initReveal();
    initCounters();
    initHeatSlider();
    initPpfHotspots();
    initOrcamentoForm();
  });
})();
