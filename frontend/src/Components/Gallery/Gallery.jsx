import { useState, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Expand } from "lucide-react";
import "./Gallery.css";
import GalleryLightbox from "./GalleryLightbox/GalleryLightbox";
import { GALLERY_CATEGORIES, GALLERY_ITEMS } from "./GalleryData";

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

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All");
  const { slug } = useParams();
  const navigate = useNavigate();

  const activeItem = slug ? GALLERY_ITEMS.find((i) => i.slug === slug) : null;

  if (slug && !activeItem) {
    navigate("/gallery", { replace: true });
  }

  const filtered = useMemo(
    () =>
      activeCategory === "All"
        ? GALLERY_ITEMS
        : GALLERY_ITEMS.filter((i) => i.category === activeCategory),
    [activeCategory]
  );

  return (
    <div className="gallery-page">
      <Helmet>
        <title>Gallery | Focus Pixel Photography</title>
        <meta
          name="description"
          content="Browse the full Focus Pixel portfolio — weddings, portraits, landscapes, events, and product photography."
        />
      </Helmet>

      {/* ===== Banner ===== */}
      <section className="gallery-banner">
        <div className="gallery-banner-overlay" aria-hidden="true" />
        <motion.div
          className="gallery-banner-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <nav className="gallery-breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span>Gallery</span>
          </nav>
          <h1 className="gallery-banner-title">Our Full Portfolio</h1>
          <p className="gallery-banner-subtitle">
            Every frame tells a story. Explore the moments we&apos;ve had the
            honor of capturing.
          </p>
        </motion.div>
      </section>

      {/* ===== Filters ===== */}
      <section className="gallery-filters">
        <div className="gallery-filters-inner">
          {GALLERY_CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              className={
                "gallery-filter-btn" +
                (activeCategory === cat ? " gallery-filter-btn-active" : "")
              }
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* ===== Masonry grid ===== */}
      <section className="gallery-grid-section">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className="gallery-grid"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={staggerContainer}
          >
            {filtered.map((item) => (
              <motion.div
                key={item.id}
                className={`gallery-item gallery-item-${item.size}`}
                variants={fadeUp}
              >
                <Link to={`/gallery/${item.slug}`} className="gallery-item-link">
                  <img
                    src={item.src}
                    alt={`${item.title} — ${item.category} photography`}
                    loading="lazy"
                  />
                  <div className="gallery-item-overlay" aria-hidden="true" />
                  <span className="gallery-item-expand" aria-hidden="true">
                    <Expand size={16} />
                  </span>
                  <div className="gallery-item-caption">
                    <span className="gallery-item-category">{item.category}</span>
                    <span className="gallery-item-title">{item.title}</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <p className="gallery-empty">No images yet in this category.</p>
        )}
      </section>

      {/* ===== Lightbox ===== */}
      <AnimatePresence>
        {activeItem && <GalleryLightbox item={activeItem} key={activeItem.slug} />}
      </AnimatePresence>
    </div>
  );
}