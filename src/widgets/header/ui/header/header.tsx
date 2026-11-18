import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCallbackModal } from '@/features/callback'
import { NAV_LINKS } from '@/shared/config/nav'
import { SITE, phoneHref } from '@/shared/config/site'
import { useScrolled } from '@/shared/lib/use-scrolled'
import { Icon } from '@/shared/ui/icon'
import { Logo } from '@/shared/ui/logo'
import { CatalogMenu } from '../catalog-menu/catalog-menu'
import { MiniCart } from '../mini-cart/mini-cart'
import './header.css'

export function Header() {
  const scrolled = useScrolled(80)
  const [menuOpen, setMenuOpen] = useState(false)
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const { open: openCallback } = useCallbackModal()

  function search(event: FormEvent) {
    event.preventDefault()
    const text = query.trim()

    if (text) {
      navigate('/search?q=' + encodeURIComponent(text))
    }
  }

  return (
    <header className={scrolled ? 'header header-compact' : 'header'}>
      <div className="header-top">
        <div className="container header-top-inner">
          <Logo />
          <p className="header-tagline">
            Оптовые поставки металлопроката
            <br />
            по России и странам СНГ
          </p>

          <nav className="header-nav" aria-label="Основная навигация">
            {NAV_LINKS.map((link) => (
              <Link key={link.label} to={link.to}>
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="header-phone">
            <a href={phoneHref(SITE.phone)}>
              <Icon name="phone" size={12} />
              {SITE.phone}
            </a>
            <button className="header-callback" onClick={openCallback}>
              Заказать звонок
            </button>
          </div>

          <button className="header-burger" aria-label="Меню" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? 'close' : 'menu'} size={24} />
          </button>
        </div>
      </div>

      <div className="header-bottom">
        <div className="container header-bottom-inner">
          <div className="header-compact-only">
            <Logo />
          </div>
          <CatalogMenu />

          <form className="header-search" onSubmit={search} role="search">
            <Icon name="search" size={16} />
            <input
              type="search"
              value={query}
              maxLength={100}
              placeholder="Поиск по каталогу"
              aria-label="Поиск по каталогу"
              onChange={(event) => setQuery(event.target.value)}
            />
          </form>

          <p className="header-location">
            <Icon name="pin" size={14} />
            <span>
              {SITE.city}
              <br />
              {SITE.hours}
            </span>
          </p>

          <a className="header-compact-only header-compact-phone" href={phoneHref(SITE.phone)}>
            <Icon name="phone" size={12} />
            {SITE.phone}
          </a>

          <Link to="/account" className="header-user" aria-label="Личный кабинет">
            <Icon name="user" size={22} />
            <Icon name="chevron-down" size={12} />
          </Link>
          <MiniCart />
        </div>
      </div>

      {menuOpen && (
        <nav className="header-mobile" aria-label="Меню">
          {NAV_LINKS.map((link) => (
            <Link key={link.label} to={link.to} onClick={() => setMenuOpen(false)}>
              {link.label}
            </Link>
          ))}
          <a href={phoneHref(SITE.phone)}>{SITE.phone}</a>
          <button
            onClick={() => {
              setMenuOpen(false)
              openCallback()
            }}
          >
            Заказать звонок
          </button>
        </nav>
      )}
    </header>
  )
}
