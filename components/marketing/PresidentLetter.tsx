import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { BgwBadge } from "@/components/brand/BgwBadge";
import { paulGibbs, presidentLetter } from "@/lib/leadership";

type PresidentLetterProps = {
  /** Show full letter body; when false, shows bio + excerpt only */
  fullLetter?: boolean;
};

export function PresidentLetter({ fullLetter = true }: PresidentLetterProps) {
  return (
    <div className="space-y-8">
      <Card className="bg-surface-alt shadow-none lg:p-8">
        <BgwBadge size="md" />
        <div className="mt-6">
          <p className="text-lg font-bold text-brand-navy">{paulGibbs.name}</p>
          <p className="mt-1 text-sm font-semibold text-brand-blue">
            {paulGibbs.fullTitle}
          </p>
          <p className="mt-1 text-xs text-zinc-500">{paulGibbs.resumeHeadline}</p>
          <p className="mt-4 text-sm leading-relaxed text-zinc-600">{paulGibbs.bio}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {paulGibbs.professionalCertifications.map((cert) => (
              <Badge key={cert} variant="construction">
                {cert}
              </Badge>
            ))}
          </div>
          <dl className="mt-6 grid gap-3 sm:grid-cols-2 text-sm">
            <div>
              <dt className="font-semibold text-brand-navy">Phone</dt>
              <dd className="mt-1">
                <a
                  href={`tel:${paulGibbs.phone.replace(/\D/g, "")}`}
                  className="text-brand-blue hover:text-brand-navy"
                >
                  {paulGibbs.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-brand-navy">Email</dt>
              <dd className="mt-1">
                <a
                  href={`mailto:${paulGibbs.email}`}
                  className="text-brand-blue hover:text-brand-navy"
                >
                  {paulGibbs.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-brand-navy">Website</dt>
              <dd className="mt-1">
                <a
                  href={paulGibbs.website}
                  className="text-brand-blue hover:text-brand-navy"
                >
                  {paulGibbs.website.replace("https://", "")}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-brand-navy">Languages</dt>
              <dd className="mt-1 text-zinc-600">{paulGibbs.languages.join(" · ")}</dd>
            </div>
          </dl>
        </div>
      </Card>

      {fullLetter ? (
        <article className="rounded-lg border border-border bg-white p-6 lg:p-10">
          <p className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
            {presidentLetter.salutation}
          </p>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-zinc-700">
            {presidentLetter.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>
          <p className="mt-6 text-base leading-relaxed text-zinc-700">
            {presidentLetter.closing}
          </p>
          <footer className="mt-10 border-t border-border pt-6">
            <p className="text-base font-semibold text-brand-navy">Sincerely,</p>
            <p className="mt-4 text-base font-bold text-brand-navy">
              {presidentLetter.signature.name}
            </p>
            <p className="text-sm text-zinc-600">{presidentLetter.signature.title}</p>
            <p className="text-sm text-zinc-600">
              {presidentLetter.signature.organization}
            </p>
          </footer>
        </article>
      ) : null}
    </div>
  );
}
