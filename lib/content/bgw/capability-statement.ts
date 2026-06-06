import { company } from "../../company";
import { paulGibbs } from "../../leadership";
import { routes } from "../../routes";
import { bgwDivision } from "../../divisions";

export const bgwCapabilityContent = {
  banner: {
    eyebrow: "BGW Construction",
    title: "Construction Capability Statement",
    description: `${bgwDivision.name} capability overview for government agencies, developers, and institutional partners evaluating infrastructure and construction delivery.`,
  },
  overview: {
    title: "Division overview",
    paragraphs: [
      `${bgwDivision.name} is the construction division of ${company.name}, focused on roads, buildings, housing, and essential public works that strengthen communities.`,
      `Led by ${paulGibbs.fullTitle}, BGW brings regional project management, field supervision, and hands-on construction experience to partnerships that require accountable delivery and procurement-ready communication.`,
    ],
  },
  coreCompetencies: [
    {
      title: "Infrastructure Development",
      description:
        "Road and transportation corridors, public buildings, utilities coordination, and phased infrastructure programs for agency and developer partners.",
    },
    {
      title: "Commercial Construction",
      description:
        "Commercial buildings and facilities delivered with code compliance, schedule discipline, and stakeholder reporting suitable for executive and board review.",
    },
    {
      title: "Residential & Housing",
      description:
        "Housing and residential development programs aligned with community growth, long-term occupancy standards, and durable construction quality.",
    },
    {
      title: "Program Management",
      description:
        "Owner-side and partner-side oversight — budget tracking, subcontractor coordination, quality checkpoints, and documentation for public review.",
    },
  ],
  differentiators: [
    "Infrastructure-first mission aligned with national development goals",
    "OSHA 10, EPA HVAC, and Certified Pool Operator credentials held by division leadership",
    "Hillsborough County Public Schools registered contractor experience",
    "Parent support from FTBS for technology-enabled reporting and business systems",
    "Structured communication for government, developer, and institutional stakeholders",
    "Sample past performance available — verified projects published upon approval",
  ],
  readiness: {
    title: "Government and commercial readiness",
    items: [
      {
        title: "Government agencies",
        description:
          "Structured reporting, compliance-aware documentation, and program governance for public infrastructure and capital programs.",
      },
      {
        title: "Commercial developers",
        description:
          "Schedule-driven delivery, subcontractor coordination, and executive-ready status reporting across multi-phase builds.",
      },
      {
        title: "Institutional partners",
        description:
          "Facilities and campus programs with consistent documentation, safety awareness, and long-term asset quality.",
      },
    ],
  },
  downloadCta: {
    title: "Request BGW capability package",
    description:
      "Request a formatted BGW construction capability package for vendor registration, prequalification, or partnership evaluation.",
    href: routes.bgwInquiry.path,
    buttonLabel: "Request Capability Package",
  },
  cta: {
    title: "Discuss a construction or infrastructure partnership",
    description:
      "Contact BGW Construction to explore roads, buildings, housing, and public works opportunities.",
    primaryLabel: "Construction Inquiry",
    primaryHref: routes.bgwInquiry.path,
    secondaryLabel: "View Project Gallery",
    secondaryHref: routes.bgwProjects.path,
  },
} as const;
