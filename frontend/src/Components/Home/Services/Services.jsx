import {
  Camera,
  Gem,
  Mountain,
  Video,
  Package,
  SlidersHorizontal,
} from "lucide-react";
import "./Services.css";

const SERVICES = [
  {
    slug: "portrait",
    title: "Portrait Photography",
    description: "Natural, expressive portraits that celebrate your personality.",
    icon: <Camera />,
  },
  {
    slug: "wedding",
    title: "Wedding Photography",
    description: "Every smile, tear and embrace preserved forever.",
    icon: <Gem />,
  },
  {
    slug: "landscape",
    title: "Landscape Photography",
    description: "Epic landscapes that showcase the beauty of every destination.",
    icon: <Mountain />,
  },
  {
    slug: "event",
    title: "Event Photography",
    description: "Capturing the atmosphere, excitement and unforgettable moments.",
    icon: <Video />,
  },
  {
    slug: "product",
    title: "Product Photography",
    description: "Clean, high-quality visuals that elevate your brand.",
    icon: <Package />,
  },
  {
    slug: "editing",
    title: "Photo Editing & Retouching",
    description: "Professional retouching for flawless, magazine-quality results.",
    icon: <SlidersHorizontal />,
  },
];

export default function Services() {
  return (
    <section className="services">
      <div className="services-inner">
        <p className="services-eyebrow">What We Do</p>
        <h2 className="services-title">Our Services</h2>

        <div className="services-grid">
          {SERVICES.map((service) => (
            <a
              key={service.slug}
              href={`/services/${service.slug}`}
              className="services-card"
            >
              <span className="services-icon">{service.icon}</span>
              <h3 className="services-card-title">{service.title}</h3>
              <p className="services-card-desc">{service.description}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
