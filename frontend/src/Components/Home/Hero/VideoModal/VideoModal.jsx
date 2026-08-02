
import { useEffect, useRef, useState, useCallback } from "react";
import { X, Loader2, ArrowRight } from "lucide-react";
import "./VideoModal.css";

const SHOWREEL_SRC = "../../../../assets/Videos/videoReeel.mp4";

const CATEGORIES = [
  "Wedding",
  "Portraits",
  "Graduation",
  "Corporate",
  "Events",
  "Commercial",
];

const INTRO_DURATION_MS = 1500;

export default function VideoModal({ isOpen, onClose }) {
  const [showIntro, setShowIntro] = useState(true);
  const [videoReady, setVideoReady] = useState(false);
  const overlayRef = useRef(null);
  const modalRef = useRef(null);
  const videoRef = useRef(null);
  const previouslyFocused = useRef(null);

  // reset intro/loading state each time the modal opens fresh
  useEffect(() => {
    if (isOpen) {
      setShowIntro(true);
      setVideoReady(false);
      const timer = setTimeout(() => setShowIntro(false), INTRO_DURATION_MS);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // lock page scroll while open
  useEffect(() => {
    if (!isOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [isOpen]);

  // remember what had focus before opening, restore it on close
  useEffect(() => {
    if (isOpen) {
      previouslyFocused.current = document.activeElement;
      modalRef.current?.focus();
    } else {
      previouslyFocused.current?.focus?.();
    }
  }, [isOpen]);

  // pause playback and reset "ready" state once fully closed
  useEffect(() => {
    if (!isOpen && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [isOpen]);

  const handleClose = useCallback(() => {
    onClose?.();
  }, [onClose]);

  // Escape to close + focus trap (Tab cycles only within the modal)
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(e) {
      if (e.key === "Escape") {
        handleClose();
        return;
      }

      if (e.key !== "Tab" || !modalRef.current) return;

      const focusable = modalRef.current.querySelectorAll(
        'button, [href], video, [tabindex]:not([tabindex="-1"])'
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
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleClose]);

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) handleClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="video-modal-overlay"
      ref={overlayRef}
      onClick={handleOverlayClick}
    >
      <div
        className="video-modal"
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-label="Focus Pixel showreel"
        tabIndex={-1}
      >
        <button
          type="button"
          className="video-modal-close"
          onClick={handleClose}
          aria-label="Close showreel"
        >
          <X size={20} />
        </button>

        {showIntro ? (
          <div className="video-modal-intro">
            <span className="video-modal-intro-mark" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 2 L15 9 L22 12 L15 15 L12 22 L9 15 L2 12 L9 9 Z"
                  fill="currentColor"
                />
              </svg>
            </span>
            <h2 className="video-modal-intro-title">
              FOCUS <span>PIXEL</span>
            </h2>
            <p className="video-modal-intro-tagline">
              Capturing Moments. Creating Memories.
            </p>
          </div>
        ) : (
          <div className="video-modal-body">
            <div className="video-modal-player">
              {!videoReady && (
                <div className="video-modal-loader" aria-hidden="true">
                  <Loader2 size={34} className="video-modal-spinner" />
                </div>
              )}

              <video
                ref={videoRef}
                src={SHOWREEL_SRC}
                autoPlay
                muted
                controls
                loop={false}
                playsInline
                onCanPlay={() => setVideoReady(true)}
                className={
                  "video-modal-video" + (videoReady ? " video-modal-video-ready" : "")
                }
              />
            </div>

            <div className="video-modal-info">
              <h3 className="video-modal-heading">Focus Pixel Showreel</h3>
              <p className="video-modal-desc">
                Capturing stories through timeless photography and cinematic
                visuals.
              </p>

              <div className="video-modal-tags">
                {CATEGORIES.map((tag) => (
                  <span key={tag} className="video-modal-tag">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="video-modal-actions">
                <a href="/contact" className="video-modal-btn-primary">
                  Book Your Session
                  <ArrowRight size={16} aria-hidden="true" />
                </a>
                <a href="/gallery" className="video-modal-btn-secondary">
                  View Portfolio
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}