import { motion } from "framer-motion";
import {
  MessageSquare,
  CalendarCheck,
  Camera,
  Wand2,
  PackageCheck,
  ArrowRight,
} from "lucide-react";
import "./HowItWorks.css";

const STEPS = [
  {
    number: "01",
    icon: MessageSquare,
    title: "Reach Out",
    description:
      "Tell us about your vision, date, and location through our contact form or a quick call. No detail is too small.",
  },
  {
    number: "02",
    icon: CalendarCheck,
    title: "Free Consultation",
    description:
      "We'll talk through your goals, style preferences, and budget, then lock in the perfect date on our calendar.",
  },
  {
    number: "03",
    icon: Camera,
    title: "The Shoot",
    description:
      "On the day, we bring the gear, the creative eye, and make sure you feel completely comfortable in front of the lens.",
  },
  {
    number: "04",
    icon: Wand2,
    title: "Editing & Retouching",
    description:
      "Every image is hand-edited by our team to bring out its best — nothing leaves our studio unpolished.",
  },
  {
    number: "05",
    icon: PackageCheck,
    title: "Delivery",
    description:
      "Receive your full gallery online within days, ready to download in high resolution, print, and share.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function HowItWorks() {
  return (
    <div className="how-it-works">
      {/* ===== Header ===== */}
      <section className="hiw-header">
        <motion.p
          className="hiw-eyebrow"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          How It Works
        </motion.p>
        <motion.h1
          className="hiw-title"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={{ delay: 0.05 }}
        >
          From First Message to Final Gallery
        </motion.h1>
        <motion.p
          className="hiw-subtitle"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={{ delay: 0.1 }}
        >
          A simple, five-step process designed to make working with us feel
          effortless — from the first hello to the moment you open your gallery.
        </motion.p>
      </section>

      {/* ===== Timeline ===== */}
      <section className="hiw-timeline-section">
        <div className="hiw-timeline">
          <span className="hiw-timeline-line" aria-hidden="true" />

          {STEPS.map((step, index) => {
            const Icon = step.icon;
            const isEven = index % 2 === 1;

            return (
              <motion.div
                key={step.number}
                className={"hiw-step" + (isEven ? " hiw-step-reverse" : "")}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="hiw-step-card">
                  <span className="hiw-step-number">{step.number}</span>
                  <h3 className="hiw-step-title">{step.title}</h3>
                  <p className="hiw-step-desc">{step.description}</p>
                </div>

                <span className="hiw-step-node" aria-hidden="true">
                  <Icon size={22} />
                </span>

                <div className="hiw-step-spacer" />
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="hiw-cta">
        <motion.div
          className="hiw-cta-inner"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2>Ready to Start Your Story?</h2>
          <p>Let&apos;s talk about your project and find your perfect date.</p>
          <a href="/contact" className="hiw-cta-btn">
            Get In Touch
            <ArrowRight size={17} aria-hidden="true" />
          </a>
        </motion.div>
      </section>
    </div>
  );
}
