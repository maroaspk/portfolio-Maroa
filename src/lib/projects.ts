/**
 * Projects shown on the home grid, the Projects page and the project detail pages.
 *
 * To add a project: append an entry to `projects`. Only `slug`, `title` and `category`
 * are required. Everything else is optional and the UI adapts:
 *   - no `image`   → an elegant neutral placeholder is rendered (with `logo` centred on it when given)
 *   - `year`       → shown in the grid caption; `period` (e.g. "Oct – Nov 2025") on the detail page
 *   - `gallery`    → extra images on the detail page, each with an optional title + caption
 *   - `brandIndex` → shows the gallery titles (or their `logo`) as a clickable index; a click swaps the main
 *                    image to that item and scrolls to its explanation
 *   - `audio`      → an audio player on the detail page (e.g. a radio ad)
 *   - `award`      → short label (e.g. "Winning proposal · UIC Barcelona") highlighted in the grid and detail
 *   - `awardCertificate` → link to the award document (e.g. a file in /public/certificates)
 *   - `accent`     → one hex colour taken from the project's identity; the detail page tints its background
 *                    with it and uses it for labels, rules and link underlines (see src/lib/color.ts)
 *   - `featured`   → appears on the home page grid
 *   - `placeholder: true` → shown as a discreet "coming soon" tile with no detail page
 *
 * Put images in /public/projects and reference them as "/projects/file.jpg".
 */

export interface GalleryItem {
  src: string;
  title?: string;
  caption?: string;
  /** Anchor id used by the brand index (defaults to a slug of the title). */
  id?: string;
  /** Brand logo (file in /public/projects/logos). Without it the brand name is shown as a wordmark. */
  logo?: string;
}

export interface Project {
  slug: string;
  title: string;
  category: string;
  year?: string;
  period?: string;
  /** Institution, client or context, e.g. "UIC Barcelona". */
  context?: string;
  description?: string | string[];
  /** Maroa's role in the project. */
  role?: string;
  tools?: string[];
  image?: string;
  /** Brand mark shown on the placeholder when the project has no `image` (file in /public/projects/logos). */
  logo?: string;
  /** Intrinsic size of the main image, used for the grid aspect ratio. Defaults to 4:5. */
  w?: number;
  h?: number;
  gallery?: GalleryItem[];
  audio?: string;
  award?: string;
  awardCertificate?: string;
  brandIndex?: boolean;
  accent?: string;
  featured?: boolean;
  placeholder?: boolean;
}

