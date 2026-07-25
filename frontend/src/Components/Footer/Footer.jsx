import {
  Facebook,
  Instagram,
  Youtube,
  Phone,
  Mail,
  MapPin,
  ArrowUp,
} from "lucide-react";
import "./Footer.css";

const QUICK_LINKS = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Portfolio", path: "/gallery" },
  { label: "Contact", path: "/contact" },
];

const SERVICE_LINKS = [
  { label: "Portrait Photography", path: "/services/portrait" },
  { label: "Wedding Photography", path: "/services/wedding" },
  { label: "Event Photography", path: "/services/event" },
  { label: "Product Photography", path: "/services/product" },
  { label: "Photo Editing", path: "/services/editing" },
];

const SOCIALS = [
  { label: "Facebook", href: "https://facebook.com", icon: Facebook },
  { label: "Instagram", href: "https://instagram.com", icon: Instagram },
  {
    label: "Pinterest",
    href: "https://pinterest.com",
    // lucide has no Pinterest glyph — small inline P-in-circle mark instead
    icon: (props) => (
      <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12 2C6.48 2 2 6.28 2 11.6c0 4.07 2.5 7.56 6.06 9.02-.08-.77-.16-1.94.03-2.78.18-.76 1.15-4.85 1.15-4.85s-.29-.59-.29-1.46c0-1.37.79-2.39 1.78-2.39.84 0 1.24.63 1.24 1.39 0 .85-.54 2.11-.81 3.29-.23.98.5 1.79 1.47 1.79 1.77 0 3.13-1.87 3.13-4.55 0-2.38-1.71-4.04-4.15-4.04-2.83 0-4.49 2.12-4.49 4.31 0 .85.33 1.77.74 2.27a.3.3 0 0 1 .07.29c-.08.32-.25 1-.29 1.14-.04.19-.15.23-.35.14-1.3-.6-2.11-2.5-2.11-4.02 0-3.28 2.38-6.29 6.87-6.29 3.61 0 6.41 2.57 6.41 6.01 0 3.58-2.26 6.47-5.4 6.47-1.06 0-2.05-.55-2.39-1.2l-.65 2.48c-.24.9-.87 2.03-1.3 2.72.98.3 2.02.46 3.1.46 5.52 0 10-4.28 10-9.6C22 6.28 17.52 2 12 2Z" />
      </svg>
    ),
  },
  { label: "YouTube", href: "https://youtube.com", icon: Youtube },
];

export default function Footer() {
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-columns">
          <div className="footer-brand">
            <a href="/" className="footer-logo">
              <span className="footer-logo-icon" aria-hidden="true">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2 L15 9 L22 12 L15 15 L12 22 L9 15 L2 12 L9 9 Z"
                    fill="currentColor"
                  />
                </svg>
              </span>
              <span className="footer-logo-text">
                FOCUS <span className="footer-logo-accent">PIXEL</span>
              </span>
            </a>
            <p className="footer-tagline">
              Turning moments into timeless memories.
            </p>

            <div className="footer-socials">
              {SOCIALS.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-social-btn"
                    aria-label={social.label}
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="footer-col">
            <h3 className="footer-col-title">Quick Links</h3>
            <ul className="footer-links">
              {QUICK_LINKS.map((link) => (
                <li key={link.path}>
                  <a href={link.path}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h3 className="footer-col-title">Services</h3>
            <ul className="footer-links">
              {SERVICE_LINKS.map((link) => (
                <li key={link.path}>
                  <a href={link.path}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h3 className="footer-col-title">Contact Us</h3>
            <ul className="footer-contact">
              <li>
                <Phone size={15} aria-hidden="true" />
                <a href="tel:+254712345678">+254 712 345 678</a>
              </li>
              <li>
                <Mail size={15} aria-hidden="true" />
                <a href="mailto:hello@focuspixel.com">hello@focuspixel.com</a>
              </li>
              <li>
                <MapPin size={15} aria-hidden="true" />
                <span>Meru, Kenya</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            © {year} Focus Pixel. All Rights Reserved.
          </p>
        </div>
      </div>

      <button
        type="button"
        className="footer-to-top"
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        <ArrowUp size={18} />
      </button>
    </footer>
  );
}
