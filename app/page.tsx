import { MarketingPageTemplate } from "@/components/templates/MarketingPageTemplate";
import { ContentSection } from "@/components/sections/ContentSection";
import { ServicesGrid } from "@/components/marketing/ServicesGrid";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { createMetadataFromPageConfig } from "@/lib/seo";
import { getPageSeo } from "@/lib/pages";
import { homeContent } from "@/lib/content/home";

export const metadata = createMetadataFromPageConfig(getPageSeo("home"));

export default function HomePage() {
  const { hero, credentials, values, bgw } = homeContent;

  return (
    <MarketingPageTemplate hero={hero}>
      <Section alt>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {credentials.map((item) => (
            <Card key={item} className="px-4 py-5 text-center shadow-none">
              <p className="text-sm font-semibold text-brand-navy">{item}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section>
        <ServicesGrid limit={4} />
      </Section>

      <ContentSection
        eyebrow="Why FTBS"
        title="Professional delivery for construction and technology needs"
        description="We support partners who need more than a contractor — they need a team that understands accountability, communication, and long-term impact."
        alt
      >
        <ul className="grid gap-6 sm:grid-cols-2">
          {values.map((value) => (
            <li key={value.title}>
              <Card>
                <h3 className="text-lg font-semibold text-brand-navy">
                  {value.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-600">
                  {value.description}
                </p>
              </Card>
            </li>
          ))}
        </ul>
      </ContentSection>

      <ContentSection
        eyebrow={bgw.eyebrow}
        title={bgw.title}
        description={bgw.description}
      >
        <blockquote className="rounded-lg border-l-4 border-brand-gold bg-surface-alt p-6 text-base leading-relaxed text-zinc-700">
          {bgw.quote}
        </blockquote>
      </ContentSection>
    </MarketingPageTemplate>
  );
}
