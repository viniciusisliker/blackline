(function () {
  const STACKS = {
    'defense-glass': {
      ariaLabel: 'Diagrama 3D Defense GLASS: impacto, filme de reforço, adesivo e vidro',
      hint: 'Toque ou passe o mouse para ver as camadas',
      beam: true,
      layers: [
        { name: 'Impacto', detail: 'Até 180 kg dissipados', slab: 'impact', swatch: 'gold' },
        { name: 'Filme Defense', detail: 'Reforço estrutural 30×', slab: 'film-defense', swatch: 'gold' },
        { name: 'Adesivo', detail: 'Coesão permanente', slab: 'bond', swatch: 'gold' },
        { name: 'Vidro', detail: 'Integridade mantida', slab: 'glass', swatch: 'glass' },
      ],
    },
    antivandalismo: {
      ariaLabel: 'Diagrama 3D antivandalismo: impacto, película Ps8, adesivo e vidro',
      hint: 'Toque ou passe o mouse para explodir as camadas',
      beam: true,
      layers: [
        { name: 'Impacto', detail: 'Ps8 · até 65 kg', slab: 'impact', swatch: 'gold' },
        { name: 'Película Ps8', detail: 'Barreira antivandalismo', slab: 'film-security', swatch: 'film' },
        { name: 'Adesivo', detail: 'Retenção de fragmentos', slab: 'bond', swatch: 'gold' },
        { name: 'Vidro', detail: 'Sem estilhaçamento', slab: 'glass', swatch: 'glass' },
      ],
    },
    ppf: {
      ariaLabel: 'Diagrama 3D PPF: impacto, filme de poliuretano, adesivo e pintura',
      hint: 'Toque ou passe o mouse para ver a estrutura',
      beam: true,
      layers: [
        { name: 'Detrito', detail: 'Pedra, inseto, detrito', slab: 'impact', swatch: 'gold' },
        { name: 'PPF', detail: 'Poliuretano self-healing', slab: 'film-ppf', swatch: 'ppf' },
        { name: 'Adesivo', detail: 'Removível sem danos', slab: 'bond', swatch: 'gold' },
        { name: 'Pintura', detail: 'Verniz original preservado', slab: 'paint', swatch: 'paint' },
      ],
    },
    'pelicula-termica': {
      ariaLabel: 'Diagrama 3D película térmica: radiação solar, filme nanocerâmico, adesivo e vidro',
      hint: 'Toque ou passe o mouse para ver as camadas',
      beam: false,
      layers: [
        { name: 'Radiação IR/UV', detail: 'Até 90% rejeição térmica', slab: 'ir', swatch: 'gold' },
        { name: 'Ceramic BLACK', detail: 'Nanocerâmica premium', slab: 'film-tint', swatch: 'tint' },
        { name: 'Adesivo', detail: 'Fixação óptica', slab: 'bond', swatch: 'gold' },
        { name: 'Vidro', detail: 'Visibilidade interna', slab: 'glass', swatch: 'glass' },
      ],
    },
  };

  function renderStack(type) {
    const cfg = STACKS[type];
    if (!cfg) return '';

    const layers = cfg.layers
      .map((layer, i) => {
        const idx = cfg.layers.length - 1 - i;
        return `
        <li class="bl-stack3d__layer" style="--layer-i:${idx}">
          <div class="bl-stack3d__slab bl-stack3d__slab--${layer.slab}"></div>
          ${layer.slab !== 'bond' && layer.slab !== 'impact' && layer.slab !== 'ir' ? `
            <div class="bl-stack3d__edge bl-stack3d__edge--front" aria-hidden="true"></div>
            <div class="bl-stack3d__edge bl-stack3d__edge--side" aria-hidden="true"></div>
          ` : ''}
          <span class="bl-stack3d__tag">${layer.name}<small>${layer.detail}</small></span>
        </li>`;
      })
      .join('');

    const legend = cfg.layers
      .filter((l) => l.slab !== 'impact' && l.slab !== 'ir')
      .map(
        (l) =>
          `<li><span class="bl-stack3d__swatch bl-stack3d__swatch--${l.swatch}" aria-hidden="true"></span><span><strong>${l.name}</strong> — ${l.detail}</span></li>`,
      )
      .join('');

    return `
      <figure class="bl-stack3d" data-stack3d="${type}" aria-label="${cfg.ariaLabel}">
        <p class="bl-stack3d__hint">${cfg.hint}</p>
        <div class="bl-stack3d__viewport" tabindex="0" role="button" aria-pressed="false" aria-label="${cfg.hint}">
          <div class="bl-stack3d__grid" aria-hidden="true"></div>
          ${cfg.beam ? '<div class="bl-stack3d__beam" aria-hidden="true"></div>' : ''}
          <div class="bl-stack3d__scene">
            <ol class="bl-stack3d__layers">${layers}</ol>
          </div>
        </div>
        <figcaption><ul class="bl-stack3d__legend">${legend}</ul></figcaption>
      </figure>`;
  }

  function bindStack(root) {
    const viewport = root.querySelector('.bl-stack3d__viewport');
    if (!viewport) return;

    const setExpanded = (on) => {
      root.classList.toggle('is-expanded', on);
      viewport.setAttribute('aria-pressed', on ? 'true' : 'false');
    };

    viewport.addEventListener('click', () => setExpanded(!root.classList.contains('is-expanded')));
    viewport.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setExpanded(!root.classList.contains('is-expanded'));
      }
    });

    if (window.matchMedia('(hover: hover)').matches) {
      root.addEventListener('mouseenter', () => setExpanded(true));
      root.addEventListener('mouseleave', () => setExpanded(false));
    }
  }

  function initStack3d() {
    document.querySelectorAll('[data-stack3d-host]').forEach((host) => {
      if (host.dataset.stack3dReady === 'true') return;
      const type = host.getAttribute('data-stack3d-host');
      host.innerHTML = renderStack(type);
      host.dataset.stack3dReady = 'true';
      const stack = host.querySelector('.bl-stack3d');
      if (stack) bindStack(stack);
    });
  }

  window.BlackLine3d = { initStack3d, renderStack };

  document.addEventListener('DOMContentLoaded', initStack3d);
})();
