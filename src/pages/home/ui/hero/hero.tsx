import { useCallbackModal } from '@/features/callback'
import { STATS } from '@/shared/config/site'
import { Button } from '@/shared/ui/button'
import './hero.css'

export function Hero() {
  const { open } = useCallbackModal()

  return (
    <section className="hero">
      <div className="container hero-inner">
        <h1 className="hero-title">
          Надёжный поставщик
          <br />
          Выгодный партнёр
        </h1>
        <p className="hero-text">Оптовые поставки металлопроката по России и странам СНГ</p>
        <Button onClick={open}>Узнать цену</Button>

        <ul className="hero-stats">
          {STATS.map((item) => (
            <li key={item.label}>
              <b>{item.value}</b>
              <span>{item.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
