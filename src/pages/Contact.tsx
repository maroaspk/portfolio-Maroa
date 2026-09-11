import { PageLayout } from "@/components/ui/page-layout";
import { FadeUp, SectionHeading } from "@/components/ui/editorial";
import { ContactLinks } from "@/components/ui/contact-links";
import { profile } from "@/lib/profile";
import { PillLink } from "@/components/ui/pill-link";
import { asset } from "@/lib/assets";
import { useI18n } from "@/lib/i18n";

const Contact = () => {
  const { t } = useI18n();
  return (
    <PageLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
        <FadeUp>
          <SectionHeading eyebrow={t("contact.eyebrow")} title={t("contact.title")} />
          <p className="text-base leading-relaxed mt-8" style={{ maxWidth: 400 }}>
            {t("contact.intro")}
          </p>
          <p className="text-xs uppercase tracking-[3px] mt-8" style={{ opacity: 0.6 }}>
            {profile.location}
          </p>
          {profile.cv && (
            <div className="mt-8">
              <PillLink href={asset(profile.cv)} external size="sm">
                {t("about.downloadCv")}
              </PillLink>
            </div>
          )}
        </FadeUp>

        <div className="md:pt-16">
          <ContactLinks />
        </div>
      </div>
    </PageLayout>
  );
};

export default Contact;
