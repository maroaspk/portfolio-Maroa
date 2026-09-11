import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { ContactOverlay } from "./contact-overlay";
import { profile } from "@/lib/profile";

interface NavOverlayProps {
  open: boolean;
  onClose: () => void;
}

type NavLink = { label: string; to: string; type: "link" | "contact" | "external" };

const NAV_LINKS: NavLink[] = [
  { label: "Home", to: "/", type: "link" },
  { label: "About", to: "/about", type: "link" },
  { label: "Projects", to: "/projects", type: "link" },
  { label: "Certificates", to: "/certificates", type: "link" },
  { label: "Contact", to: "/contact", type: "link" },
  { label: "LinkedIn", to: profile.contact.linkedin, type: "external" },
];

function NavPillLink({
  children,
  onClick,
  href,
  isExternal,
  to,
  type,
  onClose,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  isExternal?: boolean;
  to?: string;
  type: "link" | "contact" | "external";
  onClose: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  const pillStyle: React.CSSProperties = {
    color: hovered ? "var(--hero-dark)" : "var(--hero-light)",
    boxShadow: hovered
      ? "inset 0 0 0 60px var(--hero-light)"
      : "inset 0 0 0 2px var(--hero-light)",
    fontFamily: "'Host Grotesk', sans-serif",
    backgroundColor: "transparent",
    border: "none",
    textDecoration: "none",
    display: "inline-block",
    transition: "all 0.3s ease",
  };

  const className =
    "rounded-full uppercase tracking-[2px] text-[14px] md:text-[16px] px-[40px] py-[18px] md:px-[52px] md:py-[22px] leading-[120%] font-medium cursor-pointer";

  if (type === "external") {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClose}
        className={className}
        style={pillStyle}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {children}
      </a>
    );
  }

  if (type === "contact") {
    return (
      <button
        onClick={onClick}
        className={className}
        style={pillStyle}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {children}
      </button>
    );
  }

  return (
    <Link
      to={to || "/"}
      onClick={onClose}
      className={className}
      style={pillStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </Link>
  );
}

export function NavOverlay({ open, onClose }: NavOverlayProps) {
  const [contactOpen, setContactOpen] = useState(false);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

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

  const handleContactClick = () => {
    onClose();
    setTimeout(() => setContactOpen(true), 300);
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center"
            style={{ backgroundColor: "var(--hero-dark)" }}
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
          >
            <button
              ref={closeBtnRef}
              onClick={onClose}
              aria-label="Close menu"
              className="absolute top-8 right-8 text-sm uppercase tracking-[2px] hover:opacity-60 transition-opacity"
              style={{ color: "var(--hero-light)", fontFamily: "'Host Grotesk', sans-serif" }}
            >
              Close
            </button>

            <nav className="flex flex-col items-center gap-4 md:gap-6">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
                >
                  <NavPillLink
                    type={link.type}
                    to={link.to}
                    href={link.to}
                    isExternal={link.type === "external"}
                    onClick={link.type === "contact" ? handleContactClick : undefined}
                    onClose={onClose}
                  >
                    {link.label}
                  </NavPillLink>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <ContactOverlay open={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
}
