import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, User } from "lucide-react";
import "./Testimonial.css";

const TESTIMONIALS = [
  {
    id: 1,
    name: "Amara Wanjiru",
    role: "Bride",
    rating: 5,
    quote:
      "Focus Pixel captured our wedding day better than we could have ever imagined. Every emotion, every detail — it's all there.",
  },
  {
    id: 2,
    name: "David Kimani",
    role: "Startup Founder",
    rating: 5,
    quote:
      "The product shots they delivered completely transformed how our brand looks online. Professional, fast, and genuinely creative.",
  },
  {
    id: 3,
    name: "Grace Njoroge",
    role: "Portrait Client",
    rating: 4,
    quote:
      "I've never felt so comfortable in front of a camera. The team made the whole session fun and the photos speak for themselves.",
  },
  {
    id: 4,
    name: "Samuel Otieno",
    role: "Event Organizer",
    rating: 5,
    quote:
      "They captured the entire energy of our conference — from the keynote to the after-party. Turnaround time was incredible too.",
  },
  {
    id: 5,
    name: "Lydia Mwangi",
    role: "Travel Blogger",
    rating: 5,
    quote:
      "The landscape shots from our trip are the best travel photography I've ever had done. Truly cinematic, every single frame.",
  },
   {
    id: 6,
    name: "Lydia Mwangi",
    role: "Travel Blogger",
    rating: 5,
    quote:
      "The landscape shots from our trip are the best travel photography I've ever had done. Truly cinematic, every single frame.",
  },
];

const AUTOPLAY_MS = 5000;

export default function Testimonial() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);
  const total = TESTIMONIALS.length;

  const goTo = useCallback(
    (index) => setActiveIndex((index + total) % total),
    [total]
  );
  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(() => {
      setActiveIndex((i) => (i + 1) % total);
    }, AUTOPLAY_MS);
    return () => clearInterval(timerRef.current);
  }, [paused, total]);

  // shortest signed distance from a card's index to the active card,
  // wrapping around either end of the array (so it "loops" smoothly)
  const getOffset = (index) => {
    let diff = index - activeIndex;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  };

  return (
    <section
      className="testimonials"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="testimonials-inner">
        <header className="testimonials-header">
          <p className="testimonials-eyebrow">Testimonials</p>
          <h2 className="testimonials-title">What Our Clients Say</h2>
          <p className="testimonials-subtitle">
            Stories from the people whose moments we&apos;ve had the honor of
            capturing.
          </p>
        </header>

        <div className="testimonials-stage">
          <button
            type="button"
            className="testimonials-arrow testimonials-arrow-prev"
            onClick={goPrev}
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={22} />
          </button>

          <div className="testimonials-track">
            {TESTIMONIALS.map((item, index) => {
              const offset = getOffset(index);
              const isActive = offset === 0;
              const abs = Math.abs(offset);
              const hidden = abs > 2;

              return (
                <motion.div
                  key={item.id}
                  className={
                    "testimonials-card" + (isActive ? " testimonials-card-active" : "")
                  }
                  animate={{
                    x: offset * 230,
                    scale: isActive ? 1 : abs === 1 ? 0.86 : 0.74,
                    rotateY: offset * -14,
                    opacity: hidden ? 0 : isActive ? 1 : abs === 1 ? 0.65 : 0.35,
                    zIndex: total - abs,
                  }}
                  transition={{ type: "spring", stiffness: 260, damping: 28 }}
                  style={{ pointerEvents: hidden ? "none" : "auto" }}
                  onClick={() => !isActive && goTo(index)}
                >
                  <p className="testimonials-quote">&ldquo;{item.quote}&rdquo;</p>

                  <div className="testimonials-avatar" aria-hidden="true">
                    <User size={22} />
                  </div>

                  <p className="testimonials-name">{item.name}</p>
                  <p className="testimonials-role">{item.role}</p>

                  <div className="testimonials-stars" aria-hidden="true">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={15}
                        fill={i < item.rating ? "currentColor" : "none"}
                        className={
                          i < item.rating
                            ? "testimonials-star-filled"
                            : "testimonials-star-empty"
                        }
                      />
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

          <button
            type="button"
            className="testimonials-arrow testimonials-arrow-next"
            onClick={goNext}
            aria-label="Next testimonial"
          >
            <ChevronRight size={22} />
          </button>
        </div>

        <div className="testimonials-dots" role="tablist" aria-label="Testimonials">
          {TESTIMONIALS.map((item, i) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={i === activeIndex}
              aria-label={`Go to testimonial ${i + 1}`}
              className={
                "testimonials-dot" + (i === activeIndex ? " testimonials-dot-active" : "")
              }
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}