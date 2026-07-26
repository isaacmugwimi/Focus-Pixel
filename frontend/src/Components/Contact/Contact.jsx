import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  MessageCircle,
  ChevronDown,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import "./Contact.css";

const QUICK_CONTACT = [
  {
    icon: Phone,
    label: "Call Us",
    value: "+254 712 345 678",
    href: "tel:+254712345678",
  },
  {
    icon: FaWhatsapp,
    label: "WhatsApp",
    value: "Chat Instantly",
    href: "https://wa.me/254712345678",
  },
  {
    icon: Mail,
    label: "Email",
    value: "hello@focuspixel.com",
    href: "mailto:hello@focuspixel.com",
  },
  {
    icon: MapPin,
    label: "Visit the Studio",
    value: "Meru, Kenya",
    href: "https://www.google.com/maps?q=Meru,Kenya",
  },
];

const CONTACT_INFO = [
  {
    icon: Phone,
    label: "Phone",
    value: "+254 712 345 678",
    href: "tel:+254712345678",
  },
  {
    icon: Mail,
    label: "Email",
    value: "hello@focuspixel.com",
    href: "mailto:hello@focuspixel.com",
  },
  {
    icon: MapPin,
    label: "Studio",
    value: "Meru, Kenya",
    href: "https://www.google.com/maps?q=Meru,Kenya",
  },
  {
    icon: Clock,
    label: "Working Hours",
    value: "Mon – Sat, 8am – 6pm",
    href: null,
  },
];

const SERVICE_OPTIONS = [
  "Portrait Photography",
  "Wedding Photography",
  "Landscape Photography",
  "Event Photography",
  "Product Photography",
  "Photo Editing & Retouching",
  "Something else",
];

const TRUST_STRIP = [
  { icon: Zap, label: "Replies within 24 hours" },
  { icon: ShieldCheck, label: "No spam, ever" },
  { icon: MessageCircle, label: "Free initial consultation" },
];

