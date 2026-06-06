import { type ReactNode } from "react";
import { PageBanner } from "@/components/marketing/PageBanner";
import { CTASection, type CTASectionProps } from "@/components/marketing/CTASection";

type InteriorPageTemplateProps = {
  banner: {
    eyebrow?: string;
    title: string;
    description?: string;
  };
  children: ReactNode;
  cta?: CTASectionProps;
};

/**
 * Standard template for interior pages (About, Services, Contact, future phases).
 * Provides consistent banner + content + optional CTA structure.
 */
export function InteriorPageTemplate({
  banner,
  children,
  cta,
}: InteriorPageTemplateProps) {
  return (
    <>
      <PageBanner {...banner} />
      {children}
      {cta ? <CTASection {...cta} /> : null}
    </>
  );
}
