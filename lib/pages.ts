import { company } from "./company";
import { routes, type RouteKey } from "./routes";

export type PageSeoConfig = {
  routeKey: RouteKey;
  title?: string;
  description: string;
  noIndex?: boolean;
};

export const pageSeo: Record<string, PageSeoConfig> = {
  home: {
    routeKey: "home",
    title: "Construction Project Management & Technology Solutions",
    description:
      "FTBS delivers construction project management, infrastructure support, and technology solutions for government agencies, developers, and institutional partners.",
  },
  about: {
    routeKey: "about",
    title: "About FTBS",
    description:
      "Learn about Finesse Technology Business Solutions — construction project management, infrastructure development, and technology services for professional partners.",
  },
  services: {
    routeKey: "services",
    title: "Services",
    description:
      "Explore FTBS services including construction project management, infrastructure development, commercial construction, technology consulting, and digital project systems.",
  },
  contact: {
    routeKey: "contact",
    title: "Contact",
    description:
      "Contact FTBS to discuss construction project management, infrastructure partnerships, technology consulting, or request a quote.",
  },
};

export function getPagePath(routeKey: RouteKey): string {
  return routes[routeKey].path;
}

export function getPageSeo(key: keyof typeof pageSeo) {
  return pageSeo[key];
}

export const siteDefaults = {
  name: company.shortName,
  legalName: company.name,
  url: company.url,
  locale: "en_US",
} as const;
