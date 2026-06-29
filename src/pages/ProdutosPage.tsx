import { PageHeader } from '../components/PageHeader';
import { BLACKLINE_PRODUCTS } from '../data/blackline';
import styles from './ProdutosPage.module.css';

export function ProdutosPage() {
  const categories = [...new Set(BLACKLINE_PRODUCTS.map((p) => p.category))];

  return (
    <div>
      <PageHeader
        badge="Catálogo"
        title="Produtos"
        subtitle="Linha completa de proteção automotiva BlackLine."
      />
      {categories.map((cat) => (
        <section key={cat} className={styles.section}>
          <h2 className={styles.category}>{cat}</h2>
          <div className={styles.grid}>
            {BLACKLINE_PRODUCTS.filter((p) => p.category === cat).map((product) => (
              <article key={product.id} className={styles.card}>
                <div className={styles.cardHead}>
                  <h3 className={styles.name}>{product.name}</h3>
                  <span className={styles.warranty}>{product.warranty}</span>
                </div>
                <p className={styles.highlight}>{product.highlight}</p>
                <ul className={styles.features}>
                  {product.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
