import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { CATEGORIES } from '@/entities/catalog'
import { useOutsideClose } from '@/shared/lib/use-outside-click'
import { Icon } from '@/shared/ui/icon'
import './catalog-menu.css'

export function CatalogMenu() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)
  const rootRef = useRef<HTMLDivElement>(null)

  useOutsideClose(rootRef, open, () => setOpen(false))

  const current = CATEGORIES[active]

  return (
    <div className="catalog-menu" ref={rootRef}>
      <button className="catalog-menu-button" aria-expanded={open} onClick={() => setOpen(!open)}>
        Каталог
        <Icon name={open ? 'chevron-up' : 'chevron-down'} size={14} />
      </button>

      {open && (
        <div className="catalog-menu-panel">
          <ul className="catalog-menu-list">
            {CATEGORIES.map((category, index) => (
              <li key={category.slug} onMouseEnter={() => setActive(index)}>
                <Link
                  to={'/catalog/' + category.slug}
                  className={index === active ? 'catalog-menu-item catalog-menu-item-active' : 'catalog-menu-item'}
                  onFocus={() => setActive(index)}
                  onClick={() => setOpen(false)}
                >
                  {category.title}
                  <Icon name="chevron-right" size={12} />
                </Link>
              </li>
            ))}
          </ul>

          <ul className="catalog-menu-sub">
            {current.subs.map((sub) => (
              <li key={sub.slug}>
                <Link to={'/catalog/' + current.slug + '/' + sub.slug} onClick={() => setOpen(false)}>
                  {sub.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
