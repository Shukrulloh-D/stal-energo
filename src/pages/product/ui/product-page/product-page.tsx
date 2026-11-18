import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { EXTRA_OPTIONS, findProduct, findSub, productImage } from '@/entities/catalog'
import type { Product } from '@/entities/catalog'
import { useCallbackModal } from '@/features/callback'
import { useCart } from '@/features/cart'
import { formatNumber, formatPrice } from '@/shared/lib/format'
import { Breadcrumbs } from '@/shared/ui/breadcrumbs'
import { Button } from '@/shared/ui/button'
import { EmptyState } from '@/shared/ui/empty-state'
import { Field } from '@/shared/ui/field'
import { Icon } from '@/shared/ui/icon'
import { Quantity } from '@/shared/ui/quantity'
import { Select } from '@/shared/ui/select'
import './product-page.css'

function ProductView({ product }: { product: Product }) {
  const { add } = useCart()
  const { open: openCallback } = useCallbackModal()
  const [qty, setQty] = useState(1)
  const [extra, setExtra] = useState('')
  const [added, setAdded] = useState(false)

  const found = findSub(product.categorySlug, product.subSlug)
  const hasPrice = product.priceType === 'price'

  useEffect(() => {
    if (!added) return
    const timer = setTimeout(() => setAdded(false), 1500)
    return () => clearTimeout(timer)
  }, [added])

  function addToCart() {
    add({ id: product.id, name: product.name, price: product.price }, qty, extra ? [extra] : [])
    setAdded(true)
  }

  const characteristics = [
    ['Толщина', String(product.thickness)],
    ['Длина', product.length + ' м'],
    ['Ширина', product.width / 1000 + ' м'],
    ['Марка стали', product.steel],
    ['ГОСТ', product.gost],
  ]

  return (
    <div className="container product-page">
      <div className="product-page-head">
        <h1 className="product-page-title">{product.name}</h1>
        <Breadcrumbs
          items={[
            { label: 'Главная', to: '/' },
            { label: 'Каталог' },
            ...(found
              ? [
                  { label: found.category.title, to: '/catalog/' + found.category.slug },
                  { label: found.sub.title, to: '/catalog/' + found.category.slug + '/' + found.sub.slug },
                ]
              : []),
            { label: product.name },
          ]}
        />
      </div>

      <div className="product-page-main">
        <img className="product-page-image" src={productImage(product)} alt="" />

        <div className="product-page-params">
          <div className="product-page-sizes">
            <Field label="Толщина" value={String(product.thickness)} readOnly onChange={() => undefined} />
            <Field label="Длина" value={String(product.length)} readOnly onChange={() => undefined} />
            <Field label="Ширина" value={String(product.width / 1000)} readOnly onChange={() => undefined} />
          </div>
          <Select label="Дополнительно" value={extra} options={EXTRA_OPTIONS} placeholder="Не нужно" onChange={setExtra} />
        </div>

        <div className="product-page-buy">
          {hasPrice ? (
            <>
              <div className="product-page-qty">
                <Quantity value={qty} onChange={setQty} />
                <span>шт</span>
              </div>
              <p className="product-page-total">
                Итого: <b>{formatPrice(product.price * qty)}</b>
              </p>
              <Button full onClick={addToCart}>
                {added ? 'Добавлено' : 'В корзину'}
              </Button>
            </>
          ) : (
            <>
              <p className="product-page-note">
                Цена по запросу
                <span title="Точную стоимость назовёт менеджер">
                  <Icon name="info" size={14} />
                </span>
              </p>
              <a className="text-link" href="/price-lists/pipes.csv" download>
                Скачать прайс-лист
              </a>
              <Button full onClick={openCallback}>
                Заказать
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="product-page-info">
        <section>
          <h2 className="section-title">Описание</h2>
          <div className="page-text product-page-text">
            <p>
              Купить товар «{product.name}» в Екатеринбурге по выгодной цене за метр, тонну или другую единицу
              измерения. Онлайн-калькулятор рассчитает стоимость, размеры и массу изделия (кг, т).
            </p>
            <p>
              Ознакомьтесь с описанием и техническими характеристиками товара на сайте или позвоните нам и получите
              консультацию наших специалистов.
            </p>
            <p>
              В продаже широкий ассортимент товаров категории «{found?.category.title}». Мы отвечаем за качество и
              предлагаем профессиональный сервис: услуги резки и металлообработки, погрузку и доставку металлопроката.
            </p>
          </div>
        </section>

        <section>
          <h2 className="section-title">Характеристики</h2>
          <dl className="product-page-specs">
            {characteristics.map(([name, value]) => (
              <div key={name}>
                <dt>{name}</dt>
                <dd>{value}</dd>
              </div>
            ))}
            <div>
              <dt>Цена за тонну</dt>
              <dd>{hasPrice ? 'от ' + formatNumber(product.price) + ' руб' : 'по запросу'}</dd>
            </div>
          </dl>
        </section>
      </div>
    </div>
  )
}

export function ProductPage() {
  const { id } = useParams()
  const product = findProduct(id)

  if (!product) {
    return <EmptyState title="Товар не найден" to="/" button="На главную" />
  }

  return <ProductView key={product.id} product={product} />
}
