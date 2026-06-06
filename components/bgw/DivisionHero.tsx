import Link from "next/link";
import { ContentContainer } from "@/components/ui/ContentContainer";
import { BgwBadge } from "@/components/brand/BgwBadge";
import { Button } from "@/components/ui/Button";
import { bgwDivision } from "@/lib/divisions";

type DivisionHeroProps = {
  eyebrow?: string;
  title: string;
  description: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
};

export function DivisionHero({
  eyebrow = "BGW Construction Company",
  title,
  description,
  primaryCta,
  secondaryCta,
}: DivisionHeroProps) {
  return (
    <section className="border-b-4 border-bgw-green bg-gradient-to-br from-bgw-earth/10 via-white to-bgw-green/5">
      <ContentContainer className="py-14 lg:py-20">
        <BgwBadge size="md" />
        <p className="mt-4 text-sm font-semibold uppercase tracking-wider text-bgw-green">
          {eyebrow}
        </p>
        <h1 className="mt-3 max-w-4xl text-3xl font-bold tracking-tight text-brand-navy sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        <p className="mt-6 max-w-3xl text-base leading-relaxed text-zinc-600 sm:text-lg">
          {description}
        </p>
        {primaryCta || secondaryCta ? (
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            {primaryCta ? <Button href={primaryCta.href}>{primaryCta.label}</Button> : null}
            {secondaryCta ? (
              <Button href={secondaryCta.href} variant="outline">
                {secondaryCta.label}
              </Button>
            ) : null}
          </div>
        ) : null}
        <p className="mt-6 text-xs text-zinc-500">
          A division of FTBS · {bgwDivision.tagline}
        </p>
      </ContentContainer>
    </section>
  );
}

type DivisionCTAProps = {
  title: string;
  description: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

export function DivisionCTA({
  title,
  description,
  primaryLabel = "Construction Inquiry",
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: DivisionCTAProps) {
  return (
    <section
      className="border-t border-bgw-green/20 bg-gradient-to-r from-brand-navy to-bgw-earth py-16 lg:py-20"
      aria-labelledby="bgw-cta-heading"
    >
      <ContentContainer>
        <div className="mx-auto max-w-3xl text-center">
          <BgwBadge size="md" variant="onDark" className="mx-auto" />
          <h2
            id="bgw-cta-heading"
            className="mt-6 text-2xl font-bold tracking-tight text-white sm:text-3xl"
          >
            {title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-zinc-300">{description}</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:items-center">
            {primaryHref ? (
              <Button href={primaryHref} variant="secondary">
                {primaryLabel}
              </Button>
            ) : null}
            {secondaryHref && secondaryLabel ? (
              <Link
                href={secondaryHref}
                className="inline-flex h-11 items-center justify-center rounded-md border border-white/30 px-6 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                {secondaryLabel}
              </Link>
            ) : null}
          </div>
        </div>
      </ContentContainer>
    </section>
  );
}
