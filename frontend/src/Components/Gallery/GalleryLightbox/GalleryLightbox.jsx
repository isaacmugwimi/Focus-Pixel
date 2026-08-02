import { useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import "./GalleryLightbox.css";
import { GALLERY_ITEMS } from "../GalleryData";

export default function GalleryLightbox({ item }) {
  const navigate = useNavigate();
  const overlayRef = useRef(null);
  const modalRef = useRef(null);
  const previouslyFocused = useRef(null);

  const index = GALLERY_ITEMS.findIndex((i) => i.slug === item.slug);
  const total = GALLERY_ITEMS.length;

  const goTo = useCallback(
    (nextIndex) => {
      const wrapped = GALLERY_ITEMS[(nextIndex + total) % total];
      navigate(`/gallery/${wrapped.slug}`, { replace: true });
    },
    [navigate, total],
  );

  const closeModal = useCallback(() => navigate("/gallery"), [navigate]);

  // lock scroll, trap focus, escape + arrow-key navigation
  useEffect(() => {
    previouslyFocused.current = document.activeElement;
    modalRef.current?.focus();

    function handleKeyDown(e) {
      if (e.key === "Escape") return closeModal();
      if (e.key === "ArrowRight") return goTo(index + 1);
      if (e.key === "ArrowLeft") return goTo(index - 1);

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
      document.removeEventListener("keydown", handleKeyDown);
      previouslyFocused.current?.focus?.();
    };
  }, [closeModal, goTo, index]);

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) closeModal();
  };

  return (
    <div
      className="lightbox-overlay"
      ref={overlayRef}
      onClick={handleOverlayClick}
    >
      <div
        className="lightbox-modal"
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-label={`${item.title} — ${item.category} photography`}
        tabIndex={-1}
      >
        <button
          type="button"
          className="lightbox-close"
          onClick={closeModal}
          aria-label="Close image"
        >
          <X size={20} />
        </button>

        <button
          type="button"
          className="lightbox-arrow lightbox-arrow-prev"
          onClick={() => goTo(index - 1)}
          aria-label="Previous image"
        >
          <ChevronLeft size={26} />
        </button>

        <div className="lightbox-image-wrap">
          <img
            src={item.src}
            alt={`${item.title} — ${item.category} photography`}
          />
        </div>

        <button
          type="button"
          className="lightbox-arrow lightbox-arrow-next"
          onClick={() => goTo(index + 1)}
          aria-label="Next image"
        >
          <ChevronRight size={26} />
        </button>

        <div className="lightbox-caption">
          <span className="lightbox-category">{item.category}</span>
          <span className="lightbox-title">{item.title}</span>
          <span className="lightbox-count">
            {index + 1} / {total}
          </span>
        </div>
      </div>
    </div>
  );
}
