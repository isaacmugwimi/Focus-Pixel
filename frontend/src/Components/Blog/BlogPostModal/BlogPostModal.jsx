import { useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { X, Calendar, Clock, User } from "lucide-react";
import "./BlogPostModal.css";

const SITE_URL = "https://focuspixel.com"; // update to your real deployed domain

export default function BlogPostModal({ post }) {
  const navigate = useNavigate();
  const overlayRef = useRef(null);
  const modalRef = useRef(null);
  const previouslyFocused = useRef(null);

  const closeModal = useCallback(() => {
    navigate("/blog");
  }, [navigate]);

  // lock scroll + focus trap + escape, same pattern as VideoModal
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    previouslyFocused.current = document.activeElement;
    modalRef.current?.focus();

    function handleKeyDown(e) {
      if (e.key === "Escape") {
        closeModal();
        return;
      }
      if (e.key !== "Tab" || !modalRef.current) return;

      const focusable = modalRef.current.querySelectorAll(
        'button, [href], [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = original;
      document.removeEventListener("keydown", handleKeyDown);
      previouslyFocused.current?.focus?.();
    };
  }, [closeModal]);

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) closeModal();
  };

  if (!post) return null;

  const canonicalUrl = `${SITE_URL}/blog/${post.slug}`;

  return (
    <>
      {/* Per-post SEO meta. Note: since this is a client-rendered SPA,
          crawlers/bots that don't execute JS (many social-share bots
          included) won't see these tags — for guaranteed social preview
          cards and full search-engine crawlability, this route should
          eventually be prerendered or server-rendered. Googlebot itself
          does execute JS and will generally pick these up. */}
      <Helmet>
        <title>{post.title} | Focus Pixel Blog</title>
        <meta name="description" content={post.metaDescription} />
        <link rel="canonical" href={canonicalUrl} />

        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.metaDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={post.image} />
        <meta property="article:author" content={post.author} />
        <meta property="article:section" content={post.category} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.metaDescription} />
        <meta name="twitter:image" content={post.image} />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.metaDescription,
            image: post.image,
            author: { "@type": "Person", name: post.author },
            publisher: { "@type": "Organization", name: "Focus Pixel" },
            datePublished: post.date,
            mainEntityOfPage: canonicalUrl,
          })}
        </script>
      </Helmet>

      <div
        className="blog-modal-overlay"
        ref={overlayRef}
        onClick={handleOverlayClick}
      >
        <article
          className="blog-modal"
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="blog-modal-title"
          tabIndex={-1}
        >
          <button
            type="button"
            className="blog-modal-close"
            onClick={closeModal}
            aria-label="Close article"
          >
            <X size={20} />
          </button>

          <div
            className="blog-modal-cover"
            style={{ backgroundImage: `url(${post.image})` }}
          >
            <span className="blog-modal-category">{post.category}</span>
          </div>

          <div className="blog-modal-body">
            <h1 id="blog-modal-title" className="blog-modal-title">
              {post.title}
            </h1>

            <div className="blog-modal-meta">
              <span>
                <User size={14} aria-hidden="true" /> {post.author}
              </span>
              <span>
                <Calendar size={14} aria-hidden="true" /> {post.date}
              </span>
              <span>
                <Clock size={14} aria-hidden="true" /> {post.readTime}
              </span>
            </div>

            <div className="blog-modal-content">
              {post.content.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>
        </article>
      </div>
    </>
  );
}
