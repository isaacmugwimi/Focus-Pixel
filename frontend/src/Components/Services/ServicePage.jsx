import { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Check } from "lucide-react";
import "./ServicePage.css";
import { SERVICES_DATA } from "./ServicesData";
import { GALLERY_ITEMS } from "../Gallery/GalleryData";

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

export default function ServicePage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const service = SERVICES_DATA[slug];

  // unknown slug -> bounce to the services overview, same pattern
  // Gallery.jsx uses for an unknown item slug, but done in an effect
  // so it doesn't try to navigate mid-render.
  useEffect(() => {
    if (!service) navigate("/services", { replace: true });
  }, [service, navigate]);

  if (!service) return null;

  const previewImages = service.galleryCategory
    ? GALLERY_ITEMS.filter((i) => i.category === service.galleryCategory).slice(0, 6)
    : [];

  return (
    <div className="service-page">
      <Helmet>
        <title>{service.title} | Focus Pixel Photography</title>
        <meta name="description" content={service.description} />
      </Helmet>

      {/* ===== Banner ===== */}
      <section className="service-banner">
        <div className="service-banner-overlay" aria-hidden="true" />
        <motion.div
          className="service-banner-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <nav className="service-breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link to="/services">Services</Link>
            <span aria-hidden="true">/</span>
            <span>{service.shortTitle}</span>
          </nav>
          <h1 className="service-banner-title">{service.title}</h1>
          <p className="service-banner-subtitle">{service.tagline}</p>
        </motion.div>
      </section>

      {/* ===== Overview ===== */}
      <section className="service-overview">
        <motion.div
          className="service-overview-inner"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          <motion.p className="service-description" variants={fadeUp}>
            {service.description}
          </motion.p>

          <motion.ul className="service-highlights" variants={fadeUp}>
            {service.highlights.map((h) => (
              <li key={h}>
                <Check size={16} className="service-highlight-icon" />
                {h}
              </li>
            ))}
          </motion.ul>

          <motion.div variants={fadeUp}>
            <Link to="/contact" className="service-cta">
              Book This Service
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* ===== Packages ===== */}
      <section className="service-packages">
        <motion.h2
          className="service-section-title"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Packages
        </motion.h2>

        <motion.div
          className="service-packages-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          {service.packages.map((pkg) => (
            <motion.div className="service-package-card" key={pkg.name} variants={fadeUp}>
              <h3 className="service-package-name">{pkg.name}</h3>
              <p className="service-package-price">{pkg.price}</p>
              <ul className="service-package-includes">
                {pkg.includes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <Link to="/contact" className="service-package-cta">
                Enquire
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ===== Gallery preview ===== */}
      {previewImages.length > 0 && (
        <section className="service-gallery-preview">
          <motion.h2
            className="service-section-title"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            From Our {service.shortTitle} Work
          </motion.h2>

          <div className="service-gallery-preview-grid">
            {previewImages.map((item) => (
              <Link
                to={`/gallery/${item.slug}`}
                className="service-gallery-preview-item"
                key={item.id}
              >
                <img src={item.src} alt={`${item.title} — ${item.category} photography`} loading="lazy" />
              </Link>
            ))}
          </div>

          <div className="service-gallery-preview-more">
            <Link to="/gallery" className="service-secondary-cta">
              View Full Gallery
            </Link>
          </div>
        </section>
      )}

      {/* ===== FAQs ===== */}
      {service.faqs?.length > 0 && (
        <section className="service-faqs">
          <motion.h2
            className="service-section-title"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Frequently Asked
          </motion.h2>

          <motion.div
            className="service-faqs-list"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            {service.faqs.map((faq) => (
              <motion.div className="service-faq-item" key={faq.q} variants={fadeUp}>
                <h3 className="service-faq-question">{faq.q}</h3>
                <p className="service-faq-answer">{faq.a}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>
      )}
    </div>
  );
}
