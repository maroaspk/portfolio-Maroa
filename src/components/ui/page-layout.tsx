import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";

/**
 * Shared shell for inner pages (About, Projects, Certificates, Contact).
 * Reproduces the wrapper the template used on About: same padding, max width,
 * colours and the soft page fade-in of the detail page.
 */
export function PageLayout({
  children,
  wide = false,
  footer = true,
}: {
  children: ReactNode;
  /** Use the wider grid container (matches the home photo grid) instead of max-w-5xl. */
  wide?: boolean;
  footer?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col"
      style={{
        backgroundColor: "var(--hero-light)",
        fontFamily: "'Host Grotesk', sans-serif",
        color: "var(--hero-paragraphs)",
      }}
    >
      <SiteHeader />
      <main
        className={`flex-1 w-full mx-auto px-6 md:px-12 lg:px-20 pt-32 pb-8 ${wide ? "max-w-[1365px]" : "max-w-5xl"}`}
      >
        {children}
      </main>
      {footer && <SiteFooter />}
    </motion.div>
  );
}
