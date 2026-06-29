import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const siteDir = join(dirname(fileURLToPath(import.meta.url)), '../public/site');

for (const file of readdirSync(siteDir).filter((f) => f.endsWith('.html'))) {
  const path = join(siteDir, file);
  let html = readFileSync(path, 'utf8');
  html = html.replace(/\?v=2/g, '?v=3');

  if (file === 'portal.html' && !html.includes('favicon.svg')) {
    html = html.replace(
      '  <link rel="icon" type="image/png" sizes="16x16" href="img/favicon-16.png?v=3" />\n',
      '  <link rel="icon" type="image/png" sizes="16x16" href="img/favicon-16.png?v=3" />\n  <link rel="icon" type="image/svg+xml" href="img/favicon.svg?v=3" />\n',
    );
  }

  writeFileSync(path, html, 'utf8');
}

console.log('Favicon cache bump (?v=3) aplicado em public/site/*.html');
