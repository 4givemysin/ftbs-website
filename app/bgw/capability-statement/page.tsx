import { ContentSection } from "@/components/sections/ContentSection";
import { BgwPageTemplate } from "@/components/bgw/BgwPageTemplate";
import { BgwParentLink } from "@/components/bgw/DivisionServiceGrid";
import { LeadershipProfile } from "@/components/marketing/LeadershipProfile";
import { SampleContentNotice } from "@/components/marketing/SampleContentNotice";
import { WebPageJsonLd } from "@/components/seo/JsonLd";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { bgwBreadcrumbs } from "@/lib/bgw/breadcrumbs";
import { bgwCapabilityContent } from "@/lib/content/bgw/capability-statement";
import { createMetadataFromPageConfig } from "@/lib/seo";
import { getPagePath, getPageSeo } from "@/lib/pages";

export const metadata = createMetadataFromPageConfig(getPageSeo("bgwCapabilityStatement"));

export default function BgwCapabilityStatementPage() {
  const content = bgwCapabilityContent;

  return (
    <>
      <WebPageJsonLd
        title="BGW Construction Capability Statement"
        description={content.banner.description}
        path={getPagePath("bgwCapabilityStatement")}
      />
      <BgwPageTemplate banner={content.banner} breadcrumbs={bgwBreadcrumbs({ name: "Capability Statement", path: getPagePath("bgwCapabilityStatement") })} cta={content.cta}>
        <ContentSection title="Review notice" alt={false}>
          <SampleContentNotice />
        </ContentSection>

        <ContentSection title={content.overview.title}>
          {content.overview.paragraphs.map((p) => (
            <p key={p.slice(0, 32)} className="mt-4 first:mt-0 text-base leading-relaxed text-zinc-600">
              {p}
            </p>
          ))}
        </ContentSection>

        <ContentSection
          eyebrow="Leadership"
          title="Executive qualifications"
          description="Verified certifications, registrations, and career highlights from BGW leadership."
          alt
        >
          <LeadershipProfile variant="detailed" />
        </ContentSection>

        <ContentSection title="Core competencies" alt>
          <ul className="grid gap-6 md:grid-cols-2">
            {content.coreCompetencies.map((item) => (
              <li key={item.title}>
                <Card>
                  <h3 className="text-lg font-semibold text-brand-navy">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-600">{item.description}</p>
                </Card>
              </li>
            ))}
          </ul>
        </ContentSection>

        <ContentSection title="Differentiators">
          <ul className="grid gap-3 sm:grid-cols-2">
            {content.differentiators.map((item) => (
              <li
                key={item}
                className="flex gap-3 rounded-lg border border-border bg-white px-4 py-3 text-sm text-zinc-700"
              >
                <span aria-hidden className="mt-0.5 text-bgw-green">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
        </ContentSection>

        <ContentSection title={content.readiness.title} alt>
          <ul className="grid gap-6 md:grid-cols-3">
            {content.readiness.items.map((item) => (
              <li key={item.title}>
                <Card>
                  <h3 className="text-lg font-semibold text-brand-navy">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-600">{item.description}</p>
                </Card>
              </li>
            ))}
          </ul>
        </ContentSection>

        <ContentSection title={content.downloadCta.title} description={content.downloadCta.description}>
          <Button href={content.downloadCta.href}>{content.downloadCta.buttonLabel}</Button>
        </ContentSection>

        <ContentSection title="FTBS corporate context" alt>
          <BgwParentLink />
        </ContentSection>
      </BgwPageTemplate>
    </>
  );
}
