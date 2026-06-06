import { InteriorPageTemplate } from "@/components/templates/InteriorPageTemplate";
import { ContentSection } from "@/components/sections/ContentSection";
import { CredibilitySubNav } from "@/components/layout/CredibilitySubNav";
import { SampleContentNotice } from "@/components/marketing/SampleContentNotice";
import { CertificationGrid } from "@/components/marketing/CertificationGrid";
import { WebPageJsonLd } from "@/components/seo/JsonLd";
import { createMetadataFromPageConfig } from "@/lib/seo";
import { getPagePath, getPageSeo } from "@/lib/pages";
import { certificationsPageContent } from "@/lib/content/certifications-page";

export const metadata = createMetadataFromPageConfig(getPageSeo("certifications"));

export default function CertificationsPage() {
  const { banner, intro, cta } = certificationsPageContent;

  return (
    <>
      <WebPageJsonLd
        title="Certifications"
        description={banner.description}
        path={getPagePath("certifications")}
      />
      <CredibilitySubNav />
      <InteriorPageTemplate banner={banner} cta={cta}>
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
