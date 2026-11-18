import { useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { EMPTY_FILTERS, filterProducts, findSub, productsOf, searchProducts } from '@/entities/catalog'
import type { Filters, Product } from '@/entities/catalog'
import { Breadcrumbs } from '@/shared/ui/breadcrumbs'
import { EmptyState } from '@/shared/ui/empty-state'
import { Icon } from '@/shared/ui/icon'
import { Pagination } from '@/shared/ui/pagination'
import { Select } from '@/shared/ui/select'
import { FilterForm } from '../filter-form/filter-form'
import { ProductTable } from '../product-table/product-table'
import './product-list-page.css'

const PER_PAGE = 20
const SORTS = ['По возрастанию цены', 'По убыванию цены', 'По названию']

function sortProducts(list: Product[], sort: string): Product[] {
  if (sort === 'По названию') {
    return [...list].sort((a, b) => a.name.localeCompare(b.name, 'ru'))
  }

  // товары без цены всегда в конце
  const withPrice = list.filter((product) => product.priceType === 'price')
  const rest = list.filter((product) => product.priceType !== 'price')
  const direction = sort === 'По убыванию цены' ? -1 : 1

  withPrice.sort((a, b) => (a.price - b.price) * direction)
  return [...withPrice, ...rest]
}

interface ProductListProps {
  title: string
  source: Product[]
  crumbs: Array<{ label: string; to?: string }>
}

function ProductList({ title, source, crumbs }: ProductListProps) {
  const [draft, setDraft] = useState<Filters>(EMPTY_FILTERS)
  const [filters, setFilters] = useState<Filters>(EMPTY_FILTERS)
  const [sort, setSort] = useState(SORTS[0])
  const [view, setView] = useState<'table' | 'cards'>('table')
  const [page, setPage] = useState(1)

  const list = sortProducts(filterProducts(source, filters), sort)
  const totalPages = Math.max(1, Math.ceil(list.length / PER_PAGE))
  const current = Math.min(page, totalPages)
  const visible = list.slice((current - 1) * PER_PAGE, current * PER_PAGE)

  function apply() {
    setFilters(draft)
    setPage(1)
  }

  function reset() {
    setDraft(EMPTY_FILTERS)
    setFilters(EMPTY_FILTERS)
    setPage(1)
  }

  const pager = (
    <div className="product-list-bar">
      <Pagination page={current} total={totalPages} onChange={setPage} />
      <span className="product-list-count">
        Отображение {visible.length} из {list.length}
      </span>
    </div>
  )

  return (
    <div className="container product-list-page">
      <div className="product-list-head">
        <h1 className="page-title">{title}</h1>
        <Breadcrumbs items={crumbs} />
      </div>

      <FilterForm value={draft} onChange={setDraft} onApply={apply} onReset={reset} />

      <div className="product-list-bar">
        <Pagination page={current} total={totalPages} onChange={setPage} />
        <div className="product-list-tools">
          <span className="product-list-count">
            Отображение {visible.length} из {list.length}
          </span>
          <div className="product-list-sort">
            <Select value={sort} options={SORTS} onChange={setSort} />
          </div>
          <button
            className={view === 'cards' ? 'view-button view-button-active' : 'view-button'}
            aria-label="Карточки"
            aria-pressed={view === 'cards'}
            onClick={() => setView('cards')}
          >
            <Icon name="rows" size={16} />
          </button>
          <button
            className={view === 'table' ? 'view-button view-button-active' : 'view-button'}
            aria-label="Таблица"
            aria-pressed={view === 'table'}
            onClick={() => setView('table')}
          >
            <Icon name="table" size={16} />
          </button>
        </div>
      </div>

      {visible.length > 0 ? (
        <ProductTable products={visible} view={view} />
      ) : (
        <p className="product-list-empty">Ничего не найдено. Измените условия поиска или сбросьте фильтр.</p>
      )}

      {pager}
    </div>
  )
}

export function ProductListPage() {
  const { category, sub } = useParams()
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') ?? ''

  if (!sub) {
    return (
      <ProductList
        key={'search-' + query}
        title="Результаты поиска"
        source={searchProducts(query)}
        crumbs={[{ label: 'Главная', to: '/' }, { label: 'Поиск' }]}
      />
    )
  }

  const found = findSub(category, sub)

  if (!found) {
    return <EmptyState title="Раздел не найден" to="/" button="На главную" />
  }

  return (
    <ProductList
      key={found.sub.slug}
      title={found.sub.title}
      source={productsOf(found.sub.slug)}
      crumbs={[
        { label: 'Главная', to: '/' },
        { label: 'Каталог' },
        { label: found.category.title, to: '/catalog/' + found.category.slug },
        { label: found.sub.title },
      ]}
    />
  )
}
