import { ContentSection } from "@/components/sections/ContentSection";
import { BgwPageTemplate } from "@/components/bgw/BgwPageTemplate";
import { ProjectGallery } from "@/components/bgw/ProjectGallery";
import { SampleContentNotice } from "@/components/marketing/SampleContentNotice";
import { WebPageJsonLd } from "@/components/seo/JsonLd";
import { bgwBreadcrumbs } from "@/lib/bgw/breadcrumbs";
import { createMetadataFromPageConfig } from "@/lib/seo";
import { getPagePath, getPageSeo } from "@/lib/pages";
import { routes } from "@/lib/routes";

export const metadata = createMetadataFromPageConfig(getPageSeo("bgwProjects"));

export default function BgwProjectsPage() {
  return (
    <>
      <WebPageJsonLd
        title="BGW Project Gallery"
        description="Sample BGW Construction project gallery across infrastructure, commercial, and residential categories."
        path={getPagePath("bgwProjects")}
      />
      <BgwPageTemplate
        banner={{
          eyebrow: "BGW Construction",
          title: "Project Gallery",
          description:
            "Representative sample projects across BGW Construction infrastructure, commercial, and residential work. Approved photography will replace placeholders.",
          primaryCta: { label: "Construction Inquiry", href: routes.bgwInquiry.path },
          secondaryCta: { label: "Capability Statement", href: routes.bgwCapabilityStatement.path },
        }}
        breadcrumbs={bgwBreadcrumbs({ name: "Project Gallery", path: routes.bgwProjects.path })}
        cta={{
          title: "Discuss a project like these",
          description: "Share your infrastructure or construction scope with the BGW team.",
          primaryHref: routes.bgwInquiry.path,
        }}
      >
        <ContentSection title="Review notice" alt={false}>
          <SampleContentNotice />
        </ContentSection>
        <ContentSection
          title="BGW project profiles"
          description="Filter by infrastructure, commercial, or residential categories."
        >
          <ProjectGallery />
        </ContentSection>
      </BgwPageTemplate>
    </>
  );
}
