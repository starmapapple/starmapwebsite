import { useEffect, useRef, useState } from "react";
import {
  address,
  brand,
  clients,
  ecommerceServices,
  eventImages,
  productionImages,
  talentImages,
} from "./data.js";

const galleryArrow = "/assets/gallery-arrow.svg";

function SectionHeading({ title, copy, id, accent = true }) {
  return (
    <header className="section-heading" id={id}>
      <h2>{title}</h2>
      {accent && <span className="accent-line" aria-hidden="true" />}
      {copy && <p>{copy}</p>}
    </header>
  );
}

function chunk(items, size) {
  return Array.from({ length: Math.ceil(items.length / size) }, (_, page) =>
    items.slice(page * size, page * size + size),
  );
}

function Gallery({ images, label, variant = "portrait" }) {
  const trackRef = useRef(null);
  const isMosaic = variant === "portrait" || variant === "event";
  const pageSize = variant === "portrait" ? 5 : 8;

  const move = (direction) => {
    const track = trackRef.current;
    if (!track) return;
    const distance = isMosaic
      ? track.clientWidth
      : Math.max(track.clientWidth * 0.78, 280);
    track.scrollBy({ left: direction * distance, behavior: "smooth" });
  };

  return (
    <div className={`gallery gallery--${variant}`}>
      <button
        className="gallery-control gallery-control--previous"
        type="button"
        aria-label={`Previous ${label} image`}
        onClick={() => move(-1)}
      >
        <img src={galleryArrow} alt="" />
      </button>
      <div className={`gallery-track${isMosaic ? " gallery-track--mosaic" : ""}`} ref={trackRef}>
        {isMosaic
          ? chunk(images, pageSize).map((page, pageIndex) => (
              <div className="gallery-page" key={`${label}-${pageIndex}`}>
                {page.map((image, itemIndex) => {
                  const index = pageIndex * pageSize + itemIndex;
                  return (
                    <figure className="gallery-item" key={image}>
                      <img
                        src={image}
                        alt={`${label} ${index + 1}`}
                        loading={index > 3 ? "lazy" : "eager"}
                      />
                    </figure>
                  );
                })}
              </div>
            ))
          : images.map((image, index) => (
              <figure className="gallery-item" key={image}>
                <img
                  src={image}
                  alt={`${label} ${index + 1}`}
                  loading={index > 3 ? "lazy" : "eager"}
                />
              </figure>
            ))}
      </div>
      <button
        className="gallery-control gallery-control--next"
        type="button"
        aria-label={`Next ${label} image`}
        onClick={() => move(1)}
      >
        <img src={galleryArrow} alt="" />
      </button>
    </div>
  );
}

function VideoModal({ open, onClose }) {
  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.classList.add("modal-open");
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.classList.remove("modal-open");
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="video-modal"
      role="dialog"
      aria-modal="true"
      aria-label="StarMap company video"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="video-modal-panel">
        <button className="modal-close" type="button" onClick={onClose}>
          Close video
        </button>
        <video src={brand.heroVideo} controls autoPlay playsInline />
      </div>
    </div>
  );
}

