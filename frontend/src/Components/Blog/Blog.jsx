import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, ArrowRight, Mail } from "lucide-react";
import "./Blog.css";

// Swap these for real cover images — see src/assets/blog/
import post1 from "../../assets/blog/heroImage1.png";
import post2 from "../../assets/blog/heroImage1.png";
import post3 from "../../assets/blog/heroImage1.png";
import post4 from "../../assets/blog/heroImage1.png";
import post5 from "../../assets/blog/heroImage1.png";

const POSTS = [
  {
    id: 1,
    slug: "5-tips-for-natural-wedding-photos",
    title: "5 Tips for More Natural Wedding Photos",
    excerpt:
      "Forget stiff, posed shots. Here's how we get couples to relax in front of the camera so the real moments come through.",
    category: "Wedding",
    date: "July 2, 2026",
    readTime: "5 min read",
    image: post1,
    featured: true,
  },
  {
    id: 2,
    slug: "choosing-the-right-location-for-portraits",
    title: "Choosing the Right Location for Your Portrait Session",
    excerpt:
      "Golden hour on a rooftop or soft studio light? We break down how to pick a location that matches your personality.",
    category: "Portrait",
    date: "June 18, 2026",
    readTime: "4 min read",
    image: post2,
  },
  {
    id: 3,
    slug: "behind-the-scenes-corporate-shoot",
    title: "Behind the Scenes: A Full-Day Corporate Shoot",
    excerpt:
      "A look at how we plan, light, and execute a full-day brand shoot for a growing Nairobi startup.",
    category: "Product",
    date: "June 5, 2026",
    readTime: "6 min read",
    image: post3,
  },
  {
    id: 4,
    slug: "why-golden-hour-matters",
    title: "Why Golden Hour Matters (And When to Shoot It)",
    excerpt:
      "The one hour of the day every photographer chases — and exactly how to plan your shoot around it.",
    category: "Landscape",
    date: "May 22, 2026",
    readTime: "3 min read",
    image: post4,
  },
  {
    id: 5,
    slug: "how-we-edit-a-wedding-gallery",
    title: "How We Edit an Entire Wedding Gallery",
    excerpt:
      "From culling 3,000 shots down to 500 to final color grading — our full retouching workflow explained.",
    category: "Editing",
    date: "May 9, 2026",
    readTime: "7 min read",
    image: post5,
  },
];

const CATEGORIES = [
  "All",
  "Wedding",
  "Portrait",
  "Landscape",
  "Product",
  "Editing",
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

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("All");

  const featured = POSTS.find((p) => p.featured);

  const filtered = useMemo(() => {
    const rest = POSTS.filter((p) => !p.featured);
    return activeCategory === "All"
      ? rest
      : rest.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="blog-page">
      {/* ===== Banner ===== */}
      <section className="blog-banner">
        <div className="blog-banner-overlay" aria-hidden="true" />
        <motion.div
          className="blog-banner-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <nav className="blog-breadcrumb" aria-label="Breadcrumb">
            <a href="/">Home</a>
            <span aria-hidden="true">/</span>
            <span>Blog</span>
          </nav>
          <h1 className="blog-banner-title">
            Stories, Tips & Behind the Scenes
          </h1>
          <p className="blog-banner-subtitle">
            Photography insights, client stories, and a look at how we work —
            straight from the Focus Pixel studio.
          </p>
        </motion.div>
      </section>

      {/* ===== Featured post ===== */}
      {featured && (
        <section className="blog-featured">
          <motion.a
            href={`/blog/${featured.slug}`}
            className="blog-featured-card"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className="blog-featured-image"
              style={{ backgroundImage: `url(${featured.image})` }}
            />
            <div className="blog-featured-body">
              <span className="blog-featured-badge">Featured</span>
              <span className="blog-card-category">{featured.category}</span>
              <h2 className="blog-featured-title">{featured.title}</h2>
              <p className="blog-featured-excerpt">{featured.excerpt}</p>
              <div className="blog-card-meta">
                <span>
                  <Calendar size={14} aria-hidden="true" /> {featured.date}
                </span>
                <span>
                  <Clock size={14} aria-hidden="true" /> {featured.readTime}
                </span>
              </div>
              <span className="blog-featured-link">
                Read Article <ArrowRight size={16} aria-hidden="true" />
              </span>
            </div>
          </motion.a>
        </section>
      )}

      {/* ===== Filters ===== */}
      <section className="blog-filters">
        <div className="blog-filters-inner">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              className={
                "blog-filter-btn" +
                (activeCategory === cat ? " blog-filter-btn-active" : "")
              }
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* ===== Grid ===== */}
      <section className="blog-grid-section">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className="blog-grid"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={staggerContainer}
          >
            {filtered.map((post) => (
              <motion.a
                key={post.id}
                href={`/blog/${post.slug}`}
                className="blog-card"
                variants={fadeUp}
              >
                <div
                  className="blog-card-image"
                  style={{ backgroundImage: `url(${post.image})` }}
                />
                <div className="blog-card-body">
                  <span className="blog-card-category">{post.category}</span>
                  <h3 className="blog-card-title">{post.title}</h3>
                  <p className="blog-card-excerpt">{post.excerpt}</p>
                  <div className="blog-card-meta">
                    <span>
                      <Calendar size={13} aria-hidden="true" /> {post.date}
                    </span>
                    <span>
                      <Clock size={13} aria-hidden="true" /> {post.readTime}
                    </span>
                  </div>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <p className="blog-empty">No posts yet in this category.</p>
        )}
      </section>

      {/* ===== Newsletter ===== */}
      <section className="blog-newsletter">
        <motion.div
          className="blog-newsletter-inner"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="blog-newsletter-icon" aria-hidden="true">
            <Mail size={22} />
          </span>
          <h2>Never Miss a Post</h2>
          <p>Get new articles and studio updates straight to your inbox.</p>
          <form
            className="blog-newsletter-form"
            onSubmit={(e) => e.preventDefault()}
          >
            <input type="email" placeholder="you@example.com" required />
            <button type="submit">Subscribe</button>
          </form>
        </motion.div>
      </section>
    </div>
  );
}
