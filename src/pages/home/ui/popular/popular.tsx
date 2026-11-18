import { Link } from 'react-router-dom'
import { Carousel } from '@/shared/ui/carousel'
import './popular.css'

const POPULAR = [
  { title: 'Швеллер', to: '/catalog/chernyy-prokat/shveller', image: '/images/popular/shveller.png' },
  { title: 'Балка двутавровая', to: '/catalog/chernyy-prokat/balka-dvutavrovaya', image: '/images/popular/balka.png' },
  { title: 'Арматура', to: '/catalog/chernyy-prokat/armatura', image: '/images/popular/armatura.png' },
  { title: 'Уголок металлический', to: '/catalog/chernyy-prokat/ugolok', image: '/images/popular/ugolok.png' },
  { title: 'Лист Г/К', to: '/catalog/listovoy-prokat/list-gk', image: '/images/popular/list.png' },
]

export function Popular() {
  return (
    <section className="section popular">
      <div className="container">
        <Carousel title="Популярные разделы">
          {POPULAR.map((item) => (
            <Link key={item.title} to={item.to} className="popular-card">
              <img src={item.image} alt="" loading="lazy" />
              <span>{item.title}</span>
            </Link>
          ))}
        </Carousel>
      </div>
    </section>
  )
}
