import { InteriorPageTemplate } from "@/components/templates/InteriorPageTemplate";
import { ContentSection } from "@/components/sections/ContentSection";
import { AboutSubNav } from "@/components/layout/AboutSubNav";
import { SampleContentNotice } from "@/components/marketing/SampleContentNotice";
import { CaseStudiesSection } from "@/components/marketing/CaseStudiesSection";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { createMetadataFromPageConfig } from "@/lib/seo";
import { getPageSeo } from "@/lib/pages";
import { capabilitiesContent } from "@/lib/content/capabilities";

export const metadata = createMetadataFromPageConfig(getPageSeo("capabilities"));

export default function CapabilitiesPage() {
  const {
    banner,
    overview,
    coreCompetencies,
    differentiators,
    pastPerformance,
    naicsPreview,
    downloadCta,
    cta,
  } = capabilitiesContent;

  return (
    <>
      <AboutSubNav />
      <InteriorPageTemplate
        banner={banner}
        cta={{
          title: cta.title,
          description: cta.description,
          primaryLabel: cta.primaryLabel,
          primaryHref: cta.primaryHref,
          secondaryLabel: cta.secondaryLabel,
          secondaryHref: cta.secondaryHref,
        }}
      >
        <ContentSection title="Review notice" alt={false}>
          <SampleContentNotice />
        </ContentSection>

        <ContentSection title={overview.title}>
          {overview.paragraphs.map((paragraph) => (
            <p
              key={paragraph.slice(0, 32)}
              className="mt-4 first:mt-0 text-base leading-relaxed text-zinc-600"
            >
              {paragraph}
            </p>
          ))}
        </ContentSection>

        <ContentSection
          eyebrow="Core competencies"
          title="Construction and technology capabilities"
          alt
        >
          <ul className="grid gap-6 md:grid-cols-3">
            {coreCompetencies.map((item) => (
              <li key={item.title}>
                <Card>
                  <h3 className="text-lg font-semibold text-brand-navy">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-600">
                    {item.description}
                  </p>
                </Card>
              </li>
            ))}
          </ul>
        </ContentSection>

        <ContentSection title="Differentiators">
          <ul className="grid gap-3 sm:grid-cols-2">
            {differentiators.map((item) => (
              <li
                key={item}
                className="flex gap-3 rounded-lg border border-border bg-white px-4 py-3 text-sm text-zinc-700"
              >
                <span aria-hidden className="mt-0.5 text-brand-gold">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
        </ContentSection>

        <ContentSection
          title={pastPerformance.title}
          description={pastPerformance.description}
          alt
        >
          <Button href={pastPerformance.linkHref} variant="outline">
            {pastPerformance.linkLabel}
          </Button>
        </ContentSection>

        <CaseStudiesSection limit={3} alt={false} />

        <ContentSection
          title={naicsPreview.title}
          description={naicsPreview.description}
          alt
        >
          <ul className="grid gap-4 sm:grid-cols-2">
            {naicsPreview.codes.map((item) => (
              <li key={item.code}>
                <Card className="shadow-none">
                  <p className="text-sm font-bold text-brand-navy">{item.code}</p>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                    {item.label}
                  </p>
                </Card>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-zinc-500">{naicsPreview.note}</p>
        </ContentSection>

        <ContentSection title={downloadCta.title} description={downloadCta.description}>
          <Button href={downloadCta.href}>{downloadCta.buttonLabel}</Button>
        </ContentSection>
      </InteriorPageTemplate>
    </>
  );
}
