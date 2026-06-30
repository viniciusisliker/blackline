(function () {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const coarse = window.matchMedia('(pointer: coarse)').matches;
  const narrow = window.matchMedia('(max-width: 767px)').matches;

  function injectScrollProgress() {
    if (document.querySelector('.bl-scroll-progress')) return;
    const bar = document.createElement('div');
    bar.className = 'bl-scroll-progress';
    bar.setAttribute('aria-hidden', 'true');
    document.body.appendChild(bar);
    const update = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = h > 0 ? `${(window.scrollY / h) * 100}%` : '0%';
    };
    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  function initRpmPreloader() {
    const el = document.getElementById('bl-rpm');
    if (!el || reduced) return;
    const target = 7200;
    const start = performance.now();
    const dur = 1800;
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 2.5);
      const v = Math.round(eased * target);
      el.textContent = v.toLocaleString('pt-BR');
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  function initSpeedCanvas() {
    const canvas = document.querySelector('.bl-speed-canvas');
    if (!canvas || reduced || narrow) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const parent = canvas.parentElement;
    let w = 0;
    let h = 0;
    const lines = [];
    const count = 48;

    function resize() {
      if (!parent) return;
      w = parent.offsetWidth;
      h = parent.offsetHeight;
      canvas.width = w;
      canvas.height = h;
    }

    for (let i = 0; i < count; i++) {
      lines.push({
        x: Math.random() * 2000,
        y: Math.random() * 800,
        len: 40 + Math.random() * 120,
        speed: 4 + Math.random() * 10,
        opacity: 0.08 + Math.random() * 0.2,
      });
    }

    function frame() {
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);
      ctx.strokeStyle = 'rgba(228, 179, 21, 0.6)';
      ctx.lineWidth = 1;
      lines.forEach((l) => {
        l.x += l.speed;
        if (l.x > w + l.len) {
          l.x = -l.len - Math.random() * 200;
          l.y = Math.random() * h;
        }
        ctx.globalAlpha = l.opacity;
        ctx.beginPath();
        ctx.moveTo(l.x, l.y);
        ctx.lineTo(l.x + l.len, l.y + l.len * 0.08);
        ctx.stroke();
      });
      ctx.globalAlpha = 1;
      requestAnimationFrame(frame);
    }

    resize();
    window.addEventListener('resize', resize);
    frame();
  }

  function initHeroSpotlight() {
    const hero = document.querySelector('[data-spotlight]');
    const spot = hero?.querySelector('.bl-hero__spotlight');
    if (!hero || !spot || reduced || !window.matchMedia('(pointer: fine)').matches) return;
    hero.addEventListener('mousemove', (e) => {
      const r = hero.getBoundingClientRect();
      const mx = ((e.clientX - r.left) / r.width) * 100;
      const my = ((e.clientY - r.top) / r.height) * 100;
      spot.style.setProperty('--mx', `${mx}%`);
      spot.style.setProperty('--my', `${my}%`);
    });
  }

  function initCardEffects() {
    document.querySelectorAll('.bl-card, .bl-glass').forEach((card) => {
      card.classList.add('bl-card--shine');
      if (reduced || coarse) return;
      card.addEventListener('mousemove', (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-2px)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  function initMagneticButtons() {
    if (reduced || coarse) return;
    document.querySelectorAll('.bl-btn--gold, .bl-btn--magnetic').forEach((btn) => {
      btn.classList.add('bl-btn--magnetic');
      btn.addEventListener('mousemove', (e) => {
        const r = btn.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        btn.style.transform = `translate(${x * 0.15}px, ${y * 0.2}px)`;
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
      });
    });
  }

  function initGaugeStats() {
    const targets = { '10': 270, '7': 200, '180': 320, '90': 300 };
    document.querySelectorAll('.bl-stat').forEach((stat) => {
      stat.classList.add('bl-stat--gauge');
      const strong = stat.querySelector('[data-count]');
      if (!strong) return;
      const key = strong.getAttribute('data-count') || '';
      const deg = targets[key] ?? 250;
      const io = new IntersectionObserver(
        (entries) => {
          if (!entries[0].isIntersecting) return;
          io.disconnect();
          stat.style.setProperty('--gauge-deg', `${deg}deg`);
          stat.classList.add('is-gauged');
        },
        { threshold: 0.6 },
      );
      io.observe(stat);
    });
  }

  function initStagger() {
    document.querySelectorAll('[data-stagger]').forEach((group) => {
      const io = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            group.classList.add('is-staggered');
            io.disconnect();
          }
        },
        { threshold: 0.15 },
      );
      io.observe(group);
    });
  }

  function initCinemaMedia() {
    document.querySelectorAll('.bl-split__media').forEach((el) => {
      el.classList.add('bl-split__media--cinema');
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) e.target.classList.add('is-visible');
          });
        },
        { threshold: 0.25 },
      );
      io.observe(el);
    });
  }

  function initPageHeroLit() {
    document.querySelectorAll('.bl-page-hero').forEach((hero) => {
      if (!hero.querySelector('.bl-page-hero__streak')) {
        const streak = document.createElement('div');
        streak.className = 'bl-page-hero__streak';
        streak.setAttribute('aria-hidden', 'true');
        hero.appendChild(streak);
      }
      requestAnimationFrame(() => hero.classList.add('is-lit'));
    });
  }

  function initShockwaves() {
    document.querySelectorAll('.bl-impact').forEach((wrap) => {
      const parent = wrap.closest('.bl-card') || wrap;
      parent.classList.add('bl-shockwave-wrap');
      const io = new IntersectionObserver(
        (entries) => {
          if (!entries[0].isIntersecting) return;
          io.disconnect();
          const wave = document.createElement('span');
          wave.className = 'bl-shockwave';
          parent.appendChild(wave);
          requestAnimationFrame(() => wave.classList.add('is-active'));
        },
        { threshold: 0.5 },
      );
      io.observe(wrap);
    });
  }

  function initPpfHeal() {
    const map = document.getElementById('bl-ppf-map');
    if (!map || reduced) return;
    map.addEventListener('click', (e) => {
      if (!(e.target instanceof HTMLElement) || !e.target.classList.contains('bl-ppf-hotspot')) return;
      const r = map.getBoundingClientRect();
      const ring = document.createElement('span');
      ring.className = 'bl-heal-ring';
      ring.style.left = `${e.clientX - r.left}px`;
      ring.style.top = `${e.clientY - r.top}px`;
      ring.style.width = '2rem';
      ring.style.height = '2rem';
      ring.style.marginLeft = '-1rem';
      ring.style.marginTop = '-1rem';
      map.appendChild(ring);
      ring.addEventListener('animationend', () => ring.remove());
    });
  }

  function initHeatPulse() {
    const slider = document.getElementById('bl-heat-slider');
    const box = document.querySelector('.bl-heat-compare');
    if (!slider || !box) return;
    slider.addEventListener('input', () => {
      box.classList.remove('is-hot');
      void box.offsetWidth;
      box.classList.add('is-hot');
    });
  }

  function initWarrantyPulse() {
    document.querySelectorAll('.bl-warranty').forEach((w) => w.classList.add('bl-warranty--pulse'));
  }

  function initRevealVariants() {
    document.querySelectorAll('.bl-split > div:first-child .bl-reveal').forEach((el) => {
      el.classList.add('bl-reveal--left');
    });
    document.querySelectorAll('.bl-split > div:last-child .bl-reveal').forEach((el) => {
      el.classList.add('bl-reveal--right');
    });
  }

  window.BlackLineMotion = {
    init() {
      injectScrollProgress();
      initRpmPreloader();
      initSpeedCanvas();
      initHeroSpotlight();
      initCardEffects();
      initMagneticButtons();
      initGaugeStats();
      initStagger();
      initCinemaMedia();
      initPageHeroLit();
      initShockwaves();
      initPpfHeal();
      initHeatPulse();
      initWarrantyPulse();
      initRevealVariants();
    },
  };

  document.addEventListener('DOMContentLoaded', () => {
    window.BlackLineMotion?.init?.();
  });
})();
