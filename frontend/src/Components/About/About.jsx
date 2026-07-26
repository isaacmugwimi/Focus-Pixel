import { motion } from "framer-motion";
import {
  Heart,
  Sparkles,
  ShieldCheck,
  Clock,
  ArrowRight,
  Camera,
  Aperture,
  Lightbulb,
  Plane,
  Quote,
  Mail,
} from "lucide-react";
import { FaInstagram } from "react-icons/fa6";
import "./About.css";

// Swap these for real photos — see src/assets/
import storyImage from "../../assets/heroImage1.png";
import founderImage from "../../assets/heroImage1.png";
import teamMember2 from "../../assets/heroImage1.png";
import teamMember3 from "../../assets/heroImage1.png";

const VALUES = [
  {
    icon: Heart,
    title: "Passion First",
    description:
      "Every project starts with genuine care for the people and stories in front of our lens.",
  },
  {
    icon: Sparkles,
    title: "Creative Vision",
    description:
      "We don't just document — we craft images with intention, light, and artistic composition.",
  },
  {
    icon: ShieldCheck,
    title: "Reliability",
    description:
      "From the first inquiry to final delivery, you can count on us to show up and deliver.",
  },
  {
    icon: Clock,
    title: "Fast Turnaround",
    description:
      "Beautifully edited galleries delivered quickly, without ever cutting corners on quality.",
  },
];

const MILESTONES = [
  {
    year: "2015",
    title: "Studio Founded",
    description:
      "Started with a single camera and a dream to tell stories through images.",
  },
  {
    year: "2018",
    title: "First Wedding Season",
    description:
      "Shot our first 50 weddings across Kenya, building a name in the industry.",
  },
  {
    year: "2021",
    title: "Studio Expansion",
    description:
      "Grew into a full team, adding video and product photography services.",
  },
  {
    year: "2024",
    title: "50+ Awards",
    description:
      "Recognized nationally for excellence in wedding and portrait photography.",
  },
];

const EQUIPMENT = [
  { icon: Camera, label: "Canon EOS R5 & 6D Mark II" },
  { icon: Aperture, label: "Prime & Zoom L-Series Lenses" },
  { icon: Lightbulb, label: "Professional Studio Lighting" },
  { icon: Plane, label: "Aerial Drone Coverage" },
];

const TEAM = [
  {
    name: "Wanjiru Kamau",
    role: "Wedding & Portrait Specialist",
    image: teamMember2,
  },
  {
    name: "Brian Otieno",
    role: "Video & Post-Production Lead",
    image: teamMember3,
  },
];

