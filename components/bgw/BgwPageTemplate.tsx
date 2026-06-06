import { type ReactNode } from "react";
import { DivisionHero, DivisionCTA } from "@/components/bgw/DivisionHero";
import { BgwSubNav } from "@/components/bgw/BgwSubNav";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

type BgwPageTemplateProps = {
  banner: {
    eyebrow?: string;
    title: string;
    description: string;
    primaryCta?: { label: string; href: string };
    secondaryCta?: { label: string; href: string };
  };
  breadcrumbs: { name: string; path: string }[];
  children: ReactNode;
  cta?: {
    title: string;
    description: string;
    primaryLabel?: string;
    primaryHref?: string;
    secondaryLabel?: string;
    secondaryHref?: string;
  };
};

export function BgwPageTemplate({
  banner,
  breadcrumbs,
  children,
  cta,
}: BgwPageTemplateProps) {
  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbs} />
      <DivisionHero {...banner} />
      <BgwSubNav />
      {children}
      {cta ? <DivisionCTA {...cta} /> : null}
    </>
  );
}
