import { type ReactNode } from "react";
import { Hero } from "@/components/marketing/Hero";
import { CTASection, type CTASectionProps } from "@/components/marketing/CTASection";

type HeroConfig = {
  eyebrow?: string;
  title: string;
  description: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
};

type MarketingPageTemplateProps = {
  hero: HeroConfig;
  children: ReactNode;
  cta?: CTASectionProps;
};

/**
 * Standard template for marketing/landing pages (Home, future BGW division hub).
 */
export function MarketingPageTemplate({
  hero,
  children,
  cta,
}: MarketingPageTemplateProps) {
  return (
    <>
      <Hero {...hero} />
      {children}
      {cta ? <CTASection {...cta} /> : null}
    </>
  );
}
