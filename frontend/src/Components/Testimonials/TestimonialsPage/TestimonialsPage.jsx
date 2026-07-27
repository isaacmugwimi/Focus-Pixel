import { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  User,
  ArrowRight,
  Quote,
  Upload,
  X,
  CheckCircle2,
} from "lucide-react";
import "./TestimonialsPage.css";

const REVIEWS = [
  {
    id: 1,
    name: "Amara Wanjiru",
    role: "Bride",
    category: "Wedding",
    rating: 5,
    quote:
      "Focus Pixel captured our wedding day better than we could have ever imagined. Every emotion, every detail — it's all there.",
  },
  {
    id: 2,
    name: "David Kimani",
    role: "Startup Founder",
    category: "Product",
    rating: 5,
    quote:
      "The product shots they delivered completely transformed how our brand looks online. Professional, fast, and genuinely creative.",
  },
  {
    id: 3,
    name: "Grace Njoroge",
    role: "Portrait Client",
    category: "Portrait",
    rating: 4,
    quote:
      "I've never felt so comfortable in front of a camera. The team made the whole session fun and the photos speak for themselves.",
  },
  {
    id: 4,
    name: "Samuel Otieno",
    role: "Event Organizer",
    category: "Event",
    rating: 5,
    quote:
      "They captured the entire energy of our conference — from the keynote to the after-party. Turnaround time was incredible too.",
  },
  {
    id: 5,
    name: "Lydia Mwangi",
    role: "Travel Blogger",
    category: "Landscape",
    rating: 5,
    quote:
      "The landscape shots from our trip are the best travel photography I've ever had done. Truly cinematic, every single frame.",
  },
  {
    id: 6,
    name: "Peter Mburu",
    role: "Corporate Client",
    category: "Product",
    rating: 5,
    quote:
      "Our headshots and brand imagery finally look like the professional company we actually are. Worth every shilling.",
  },
  {
    id: 7,
    name: "Faith Njeri",
    role: "Bride",
    category: "Wedding",
    rating: 5,
    quote:
      "From the engagement shoot to the big day, Focus Pixel felt like part of the family. We cried looking at the album.",
  },
  {
    id: 8,
    name: "Kevin Mutua",
    role: "Portrait Client",
    category: "Portrait",
    rating: 4,
    quote:
      "Great communication throughout and the final retouching was subtle and natural — exactly what I asked for.",
  },
];

const CATEGORIES = [
  "All",
  "Wedding",
  "Portrait",
  "Landscape",
  "Event",
  "Product",
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
  visible: { transition: { staggerChildren: 0.08 } },
};

const SERVICE_CHOICES = [
  "Portrait Photography",
  "Wedding Photography",
  "Landscape Photography",
  "Event Photography",
  "Product Photography",
  "Photo Editing & Retouching",
];

const MAX_IMAGE_MB = 5;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

