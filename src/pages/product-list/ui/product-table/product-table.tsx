import { Link } from 'react-router-dom'
import { PriceLabel, productImage } from '@/entities/catalog'
import type { Product } from '@/entities/catalog'
import { useCallbackModal } from '@/features/callback'
import { useCart } from '@/features/cart'
import { Icon } from '@/shared/ui/icon'
import './product-table.css'

interface ProductTableProps {
  products: Product[]
  view: 'table' | 'cards'
}

export function ProductTable({ products, view }: ProductTableProps) {
  const { add } = useCart()
  const { open: openCallback } = useCallbackModal()

  function order(product: Product) {
    if (product.priceType === 'price') {
      add({ id: product.id, name: product.name, price: product.price })
    } else {
      openCallback()
    }
  }

  if (view === 'cards') {
    return (
      <ul className="product-cards">
        {products.map((product) => (
          <li key={product.id} className="product-card">
            <Link to={'/product/' + product.id} className="product-card-image">
              <img src={productImage(product)} alt="" loading="lazy" />
            </Link>
            <Link to={'/product/' + product.id} className="product-card-name">
              {product.name}
            </Link>
            <p className="product-card-meta">
              {product.steel} · {product.gost}
            </p>
            <div className="product-card-bottom">
              <PriceLabel product={product} />
              <button className="product-cart" aria-label="В корзину" onClick={() => order(product)}>
                <Icon name="cart" size={20} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    )
  }

  return (
    <div className="product-table-wrap">
      <table className="product-table">
        <thead>
          <tr>
            <th>Наименование</th>
            <th>Марка</th>
            <th>ГОСТ</th>
            <th>Dy</th>
            <th>D1</th>
            <th>D</th>
            <th>Цена</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td className="product-table-name">
                <Link to={'/product/' + product.id}>{product.name}</Link>
              </td>
              <td>{product.steel}</td>
              <td>{product.gost}</td>
              <td>{product.dy}</td>
              <td>{product.d1}</td>
              <td>{product.d}</td>
              <td>
                <PriceLabel product={product} />
              </td>
              <td>
                <button className="product-cart" aria-label="В корзину" onClick={() => order(product)}>
                  <Icon name="cart" size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
