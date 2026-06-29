import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, '../public/site/img');

/** Imagens extraídas dos HTMLs em demo/ */
const images = {
  'hero.png': 'https://lh3.googleusercontent.com/aida-public/AB6AXuBb-pNk6Y2ZzyiclGWmcDrdAM4T2F7w1Z7xFmns6FjWnaQCgPwmoGvF_Cc9Wlmo7wzXSmJ_P8U2Zt0am02P-FQQvV6uG6xUKY9URmYLNfyAbyML9MbuAO_iKcTFHTWtnmBVWw4-4uNjg7lt9agzDexocLDreAd8Oa6fsKthrUk5EJMTFmuLDVhO8jTfI2A442DTD5baNRRSTTyKN2QYeTBQo-kqe8jYEk6OWVtzEq_j4E5qwnl9wjzPoJikW53KyvddCL6nfQlZAq-0',
  'peliculas-hero.png': 'https://lh3.googleusercontent.com/aida-public/AB6AXuACN008JJgRtbO_rMVwlyweuq-JFY1agl40Jg8_Adzhkp9U-2LZp1KVdhTynlQ-jf_DVrRjwTslHbTwv9sP98iEa9St00J8cmNfIOH1iFnAJ1NifdzbAwJCPQHfbP_LQNLbcv1XJn8O0KFGAZhos3QW2CeJeO8ZwIWcdbRp1JglUtzJVMF7YKqU2dRb3H7fT5l3C3ClFtpuPva_byeuiZlYES9UyXXJRyOzoiCLY1Bu3Z2wr3Ac_ep0C6tc8w9dg35M6Zo9U4WODVOW',
  'peliculas-carbon.png': 'https://lh3.googleusercontent.com/aida-public/AB6AXuBjRvqz3NeSYvxDGFICgSDXolG4687Hnt5nhoJIiBZ-jYR0mmdSxt9zJoa1OoWTgXUABRFbGpFkj2QlXJQZv_LCNvxUc7IAuGqdz8SH1aM71NKQT1wo-IMT-xpQU7IOh9xY5oIaCAVzrNTaI9lDCh3QfPLuLdsY27DIvxX7jWNRgXtJi09GWUJvHq6YVhZizZV7ilwgjDY0ITE6tEnUzamPnnn8f02W1Ntd2_MUQr0IdJ6HRzlmMQAaY_M_JWzEdUL3b0pfVxyxLg0c',
  'peliculas-ceramic.png': 'https://lh3.googleusercontent.com/aida-public/AB6AXuABq243uwu1fy_vISBOft0J7YNekO8ko8G-AF-cNfQm0VEMbT2yTZkgIIGdYTXgXYRc0nbChFX4lW7d_sXqJ3kqcLwFFcymldvQo1UsyW72JfiTenTYhSYpxji0Or6hSpacYscEn56e1oaVw2OqKk1pLEylXu-i_KcIkbya_C9mEZmPGKwl91S0KJMsoXfG-htzJAAey6D1qO6aRDDgqh1n3MlNKDV-t5OLrWXk07yBETtIJuIK9gdaH5CBcp0cCxF7_ca5MoUJB4A5',
  'antivandalismo-hero.png': 'https://lh3.googleusercontent.com/aida-public/AB6AXuCe8MUeXaINfe4kugJ2L0nErohN-jaWzRhoilRqYiTuPeTe3yJ6woEy6js8Ap-2vOgDjNsbTio8NnBSJOXgW3hNQLN69xYpoddGwfRt_HZbnYrnvgXpy1p12Wng28kZ1N37Rhg7Eg5fiUDyFdJ3n6E7saWg6v0bjFvKd9KtWopkELryYju5wD39s5V6hkVCSj8D26IxBcLsuXA0vNXcpB7Nu_bb50kyHjlF7c9gVxgxkOq_yxuRPgSGmJScZY_Pqhq_CCoIZmHVCS-6',
  'antivandalismo-glass.png': 'https://lh3.googleusercontent.com/aida-public/AB6AXuAJiH19w8RzxbE6Wyen7fEfcdMMeTBGmPEZMBxcju2-ecE0xJO8xGcfAanxtPZi-h2RVVUo6-Zq-cxyPbtBHmQMlqO9F065_9oaYZmPXOsAeQBQfcgz7oCrJV_kppwe5iIUxiqSB1PDBM6tz_BVPNGTtFTcfh3ttXUkteyg6Hg_8gIOZhahb1TpGikXuYoXFY3joI3IAkgmGYZvEkMu4EiTdDFn9by0YhrZvTBqVDSj2tTum1CyWNHG4bYOsLx8tfOeRK84cCgBxcON',
  'antivandalismo-impact-antes.png': 'https://lh3.googleusercontent.com/aida-public/AB6AXuCSfnzZP2z4_mLRArNbMaek1XDKrAR-Z8gTu3pQ_KSavbtP63aItBV4Z7bbP_MYlNbDshGzhZ0ak0rcuAneqxs40PPcwiNFisFzRn1TXxraVIVTT3ZvVI81xzrOs9oixMFmBAiX0tWAOgKqpnBH-jMzYJ2hCa-r-Z9hpcOddIZtl2SXOL4aCZAq0lSV-cSYkYJITxdky-zPG_NC70DfeBOwMZhSCurcMjV969yItgUYUnAfR92-J85Ljg7J7L5i_-9HmoZaPIibNQ4F',
  'antivandalismo-impact-depois.png': 'https://lh3.googleusercontent.com/aida-public/AB6AXuALNWGJthzz9sin7RvUC9-u9rY-N4Y--Qc2AzRqh_DPQe0qCtnlGTqFOLb9T8hipwCQvqA-Mg4FAO4AUqC900YSlm1_dJVgs3lYXl5tj1lZWdxl2T98_nF-rtW7TNS4bcG8HbvWqIN2-HjkrTOot6dRCqySpYx8sCG2MSRseTw7eewVix3db-AJXhKpP1h2DiynG1fef2UwjaEERhmX-vtAtU9ILElaclrK4oxrIccf9vQeAK_4nagQRXaxUIwtzRYvBjojW5VgNcxf',
  'ppf-hero.png': 'https://lh3.googleusercontent.com/aida-public/AB6AXuAacSDOyOZXwW7t6iBqmOAbHnTUUDDkZkNGBGycCmCC4CSXeZmoutGMx0W0P9pygZYqn19MP3lIV2wgHlpoBIXNHhJA3BJs63xXHggQCp09hmPRG0nb_lNa_tfjkQ6nNZucvWuLNCTNAH1NN-znIDHL2ysfik7CV_JW_Atq8qx-02dCn5QB9-C432IE3yIemAQ7TuT_XP-RVOqLWagib7rWrMMWPZjkmaEpmJeloIH9k3SB3bVPGNztaFzQA8DDdvcPOhfhhYPpea-O',
  'ppf-cobertura.png': 'https://lh3.googleusercontent.com/aida-public/AB6AXuA3CuV3TN-yzh2_CjlP8y0ezKIfLsUaWWCnQTSOUkGDt4tQKoNjgfFEGrjn93SfQbJjkUbYnYPPwcTPycRkFz5SMALFI7U89OZbQV9aXjqj_0RIn1kgZi5W-oubF851sHVBtGokAb2YjJSJ-FqTp1jIk1Hes8UR2T5u8eKrrVnlC1yLczqvBSs4MjQHvQLcLnjK2UNU2unwTykapt2wm8Wek81Vyn_cs5cUqp0biShQycQLBlpdau82O3JiWpPStWQmUvoo6hgTKaVY',
  'sobre-hero.png': 'https://lh3.googleusercontent.com/aida-public/AB6AXuCEfsbWbmohqSPSyjmvJJk_FCZit97ak-jVO7NJhbi-cXoMxq20Vs5FPCWYaIJ4rhwuJEobSk_iwHZSMIJkocoCV7_iomNyMaMQcSh5ZPpsaFaV0cbHBVnHGqOz-j026K7_XyAwdvIIqUOSTzpI7gdPepDpFdzYOmEH5kYdF0egOYi3g0T0zJ7wZBy9HIInMDp0zDFIwBceII1K2pNtq9gA9MpOLGUsDzf3bqGMtiLhn33hYYvXesGqrhdMGKV1e7YAj872fnlZmrFd',
  'sobre-instalacao.png': 'https://lh3.googleusercontent.com/aida-public/AB6AXuB7kEjqxb2u6tr3JLFmqvYM5WTamA3Lh-dJND2MWNtgKOqW5mVF2kaor-NqElhg5puyp-m0j_duC4WD3LHXtUl36ygLCiS1C6Be3nUnAiWuvWFKHwTIJMXK9FUsQPzpK4FBXzJURtghXjBsPyJd_NwoYd4-481DTTzmhqtOeOwjN60BbfX0PdTQjUUHZV5wzbbbTJsgHmg8uMbpf8kCtLdFg3lez3eBhG2Rn73fToyF-PBb_f2X9r7b0EyH_OsyUf_DznjVzQhkQf2z',
  'orcamento-textura.png': 'https://lh3.googleusercontent.com/aida-public/AB6AXuBE99cpCFIKDSz17G9L8_o7i3VL8W5UulCJ-7lHjB05WySlkgio3eWELXHBIk-E4_OoQLWpDI9umfjXQdwHV_000_DWug7qHTVU68-H8KRPZhYihqbFdwzhM5uUZfQR2yR42b8-mzEMZSXM7b3SleeKznbtEVbRvjZw1WdWAYX-EUHWvHVXAr_PZVTbZeSnWibflyef95PwNr7pwPH704Y9G9wZXpvI70lPl8wYrWE4ELhTj0dK7nNgfgkh2Ff9TA7YGjRFEQfPyrj-',
  'mapa-sp.png': 'https://lh3.googleusercontent.com/aida-public/AB6AXuDheiQm863NMlMyjhJeWC0MOU-9UbH7HhXpNQnTKZfXP9VFvC4GtA5z-AvpT7uPJk99JlykSlIkgKzIOpyhnYxyXG8NBk2N7ydzzjFvaLV5NtCAs3DhRG6nOpJFGjHSC6yrE4LqnUzyBOZ3ZRAQYNUeg39LGpEHdyQjiO6IPE_JlnMoiE_gsDC4f_KKyOWq7IrS6A0eKdpMaKZiuSgWU8sNw85QXLsv3sOxxz3K0VJY6CRFrSXR_xBygEA4caFBdCph6AomjwrcGngw',
};

await mkdir(outDir, { recursive: true });

for (const [name, url] of Object.entries(images)) {
  process.stdout.write(`Baixando ${name}… `);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${name}: HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(path.join(outDir, name), buf);
  console.log(`${(buf.length / 1024).toFixed(1)} KB`);
}

console.log('Imagens demo salvas em public/site/img/');
