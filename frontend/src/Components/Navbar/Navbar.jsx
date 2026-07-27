import { useState, useRef, useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import "./Navbar.css";

const SERVICES = [
  { label: "Portrait Photography", path: "/services/portrait" },
  { label: "Wedding Photography", path: "/services/wedding" },
  { label: "Landscape Photography", path: "/services/landscape" },
  { label: "Event Photography", path: "/services/event" },
  { label: "Product Photography", path: "/services/product" },
  { label: "Film & Videography", path: "/services/film" },
  { label: "Photo Editing & Retouching", path: "/services/editing" },
];

const NAV_LINKS = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
];

const NAV_LINKS_AFTER_SERVICES = [
  { label: "Gallery", path: "/gallery" },
  { label: "Blog", path: "/blog" },
  { label: "Testimonials", path: "/testimonials" },
  { label: "Contact", path: "/contact" },
  { label: "Faqs", path: "/faqs" },
];

export default function Navbar() {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

  // Only float transparently over a dark hero on the home page.
  // Other pages (About, Gallery, etc.) usually don't have a full-bleed
  // dark hero image behind the navbar, so they keep the solid bar.
  const isHome = location.pathname === "/";
  const isTransparent = isHome && !scrolled && !mobileOpen;

  // once the user scrolls past the hero, switch to a solid bar so the
  // navbar stays readable over lighter sections further down the page
  useEffect(() => {
    if (!isHome) return;
    function handleScroll() {
      setScrolled(window.scrollY > 60);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  // close desktop dropdown on outside click
  useEffect(() => {
    function handleClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setServicesOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // close mobile menu whenever a link is clicked
  const closeMobile = () => {
    setMobileOpen(false);
    setMobileServicesOpen(false);
  };

  return (
    <header className={"navbar" + (isTransparent ? " navbar-transparent" : "")}>
      <div className="navbar-inner">
        <Link to="/" className="navbar-logo" onClick={closeMobile}>
          <span className="navbar-logo-icon" aria-hidden="true">
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
          <span className="navbar-logo-text">
            FOCUS <span className="navbar-logo-accent">PIXEL</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="navbar-links" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === "/"}
              className={({ isActive }) =>
                "navbar-link" + (isActive ? " navbar-link-active" : "")
              }
            >
              {link.label}
            </NavLink>
          ))}

          <div
            className="navbar-dropdown"
            ref={dropdownRef}
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button
              className={
                "navbar-link navbar-dropdown-trigger" +
                (servicesOpen ? " navbar-link-active" : "")
              }
              onClick={() => setServicesOpen((o) => !o)}
              aria-expanded={servicesOpen}
              aria-haspopup="true"
            >
              Services
              <svg
                className={
                  "navbar-caret" + (servicesOpen ? " navbar-caret-open" : "")
                }
                width="10"
                height="6"
                viewBox="0 0 10 6"
                fill="none"
              >
                <path
                  d="M1 1L5 5L9 1"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {servicesOpen && (
              <div className="navbar-dropdown-menu">
                {SERVICES.map((service) => (
                  <NavLink
                    key={service.path}
                    to={service.path}
                    className="navbar-dropdown-item"
                    onClick={() => setServicesOpen(false)}
                  >
                    {service.label}
                  </NavLink>
                ))}
              </div>
            )}
          </div>

          {NAV_LINKS_AFTER_SERVICES.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                "navbar-link" + (isActive ? " navbar-link-active" : "")
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <Link to="/contact" className="navbar-cta">
          Let&apos;s Talk
        </Link>

        {/* Mobile hamburger */}
        <button
          className={
            "navbar-burger" + (mobileOpen ? " navbar-burger-open" : "")
          }
          onClick={() => setMobileOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={"navbar-mobile" + (mobileOpen ? " navbar-mobile-open" : "")}
      >
        {NAV_LINKS.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            end={link.path === "/"}
            className="navbar-mobile-link"
            onClick={closeMobile}
          >
            {link.label}
          </NavLink>
        ))}

        <button
          className="navbar-mobile-link navbar-mobile-dropdown-trigger"
          onClick={() => setMobileServicesOpen((o) => !o)}
          aria-expanded={mobileServicesOpen}
        >
          Services
          <svg
            className={
              "navbar-caret" + (mobileServicesOpen ? " navbar-caret-open" : "")
            }
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
          >
            <path
              d="M1 1L5 5L9 1"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        {mobileServicesOpen && (
          <div className="navbar-mobile-submenu">
            {SERVICES.map((service) => (
              <NavLink
                key={service.path}
                to={service.path}
                className="navbar-mobile-sublink"
                onClick={closeMobile}
              >
                {service.label}
              </NavLink>
            ))}
          </div>
        )}

        {NAV_LINKS_AFTER_SERVICES.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className="navbar-mobile-link"
            onClick={closeMobile}
          >
            {link.label}
          </NavLink>
        ))}

        <Link
          to="/contact"
          className="navbar-cta navbar-cta-mobile"
          onClick={closeMobile}
        >
          Let&apos;s Talk
        </Link>
      </div>
    </header>
  );
}
