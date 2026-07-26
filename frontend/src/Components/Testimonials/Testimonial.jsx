import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  EffectCoverflow,
  Navigation,
  Pagination,
  Autoplay,
} from "swiper/modules";
import { ChevronLeft, ChevronRight, Star, User } from "lucide-react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";
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
    name: "Peter Mburu",
    role: "Corporate Client",
    rating: 5,
    quote:
      "Our headshots and brand imagery finally look like the professional company we actually are. Worth every shilling.",
  },
];

export default function Testimonial() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <section className="testimonials">
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
            ref={prevRef}
            type="button"
            className="testimonials-arrow testimonials-arrow-prev"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={22} />
          </button>

          <Swiper
            modules={[EffectCoverflow, Navigation, Pagination, Autoplay]}
            effect="coverflow"
            grabCursor
            centeredSlides
            loop
            slidesPerView="auto"
            spaceBetween={-40}
            coverflowEffect={{
              rotate: 30,
              stretch: 0,
              depth: 160,
              modifier: 1,
              slideShadows: false,
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
              swiper.navigation.init();
              swiper.navigation.update();
            }}
            pagination={{ clickable: true, el: ".testimonials-dots" }}
            className="testimonials-swiper"
          >
            {TESTIMONIALS.map((item) => (
              <SwiperSlide key={item.id} className="testimonials-slide">
                <div className="testimonials-card">
                  <p className="testimonials-quote">
                    &ldquo;{item.quote}&rdquo;
                  </p>

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
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <button
            ref={nextRef}
            type="button"
            className="testimonials-arrow testimonials-arrow-next"
            aria-label="Next testimonial"
          >
            <ChevronRight size={22} />
          </button>
        </div>

        <div
          className="testimonials-dots"
          aria-label="Testimonials pagination"
        />
      </div>
    </section>
  );
}
