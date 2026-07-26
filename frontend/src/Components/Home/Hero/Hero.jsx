import { useState, useEffect, useRef, useCallback } from "react";
import "./Hero.css";
import {
  ArrowRight,
  Play,
  ChevronLeft,
  ChevronRight,
  Mouse,
  ChevronDown,
} from "lucide-react";
import { SLIDES } from "./HeroData";
import VideoModal from "../VideoModal/VideoModal";

const AUTOPLAY_MS = 7000;

const STATS = [
  { number: "500+", label: "Happy Clients" },
  { number: "10+", label: "Years Experience" },
  { number: "50+", label: "Awards Won" },
];

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [showreelOpen, setShowreelOpen] = useState(false);
  const timerRef = useRef(null);

  const goTo = useCallback((index) => {
    setActiveIndex((index + SLIDES.length) % SLIDES.length);
  }, []);

  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  // autoplay, paused on hover
  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(() => {
      setActiveIndex((i) => (i + 1) % SLIDES.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(timerRef.current);
  }, [paused]);

  return (
    <section
      className="hero"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Stacked background images, crossfaded via opacity */}
      <div className="hero-bg-stack">
        {SLIDES.map((slide, i) => (
          <div
            key={slide.id}
            className={"hero-bg" + (i === activeIndex ? " hero-bg-active" : "")}
            style={{ backgroundImage: `url(${slide.image})` }}
          />
        ))}
      </div>

      <div className="hero-overlay" />

      {/* Text content, crossfaded by remounting on slide change */}
      <div className="hero-content" key={SLIDES[activeIndex].id}>
        <p className="hero-eyebrow">{SLIDES[activeIndex].eyebrow}</p>

        <h1 className="hero-title">
          {SLIDES[activeIndex].titleMain}
          <br />
          {SLIDES[activeIndex].titleLine2}{" "}
          <span className="hero-title-accent">
            {SLIDES[activeIndex].titleAccent}
          </span>
        </h1>

        <p className="hero-subtitle">{SLIDES[activeIndex].subtitle}</p>

        <div className="hero-actions">
          <a href={SLIDES[activeIndex].ctaHref} className="hero-btn-primary">
            {SLIDES[activeIndex].ctaLabel}
            <ArrowRight size={18} strokeWidth={2} />
          </a>

          <button
            type="button"
            className="hero-btn-secondary"
            onClick={() => setShowreelOpen(true)}
          >
            <span className="hero-play-icon" aria-hidden="true">
              <Play size={14} fill="currentColor" strokeWidth={2} />
            </span>
            Watch Showreel
          </button>
        </div>

        <div className="hero-stats">
          {STATS.map((stat, i) => (
            <div style={{ display: "contents" }} key={stat.label}>
              <div className="hero-stat">
                <span className="hero-stat-number">{stat.number}</span>
                <span className="hero-stat-label">{stat.label}</span>
              </div>
              {i < STATS.length - 1 && <span className="hero-stat-divider" />}
            </div>
          ))}
        </div>
      </div>

      {/* Prev / next arrows */}
      <button
        type="button"
        className="hero-arrow hero-arrow-prev"
        onClick={goPrev}
        aria-label="Previous slide"
      >
        <ChevronLeft size={28} strokeWidth={2} />
      </button>
      <button
        type="button"
        className="hero-arrow hero-arrow-next"
        onClick={goNext}
        aria-label="Next slide"
      >
        <ChevronRight size={28} strokeWidth={2} />
      </button>

      {/* Dot indicators */}
      <div className="hero-dots">
        {SLIDES.map((slide, i) => (
          <button
            key={slide.id}
            type="button"
            className={
              "hero-dot" + (i === activeIndex ? " hero-dot-active" : "")
            }
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}: ${slide.id}`}
          />
        ))}
      </div>

      <button type="button" className="hero-scroll" aria-label="Scroll down">
        <span className="hero-scroll-icon">
          <Mouse size={30} strokeWidth={0.8} />
          <ChevronDown size={20} className="scroll-chevron" />
        </span>
        <span className="hero-scroll-label">Scroll Down</span>
      </button>

      <VideoModal
        isOpen={showreelOpen}
        onClose={() => setShowreelOpen(false)}
      />
    </section>
  );
}
