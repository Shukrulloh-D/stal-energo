import { Link, useParams } from 'react-router-dom'
import { SERVICES, findService } from '@/entities/service'
import { useCallbackModal } from '@/features/callback'
import { Breadcrumbs } from '@/shared/ui/breadcrumbs'
import { Button } from '@/shared/ui/button'
import './services-page.css'

export function ServicesPage() {
  const { slug } = useParams()
  const { open } = useCallbackModal()
  const active = findService(slug)

  return (
    <div className="container services-page">
      <div className="services-page-head">
        <h1 className="page-title">Услуги</h1>
        <Breadcrumbs items={[{ label: 'Главная', to: '/' }, { label: 'Услуги' }]} />
      </div>

      <ul className="services-page-grid">
        {SERVICES.map((service) => (
          <li key={service.slug}>
            <Link
              to={'/services/' + service.slug}
              className={service.slug === active.slug ? 'service-link service-link-active' : 'service-link'}
            >
              <img src={service.icon} alt="" width={32} height={32} />
              <span>{service.title}</span>
            </Link>
          </li>
        ))}
      </ul>

      <section className="services-page-content">
        <div>
          <h2 className="services-page-title">{active.title}</h2>
          {active.sections.map((section) => (
            <div key={section.title} className="services-page-section">
              <h3>{section.title}</h3>
              {section.text && <p>{section.text}</p>}
              {section.items && (
                <ul>
                  {section.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
          <Button onClick={open}>Заказать услугу</Button>
        </div>
        <img src={active.image} alt={active.title} />
      </section>
    </div>
  )
}
