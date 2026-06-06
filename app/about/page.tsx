import { InteriorPageTemplate } from "@/components/templates/InteriorPageTemplate";
import { ContentSection } from "@/components/sections/ContentSection";
import { AboutSubNav } from "@/components/layout/AboutSubNav";
import { TestimonialsSection } from "@/components/marketing/TestimonialsSection";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { createMetadataFromPageConfig } from "@/lib/seo";
import { getPageSeo } from "@/lib/pages";
import { routes } from "@/lib/routes";
import { aboutContent } from "@/lib/content/about";

export const metadata = createMetadataFromPageConfig(getPageSeo("about"));

export default function AboutPage() {
  const { banner, whoWeAre, bgw, missionItems, leadership, cta } = aboutContent;

  return (
    <>
      <AboutSubNav />
      <InteriorPageTemplate banner={banner} cta={cta}>
      <ContentSection title={whoWeAre.title} alt={false}>
        <div className="mt-0 grid gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            {whoWeAre.paragraphs.map((paragraph) => (
              <p
                key={paragraph.slice(0, 24)}
                className="mt-4 first:mt-0 text-base leading-relaxed text-zinc-600"
              >
                {paragraph}
              </p>
            ))}
          </div>
          <Card className="bg-surface-alt shadow-none">
            <h2 className="text-lg font-semibold text-brand-navy">{bgw.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-600">{bgw.focus}</p>
            <p className="mt-4 text-sm leading-relaxed text-zinc-600">{bgw.paragraph}</p>
          </Card>
        </div>
      </ContentSection>

      <ContentSection
        eyebrow="Purpose"
        title="Mission, vision, and values"
        description="Our work is grounded in professional standards and a belief that infrastructure and technology should create durable benefit."
        alt
      >
        <ul className="mt-0 grid gap-6 md:grid-cols-3">
          {missionItems.map((item) => (
            <li key={item.title}>
              <Card>
                <h3 className="text-lg font-semibold text-brand-navy">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-600">
                  {item.content}
                </p>
              </Card>
            </li>
          ))}
        </ul>
      </ContentSection>

      <ContentSection
        eyebrow="Credentials"
        title="Company credibility resources"
        description="Review FTBS capability statement, certifications, and company profile materials for procurement and partnership evaluation."
        alt
      >
        <div className="flex flex-wrap gap-3">
          <Button href={routes.capabilities.path} variant="outline">
            Capability Statement
          </Button>
          <Button href={routes.certifications.path} variant="outline">
            Certifications
          </Button>
          <Button href={routes.companyProfile.path} variant="outline">
            Company Profile
          </Button>
        </div>
      </ContentSection>

      <TestimonialsSection alt={false} />

      <ContentSection
        eyebrow={leadership.eyebrow}
        title={leadership.title}
        description={leadership.description}
        alt
      >
        <Card className="mt-0 lg:p-8">
          {leadership.paragraphs.map((paragraph) => (
            <p
              key={paragraph.slice(0, 24)}
              className="mt-4 first:mt-0 text-base leading-relaxed text-zinc-700"
            >
              {paragraph}
            </p>
          ))}
        </Card>
      </ContentSection>
    </InteriorPageTemplate>
    </>
  );
}
