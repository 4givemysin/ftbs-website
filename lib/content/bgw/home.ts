import { company } from "../../company";
import { routes } from "../../routes";
import { bgwDivision } from "../../divisions";

export const bgwHomeContent = {
  hero: {
    eyebrow: "A division of FTBS",
    title: "Infrastructure and construction built for generations",
    description: `${bgwDivision.name} delivers roads, buildings, housing, and essential public works — with the discipline, accountability, and community focus required for government and commercial partners.`,
    primaryCta: { label: "Construction Inquiry", href: routes.bgwInquiry.path },
    secondaryCta: { label: "Capability Statement", href: routes.bgwCapabilityStatement.path },
  },
  pillars: {
    title: "Infrastructure pillars",
    description: "Core construction verticals aligned with BGW's mission and President Paul Gibbs's infrastructure development focus.",
    items: bgwDivision.pillars.map((label) => ({ label })),
  },
  partners: {
    title: "Who we partner with",
    description: "BGW Construction collaborates with organizations that require professional delivery and long-term infrastructure impact.",
    items: bgwDivision.partners,
  },
  seeks: {
    title: "What we seek",
    description: "Partnership and project types where BGW Construction can contribute construction leadership and field execution.",
    items: [
      "Public infrastructure and transportation programs",
      "Commercial buildings and facility construction",
      "Housing and residential development projects",
      "Multi-phase capital programs requiring structured reporting",
      "Community-focused development with durable quality standards",
    ],
  },
  galleryPreview: {
    title: "Project gallery",
    description: "Representative sample projects across infrastructure, commercial, and residential categories.",
    href: routes.bgwProjects.path,
  },
  cta: {
    title: "Partner with BGW Construction",
    description: `Discuss infrastructure, commercial, or residential opportunities with ${bgwDivision.name} — a division of ${company.shortName}.`,
    primaryLabel: "Construction Inquiry",
    primaryHref: routes.bgwInquiry.path,
    secondaryLabel: `About ${company.shortName}`,
    secondaryHref: routes.about.path,
  },
} as const;
