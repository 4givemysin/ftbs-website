import { notFound } from "next/navigation";
import { InteriorPageTemplate } from "@/components/templates/InteriorPageTemplate";
import { ContentSection } from "@/components/sections/ContentSection";
import { SampleContentNotice } from "@/components/marketing/SampleContentNotice";
import { WebPageJsonLd } from "@/components/seo/JsonLd";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { createPageMetadata } from "@/lib/seo";
import { getCaseStudyPath, getCaseStudySeo } from "@/lib/pages";
import {
  caseStudies,
  getCaseStudyBySlug,
  getIndustryLabel,
} from "@/lib/case-studies";
import { routes } from "@/lib/routes";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);
  if (!study) return {};

  const seo = getCaseStudySeo(study);
  return createPageMetadata({
    title: seo.title,
    description: seo.description,
    path: getCaseStudyPath(slug),
  });
}

export default async function CaseStudyDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);

  if (!study) {
    notFound();
  }

  return (
    <>
      <WebPageJsonLd
        title={study.title}
        description={study.summary}
        path={getCaseStudyPath(slug)}
      />
      <InteriorPageTemplate
        banner={{
          eyebrow: "Case Study",
          title: study.title,
          description: study.summary,
        }}
        cta={{
          title: "Discuss a similar program",
          description:
            "Contact FTBS to review qualifications and explore partnership on upcoming construction or technology work.",
          primaryLabel: "Contact FTBS",
          primaryHref: routes.contact.path,
          secondaryLabel: "Capability Statement",
          secondaryHref: routes.capabilities.path,
        }}
      >
        <ContentSection title="Review notice" alt={false}>
          <SampleContentNotice />
          <div className="mt-6 flex flex-wrap gap-2">
            <Badge variant="construction">{getIndustryLabel(study.industry)}</Badge>
            <Badge variant="default">Sample</Badge>
          </div>
        </ContentSection>

        <ContentSection title="Business challenge" alt>
          <p className="text-base leading-relaxed text-zinc-600">{study.challenge}</p>
        </ContentSection>

        <ContentSection title="Solution">
          <p className="text-base leading-relaxed text-zinc-600">{study.solution}</p>
          <div className="mt-8">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-brand-blue">
              Services provided
            </h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {study.services.map((service) => (
                <li
                  key={service}
                  className="rounded-md bg-surface-alt px-3 py-1.5 text-sm text-brand-navy"
                >
                  {service}
                </li>
              ))}
            </ul>
          </div>
        </ContentSection>

        <ContentSection title="Results" alt>
          <ul className="space-y-3">
            {study.results.map((result) => (
              <li
                key={result}
                className="flex gap-3 rounded-lg border border-border bg-white px-4 py-3 text-sm text-zinc-700"
              >
                <span aria-hidden className="text-brand-gold">
                  ✓
                </span>
                {result}
              </li>
            ))}
          </ul>
        </ContentSection>

        <ContentSection title="Lessons learned">
          <ul className="grid gap-4 md:grid-cols-3">
            {study.lessonsLearned.map((lesson) => (
              <li key={lesson}>
                <Card className="shadow-none">
                  <p className="text-sm leading-relaxed text-zinc-700">{lesson}</p>
                </Card>
              </li>
            ))}
          </ul>
          <dl className="mt-8 grid gap-4 sm:grid-cols-3 border-t border-border pt-8">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                Client type
              </dt>
              <dd className="mt-1 text-sm font-medium text-brand-navy">
                {study.clientType}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                Year
              </dt>
              <dd className="mt-1 text-sm font-medium text-brand-navy">{study.year}</dd>
            </div>
          </dl>
        </ContentSection>

        <ContentSection title="Explore more" alt>
          <div className="flex flex-wrap gap-4">
            <Button href={routes.caseStudies.path} variant="outline">
              All Case Studies
            </Button>
            <Button href={routes.projects.path} variant="outline">
              Projects Portfolio
            </Button>
          </div>
        </ContentSection>
      </InteriorPageTemplate>
    </>
  );
}
