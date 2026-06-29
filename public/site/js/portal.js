(function () {
  const WARRANTIES = [
    {
      placa: 'ABC1D23',
      cliente: 'Rafael M.',
      veiculo: 'Porsche 911',
      servico: 'PPF + Ceramic BLACK',
      garantiaAte: '2036-03-15',
      status: 'Ativa',
    },
    {
      placa: 'JKL7M89',
      cliente: 'Eduardo L.',
      veiculo: 'Mercedes AMG GT',
      servico: 'Shield GLASS',
      garantiaAte: '2033-11-20',
      status: 'Ativa',
    },
  ];

  function norm(placa) {
    return placa.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
  }

  function findWarranty(placa) {
    const n = norm(placa);
    return WARRANTIES.find((w) => norm(w.placa) === n);
  }

  function formatDate(iso) {
    return new Date(iso + 'T12:00:00').toLocaleDateString('pt-BR');
  }

  function renderResult(w) {
    const el = document.getElementById('bl-portal-result');
    if (!el) return;
    el.hidden = false;
    el.innerHTML = `
      <p class="bl-portal__badge">Garantia encontrada</p>
      <h2 class="bl-portal__client">${w.cliente}</h2>
      <p class="bl-portal__vehicle">${w.veiculo} · ${w.placa}</p>
      <div class="bl-portal__grid">
        <article class="bl-portal__card">
          <span class="material-symbols-outlined">verified</span>
          <h3>Serviço</h3>
          <p>${w.servico}</p>
        </article>
        <article class="bl-portal__card">
          <span class="material-symbols-outlined">event</span>
          <h3>Garantia até</h3>
          <p>${formatDate(w.garantiaAte)}</p>
        </article>
        <article class="bl-portal__card">
          <span class="material-symbols-outlined">shield</span>
          <h3>Status</h3>
          <p class="${w.status === 'Ativa' ? 'bl-portal__status--active' : 'bl-portal__status--expired'}">${w.status}</p>
        </article>
      </div>
      <div class="bl-portal__actions">
        <a href="https://wa.me/5511939287036" class="bl-btn bl-btn--gold" target="_blank" rel="noopener">Falar com a equipe</a>
        <a href="garantia.html" class="bl-btn bl-btn--ghost">Ver termos de garantia</a>
      </div>
    `;
  }

  const form = document.getElementById('bl-portal-form');
  const errorEl = document.getElementById('bl-portal-error');
  const resultEl = document.getElementById('bl-portal-result');
  const input = document.getElementById('bl-portal-placa');

  if (!form || !input) return;

  input.addEventListener('input', () => {
    input.value = input.value.toUpperCase();
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (errorEl) errorEl.hidden = true;
    const found = findWarranty(input.value);
    if (!found) {
      if (resultEl) resultEl.hidden = true;
      if (errorEl) {
        errorEl.hidden = false;
        errorEl.textContent = 'Placa não encontrada. Verifique os dados ou fale com a equipe.';
      }
      return;
    }
    renderResult(found);
  });
})();
