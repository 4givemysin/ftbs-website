import { Button } from "@/components/ui/Button";
import { ContentContainer } from "@/components/ui/ContentContainer";

export type CTASectionProps = {
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

export function CTASection({
  title = "Ready to partner on your next project?",
  description = "Contact FTBS to discuss construction project management, infrastructure partnerships, or technology solutions for your organization.",
  primaryLabel = "Partner With Us",
  primaryHref = "/contact",
  secondaryLabel = "View Services",
  secondaryHref = "/services",
}: CTASectionProps) {
  return (
    <section className="bg-brand-navy py-16 lg:py-20" aria-labelledby="cta-heading">
      <ContentContainer>
        <div className="mx-auto max-w-3xl text-center">
          <h2 id="cta-heading" className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            {title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-zinc-300 sm:text-lg">
            {description}
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:items-center">
            <Button href={primaryHref} variant="secondary">
              {primaryLabel}
            </Button>
            <Button
              href={secondaryHref}
              variant="outline"
              className="border-white text-white hover:bg-white/10"
            >
              {secondaryLabel}
            </Button>
          </div>
        </div>
      </ContentContainer>
    </section>
  );
}
