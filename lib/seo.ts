import type { Metadata } from "next";
import { company } from "./company";
import { getPagePath, type PageSeoConfig } from "./pages";
import type { RouteKey } from "./routes";

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
  const url = `${company.url}${path}`;

  return {
    title: pageTitle,
    description,
    alternates: {
      canonical: url,
    },
    robots: noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      title: pageTitle,
      description,
      url,
      siteName: company.shortName,
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
    },
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
