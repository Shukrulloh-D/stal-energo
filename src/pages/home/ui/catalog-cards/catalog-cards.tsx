import { Link } from 'react-router-dom'
import { CATEGORIES } from '@/entities/catalog'
import { Button } from '@/shared/ui/button'
import './catalog-cards.css'

export function CatalogCards() {
  return (
    <section className="catalog-cards">
      <div className="container">
        <div className="catalog-cards-grid">
          {CATEGORIES.slice(0, 4).map((category) => (
            <article key={category.slug} className="catalog-card">
              <img className="catalog-card-image" src={'/images/categories/' + category.slug + '.png'} alt="" loading="lazy" />
              <h3 className="catalog-card-title">{category.title}</h3>
              <ul className="catalog-card-links">
                {category.subs.slice(0, 4).map((sub) => (
                  <li key={sub.slug}>
                    <Link to={'/catalog/' + category.slug + '/' + sub.slug}>{sub.title}</Link>
                  </li>
                ))}
              </ul>
              <Link className="catalog-card-all" to={'/catalog/' + category.slug}>
                Смотреть все
              </Link>
            </article>
          ))}
        </div>

        <div className="catalog-cards-actions">
          <Button to="/catalog/trubnyy-prokat">Смотреть все</Button>
          <Button color="orange" to="/price-lists">
            Скачать прайс-лист
          </Button>
        </div>
      </div>
    </section>
  )
}
