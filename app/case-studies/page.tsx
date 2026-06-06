import { InteriorPageTemplate } from "@/components/templates/InteriorPageTemplate";
import { ContentSection } from "@/components/sections/ContentSection";
import { CredibilitySubNav } from "@/components/layout/CredibilitySubNav";
import { SampleContentNotice } from "@/components/marketing/SampleContentNotice";
import { CaseStudyCardList } from "@/components/marketing/CaseStudyCardList";
import { CaseStudyItemListJsonLd, WebPageJsonLd } from "@/components/seo/JsonLd";
import { createMetadataFromPageConfig } from "@/lib/seo";
import { getPagePath, getPageSeo } from "@/lib/pages";
import { caseStudiesPageContent } from "@/lib/content/case-studies-page";

export const metadata = createMetadataFromPageConfig(getPageSeo("caseStudies"));

export default function CaseStudiesPage() {
  const { banner, intro, cta } = caseStudiesPageContent;

  return (
    <>
      <WebPageJsonLd
        title="Case Studies"
        description={banner.description}
        path={getPagePath("caseStudies")}
      />
      <CaseStudyItemListJsonLd />
      <CredibilitySubNav />
      <InteriorPageTemplate banner={banner} cta={cta}>
        <ContentSection title="Review notice" alt={false}>
          <SampleContentNotice />
        </ContentSection>

        <ContentSection title={intro.title} description={intro.description}>
          <CaseStudyCardList />
        </ContentSection>
      </InteriorPageTemplate>
    </>
  );
}
