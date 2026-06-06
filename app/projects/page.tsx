import { InteriorPageTemplate } from "@/components/templates/InteriorPageTemplate";
import { ContentSection } from "@/components/sections/ContentSection";
import { SampleContentNotice } from "@/components/marketing/SampleContentNotice";
import { ProjectPortfolio } from "@/components/marketing/ProjectPortfolio";
import { TestimonialsSection } from "@/components/marketing/TestimonialsSection";
import { createMetadataFromPageConfig } from "@/lib/seo";
import { getPageSeo } from "@/lib/pages";
import { projectsPageContent } from "@/lib/content/projects-page";

export const metadata = createMetadataFromPageConfig(getPageSeo("projects"));

export default function ProjectsPage() {
  const { banner, intro, cta } = projectsPageContent;

  return (
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
        <ProjectPortfolio />
      </ContentSection>

      <TestimonialsSection alt showViewAll={false} limit={3} />
    </InteriorPageTemplate>
  );
}
