import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ProjectCard } from "@/components/marketing/ProjectCard";
import { routes } from "@/lib/routes";
import { getFeaturedProjects } from "@/lib/projects";

type CaseStudiesSectionProps = {
  title?: string;
  description?: string;
  limit?: number;
  alt?: boolean;
};

export function CaseStudiesSection({
  title = "Representative case studies",
  description = "In-depth sample case studies with challenge, solution, results, and lessons learned.",
  limit = 3,
  alt = false,
}: CaseStudiesSectionProps) {
  const featured = getFeaturedProjects().slice(0, limit);

  return (
    <section
      aria-labelledby="case-studies-heading"
      className={`py-16 lg:py-24 ${alt ? "bg-surface-alt" : "bg-white"}`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h2
            id="case-studies-heading"
            className="text-2xl font-bold tracking-tight text-brand-navy sm:text-3xl"
          >
            {title}
          </h2>
          {description ? (
            <p className="mt-4 text-base leading-relaxed text-zinc-600">
              {description}
            </p>
          ) : null}
        </div>

        <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((project) => (
            <li key={project.id}>
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-wrap gap-4">
          <Button href={routes.projects.path} variant="outline">
            View Full Portfolio
          </Button>
          <Link
            href={routes.caseStudies.path}
            className="inline-flex min-h-11 items-center text-sm font-semibold text-brand-blue hover:text-brand-navy"
          >
            Read case studies →
          </Link>
        </div>
      </div>
    </section>
  );
}
