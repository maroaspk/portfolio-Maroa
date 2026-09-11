import type { Localized } from "./i18n";

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
 *   - `award`      → short label highlighted in the grid and detail; `awardCertificate` links to the document
 *   - `document`   → read-only viewer of a long document (pre-rendered, watermarked page images in /public)
 *   - `links`      → external links (profile, site…) shown as pill buttons on the detail page
 *   - `videos`     → TikTok video URLs embedded on the detail page
 *   - `accent`     → one hex colour taken from the project's identity; the detail page tints its background
 *                    with it and uses it for labels, rules and link underlines (see src/lib/color.ts)
 *   - `featured`   → appears on the home page grid
 *   - `placeholder: true` → shown as a discreet "coming soon" tile with no detail page
 *
 * Any text can be a plain string (same in both languages) or `{ en, es }`.
 * Put images in /public/projects and reference them as "/projects/file.jpg".
 */

export interface GalleryItem {
  src: string;
  title?: Localized;
  caption?: Localized;
  /** Anchor id used by the brand index (defaults to a slug of the English title). */
  id?: string;
  /** Brand logo (file in /public/projects/logos). Without it the brand name is shown as a wordmark. */
  logo?: string;
}

export interface ProjectDocument {
  /** Folder in /public with page-001.jpg, page-002.jpg… */
  path: string;
  pages: number;
  title?: Localized;
  note?: Localized;
  authors?: string;
  /** Intrinsic page size, for layout before images load. */
  w?: number;
  h?: number;
}

export interface ProjectLink {
  label: Localized;
  href: string;
}

export interface Project {
  slug: string;
  title: Localized;
  category: Localized;
  year?: string;
  period?: Localized;
  /** Institution, client or context, e.g. "UIC Barcelona". */
  context?: Localized;
  description?: Localized | Localized[];
  /** Maroa's role in the project. */
  role?: Localized;
  tools?: Localized[];
  image?: string;
  /** Brand mark shown on the placeholder when the project has no `image` (file in /public/projects/logos). */
  logo?: string;
  /** Intrinsic size of the main image, used for the grid aspect ratio. Defaults to 4:5. */
  w?: number;
  h?: number;
  gallery?: GalleryItem[];
  audio?: string;
  award?: Localized;
  awardCertificate?: string;
  brandIndex?: boolean;
  accent?: string;
  document?: ProjectDocument;
  links?: ProjectLink[];
  /** TikTok video URLs, e.g. "https://www.tiktok.com/@sabesdepubli/video/7300000000000000000". */
  videos?: string[];
  featured?: boolean;
  placeholder?: boolean;
}

