import Link from "next/link";
import { ContentSection } from "@/components/sections/ContentSection";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { BgwParentLink } from "@/components/bgw/DivisionServiceGrid";
import { BgwPageTemplate } from "@/components/bgw/BgwPageTemplate";
import { WebPageJsonLd } from "@/components/seo/JsonLd";
import { bgwBreadcrumbs } from "@/lib/bgw/breadcrumbs";
import { type BgwVerticalContent, futureDevelopmentDisclaimer } from "@/lib/content/bgw/verticals";
import { getCaseStudyPath } from "@/lib/pages";
import { caseStudies } from "@/lib/case-studies";
import { routes } from "@/lib/routes";
import { createMetadataFromPageConfig } from "@/lib/seo";
import { getPagePath, getPageSeo, type PageSeoConfig } from "@/lib/pages";

type BgwVerticalPageProps = {
  content: BgwVerticalContent;
  seoKey: keyof typeof import("@/lib/pages").pageSeo;
};

export function createBgwVerticalMetadata(seoKey: BgwVerticalPageProps["seoKey"]) {
  return createMetadataFromPageConfig(getPageSeo(seoKey));
}

export function BgwVerticalPage({ content, seoKey }: BgwVerticalPageProps) {
  const seo = getPageSeo(seoKey) as PageSeoConfig;
  const path = getPagePath(seo.routeKey);
  const relatedStudies = (content.relatedCaseStudySlugs ?? [])
    .map((slug) => caseStudies.find((s) => s.slug === slug))
    .filter(Boolean);

  return (
    <>
      <WebPageJsonLd title={content.banner.title} description={content.banner.description} path={path} />
      <BgwPageTemplate
        banner={content.banner}
        breadcrumbs={bgwBreadcrumbs({ name: content.banner.title, path })}
        cta={{
          title: content.cta.title,
          description: content.cta.description,
          primaryLabel: content.cta.primaryLabel,
          primaryHref: content.cta.primaryHref,
          secondaryLabel: "View Gallery",
          secondaryHref: routes.bgwProjects.path,
        }}
      >
        <ContentSection title={content.overview.title} alt={false}>
          {content.overview.paragraphs.map((p) => (
            <p key={p.slice(0, 32)} className="mt-4 first:mt-0 text-base leading-relaxed text-zinc-600">
              {p}
            </p>
          ))}
          {content.key === "futureDevelopment" ? (
            <p
              role="note"
              className="mt-6 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-relaxed text-amber-900"
            >
              {futureDevelopmentDisclaimer}
            </p>
          ) : null}
        </ContentSection>

        <ContentSection title="Capabilities" alt>
          <ul className="grid gap-3 sm:grid-cols-2">
            {content.capabilities.map((item) => (
              <li
                key={item}
                className="flex gap-3 rounded-lg border border-border bg-white px-4 py-3 text-sm text-zinc-700"
              >
                <span aria-hidden className="mt-0.5 text-bgw-green">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
        </ContentSection>

        <ContentSection title="Partner types">
          <ul className="grid gap-4 sm:grid-cols-2">
            {content.partnerTypes.map((item) => (
              <li key={item}>
                <Card className="shadow-none">{item}</Card>
              </li>
            ))}
          </ul>
        </ContentSection>

        {relatedStudies.length > 0 ? (
          <ContentSection title="Related case studies" alt>
            <ul className="grid gap-4 md:grid-cols-2">
              {relatedStudies.map((study) =>
                study ? (
                  <li key={study.slug}>
                    <Card>
                      <h3 className="text-lg font-semibold text-brand-navy">{study.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-zinc-600">{study.summary}</p>
                      <Link
                        href={getCaseStudyPath(study.slug)}
                        className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold text-brand-blue hover:text-brand-navy"
                      >
                        Read case study →
                      </Link>
                    </Card>
                  </li>
                ) : null,
              )}
            </ul>
          </ContentSection>
        ) : null}

        <ContentSection title="Corporate context" alt>
          <BgwParentLink />
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={routes.bgwCapabilityStatement.path} variant="outline">
              BGW Capability Statement
            </Button>
            <Button href={content.cta.primaryHref}>Construction Inquiry</Button>
          </div>
        </ContentSection>
      </BgwPageTemplate>
    </>
  );
}
