import { useState } from "react";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
} from "lucide-react";
import "./Contact.css";

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

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
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
      {/* ===== Header ===== */}
      <section className="contact-header">
        <motion.p
          className="contact-eyebrow"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          Contact Us
        </motion.p>
        <motion.h1
          className="contact-title"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={{ delay: 0.05 }}
        >
          Let&apos;s Create Something Beautiful
        </motion.h1>
        <motion.p
          className="contact-subtitle"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={{ delay: 0.1 }}
        >
          Have a project in mind, a date to book, or just a question?
          We&apos;d love to hear from you.
        </motion.p>
      </section>

      {/* ===== Main content ===== */}
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
                        target={item.href.startsWith("http") ? "_blank" : undefined}
                        rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
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
                  Thanks for reaching out — we&apos;ll get back to you within
                  24 hours.
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
    </div>
  );
}