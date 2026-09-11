import { ArrowUpRight } from "lucide-react";
import { PageLayout } from "@/components/ui/page-layout";
import { FadeUp, MediaOrPlaceholder, Rule, SectionHeading } from "@/components/ui/editorial";
import { certificates, getCertificateUrl, type Certificate } from "@/lib/certificates";
import { asset } from "@/lib/assets";

/** One certificate row: thumbnail · name + issuer · date · link. New entries only need data. */
function CertificateRow({ cert, index }: { cert: Certificate; index: number }) {
  const url = asset(getCertificateUrl(cert));
  const content = (
    <div className="grid grid-cols-[96px_1fr] md:grid-cols-[160px_1fr_auto_auto] gap-6 md:gap-10 items-center py-8">
      <MediaOrPlaceholder src={cert.image} alt={cert.title} aspectRatio="4/3" label="" />

      <div className="min-w-0">
        <p className="text-lg" style={{ color: "var(--hero-dark)", lineHeight: 1.3 }}>
          {cert.title}
        </p>
        <p className="text-sm mt-1">{cert.issuer}</p>
        {cert.date && (
          <p className="text-xs uppercase tracking-[2px] mt-3 md:hidden" style={{ opacity: 0.55 }}>
            {cert.date}
          </p>
        )}
      </div>

      <p className="hidden md:block text-xs uppercase tracking-[2px] whitespace-nowrap" style={{ opacity: 0.55 }}>
        {cert.date ?? ""}
      </p>

      <span
        className="hidden md:inline-flex items-center gap-2 text-sm justify-self-end whitespace-nowrap"
        style={{ color: "var(--hero-dark)", visibility: url ? "visible" : "hidden" }}
      >
        View
        <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
      </span>
    </div>
  );

  return (
    <FadeUp delay={Math.min(index * 0.05, 0.3)}>
      <Rule />
      {url ? (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="block group hover:opacity-80 transition-opacity"
          aria-label={`${cert.title} — ${cert.issuer}`}
        >
          {content}
        </a>
      ) : (
        content
      )}
    </FadeUp>
  );
}

const Certificates = () => {
  return (
    <PageLayout>
      <FadeUp className="mb-12 md:mb-16">
        <SectionHeading eyebrow="Certificates" title="Certificates" />
        <p className="text-sm leading-relaxed mt-6" style={{ maxWidth: 460 }}>
          Complementary training and credentials. This section keeps growing.
        </p>
      </FadeUp>

      {certificates.length === 0 ? (
        <FadeUp>
          <Rule />
          <p className="py-10 text-sm" style={{ opacity: 0.6 }}>
            Coming soon.
          </p>
        </FadeUp>
      ) : (
        <div>
          {certificates.map((c, i) => (
            <CertificateRow key={`${c.title}-${c.issuer}`} cert={c} index={i} />
          ))}
          <Rule />
        </div>
      )}
    </PageLayout>
  );
};

export default Certificates;
