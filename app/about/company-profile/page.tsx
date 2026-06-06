import { InteriorPageTemplate } from "@/components/templates/InteriorPageTemplate";
import { ContentSection } from "@/components/sections/ContentSection";
import { AboutSubNav } from "@/components/layout/AboutSubNav";
import { SampleContentNotice } from "@/components/marketing/SampleContentNotice";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { createMetadataFromPageConfig } from "@/lib/seo";
import { getPageSeo } from "@/lib/pages";
import { companyProfileContent } from "@/lib/content/company-profile";

export const metadata = createMetadataFromPageConfig(getPageSeo("companyProfile"));

export default function CompanyProfilePage() {
  const { banner, packages, includes, cta } = companyProfileContent;

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

        <ContentSection
          eyebrow="Download packages"
          title="Procurement-ready materials"
          description="PDF generation and automated downloads are planned for a future phase. Use the contact links below to request current documentation."
        >
          <ul className="grid gap-6 lg:grid-cols-3">
            {packages.map((pkg) => (
              <li key={pkg.title}>
                <Card className="flex h-full flex-col">
                  <h3 className="text-lg font-semibold text-brand-navy">
                    {pkg.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-600">
                    {pkg.description}
                  </p>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-brand-gold">
                    {pkg.status}
                  </p>
                  <div className="mt-6">
                    <Button href={pkg.actionHref} variant="outline">
                      {pkg.actionLabel}
                    </Button>
                  </div>
                </Card>
              </li>
            ))}
          </ul>
        </ContentSection>

        <ContentSection
          title="Typical company profile contents"
          description="Packages can be tailored for solicitations, vendor registration, and partner review."
          alt
        >
          <ul className="grid gap-3 sm:grid-cols-2">
            {includes.map((item) => (
              <li
                key={item}
                className="rounded-lg border border-border bg-white px-4 py-3 text-sm text-zinc-700"
              >
                {item}
              </li>
            ))}
          </ul>
        </ContentSection>
      </InteriorPageTemplate>
    </>
  );
}
