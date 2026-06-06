import { routes } from "./routes";

export type NavLink = {
  label: string;
  href: string;
};

/** Primary header navigation — Phase 1 active routes only */
export const mainNavLinks: NavLink[] = [
  { label: routes.about.label, href: routes.about.path },
  { label: routes.services.label, href: routes.services.path },
  { label: routes.contact.label, href: routes.contact.path },
];

export const footerNav = {
  company: [
    { label: "About FTBS", href: routes.about.path },
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
  /** Reserved for Phase 2+ — enable when routes.active === true */
  future: [
    { label: routes.capabilities.label, href: routes.capabilities.path, phase: 2 },
    { label: routes.projects.label, href: routes.projects.path, phase: 2 },
    { label: routes.bgwConstruction.label, href: routes.bgwConstruction.path, phase: 3 },
    { label: routes.government.label, href: routes.government.path, phase: 6 },
  ],
} as const;

export const primaryCta = {
  label: "Partner With Us",
  href: routes.contact.path,
} as const;
