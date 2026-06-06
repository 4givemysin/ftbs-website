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
      "FTBS capability statement with core competencies, differentiators, service areas, and government and commercial readiness for procurement partners.",
  },
  projects: {
    routeKey: "projects",
    title: "Projects Portfolio",
    description:
      "FTBS projects portfolio featuring construction, technology, and business consulting engagements with results and impact summaries.",
  },
  caseStudies: {
    routeKey: "caseStudies",
    title: "Case Studies",
    description:
      "FTBS case studies detailing business challenges, solutions, results, and lessons learned from construction and technology programs.",
  },
  testimonials: {
    routeKey: "testimonials",
    title: "Testimonials",
    description:
      "Client testimonials and success stories on FTBS construction project management, infrastructure delivery, and technology consulting.",
  },
  certifications: {
    routeKey: "certifications",
    title: "Certifications & Compliance",
    description:
      "FTBS certifications, compliance standards, industry practices, and future certification goals. Verified credentials published only when confirmed.",
  },
  companyProfile: {
    routeKey: "companyProfile",
    title: "Company Profile",
    description:
      "FTBS company profile with executive overview, history, services, growth vision, and download request for procurement partners.",
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

export function getCaseStudySeo(study: {
  title: string;
  summary: string;
}): PageSeoConfig {
  return {
    routeKey: "caseStudies",
    title: study.title,
    description: study.summary,
  };
}

export function getCaseStudyPath(slug: string): string {
  return `${routes.caseStudies.path}/${slug}`;
}
