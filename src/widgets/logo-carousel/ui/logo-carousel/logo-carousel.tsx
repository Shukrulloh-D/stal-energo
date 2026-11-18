import type { Partner } from '@/entities/partner'
import { Carousel } from '@/shared/ui/carousel'
import './logo-carousel.css'

interface LogoCarouselProps {
  title: string
  items: Partner[]
}

export function LogoCarousel({ title, items }: LogoCarouselProps) {
  return (
    <section className="section">
      <div className="container">
        <Carousel title={title}>
          {items.map((item) => (
            <div key={item.name} className="logo-carousel-item">
              <img src={item.image} alt={item.name} loading="lazy" />
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  )
}