export default function TestimonialsPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  // ===== Share-a-testimonial form state =====
  const [reviewForm, setReviewForm] = useState({
    name: "",
    email: "",
    service: "",
    message: "",
  });
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [photo, setPhoto] = useState(null); // { file, previewUrl }
  const [errors, setErrors] = useState({});
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const fileInputRef = useRef(null);

  const filtered = useMemo(
    () =>
      activeCategory === "All"
        ? REVIEWS
        : REVIEWS.filter((r) => r.category === activeCategory),
    [activeCategory],
  );

  const averageRating = useMemo(
    () =>
      (REVIEWS.reduce((sum, r) => sum + r.rating, 0) / REVIEWS.length).toFixed(
        1,
      ),
    [],
  );

  const distribution = useMemo(() => {
    const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    REVIEWS.forEach((r) => (counts[r.rating] += 1));
    return [5, 4, 3, 2, 1].map((star) => ({
      star,
      count: counts[star],
      pct: Math.round((counts[star] / REVIEWS.length) * 100),
    }));
  }, []);

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setReviewForm((prev) => ({ ...prev, [name]: value }));
    // clear that field's error as soon as the person starts fixing it
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleRatingPick = (value) => {
    setRating(value);
    if (errors.rating) setErrors((prev) => ({ ...prev, rating: undefined }));
  };

  const validateImageFile = (file) => {
    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      return "Please upload a JPG, PNG, or WEBP image.";
    }
    if (file.size > MAX_IMAGE_MB * 1024 * 1024) {
      return `Image must be smaller than ${MAX_IMAGE_MB}MB.`;
    }
    return null;
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const error = validateImageFile(file);
    if (error) {
      setErrors((prev) => ({ ...prev, photo: error }));
      e.target.value = ""; // reset the input so re-selecting the same bad file re-triggers onChange
      return;
    }

    setErrors((prev) => ({ ...prev, photo: undefined }));
    setPhoto({ file, previewUrl: URL.createObjectURL(file) });
  };

  const removePhoto = () => {
    if (photo?.previewUrl) URL.revokeObjectURL(photo.previewUrl);
    setPhoto(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const validateReviewForm = () => {
    const nextErrors = {};

    if (!reviewForm.name.trim()) {
      nextErrors.name = "Please enter your name.";
    } else if (reviewForm.name.trim().length < 2) {
      nextErrors.name = "Name must be at least 2 characters.";
    }

    if (!reviewForm.email.trim()) {
      nextErrors.email = "Please enter your email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(reviewForm.email.trim())) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (!reviewForm.service) {
      nextErrors.service = "Please select which service this is about.";
    }

    if (rating === 0) {
      nextErrors.rating = "Please choose a star rating.";
    }

    if (!reviewForm.message.trim()) {
      nextErrors.message = "Please share a few words about your experience.";
    } else if (reviewForm.message.trim().length < 20) {
      nextErrors.message = "Please write at least 20 characters.";
    }

    return nextErrors;
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();

    const nextErrors = validateReviewForm();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setReviewSubmitting(true);

    // Wire this up to your real backend — this just simulates a request.
    // The photo file lives at `photo.file` if you need to upload it
    // (e.g. via FormData to your API or a storage bucket).
    setTimeout(() => {
      setReviewSubmitting(false);
      setReviewSubmitted(true);
      if (photo?.previewUrl) URL.revokeObjectURL(photo.previewUrl);
      setReviewForm({ name: "", email: "", service: "", message: "" });
      setRating(0);
      setPhoto(null);
      setErrors({});
    }, 900);
  };

  return (
    <div className="testimonials-page">
      {/* ===== Banner ===== */}
      <section className="tp-banner">
        <div className="tp-banner-overlay" aria-hidden="true" />
        <motion.div
          className="tp-banner-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <nav className="tp-breadcrumb" aria-label="Breadcrumb">
            <a href="/">Home</a>
            <span aria-hidden="true">/</span>
            <span>Testimonials</span>
          </nav>
          <h1 className="tp-banner-title">What Our Clients Say</h1>
          <p className="tp-banner-subtitle">
            Real stories from real clients — the people whose moments we&apos;ve
            had the honor of capturing.
          </p>
        </motion.div>
      </section>

      {/* ===== Rating summary ===== */}
      <section className="tp-summary">
        <motion.div
          className="tp-summary-inner"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          <motion.div className="tp-summary-score" variants={fadeUp}>
            <span className="tp-summary-number">{averageRating}</span>
            <div className="tp-summary-stars" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  fill={i < Math.round(averageRating) ? "currentColor" : "none"}
                  className={
                    i < Math.round(averageRating)
                      ? "tp-star-filled"
                      : "tp-star-empty"
                  }
                />
              ))}
            </div>
            <span className="tp-summary-count">
              Based on {REVIEWS.length} reviews
            </span>
          </motion.div>

          <motion.div className="tp-summary-bars" variants={fadeUp}>
            {distribution.map((row) => (
              <div className="tp-bar-row" key={row.star}>
                <span className="tp-bar-label">{row.star} star</span>
                <div className="tp-bar-track">
                  <div
                    className="tp-bar-fill"
                    style={{ width: `${row.pct}%` }}
                  />
                </div>
                <span className="tp-bar-count">{row.count}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ===== Filters ===== */}
      <section className="tp-filters">
        <div className="tp-filters-inner">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              className={
                "tp-filter-btn" +
                (activeCategory === cat ? " tp-filter-btn-active" : "")
              }
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* ===== Grid ===== */}
      <section className="tp-grid-section">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className="tp-grid"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={staggerContainer}
          >
            {filtered.map((review) => (
              <motion.div key={review.id} className="tp-card" variants={fadeUp}>
                <Quote
                  size={22}
                  className="tp-card-quote-icon"
                  aria-hidden="true"
                />
                <p className="tp-card-quote">&ldquo;{review.quote}&rdquo;</p>

                <div className="tp-card-footer">
                  <span className="tp-card-avatar" aria-hidden="true">
                    <User size={18} />
                  </span>
                  <div className="tp-card-meta">
                    <span className="tp-card-name">{review.name}</span>
                    <span className="tp-card-role">{review.role}</span>
                  </div>
                  <span className="tp-card-tag">{review.category}</span>
                </div>

                <div className="tp-card-stars" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={13}
                      fill={i < review.rating ? "currentColor" : "none"}
                      className={
                        i < review.rating ? "tp-star-filled" : "tp-star-empty"
                      }
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <p className="tp-empty">No reviews yet for this category.</p>
        )}
      </section>

      {/* ===== Share your testimonial ===== */}
      <section className="tp-share">
        <div className="tp-share-inner">
          <motion.div
            className="tp-share-header"
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="tp-share-eyebrow">Leave a Review</p>
            <h2 className="tp-share-title">Share Your Experience</h2>
            <p className="tp-share-subtitle">
              Worked with us before? We&apos;d love to hear about it — and
              feature your story here.
            </p>
          </motion.div>

          <motion.div
            className="tp-share-card"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {reviewSubmitted ? (
              <div className="tp-share-success">
                <CheckCircle2 size={44} className="tp-share-success-icon" />
                <h3>Thank You!</h3>
                <p>
                  Your testimonial has been submitted and will be reviewed
                  before it&apos;s published.
                </p>
                <button
                  type="button"
                  className="tp-share-btn-secondary"
                  onClick={() => setReviewSubmitted(false)}
                >
                  Submit Another
                </button>
              </div>
            ) : (
              <form
                className="tp-share-form"
                onSubmit={handleReviewSubmit}
                noValidate
              >
                <div className="tp-share-row">
                  <div className="tp-share-field">
                    <label htmlFor="review-name">Your Name</label>
                    <input
                      id="review-name"
                      name="name"
                      type="text"
                      placeholder="Jane Doe"
                      value={reviewForm.name}
                      onChange={handleReviewChange}
                      aria-invalid={!!errors.name}
                      className={errors.name ? "tp-input-error" : ""}
                    />
                    {errors.name && (
                      <span className="tp-field-error">{errors.name}</span>
                    )}
                  </div>

                  <div className="tp-share-field">
                    <label htmlFor="review-email">Email</label>
                    <input
                      id="review-email"
                      name="email"
                      type="email"
                      placeholder="jane@example.com"
                      value={reviewForm.email}
                      onChange={handleReviewChange}
                      aria-invalid={!!errors.email}
                      className={errors.email ? "tp-input-error" : ""}
                    />
                    {errors.email && (
                      <span className="tp-field-error">{errors.email}</span>
                    )}
                    <span className="tp-field-hint">
                      Never published — only used to verify your review.
                    </span>
                  </div>
                </div>

                <div className="tp-share-field">
                  <label htmlFor="review-service">Which Service?</label>
                  <select
                    id="review-service"
                    name="service"
                    value={reviewForm.service}
                    onChange={handleReviewChange}
                    aria-invalid={!!errors.service}
                    className={errors.service ? "tp-input-error" : ""}
                  >
                    <option value="">Select a service…</option>
                    {SERVICE_CHOICES.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  {errors.service && (
                    <span className="tp-field-error">{errors.service}</span>
                  )}
                </div>

                <div className="tp-share-field">
                  <span className="tp-share-rating-label">Your Rating</span>
                  <div
                    className="tp-rating-picker"
                    role="radiogroup"
                    aria-label="Star rating"
                  >
                    {[1, 2, 3, 4, 5].map((value) => {
                      const filled = (hoverRating || rating) >= value;
                      return (
                        <button
                          key={value}
                          type="button"
                          role="radio"
                          aria-checked={rating === value}
                          aria-label={`${value} star${value > 1 ? "s" : ""}`}
                          className="tp-rating-star-btn"
                          onMouseEnter={() => setHoverRating(value)}
                          onMouseLeave={() => setHoverRating(0)}
                          onClick={() => handleRatingPick(value)}
                        >
                          <Star
                            size={26}
                            fill={filled ? "currentColor" : "none"}
                            className={
                              filled ? "tp-star-filled" : "tp-star-empty"
                            }
                          />
                        </button>
                      );
                    })}
                  </div>
                  {errors.rating && (
                    <span className="tp-field-error">{errors.rating}</span>
                  )}
                </div>

                <div className="tp-share-field">
                  <label htmlFor="review-message">Your Testimonial</label>
                  <textarea
                    id="review-message"
                    name="message"
                    rows={4}
                    placeholder="Tell us about your experience working with Focus Pixel…"
                    value={reviewForm.message}
                    onChange={handleReviewChange}
                    aria-invalid={!!errors.message}
                    className={errors.message ? "tp-input-error" : ""}
                  />
                  <div className="tp-field-footer">
                    {errors.message ? (
                      <span className="tp-field-error">{errors.message}</span>
                    ) : (
                      <span className="tp-field-hint">
                        Minimum 20 characters.
                      </span>
                    )}
                    <span className="tp-char-count">
                      {reviewForm.message.trim().length}/20
                    </span>
                  </div>
                </div>

                <div className="tp-share-field">
                  <span className="tp-share-rating-label">
                    Add a Photo <span className="tp-optional">(optional)</span>
                  </span>

                  {photo ? (
                    <div className="tp-photo-preview">
                      <img src={photo.previewUrl} alt="Upload preview" />
                      <button
                        type="button"
                        className="tp-photo-remove"
                        onClick={removePhoto}
                        aria-label="Remove photo"
                      >
                        <X size={15} />
                      </button>
                    </div>
                  ) : (
                    <label
                      className={
                        "tp-upload-dropzone" +
                        (errors.photo ? " tp-upload-dropzone-error" : "")
                      }
                    >
                      <Upload size={20} aria-hidden="true" />
                      <span>Click to upload a JPG, PNG, or WEBP</span>
                      <span className="tp-upload-hint">
                        Max {MAX_IMAGE_MB}MB
                      </span>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={handlePhotoChange}
                        hidden
                      />
                    </label>
                  )}
                  {errors.photo && (
                    <span className="tp-field-error">{errors.photo}</span>
                  )}
                </div>

                <button
                  type="submit"
                  className="tp-share-submit"
                  disabled={reviewSubmitting}
                >
                  {reviewSubmitting ? "Submitting…" : "Submit Testimonial"}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="tp-cta">
        <motion.div
          className="tp-cta-inner"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2>Ready to Be Our Next Success Story?</h2>
          <p>Let&apos;s create memories worth talking about.</p>
          <a href="/contact" className="tp-cta-btn">
            Book Your Session
            <ArrowRight size={17} aria-hidden="true" />
          </a>
        </motion.div>
      </section>
    </div>
  );
}
