import { CLIENTS } from '@/entities/partner'
import { LogoCarousel } from '@/widgets/logo-carousel'
import { NewsSlider } from '@/widgets/news-slider'
import { WhyUs } from '@/widgets/why-us'
import { CatalogCards } from '../catalog-cards/catalog-cards'
import { Hero } from '../hero/hero'
import { Offers } from '../offers/offers'
import { Popular } from '../popular/popular'
import { ServicesBlock } from '../services-block/services-block'

export function HomePage() {
  return (
    <>
      <Hero />
      <CatalogCards />
      <Popular />
      <Offers />
      <ServicesBlock />
      <LogoCarousel title="Наши клиенты" items={CLIENTS} />
      <WhyUs />
      <NewsSlider />
    </>
  )
}
