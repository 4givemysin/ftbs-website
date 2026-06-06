import { notFound } from "next/navigation";
import Link from "next/link";
import { InteriorPageTemplate } from "@/components/templates/InteriorPageTemplate";
import { ContentSection } from "@/components/sections/ContentSection";
import { SampleContentNotice } from "@/components/marketing/SampleContentNotice";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { createPageMetadata } from "@/lib/seo";
import { getProjectCaseStudyPath, getProjectCaseStudySeo } from "@/lib/pages";
import {
  getCategoryLabel,
  getClientTypeLabel,
  getProjectBySlug,
  projects,
} from "@/lib/projects";
import { routes } from "@/lib/routes";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  const seo = getProjectCaseStudySeo(project);
  return createPageMetadata({
    title: seo.title,
    description: seo.description,
    path: getProjectCaseStudyPath(slug),
  });
}

export default async function ProjectCaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <InteriorPageTemplate
      banner={{
        eyebrow: "Case Study",
        title: project.title,
        description: project.summary,
      }}
      cta={{
        title: "Discuss a similar program",
        description:
          "Contact FTBS to review qualifications and explore partnership on upcoming construction or technology work.",
        primaryLabel: "Contact FTBS",
        primaryHref: routes.contact.path,
        secondaryLabel: "View Portfolio",
        secondaryHref: routes.projects.path,
      }}
    >
      <ContentSection title="Review notice" alt={false}>
        <SampleContentNotice />
        <div className="mt-6 flex flex-wrap gap-2">
          <Badge variant="construction">
            {getCategoryLabel(project.category)}
          </Badge>
          <Badge variant="default">Sample</Badge>
          <Badge variant="bgw">{getClientTypeLabel(project.clientType)}</Badge>
        </div>
      </ContentSection>

      <ContentSection title="Project overview" alt>
        <dl className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
              Location
            </dt>
            <dd className="mt-1 text-sm font-medium text-brand-navy">
              {project.location}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
              Year
            </dt>
            <dd className="mt-1 text-sm font-medium text-brand-navy">
              {project.year}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
              Timeline
            </dt>
            <dd className="mt-1 text-sm font-medium text-brand-navy">
              {project.timeline}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
              Client type
            </dt>
            <dd className="mt-1 text-sm font-medium text-brand-navy">
              {getClientTypeLabel(project.clientType)}
            </dd>
          </div>
        </dl>
        <div className="mt-8">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-brand-blue">
            Services provided
          </h3>
          <ul className="mt-3 flex flex-wrap gap-2">
            {project.services.map((service) => (
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

      <ContentSection title="Challenge">
        <p className="text-base leading-relaxed text-zinc-600">{project.challenge}</p>
      </ContentSection>

      <ContentSection title="Approach" alt>
        <p className="text-base leading-relaxed text-zinc-600">{project.approach}</p>
      </ContentSection>

      <ContentSection title="Outcome">
        <p className="text-base leading-relaxed text-zinc-600">{project.outcome}</p>
        <ul className="mt-8 grid gap-4 sm:grid-cols-3">
          {project.metrics.map((metric) => (
            <li key={metric.label}>
              <Card className="text-center shadow-none">
                <p className="text-2xl font-bold text-brand-navy">{metric.value}</p>
                <p className="mt-2 text-xs uppercase tracking-wide text-zinc-500">
                  {metric.label}
                </p>
              </Card>
            </li>
          ))}
        </ul>
      </ContentSection>

      <ContentSection title="Explore more" alt>
        <div className="flex flex-wrap gap-4">
          <Button href={routes.projects.path} variant="outline">
            Back to Portfolio
          </Button>
          <Button href={routes.capabilities.path} variant="outline">
            Capability Statement
          </Button>
          <Link
            href={routes.contact.path}
            className="inline-flex min-h-11 items-center text-sm font-semibold text-brand-blue hover:text-brand-navy"
          >
            Contact FTBS →
          </Link>
        </div>
      </ContentSection>
    </InteriorPageTemplate>
  );
}
