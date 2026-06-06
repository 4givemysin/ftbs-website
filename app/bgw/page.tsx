import { ContentSection } from "@/components/sections/ContentSection";
import { BgwPageTemplate } from "@/components/bgw/BgwPageTemplate";
import {
  DivisionServiceGrid,
  InfrastructurePillars,
} from "@/components/bgw/DivisionServiceGrid";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { PresidentLetter } from "@/components/marketing/PresidentLetter";
import { LeadershipProfile } from "@/components/marketing/LeadershipProfile";
import { bgwGalleryItems, getCategoryLabel } from "@/lib/bgw/gallery";
import { routes } from "@/lib/routes";
import { WebPageJsonLd } from "@/components/seo/JsonLd";
import { bgwBreadcrumbs } from "@/lib/bgw/breadcrumbs";
import { bgwHomeContent } from "@/lib/content/bgw/home";
import { createMetadataFromPageConfig } from "@/lib/seo";
import { getPagePath, getPageSeo } from "@/lib/pages";

export const metadata = createMetadataFromPageConfig(getPageSeo("bgw"));

export default function BgwHomePage() {
  const { hero, pillars, partners, seeks, galleryPreview, cta } = bgwHomeContent;

  return (
    <>
      <WebPageJsonLd
        title="BGW Construction Company"
        description={hero.description}
        path={getPagePath("bgw")}
      />
      <BgwPageTemplate
        banner={hero}
        breadcrumbs={bgwBreadcrumbs({ name: "Overview", path: routes.bgw.path })}
        cta={cta}
      >
        <ContentSection
          eyebrow="Leadership"
          title="Division leadership"
          description="BGW Construction is led by Paul Gibbs with regional project management, field supervision, and hands-on construction experience."
          alt={false}
        >
          <LeadershipProfile variant="compact" />
        </ContentSection>

        <ContentSection
          eyebrow="Service areas"
          title="Construction verticals"
          description="Explore BGW Construction service areas for infrastructure, commercial, residential, and future development programs."
          alt
        >
          <DivisionServiceGrid />
        </ContentSection>

        <ContentSection eyebrow="Mission" title={pillars.title} description={pillars.description}>
          <InfrastructurePillars items={pillars.items} />
        </ContentSection>

        <ContentSection title={partners.title} description={partners.description} alt>
          <ul className="grid gap-4 sm:grid-cols-2">
            {partners.items.map((item) => (
              <li key={item}>
                <Card className="shadow-none">{item}</Card>
              </li>
            ))}
          </ul>
        </ContentSection>

        <ContentSection title={seeks.title} description={seeks.description}>
          <ul className="grid gap-3 sm:grid-cols-2">
            {seeks.items.map((item) => (
              <li
                key={item}
                className="rounded-lg border border-border bg-white px-4 py-3 text-sm text-zinc-700"
              >
                {item}
              </li>
            ))}
          </ul>
        </ContentSection>

        <ContentSection title={galleryPreview.title} description={galleryPreview.description} alt>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {bgwGalleryItems.slice(0, 3).map((item) => (
              <li key={item.id}>
                <Card className="flex h-full flex-col overflow-hidden p-0">
                  <div
                    className="aspect-[4/3] bg-gradient-to-br from-bgw-earth/80 via-brand-navy/70 to-bgw-green/60"
                    role="img"
                    aria-label={`Sample project: ${item.title}`}
                  />
                  <div className="p-5">
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="default">Sample</Badge>
                      <Badge variant="construction">{getCategoryLabel(item.category)}</Badge>
                    </div>
                    <h3 className="mt-3 text-base font-semibold text-brand-navy">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-600">{item.caption}</p>
                  </div>
                </Card>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Button href={galleryPreview.href} variant="outline">
              View Full Gallery
            </Button>
          </div>
        </ContentSection>

        <ContentSection eyebrow="Leadership" title="President's letter" alt={false}>
          <PresidentLetter fullLetter />
        </ContentSection>
      </BgwPageTemplate>
    </>
  );
}
