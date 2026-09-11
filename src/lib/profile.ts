/**
 * Single source of truth for everything "about Maroa".
 * Edit this file to update the hero, the About page, the Contact page and the footer.
 */

export interface ExperienceEntry {
  role: string;
  company: string;
  location?: string;
  /** e.g. "Aug 2025 — May 2026". Leave undefined to hide. */
  period?: string;
  description?: string;
}

export interface EducationEntry {
  title: string;
  institution?: string;
  period?: string;
  description?: string;
  /** Short bullet list shown under the description (e.g. honours). */
  highlights?: string[];
}

export interface SkillGroup {
  label: string;
  items: string[];
}

export interface LanguageEntry {
  name: string;
  level: string;
}

export interface SocialLink {
  label: string;
  href: string;
  /** Text shown for the link. Defaults to the href without protocol. */
  display?: string;
}

export const profile = {
  name: "Maroa González Rosdevall",
  /** Short initials shown in the fixed header. */
  initials: "M.G.R.",
  tagline: "Advertising · Public Relations · Communication",
  /** One short line under the tagline in the hero. Keep it brief. */
  heroLine: "Strategy, content and brands with intent.",

  /** Portrait for the About page (file in /public/media). Set to undefined to show a placeholder. */
  portrait: "/media/about.jpg",
  /** Downloadable CV (file in /public/media). Set to undefined to hide the links. */
  cv: "/media/CV-Maroa-Gonzalez-Rosdevall.pdf",
  location: "Viladecans, Barcelona",

  intro: [
    "Advertising and Public Relations graduate with a profile focused on communication, marketing, public relations, brand strategy, content and event organisation.",
    "Passionate about communication and art, I define myself as someone with a solid academic foundation, a proactive and detail-oriented attitude and a great ability to pick up new skills. Particularly drawn to creativity, strategy and brand building.",
  ],

  experience: [
    {
      role: "Event & Exam Staff",
      company: "British Council",
      period: "Jul 2026 — Present",
      description:
        "Organisation, protocol and running of corporate events and official Cambridge and IELTS examinations.",
    },
    {
      role: "Communication Strategist",
      company: "Enyo Iberia",
      location: "Warsaw · Barcelona",
      period: "Aug 2025 — May 2026",
      description:
        "Internship at a marketing start-up: client presentations, communication strategy, internal PR and content strategies for social media, among other responsibilities.",
    },
    {
      role: "Commercial Model",
      company: "Orngym",
      period: "Jun 2023 — Jul 2023",
      description: "Imagery for the sports brand's social media and website.",
    },
    {
      role: "Event Staff",
      company: "UIC Barcelona",
      period: "Sep 2022 — Present",
      description: "Support staff for the organisation and running of the university's events.",
    },
    {
      role: "English Language Teacher",
      company: "Private tutoring",
      period: "Sep 2020 — Present",
      description: "Preparation for official Cambridge examinations and university entrance exams.",
    },
  ] as ExperienceEntry[],

  education: [
    {
      title: "Bachelor's Degree in Advertising and Public Relations",
      institution: "Universitat Internacional de Catalunya · UIC Barcelona",
      period: "Sep 2022 — Jun 2026",
      description: "Academic Excellence Scholarship. Honours in:",
      highlights: [
        "Contemporary History",
        "Academic English",
        "Communication Theory",
        "Institutional Communication",
        "Psychology",
        "Digital Marketing",
        "Brand Management and Strategy",
        "Specialised Institutional Communication",
      ],
    },
    {
      title: "Baccalaureate, Social Sciences and Economics",
      institution: "Escola Concepcionistes de Barcelona",
      period: "2020 — 2022",
    },
    {
      title: "Dual Diploma (US High School Diploma)",
      institution: "Academica International Studies",
      period: "2018 — 2021",
    },
  ] as EducationEntry[],

  skills: [
    {
      label: "Communication",
      items: [
        "Copywriting",
        "Content strategy",
        "Social media",
        "Public relations",
        "Client presentations",
        "Event organisation",
      ],
    },
    {
      label: "Tools",
      items: [
        "Canva",
        "CapCut",
        "Splice",
        "Microsoft Office",
        "Google Drive",
        "Monday",
        "Trello",
        "Klaviyo",
        "HubSpot",
        "Zoho Campaigns",
      ],
    },
  ] as SkillGroup[],

  languages: [
    { name: "Spanish", level: "Native" },
    { name: "Catalan", level: "Native" },
    { name: "English", level: "C1 Advanced · Grade A" },
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
    { label: "Email", href: `mailto:${profile.contact.email}`, display: profile.contact.email },
    { label: "LinkedIn", href: profile.contact.linkedin, display: "See profile" },
    { label: "Phone", href: `tel:${profile.contact.phone.replace(/\s/g, "")}`, display: profile.contact.phone },
    ...profile.contact.socials,
  ];
}
