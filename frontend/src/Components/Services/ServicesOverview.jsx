import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { ArrowRight } from "lucide-react";
import "./ServicePage.css";
import { SERVICES_DATA, SERVICES_ORDER } from "./ServicesData";

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
  visible: { transition: { staggerChildren: 0.06 } },
};

export default function ServicesOverview() {
  return (
    <div className="service-page">
      <Helmet>
        <title>Services | Focus Pixel Photography</title>
        <meta
          name="description"
          content="Portrait, wedding, landscape, event, and product photography, plus film and retouching services from Focus Pixel."
        />
      </Helmet>

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
            <span>Services</span>
          </nav>
          <h1 className="service-banner-title">What We Offer</h1>
          <p className="service-banner-subtitle">
            From intimate portraits to full wedding coverage — pick a service to
            see packages, pricing, and past work.
          </p>
        </motion.div>
      </section>

      <section className="services-grid-section">
        <motion.div
          className="services-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={staggerContainer}
        >
          {SERVICES_ORDER.map((slug) => {
            const s = SERVICES_DATA[slug];
            return (
              <motion.div key={slug} variants={fadeUp}>
                <Link to={`/services/${slug}`} className="services-grid-card">
                  <div
                    className="services-grid-card-image"
                    style={{ backgroundImage: `url(${s.heroImage})` }}
                  />
                  <div className="services-grid-card-body">
                    <h3>{s.title}</h3>
                    <p>{s.tagline}</p>
                    <span className="services-grid-card-link">
                      Learn more <ArrowRight size={15} />
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </section>
    </div>
  );
}
