import { Link } from "react-router-dom";
import { SERVICES } from "@/entities/service";
import "./services-block.css";

export function ServicesBlock() {
  return (
    <section className="section">
      <div className="container services-block">
        <div>
          <h2 className="section-title services-block-title">Услуги</h2>
          <ul className="services-block-list">
            {SERVICES.map((service) => (
              <li key={service.slug}>
                <Link
                  to={"/services/" + service.slug}
                  className="services-block-item"
                >
                  <img src={service.icon} alt="" width={32} height={32} />
                  <span>{service.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <img
          className="services-block-image"
          src="/images/service.png"
          alt="Резка металла"
          loading="lazy"
        />
      </div>
    </section>
  );
}
