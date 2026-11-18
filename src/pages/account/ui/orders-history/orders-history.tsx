import { useState } from 'react'
import { Pagination } from '@/shared/ui/pagination'
import './orders-history.css'

interface Order {
  number: string
  date: string
  sum: string
  items: string[]
}

const ITEM = 'Лист Г/К 10 1.5м 6м ст3пс5/сп5 14637'

// временные данные
const ORDERS: Order[] = [
  { number: '№24769283', date: '22.06.2020', sum: '178 800 руб', items: [ITEM, ITEM, ITEM] },
  { number: '№24769284', date: '22.06.2020', sum: '178 800 руб', items: [ITEM] },
  { number: '№24769285', date: '22.06.2020', sum: '178 800 руб', items: [ITEM] },
  { number: '№24769286', date: '22.06.2020', sum: '178 800 руб', items: [ITEM, ITEM, ITEM, ITEM, ITEM] },
  { number: '№24769287', date: '22.06.2020', sum: '178 800 руб', items: [ITEM] },
  { number: '№24769288', date: '21.06.2020', sum: '96 400 руб', items: [ITEM, ITEM] },
  { number: '№24769289', date: '20.06.2020', sum: '54 200 руб', items: [ITEM] },
]

const PER_PAGE = 5
const SHORT = 2

function OrderRow({ order }: { order: Order }) {
  const [open, setOpen] = useState(false)
  const hasMore = order.items.length > SHORT
  const shown = open ? order.items : order.items.slice(0, SHORT)

  return (
    <tr>
      <td>{order.number}</td>
      <td>{order.date}</td>
      <td>{order.sum}</td>
      <td>
        {shown.map((item, index) => (
          <p key={index}>{item}</p>
        ))}
        {hasMore && (
          <button className="orders-toggle" onClick={() => setOpen(!open)}>
            {open ? 'Скрыть' : 'Смотреть все'}
          </button>
        )}
      </td>
    </tr>
  )
}

export function OrdersHistory() {
  const [page, setPage] = useState(1)
  const total = Math.ceil(ORDERS.length / PER_PAGE)
  const visible = ORDERS.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  return (
    <div>
      <div className="orders-wrap">
        <table className="orders">
          <thead>
            <tr>
              <th>Номер заказа</th>
              <th>Дата</th>
              <th>Сумма</th>
              <th>Список товаров</th>
            </tr>
          </thead>
          <tbody>
            {visible.map((order) => (
              <OrderRow key={order.number} order={order} />
            ))}
          </tbody>
        </table>
      </div>
      <div className="orders-pagination">
        <Pagination page={page} total={total} onChange={setPage} />
      </div>
    </div>
  )
}