const STATS = [
  { number: "500+", label: "Happy Clients" },
  { number: "10+", label: "Years Experience" },
  { number: "1,200+", label: "Projects Delivered" },
  { number: "50+", label: "Awards Won" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
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

export default function About() {
  return (
    <div className="about-page">
      {/* ===== Banner ===== */}
      <section className="about-banner">
        <div className="about-banner-overlay" aria-hidden="true" />

        <motion.div
          className="about-banner-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <nav className="about-breadcrumb" aria-label="Breadcrumb">
            <a href="/">Home</a>
            <span aria-hidden="true">/</span>
            <span>About</span>
          </nav>

          <h1 className="about-banner-title">About Focus Pixel</h1>
          <p className="about-banner-subtitle">
            The story, the people, and the passion behind every frame we
            capture.
          </p>
        </motion.div>
      </section>

      {/* ===== Our Story ===== */}
      <section className="about-story">
        <div className="about-story-inner">
          <motion.div
            className="about-story-media"
            initial={{ opacity: 0, scale: 1.06 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            style={{ backgroundImage: `url(${storyImage})` }}
          />

          <motion.div
            className="about-story-content"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
          >
            <motion.p className="about-eyebrow" variants={fadeUp}>
              Our Story
            </motion.p>
            <motion.h2 className="about-story-title" variants={fadeUp}>
              Built on a Love for Storytelling
            </motion.h2>
            <motion.p className="about-story-text" variants={fadeUp}>
              Focus Pixel began with a single camera, a love for light, and a
              belief that every moment — big or small — deserves to be
              remembered beautifully. What started as a one-person passion
              project has grown into a full studio trusted by hundreds of
              clients across Kenya.
            </motion.p>
            <motion.p className="about-story-text" variants={fadeUp}>
              Today, our team specializes in weddings, portraits, events,
              products, and everything in between — but the mission hasn't
              changed: capture it real, capture it beautifully, and make sure it
              lasts forever.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ===== Meet the Founder ===== */}
      <section className="about-founder">
        <div className="about-founder-inner">
          <motion.div
            className="about-founder-media"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className="about-founder-photo"
              style={{ backgroundImage: `url(${founderImage})` }}
            />
          </motion.div>

          <motion.div
            className="about-founder-content"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
          >
            <motion.p className="about-eyebrow" variants={fadeUp}>
              Meet The Founder
            </motion.p>
            <motion.h2 className="about-founder-name" variants={fadeUp}>
              Bruce Mwongesa
            </motion.h2>
            <motion.p className="about-founder-role" variants={fadeUp}>
              Founder & Lead Photographer
            </motion.p>

            <motion.div className="about-founder-quote" variants={fadeUp}>
              <Quote
                size={26}
                className="about-founder-quote-icon"
                aria-hidden="true"
              />
              <p>
                Every photo should feel like a memory you can walk back into —
                not just something you look at, but something you feel all over
                again.
              </p>
            </motion.div>

            <motion.p className="about-founder-bio" variants={fadeUp}>
              Bruce picked up his first camera over a decade ago and never put
              it down. What began as a hobby shooting friends and family turned
              into Focus Pixel — a studio built on the belief that great
              photography is equal parts technical skill and genuine human
              connection. He's personally shot over 400 weddings and portrait
              sessions, and now leads a small team that shares the same
              obsession with light, timing, and honest storytelling.
            </motion.p>

            <motion.div className="about-founder-socials" variants={fadeUp}>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Bruce's Instagram"
                className="about-founder-social-btn"
              >
                <FaInstagram size={17} />
              </a>
              <a
                href="mailto:hello@focuspixel.com"
                aria-label="Email Bruce"
                className="about-founder-social-btn"
              >
                <Mail size={17} />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== Our Journey ===== */}
      <section className="about-journey">
        <div className="about-journey-inner">
          <motion.div
            className="about-journey-header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeUp}
          >
            <p className="about-eyebrow">Our Journey</p>
            <h2 className="about-journey-title">Milestones Along the Way</h2>
          </motion.div>

          <motion.div
            className="about-journey-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            {MILESTONES.map((milestone) => (
              <motion.div
                key={milestone.year}
                className="about-journey-card"
                variants={fadeUp}
              >
                <span className="about-journey-year">{milestone.year}</span>
                <h3>{milestone.title}</h3>
                <p>{milestone.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== Values ===== */}
      <section className="about-values">
        <div className="about-values-inner">
          <motion.div
            className="about-values-header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeUp}
          >
            <p className="about-eyebrow">What Drives Us</p>
            <h2 className="about-values-title">Our Values</h2>
          </motion.div>

          <motion.div
            className="about-values-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            {VALUES.map((value) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  className="about-value-card"
                  variants={fadeUp}
                >
                  <span className="about-value-icon" aria-hidden="true">
                    <Icon size={22} />
                  </span>
                  <h3>{value.title}</h3>
                  <p>{value.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ===== Equipment ===== */}
      <section className="about-equipment">
        <div className="about-equipment-inner">
          <motion.div
            className="about-equipment-header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeUp}
          >
            <p className="about-eyebrow">Behind the Scenes</p>
            <h2 className="about-equipment-title">The Gear We Trust</h2>
          </motion.div>

          <motion.div
            className="about-equipment-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            {EQUIPMENT.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.label}
                  className="about-equipment-card"
                  variants={fadeUp}
                >
                  <Icon size={20} aria-hidden="true" />
                  <span>{item.label}</span>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ===== Stats ===== */}
      <section className="about-stats">
        <div className="about-stats-inner">
          {STATS.map((stat) => (
            <div className="about-stat" key={stat.label}>
              <span className="about-stat-number">{stat.number}</span>
              <span className="about-stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Team ===== */}
      <section className="about-team">
        <div className="about-team-inner">
          <motion.div
            className="about-team-header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeUp}
          >
            <p className="about-eyebrow">The Rest of the Crew</p>
            <h2 className="about-team-title">Meet the Team</h2>
          </motion.div>

          <motion.div
            className="about-team-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            {TEAM.map((member) => (
              <motion.div
                key={member.name}
                className="about-team-card"
                variants={fadeUp}
              >
                <div
                  className="about-team-photo"
                  style={{ backgroundImage: `url(${member.image})` }}
                />
                <h3 className="about-team-name">{member.name}</h3>
                <p className="about-team-role">{member.role}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="about-cta">
        <motion.div
          className="about-cta-inner"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="about-cta-icon" aria-hidden="true">
            <Camera size={22} />
          </span>
          <h2>Let&apos;s Tell Your Story Next</h2>
          <p>We&apos;d love to hear about your project and bring it to life.</p>
          <a href="/contact" className="about-cta-btn">
            Get In Touch
            <ArrowRight size={17} aria-hidden="true" />
          </a>
        </motion.div>
      </section>
    </div>
  );
}
