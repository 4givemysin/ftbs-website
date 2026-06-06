import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import {
  certifications,
  certificationDisclaimers,
  type Certification,
} from "@/lib/certifications";

function statusBadge(status: Certification["status"]) {
  switch (status) {
    case "active":
      return <Badge variant="construction">Active</Badge>;
    case "pending":
      return <Badge variant="technology">Pending</Badge>;
    default:
      return <Badge variant="default">Sample</Badge>;
  }
}

export function CertificationGrid() {
  return (
    <div>
      <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {certifications.map((item) => (
          <li key={item.id}>
            <Card className="flex h-full flex-col">
              <div className="flex flex-wrap items-center gap-2">
                {statusBadge(item.status)}
                {item.isSample ? <Badge variant="default">Sample</Badge> : null}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-brand-navy">
                {item.name}
              </h3>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-brand-blue">
                {item.issuer}
              </p>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-600">
                {item.description}
              </p>
              {item.renewalNote ? (
                <p className="mt-4 text-xs text-zinc-500">{item.renewalNote}</p>
              ) : null}
            </Card>
          </li>
        ))}
      </ul>

      <ul className="mt-10 list-disc space-y-2 pl-5 text-sm leading-relaxed text-zinc-600">
        {certificationDisclaimers.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>
    </div>
  );
}
