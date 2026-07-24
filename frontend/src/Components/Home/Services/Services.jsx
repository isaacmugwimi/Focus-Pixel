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
    description: "Capturing your best moments.",
    icon: <Camera />,
  },
  {
    slug: "wedding",
    title: "Wedding Photography",
    description: "Your big day, beautifully captured.",
    icon: <Gem />,
  },
  {
    slug: "landscape",
    title: "Landscape Photography",
    description: "Nature, travel & scenic beauty.",
    icon: <Mountain />,
  },
  {
    slug: "event",
    title: "Event Photography",
    description: "Events, concerts & celebrations.",
    icon: <Video />,
  },
  {
    slug: "product",
    title: "Product Photography",
    description: "Professional shots for your brand.",
    icon: <Package />,
  },
  {
    slug: "editing",
    title: "Photo Editing & Retouching",
    description: "Perfecting every detail.",
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
