import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowRight, Search } from "lucide-react";
import "./Faqs.css";

const FAQ_GROUPS = [
  {
    category: "Booking",
    faqs: [
      {
        question: "How far in advance should I book?",
        answer:
          "For weddings, we recommend booking 3–6 months ahead, especially during peak season (June–August, December). Portraits and product shoots can usually be scheduled within 1–2 weeks.",
      },
      {
        question: "Do I need to pay a deposit?",
        answer:
          "Yes, a 30% non-refundable deposit secures your date for wedding and event bookings. The remaining balance is due on or before the day of the shoot.",
      },
      {
        question: "Can I reschedule my session?",
        answer:
          "Life happens — we allow one free reschedule with at least 7 days' notice, subject to availability on the new date.",
      },
    ],
  },
  {
    category: "Pricing",
    faqs: [
      {
        question: "How much does a session cost?",
        answer:
          "Pricing varies by service and package — portrait sessions start from a base rate, while weddings are quoted based on coverage hours and deliverables. Reach out for a personalized quote.",
      },
      {
        question: "Do you offer payment plans?",
        answer:
          "Yes, for wedding packages we offer a 3-installment plan: deposit, mid-point payment, and final balance before delivery.",
      },
      {
        question: "Are travel fees included?",
        answer:
          "Travel within a 50km radius of our Meru studio is included. Beyond that, a transparent travel fee is added and quoted upfront — no surprises.",
      },
    ],
  },
  {
    category: "The Shoot",
    faqs: [
      {
        question: "What should I wear to my portrait session?",
        answer:
          "Solid colors and simple patterns photograph best. We'll send a full styling guide once your session is confirmed, tailored to your shoot location.",
      },
      {
        question: "Do you travel outside Meru?",
        answer:
          "Yes — we shoot across Kenya and are available for destination work, including outside the country for the right project.",
      },
      {
        question: "What happens if it rains on shoot day?",
        answer:
          "For outdoor sessions, we monitor the forecast closely and will proactively suggest rescheduling or moving to a covered backup location at no extra cost.",
      },
    ],
  },
  {
    category: "Delivery",
    faqs: [
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
      {
        question: "How will I receive my final photos?",
        answer:
          "You'll get a private online gallery to view, download in full resolution, and share with friends and family. Print options are available on request.",
      },
    ],
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

export default function Faqs() {
  const [search, setSearch] = useState("");
  const [openKey, setOpenKey] = useState(null);

  const query = search.trim().toLowerCase();

  const filteredGroups = FAQ_GROUPS.map((group) => ({
    ...group,
    faqs: group.faqs.filter(
      (faq) =>
        !query ||
        faq.question.toLowerCase().includes(query) ||
        faq.answer.toLowerCase().includes(query),
    ),
  })).filter((group) => group.faqs.length > 0);

  return (
    <div className="faq-page">
      {/* ===== Banner ===== */}
      <section className="faq-banner">
        <div className="faq-banner-overlay" aria-hidden="true" />
        <motion.div
          className="faq-banner-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <nav className="faq-breadcrumb" aria-label="Breadcrumb">
            <a href="/">Home</a>
            <span aria-hidden="true">/</span>
            <span>FAQ</span>
          </nav>
          <h1 className="faq-banner-title">Frequently Asked Questions</h1>
          <p className="faq-banner-subtitle">
            Everything you need to know about booking, pricing, and working with
            Focus Pixel.
          </p>

          <div className="faq-search">
            <Search size={18} aria-hidden="true" />
            <input
              type="text"
              placeholder="Search a question…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search FAQs"
            />
          </div>
        </motion.div>
      </section>

      {/* ===== FAQ groups ===== */}
      <section className="faq-content">
        <div className="faq-content-inner">
          {filteredGroups.length === 0 && (
            <p className="faq-empty">
              No questions match &ldquo;{search}&rdquo; — try a different
              search, or <a href="/contact">just ask us directly</a>.
            </p>
          )}

          {filteredGroups.map((group) => (
            <motion.div
              key={group.category}
              className="faq-group"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
            >
              <h2 className="faq-group-title">{group.category}</h2>

              <div className="faq-list">
                {group.faqs.map((faq) => {
                  const key = `${group.category}-${faq.question}`;
                  const isOpen = openKey === key;
                  return (
                    <div
                      key={key}
                      className={"faq-item" + (isOpen ? " faq-item-open" : "")}
                    >
                      <button
                        type="button"
                        className="faq-question"
                        onClick={() => setOpenKey(isOpen ? null : key)}
                        aria-expanded={isOpen}
                      >
                        {faq.question}
                        <ChevronDown
                          size={18}
                          className="faq-chevron"
                          aria-hidden="true"
                        />
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            className="faq-answer-wrap"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{
                              duration: 0.3,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                          >
                            <p className="faq-answer">{faq.answer}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="faq-cta">
        <motion.div
          className="faq-cta-inner"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2>Still Have Questions?</h2>
          <p>We&apos;re happy to walk you through anything, no obligation.</p>
          <a href="/contact" className="faq-cta-btn">
            Contact Us
            <ArrowRight size={17} aria-hidden="true" />
          </a>
        </motion.div>
      </section>
    </div>
  );
}
