import { company } from "@/lib/company";
import { bgwDivision } from "@/lib/divisions";

export const OG_IMAGE = {
  width: 1200,
  height: 630,
  aspectRatio: "1.91:1" as const,
  contentType: "image/png" as const,
  linkedInMinWidth: 1200,
  linkedInMinHeight: 627,
} as const;

export const OG_IMAGE_PATHS = {
  default: "/opengraph-image",
  about: "/about/opengraph-image",
  services: "/services/opengraph-image",
  contact: "/contact/opengraph-image",
  capabilityStatement: "/capability-statement/opengraph-image",
  projects: "/projects/opengraph-image",
  caseStudies: "/case-studies/opengraph-image",
  testimonials: "/testimonials/opengraph-image",
  certifications: "/certifications/opengraph-image",
  companyProfile: "/company-profile/opengraph-image",
  staticDefault: "/og/ftbs-og-default.svg",
  staticAbout: "/og/ftbs-og-about.svg",
  staticServices: "/og/ftbs-og-services.svg",
  staticContact: "/og/ftbs-og-contact.svg",
} as const;

export type OgPageKey =
  | "home"
  | "about"
  | "services"
  | "contact"
  | "capabilityStatement"
  | "projects"
  | "caseStudies"
  | "testimonials"
  | "certifications"
  | "companyProfile";

export type OgImageContent = {
  headline: string;
  subheadline: string;
  divisionLabel?: string;
  divisionTagline?: string;
  showBgw?: boolean;
};

export const OG_PAGE_CONTENT: Record<OgPageKey, OgImageContent> = {
  home: {
    headline: company.shortName,
    subheadline: company.tagline,
    divisionLabel: bgwDivision.shortName,
    divisionTagline: bgwDivision.tagline,
    showBgw: true,
  },
  about: {
    headline: "About FTBS",
    subheadline: "Finesse Technology Business Solutions",
    divisionLabel: bgwDivision.name,
    divisionTagline: "Infrastructure & community development",
    showBgw: true,
  },
  services: {
    headline: "Our Services",
    subheadline: "Construction project management & technology solutions",
    divisionLabel: bgwDivision.shortName,
    divisionTagline: "Roads · Buildings · Housing · Infrastructure",
    showBgw: true,
  },
  contact: {
    headline: "Contact FTBS",
    subheadline: "Partner on construction and infrastructure projects",
    divisionLabel: bgwDivision.shortName,
    divisionTagline: bgwDivision.tagline,
    showBgw: true,
  },
  capabilityStatement: {
    headline: "Capability Statement",
    subheadline: "Government & commercial readiness",
    divisionLabel: bgwDivision.shortName,
    divisionTagline: "Construction · Infrastructure · Technology",
    showBgw: true,
  },
  projects: {
    headline: "Projects Portfolio",
    subheadline: "Construction, technology & consulting",
    divisionLabel: bgwDivision.shortName,
    divisionTagline: "Past performance profiles",
    showBgw: true,
  },
  caseStudies: {
    headline: "Case Studies",
    subheadline: "Challenge · Solution · Results",
    divisionLabel: bgwDivision.shortName,
    divisionTagline: "In-depth program analysis",
    showBgw: true,
  },
  testimonials: {
    headline: "Testimonials",
    subheadline: "Client perspectives on FTBS delivery",
    divisionLabel: bgwDivision.shortName,
    divisionTagline: "Trusted professional partners",
    showBgw: false,
  },
  certifications: {
    headline: "Certifications",
    subheadline: "Credentials & compliance standards",
    divisionLabel: bgwDivision.shortName,
    divisionTagline: "Verified credentials only",
    showBgw: false,
  },
  companyProfile: {
    headline: "Company Profile",
    subheadline: "Executive overview & growth vision",
    divisionLabel: bgwDivision.shortName,
    divisionTagline: company.shortName,
    showBgw: true,
  },
};

const PATH_TO_OG_KEY: Record<string, OgPageKey> = {
  "/": "home",
  "/about": "about",
  "/services": "services",
  "/contact": "contact",
  "/capability-statement": "capabilityStatement",
  "/projects": "projects",
  "/case-studies": "caseStudies",
  "/testimonials": "testimonials",
  "/certifications": "certifications",
  "/company-profile": "companyProfile",
};

export function getOgImageAlt(content: OgImageContent): string {
  const bgw = content.showBgw
    ? ` — ${content.divisionLabel ?? bgwDivision.name}`
    : "";
  return `${content.headline}${bgw} | ${company.shortName}`;
}

export function getDynamicOgImagePath(pageKey: OgPageKey): string {
  const paths: Record<OgPageKey, string> = {
    home: OG_IMAGE_PATHS.default,
    about: OG_IMAGE_PATHS.about,
    services: OG_IMAGE_PATHS.services,
    contact: OG_IMAGE_PATHS.contact,
    capabilityStatement: OG_IMAGE_PATHS.capabilityStatement,
    projects: OG_IMAGE_PATHS.projects,
    caseStudies: OG_IMAGE_PATHS.caseStudies,
    testimonials: OG_IMAGE_PATHS.testimonials,
    certifications: OG_IMAGE_PATHS.certifications,
    companyProfile: OG_IMAGE_PATHS.companyProfile,
  };
  return paths[pageKey];
}

export function getDynamicTwitterImagePath(pageKey: OgPageKey): string {
  const paths: Record<OgPageKey, string> = {
    home: "/twitter-image",
    about: "/about/twitter-image",
    services: "/services/twitter-image",
    contact: "/contact/twitter-image",
    capabilityStatement: "/capability-statement/twitter-image",
    projects: "/projects/twitter-image",
    caseStudies: "/case-studies/twitter-image",
    testimonials: "/testimonials/twitter-image",
    certifications: "/certifications/twitter-image",
    companyProfile: "/company-profile/twitter-image",
  };
  return paths[pageKey];
}

export function getOgPageKeyFromPath(path: string): OgPageKey {
  const normalized = path.split("?")[0] ?? path;
  if (PATH_TO_OG_KEY[normalized]) return PATH_TO_OG_KEY[normalized];
  if (normalized.startsWith("/case-studies/")) return "caseStudies";
  return "home";
}

export function getOgContentForPath(path: string): OgImageContent {
  return OG_PAGE_CONTENT[getOgPageKeyFromPath(path)];
}
