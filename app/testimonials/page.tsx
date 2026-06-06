import { InteriorPageTemplate } from "@/components/templates/InteriorPageTemplate";
import { ContentSection } from "@/components/sections/ContentSection";
import { SampleContentNotice } from "@/components/marketing/SampleContentNotice";
import { TestimonialsJsonLd, WebPageJsonLd } from "@/components/seo/JsonLd";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { createMetadataFromPageConfig } from "@/lib/seo";
import { getPagePath, getPageSeo } from "@/lib/pages";
import { testimonialsPageContent } from "@/lib/content/testimonials-page";
import {
  getIndustryLabel,
  getTestimonialsByIndustry,
  successStories,
  testimonialIndustries,
  testimonials,
} from "@/lib/testimonials";

export const metadata = createMetadataFromPageConfig(getPageSeo("testimonials"));

export default function TestimonialsPage() {
  const { banner, intro, cta } = testimonialsPageContent;

  return (
    <>
      <WebPageJsonLd
        title="Testimonials"
        description={banner.description}
        path={getPagePath("testimonials")}
      />
      <TestimonialsJsonLd />
      <InteriorPageTemplate banner={banner} cta={cta}>
        <ContentSection title="Review notice" alt={false}>
          <SampleContentNotice />
        </ContentSection>

        <ContentSection title={intro.title} description={intro.description}>
          <h3 className="text-lg font-semibold text-brand-navy">Featured client quotes</h3>
          <ul className="mt-6 grid gap-6 lg:grid-cols-3">
            {testimonials
              .filter((item) => item.featured)
              .map((item) => (
                <li key={item.id}>
                  <Card>
                    <Badge variant="default">Sample</Badge>
                    <blockquote className="mt-4 text-sm leading-relaxed text-zinc-700">
                      &ldquo;{item.quote}&rdquo;
                    </blockquote>
                    <footer className="mt-6 border-t border-border pt-4">
                      <p className="text-sm font-semibold text-brand-navy">{item.name}</p>
                      <p className="mt-1 text-xs text-zinc-500">
                        {item.title}, {item.organization}
                      </p>
                    </footer>
                  </Card>
                </li>
              ))}
          </ul>
        </ContentSection>

        {testimonialIndustries.map((industry, index) => (
          <ContentSection
            key={industry.id}
            title={industry.label}
            alt={index % 2 === 1}
          >
            <ul className="grid gap-6 md:grid-cols-2">
              {getTestimonialsByIndustry(industry.id).map((item) => (
                <li key={item.id}>
                  <Card>
                    <Badge variant="default">Sample / Demo</Badge>
                    <blockquote className="mt-4 text-sm leading-relaxed text-zinc-700">
                      &ldquo;{item.quote}&rdquo;
                    </blockquote>
                    <footer className="mt-6 border-t border-border pt-4">
                      <p className="text-sm font-semibold text-brand-navy">{item.name}</p>
                      <p className="mt-1 text-xs text-zinc-500">
                        {item.title}, {item.organization}
                      </p>
                      <p className="mt-2 text-xs text-brand-blue">
                        {getIndustryLabel(item.industry)}
                      </p>
                    </footer>
                  </Card>
                </li>
              ))}
            </ul>
          </ContentSection>
        ))}

        <ContentSection title="Success stories" description="Sample narratives summarizing representative engagement outcomes.">
          <ul className="grid gap-6 md:grid-cols-3">
            {successStories.map((story) => (
              <li key={story.id}>
                <Card>
                  <Badge variant="default">Sample</Badge>
                  <h3 className="mt-4 text-lg font-semibold text-brand-navy">
                    {story.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-600">
                    {story.summary}
                  </p>
                  <p className="mt-4 text-xs text-brand-blue">
                    {getIndustryLabel(story.industry)}
                  </p>
                </Card>
              </li>
            ))}
          </ul>
        </ContentSection>
      </InteriorPageTemplate>
    </>
  );
}
