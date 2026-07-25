import { useEffect, useRef, useState, useCallback } from "react";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import "./Portfolio.css";
import { PORTFOLIO } from "./PortfolioData";

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
        <div className="portfolio-header">
          <div>
            <p className="portfolio-eyebrow">Featured Work</p>
            <h2 className="portfolio-title">Our Portfolio</h2>
          </div>

          <a href="/gallery" className="portfolio-view-all">
            View All
            <ArrowRight size={16} aria-hidden="true" />
          </a>
        </div>

        <div className="portfolio-track" ref={trackRef} onScroll={handleScroll}>
          {PORTFOLIO.map((item) => (
            <a
              key={item.id}
              href={`/gallery/${item.slug}`}
              className="portfolio-card"
            >
              <img
                src={item.src}
                alt={`${item.title} — ${item.category} photography`}
                className="portfolio-card-img"
                loading="lazy"
              />
              <div className="portfolio-card-overlay" aria-hidden="true" />

              <span className="portfolio-card-expand" aria-hidden="true">
                <ArrowUpRight size={18} />
              </span>

              <div className="portfolio-card-caption">
                <span className="portfolio-card-category">{item.category}</span>
                <span className="portfolio-card-title">{item.title}</span>
              </div>
            </a>
          ))}
        </div>

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
              className={
                "portfolio-dot" +
                (i === activePage ? " portfolio-dot-active" : "")
              }
              onClick={() => goToPage(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
