import { MarketingPageTemplate } from "@/components/templates/MarketingPageTemplate";
import { ContentSection } from "@/components/sections/ContentSection";
import { ServicesGrid } from "@/components/marketing/ServicesGrid";
import { CaseStudiesSection } from "@/components/marketing/CaseStudiesSection";
import { TestimonialsSection } from "@/components/marketing/TestimonialsSection";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { createMetadataFromPageConfig } from "@/lib/seo";
import { getPageSeo } from "@/lib/pages";
import { routes } from "@/lib/routes";
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

      <CaseStudiesSection limit={3} alt />

      <TestimonialsSection alt={false} />

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
        alt
      >
        <blockquote className="rounded-lg border-l-4 border-brand-gold bg-surface-alt p-6 text-base leading-relaxed text-zinc-700">
          {bgw.quote}
        </blockquote>
        <p className="mt-4 text-sm font-semibold text-brand-navy">
          — Paul Gibbs, President, BGW Construction Company
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href={routes.capabilities.path} variant="outline">
            View Capability Statement
          </Button>
          <Button href={routes.projects.path} variant="outline">
            View Projects
          </Button>
        </div>
      </ContentSection>
    </MarketingPageTemplate>
  );
}
