import { ProjectCard } from "@/components/marketing/ProjectCard";
import {
  getFeaturedProjects,
  getProjectsByTrack,
  portfolioTracks,
  type PortfolioTrack,
} from "@/lib/projects";

export function ProjectPortfolioSections() {
  const featured = getFeaturedProjects();

  return (
    <div className="space-y-16">
      <section aria-labelledby="featured-projects-heading">
        <h2
          id="featured-projects-heading"
          className="text-2xl font-bold tracking-tight text-brand-navy"
        >
          Featured projects
        </h2>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-zinc-600">
          Highlighted sample programs demonstrating FTBS delivery across construction,
          technology, and consulting tracks.
        </p>
        <ul className="mt-8 grid gap-6 md:grid-cols-2">
          {featured.map((project) => (
            <li key={project.id}>
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
      </section>

      {portfolioTracks.map((track) => (
        <TrackSection key={track.id} track={track.id} label={track.label} />
      ))}
    </div>
  );
}

function TrackSection({
  track,
  label,
}: {
  track: PortfolioTrack;
  label: string;
}) {
  const projects = getProjectsByTrack(track);

  return (
    <section aria-labelledby={`${track}-projects-heading`}>
      <h2
        id={`${track}-projects-heading`}
        className="text-2xl font-bold tracking-tight text-brand-navy"
      >
        {label}
      </h2>
      <ul className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <li key={project.id}>
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
    </section>
  );
}
