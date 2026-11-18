import { Link } from 'react-router-dom'
import { useCallbackModal } from '@/features/callback'
import { CATEGORIES } from '@/entities/catalog'
import { SITE, phoneHref } from '@/shared/config/site'
import { Button } from '@/shared/ui/button'
import { Icon } from '@/shared/ui/icon'
import { Logo } from '@/shared/ui/logo'
import './footer.css'

const COMPANY_LINKS = [
  { label: 'Главная', to: '/' },
  { label: 'О компании', to: '/about' },
  { label: 'Доставка и оплата', to: '/delivery' },
]

const YEAR = new Date().getFullYear()

export function Footer() {
  const { open } = useCallbackModal()
  const half = Math.ceil(CATEGORIES.length / 2)

  return (
    <footer id="contacts" className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <Logo />
          <p className="footer-policy">Политика конфиденциальности</p>
          <p className="footer-note">
            Вся представленная на сайте информация носит исключительно информационный характер и ни при каких
            условиях не является публичной офертой, определяемой положениями Статьи 437 (2) Гражданского кодекса РФ.
          </p>
        </div>

        <nav aria-label="Компания">
          <h3 className="footer-heading">Компания</h3>
          <ul className="footer-links">
            {COMPANY_LINKS.map((link) => (
              <li key={link.to}>
                <Link to={link.to}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Каталог" className="footer-catalog">
          <h3 className="footer-heading">Каталог</h3>
          <div className="footer-catalog-columns">
            <ul className="footer-links">
              {CATEGORIES.slice(0, half).map((category) => (
                <li key={category.slug}>
                  <Link to={'/catalog/' + category.slug}>{category.title}</Link>
                </li>
              ))}
            </ul>
            <ul className="footer-links">
              {CATEGORIES.slice(half).map((category) => (
                <li key={category.slug}>
                  <Link to={'/catalog/' + category.slug}>{category.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <div>
          <h3 className="footer-heading">Контакты</h3>
          <a className="footer-phone" href={phoneHref(SITE.phone)}>
            {SITE.phone}
          </a>
          <a className="footer-email" href={'mailto:' + SITE.email}>
            {SITE.email}
          </a>
          <Button color="orange" onClick={open}>
            Заказать звонок
          </Button>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>© 2009-{YEAR} ООО «Стальэнерго». Все права защищены.</p>
          <ul className="footer-socials">
            <li>
              <a href={SITE.vk} target="_blank" rel="noopener noreferrer" aria-label="ВКонтакте">
                <Icon name="vk" size={18} />
              </a>
            </li>
            <li>
              <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Icon name="instagram" size={18} />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
