import { company } from "../company";
import { bgwDivision } from "../divisions";
import { routes } from "../routes";

export const homeContent = {
  hero: {
    eyebrow: "Finesse Technology Business Solutions",
    title: "Technology and project management for construction and infrastructure",
    description: `${company.shortName} helps partners deploy IT infrastructure, modernize project systems, and deliver complex construction work — with the clarity, control, and professional standards serious organizations require.`,
    primaryCta: { label: "Technology & Services", href: routes.services.path },
    secondaryCta: { label: "Partner With Us", href: routes.contact.path },
  },
  credentials: [
    "IT & Network Infrastructure",
    "Technology Consulting",
    "Project Management",
    "Construction Delivery",
  ],
  technology: {
    eyebrow: "Technology",
    title: "IT infrastructure and systems that keep projects connected",
    description:
      "From nationwide network deployment to field troubleshooting and digital reporting, FTBS brings hands-on technology experience to multi-site and construction environments.",
    highlights: [
      {
        title: "Network infrastructure",
        description:
          "Deploy, maintain, and troubleshoot Cisco routers, switches, and Meraki access points across regional and national programs.",
      },
      {
        title: "Field IT & electrical coordination",
        description:
          "Supervise technicians, run cabling, install systems, and coordinate remote support for retail, institutional, and commercial accounts.",
      },
      {
        title: "Digital project systems",
        description:
          "Reporting dashboards, document control, and field-to-office workflows that improve visibility for leadership and stakeholders.",
      },
      {
        title: "Technology consulting",
        description:
          "Operational strategy, vendor evaluation, and practical guidance for organizations modernizing construction and business systems.",
      },
    ],
  },
  constructionServices: {
    eyebrow: "Construction",
    title: "Project management and construction delivery",
    description:
      "Disciplined oversight for public and private partners — plus infrastructure work through our BGW Construction division when scope requires field construction expertise.",
  },
  values: [
    {
      title: "Technology-first problem solving",
      description:
        "We lead with systems, infrastructure, and practical IT experience — then apply that discipline to construction and project delivery.",
    },
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
      title: "Built for serious partners",
      description:
        "Our team supports organizations that need dependable delivery, professional presentation, and long-term results.",
    },
  ],
  bgw: {
    eyebrow: "Construction division",
    title: `${bgwDivision.name}`,
    description: `Infrastructure development — roads, buildings, housing, and public works — is delivered through ${bgwDivision.name}, a division of ${company.shortName}.`,
    quote: bgwDivision.missionExcerpt,
  },
} as const;
