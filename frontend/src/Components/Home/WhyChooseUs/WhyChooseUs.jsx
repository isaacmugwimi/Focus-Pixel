import { motion } from "framer-motion";
import { Check } from "lucide-react";
import "./WhyChooseUs.css";

// Swap for your own image — see src/assets/
import photographerImg from "../../../assets/whyChooseUs2.png";

const REASONS = [
  "High Quality & Professional Equipment",
  "Creative & Unique Photography",
  "Client-Focused Approach",
  "Timely Delivery",
];

// staggers eyebrow → heading → paragraph → list → signature
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

const listVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const listItemVariants = {
  hidden: { opacity: 0, x: -16 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function WhyChooseUs() {
  return (
    <section className="why-choose">
      <motion.div
        className="why-choose-content"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
        variants={contentVariants}
      >
        <motion.p className="why-choose-eyebrow" variants={fadeUp}>
          Why Choose Us
        </motion.p>

        <motion.h2 className="why-choose-title" variants={fadeUp}>
          More Than Just Pictures
        </motion.h2>

        <motion.p className="why-choose-desc" variants={fadeUp}>
          We don&apos;t just take photos, we capture emotions, details, and
          stories that last a lifetime.
        </motion.p>

        <motion.ul className="why-choose-list" variants={listVariants}>
          {REASONS.map((reason) => (
            <motion.li
              key={reason}
              className="why-choose-item"
              variants={listItemVariants}
            >
              <span className="why-choose-check" aria-hidden="true">
                <Check size={13} strokeWidth={3} />
              </span>
              {reason}
            </motion.li>
          ))}
        </motion.ul>

        <motion.p className="why-choose-signature" variants={fadeUp}>
          Focus Pixel
        </motion.p>
      </motion.div>

      <motion.div
        className="why-choose-media"
        style={{ backgroundImage: `url(${photographerImg})` }}
        initial={{ opacity: 0, scale: 1.08 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="why-choose-fade" aria-hidden="true" />
      </motion.div>
    </section>
  );
}
