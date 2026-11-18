import { EXTRA_OPTIONS } from '@/entities/catalog'
import { useCart } from '@/features/cart'
import { formatPrice } from '@/shared/lib/format'
import { Icon } from '@/shared/ui/icon'
import { MultiSelect } from '@/shared/ui/multi-select'
import { Quantity } from '@/shared/ui/quantity'
import './order-items.css'

export function OrderItems() {
  const { items, total, setQty, setExtras, remove } = useCart()

  return (
    <div className="order-items">
      <ul>
        {items.map((item) => (
          <li key={item.id} className="order-item">
            <img className="order-item-image" src="/images/products/chernyy-prokat.png" alt="" width={69} height={45} />
            <p className="order-item-name">{item.name}</p>
            <div className="order-item-cell">
              <span>Кол-во, шт</span>
              <Quantity value={item.qty} onChange={(qty) => setQty(item.id, qty)} />
            </div>
            <div className="order-item-cell order-item-extras">
              <span>Дополнительно</span>
              <MultiSelect options={EXTRA_OPTIONS} selected={item.extras} onChange={(list) => setExtras(item.id, list)} />
            </div>
            <p className="order-item-total">
              <span>Итого:</span>
              <b>{formatPrice(item.price * item.qty)}</b>
            </p>
            <button className="order-item-remove" aria-label="Убрать из заказа" onClick={() => remove(item.id)}>
              <Icon name="close" size={16} />
            </button>
          </li>
        ))}
      </ul>
      <p className="order-items-total">
        Итого: <b>{formatPrice(total)}</b>
      </p>
    </div>
  )
}
