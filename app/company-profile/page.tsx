import { InteriorPageTemplate } from "@/components/templates/InteriorPageTemplate";
import { ContentSection } from "@/components/sections/ContentSection";
import { CredibilitySubNav } from "@/components/layout/CredibilitySubNav";
import { SampleContentNotice } from "@/components/marketing/SampleContentNotice";
import { WebPageJsonLd } from "@/components/seo/JsonLd";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { createMetadataFromPageConfig } from "@/lib/seo";
import { getPagePath, getPageSeo } from "@/lib/pages";
import { routes } from "@/lib/routes";
import { companyProfileContent } from "@/lib/content/company-profile";

export const metadata = createMetadataFromPageConfig(getPageSeo("companyProfile"));

export default function CompanyProfilePage() {
  const content = companyProfileContent;

  return (
    <>
      <WebPageJsonLd
        title="Company Profile"
        description={content.banner.description}
        path={getPagePath("companyProfile")}
      />
      <CredibilitySubNav />
      <InteriorPageTemplate banner={content.banner} cta={content.cta}>
        <ContentSection title="Review notice" alt={false}>
          <SampleContentNotice />
        </ContentSection>

        <ContentSection title={content.executiveOverview.title}>
          {content.executiveOverview.paragraphs.map((paragraph) => (
            <p
              key={paragraph.slice(0, 32)}
              className="mt-4 first:mt-0 text-base leading-relaxed text-zinc-600"
            >
              {paragraph}
            </p>
          ))}
          <div className="mt-8">
            <Button href={`${routes.about.path}#leadership-resume`} variant="outline">
              View Paul Gibbs — Full Resume
            </Button>
          </div>
        </ContentSection>

        <ContentSection title={content.companyHistory.title} alt>
          {content.companyHistory.paragraphs.map((paragraph) => (
            <p
              key={paragraph.slice(0, 32)}
              className="mt-4 first:mt-0 text-base leading-relaxed text-zinc-600"
            >
              {paragraph}
            </p>
          ))}
        </ContentSection>

        <ContentSection title={content.servicesOverview.title}>
          <ul className="grid gap-4 md:grid-cols-2">
            {content.servicesOverview.items.map((service) => (
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

        <ContentSection title={content.growthVision.title} alt>
          {content.growthVision.paragraphs.map((paragraph) => (
            <p
              key={paragraph.slice(0, 32)}
              className="mt-4 first:mt-0 text-base leading-relaxed text-zinc-600"
            >
              {paragraph}
            </p>
          ))}
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {content.growthVision.goals.map((goal) => (
              <li
                key={goal}
                className="rounded-lg border border-border bg-white px-4 py-3 text-sm text-zinc-700"
              >
                {goal}
              </li>
            ))}
          </ul>
        </ContentSection>

        <ContentSection
          title={content.downloadCta.title}
          description={content.downloadCta.description}
        >
          <Button href={content.downloadCta.href}>{content.downloadCta.buttonLabel}</Button>
        </ContentSection>
      </InteriorPageTemplate>
    </>
  );
}
