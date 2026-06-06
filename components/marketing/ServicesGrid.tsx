import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { services } from "@/lib/services";
import { routes } from "@/lib/routes";
import { SectionHeader } from "./SectionHeader";

type ServicesGridProps = {
  showHeader?: boolean;
  limit?: number;
};

export function ServicesGrid({ showHeader = true, limit }: ServicesGridProps) {
  const items = limit ? services.slice(0, limit) : services;

  return (
    <div>
      {showHeader ? (
        <SectionHeader
          eyebrow="What We Deliver"
          title="Construction and technology services under one trusted partner"
          description="FTBS supports project owners, agencies, and developers with disciplined delivery and practical systems that keep work moving forward."
        />
      ) : null}

      <ul className={`grid gap-6 sm:grid-cols-2 ${showHeader ? "mt-10" : ""}`}>
        {items.map((service) => (
          <li key={service.id} id={service.id} className="scroll-mt-24">
            <Card as="article" className="h-full">
              <div className="flex flex-wrap items-center gap-2">
                <Badge
                  variant={
                    service.category === "construction"
                      ? "construction"
                      : "technology"
                  }
                >
                  {service.category === "construction"
                    ? "Construction"
                    : "Technology"}
                </Badge>
                {service.division === "bgw" ? (
                  <Badge variant="bgw">BGW Division</Badge>
                ) : null}
              </div>
              <h3 className="mt-4 text-xl font-semibold text-brand-navy">
                {service.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-600">
                {service.shortDescription}
              </p>
              <ul className="mt-4 space-y-2">
                {service.capabilities.slice(0, 3).map((capability) => (
                  <li
                    key={capability}
                    className="flex gap-2 text-sm text-zinc-700 before:mt-2 before:h-1.5 before:w-1.5 before:shrink-0 before:rounded-full before:bg-brand-gold"
                  >
                    {capability}
                  </li>
                ))}
              </ul>
              <Link
                href={routes.services.path}
                className="mt-5 inline-flex text-sm font-semibold text-brand-blue hover:text-brand-navy"
              >
                Learn more on Services →
              </Link>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
}
