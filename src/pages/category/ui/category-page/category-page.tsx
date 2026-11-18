import { Link, useParams } from 'react-router-dom'
import { findCategory } from '@/entities/catalog'
import { Breadcrumbs } from '@/shared/ui/breadcrumbs'
import { EmptyState } from '@/shared/ui/empty-state'
import { WhyUs } from '@/widgets/why-us'
import './category-page.css'

export function CategoryPage() {
  const { category: slug } = useParams()
  const category = findCategory(slug)

  if (!category) {
    return <EmptyState title="Раздел не найден" to="/" button="На главную" />
  }

  return (
    <>
      <div className="container category-page">
        <div className="category-head">
          <h1 className="page-title">{category.title}</h1>
          <Breadcrumbs items={[{ label: 'Главная', to: '/' }, { label: 'Каталог' }, { label: category.title }]} />
        </div>

        <ul className="category-subs">
          {category.subs.map((sub) => (
            <li key={sub.slug}>
              <Link to={'/catalog/' + category.slug + '/' + sub.slug} className="category-sub">
                <img src={'/images/subcategories/' + sub.slug + '.png'} alt="" width={64} height={40} loading="lazy" />
                <span>{sub.title}</span>
              </Link>
            </li>
          ))}
        </ul>

        <section className="category-seo page-text">
          <div>
            <h2 className="category-seo-title">{category.title} по ценам от производителя</h2>
            <p>
              Равным образом, повышение уровня гражданского сознания не оставляет шанса для своевременного
              выполнения сверхзадач. А ещё репрезентативные с зарубежных источников, современные исследования
              неоднозначно и будут обнародованы.
            </p>
            <p>
              Банальные, но неопровержимые выводы, а также первые признаки победы институционализации,
              инициированные исключительно синтетически, превращены в посмеяние, хотя и не существовавшего принципа
              «несомненного потеху» общества.
            </p>
            <p>
              Таким образом, граница обучения кадров не даёт нам выбора, кроме определения существующих финансовых и
              административных условий.
            </p>
          </div>
          <img src="/images/seo.png" alt="" loading="lazy" />
        </section>
      </div>
      <WhyUs />
    </>
  )
}
