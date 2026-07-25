import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import "./Portfolio.css";
import { PORTFOLIO } from "./PortfolioData";

// ===== Animation variants =====

const headerVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

// staggers its .portfolio-card children in as the track scrolls into view
const trackVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.94 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Portfolio() {
  const trackRef = useRef(null);
  const [itemsPerView, setItemsPerView] = useState(5);
  const [activePage, setActivePage] = useState(0);

  // how many cards are visible at once, matches the CSS breakpoints below
  useEffect(() => {
    function updateItemsPerView() {
      const w = window.innerWidth;
      if (w <= 640) setItemsPerView(1.2);
      else if (w <= 960) setItemsPerView(2.3);
      else if (w <= 1200) setItemsPerView(3.3);
      else setItemsPerView(5);
    }
    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  const pageCount = Math.max(
    1,
    Math.ceil(PORTFOLIO.length / Math.round(itemsPerView)),
  );

  // keep the active dot in sync while the user scrolls/drags the strip
  const handleScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const pageWidth = track.scrollWidth / pageCount;
    const page = Math.round(track.scrollLeft / pageWidth);
    setActivePage(Math.min(page, pageCount - 1));
  }, [pageCount]);

  const goToPage = (page) => {
    const track = trackRef.current;
    if (!track) return;
    const pageWidth = track.scrollWidth / pageCount;
    track.scrollTo({ left: page * pageWidth, behavior: "smooth" });
    setActivePage(page);
  };

  return (
    <section className="portfolio">
      <div className="portfolio-inner">
        <motion.div
          className="portfolio-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={headerVariants}
        >
          <div>
            <p className="portfolio-eyebrow">Featured Work</p>
            <h2 className="portfolio-title">Our Portfolio</h2>
          </div>

          <motion.a
            href="/gallery"
            className="portfolio-view-all"
            whileHover="hover"
          >
            View All
            <motion.span
              className="portfolio-view-all-icon"
              variants={{ hover: { x: 4 } }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <ArrowRight size={16} aria-hidden="true" />
            </motion.span>
          </motion.a>
        </motion.div>

        <motion.div
          className="portfolio-track"
          ref={trackRef}
          onScroll={handleScroll}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={trackVariants}
        >
          {PORTFOLIO.map((item) => (
            <motion.a
              key={item.id}
              href={`/gallery/${item.slug}`}
              className="portfolio-card"
              variants={cardVariants}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
            >
              <motion.img
                src={item.src}
                alt={`${item.title} — ${item.category} photography`}
                className="portfolio-card-img"
                loading="lazy"
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              />
              <div className="portfolio-card-overlay" aria-hidden="true" />

              <motion.span
                className="portfolio-card-expand"
                aria-hidden="true"
                initial={{ opacity: 0, y: -6 }}
                whileHover={{ opacity: 1, y: 0 }}
              >
                <ArrowUpRight size={18} />
              </motion.span>

              <div className="portfolio-card-caption">
                <span className="portfolio-card-category">{item.category}</span>
                <span className="portfolio-card-title">{item.title}</span>
              </div>
            </motion.a>
          ))}
        </motion.div>

        <div
          className="portfolio-dots"
          role="tablist"
          aria-label="Portfolio pages"
        >
          {Array.from({ length: pageCount }).map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === activePage}
              aria-label={`Go to portfolio page ${i + 1}`}
              className="portfolio-dot"
              onClick={() => goToPage(i)}
            >
              {i === activePage && (
                <motion.span
                  layoutId="portfolio-dot-active"
                  className="portfolio-dot-fill"
                  transition={{ type: "spring", stiffness: 500, damping: 32 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
