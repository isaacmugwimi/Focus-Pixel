import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, Phone, Mail } from "lucide-react";
import "./ContactTeaser.css";

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function ContactTeaser() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    // Same as the full Contact page — wire this up to your real backend
    // or email service (Formspree, EmailJS, your own API, etc.)
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setForm({ name: "", email: "", message: "" });
    }, 800);
  };

  return (
    <section className="contact-teaser">
      <div className="contact-teaser-inner">
        <motion.div
          className="contact-teaser-text"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp}
        >
          <p className="contact-teaser-eyebrow">Get In Touch</p>
          <h2 className="contact-teaser-title">Have a Project in Mind?</h2>
          <p className="contact-teaser-desc">
            Send us a quick message and we&apos;ll get back to you within 24
            hours — or reach out directly.
          </p>

          <div className="contact-teaser-quick">
            <a href="tel:+254712345678" className="contact-teaser-quick-item">
              <Phone size={16} aria-hidden="true" />
              +254 712 345 678
            </a>
            <a
              href="mailto:hello@focuspixel.com"
              className="contact-teaser-quick-item"
            >
              <Mail size={16} aria-hidden="true" />
              hello@focuspixel.com
            </a>
          </div>
        </motion.div>

        <motion.div
          className="contact-teaser-card"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {submitted ? (
            <div className="contact-teaser-success">
              <CheckCircle2 size={38} className="contact-teaser-success-icon" />
              <h3>Message Sent!</h3>
              <p>We&apos;ll be in touch shortly.</p>
              <button
                type="button"
                className="contact-teaser-btn-secondary"
                onClick={() => setSubmitted(false)}
              >
                Send Another
              </button>
            </div>
          ) : (
            <form className="contact-teaser-form" onSubmit={handleSubmit}>
              <div className="contact-teaser-field">
                <label htmlFor="teaser-name">Name</label>
                <input
                  id="teaser-name"
                  name="name"
                  type="text"
                  required
                  placeholder="Your name"
                  value={form.name}
                  onChange={handleChange}
                />
              </div>

              <div className="contact-teaser-field">
                <label htmlFor="teaser-email">Email</label>
                <input
                  id="teaser-email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>

              <div className="contact-teaser-field">
                <label htmlFor="teaser-message">Message</label>
                <textarea
                  id="teaser-message"
                  name="message"
                  rows={3}
                  required
                  placeholder="Tell us a bit about what you need…"
                  value={form.message}
                  onChange={handleChange}
                />
              </div>

              <button
                type="submit"
                className="contact-teaser-btn-primary"
                disabled={submitting}
              >
                {submitting ? "Sending…" : "Send Message"}
                {!submitting && <Send size={16} aria-hidden="true" />}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
