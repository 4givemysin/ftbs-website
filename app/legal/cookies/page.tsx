import { InteriorPageTemplate } from "@/components/templates/InteriorPageTemplate";
import { ContentSection } from "@/components/sections/ContentSection";
import { LegalDocument } from "@/components/legal/LegalDocument";
import { WebPageJsonLd } from "@/components/seo/JsonLd";
import { createMetadataFromPageConfig } from "@/lib/seo";
import { getPagePath, getPageSeo } from "@/lib/pages";
import { cookiePolicyContent } from "@/lib/content/legal";

export const metadata = createMetadataFromPageConfig(getPageSeo("cookies"));

export default function CookiePolicyPage() {
  const { banner, lastUpdated, intro, sections, relatedLinks } = cookiePolicyContent;

  return (
    <>
      <WebPageJsonLd
        title="Cookie Policy"
        description={banner.description}
        path={getPagePath("cookies")}
      />
      <InteriorPageTemplate banner={banner}>
        <ContentSection title="Cookie Policy" alt={false}>
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
