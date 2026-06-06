import { routes } from "./routes";

export type NavLink = {
  label: string;
  href: string;
};

/** Primary header navigation — active routes */
export const mainNavLinks: NavLink[] = [
  { label: routes.about.label, href: routes.about.path },
  { label: routes.services.label, href: routes.services.path },
  { label: routes.projects.label, href: routes.projects.path },
  { label: routes.caseStudies.label, href: routes.caseStudies.path },
  { label: routes.contact.label, href: routes.contact.path },
];

export const footerNav = {
  company: [
    { label: "About FTBS", href: routes.about.path },
    { label: routes.capabilities.label, href: routes.capabilities.path },
    { label: routes.companyProfile.label, href: routes.companyProfile.path },
    { label: routes.projects.label, href: routes.projects.path },
    { label: routes.caseStudies.label, href: routes.caseStudies.path },
    { label: routes.testimonials.label, href: routes.testimonials.path },
    { label: routes.certifications.label, href: routes.certifications.path },
    { label: "Our Services", href: routes.services.path },
    { label: "Contact", href: routes.contact.path },
  ],
  services: [
    { label: "Project Management", href: `${routes.services.path}#project-management` },
    { label: "Infrastructure", href: `${routes.services.path}#infrastructure` },
    {
      label: "Commercial Construction",
      href: `${routes.services.path}#commercial-construction`,
    },
    {
      label: "Technology Consulting",
      href: `${routes.services.path}#technology-consulting`,
    },
    {
      label: "Digital Project Systems",
      href: `${routes.services.path}#digital-project-systems`,
    },
  ],
  future: [
    { label: routes.bgwConstruction.label, href: routes.bgwConstruction.path, phase: 3 },
    { label: routes.government.label, href: routes.government.path, phase: 6 },
  ],
} as const;

export const primaryCta = {
  label: "Partner With Us",
  href: routes.contact.path,
} as const;

/** Credibility pages sub-navigation */
export const credibilityNav: NavLink[] = [
  { label: routes.capabilities.label, href: routes.capabilities.path },
  { label: routes.companyProfile.label, href: routes.companyProfile.path },
  { label: routes.certifications.label, href: routes.certifications.path },
  { label: routes.caseStudies.label, href: routes.caseStudies.path },
];
