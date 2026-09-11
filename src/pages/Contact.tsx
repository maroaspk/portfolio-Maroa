import { PageLayout } from "@/components/ui/page-layout";
import { FadeUp, SectionHeading } from "@/components/ui/editorial";
import { ContactLinks } from "@/components/ui/contact-links";
import { profile } from "@/lib/profile";
import { asset } from "@/lib/assets";

const Contact = () => {
  return (
    <PageLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
        <FadeUp>
          <SectionHeading eyebrow="Contact" title="Let's talk" />
          <p className="text-base leading-relaxed mt-8" style={{ maxWidth: 400 }}>
            Open to collaborations in communication, public relations, brand strategy, content
            and events. Drop me a line and I'll get back to you.
          </p>
          <p className="text-xs uppercase tracking-[3px] mt-8" style={{ opacity: 0.6 }}>
            {profile.location}
          </p>
          {profile.cv && (
            <p className="mt-8 text-sm">
              <a
                href={asset(profile.cv)}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:opacity-70 transition-opacity"
                style={{ color: "var(--hero-dark)" }}
              >
                Download CV (PDF)
              </a>
            </p>
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