const FAQS = [
  {
    question: "How far in advance should I book?",
    answer:
      "For weddings, we recommend booking 3–6 months ahead, especially during peak season (June–August, December). Portraits and product shoots can usually be scheduled within 1–2 weeks.",
  },
  {
    question: "Do you travel outside Meru?",
    answer:
      "Yes — we shoot across Kenya and are available for destination work. Travel fees apply beyond a 50km radius of our studio, and we're happy to quote this upfront.",
  },
  {
    question: "What's the turnaround time for edited photos?",
    answer:
      "Standard sessions are delivered within 5–7 business days. Full wedding galleries typically take 2–3 weeks given the volume of images we hand-edit.",
  },
  {
    question: "Can I request a specific editing style?",
    answer:
      "Absolutely. Share reference images or describe the mood you're after during your consultation, and we'll tailor the retouching to match.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: SERVICE_OPTIONS[0],
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    // Wire this up to your real backend / email service (e.g. Formspree,
    // EmailJS, or your own API endpoint) — this just simulates a request.
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setForm({
        name: "",
        email: "",
        phone: "",
        service: SERVICE_OPTIONS[0],
        message: "",
      });
    }, 900);
  };

  return (
    <div className="contact-page">
      {/* ===== Banner ===== */}
      <section className="contact-banner">
        <div className="contact-banner-overlay" aria-hidden="true" />

        <motion.div
          className="contact-banner-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <nav className="contact-breadcrumb" aria-label="Breadcrumb">
            <a href="/">Home</a>
            <span aria-hidden="true">/</span>
            <span>Contact</span>
          </nav>

          <h1 className="contact-banner-title">
            Let&apos;s Create Something Beautiful
          </h1>
          <p className="contact-banner-subtitle">
            Have a project in mind, a date to book, or just a question?
            We&apos;d love to hear from you.
          </p>
        </motion.div>
      </section>

      {/* ===== Quick contact cards ===== */}
      <section className="contact-quick">
        <motion.div
          className="contact-quick-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          {QUICK_CONTACT.map((item) => {
            const Icon = item.icon;
            return (
              <motion.a
                key={item.label}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  item.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                className="contact-quick-card"
                variants={fadeUp}
              >
                <span className="contact-quick-icon" aria-hidden="true">
                  <Icon size={20} />
                </span>
                <span className="contact-quick-label">{item.label}</span>
                <span className="contact-quick-value">{item.value}</span>
              </motion.a>
            );
          })}
        </motion.div>
      </section>

      {/* ===== Main content: info + form ===== */}
      <section className="contact-main">
        <div className="contact-grid">
          {/* Info column */}
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="contact-info-title">Get In Touch</h2>
            <p className="contact-info-desc">
              Prefer to reach out directly? Here&apos;s every way to find us.
            </p>

            <ul className="contact-info-list">
              {CONTACT_INFO.map((item) => {
                const Icon = item.icon;
                const content = (
                  <>
                    <span className="contact-info-icon" aria-hidden="true">
                      <Icon size={18} />
                    </span>
                    <span className="contact-info-text">
                      <span className="contact-info-label">{item.label}</span>
                      <span className="contact-info-value">{item.value}</span>
                    </span>
                  </>
                );

                return (
                  <li key={item.label}>
                    {item.href ? (
                      <a
                        href={item.href}
                        target={
                          item.href.startsWith("http") ? "_blank" : undefined
                        }
                        rel={
                          item.href.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                        className="contact-info-item contact-info-item-link"
                      >
                        {content}
                      </a>
                    ) : (
                      <div className="contact-info-item">{content}</div>
                    )}
                  </li>
                );
              })}
            </ul>

            <div className="contact-map">
              <iframe
                title="Focus Pixel studio location"
                src="https://www.google.com/maps?q=Meru,Kenya&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>

          {/* Form column */}
          <motion.div
            className="contact-form-wrap"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {submitted ? (
              <div className="contact-success">
                <CheckCircle2 size={44} className="contact-success-icon" />
                <h3>Message Sent!</h3>
                <p>
                  Thanks for reaching out — we&apos;ll get back to you within 24
                  hours.
                </p>
                <button
                  type="button"
                  className="contact-btn-secondary"
                  onClick={() => setSubmitted(false)}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="contact-form-row">
                  <div className="contact-field">
                    <label htmlFor="name">Full Name</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={form.name}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="contact-field">
                    <label htmlFor="email">Email Address</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="jane@example.com"
                      value={form.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="contact-form-row">
                  <div className="contact-field">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+254 7XX XXX XXX"
                      value={form.phone}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="contact-field">
                    <label htmlFor="service">Service Interested In</label>
                    <select
                      id="service"
                      name="service"
                      value={form.service}
                      onChange={handleChange}
                    >
                      {SERVICE_OPTIONS.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="contact-field">
                  <label htmlFor="message">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    placeholder="Tell us a little about your project or event…"
                    value={form.message}
                    onChange={handleChange}
                  />
                </div>

                <button
                  type="submit"
                  className="contact-btn-primary"
                  disabled={submitting}
                >
                  {submitting ? "Sending…" : "Send Message"}
                  {!submitting && <Send size={17} aria-hidden="true" />}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      {/* ===== Trust strip ===== */}
      <section className="contact-trust">
        <div className="contact-trust-inner">
          {TRUST_STRIP.map((item) => {
            const Icon = item.icon;
            return (
              <div className="contact-trust-item" key={item.label}>
                <Icon size={18} aria-hidden="true" />
                <span>{item.label}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="contact-faq">
        <div className="contact-faq-inner">
          <motion.div
            className="contact-faq-header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeUp}
          >
            <p className="contact-eyebrow">FAQ</p>
            <h2 className="contact-faq-title">Common Questions</h2>
          </motion.div>

          <div className="contact-faq-list">
            {FAQS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={faq.question}
                  className={
                    "contact-faq-item" +
                    (isOpen ? " contact-faq-item-open" : "")
                  }
                >
                  <button
                    type="button"
                    className="contact-faq-question"
                    onClick={() => setOpenFaq(isOpen ? -1 : index)}
                    aria-expanded={isOpen}
                  >
                    {faq.question}
                    <ChevronDown
                      size={18}
                      className="contact-faq-chevron"
                      aria-hidden="true"
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        className="contact-faq-answer-wrap"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <p className="contact-faq-answer">{faq.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
