import type { Metadata } from "next";
import { company } from "./company";
import { buildSocialMetadata } from "./og/social-metadata";
import { getPagePath, type PageSeoConfig } from "./pages";
import type { RouteKey } from "./routes";

export const metadataBase = new URL(company.url);

const defaultTitle = `${company.shortName} | ${company.tagline}`;
const defaultDescription = company.description;

type PageMetadataOptions = {
  title?: string;
  description?: string;
  path?: string;
  noIndex?: boolean;
};

export function createPageMetadata({
  title,
  description = defaultDescription,
  path = "",
  noIndex = false,
}: PageMetadataOptions = {}): Metadata {
  const pageTitle = title ? `${title} | ${company.shortName}` : defaultTitle;
  const social = buildSocialMetadata({
    title: pageTitle,
    description,
    path: path || "/",
  });

  return {
    metadataBase,
    title: pageTitle,
    description,
    alternates: {
      canonical: `${company.url}${path}`,
    },
    robots: noIndex ? { index: false, follow: false } : undefined,
    openGraph: social.openGraph,
    twitter: social.twitter,
  };
}

/** Build metadata from centralized page SEO config */
export function createMetadataFromPageConfig(config: PageSeoConfig): Metadata {
  return createPageMetadata({
    title: config.title,
    description: config.description,
    path: getPagePath(config.routeKey),
    noIndex: config.noIndex,
  });
}

/** Factory for future pages — pass route key and optional overrides */
export function createMetadataForRoute(
  routeKey: RouteKey,
  overrides?: Partial<Pick<PageSeoConfig, "title" | "description">>,
): Metadata {
  const path = getPagePath(routeKey);
  return createPageMetadata({
    title: overrides?.title,
    description: overrides?.description ?? defaultDescription,
    path,
  });
}

export const defaultMetadata = createPageMetadata();
