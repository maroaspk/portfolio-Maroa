import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { PageLayout } from "@/components/ui/page-layout";
import { FadeUp, Eyebrow, MediaOrPlaceholder, Rule } from "@/components/ui/editorial";
import { profile } from "@/lib/profile";
import { asset } from "@/lib/assets";
import { PillLink } from "@/components/ui/pill-link";
import { useI18n } from "@/lib/i18n";

/**
 * Editorial CV row: small label on the left, content on the right.
 * Used for Experience, Education, Skills and Languages so they read as one system.
 */
function CvSection({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <FadeUp>
      <Rule />
      <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] lg:grid-cols-[240px_1fr] gap-6 md:gap-12 py-10 md:py-14">
        <Eyebrow>{label}</Eyebrow>
        <div>{children}</div>
      </div>
    </FadeUp>
  );
}

function Entry({
  title,
  subtitle,
  meta,
  description,
  highlights,
}: {
  title?: string;
  subtitle?: string;
  meta?: string;
  description?: string;
  highlights?: string[];
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-1 sm:gap-8 py-5 first:pt-0 last:pb-0">
      <div>
        <p className="text-lg" style={{ color: "var(--hero-dark)", lineHeight: 1.3 }}>
          {title}
        </p>
        {subtitle && (
          <p className="text-sm mt-1" style={{ color: "var(--hero-paragraphs)" }}>
            {subtitle}
          </p>
        )}
        {description && (
          <p className="text-sm leading-relaxed mt-3" style={{ maxWidth: 520 }}>
            {description}
          </p>
        )}
        {highlights && highlights.length > 0 && (
          <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1 text-sm leading-relaxed" style={{ maxWidth: 520 }}>
            {highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        )}
      </div>
      {meta && (
        <p className="text-xs uppercase tracking-[2px] sm:text-right sm:pt-1.5" style={{ opacity: 0.55 }}>
          {meta}
        </p>
      )}
    </div>
  );
}

const About = () => {
  const { t, L } = useI18n();
  return (
    <PageLayout>
      {/* Intro — same two-column composition as the template About page */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <MediaOrPlaceholder src={profile.portrait} alt={profile.name} aspectRatio="2/3" label={t("about.portrait")} loading="eager" fetchPriority="high" sizes="(min-width: 768px) 40vw, 100vw" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex flex-col justify-center"
        >
          <Eyebrow className="mb-6">{t("about.eyebrow")}</Eyebrow>
          <h1
            className="text-4xl md:text-5xl mb-8"
            style={{ fontFamily: "'Host Grotesk', sans-serif", color: "var(--hero-dark)", lineHeight: 1.15 }}
          >
            {profile.name}
          </h1>
          <p className="text-sm uppercase tracking-[2px] mb-8" style={{ opacity: 0.6 }}>
            {L(profile.tagline)}
          </p>

          <div className="flex flex-col gap-5 text-base leading-relaxed" style={{ maxWidth: 460 }}>
            {profile.intro.map((paragraph, i) => (
              <p key={i}>{L(paragraph)}</p>
            ))}
          </div>

          <div className="mt-10 text-sm">
            <p className="mb-1">{t("about.forCollab")}</p>
            <a
              href={`mailto:${profile.contact.email}`}
              className="underline hover:opacity-70 transition-opacity"
              style={{ color: "var(--hero-dark)" }}
            >
              {profile.contact.email}
            </a>
            {profile.cv && (
              <div className="mt-8">
                <PillLink href={asset(profile.cv)} external>
                  {t("about.downloadCv")}
                </PillLink>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* CV — editorial sections */}
      <div className="mt-24 md:mt-32">
        <CvSection label={t("about.experience")}>
          <div className="flex flex-col divide-y" style={{ borderColor: "var(--hero-border)" }}>
            {profile.experience.map((e, i) => (
              <Entry
                key={i}
                title={L(e.role)}
                subtitle={[L(e.company), L(e.location)].filter(Boolean).join(" · ") || undefined}
                meta={L(e.period)}
                description={L(e.description)}
              />
            ))}
          </div>
        </CvSection>

        <CvSection label={t("about.education")}>
          <div className="flex flex-col divide-y" style={{ borderColor: "var(--hero-border)" }}>
            {profile.education.map((e, i) => (
              <Entry
                key={i}
                title={L(e.title)}
                subtitle={L(e.institution)}
                meta={L(e.period)}
                description={L(e.description)}
                highlights={e.highlights?.map((h) => L(h) ?? "")}
              />
            ))}
          </div>
        </CvSection>

        <CvSection label={t("about.skills")}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            {profile.skills.map((group, gi) => (
              <div key={gi}>
                <p className="text-sm mb-4" style={{ color: "var(--hero-dark)" }}>
                  {L(group.label)}
                </p>
                <ul className="flex flex-col gap-2 text-sm leading-relaxed">
                  {group.items.map((item, ii) => (
                    <li key={ii}>{L(item)}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CvSection>

        <CvSection label={t("about.languages")}>
          <ul className="flex flex-col">
            {profile.languages.map((l, i) => (
              <li
                key={i}
                className="flex items-baseline justify-between py-4 text-sm"
                style={{ borderTop: i === 0 ? "none" : "1px solid var(--hero-border)" }}
              >
                <span style={{ color: "var(--hero-dark)" }}>{L(l.name)}</span>
                <span className="text-xs uppercase tracking-[2px]" style={{ opacity: 0.55 }}>
                  {L(l.level)}
                </span>
              </li>
            ))}
          </ul>
        </CvSection>

        <FadeUp>
          <Rule />
          <div className="pt-10 md:pt-14 flex flex-col sm:flex-row gap-6 sm:gap-12 text-sm">
            <Link to="/projects" className="underline hover:opacity-70 transition-opacity" style={{ color: "var(--hero-dark)" }}>
              {t("about.viewProjects")}
            </Link>
            <Link to="/certificates" className="underline hover:opacity-70 transition-opacity" style={{ color: "var(--hero-dark)" }}>
              {t("about.viewCertificates")}
            </Link>
            {profile.cv && (
              <a
                href={asset(profile.cv)}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:opacity-70 transition-opacity"
                style={{ color: "var(--hero-dark)" }}
              >
                {t("about.downloadCv")}
              </a>
            )}
          </div>
        </FadeUp>
      </div>
    </PageLayout>
  );
};

export default About;
