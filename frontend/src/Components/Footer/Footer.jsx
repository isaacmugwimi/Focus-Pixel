  import { Phone, Mail, MapPin, ArrowUp } from "lucide-react";
  import {
    FaFacebookF,
    FaInstagram,
    FaPinterestP,
    FaYoutube,
  } from "react-icons/fa6";
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
    { label: "Facebook", href: "https://facebook.com", icon: FaFacebookF },
    { label: "Instagram", href: "https://instagram.com", icon: FaInstagram },
    { label: "Pinterest", href: "https://pinterest.com", icon: FaPinterestP },
    { label: "YouTube", href: "https://youtube.com", icon: FaYoutube },
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
