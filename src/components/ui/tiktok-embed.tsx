import { useEffect } from "react";

/**
 * Embeds a public TikTok video from its URL using TikTok's official embed script.
 * The script is loaded once and re-run when new embeds mount.
 */
const SCRIPT_SRC = "https://www.tiktok.com/embed.js";

function loadScript() {
  const existing = document.querySelector<HTMLScriptElement>(`script[src="${SCRIPT_SRC}"]`);
  if (existing) {
    // Re-append forces TikTok's loader to scan for new blockquotes.
    existing.remove();
  }
  const s = document.createElement("script");
  s.src = SCRIPT_SRC;
  s.async = true;
  document.body.appendChild(s);
}

export function TikTokEmbed({ url }: { url: string }) {
  const id = url.match(/video\/(\d+)/)?.[1];

  useEffect(() => {
    if (id) loadScript();
  }, [id]);

  if (!id) return null;

  return (
    <div className="w-full flex justify-center">
      <blockquote
        className="tiktok-embed"
        cite={url}
        data-video-id={id}
        style={{ maxWidth: 325, minWidth: 260, margin: 0 }}
      >
        <section>
          <a href={url} target="_blank" rel="noopener noreferrer" className="underline text-sm" style={{ color: "var(--hero-dark)" }}>
            Watch on TikTok
          </a>
        </section>
      </blockquote>
    </div>
  );
}
