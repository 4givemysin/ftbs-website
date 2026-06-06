import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import {
  certificationDisclaimers,
  complianceStandards,
  currentCertifications,
  futureCertificationGoals,
  industryStandards,
  leadershipCertifications,
  type Certification,
} from "@/lib/certifications";

function statusBadge(status: Certification["status"]) {
  switch (status) {
    case "verified":
      return <Badge variant="construction">Verified</Badge>;
    case "pending":
      return <Badge variant="technology">Pending</Badge>;
    default:
      return <Badge variant="default">Placeholder</Badge>;
  }
}

function CertificationCard({ item }: { item: Certification }) {
  return (
    <Card className="flex h-full flex-col">
      <div className="flex flex-wrap items-center gap-2">
        {statusBadge(item.status)}
        {item.isSample ? <Badge variant="default">Sample</Badge> : null}
      </div>
      <h3 className="mt-4 text-lg font-semibold text-brand-navy">{item.name}</h3>
      <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-brand-blue">
        {item.issuer}
      </p>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-600">
        {item.description}
      </p>
    </Card>
  );
}

export function CertificationGrid() {
  return (
    <div className="space-y-16">
      <section aria-labelledby="leadership-certifications-heading">
        <h2
          id="leadership-certifications-heading"
          className="text-xl font-bold text-brand-navy"
        >
          Leadership certifications
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-zinc-600">
          Verified certifications held by Paul Gibbs, CEO of FTBS and President of BGW
          Construction Company.
        </p>
        <ul className="mt-8 grid gap-6 md:grid-cols-3">
          {leadershipCertifications.map((item) => (
            <li key={item.id}>
              <CertificationCard item={item} />
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="current-certifications-heading">
        <h2
          id="current-certifications-heading"
          className="text-xl font-bold text-brand-navy"
        >
          Company credentials
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-zinc-600">
          Corporate insurance and registration documentation. Placeholder sections indicate
          where documentation will appear once confirmed.
        </p>
        <ul className="mt-8 grid gap-6 md:grid-cols-2">
          {currentCertifications.map((item) => (
            <li key={item.id}>
              <CertificationCard item={item} />
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="future-goals-heading">
        <h2 id="future-goals-heading" className="text-xl font-bold text-brand-navy">
          Future certification goals
        </h2>
        <ul className="mt-8 grid gap-6 md:grid-cols-3">
          {futureCertificationGoals.map((goal) => (
            <li key={goal.title}>
              <Card>
                <Badge variant="technology">{goal.timeline}</Badge>
                <h3 className="mt-4 text-lg font-semibold text-brand-navy">
                  {goal.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-600">
                  {goal.description}
                </p>
              </Card>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="compliance-heading">
        <h2 id="compliance-heading" className="text-xl font-bold text-brand-navy">
          Compliance standards
        </h2>
        <ul className="mt-8 grid gap-4 md:grid-cols-3">
          {complianceStandards.map((item) => (
            <li key={item.title}>
              <Card className="shadow-none">
                <h3 className="text-base font-semibold text-brand-navy">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                  {item.description}
                </p>
              </Card>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="industry-standards-heading">
        <h2
          id="industry-standards-heading"
          className="text-xl font-bold text-brand-navy"
        >
          Industry standards
        </h2>
        <ul className="mt-8 grid gap-4 md:grid-cols-3">
          {industryStandards.map((item) => (
            <li key={item.title}>
              <Card className="shadow-none">
                <h3 className="text-base font-semibold text-brand-navy">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                  {item.description}
                </p>
              </Card>
            </li>
          ))}
        </ul>
      </section>

      <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-zinc-600">
        {certificationDisclaimers.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>
    </div>
  );
}