export function App() {
  const [videoOpen, setVideoOpen] = useState(false);
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <header className="site-header">
        <a href="#top" aria-label="StarMap home">
          <img className="brand-logo" src={brand.logo} alt="StarMap" />
        </a>
      </header>

      <main id="main-content">
        <section className="hero" id="top" aria-label="StarMap introduction">
          <video
            className="hero-video"
            src={brand.heroVideo}
            poster={brand.heroPoster}
            autoPlay
            muted
            loop
            playsInline
          />
          <span className="hero-shade" aria-hidden="true" />
        </section>

        <section className="watch-panel">
          <button className="outline-button" type="button" onClick={() => setVideoOpen(true)}>
            <img src="/assets/play-icon.svg" alt="" />
            Watch video
          </button>
          <p>Innovating Retail and Advertising with Content</p>
        </section>

        <section className="content-section ecommerce-section">
          <SectionHeading
            id="ecommerce"
            title="Ecommerce"
            copy="Managing your ecommerce platforms with expertise and precision. From TikTok to Shopee, Tokopedia, and Lazada, we handle every detail to boost your online presence and sales."
          />

          <div className="service-list">
            {ecommerceServices.map((service) => (
              <article className="service-row" key={service.title}>
                <div className="service-image">
                  <img src={service.image} alt="" />
                </div>
                <div className="service-copy">
                  <h3>{service.title}</h3>
                  <p>{service.copy}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="grupbeli-heading">
            <a href="https://grupbeli.com/" target="_blank" rel="noreferrer">
              <img src={brand.grupBeliLogo} alt="GrupBeli" />
            </a>
            <span className="accent-line" aria-hidden="true" />
            <p>An affiliate ecommerce platform powered by AI</p>
          </div>

          <article className="grupbeli-detail">
            <div className="grupbeli-visual">
              <img src={brand.grupBeliVisual} alt="GrupBeli commerce intelligence dashboard" />
            </div>
            <div className="grupbeli-copy">
              <p>
                Grupbeli is an AI-driven e-commerce and supply chain platform. Using advanced
                algorithms and big data, we deliver smart product selection, precise recommendations,
                and efficient matching for merchants, brands, and channel partners.
              </p>
              <p>
                Our AI decision engine tracks market trends, consumer preferences, price shifts, and
                competitor moves in real time. It identifies potential bestsellers and generates
                personalized assortments for different customer groups, improving accuracy while
                cutting trial-and-error costs.
              </p>
              <p>
                By integrating data from e-commerce platforms and social media, Grupbeli builds a full
                product lifecycle system—from selection and listing to promotion, conversion, and
                repurchase. With continuous AI learning and optimization, we help partners achieve
                higher conversions and sustainable growth.
              </p>
            </div>
          </article>
        </section>

        <section className="content-section gallery-section production-section">
          <SectionHeading
            id="production"
            title="Production Studio"
            copy="Crafting visual masterpieces with cutting-edge technology and unparalleled artistry. From film to digital media, we bring visionary stories to life."
          />
          <Gallery images={productionImages} label="Production Studio" variant="landscape" />
        </section>

        <section className="content-section gallery-section talent-section">
          <SectionHeading
            id="talent"
            title="Talent Management"
            copy="Empowering creators with premium resources and unparalleled support. Our network nurtures talent, driving innovation and growth in the digital space."
          />
          <Gallery images={talentImages} label="Talent Management" />
        </section>

        <section className="content-section gallery-section events-section">
          <SectionHeading
            id="events"
            title="Events"
            copy="Creating unforgettable moments with bespoke events that captivate and enchant. From intimate gatherings to grand galas, we turn every occasion into a spectacular celebration."
          />
          <Gallery images={eventImages} label="Events" variant="event" />
        </section>

        <section className="content-section clients-section">
          <SectionHeading id="clients" title="Our Clients" accent={false} />
          <div className="client-grid">
            {clients.map(([name, image]) => (
              <div className="client-card" key={name}>
                <img src={image} alt={name} loading="lazy" />
              </div>
            ))}
          </div>
        </section>

        <section className="content-section contact-section">
          <SectionHeading id="contact" title="Contact Us" accent={false} />
          <p className="contact-email">
            Email: <a href="mailto:admin@billboardid.com">admin@billboardid.com</a>
          </p>
          <a className="outline-button send-button" href="mailto:admin@billboardid.com">
            Send
          </a>
          <div className="map-frame">
            <iframe
              title="StarMap office location"
              src={mapSrc}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <p>© 2035 StarMap · PT SOSIAL KOMERSIL INDONESIA</p>
      </footer>

      <VideoModal open={videoOpen} onClose={() => setVideoOpen(false)} />
    </>
  );
}
