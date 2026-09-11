import { ArrowUpRight } from "lucide-react";
import { PageLayout } from "@/components/ui/page-layout";
import { FadeUp, MediaOrPlaceholder, Rule, SectionHeading } from "@/components/ui/editorial";
import { certificates, getCertificateUrl, type Certificate } from "@/lib/certificates";
import { asset } from "@/lib/assets";
import { PillLink } from "@/components/ui/pill-link";
import { useI18n } from "@/lib/i18n";

/** One certificate row: thumbnail · name + issuer · date · link. New entries only need data. */
function CertificateRow({ cert, index }: { cert: Certificate; index: number }) {
  const { t, L } = useI18n();
  const url = asset(getCertificateUrl(cert));
  const title = L(cert.title) ?? "";
  const content = (
    <div className="grid grid-cols-[96px_1fr] md:grid-cols-[160px_1fr_auto_auto] gap-6 md:gap-10 items-center py-8">
      <MediaOrPlaceholder src={cert.image} alt={title} aspectRatio="4/3" label="" />

      <div className="min-w-0">
        <p className="text-lg" style={{ color: "var(--hero-dark)", lineHeight: 1.3 }}>
          {title}
        </p>
        <p className="text-sm mt-1">{L(cert.issuer)}</p>
        {cert.date && (
          <p className="text-xs uppercase tracking-[2px] mt-3 md:hidden" style={{ opacity: 0.55 }}>
            {L(cert.date)}
          </p>
        )}
      </div>

      <p className="hidden md:block text-xs uppercase tracking-[2px] whitespace-nowrap" style={{ opacity: 0.55 }}>
        {L(cert.date) ?? ""}
      </p>

      <span
        className="hidden md:inline-flex items-center gap-2 text-sm justify-self-end whitespace-nowrap"
        style={{ color: "var(--hero-dark)", visibility: url ? "visible" : "hidden" }}
      >
        {t("certs.view")}
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
          aria-label={`${title} — ${L(cert.issuer)}`}
        >
          {content}
        </a>
      ) : (
        content
      )}
    </FadeUp>
  );
}

/** Highlighted award: larger image, red "Award" label, short description. */
function FeaturedAward({ cert }: { cert: Certificate }) {
  const { t, L } = useI18n();
  const url = asset(getCertificateUrl(cert));
  const title = L(cert.title) ?? "";
  return (
    <FadeUp className="mb-16 md:mb-20">
      <div
        className="grid grid-cols-1 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-8 md:gap-14 p-6 md:p-10"
        style={{ boxShadow: "inset 0 0 0 1px var(--hero-border)", backgroundColor: "rgba(155,43,52,0.04)" }}
      >
        <MediaOrPlaceholder src={cert.image} alt={title} aspectRatio="1242/1755" label="" loading="eager" />
        <div className="flex flex-col justify-center">
          <p className="inline-flex items-center gap-3 text-xs uppercase tracking-[3px] mb-6" style={{ color: "var(--hero-red)" }}>
            <span aria-hidden="true" style={{ display: "inline-block", width: 24, height: 1, backgroundColor: "currentColor" }} />
            {t("certs.award")}
          </p>
          <h2 className="text-2xl md:text-3xl mb-4" style={{ color: "var(--hero-dark)", lineHeight: 1.15 }}>
            {title}
          </h2>
          <p className="text-sm" style={{ color: "var(--hero-dark)" }}>
            {L(cert.issuer)}
          </p>
          {cert.date && (
            <p className="text-xs uppercase tracking-[2px] mt-2" style={{ opacity: 0.55 }}>
              {L(cert.date)}
            </p>
          )}
          {cert.description && (
            <p className="text-sm leading-relaxed mt-6" style={{ maxWidth: 460 }}>
              {L(cert.description)}
            </p>
          )}
          {url && (
            <div className="mt-8">
              <PillLink href={url} external size="sm">
                {t("certs.viewCertificate")}
              </PillLink>
            </div>
          )}
        </div>
      </div>
    </FadeUp>
  );
}

const Certificates = () => {
  const { t } = useI18n();
  const featured = certificates.filter((c) => c.featured);
  const rest = certificates.filter((c) => !c.featured);
  return (
    <PageLayout>
      <FadeUp className="mb-12 md:mb-16">
        <SectionHeading eyebrow={t("certs.eyebrow")} title={t("certs.title")} />
        <p className="text-sm leading-relaxed mt-6" style={{ maxWidth: 460 }}>
          {t("certs.intro")}
        </p>
      </FadeUp>

      {featured.map((c, i) => (
        <FeaturedAward key={i} cert={c} />
      ))}

      {rest.length === 0 ? (
        <FadeUp>
          <Rule />
          <p className="py-10 text-sm" style={{ opacity: 0.6 }}>
            {t("certs.comingSoon")}
          </p>
        </FadeUp>
      ) : (
        <div>
          {rest.map((c, i) => (
            <CertificateRow key={i} cert={c} index={i} />
          ))}
          <Rule />
        </div>
      )}
    </PageLayout>
  );
};

export default Certificates;
