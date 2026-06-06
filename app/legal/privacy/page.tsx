import { InteriorPageTemplate } from "@/components/templates/InteriorPageTemplate";
import { ContentSection } from "@/components/sections/ContentSection";
import { LegalDocument } from "@/components/legal/LegalDocument";
import { WebPageJsonLd } from "@/components/seo/JsonLd";
import { createMetadataFromPageConfig } from "@/lib/seo";
import { getPagePath, getPageSeo } from "@/lib/pages";
import { privacyPolicyContent } from "@/lib/content/legal";

export const metadata = createMetadataFromPageConfig(getPageSeo("privacy"));

export default function PrivacyPolicyPage() {
  const { banner, lastUpdated, intro, sections, relatedLinks } = privacyPolicyContent;

  return (
    <>
      <WebPageJsonLd
        title="Privacy Policy"
        description={banner.description}
        path={getPagePath("privacy")}
      />
      <InteriorPageTemplate banner={banner}>
        <ContentSection title="Privacy Policy" alt={false}>
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
