import { portfolioTracks } from "@/lib/projects";

export function PortfolioTrackNav() {
  return (
    <nav aria-label="Portfolio categories" className="mt-8">
      <ul
        role="tablist"
        className="flex flex-wrap gap-2"
        aria-label="Filter portfolio by track"
      >
        <li role="presentation">
          <a
            href="#featured-projects-heading"
            role="tab"
            className="inline-flex min-h-11 items-center rounded-full border border-border bg-white px-4 py-2 text-sm font-semibold text-brand-navy transition-colors hover:border-brand-blue hover:text-brand-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2"
          >
            Featured
          </a>
        </li>
        {portfolioTracks.map((track) => (
          <li key={track.id} role="presentation">
            <a
              href={`#track-${track.id}`}
              role="tab"
              className="inline-flex min-h-11 items-center rounded-full border border-border bg-white px-4 py-2 text-sm font-semibold text-brand-navy transition-colors hover:border-brand-blue hover:text-brand-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2"
            >
              {track.label.replace(" Projects", "")}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
