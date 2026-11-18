import { formatNumber } from '@/shared/lib/format'
import type { Product } from '../../model/products'
import './price-label.css'

export function PriceLabel({ product }: { product: Product }) {
  if (product.priceType === 'price') {
    return <b className="price-label">от {formatNumber(product.price)} руб. / т</b>
  }

  if (product.priceType === 'price-list') {
    return (
      <a className="price-label-link" href="/price-lists/pipes.csv" download>
        Скачать прайс
      </a>
    )
  }

  return <span className="price-label-link">Уточнять у менеджера</span>
}
