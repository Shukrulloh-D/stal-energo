import { Link } from 'react-router-dom'
import './breadcrumbs.css'

interface Crumb {
  label: string
  to?: string
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav className="breadcrumbs" aria-label="Хлебные крошки">
      {items.map((item, index) => {
        const last = index === items.length - 1

        return (
          <span key={item.label + index} className={last ? 'breadcrumbs-item breadcrumbs-last' : 'breadcrumbs-item'}>
            {item.to && !last ? <Link to={item.to}>{item.label}</Link> : item.label}
          </span>
        )
      })}
    </nav>
  )
}
