import { motion } from "framer-motion";
import { ArrowRight, Camera } from "lucide-react";
import "./AboutTeaser.css";

// Swap for a real headshot / behind-the-scenes photo — see src/assets/
import photographerPortrait from "../../../assets/heroImage1.png";

const contentVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function AboutTeaser() {
  return (
    <section className="about-teaser">
      <div className="about-teaser-media">
        <motion.div
          className="about-teaser-image"
          style={{ backgroundImage: `url(${photographerPortrait})` }}
          initial={{ opacity: 0, scale: 1.08 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        />
        <div className="about-teaser-fade" aria-hidden="true" />

        <div className="about-teaser-badge">
          <Camera size={18} aria-hidden="true" />
          <span>10+ Years Behind the Lens</span>
        </div>
      </div>

      <motion.div
        className="about-teaser-content"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
        variants={contentVariants}
      >
        <motion.p className="about-teaser-eyebrow" variants={fadeUp}>
          Meet The Photographer
        </motion.p>

        <motion.h2 className="about-teaser-title" variants={fadeUp}>
          The Eye Behind Every Frame
        </motion.h2>

        <motion.p className="about-teaser-desc" variants={fadeUp}>
          Focus Pixel started with one simple belief — that every moment
          deserves to be remembered beautifully. What began as a passion for
          storytelling through the lens has grown into a studio trusted by
          hundreds of clients across Kenya, from intimate portraits to
          full-scale weddings and brand campaigns.
        </motion.p>

        <motion.p className="about-teaser-desc" variants={fadeUp}>
          Every shoot is approached the same way: with patience, an honest eye,
          and a genuine love for the people and stories in front of the camera.
        </motion.p>

        <motion.a href="/about" className="about-teaser-link" variants={fadeUp}>
          Learn More About Us
          <ArrowRight size={17} aria-hidden="true" />
        </motion.a>
      </motion.div>
    </section>
  );
}
