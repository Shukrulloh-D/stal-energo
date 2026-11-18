import { CARRIERS } from '@/entities/partner'
import { Breadcrumbs } from '@/shared/ui/breadcrumbs'
import { LogoCarousel } from '@/widgets/logo-carousel'
import './delivery-page.css'

export function DeliveryPage() {
  return (
    <>
      <div className="container delivery-page">
        <div className="delivery-page-head">
          <h1 className="page-title">Доставка и оплата</h1>
          <Breadcrumbs items={[{ label: 'Главная', to: '/' }, { label: 'Доставка' }]} />
        </div>

        <div className="delivery-page-content">
          <div className="page-text delivery-page-text">
            <p>
              Отгрузка продукции осуществляется со склада в Первоуральске. Мы доставляем металлопрокат по России и в
              страны СНГ автомобильным и железнодорожным транспортом, помогаем с таможенным оформлением грузов.
            </p>
            <p>
              Стоимость доставки зависит от веса, габаритов и расстояния. Менеджер рассчитает её при оформлении заказа
              и согласует удобное время получения.
            </p>
            <p>
              Оплата возможна наличными, банковской картой и безналичным расчётом по счёту. Для постоянных клиентов
              доступны товарный кредит и отсрочка платежа.
            </p>
          </div>

          <div className="delivery-page-banner">
            <img src="/images/delivery.png" alt="" />
            <p>
              Надёжный поставщик
              <br />
              Выгодный партнёр
            </p>
          </div>
        </div>
      </div>

      <LogoCarousel title="С кем мы работаем" items={CARRIERS} />
    </>
  )
}
