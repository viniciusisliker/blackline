(function () {
  const SITE = 'https://viniciusisliker.github.io/blackline/site/';
  const business = {
    '@context': 'https://schema.org',
    '@type': 'AutoRepair',
    name: 'BlackLine Studio Automotivo',
    image: `${SITE}img/hero.png`,
    telephone: '+55-11-93928-7036',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Av. Engenheiro Caetano Álvares, 3004',
      addressLocality: 'São Paulo',
      addressRegion: 'SP',
      addressCountry: 'BR',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '18:00',
      },
    ],
    url: SITE,
  };

  function injectJsonLd() {
    if (document.querySelector('script[data-bl-jsonld]')) return;
    const el = document.createElement('script');
    el.type = 'application/ld+json';
    el.setAttribute('data-bl-jsonld', 'true');
    el.textContent = JSON.stringify(business);
    document.head.appendChild(el);
  }

  window.BlackLineSeo = { injectJsonLd };
})();
