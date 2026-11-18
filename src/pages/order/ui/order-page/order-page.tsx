import { useState } from 'react'
import { useCart } from '@/features/cart'
import { Breadcrumbs } from '@/shared/ui/breadcrumbs'
import { EmptyState } from '@/shared/ui/empty-state'
import { OrderForm } from '../order-form/order-form'
import { OrderItems } from '../order-items/order-items'
import './order-page.css'

export function OrderPage() {
  const { items, clear } = useCart()
  const [orderNumber, setOrderNumber] = useState<number | null>(null)

  function finish() {
    setOrderNumber(Math.floor(100000 + Math.random() * 900000))
    clear()
  }

  if (orderNumber !== null) {
    return (
      <EmptyState
        title="Заказ оформлен"
        text={'Номер вашего заказа: №' + orderNumber + '. Менеджер свяжется с вами в ближайшее время.'}
        to="/"
        button="На главную"
      />
    )
  }

  if (items.length === 0) {
    return <EmptyState title="Корзина пуста" text="Добавьте товары из каталога, чтобы оформить заказ." to="/" button="Перейти на главную" />
  }

  return (
    <div className="container order-page">
      <div className="order-page-head">
        <h1 className="page-title">Оформление заказа</h1>
        <Breadcrumbs items={[{ label: 'Главная', to: '/' }, { label: 'Оформление заказа' }]} />
      </div>
      <OrderItems />
      <OrderForm onSubmit={finish} />
    </div>
  )
}
