import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ContentContainer } from "@/components/ui/ContentContainer";
import { bgwDivision } from "@/lib/divisions";

type HeroProps = {
  eyebrow?: string;
  title: string;
  description: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
};

export function Hero({
  eyebrow,
  title,
  description,
  primaryCta = { label: "View Services", href: "/services" },
  secondaryCta = { label: "Contact FTBS", href: "/contact" },
}: HeroProps) {
  return (
    <section className="border-b border-border bg-gradient-to-b from-white to-surface-alt/60">
      <ContentContainer className="py-16 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            {eyebrow ? (
              <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-brand-blue">
                {eyebrow}
              </p>
            ) : null}
            <h1 className="text-3xl font-bold tracking-tight text-brand-navy sm:text-4xl lg:text-5xl">
              {title}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-zinc-600 sm:text-lg">
              {description}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button href={primaryCta.href}>{primaryCta.label}</Button>
              <Button href={secondaryCta.href} variant="outline">
                {secondaryCta.label}
              </Button>
            </div>
          </div>

          <Card className="bg-surface-alt p-8 lg:p-10 shadow-none">
            <div className="space-y-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-brand-blue">
                  Construction
                </p>
                <p className="mt-2 text-lg font-semibold text-brand-navy">
                  Project management built for accountability
                </p>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                  Schedule control, quality oversight, and clear reporting for
                  complex builds.
                </p>
              </div>
              <div className="border-t border-border pt-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-brand-blue">
                  Technology
                </p>
                <p className="mt-2 text-lg font-semibold text-brand-navy">
                  Systems that support smarter delivery
                </p>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                  Consulting and digital tools that improve visibility across
                  every phase.
                </p>
              </div>
              <div className="border-t border-border pt-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-brand-blue">
                  {bgwDivision.name}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                  {bgwDivision.focus}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </ContentContainer>
    </section>
  );
}
