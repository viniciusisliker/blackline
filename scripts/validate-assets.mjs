import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const site = join(dirname(fileURLToPath(import.meta.url)), '../public/site');
const imgs = new Set();

for (const dir of ['', 'components']) {
  const base = join(site, dir);
  for (const file of readdirSync(base).filter((f) => f.endsWith('.html'))) {
    const html = readFileSync(join(base, file), 'utf8');
    for (const m of html.matchAll(/(?:src|href)="img\/([^"?]+)/g)) imgs.add(m[1]);
  }
}

const missing = [];
const tiny = [];
for (const name of [...imgs].sort()) {
  const path = join(site, 'img', name);
  if (!existsSync(path)) missing.push(name);
  else if (statSync(path).size < 1024 && name.endsWith('.png')) tiny.push(`${name} (${statSync(path).size}B)`);
}

console.log(`Image refs: ${imgs.size}`);
if (missing.length) {
  console.log('MISSING:', missing.join(', '));
}
if (tiny.length) {
  console.log('SUSPICIOUSLY SMALL:', tiny.join(', '));
}
if (!missing.length && !tiny.length) console.log('All image refs OK');
