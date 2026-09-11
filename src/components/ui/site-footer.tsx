import { Link } from "react-router-dom";
import { profile, getContactLinks } from "@/lib/profile";

const FOOTER_NAV = [
  { label: "About", to: "/about" },
  { label: "Projects", to: "/projects" },
  { label: "Certificates", to: "/certificates" },
  { label: "Contact", to: "/contact" },
];

export function SiteFooter() {
  const links = getContactLinks();
  return (
    <footer
      className="px-6 md:px-10 pt-10 pb-8 mt-16 md:mt-24"
      style={{ fontFamily: "'Host Grotesk', sans-serif", color: "var(--hero-paragraphs)" }}
    >
      <div style={{ height: 1, backgroundColor: "var(--hero-border)" }} />
      <div className="pt-8 flex flex-col md:flex-row md:items-center justify-between gap-6 text-sm">
        <p style={{ color: "var(--hero-dark)" }}>{profile.name}</p>

        <nav className="flex flex-wrap gap-x-6 gap-y-2">
          {FOOTER_NAV.map((l) => (
            <Link key={l.to} to={l.to} className="hover:opacity-60 transition-opacity" style={{ color: "var(--hero-dark)" }}>
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.href.startsWith("http") ? "_blank" : undefined}
              rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="underline hover:opacity-70 transition-opacity"
              style={{ color: "var(--hero-dark)" }}
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
      <p className="mt-8 text-xs uppercase tracking-[3px]" style={{ opacity: 0.5 }}>
        © {new Date().getFullYear()} {profile.name}
      </p>
    </footer>
  );
}
