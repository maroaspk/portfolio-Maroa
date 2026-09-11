import type { Localized } from "./i18n";

/**
 * Single source of truth for everything "about Maroa".
 * Edit this file to update the hero, the About page, the Contact page and the footer.
 * Any text can be a plain string (same in both languages) or `{ en, es }`.
 */

export interface ExperienceEntry {
  role: Localized;
  company: Localized;
  location?: Localized;
  /** e.g. { en: "Aug 2025 — May 2026", es: "Ago 2025 — May 2026" }. Leave undefined to hide. */
  period?: Localized;
  description?: Localized;
}

export interface EducationEntry {
  title: Localized;
  institution?: Localized;
  period?: Localized;
  description?: Localized;
  /** Short bullet list shown under the description (e.g. honours). */
  highlights?: Localized[];
}

export interface SkillGroup {
  label: Localized;
  items: Localized[];
}

export interface LanguageEntry {
  name: Localized;
  level: Localized;
}

export interface SocialLink {
  label: Localized;
  href: string;
  /** Text shown for the link. Defaults to the href without protocol. */
  display?: Localized;
}

export const profile = {
  name: "Maroa González Rosdevall",
  /** Short initials shown in the fixed header. */
  initials: "M.G.R.",
  tagline: {
    en: "Advertising · Public Relations · Communication",
    es: "Publicidad · Relaciones Públicas · Comunicación",
  } as Localized,
  /** One short line under the tagline in the hero. Keep it brief. */
  heroLine: {
    en: "Strategy, content and brands with intent.",
    es: "Estrategia, contenido y marcas con criterio.",
  } as Localized,

  /** Portrait for the About page (file in /public/media). Set to undefined to show a placeholder. */
  portrait: "/media/about.jpg",
  /** Downloadable CV (file in /public/media). Set to undefined to hide the links. */
  cv: "/media/CV-Maroa-Gonzalez-Rosdevall.pdf",
  location: "Viladecans, Barcelona",

  intro: [
    {
      en: "Advertising and Public Relations graduate with a profile focused on communication, marketing, public relations, brand strategy, content and event organisation.",
      es: "Graduada en Publicidad y Relaciones Públicas, con un perfil orientado a la comunicación, el marketing, las relaciones públicas, la estrategia de marca, los contenidos y la organización de eventos.",
    },
    {
      en: "Passionate about communication and art, I define myself as someone with a solid academic foundation, a proactive and detail-oriented attitude and a great ability to pick up new skills. Particularly drawn to creativity, strategy and brand building.",
      es: "Apasionada de la comunicación y el arte, me defino como una persona con una buena base académica, una actitud proactiva y perfeccionista y una gran facilidad para adquirir nuevas habilidades. Con especial interés por la creatividad, la estrategia y la construcción de marcas.",
    },
  ] as Localized[],

  experience: [
    {
      role: "Event & Exam Staff",
      company: "British Council",
      period: { en: "Jul 2026 — Present", es: "Jul 2026 — Actualidad" },
      description: {
        en: "Organisation, protocol and running of corporate events and official Cambridge and IELTS examinations.",
        es: "Organización, protocolo y desarrollo de eventos corporativos y exámenes oficiales de Cambridge e IELTS.",
      },
    },
    {
      role: "Communication Strategist",
      company: "Enyo Iberia",
      location: { en: "Warsaw · Barcelona", es: "Varsovia · Barcelona" },
      period: { en: "Aug 2025 — May 2026", es: "Ago 2025 — May 2026" },
      description: {
        en: "Internship at a marketing start-up: client presentations, communication strategy, internal PR and content strategies for social media, among other responsibilities.",
        es: "Prácticas en una start-up de marketing: presentaciones a clientes, estrategia de comunicación, relaciones públicas internas y estrategias de contenido para redes sociales, entre otras responsabilidades.",
      },
    },
    {
      role: { en: "Commercial Model", es: "Modelo comercial" },
      company: "Orngym",
      period: { en: "Jun 2023 — Jul 2023", es: "Jun 2023 — Jul 2023" },
      description: {
        en: "Imagery for the sports brand's social media and website.",
        es: "Imagen para la marca deportiva en redes sociales y página web.",
      },
    },
    {
      role: { en: "Event Staff", es: "Azafata de eventos" },
      company: "UIC Barcelona",
      period: { en: "Sep 2022 — Present", es: "Sep 2022 — Actualidad" },
      description: {
        en: "Support staff for the organisation and running of the university's events.",
        es: "Staff de soporte en la organización y desarrollo de los eventos de la universidad.",
      },
    },
    {
      role: { en: "English Language Teacher", es: "Profesora de inglés" },
      company: { en: "Private tutoring", es: "Clases particulares" },
      period: { en: "Sep 2020 — Present", es: "Sep 2020 — Actualidad" },
      description: {
        en: "Preparation for official Cambridge examinations and university entrance exams.",
        es: "Preparación de exámenes oficiales de Cambridge y selectividad.",
      },
    },
  ] as ExperienceEntry[],

  education: [
    {
      title: { en: "Bachelor's Degree in Advertising and Public Relations", es: "Grado en Publicidad y Relaciones Públicas" },
      institution: "Universitat Internacional de Catalunya · UIC Barcelona",
      period: { en: "Sep 2022 — Jun 2026", es: "Sep 2022 — Jun 2026" },
      description: { en: "Academic Excellence Scholarship. Honours in:", es: "Beca por Excelencia Académica. Matrículas de honor en:" },
      highlights: [
        { en: "Contemporary History", es: "Historia Contemporánea" },
        { en: "Academic English", es: "Inglés Académico" },
        { en: "Communication Theory", es: "Teoría de la Comunicación" },
        { en: "Institutional Communication", es: "Comunicación Institucional" },
        { en: "Psychology", es: "Psicología" },
        { en: "Digital Marketing", es: "Marketing Digital" },
        { en: "Brand Management and Strategy", es: "Gestión y Estrategia de Marca" },
        { en: "Specialised Institutional Communication", es: "Comunicación Institucional Especializada" },
      ],
    },
    {
      title: { en: "Baccalaureate, Social Sciences and Economics", es: "Bachillerato socioeconómico" },
      institution: "Escola Concepcionistes de Barcelona",
      period: "2020 — 2022",
    },
    {
      title: { en: "Dual Diploma (US High School Diploma)", es: "Dual Diploma (bachillerato estadounidense)" },
      institution: "Academica International Studies",
      period: "2018 — 2021",
    },
  ] as EducationEntry[],

  skills: [
    {
      label: { en: "Communication", es: "Comunicación" },
      items: [
        "Copywriting",
        { en: "Content strategy", es: "Estrategia de contenidos" },
        { en: "Social media", es: "Redes sociales" },
        { en: "Public relations", es: "Relaciones públicas" },
        { en: "Client presentations", es: "Presentaciones a cliente" },
        { en: "Event organisation", es: "Organización de eventos" },
      ],
    },
    {
      label: { en: "Tools", es: "Herramientas" },
      items: ["Canva", "CapCut", "Splice", "Microsoft Office", "Google Drive", "Monday", "Trello", "Klaviyo", "HubSpot", "Zoho Campaigns"],
    },
  ] as SkillGroup[],

  languages: [
    { name: { en: "Spanish", es: "Castellano" }, level: { en: "Native", es: "Nativo" } },
    { name: { en: "Catalan", es: "Catalán" }, level: { en: "Native", es: "Nativo" } },
    { name: { en: "English", es: "Inglés" }, level: "C1 Advanced · Grade A" },
  ] as LanguageEntry[],

  contact: {
    email: "maroaspk@gmail.com",
    phone: "+34 634 53 24 68",
    linkedin: "https://www.linkedin.com/in/maroa-gonzález-rosdevall/",
    /** Extra professional networks. Add entries here and they appear on Contact + footer. */
    socials: [] as SocialLink[],
  },
};

/** All contact links in display order (email first, then LinkedIn, phone, then extras). */
export function getContactLinks(): SocialLink[] {
  return [
    { label: { en: "Email", es: "Email" }, href: `mailto:${profile.contact.email}`, display: profile.contact.email },
    { label: "LinkedIn", href: profile.contact.linkedin, display: { en: "See profile", es: "Ver perfil" } },
    { label: { en: "Phone", es: "Teléfono" }, href: `tel:${profile.contact.phone.replace(/\s/g, "")}`, display: profile.contact.phone },
    ...profile.contact.socials,
  ];
}
