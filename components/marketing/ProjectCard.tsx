import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import {
  getClientTypeLabel,
  getTrackLabel,
  type PortfolioProject,
} from "@/lib/projects";

type ProjectCardProps = {
  project: PortfolioProject;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="flex h-full flex-col">
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="construction">{getTrackLabel(project.track)}</Badge>
        {project.featured ? <Badge variant="technology">Featured</Badge> : null}
        <Badge variant="default">Sample</Badge>
      </div>
      <h3 className="mt-4 text-lg font-semibold text-brand-navy">{project.title}</h3>
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
      <div className="mt-4 border-t border-border pt-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-blue">
          Impact
        </p>
        <p className="mt-2 text-sm leading-relaxed text-zinc-600">{project.impact}</p>
        <ul className="mt-3 space-y-1">
          {project.results.map((result) => (
            <li key={result} className="text-xs leading-relaxed text-zinc-600">
              • {result}
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}