export const projects: Project[] = [
  {
    slug: "misako-rebranding",
    title: "Misako — a rebranding case",
    category: "Brand strategy · Rebranding",
    year: "2025",
    period: "2025",
    context: "UIC Barcelona · Final Degree Project",
    accent: "#c4006c",
    description: [
      "Misako is a Barcelona-born bag and accessories retailer with more than 220 stores across Spain, Portugal and Andorra. Despite a rebrand in 2022 it had not reached a younger generation, who still saw it as a brand for older people, and it competed mostly on price. Our Final Degree Project set out to reposition it from a low-cost label to an everyday consumer brand without significantly changing its price range.",
      "We covered the whole process: external analysis, a benchmark against competitors such as Parfois and Bimba y Lola, a SWOT, target definition and buyer personas, SMART objectives and a creative concept that presents Misako as an intergenerational brand whose bags pass from mothers to daughters. The plan unfolds twenty actions over six months in three phases. It starts with a new brand manual and the adaptation of the app, website and social media, and continues with an influencer programme, outdoor advertising, the Misako Gang loyalty scheme, collaborative pop-ups and a 30th anniversary event at Design Hub Barcelona, all budgeted and tied to KPIs.",
    ],
    role: "Co-author in a team of four: analysis, strategy, creative concept and action plan",
    tools: ["Brand strategy", "Market research", "Buyer personas", "Creative strategy", "Campaign & event planning", "Budgeting & KPIs"],
    image: "/projects/misako/misako-poster.jpg",
    w: 901,
    h: 1265,
    gallery: [
      { src: "/projects/misako/misako-cover.jpg", title: "Cover", caption: "The three-square Misako logo on the campaign gradient." },
      { src: "/projects/misako/misako-web.jpg", title: "Website", caption: "Home, 30th anniversary and product pages adapted to the new identity." },
      { src: "/projects/misako/misako-app.jpg", title: "App", caption: "Account and home screens carrying the anniversary campaign and the loyalty programme." },
      { src: "/projects/misako/misako-instagram.jpg", title: "Instagram", caption: "Post, story and reel for the 30th anniversary campaign." },
      { src: "/projects/misako/misako-brand-board.jpg", title: "Social media system", caption: "Profile, feed grid, highlights, stories and reels, with tone of voice and palette." },
      { src: "/projects/misako/misako-bus.jpg", title: "Outdoor advertising", caption: "“Be the change” bus wrap from the outdoor advertising plan of the relaunch phase." },
      { src: "/projects/misako/misako-popup.jpg", title: "Collaborative pop-up", caption: "Kiko Milano × Misako: beauty bar, styling workshop and a UGC photocall." },
      { src: "/projects/misako/misako-event-entrance.jpg", title: "30th anniversary event", caption: "Entrance at Design Hub Barcelona." },
      { src: "/projects/misako/misako-event-welcome.jpg", title: "Event experience", caption: "Welcome corridor, reception and merchandising." },
      { src: "/projects/misako/misako-invitation.jpg", title: "Influencer invitation", caption: "Invitation box for the anniversary event." },
    ],
    featured: true,
  },
  {
    slug: "uic-health-promotion-day-branding",
    accent: "#2874a0",
    title: "Official branding for the XIII Health Promotion Day",
    category: "Branding · Event identity",
    year: "2025",
    period: "Oct – Nov 2025",
    context: "UIC Barcelona",
    award: "Winning proposal · Official branding for future editions",
    awardCertificate: "/certificates/uic-health-promotion-day-award.jpg",
    description: [
      "Together with my team, we created the complete visual identity for UIC Barcelona's Health Promotion Day: from the concept to the posters, digital materials and mockups.",
      "We presented the proposal to the degree programme and a professional jury… and we won. Best of all, our branding will be used officially in the upcoming editions of the event.",
      "A very special project that went from being a class assignment to becoming something real within the university.",
    ],
    role: "Concept, visual identity and materials (team project)",
    image: "/projects/health-day-1.jpg",
    w: 1275,
    h: 1650,
    gallery: [
      { src: "/projects/health-day-2.jpg" },
      { src: "/projects/health-day-3.jpg" },
      { src: "/projects/health-day-4.jpg" },
    ],
    featured: true,
  },
  {
    slug: "sabesdepubli-tiktok",
    accent: "#c2271f",
    title: "@sabesdepubli — a TikTok account about advertising",
    category: "Social media · Content creation",
    year: "2025",
    period: "Jan – May 2025",
    context: "UIC Barcelona · Workshop en la Red",
    description: [
      "In the course Workshop en la Red, we created the TikTok account @sabesdepubli. We were five girls excited to talk about advertising in a fun, relatable way with pop culture references. Our goal was to reach both people in the industry, with humour, fresh insights and the occasional meme, and those outside of it, sharing curiosities and general knowledge about the world of advertising.",
      "We posted about award-winning and iconic campaigns, trending brands, key industry figures and even logos everyone knows. We jumped into real content creation and learned about TikTok's algorithm, editing, visual identity, brand tone, posting rhythm and much more.",
      "It was a project where we finally got to put theory into practice… and we earned a really good grade.",
    ],
    role: "Co-creator, content and social media",
    tools: ["TikTok", "Content creation", "Social media"],
    image: "/projects/sabesdepubli.jpg",
    w: 1,
    h: 1,
    featured: true,
  },
  {
    slug: "tinder-radio-ad",
    accent: "#c92756",
    title: "Radio ad for Tinder",
    category: "Advertising creativity · Radio",
    year: "2024",
    period: "Oct 2024",
    context: "UIC Barcelona · Advertising Creativity",
    description: [
      "In October 2024, during my Advertising Creativity course in the third year of Advertising and Public Relations, we faced an exciting challenge: creating a radio ad for Tinder. The brief required us to target an audience between 25 and 35 years old, with the goal of encouraging them to download the app.",
      "Working with a classmate, we developed a script inspired by our favourite idea from the brainstorming session. After multiple takes, adjusting our tone and emphasising key moments, we recorded it in the university's radio studio. The final touch was in the editing, bringing our vision to life exactly as we'd imagined. The result was immensely satisfying, and we felt proud to have seen the entire process through, from the concept to the final product.",
    ],
    role: "Concept, script, voice and editing (with Lucía Sánchez)",
    logo: "/projects/logos/tinder.svg",
    audio: "/projects/tinder-radio-ad.wav",
    featured: true,
  },
  {
    slug: "visual-analogies-graphic-design",
    accent: "#1e4db5",
    title: "Visual analogies — Graphic design",
    category: "Graphic design · Art direction",
    year: "2024",
    period: "Feb – May 2024",
    context: "UIC Barcelona · Graphic Design",
    description: [
      "These three campaigns were born in the Graphic Design course, but also from my way of understanding visual communication. Through conceptual analogies, compositions guided by lines of force and visual metaphors, I represented brand values for Orbit, Lindt and Neutrogena.",
      "Along the way I learned a great deal about photo editing, art direction and the power of typography when it is well chosen. Every concept and every line of copy came out of a creative process as fun as it was abstract, and it taught me something key: creativity connects ideas with emotions, and design is its language.",
    ],
    role: "Concept, copy, art direction and photo editing",
    image: "/projects/lindt.jpg",
    w: 1439,
    h: 1920,
    brandIndex: true,
    gallery: [
      {
        src: "/projects/lindt.jpg",
        title: "Lindt",
        logo: "/projects/logos/lindt.png",
        caption:
          "I presented the chocolate as an irresistible jewel, in a ring box on black satin. The copy “Querrás decir que sí” (“You'll want to say yes”) alludes to a proposal, but also to the pleasure of not being able to refuse something so good. The contrast between textures, the intense red and the centred composition reinforce desire. I used a conceptual analogy to convey luxury, temptation and emotional value.",
      },
      {
        src: "/projects/neutrogena.jpg",
        title: "Neutrogena",
        logo: "/projects/logos/neutrogena.png",
        caption:
          "I wanted to convey the softness and absorption of the cream through a white, padded background that evokes cleanliness and lightness. The burgundy nails add emotional contrast and elegance, framing the product. I used an analogy of shape and texture, with a central composition, soft lines and colour as a tool for visual direction and sensory perception.",
      },
      {
        src: "/projects/orbit.jpg",
        title: "Orbit",
        logo: "/projects/logos/orbit.png",
        caption:
          "I used a visual analogy between a toothbrush and Orbit gum to communicate freshness and oral hygiene. The copy “A chew away from freshness” reinforces the immediacy of the effect. The diagonal composition and the use of negative space add dynamism. The white background and cool tones complete a clean, direct and symbolic visual message.",
      },
    ],
    featured: true,
  },
  {
    slug: "banco-sabadell-campaign",
    accent: "#0f47a1",
    title: "Campaign for Banco Sabadell",
    category: "Advertising · Campaign",
    year: "2023",
    period: "Sep – Dec 2023",
    context: "UIC Barcelona · Advertising Language",
    description: [
      "In September 2023, as part of my Advertising Language course in the second year of Advertising and Public Relations, we took on an exciting challenge: creating a campaign to capture the attention of a young audience for Banco Sabadell.",
      "My group and I developed a creative concept based on the launch of a mini-series. We designed a central character, storyboarded the series and even produced an animatic for the trailer. We also created advertising posters, a press release and other promotional materials.",
      "The campaign culminated in a final presentation to Banco Sabadell's general and marketing directors, together with the dean of the Faculty of Communication and our course professor. The reception and feedback were extremely positive.",
    ],
    role: "Creative concept, storyboard, posters and press materials (team project)",
    image: "/projects/banco-sabadell-1.jpg",
    w: 800,
    h: 541,
    gallery: [
      { src: "/projects/banco-sabadell-2.jpg" },
      { src: "/projects/banco-sabadell-3.jpg" },
      { src: "/projects/banco-sabadell-4.jpg" },
    ],
    featured: true,
  },
];

const DEFAULT_RATIO = { w: 4, h: 5 };

export function getGalleryItemId(item: GalleryItem, index: number): string {
  return item.id ?? (item.title ? item.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") : `item-${index + 1}`);
}

export function getProjectRatio(p: Project) {
  return p.w && p.h ? { w: p.w, h: p.h } : DEFAULT_RATIO;
}

export function getFeaturedProjects(): Project[] {
  const featured = projects.filter((p) => p.featured);
  return featured.length ? featured : projects;
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug && !p.placeholder);
}

/** Prev / next navigation skips placeholders. */
export function getAdjacentProjects(slug: string) {
  const real = projects.filter((p) => !p.placeholder);
  const i = real.findIndex((p) => p.slug === slug);
  return {
    prev: i > 0 ? real[i - 1] : undefined,
    next: i >= 0 && i < real.length - 1 ? real[i + 1] : undefined,
  };
}
