import { motion } from "framer-motion";
import { profile, getContactLinks } from "@/lib/profile";
import { EASE } from "./editorial";

/**
 * The contact block: email as the protagonist, then LinkedIn and any extra networks.
 * Used by the Contact page and by the "Let's connect" overlay so both stay in sync.
 */
export function ContactLinks({ animate = true }: { animate?: boolean }) {
  const links = getContactLinks();
  const extras = links.slice(1);

  return (
    <div style={{ fontFamily: "'Host Grotesk', sans-serif" }}>
      <motion.a
        href={`mailto:${profile.contact.email}`}
        className="inline-block text-2xl md:text-4xl break-all hover:opacity-70 transition-opacity"
        style={{ color: "var(--hero-dark)", lineHeight: 1.2 }}
        initial={animate ? { opacity: 0, y: 20 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
      >
        {profile.contact.email}
      </motion.a>

      <motion.ul
        className="mt-10 flex flex-col"
        initial={animate ? { opacity: 0, y: 20 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.25, ease: EASE }}
      >
        {extras.map((l) => (
          <li
            key={l.label}
            className="flex items-baseline justify-between py-4 text-sm"
            style={{ borderTop: "1px solid var(--hero-border)" }}
          >
            <span className="text-xs uppercase tracking-[3px]" style={{ opacity: 0.6 }}>
              {l.label}
            </span>
            <a
              href={l.href}
              target={l.href.startsWith("http") ? "_blank" : undefined}
              rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="underline hover:opacity-70 transition-opacity"
              style={{ color: "var(--hero-dark)" }}
            >
              {l.display ?? l.href.replace(/^https?:\/\/(www\.)?/, "")}
            </a>
          </li>
        ))}
      </motion.ul>
    </div>
  );
}
