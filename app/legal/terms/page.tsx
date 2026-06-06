import { InteriorPageTemplate } from "@/components/templates/InteriorPageTemplate";
import { ContentSection } from "@/components/sections/ContentSection";
import { LegalDocument } from "@/components/legal/LegalDocument";
import { WebPageJsonLd } from "@/components/seo/JsonLd";
import { createMetadataFromPageConfig } from "@/lib/seo";
import { getPagePath, getPageSeo } from "@/lib/pages";
import { termsOfServiceContent } from "@/lib/content/legal";

export const metadata = createMetadataFromPageConfig(getPageSeo("terms"));

export default function TermsOfServicePage() {
  const { banner, lastUpdated, intro, sections, relatedLinks } = termsOfServiceContent;

  return (
    <>
      <WebPageJsonLd
        title="Terms of Service"
        description={banner.description}
        path={getPagePath("terms")}
      />
      <InteriorPageTemplate banner={banner}>
        <ContentSection title="Terms of Service" alt={false}>
          <LegalDocument
            lastUpdated={lastUpdated}
            intro={intro}
            sections={sections}
            relatedLinks={relatedLinks}
          />
        </ContentSection>
      </InteriorPageTemplate>
    </>
  );
}
