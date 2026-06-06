import { InteriorPageTemplate } from "@/components/templates/InteriorPageTemplate";
import { ContentSection } from "@/components/sections/ContentSection";
import { CredibilitySubNav } from "@/components/layout/CredibilitySubNav";
import { SampleContentNotice } from "@/components/marketing/SampleContentNotice";
import { CaseStudyPreviewSection } from "@/components/marketing/CaseStudyCardList";
import { WebPageJsonLd } from "@/components/seo/JsonLd";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { createMetadataFromPageConfig } from "@/lib/seo";
import { getPagePath, getPageSeo } from "@/lib/pages";
import { capabilityStatementContent } from "@/lib/content/capability-statement";

export const metadata = createMetadataFromPageConfig(getPageSeo("capabilities"));

export default function CapabilityStatementPage() {
  const content = capabilityStatementContent;

  return (
    <>
      <WebPageJsonLd
        title="Capability Statement"
        description={content.banner.description}
        path={getPagePath("capabilities")}
      />
      <CredibilitySubNav />
      <InteriorPageTemplate banner={content.banner} cta={content.cta}>
        <ContentSection title="Review notice" alt={false}>
          <SampleContentNotice />
        </ContentSection>

        <ContentSection title={content.companyOverview.title}>
          {content.companyOverview.paragraphs.map((paragraph) => (
            <p
              key={paragraph.slice(0, 32)}
              className="mt-4 first:mt-0 text-base leading-relaxed text-zinc-600"
            >
              {paragraph}
            </p>
          ))}
        </ContentSection>

        <ContentSection title={content.missionStatement.title} alt>
          <blockquote className="rounded-lg border-l-4 border-brand-gold bg-white p-6 text-base leading-relaxed text-zinc-700">
            {content.missionStatement.content}
          </blockquote>
        </ContentSection>

        <ContentSection eyebrow="Core competencies" title="What FTBS delivers">
          <ul className="grid gap-6 md:grid-cols-3">
            {content.coreCompetencies.map((item) => (
              <li key={item.title}>
                <Card>
                  <h3 className="text-lg font-semibold text-brand-navy">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-600">
                    {item.description}
                  </p>
                </Card>
              </li>
            ))}
          </ul>
        </ContentSection>

        <ContentSection title="Differentiators" alt>
          <ul className="grid gap-3 sm:grid-cols-2">
            {content.differentiators.map((item) => (
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

        <ContentSection title="Service areas">
          <ul className="grid gap-4 md:grid-cols-2">
            {content.serviceAreas.map((service) => (
              <li key={service.title}>
                <Card className="shadow-none">
                  <h3 className="text-base font-semibold text-brand-navy">
                    <a href={service.href} className="hover:text-brand-blue">
                      {service.title}
                    </a>
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                    {service.description}
                  </p>
                </Card>
              </li>
            ))}
          </ul>
        </ContentSection>

        <ContentSection title={content.contactInformation.title} alt>
          <dl className="grid gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                General email
              </dt>
              <dd className="mt-1 text-sm text-brand-navy">
                <a href={`mailto:${content.contactInformation.email}`}>
                  {content.contactInformation.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                {content.contactInformation.leadershipName}
              </dt>
              <dd className="mt-1 text-sm text-brand-navy">
                <a href={`mailto:${content.contactInformation.leadershipEmail}`}>
                  {content.contactInformation.leadershipEmail}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                Phone
              </dt>
              <dd className="mt-1 text-sm text-brand-navy">
                <a href={`tel:${content.contactInformation.phone.replace(/\D/g, "")}`}>
                  {content.contactInformation.phone}
                </a>
              </dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                Address
              </dt>
              <dd className="mt-1 text-sm text-brand-navy">
                {content.contactInformation.address}
              </dd>
            </div>
          </dl>
        </ContentSection>

        <ContentSection
          title={content.readiness.title}
          description={content.readiness.description}
        >
          <ul className="grid gap-6 md:grid-cols-2">
            {content.readiness.items.map((item) => (
              <li key={item.title}>
                <Card>
                  <h3 className="text-lg font-semibold text-brand-navy">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-600">
                    {item.description}
                  </p>
                </Card>
              </li>
            ))}
          </ul>
        </ContentSection>

        <ContentSection title={content.downloadCta.title} description={content.downloadCta.description} alt>
          <Button href={content.downloadCta.href}>{content.downloadCta.buttonLabel}</Button>
        </ContentSection>

        <ContentSection title="Sample case studies" alt>
          <CaseStudyPreviewSection />
        </ContentSection>
      </InteriorPageTemplate>
    </>
  );
}
