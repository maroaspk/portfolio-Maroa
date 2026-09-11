import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { NavOverlay } from "./nav-overlay";
import { profile } from "@/lib/profile";
import { LangToggle, useI18n } from "@/lib/i18n";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useI18n();

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

        <div className="flex items-center gap-6 md:gap-8">
          <LangToggle />

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(true)}
            className="hover:opacity-60 transition-opacity"
            style={{ color: "var(--hero-dark)", pointerEvents: "auto" }}
            aria-label={t("nav.open")}
          >
            <Menu size={24} strokeWidth={1.5} />
          </button>
        </div>
      </header>

      <NavOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
