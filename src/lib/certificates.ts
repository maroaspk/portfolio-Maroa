import type { Localized } from "./i18n";

/**
 * Certificates shown on the Certificates page (newest first).
 *
 * To add one: append an entry. Only `title` and `issuer` are required.
 *   - `date`  → free text, e.g. { en: "December 2025", es: "Diciembre 2025" }
 *   - `image` → thumbnail: put the file in /public/certificates and reference "/certificates/file.jpg"
 *   - `url`   → link to the certificate or a PDF in /public. Defaults to the image itself when omitted.
 *   - `featured` + `description` → shown as a highlighted award block at the top of the page
 * Any text can be a plain string or `{ en, es }`.
 */

export interface Certificate {
  title: Localized;
  issuer: Localized;
  date?: Localized;
  image?: string;
  url?: string;
  featured?: boolean;
  description?: Localized;
}

export const certificates: Certificate[] = [
  {
    title: { en: "Klaviyo Product Certificate", es: "Certificado Klaviyo Product" },
    issuer: "Klaviyo Academy",
    date: { en: "March 2026", es: "Marzo 2026" },
    image: "/certificates/klaviyo.jpg",
  },
  {
    title: "Santander Open Academy: Business for All Program",
    issuer: "Harvard Business Impact · Santander University",
    date: { en: "December 2025", es: "Diciembre 2025" },
    image: "/certificates/harvard-business-impact.jpg",
  },
  {
    title: { en: "Google: Artificial Intelligence and Productivity", es: "Google: Inteligencia Artificial y productividad" },
    issuer: "Santander Open Academy · Google",
    date: { en: "January 2025", es: "Enero 2025" },
    image: "/certificates/google-ai.jpg",
  },
  {
    title: { en: "Leadership", es: "Liderazgo" },
    issuer: "Santander Open Academy",
    date: { en: "October 2024", es: "Octubre 2024" },
    image: "/certificates/leadership.jpg",
  },
  {
    title: { en: "Storytelling in Digital Marketing", es: "Storytelling en el Marketing Digital" },
    issuer: "Santander Open Academy · The University of Chicago",
    date: { en: "October 2024", es: "Octubre 2024" },
    image: "/certificates/storytelling-digital-marketing.jpg",
  },
  {
    title: "C1 Advanced",
    issuer: "Cambridge English",
  },
  {
    title: {
      en: "Award for the best branding proposal · Health Promotion Day",
      es: "Premio a la mejor propuesta de branding · Jornada de Promoción de la Salud",
    },
    issuer: {
      en: "Faculty of Communication Sciences · UIC Barcelona",
      es: "Facultad de Ciencias de la Comunicación · UIC Barcelona",
    },
    date: { en: "November 2025", es: "Noviembre 2025" },
    image: "/certificates/uic-health-promotion-day-award.jpg",
    featured: true,
    description: {
      en: "Selected by the teaching and professional jury for its excellence, creativity and strategic rigour, within the Brand Management and Strategy course. The branding will be used officially in future editions of the event.",
      es: "Seleccionado por el jurado docente y profesional por su excelencia, creatividad y rigor estratégico, en el marco de la asignatura Dirección y Estrategia de Marca. El branding se usará oficialmente en las próximas ediciones del evento.",
    },
  },
];

/** Link target for a certificate: explicit url, otherwise its image. */
export function getCertificateUrl(c: Certificate): string | undefined {
  return c.url ?? c.image;
}
