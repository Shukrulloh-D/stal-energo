import { CLIENTS } from '@/entities/partner'
import { STATS } from '@/shared/config/site'
import { Breadcrumbs } from '@/shared/ui/breadcrumbs'
import { Carousel } from '@/shared/ui/carousel'
import { LogoCarousel } from '@/widgets/logo-carousel'
import { NewsSlider } from '@/widgets/news-slider'
import { WhyUs } from '@/widgets/why-us'
import './about-page.css'

const REVIEWS = [
  {
    company: 'Амурсталь',
    date: '24.03.2020',
    text: 'Значимость этих проблем настолько очевидна, что укрепление и развитие структуры способствует подготовке и реализации системы обучения кадров, соответствует насущным потребностям.',
    letter: '/images/reviews/letter-1.png',
  },
  {
    company: 'Красный Октябрь',
    date: '24.03.2020',
    text: 'Разнообразный и богатый опыт постоянных информационно-пропагандистских обеспечение нашей деятельности требует от нас анализа форм развития.',
    letter: '/images/reviews/letter-2.png',
  },
  {
    company: 'ТМК',
    date: '24.03.2020',
    text: 'Повседневная практика показывает, что реализация намеченных плановых заданий позволяет выполнять важные задания по разработке новых предложений.',
    letter: '/images/reviews/letter-3.png',
  },
]

export function AboutPage() {
  return (
    <>
      <div className="container about-page">
        <div className="about-page-head">
          <h1 className="page-title">О компании</h1>
          <Breadcrumbs items={[{ label: 'Главная', to: '/' }, { label: 'О компании' }]} />
        </div>

        <div className="about-page-content">
          <div className="page-text about-page-text">
            <p>
              Купить товар «Лист горячекатаный 8 1.5м 6м ст3пс5/сп5 14637» в Екатеринбурге по выгодной цене за метр,
              тонну или другую единицу измерения. Онлайн-калькулятор рассчитает стоимость, размеры и массу изделия.
            </p>
            <p>
              Ознакомьтесь с описанием и техническими характеристиками товара на официальном сайте компании или
              позвоните нам и получите консультацию наших специалистов.
            </p>
            <p>
              В продаже широкий ассортимент товаров категории «Лист стальной». Мы отвечаем за качество и предлагаем
              профессиональный сервис: услуги резки и металлообработки, погрузку и доставку металлопроката.
            </p>
          </div>

          <div className="about-page-photo">
            <img src="/images/about.png" alt="" />
            <ul>
              {STATS.map((item) => (
                <li key={item.label}>
                  <b>{item.value}</b>
                  <span>{item.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <LogoCarousel title="Наши клиенты" items={CLIENTS} />

      <section className="section about-page-reviews">
        <div className="container">
          <Carousel title="Отзывы" perView={3}>
            {REVIEWS.map((review) => (
              <article key={review.company} className="review">
                <h3 className="review-company">{review.company}</h3>
                <p className="review-date">{review.date}</p>
                <p className="review-text">{review.text}</p>
                <a className="review-link" href={review.letter} target="_blank" rel="noopener noreferrer">
                  Смотреть благодарственное письмо
                </a>
              </article>
            ))}
          </Carousel>
        </div>
      </section>

      <WhyUs />
      <NewsSlider />
    </>
  )
}
