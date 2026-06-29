import { readFileSync, writeFileSync, cpSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const siteImg = join(__dirname, '../public/site/img');
const publicImg = join(__dirname, '../public/img');

const png32 = readFileSync(join(siteImg, 'favicon-32.png'));
const b64 = png32.toString('base64');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" role="img" aria-label="BlackLine">
  <rect width="32" height="32" fill="#f6f8fb"/>
  <image href="data:image/png;base64,${b64}" width="32" height="32" preserveAspectRatio="xMidYMid meet"/>
</svg>
`;

writeFileSync(join(siteImg, 'favicon.svg'), svg);
writeFileSync(join(publicImg, 'favicon.svg'), svg);

for (const name of ['favicon-16.png', 'favicon-32.png', 'favicon.png', 'apple-touch-icon.png']) {
  cpSync(join(siteImg, name), join(publicImg, name));
}

console.log('favicon.svg atualizado com PNG embutido (base64)');
