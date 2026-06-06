import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { getProjectCaseStudyPath } from "@/lib/pages";
import {
  getCategoryLabel,
  getClientTypeLabel,
  type ProjectCaseStudy,
} from "@/lib/projects";

type ProjectCardProps = {
  project: ProjectCaseStudy;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="flex h-full flex-col">
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="construction">
          {getCategoryLabel(project.category)}
        </Badge>
        <Badge variant="default">Sample</Badge>
      </div>
      <h3 className="mt-4 text-lg font-semibold text-brand-navy">
        <Link
          href={getProjectCaseStudyPath(project.slug)}
          className="hover:text-brand-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2"
        >
          {project.title}
        </Link>
      </h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-600">
        {project.summary}
      </p>
      <dl className="mt-6 grid grid-cols-2 gap-3 border-t border-border pt-4 text-xs text-zinc-500">
        <div>
          <dt className="font-semibold uppercase tracking-wide">Client type</dt>
          <dd className="mt-1 text-zinc-700">
            {getClientTypeLabel(project.clientType)}
          </dd>
        </div>
        <div>
          <dt className="font-semibold uppercase tracking-wide">Year</dt>
          <dd className="mt-1 text-zinc-700">{project.year}</dd>
        </div>
        <div className="col-span-2">
          <dt className="font-semibold uppercase tracking-wide">Location</dt>
          <dd className="mt-1 text-zinc-700">{project.location}</dd>
        </div>
      </dl>
      <Link
        href={getProjectCaseStudyPath(project.slug)}
        className="mt-4 text-sm font-semibold text-brand-blue hover:text-brand-navy"
      >
        Read case study →
      </Link>
    </Card>
  );
}
