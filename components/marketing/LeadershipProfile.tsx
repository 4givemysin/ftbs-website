import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  leadershipCareerHighlights,
  paulGibbs,
} from "@/lib/leadership";
import { routes } from "@/lib/routes";

type LeadershipProfileProps = {
  /** compact — homepage and sidebars; detailed — capability and procurement pages */
  variant?: "compact" | "detailed";
  showResumeLink?: boolean;
};

export function LeadershipProfile({
  variant = "compact",
  showResumeLink = true,
}: LeadershipProfileProps) {
  const highlights =
    variant === "detailed"
      ? leadershipCareerHighlights
      : leadershipCareerHighlights.slice(0, 3);

  return (
    <Card className="bg-surface-alt shadow-none">
      <p className="text-lg font-bold text-brand-navy">{paulGibbs.name}</p>
      <p className="mt-1 text-sm font-semibold text-brand-blue">{paulGibbs.fullTitle}</p>
      <p className="mt-1 text-xs text-zinc-500">{paulGibbs.resumeHeadline}</p>

      <p className="mt-4 text-sm leading-relaxed text-zinc-600">
        {variant === "detailed" ? paulGibbs.summary : paulGibbs.bio}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {paulGibbs.professionalCertifications.map((cert) => (
          <Badge key={cert} variant="construction">
            {cert}
          </Badge>
        ))}
      </div>

      {variant === "detailed" && paulGibbs.registrations.length > 0 ? (
        <div className="mt-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
            Registrations
          </p>
          <ul className="mt-2 space-y-1">
            {paulGibbs.registrations.map((item) => (
              <li
                key={item}
                className="text-sm leading-relaxed text-zinc-700 before:mr-2 before:text-brand-gold before:content-['•']"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <ul className="mt-5 space-y-2">
        {highlights.map((item) => (
          <li
            key={item}
            className="flex gap-2 text-sm leading-relaxed text-zinc-700 before:mt-2 before:h-1.5 before:w-1.5 before:shrink-0 before:rounded-full before:bg-bgw-green"
          >
            {item}
          </li>
        ))}
      </ul>

      {variant === "detailed" ? (
        <p className="mt-5 text-sm text-zinc-600">
          Languages: {paulGibbs.languages.join(" · ")}
        </p>
      ) : null}

      {showResumeLink ? (
        <div className="mt-6">
          <Button
            href={`${routes.about.path}#leadership-resume`}
            variant="outline"
          >
            View Full Resume
          </Button>
        </div>
      ) : null}
    </Card>
  );
}
