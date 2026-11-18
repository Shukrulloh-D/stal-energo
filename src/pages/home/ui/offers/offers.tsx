import { Link } from "react-router-dom";
import { Carousel } from "@/shared/ui/carousel";
import "./offers.css";

const OFFERS = [
  {
    title: "Труба котельная 377х17 мм, ту 14-3р-55-2001 сталь 12х1мф, 11 тн",
    price: "200 000 руб/тн.",
    to: "/catalog/trubnyy-prokat/besshovnye-truby",
    image: "/images/offers/truba-1.png",
  },
  {
    title: "Клапан запорный 150х35к, Ду 100 мм, Ру 16 - 8 шт",
    price: "180 000 руб/шт.",
    to: "/catalog/truboprovodnaya-armatura/klapany",
    image: "/images/offers/truba-2.png",
  },
  {
    title:
      "Труба котельная низкого давления 273х8 мм и 325х8 мм, сталь 20 ТУ 14-3-190-2004",
    price: "98 000 руб/тн.",
    to: "/catalog/trubnyy-prokat/elektrosvarnye-truby",
    image: "/images/offers/truba-3.png",
  },
];

export function Offers() {
  return (
    <section className="section">
      <div className="container">
        <Carousel
          title="Специальные предложения"
          perView={3}
          extra={
            <Link to="/search?q=труба" className="offers-all">
              Смотреть все
            </Link>
          }
        >
          {OFFERS.map((offer) => (
            <article key={offer.title} className="offer">
              <div className="offer-text">
                <h3 className="offer-title">{offer.title}</h3>
                <p className="offer-price">{offer.price}</p>
                <Link to={offer.to} className="offer-more">
                  Подробнее
                </Link>
              </div>
              <img
                className="offer-image"
                src={offer.image}
                alt=""
                loading="lazy"
              />
            </article>
          ))}
        </Carousel>
      </div>
    </section>
  );
}
