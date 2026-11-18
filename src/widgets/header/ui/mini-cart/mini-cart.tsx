import { useRef, useState } from 'react'
import { useCart } from '@/features/cart'
import { formatPrice } from '@/shared/lib/format'
import { useOutsideClose } from '@/shared/lib/use-outside-click'
import { Button } from '@/shared/ui/button'
import { Icon } from '@/shared/ui/icon'
import { Quantity } from '@/shared/ui/quantity'
import './mini-cart.css'

export function MiniCart() {
  const { items, count, total, setQty, remove, clear } = useCart()
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  useOutsideClose(rootRef, open, () => setOpen(false))

  return (
    <div className="mini-cart" ref={rootRef}>
      <button
        className="mini-cart-button"
        aria-label={'Корзина, товаров: ' + count}
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        <Icon name="cart" size={22} />
        {count > 0 && <span className="mini-cart-badge">{count}</span>}
      </button>

      {open && (
        <div className="mini-cart-panel">
          {items.length === 0 ? (
            <p className="mini-cart-empty">Корзина пуста</p>
          ) : (
            <>
              <ul className="mini-cart-list">
                {items.map((item) => (
                  <li key={item.id} className="mini-cart-item">
                    <p className="mini-cart-name">{item.name}</p>
                    <div className="mini-cart-row">
                      <Quantity value={item.qty} onChange={(qty) => setQty(item.id, qty)} />
                      <b>{formatPrice(item.price * item.qty)}</b>
                      <button className="mini-cart-remove" aria-label="Убрать из корзины" onClick={() => remove(item.id)}>
                        <Icon name="close" size={14} />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              <p className="mini-cart-total">
                Итого: <b>{formatPrice(total)}</b>
              </p>
              <div className="mini-cart-actions">
                <button className="text-link" onClick={clear}>
                  Очистить
                </button>
                <Button to="/order" onClick={() => setOpen(false)}>
                  Оформить
                </Button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}
