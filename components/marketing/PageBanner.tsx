import { ContentContainer } from "@/components/ui/ContentContainer";

type PageBannerProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

/**
 * Interior page banner for About, Services, Contact, and future phase pages.
 * Distinct from homepage Hero — compact, professional, gov-contractor tone.
 */
export function PageBanner({ eyebrow, title, description }: PageBannerProps) {
  return (
    <section
      className="border-b border-border bg-gradient-to-b from-surface-alt to-white py-12 sm:py-16 lg:py-20"
      aria-labelledby="page-banner-title"
    >
      <ContentContainer>
        {eyebrow ? (
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-blue">
            {eyebrow}
          </p>
        ) : null}
        <h1
          id="page-banner-title"
          className="mt-3 text-3xl font-bold tracking-tight text-brand-navy sm:text-4xl"
        >
          {title}
        </h1>
        {description ? (
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-zinc-600 sm:text-lg">
            {description}
          </p>
        ) : null}
      </ContentContainer>
    </section>
  );
}
