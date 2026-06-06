import { Button } from "@/components/ui/Button";
import { ProjectCard } from "@/components/marketing/ProjectCard";
import { routes } from "@/lib/routes";
import { projects } from "@/lib/projects";

type CaseStudiesSectionProps = {
  title?: string;
  description?: string;
  limit?: number;
  alt?: boolean;
};

export function CaseStudiesSection({
  title = "Representative case studies",
  description = "Sample project profiles demonstrating FTBS approach to construction and technology delivery.",
  limit = 3,
  alt = false,
}: CaseStudiesSectionProps) {
  const featured = projects.slice(0, limit);

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
            <li key={project.slug}>
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>

        <div className="mt-10">
          <Button href={routes.projects.path} variant="outline">
            View Full Portfolio
          </Button>
        </div>
      </div>
    </section>
  );
}
