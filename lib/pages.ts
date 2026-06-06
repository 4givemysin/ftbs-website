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
    title: "Technology & Construction Project Management",
    description:
      "FTBS delivers IT infrastructure, technology consulting, and construction project management for government agencies, developers, and institutional partners.",
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
  faq: {
    routeKey: "faq",
    title: "FAQ",
    description:
      "Frequently asked questions about FTBS services, BGW Construction, government readiness, and how to contact our team.",
  },
  privacy: {
    routeKey: "privacy",
    title: "Privacy Policy",
    description:
      "FTBS privacy policy covering contact form data, email delivery, analytics, and how we protect your information.",
  },
  terms: {
    routeKey: "terms",
    title: "Terms of Service",
    description:
      "Terms of service for using the FTBS website, including acceptable use, disclaimers, and limitations of liability.",
  },
  cookies: {
    routeKey: "cookies",
    title: "Cookie Policy",
    description:
      "FTBS cookie policy explaining how cookies and analytics technologies may be used on our website.",
  },
  bgw: {
    routeKey: "bgw",
    title: "BGW Construction Company",
    description:
      "BGW Construction Company — infrastructure, commercial, and residential construction division of FTBS. Roads, buildings, housing, and public works.",
  },
  bgwInfrastructure: {
    routeKey: "bgwInfrastructure",
    title: "BGW Infrastructure Services",
    description:
      "BGW Construction infrastructure services — roads, transportation, public buildings, and essential public works for government and developer partners.",
  },
  bgwCommercial: {
    routeKey: "bgwCommercial",
    title: "BGW Commercial Construction",
    description:
      "BGW Construction commercial buildings and facilities — code-compliant delivery, schedule discipline, and professional reporting.",
  },
  bgwResidential: {
    routeKey: "bgwResidential",
    title: "BGW Residential Construction",
    description:
      "BGW Construction residential and housing development — community-focused builds with durable construction quality.",
  },
  bgwFutureDevelopment: {
    routeKey: "bgwFutureDevelopment",
    title: "BGW Future Development",
    description:
      "BGW Construction future development vision — long-term infrastructure priorities and partnership opportunities.",
  },
  bgwProjects: {
    routeKey: "bgwProjects",
    title: "BGW Project Gallery",
    description:
      "BGW Construction project gallery — sample infrastructure, commercial, and residential project profiles.",
  },
  bgwCapabilityStatement: {
    routeKey: "bgwCapabilityStatement",
    title: "BGW Construction Capability Statement",
    description:
      "BGW Construction capability statement for government and commercial procurement — core competencies and readiness.",
  },
  bgwInquiry: {
    routeKey: "bgwInquiry",
    title: "BGW Construction Inquiry",
    description:
      "Submit a BGW Construction inquiry for infrastructure, commercial, residential, or public works projects.",
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