export const projects: Project[] = [
  {
    slug: "misako-rebranding",
    title: { en: "Misako — a rebranding case", es: "Misako — un caso de rebranding" },
    category: { en: "Brand strategy · Rebranding", es: "Estrategia de marca · Rebranding" },
    year: "2025",
    period: "2025",
    context: { en: "UIC Barcelona · Final Degree Project", es: "UIC Barcelona · Trabajo de Fin de Grado" },
    accent: "#c4006c",
    description: [
      {
        en: "Misako is a Barcelona-born bag and accessories retailer with more than 220 stores across Spain, Portugal and Andorra. Despite a rebrand in 2022 it had not reached a younger generation, who still saw it as a brand for older people, and it competed mostly on price. Our Final Degree Project set out to reposition it from a low-cost label to an everyday consumer brand without significantly changing its price range.",
        es: "Misako es una marca barcelonesa de bolsos y complementos con más de 220 tiendas en España, Portugal y Andorra. Pese a un rebranding en 2022, no había llegado a la generación más joven, que seguía viéndola como una marca para gente mayor, y competía sobre todo por precio. Nuestro Trabajo de Fin de Grado se propuso reposicionarla de marca low cost a marca de gran consumo sin modificar de forma significativa su rango de precios.",
      },
      {
        en: "We covered the whole process: external analysis, a benchmark against competitors such as Parfois and Bimba y Lola, a SWOT, target definition and buyer personas, SMART objectives and a creative concept that presents Misako as an intergenerational brand whose bags pass from mothers to daughters. The plan unfolds twenty actions over six months in three phases. It starts with a new brand manual and the adaptation of the app, website and social media, and continues with an influencer programme, outdoor advertising, the Misako Gang loyalty scheme, collaborative pop-ups and a 30th anniversary event at Design Hub Barcelona, all budgeted and tied to KPIs.",
        es: "Abordamos todo el proceso: análisis externo, benchmarking frente a competidores como Parfois o Bimba y Lola, DAFO, definición del público objetivo y buyer personas, objetivos SMART y un concepto creativo que presenta a Misako como una marca intergeneracional cuyos bolsos pasan de madres a hijas. El plan despliega veinte acciones en seis meses y tres fases: arranca con un nuevo manual de marca y la adaptación de la app, la web y las redes sociales, y continúa con una campaña de influencers, publicidad exterior, el programa de fidelización Misako Gang, pop-ups colaborativas y un evento por el 30 aniversario en el Design Hub Barcelona, todo presupuestado y ligado a KPIs.",
      },
    ],
    role: {
      en: "Co-author in a team of four: analysis, strategy, creative concept and action plan",
      es: "Coautora en un equipo de cuatro: análisis, estrategia, concepto creativo y plan de acciones",
    },
    tools: [
      { en: "Brand strategy", es: "Estrategia de marca" },
      { en: "Market research", es: "Investigación de mercado" },
      "Buyer personas",
      { en: "Creative strategy", es: "Estrategia creativa" },
      { en: "Campaign & event planning", es: "Planificación de campaña y eventos" },
      { en: "Budgeting & KPIs", es: "Presupuesto y KPIs" },
    ],
    document: {
      path: "/projects/misako/doc",
      pages: 139,
      title: { en: "Misako — a rebranding case · Full project", es: "Misako — un caso de rebranding · Proyecto completo" },
      note: {
        en: "Read-only view of the complete Final Degree Project (139 pages). Shared for consultation only; the content may not be copied or reproduced.",
        es: "Vista de solo lectura del Trabajo de Fin de Grado completo (139 páginas). Se comparte únicamente para consulta; el contenido no puede copiarse ni reproducirse.",
      },
      authors: "Ona Gangolells Huguet, Lucía Sánchez Jurado, Maroa González Rosdevall, Paula Navarro-Soto del Castillo",
      w: 1200,
      h: 849,
    },
    image: "/projects/misako/misako-poster.jpg",
    w: 901,
    h: 1265,
    gallery: [
      { src: "/projects/misako/misako-cover.jpg", title: { en: "Cover", es: "Portada" }, caption: { en: "The three-square Misako logo on the campaign gradient.", es: "El logo de tres cuadrados de Misako sobre el degradado de campaña." } },
      { src: "/projects/misako/misako-web.jpg", title: { en: "Website", es: "Web" }, caption: { en: "Home, 30th anniversary and product pages adapted to the new identity.", es: "Home, página del 30 aniversario y ficha de producto adaptadas a la nueva identidad." } },
      { src: "/projects/misako/misako-app.jpg", title: "App", caption: { en: "Account and home screens carrying the anniversary campaign and the loyalty programme.", es: "Pantallas de cuenta e inicio con la campaña de aniversario y el programa de fidelización." } },
      { src: "/projects/misako/misako-instagram.jpg", title: "Instagram", caption: { en: "Post, story and reel for the 30th anniversary campaign.", es: "Post, story y reel de la campaña del 30 aniversario." } },
      { src: "/projects/misako/misako-brand-board.jpg", title: { en: "Social media system", es: "Sistema de redes sociales" }, caption: { en: "Profile, feed grid, highlights, stories and reels, with tone of voice and palette.", es: "Perfil, feed, destacados, stories y reels, con tono de comunicación y paleta." } },
      { src: "/projects/misako/misako-bus.jpg", title: { en: "Outdoor advertising", es: "Publicidad exterior" }, caption: { en: "“Be the change” bus wrap from the outdoor advertising plan of the relaunch phase.", es: "Autobús rotulado “Be the change” del plan de publicidad exterior de la fase de relanzamiento." } },
      { src: "/projects/misako/misako-popup.jpg", title: { en: "Collaborative pop-up", es: "Pop-up colaborativa" }, caption: { en: "Kiko Milano × Misako: beauty bar, styling workshop and a UGC photocall.", es: "Kiko Milano × Misako: beauty bar, taller de estilismo y photocall UGC." } },
      { src: "/projects/misako/misako-event-entrance.jpg", title: { en: "30th anniversary event", es: "Evento 30 aniversario" }, caption: { en: "Entrance at Design Hub Barcelona.", es: "Entrada en el Design Hub Barcelona." } },
      { src: "/projects/misako/misako-event-welcome.jpg", title: { en: "Event experience", es: "Experiencia del evento" }, caption: { en: "Welcome corridor, reception and merchandising.", es: "Pasillo de bienvenida, recepción y merchandising." } },
      { src: "/projects/misako/misako-invitation.jpg", title: { en: "Influencer invitation", es: "Invitación a influencers" }, caption: { en: "Invitation box for the anniversary event.", es: "Caja de invitación para el evento de aniversario." } },
    ],
    featured: true,
  },
  {
    slug: "uic-health-promotion-day-branding",
    accent: "#2874a0",
    title: { en: "Official branding for the XIII Health Promotion Day", es: "Branding oficial de la XIII Jornada de Promoción de la Salud" },
    category: { en: "Branding · Event identity", es: "Branding · Identidad de evento" },
    year: "2025",
    period: "Oct – Nov 2025",
    context: "UIC Barcelona",
    award: { en: "Winning proposal · Official branding for future editions", es: "Propuesta ganadora · Branding oficial de las próximas ediciones" },
    awardCertificate: "/certificates/uic-health-promotion-day-award.jpg",
    description: [
      {
        en: "Together with my team, we created the complete visual identity for UIC Barcelona's Health Promotion Day: from the concept to the posters, digital materials and mockups.",
        es: "Junto a mi equipo creamos la identidad visual completa de la Jornada de Promoción de la Salud de la UIC: desde el concepto hasta los pósters, los materiales digitales y los mockups.",
      },
      {
        en: "We presented the proposal to the degree programme and a professional jury… and we won. Best of all, our branding will be used officially in the upcoming editions of the event.",
        es: "Presentamos la propuesta ante el grado y un jurado profesional… y ganamos. Lo mejor: nuestro branding se usará oficialmente en las próximas ediciones del evento.",
      },
      {
        en: "A very special project that went from being a class assignment to becoming something real within the university.",
        es: "Un proyecto muy especial que pasó de ser un trabajo de clase a convertirse en algo real dentro de la universidad.",
      },
    ],
    role: { en: "Concept, visual identity and materials (team project)", es: "Concepto, identidad visual y materiales (proyecto en equipo)" },
    image: "/projects/health-day-1.jpg",
    w: 1275,
    h: 1650,
    gallery: [{ src: "/projects/health-day-2.jpg" }, { src: "/projects/health-day-3.jpg" }, { src: "/projects/health-day-4.jpg" }],
    featured: true,
  },
  {
    slug: "sabesdepubli-tiktok",
    accent: "#c2271f",
    title: { en: "@sabesdepubli — a TikTok account about advertising", es: "@sabesdepubli — una cuenta de TikTok sobre publicidad" },
    category: { en: "Social media · Content creation", es: "Redes sociales · Creación de contenido" },
    year: "2025",
    period: { en: "Jan – May 2025", es: "Ene – May 2025" },
    context: "UIC Barcelona · Workshop en la Red",
    description: [
      {
        en: "In the course Workshop en la Red, we created the TikTok account @sabesdepubli. We were five girls excited to talk about advertising in a fun, relatable way with pop culture references. Our goal was to reach both people in the industry, with humour, fresh insights and the occasional meme, and those outside of it, sharing curiosities and general knowledge about the world of advertising.",
        es: "En la asignatura Workshop en la Red creamos la cuenta de TikTok @sabesdepubli. Éramos cinco chicas con ganas de hablar de publicidad de forma cercana, divertida y con referencias a la cultura pop. Nuestro objetivo era llegar tanto a profesionales del mundo publicitario, con humor, insights frescos e incluso algún meme, como a personas no especializadas, compartiendo curiosidades y cultura general sobre este ámbito.",
      },
      {
        en: "We posted about award-winning and iconic campaigns, trending brands, key industry figures and even logos everyone knows. We jumped into real content creation and learned about TikTok's algorithm, editing, visual identity, brand tone, posting rhythm and much more.",
        es: "Publicamos sobre campañas premiadas y clásicas, marcas en tendencia, figuras clave de la industria e incluso logos que todos reconocemos. Nos lanzamos a crear contenido real y aprendimos sobre algoritmo, edición, look & feel, tono de marca y ritmo de publicación, entre muchas otras cosas.",
      },
      {
        en: "It was a project where we finally got to put theory into practice… and we earned a really good grade.",
        es: "Fue un proyecto donde pusimos en práctica lo que normalmente solo se ve en teoría… y nos llevamos una muy buena nota.",
      },
    ],
    role: { en: "Co-creator, content and social media", es: "Cocreadora, contenido y redes sociales" },
    tools: ["TikTok", { en: "Content creation", es: "Creación de contenido" }, { en: "Social media", es: "Redes sociales" }],
    links: [{ label: { en: "Watch @sabesdepubli on TikTok", es: "Ver @sabesdepubli en TikTok" }, href: "https://www.tiktok.com/@sabesdepubli" }],
    // Add TikTok video URLs here to embed them on the project page.
    videos: [],
    image: "/projects/sabesdepubli.jpg",
    w: 1,
    h: 1,
    featured: true,
  },
  {
    slug: "tinder-radio-ad",
    accent: "#c92756",
    title: { en: "Radio ad for Tinder", es: "Cuña de radio para Tinder" },
    category: { en: "Advertising creativity · Radio", es: "Creatividad publicitaria · Radio" },
    year: "2024",
    period: "Oct 2024",
    context: { en: "UIC Barcelona · Advertising Creativity", es: "UIC Barcelona · Creatividad Publicitaria" },
    description: [
      {
        en: "In October 2024, during my Advertising Creativity course in the third year of Advertising and Public Relations, we faced an exciting challenge: creating a radio ad for Tinder. The brief required us to target an audience between 25 and 35 years old, with the goal of encouraging them to download the app.",
        es: "En octubre de 2024, en la asignatura de Creatividad Publicitaria de tercer curso de Publicidad y Relaciones Públicas, nos enfrentamos a un reto: crear una cuña de radio para Tinder. El briefing pedía dirigirse a un público de entre 25 y 35 años e incitarle a descargarse la aplicación.",
      },
      {
        en: "Working with a classmate, we developed a script inspired by our favourite idea from the brainstorming session. After multiple takes, adjusting our tone and emphasising key moments, we recorded it in the university's radio studio. The final touch was in the editing, bringing our vision to life exactly as we'd imagined. The result was immensely satisfying, and we felt proud to have seen the entire process through, from the concept to the final product.",
        es: "Junto a mi compañera ideamos un guion a partir de nuestra idea favorita del brainstorming. Tras varios intentos modulando la voz y enfatizando, la grabamos en el estudio de radio de la universidad. La edición fue el toque final que plasmó a la perfección la idea que teníamos en mente. El resultado fue muy gratificante y nos enorgulleció haber vivido todo el proceso, desde la idea hasta el resultado tangible.",
      },
    ],
    role: { en: "Concept, script, voice and editing (with Lucía Sánchez)", es: "Concepto, guion, voz y edición (con Lucía Sánchez)" },
    logo: "/projects/logos/tinder.svg",
    audio: "/projects/tinder-radio-ad.mp3",
    featured: true,
  },
  {
    slug: "visual-analogies-graphic-design",
    accent: "#1e4db5",
    title: { en: "Visual analogies — Graphic design", es: "Analogías visuales — Diseño gráfico" },
    category: { en: "Graphic design · Art direction", es: "Diseño gráfico · Dirección de arte" },
    year: "2024",
    period: { en: "Feb – May 2024", es: "Feb – May 2024" },
    context: { en: "UIC Barcelona · Graphic Design", es: "UIC Barcelona · Diseño Gráfico" },
    description: [
      {
        en: "These three campaigns were born in the Graphic Design course, but also from my way of understanding visual communication. Through conceptual analogies, compositions guided by lines of force and visual metaphors, I represented brand values for Orbit, Lindt and Neutrogena.",
        es: "Estas tres campañas nacieron en la asignatura de Diseño Gráfico, pero también de mi forma de entender la comunicación visual. A través de analogías conceptuales, composiciones guiadas por líneas de fuerza y metáforas visuales, representé valores de marca para Orbit, Lindt y Neutrogena.",
      },
      {
        en: "Along the way I learned a great deal about photo editing, art direction and the power of typography when it is well chosen. Every concept and every line of copy came out of a creative process as fun as it was abstract, and it taught me something key: creativity connects ideas with emotions, and design is its language.",
        es: "En el camino aprendí muchísimo sobre edición fotográfica, dirección de arte y el poder de la tipografía cuando está bien elegida. Cada concepto y cada copy surgieron de un proceso creativo tan divertido como abstracto, que me enseñó algo clave: la creatividad conecta ideas con emociones, y el diseño es su idioma.",
      },
    ],
    role: { en: "Concept, copy, art direction and photo editing", es: "Concepto, copy, dirección de arte y edición fotográfica" },
    image: "/projects/lindt.jpg",
    w: 1439,
    h: 1920,
    brandIndex: true,
    gallery: [
      {
        src: "/projects/lindt.jpg",
        id: "lindt",
        title: "Lindt",
        logo: "/projects/logos/lindt.png",
        caption: {
          en: "I presented the chocolate as an irresistible jewel, in a ring box on black satin. The copy “Querrás decir que sí” (“You'll want to say yes”) alludes to a proposal, but also to the pleasure of not being able to refuse something so good. The contrast between textures, the intense red and the centred composition reinforce desire. I used a conceptual analogy to convey luxury, temptation and emotional value.",
          es: "Presenté el bombón como una joya irresistible, en una caja de anillo sobre satén negro. El copy “Querrás decir que sí” alude a una pedida, pero también al placer de no poder rechazar algo tan bueno. El contraste entre texturas, el rojo intenso y la composición centrada refuerzan el deseo. Usé una analogía conceptual para transmitir lujo, tentación y valor emocional.",
        },
      },
      {
        src: "/projects/neutrogena.jpg",
        id: "neutrogena",
        title: "Neutrogena",
        logo: "/projects/logos/neutrogena.png",
        caption: {
          en: "I wanted to convey the softness and absorption of the cream through a white, padded background that evokes cleanliness and lightness. The burgundy nails add emotional contrast and elegance, framing the product. I used an analogy of shape and texture, with a central composition, soft lines and colour as a tool for visual direction and sensory perception.",
          es: "Quise transmitir la suavidad y absorción de la crema a través de un fondo blanco y acolchado que evoca limpieza y ligereza. El color burdeos de las uñas aporta contraste emocional y elegancia, enmarcando el producto. Usé una analogía por forma y textura, con composición central, líneas suaves y el color como herramienta de dirección visual y percepción sensorial.",
        },
      },
      {
        src: "/projects/orbit.jpg",
        id: "orbit",
        title: "Orbit",
        logo: "/projects/logos/orbit.png",
        caption: {
          en: "I used a visual analogy between a toothbrush and Orbit gum to communicate freshness and oral hygiene. The copy “A chew away from freshness” reinforces the immediacy of the effect. The diagonal composition and the use of negative space add dynamism. The white background and cool tones complete a clean, direct and symbolic visual message.",
          es: "Usé una analogía visual entre un cepillo y el chicle Orbit para comunicar frescura e higiene bucal. El copy “A chew away from freshness” refuerza la inmediatez del efecto. La composición diagonal y el uso del espacio negativo aportan dinamismo. El fondo blanco y los tonos fríos completan un mensaje visual limpio, directo y simbólico.",
        },
      },
    ],
    featured: true,
  },
  {
    slug: "banco-sabadell-campaign",
    accent: "#0f47a1",
    title: { en: "Campaign for Banco Sabadell", es: "Campaña para Banco Sabadell" },
    category: { en: "Advertising · Campaign", es: "Publicidad · Campaña" },
    year: "2023",
    period: { en: "Sep – Dec 2023", es: "Sep – Dic 2023" },
    context: { en: "UIC Barcelona · Advertising Language", es: "UIC Barcelona · Lenguaje Publicitario" },
    description: [
      {
        en: "In September 2023, as part of my Advertising Language course in the second year of Advertising and Public Relations, we took on an exciting challenge: creating a campaign to capture the attention of a young audience for Banco Sabadell.",
        es: "En septiembre de 2023, como parte de la asignatura de Lenguaje Publicitario de segundo curso de Publicidad y Relaciones Públicas, asumimos un reto emocionante: crear una campaña para captar la atención del público joven hacia Banco Sabadell.",
      },
      {
        en: "My group and I developed a creative concept based on the launch of a mini-series. We designed a central character, storyboarded the series and even produced an animatic for the trailer. We also created advertising posters, a press release and other promotional materials.",
        es: "Mi grupo y yo desarrollamos un concepto creativo basado en el lanzamiento de una miniserie. Diseñamos un personaje central, realizamos el storyboard de la serie y hasta creamos un animatic para el tráiler. También elaboramos carteles publicitarios, una nota de prensa y otros materiales promocionales.",
      },
      {
        en: "The campaign culminated in a final presentation to Banco Sabadell's general and marketing directors, together with the dean of the Faculty of Communication and our course professor. The reception and feedback were extremely positive.",
        es: "La campaña culminó en una presentación final ante los directores generales y de marketing de Banco Sabadell, junto con el decano de la Facultad de Comunicación y nuestro profesor de la asignatura. La recepción y el feedback fueron sumamente positivos.",
      },
    ],
    role: { en: "Creative concept, storyboard, posters and press materials (team project)", es: "Concepto creativo, storyboard, carteles y materiales de prensa (proyecto en equipo)" },
    image: "/projects/banco-sabadell-1.jpg",
    w: 800,
    h: 541,
    gallery: [{ src: "/projects/banco-sabadell-2.jpg" }, { src: "/projects/banco-sabadell-3.jpg" }, { src: "/projects/banco-sabadell-4.jpg" }],
    featured: true,
  },
];

const DEFAULT_RATIO = { w: 4, h: 5 };

export function getGalleryItemId(item: GalleryItem, index: number): string {
  if (item.id) return item.id;
  const title = typeof item.title === "string" ? item.title : item.title?.en;
  return title ? title.toLowerCase().replace(/[^a-z0-9]+/g, "-") : `item-${index + 1}`;
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
