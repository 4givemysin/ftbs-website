import { InteriorPageTemplate } from "@/components/templates/InteriorPageTemplate";
import { ContentSection } from "@/components/sections/ContentSection";
import { SampleContentNotice } from "@/components/marketing/SampleContentNotice";
import { ProjectPortfolioSections } from "@/components/marketing/ProjectPortfolioSections";
import { TestimonialsSection } from "@/components/marketing/TestimonialsSection";
import { PortfolioItemListJsonLd, WebPageJsonLd } from "@/components/seo/JsonLd";
import { Card } from "@/components/ui/Card";
import { createMetadataFromPageConfig } from "@/lib/seo";
import { getPagePath, getPageSeo } from "@/lib/pages";
import { projectsPageContent } from "@/lib/content/projects-page";
import { portfolioImpactSummary } from "@/lib/projects";

export const metadata = createMetadataFromPageConfig(getPageSeo("projects"));

export default function ProjectsPage() {
  const { banner, intro, resultsSection, cta } = projectsPageContent;

  return (
    <>
      <WebPageJsonLd
        title="Projects Portfolio"
        description={banner.description}
        path={getPagePath("projects")}
      />
      <PortfolioItemListJsonLd />
      <InteriorPageTemplate banner={banner} cta={cta}>
        <ContentSection title="Review notice" alt={false}>
          <SampleContentNotice />
        </ContentSection>

        <ContentSection title={intro.title} description={intro.description}>
          <ProjectPortfolioSections />
        </ContentSection>

        <ContentSection
          eyebrow={resultsSection.eyebrow}
          title={resultsSection.title}
          description={resultsSection.description}
          alt
        >
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {portfolioImpactSummary.map((item) => (
              <li key={item.label}>
                <Card className="text-center shadow-none">
                  <p className="text-2xl font-bold text-brand-navy">{item.value}</p>
                  <p className="mt-2 text-xs uppercase tracking-wide text-zinc-500">
                    {item.label}
                  </p>
                </Card>
              </li>
            ))}
          </ul>
        </ContentSection>

        <TestimonialsSection alt={false} showViewAll limit={3} />
      </InteriorPageTemplate>
    </>
  );
}
