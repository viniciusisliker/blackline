import { cpSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const dist = 'dist';

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

cpSync('public', dist, { recursive: true });

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

console.log('Build estático concluído → dist/');
