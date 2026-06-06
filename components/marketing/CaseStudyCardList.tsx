import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { routes } from "@/lib/routes";
import { caseStudies, getIndustryLabel } from "@/lib/case-studies";
import { getCaseStudyPath } from "@/lib/pages";

export function CaseStudyCardList() {
  return (
    <ul className="grid gap-6 lg:grid-cols-3">
      {caseStudies.map((study) => (
        <li key={study.slug}>
          <Card className="flex h-full flex-col">
            <div className="flex flex-wrap gap-2">
              <Badge variant="construction">{getIndustryLabel(study.industry)}</Badge>
              <Badge variant="default">Sample</Badge>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-brand-navy">
              <Link
                href={getCaseStudyPath(study.slug)}
                className="hover:text-brand-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2"
              >
                {study.title}
              </Link>
            </h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-600">
              {study.summary}
            </p>
            <Link
              href={getCaseStudyPath(study.slug)}
              className="mt-4 text-sm font-semibold text-brand-blue hover:text-brand-navy"
            >
              Read full case study →
            </Link>
          </Card>
        </li>
      ))}
    </ul>
  );
}

export function CaseStudyPreviewSection() {
  return (
    <section aria-labelledby="case-study-preview-heading">
      <h2
        id="case-study-preview-heading"
        className="text-2xl font-bold tracking-tight text-brand-navy"
      >
        Case studies
      </h2>
      <p className="mt-3 max-w-3xl text-base leading-relaxed text-zinc-600">
        Three sample case studies with business challenge, solution, results, and
        lessons learned.
      </p>
      <div className="mt-8">
        <CaseStudyCardList />
      </div>
      <div className="mt-8">
        <Button href={routes.caseStudies.path} variant="outline">
          View All Case Studies
        </Button>
      </div>
    </section>
  );
}
