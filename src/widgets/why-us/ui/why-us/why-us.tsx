import './why-us.css'

const ITEMS = [
  { icon: 'quality', text: 'Большой выбор качественной продукции' },
  { icon: 'choice', text: 'Широкий выбор металлоизделий в одном месте' },
  { icon: 'customs', text: 'Помощь в таможенном оформлении грузов' },
  { icon: 'delivery', text: 'Доставляем продукцию по России или в другие страны' },
  { icon: 'personal', text: 'Персональный подход к каждому клиенту' },
  { icon: 'discount', text: 'Скидки и бонусы постоянным клиентам' },
  { icon: 'credit', text: 'Предоставление товарного кредита и отсрочки оплаты' },
  { icon: 'services', text: 'Большой выбор услуг на складе: упаковка, резка в размер и пр.' },
]

export function WhyUs() {
  return (
    <section className="section section-gray">
      <div className="container">
        <h2 className="section-title why-us-title">Почему выбирают нас?</h2>
        <ul className="why-us-grid">
          {ITEMS.map((item) => (
            <li key={item.icon} className="why-us-item">
              <img src={'/images/icons/why/' + item.icon + '.svg'} alt="" width={28} height={28} />
              <span>{item.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
