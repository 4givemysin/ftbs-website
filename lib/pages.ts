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
  capabilities: {
    routeKey: "capabilities",
    title: "Capability Statement",
    description:
      "FTBS capability statement — core competencies in construction project management, infrastructure development, and technology consulting for government and institutional partners.",
  },
  projects: {
    routeKey: "projects",
    title: "Projects Portfolio",
    description:
      "Explore FTBS past performance in infrastructure, commercial construction, project management, and technology consulting. Sample project profiles available.",
  },
  testimonials: {
    routeKey: "testimonials",
    title: "Testimonials",
    description:
      "Client perspectives on FTBS construction project management, infrastructure delivery, and technology consulting services.",
  },
  certifications: {
    routeKey: "certifications",
    title: "Certifications & Registrations",
    description:
      "FTBS licenses, certifications, insurance, and professional registrations supporting construction and technology services.",
  },
  companyProfile: {
    routeKey: "companyProfile",
    title: "Company Profile Download",
    description:
      "Download or request FTBS company profile, capability statement, and procurement documentation for vendor review.",
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

/** SEO config for dynamic project case study pages */
export function getProjectCaseStudySeo(project: {
  title: string;
  summary: string;
  slug: string;
}): PageSeoConfig {
  return {
    routeKey: "projects",
    title: project.title,
    description: project.summary,
  };
}

export function getProjectCaseStudyPath(slug: string): string {
  return `${routes.projects.path}/${slug}`;
}
