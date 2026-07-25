import { useEffect, useRef, useState } from "react";
import {
  Camera,
  Gem,
  Mountain,
  Video,
  Package,
  SlidersHorizontal,
  ArrowRight,
} from "lucide-react";
import "./Services.css";

// Swap these for your own high-res images.
// Drop matching files into src/assets/services/ (any of .jpg/.jpeg/.png/.webp —
// just update the extensions below to match what you add).
import portraitImg from "../../../assets/heroImage1.png";
import weddingImg from "../../../assets/heroImage1.png";
import landscapeImg from "../../../assets/heroImage1.png";
import eventImg from "../../../assets/heroImage1.png";
import productImg from "../../../assets/heroImage1.png";
import editingImg from "../../../assets/heroImage1.png";

const SERVICES = [
  {
    slug: "portrait",
    title: "Portrait Photography",
    description:
      "Authentic portraits that capture your personality with timeless elegance.",
    icon: <Camera />,
    image: portraitImg,
  },
  {
    slug: "wedding",
    title: "Wedding Photography",
    description:
      "Every smile, embrace and unforgettable moment preserved beautifully.",
    icon: <Gem />,
    image: weddingImg,
  },
  {
    slug: "landscape",
    title: "Landscape Photography",
    description:
      "Breathtaking scenery captured with artistic vision and cinematic composition.",
    icon: <Mountain />,
    image: landscapeImg,
  },
  {
    slug: "event",
    title: "Event Photography",
    description:
      "Capturing the atmosphere, energy and emotions of every celebration.",
    icon: <Video />,
    image: eventImg,
  },
  {
    slug: "product",
    title: "Product Photography",
    description: "High-end commercial imagery designed to elevate your brand.",
    icon: <Package />,
    image: productImg,
  },
  {
    slug: "editing",
    title: "Photo Editing & Retouching",
    description:
      "Professional retouching that transforms great photographs into extraordinary works.",
    icon: <SlidersHorizontal />,
    image: editingImg,
  },
];

export default function Services() {
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);

  // Trigger the entrance animation once, the first time the section
  // scrolls into the viewport — not on every scroll pass.
  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={"services" + (inView ? " services-in-view" : "")}
    >
      {/* Ambient background: glow, texture, vignette */}
      <div className="services-glow" aria-hidden="true" />
      <div className="services-grid-texture" aria-hidden="true" />
      <div className="services-vignette" aria-hidden="true" />

      <div className="services-inner">
        <header className="services-header">
          <span className="services-accent-line" aria-hidden="true" />
          <p className="services-eyebrow">Our Services</p>
          <h2 className="services-title">Photography crafted with passion.</h2>
          <p className="services-subtitle">
            From intimate portraits to breathtaking landscapes, we create
            timeless imagery that tells unforgettable stories.
          </p>
        </header>

        <div className="services-grid">
          {SERVICES.map((service, index) => (
            <a
              key={service.slug}
              href={`/services/${service.slug}`}
              className="services-card"
              style={{ "--i": index }}
            >
              <div
                className="services-card-bg"
                style={{ backgroundImage: `url(${service.image})` }}
                aria-hidden="true"
              />
              <div className="services-card-overlay" aria-hidden="true" />
              <div className="services-card-border-glow" aria-hidden="true" />

              <div className="services-card-body">
                <span className="services-icon">{service.icon}</span>
                <h3 className="services-card-title">{service.title}</h3>
                <p className="services-card-desc">{service.description}</p>

                <span className="services-card-explore">
                  Explore Service
                  <ArrowRight size={15} aria-hidden="true" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
