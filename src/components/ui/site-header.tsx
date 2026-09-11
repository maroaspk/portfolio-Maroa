import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { NavOverlay } from "./nav-overlay";
import { profile } from "@/lib/profile";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-[999] flex items-center justify-between px-6 md:px-10 py-6"
        style={{ pointerEvents: "none" }}
      >
        {/* Initials logo */}
        <Link
          to="/"
          className="text-lg font-medium uppercase tracking-[3px] hover:opacity-60 transition-opacity"
          style={{
            color: "var(--hero-dark)",
            fontFamily: "'Host Grotesk', sans-serif",
            pointerEvents: "auto",
          }}
        >
          {profile.initials}
        </Link>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(true)}
          className="hover:opacity-60 transition-opacity"
          style={{ color: "var(--hero-dark)", pointerEvents: "auto" }}
          aria-label="Open menu"
        >
          <Menu size={24} strokeWidth={1.5} />
        </button>
      </header>

      <NavOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
