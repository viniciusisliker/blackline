import { cpSync, mkdirSync, writeFileSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const dist = 'dist';
const siteSrc = join('public', 'site');
const siteDist = join(dist, 'site');

function redirect(target) {
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta http-equiv="refresh" content="0; url=${target}" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>BlackLine Studio Automotivo</title>
  <script>location.replace('${target}')</script>
</head>
<body>
  <p><a href="${target}">BlackLine Studio Automotivo</a></p>
</body>
</html>`;
}

function inlineLayout(html) {
  const navbar = readFileSync(join(siteSrc, 'components/navbar.html'), 'utf8');
  const footer = readFileSync(join(siteSrc, 'components/footer.html'), 'utf8');
  return html
    .replace('<div id="bl-navbar"></div>', `<div id="bl-navbar">${navbar}</div>`)
    .replace('<div id="bl-footer"></div>', `<div id="bl-footer">${footer}</div>`);
}

cpSync('public', dist, { recursive: true });

for (const file of readdirSync(siteDist).filter((f) => f.endsWith('.html'))) {
  const path = join(siteDist, file);
  const html = readFileSync(path, 'utf8');
  writeFileSync(path, inlineLayout(html), 'utf8');
}

writeFileSync(join(dist, 'index.html'), redirect('site/index.html'));
writeFileSync(join(dist, '404.html'), redirect('site/index.html'));

const legacy = [
  ['portal', 'site/portal.html'],
  ['dashboard', 'site/index.html'],
  ['login', 'site/index.html'],
];

for (const [path, target] of legacy) {
  const dir = join(dist, path);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), redirect(`../${target}`));
}

console.log('Build estático concluído → dist/ (navbar/footer inlined)');
