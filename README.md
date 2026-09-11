# Maroa González Rosdevall — Portfolio

Portfolio profesional de Maroa González Rosdevall (Publicidad · Relaciones Públicas · Comunicación), construido sobre la plantilla "Parallax artist portfolio". Contenido 100 % estático: sin backend ni base de datos.

## Stack

- Vite + React 18 + TypeScript
- Tailwind CSS v4
- React Router v6
- Framer Motion (parallax + transiciones)

## Arrancar

```sh
npm install
npm run dev      # http://localhost:8080
npm run build    # genera dist/
```

## Dónde se edita el contenido

Todo el contenido vive en `src/lib/`. No hace falta tocar componentes para añadir cosas.

**Idiomas:** la web es bilingüe (inglés y español) con un conmutador EN / ES en la cabecera. Cualquier texto de contenido puede ser una cadena simple (igual en ambos idiomas) o `{ en: "…", es: "…" }`. Los textos de interfaz están en el diccionario `UI` de `src/lib/i18n.tsx`. La elección se guarda en el navegador; la primera visita sigue el idioma del navegador.

| Fichero | Qué contiene |
| --- | --- |
| `src/lib/profile.ts` | Nombre, tagline, frase del hero, foto de About, intro, experiencia, formación, skills, idiomas, email, LinkedIn y otras redes. |
| `src/lib/projects.ts` | Proyectos. Cada uno: `slug`, `title`, `category`, y opcionalmente `year`, `period`, `context`, `description` (texto o lista de párrafos), `role`, `tools`, `image`, `logo` (marca centrada cuando no hay imagen), `w`/`h`, `gallery` (con `title`, `caption` y `logo` opcionales), `brandIndex` (índice de marcas clicable sobre la galería), `audio`, `award`, `awardCertificate`, `accent` (color del proyecto), `document` (visor de solo lectura con páginas pre-renderizadas), `links` (botones a perfiles externos), `videos` (URLs de vídeos de TikTok para incrustar), `featured`, `placeholder`. |
| `src/lib/certificates.ts` | Certificados: `title`, `issuer`, y opcionalmente `date`, `image`, `url` (si no hay `url`, la fila enlaza a la imagen), `featured` + `description` (bloque destacado de premio al inicio). |

- **Añadir un proyecto:** añade una entrada a `projects`. Sin `image` se muestra un placeholder neutro (con `logo` centrado si se indica). Con `featured: true` aparece en la home. Con `award` se marca como premiado en el grid y en el detalle (y `awardCertificate` enlaza al documento). Con `placeholder: true` se muestra como "Coming soon" sin página propia.
- **Color por proyecto:** `accent` (hex) tiñe el fondo de la página del proyecto y colorea etiquetas, líneas y subrayados; en el grid, la categoría toma ese color al pasar el cursor. Los derivados se calculan en `src/lib/color.ts`. Usa un tono que dé contraste ≥ 4.5 sobre el fondo teñido (los actuales están comprobados).
- **Documento de solo lectura:** con `document: { path, pages }` aparece el botón "Read the full project", que abre `/projects/<slug>/read`. Las páginas son imágenes con marca de agua en `public/<path>/page-001.jpg…` (no se sirve el PDF, no se puede seleccionar texto ni arrastrar; las capturas de pantalla no se pueden impedir).
- **Vídeos de TikTok:** añade URLs de vídeo en `videos` y se incrustan en la página del proyecto.
- **Galería con índice de marcas:** con `brandIndex: true`, los `title`/`logo` de la galería se muestran como índice clicable; al pulsar cambia la imagen principal y se desplaza a la explicación.
- **Añadir un certificado:** añade una entrada a `certificates`. Con `url` la fila entera es un enlace (sirve un PDF en `/public`).
- **Imágenes del hero (12):** `HERO_PHOTOS` en `src/components/ui/hero-section.tsx`.
- **Iniciales del logo:** `profile.initials`.
- **Tokens de diseño (colores, fuente):** `src/index.css` (`--hero-dark`, `--hero-light`, `--hero-paragraphs`, `--hero-border`, `--hero-red`).

Las imágenes viven en `public/`: `public/media` (retrato y CV), `public/projects` (proyectos, audio, `logos/` y `misako/`) y `public/certificates` (certificados). Se referencian como `/projects/archivo.jpg`.

## Publicar en GitHub Pages

El repositorio debe tener esta carpeta como raíz (donde están `package.json` y `.github/`).

1. Crea el repositorio en GitHub y sube el proyecto a la rama `main`.
2. En el repositorio: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Cada `push` a `main` ejecuta `.github/workflows/deploy.yml`, que compila y publica `dist/`. La web queda en `https://<usuario>.github.io/<repo>/` (o en `https://<usuario>.github.io/` si el repo se llama `<usuario>.github.io`).

Notas técnicas: el workflow fija `BASE_PATH` según el nombre del repo, Vite lo usa como `base`, el router usa el mismo `basename` y todas las rutas de `public/` pasan por `asset()` (`src/lib/assets.ts`). El build copia `index.html` a `404.html` para que las URL profundas funcionen al recargar. En local nada cambia: `npm run dev` sigue sirviendo en `/`.

## Rutas

| Ruta | Página |
| --- | --- |
| `/` | Home — hero + proyectos destacados |
| `/about` | About — intro, experiencia, formación, skills, idiomas |
| `/projects` | Todos los proyectos |
| `/projects/:slug` | Detalle de proyecto + anterior/siguiente |
| `/certificates` | Certificados |
| `/contact` | Contacto (email, LinkedIn, otras redes) |
| `*` | 404 |

## Componentes compartidos

- `src/components/ui/editorial.tsx` — `SectionHeading`, `Eyebrow`, `Rule`, `FadeUp`, `Placeholder`, `MediaOrPlaceholder`.
- `src/components/ui/page-layout.tsx` — shell de las páginas interiores (header + contenedor + footer).
- `src/components/ui/project-grid.tsx` — grid editorial de 3 columnas, reparte los proyectos automáticamente.
- `src/components/ui/contact-links.tsx` — bloque de contacto usado en `/contact` y en el overlay "Let's connect".
