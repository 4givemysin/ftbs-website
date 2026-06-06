import { InteriorPageTemplate } from "@/components/templates/InteriorPageTemplate";
import { ContentSection } from "@/components/sections/ContentSection";
import { SampleContentNotice } from "@/components/marketing/SampleContentNotice";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { testimonials } from "@/lib/testimonials";
import { createMetadataFromPageConfig } from "@/lib/seo";
import { getPageSeo } from "@/lib/pages";
import { testimonialsPageContent } from "@/lib/content/testimonials-page";

export const metadata = createMetadataFromPageConfig(getPageSeo("testimonials"));

export default function TestimonialsPage() {
  const { banner, intro, cta } = testimonialsPageContent;

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
        <ul className="grid gap-6 lg:grid-cols-2">
          {testimonials.map((item) => (
            <li key={item.id}>
              <Card>
                <Badge variant="default" className="self-start">
                  Sample
                </Badge>
                <blockquote className="mt-4 text-base leading-relaxed text-zinc-700">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>
                <footer className="mt-6 border-t border-border pt-4">
                  <p className="text-sm font-semibold text-brand-navy">
                    {item.name}
                  </p>
                  <p className="mt-1 text-sm text-zinc-500">
                    {item.title}, {item.organization}
                  </p>
                </footer>
              </Card>
            </li>
          ))}
        </ul>
      </ContentSection>
    </InteriorPageTemplate>
  );
}
