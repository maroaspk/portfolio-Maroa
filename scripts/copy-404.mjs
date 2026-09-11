// GitHub Pages serves 404.html for unknown paths. Copying the SPA entry there lets
// deep links such as /projects/misako-rebranding load the app, which then routes.
import { copyFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const dist = resolve(process.cwd(), "dist");
const index = resolve(dist, "index.html");
if (existsSync(index)) {
  copyFileSync(index, resolve(dist, "404.html"));
  console.log("dist/404.html created for SPA routing");
}
