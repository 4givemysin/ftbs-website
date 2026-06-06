import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { paulGibbs } from "@/lib/leadership";

export function LeadershipResume() {
  return (
    <div className="space-y-10">
      <Card className="print-avoid-break">
        <h3 className="text-lg font-semibold text-brand-navy">Professional summary</h3>
        <p className="mt-4 text-sm leading-relaxed text-zinc-600">{paulGibbs.summary}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {paulGibbs.professionalCertifications.map((cert) => (
            <Badge key={cert} variant="construction">
              {cert}
            </Badge>
          ))}
        </div>
      </Card>

      <section aria-labelledby="work-experience-heading">
        <h3
          id="work-experience-heading"
          className="text-lg font-semibold text-brand-navy"
        >
          Work experience
        </h3>
        <ol className="mt-6 space-y-6">
          {paulGibbs.workExperience.map((job) => (
            <li key={job.id}>
              <Card className="print-avoid-break">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-base font-bold text-brand-navy">{job.role}</p>
                    <p className="mt-1 text-sm font-semibold text-brand-blue">
                      {job.company}
                    </p>
                    <p className="mt-1 text-sm text-zinc-500">{job.location}</p>
                  </div>
                  <p className="shrink-0 text-sm font-medium text-zinc-600">{job.period}</p>
                </div>
                <ul className="mt-4 space-y-2">
                  {job.highlights.map((item) => (
                    <li
                      key={item}
                      className="flex gap-2 text-sm leading-relaxed text-zinc-700 before:mt-2 before:h-1.5 before:w-1.5 before:shrink-0 before:rounded-full before:bg-brand-gold"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            </li>
          ))}
        </ol>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="print-avoid-break">
          <h3 className="text-lg font-semibold text-brand-navy">Education</h3>
          <ul className="mt-4 space-y-4">
            {paulGibbs.education.map((entry) => (
              <li key={entry.id}>
                <p className="text-sm font-semibold text-brand-navy">{entry.name}</p>
                {entry.detail ? (
                  <p className="mt-1 text-sm text-zinc-600">{entry.detail}</p>
                ) : null}
                {entry.period ? (
                  <p className="mt-1 text-sm text-zinc-500">{entry.period}</p>
                ) : null}
              </li>
            ))}
          </ul>
        </Card>

        <Card className="print-avoid-break">
          <h3 className="text-lg font-semibold text-brand-navy">Core skills</h3>
          <ul className="mt-4 space-y-2">
            {paulGibbs.skills.map((skill) => (
              <li
                key={skill}
                className="text-sm leading-relaxed text-zinc-700 before:mr-2 before:text-brand-gold before:content-['•']"
              >
                {skill}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-zinc-500">{paulGibbs.referencesNote}</p>
        </Card>
      </div>
    </div>
  );
}
