// Swap these for real cover images — see src/assets/blog/

import { useState, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Calendar, Clock, ArrowRight, Mail } from "lucide-react";
import { POSTS } from "./BlogData";
// import BlogPostModal from "./BlogPostModal";
import "./Blog.css";
import BlogPostModal from "./BlogPostModal/BlogPostModal";

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
  const { slug } = useParams();
  const navigate = useNavigate();

  const activePost = slug ? POSTS.find((p) => p.slug === slug) : null;

  // if someone lands on /blog/some-slug-that-doesnt-exist, bounce back
  // to the listing instead of showing a blank modal
  if (slug && !activePost) {
    navigate("/blog", { replace: true });
  }

  const featured = POSTS.find((p) => p.featured);

  const filtered = useMemo(() => {
    const rest = POSTS.filter((p) => !p.featured);
    return activeCategory === "All"
      ? rest
      : rest.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="blog-page">
      {/* Default listing-page SEO — overridden by BlogPostModal's own
          Helmet when a post is open, since Helmet merges by rendering
          order (the later one, i.e. the modal, wins for duplicate tags) */}
      <Helmet>
        <title>Blog | Focus Pixel Photography</title>
        <meta
          name="description"
          content="Photography tips, behind-the-scenes stories, and studio updates from the Focus Pixel team."
        />
      </Helmet>

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
            <Link to="/">Home</Link>
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
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link to={`/blog/${featured.slug}`} className="blog-featured-card">
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
            </Link>
          </motion.div>
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
              <motion.div key={post.id} variants={fadeUp}>
                <Link to={`/blog/${post.slug}`} className="blog-card">
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
                </Link>
              </motion.div>
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

      {/* ===== Post modal, rendered on top when /blog/:slug matches ===== */}
      <AnimatePresence>
        {activePost && (
          <BlogPostModal post={activePost} key={activePost.slug} />
        )}
      </AnimatePresence>
    </div>
  );
}
