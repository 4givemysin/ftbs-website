import { InteriorPageTemplate } from "@/components/templates/InteriorPageTemplate";
import { ContentSection } from "@/components/sections/ContentSection";
import { AboutSubNav } from "@/components/layout/AboutSubNav";
import { SampleContentNotice } from "@/components/marketing/SampleContentNotice";
import { CertificationGrid } from "@/components/marketing/CertificationGrid";
import { createMetadataFromPageConfig } from "@/lib/seo";
import { getPageSeo } from "@/lib/pages";
import { certificationsPageContent } from "@/lib/content/certifications-page";

export const metadata = createMetadataFromPageConfig(getPageSeo("certifications"));

export default function CertificationsPage() {
  const { banner, intro, cta } = certificationsPageContent;

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

        <ContentSection title={intro.title} description={intro.description}>
          <CertificationGrid />
        </ContentSection>
      </InteriorPageTemplate>
    </>
  );
}
