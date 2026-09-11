/**
 * Certificates shown on the Certificates page (newest first).
 *
 * To add one: append an entry. Only `title` and `issuer` are required.
 *   - `date`  → free text, e.g. "December 2025"
 *   - `image` → thumbnail: put the file in /public/certificates and reference "/certificates/file.jpg"
 *   - `url`   → link to the certificate or a PDF in /public. Defaults to the image itself when omitted.
 */

export interface Certificate {
  title: string;
  issuer: string;
  date?: string;
  image?: string;
  url?: string;
}

export const certificates: Certificate[] = [
  {
    title: "Klaviyo Product Certificate",
    issuer: "Klaviyo Academy",
    date: "March 2026",
    image: "/certificates/klaviyo.jpg",
  },
  {
    title: "Santander Open Academy: Business for All Program",
    issuer: "Harvard Business Impact · Santander University",
    date: "December 2025",
    image: "/certificates/harvard-business-impact.jpg",
  },
  {
    title: "Google: Artificial Intelligence and Productivity",
    issuer: "Santander Open Academy · Google",
    date: "January 2025",
    image: "/certificates/google-ai.jpg",
  },
  {
    title: "Leadership",
    issuer: "Santander Open Academy",
    date: "October 2024",
    image: "/certificates/leadership.jpg",
  },
  {
    title: "Storytelling in Digital Marketing",
    issuer: "Santander Open Academy · The University of Chicago",
    date: "October 2024",
    image: "/certificates/storytelling-digital-marketing.jpg",
  },
  {
    title: "C1 Advanced",
    issuer: "Cambridge English",
  },
  {
    title: "Award for the best branding proposal · Health Promotion Day",
    issuer: "Faculty of Communication Sciences · UIC Barcelona",
    date: "November 2025",
    image: "/certificates/uic-health-promotion-day-award.jpg",
  },
];

/** Link target for a certificate: explicit url, otherwise its image. */
export function getCertificateUrl(c: Certificate): string | undefined {
  return c.url ?? c.image;
}
