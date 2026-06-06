import { company } from "../company";
import { bgwDivision } from "../divisions";

export const homeContent = {
  hero: {
    eyebrow: "Finesse Technology Business Solutions",
    title: "Construction project management and technology solutions you can trust",
    description: `${company.shortName} helps government agencies, developers, and institutional partners deliver complex construction and infrastructure work with clarity, control, and professional standards.`,
    primaryCta: { label: "View Services", href: "/services" },
    secondaryCta: { label: "Partner With Us", href: "/contact" },
  },
  credentials: [
    "Project Management",
    "Infrastructure Focus",
    "Technology Consulting",
    "Professional Delivery",
  ],
  values: [
    {
      title: "Seamless project delivery",
      description:
        "We make project management seamless through disciplined planning, clear communication, and accountable execution.",
    },
    {
      title: "Construction and technology together",
      description:
        "FTBS combines field experience with business and systems expertise to support smarter project outcomes.",
    },
    {
      title: "Community-minded infrastructure",
      description: `Through ${bgwDivision.name}, we pursue roads, buildings, housing, and essential infrastructure that strengthens communities.`,
    },
    {
      title: "Built for serious partners",
      description:
        "Our team supports organizations that need dependable delivery, professional presentation, and long-term results.",
    },
  ],
  bgw: {
    eyebrow: bgwDivision.name,
    title: "Infrastructure work with purpose and long-term impact",
    description: `${bgwDivision.name}, a division of ${company.shortName}, focuses on projects that reinforce roads, buildings, housing, and essential infrastructure for communities and national development.`,
    quote: bgwDivision.missionExcerpt,
  },
} as const;
