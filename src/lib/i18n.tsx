/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

/**
 * Minimal bilingual support (English / Spanish).
 *
 * - Content fields in src/lib/*.ts can be a plain string (same in both languages)
 *   or `{ en, es }`. Render with `L(value)` from `useI18n()`.
 * - Interface strings live in the UI dictionary below and are read with `t("key")`.
 * - The choice is remembered in localStorage; the first visit follows the browser language.
 */

export type Lang = "en" | "es";
export type Localized = string | { en: string; es: string };

const STORAGE_KEY = "portfolio-lang";

const UI = {
  // Navigation
  "nav.home": { en: "Home", es: "Inicio" },
  "nav.about": { en: "About", es: "Sobre mí" },
  "nav.projects": { en: "Projects", es: "Proyectos" },
  "nav.certificates": { en: "Certificates", es: "Certificados" },
  "nav.contact": { en: "Contact", es: "Contacto" },
  "nav.close": { en: "Close", es: "Cerrar" },
  "nav.open": { en: "Open menu", es: "Abrir menú" },
  "nav.language": { en: "Language", es: "Idioma" },

  // Hero
  "hero.cta": { en: "Let's connect", es: "Hablemos" },
  "hero.scroll": { en: "Scroll", es: "Desliza" },

  // Home
  "home.eyebrow": { en: "Portfolio", es: "Portfolio" },
  "home.title": { en: "Selected projects", es: "Proyectos seleccionados" },
  "home.viewAll": { en: "View all projects", es: "Ver todos los proyectos" },

  // About
  "about.eyebrow": { en: "About", es: "Sobre mí" },
  "about.forCollab": { en: "For collaborations and proposals:", es: "Para colaboraciones y propuestas:" },
  "about.downloadCv": { en: "Download CV", es: "Descargar CV" },
  "about.experience": { en: "Experience", es: "Experiencia" },
  "about.education": { en: "Education", es: "Formación" },
  "about.skills": { en: "Skills", es: "Habilidades" },
  "about.languages": { en: "Languages", es: "Idiomas" },
  "about.viewProjects": { en: "View projects", es: "Ver proyectos" },
  "about.viewCertificates": { en: "View certificates", es: "Ver certificados" },
  "about.portrait": { en: "Portrait", es: "Retrato" },

  // Projects
  "projects.eyebrow": { en: "Projects", es: "Proyectos" },
  "projects.title": { en: "Projects", es: "Proyectos" },
  "projects.intro": {
    en: "A selection of work in branding, advertising, content and social media, developed during my degree in Advertising and Public Relations. This section keeps growing.",
    es: "Una selección de trabajos de branding, publicidad, contenidos y redes sociales realizados durante el grado en Publicidad y Relaciones Públicas. Esta sección sigue creciendo.",
  },
  "project.awarded": { en: "Awarded", es: "Premiado" },
  "project.viewCertificate": { en: "View certificate", es: "Ver certificado" },
  "project.selectBrand": { en: "Select a brand", es: "Elige una marca" },
  "project.viewAnalogy": { en: "View the analogy", es: "Ver la analogía" },
  "project.role": { en: "Role", es: "Rol" },
  "project.context": { en: "Context", es: "Contexto" },
  "project.date": { en: "Date", es: "Fecha" },
  "project.tools": { en: "Tools", es: "Herramientas" },
  "project.listen": { en: "Listen", es: "Escuchar" },
  "project.videos": { en: "Videos", es: "Vídeos" },
  "project.audio": { en: "Audio", es: "Audio" },
  "project.image": { en: "Project image", es: "Imagen del proyecto" },
  "project.interested": { en: "Interested in this project?", es: "¿Te interesa este proyecto?" },
  "project.getInTouch": { en: "Get in touch", es: "Escríbeme" },
  "project.previous": { en: "Previous", es: "Anterior" },
  "project.next": { en: "Next", es: "Siguiente" },
  "project.all": { en: "All projects", es: "Todos los proyectos" },
  "project.readFull": { en: "Read the full project", es: "Leer el proyecto completo" },
  "project.notFound": { en: "Project not found", es: "Proyecto no encontrado" },
  "project.back": { en: "Back to projects", es: "Volver a proyectos" },
  "project.audioUnsupported": { en: "Your browser does not support the audio element.", es: "Tu navegador no admite el elemento de audio." },
  "project.watchOnTikTok": { en: "Watch on TikTok", es: "Ver en TikTok" },

  // Reader
  "reader.back": { en: "Back to the project", es: "Volver al proyecto" },
  "reader.page": { en: "Page", es: "Página" },
  "reader.note": {
    en: "Read-only view. This document is shared for consultation and may not be reproduced.",
    es: "Vista de solo lectura. Este documento se comparte para consulta y no puede reproducirse.",
  },
  "reader.rights": { en: "All rights reserved", es: "Todos los derechos reservados" },
  "reader.notFound": { en: "Document not found", es: "Documento no encontrado" },

  // Certificates
  "certs.eyebrow": { en: "Certificates", es: "Certificados" },
  "certs.title": { en: "Certificates", es: "Certificados" },
  "certs.intro": { en: "Complementary training and credentials. This section keeps growing.", es: "Formación complementaria y acreditaciones. Esta sección sigue creciendo." },
  "certs.award": { en: "Award", es: "Premio" },
  "certs.view": { en: "View", es: "Ver" },
  "certs.viewCertificate": { en: "View certificate", es: "Ver certificado" },
  "certs.comingSoon": { en: "Coming soon.", es: "Próximamente." },

  // Contact
  "contact.eyebrow": { en: "Contact", es: "Contacto" },
  "contact.title": { en: "Let's talk", es: "Hablemos" },
  "contact.intro": {
    en: "Open to collaborations in communication, public relations, brand strategy, content and events. Drop me a line and I'll get back to you.",
    es: "Abierta a colaboraciones en comunicación, relaciones públicas, estrategia de marca, contenidos y eventos. Escríbeme y te respondo.",
  },
  "contact.email": { en: "Email", es: "Email" },
  "contact.linkedin": { en: "LinkedIn", es: "LinkedIn" },
  "contact.phone": { en: "Phone", es: "Teléfono" },
  "contact.seeProfile": { en: "See profile", es: "Ver perfil" },
  "contact.close": { en: "Close contact", es: "Cerrar contacto" },

  // Misc
  "placeholder.comingSoon": { en: "Coming soon", es: "Próximamente" },
  "notFound.title": { en: "Page not found", es: "Página no encontrada" },
  "notFound.text": { en: "The page you're looking for doesn't exist.", es: "La página que buscas no existe." },
  "notFound.home": { en: "Return home", es: "Volver al inicio" },
  "meta.title": {
    en: "Maroa González Rosdevall — Advertising, Public Relations & Communication",
    es: "Maroa González Rosdevall — Publicidad, Relaciones Públicas y Comunicación",
  },
} as const;

