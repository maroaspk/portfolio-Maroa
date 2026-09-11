/**
 * Resolves a public asset path ("/projects/foo.jpg") against the site's base URL.
 *
 * On GitHub Pages a project site lives under "https://user.github.io/<repo>/",
 * so absolute paths would 404. Vite exposes the configured base as
 * import.meta.env.BASE_URL; content files can keep using root-relative paths
 * and every render site passes them through this helper.
 */
export function asset(path: string | undefined): string | undefined {
  if (!path) return path;
  if (/^(https?:|mailto:|tel:|data:|blob:)/i.test(path)) return path;
  const base = import.meta.env.BASE_URL || "/";
  return base.replace(/\/$/, "") + "/" + path.replace(/^\//, "");
}
