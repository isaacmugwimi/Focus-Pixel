import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, User, ArrowRight, Quote } from "lucide-react";
import "./TestimonialsPage.css";

const REVIEWS = [
  {
    id: 1,
    name: "Amara Wanjiru",
    role: "Bride",
    category: "Wedding",
    rating: 5,
    quote:
      "Focus Pixel captured our wedding day better than we could have ever imagined. Every emotion, every detail — it's all there.",
  },
  {
    id: 2,
    name: "David Kimani",
    role: "Startup Founder",
    category: "Product",
    rating: 5,
    quote:
      "The product shots they delivered completely transformed how our brand looks online. Professional, fast, and genuinely creative.",
  },
  {
    id: 3,
    name: "Grace Njoroge",
    role: "Portrait Client",
    category: "Portrait",
    rating: 4,
    quote:
      "I've never felt so comfortable in front of a camera. The team made the whole session fun and the photos speak for themselves.",
  },
  {
    id: 4,
    name: "Samuel Otieno",
    role: "Event Organizer",
    category: "Event",
    rating: 5,
    quote:
      "They captured the entire energy of our conference — from the keynote to the after-party. Turnaround time was incredible too.",
  },
  {
    id: 5,
    name: "Lydia Mwangi",
    role: "Travel Blogger",
    category: "Landscape",
    rating: 5,
    quote:
      "The landscape shots from our trip are the best travel photography I've ever had done. Truly cinematic, every single frame.",
  },
  {
    id: 6,
    name: "Peter Mburu",
    role: "Corporate Client",
    category: "Product",
    rating: 5,
    quote:
      "Our headshots and brand imagery finally look like the professional company we actually are. Worth every shilling.",
  },
  {
    id: 7,
    name: "Faith Njeri",
    role: "Bride",
    category: "Wedding",
    rating: 5,
    quote:
      "From the engagement shoot to the big day, Focus Pixel felt like part of the family. We cried looking at the album.",
  },
  {
    id: 8,
    name: "Kevin Mutua",
    role: "Portrait Client",
    category: "Portrait",
    rating: 4,
    quote:
      "Great communication throughout and the final retouching was subtle and natural — exactly what I asked for.",
  },
];

const CATEGORIES = [
  "All",
  "Wedding",
  "Portrait",
  "Landscape",
  "Event",
  "Product",
];

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

export default function TestimonialsPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = useMemo(
    () =>
      activeCategory === "All"
        ? REVIEWS
        : REVIEWS.filter((r) => r.category === activeCategory),
    [activeCategory],
  );

  const averageRating = useMemo(
    () =>
      (REVIEWS.reduce((sum, r) => sum + r.rating, 0) / REVIEWS.length).toFixed(
        1,
      ),
    [],
  );

  const distribution = useMemo(() => {
    const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    REVIEWS.forEach((r) => (counts[r.rating] += 1));
    return [5, 4, 3, 2, 1].map((star) => ({
      star,
      count: counts[star],
      pct: Math.round((counts[star] / REVIEWS.length) * 100),
    }));
  }, []);

  return (
    <div className="testimonials-page">
      {/* ===== Banner ===== */}
      <section className="tp-banner">
        <div className="tp-banner-overlay" aria-hidden="true" />
        <motion.div
          className="tp-banner-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <nav className="tp-breadcrumb" aria-label="Breadcrumb">
            <a href="/">Home</a>
            <span aria-hidden="true">/</span>
            <span>Testimonials</span>
          </nav>
          <h1 className="tp-banner-title">What Our Clients Say</h1>
          <p className="tp-banner-subtitle">
            Real stories from real clients — the people whose moments we&apos;ve
            had the honor of capturing.
          </p>
        </motion.div>
      </section>

      {/* ===== Rating summary ===== */}
      <section className="tp-summary">
        <motion.div
          className="tp-summary-inner"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          <motion.div className="tp-summary-score" variants={fadeUp}>
            <span className="tp-summary-number">{averageRating}</span>
            <div className="tp-summary-stars" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  fill={i < Math.round(averageRating) ? "currentColor" : "none"}
                  className={
                    i < Math.round(averageRating)
                      ? "tp-star-filled"
                      : "tp-star-empty"
                  }
                />
              ))}
            </div>
            <span className="tp-summary-count">
              Based on {REVIEWS.length} reviews
            </span>
          </motion.div>

          <motion.div className="tp-summary-bars" variants={fadeUp}>
            {distribution.map((row) => (
              <div className="tp-bar-row" key={row.star}>
                <span className="tp-bar-label">{row.star} star</span>
                <div className="tp-bar-track">
                  <div
                    className="tp-bar-fill"
                    style={{ width: `${row.pct}%` }}
                  />
                </div>
                <span className="tp-bar-count">{row.count}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ===== Filters ===== */}
      <section className="tp-filters">
        <div className="tp-filters-inner">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              className={
                "tp-filter-btn" +
                (activeCategory === cat ? " tp-filter-btn-active" : "")
              }
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* ===== Grid ===== */}
      <section className="tp-grid-section">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className="tp-grid"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={staggerContainer}
          >
            {filtered.map((review) => (
              <motion.div key={review.id} className="tp-card" variants={fadeUp}>
                <Quote
                  size={22}
                  className="tp-card-quote-icon"
                  aria-hidden="true"
                />
                <p className="tp-card-quote">&ldquo;{review.quote}&rdquo;</p>

                <div className="tp-card-footer">
                  <span className="tp-card-avatar" aria-hidden="true">
                    <User size={18} />
                  </span>
                  <div className="tp-card-meta">
                    <span className="tp-card-name">{review.name}</span>
                    <span className="tp-card-role">{review.role}</span>
                  </div>
                  <span className="tp-card-tag">{review.category}</span>
                </div>

                <div className="tp-card-stars" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={13}
                      fill={i < review.rating ? "currentColor" : "none"}
                      className={
                        i < review.rating ? "tp-star-filled" : "tp-star-empty"
                      }
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <p className="tp-empty">No reviews yet for this category.</p>
        )}
      </section>

      {/* ===== CTA ===== */}
      <section className="tp-cta">
        <motion.div
          className="tp-cta-inner"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2>Ready to Be Our Next Success Story?</h2>
          <p>Let&apos;s create memories worth talking about.</p>
          <a href="/contact" className="tp-cta-btn">
            Book Your Session
            <ArrowRight size={17} aria-hidden="true" />
          </a>
        </motion.div>
      </section>
    </div>
  );
}
