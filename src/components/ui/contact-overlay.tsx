import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useId, useRef } from "react";
import { ContactLinks } from "./contact-links";

interface ContactOverlayProps {
  open: boolean;
  onClose: () => void;
}

/**
 * Full-screen "Let's connect" overlay opened from the hero CTA.
 * Same shell as the template overlay; the form was replaced by direct contact links.
 */
export function ContactOverlay({ open, onClose }: ContactOverlayProps) {
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const uid = useId();

  useEffect(() => {
    if (!open) return;
    previousFocus.current = document.activeElement as HTMLElement | null;
    closeBtnRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      previousFocus.current?.focus?.();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[9998] flex items-center justify-center"
          style={{ backgroundColor: "var(--hero-light)" }}
          role="dialog"
          aria-modal="true"
          aria-labelledby={`${uid}-title`}
        >
          <button
            ref={closeBtnRef}
            onClick={onClose}
            aria-label="Close contact"
            className="absolute top-8 right-8 hover:opacity-60 transition-opacity"
            style={{ color: "var(--hero-dark)" }}
          >
            <X size={28} strokeWidth={1.5} />
          </button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="w-full max-w-md px-8"
            style={{ fontFamily: "'Host Grotesk', sans-serif" }}
          >
            <p className="text-xs uppercase tracking-[3px] mb-6" style={{ color: "var(--hero-paragraphs)", opacity: 0.6 }}>
              Contact
            </p>
            <h2
              id={`${uid}-title`}
              className="text-3xl md:text-4xl mb-10"
              style={{ fontFamily: "'Host Grotesk', sans-serif", color: "var(--hero-dark)", lineHeight: 1.15 }}
            >
              Let's connect
            </h2>

            <ContactLinks />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