export type UIKey = keyof typeof UI;

function detectLang(): Lang {
  if (typeof window === "undefined") return "en";
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "en" || saved === "es") return saved;
  } catch {
    /* storage unavailable */
  }
  return navigator.language?.toLowerCase().startsWith("es") ? "es" : "en";
}

interface I18nValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: UIKey) => string;
  L: (value: Localized | undefined) => string | undefined;
}

const I18nContext = createContext<I18nValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detectLang);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = UI["meta.title"][lang];
  }, [lang]);

  const value = useMemo<I18nValue>(
    () => ({
      lang,
      setLang,
      t: (key) => UI[key][lang],
      L: (v) => (v === undefined ? undefined : typeof v === "string" ? v : v[lang]),
    }),
    [lang, setLang],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside LanguageProvider");
  return ctx;
}

/** Language switch: "EN / ES" in the template's small uppercase style. */
export function LangToggle({ light = false }: { light?: boolean }) {
  const { lang, setLang, t } = useI18n();
  const color = light ? "var(--hero-light)" : "var(--hero-dark)";
  return (
    <div
      role="group"
      aria-label={t("nav.language")}
      className="flex items-center gap-2 text-[12px] uppercase tracking-[2px] font-medium"
      style={{ fontFamily: "'Host Grotesk', sans-serif", color, pointerEvents: "auto" }}
    >
      {(["en", "es"] as Lang[]).map((code, i) => (
        <span key={code} className="flex items-center gap-2">
          {i > 0 && <span aria-hidden="true" style={{ opacity: 0.35 }}>/</span>}
          <button
            type="button"
            onClick={() => setLang(code)}
            aria-pressed={lang === code}
            className="transition-opacity hover:opacity-100"
            style={{ opacity: lang === code ? 1 : 0.45, color, letterSpacing: "2px" }}
          >
            {code.toUpperCase()}
          </button>
        </span>
      ))}
    </div>
  );
}
