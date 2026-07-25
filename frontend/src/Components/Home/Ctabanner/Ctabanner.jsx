import { motion } from "framer-motion";
import { Camera, Aperture, ArrowRight } from "lucide-react";
import "./CTABanner.css";

export default function CTABanner() {
  return (
    <section className="cta-banner">
      {/* large faint aperture graphic, purely decorative */}
      <Aperture
        className="cta-banner-deco"
        aria-hidden="true"
        strokeWidth={0.6}
      />

      <motion.div
        className="cta-banner-inner"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="cta-banner-icon" aria-hidden="true">
          <Camera size={22} />
        </span>

        <div className="cta-banner-text">
          <h2 className="cta-banner-title">Ready to Capture Your Moment?</h2>
          <p className="cta-banner-subtitle">
            Let&apos;s create something amazing together.
          </p>
        </div>

        <a href="/contact" className="cta-banner-btn">
          Get In Touch
          <ArrowRight size={16} aria-hidden="true" />
        </a>
      </motion.div>
    </section>
  );
}
