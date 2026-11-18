import { NEWS, NewsItem } from '@/entities/news'
import { Button } from '@/shared/ui/button'
import { Carousel } from '@/shared/ui/carousel'
import './news-slider.css'

export function NewsSlider() {
  return (
    <section id="news" className="section">
      <div className="container">
        <Carousel title="Новости">
          {NEWS.map((item) => (
            <NewsItem key={item.id} item={item} />
          ))}
        </Carousel>
        <div className="news-slider-more">
          <Button to="/about#news">Все новости</Button>
        </div>
      </div>
    </section>
  )
}
