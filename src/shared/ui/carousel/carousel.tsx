import { useRef } from 'react'
import type { ReactNode } from 'react'
import { Icon } from '@/shared/ui/icon'
import './carousel.css'

interface CarouselProps {
  title: string
  perView?: 2 | 3 | 4
  extra?: ReactNode
  children: ReactNode
}

export function Carousel({ title, perView = 4, extra, children }: CarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null)

  function scroll(direction: 1 | -1) {
    const track = trackRef.current
    if (!track) return
    track.scrollBy({ left: direction * track.clientWidth, behavior: 'smooth' })
  }

  return (
    <div className="carousel">
      <div className="carousel-head">
        <h2 className="section-title">{title}</h2>
        <div className="carousel-controls">
          {extra}
          <button aria-label="Назад" onClick={() => scroll(-1)}>
            <Icon name="chevron-left" size={16} />
          </button>
          <button aria-label="Вперёд" onClick={() => scroll(1)}>
            <Icon name="chevron-right" size={16} />
          </button>
        </div>
      </div>
      <div ref={trackRef} className={'carousel-track carousel-' + perView}>
        {children}
      </div>
    </div>
  )
}
