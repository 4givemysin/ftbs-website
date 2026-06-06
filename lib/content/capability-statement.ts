import { company, formattedAddress } from "../company";
import { paulGibbs } from "../leadership";
import { routes } from "../routes";
import { services } from "../services";

export const capabilityStatementContent = {
  banner: {
    eyebrow: "Corporate Credentials",
    title: "Capability Statement",
    description: `${company.shortName} delivers construction project management, infrastructure support, and technology consulting for government agencies, commercial developers, and institutional partners.`,
  },
  companyOverview: {
    title: "Company overview",
    paragraphs: [
      `${company.name} is a professional services firm supporting complex construction and infrastructure programs with disciplined project management and technology-enabled delivery.`,
      `${company.shortName} is led by ${paulGibbs.name}, ${paulGibbs.fullTitle}, who brings regional project management, IT infrastructure delivery, construction leadership, and hands-on electrical experience to partnerships with government agencies, commercial developers, and institutional clients.`,
    ],
  },
  missionStatement: {
    title: "Mission statement",
    content:
      "Deliver construction and technology solutions with discipline, transparency, and a commitment to outcomes that serve clients, communities, and long-term infrastructure development.",
  },
  coreCompetencies: [
    {
      title: "Construction Project Management",
      description:
        "Schedule control, budget tracking, subcontractor coordination, quality oversight, and stakeholder reporting for public and private programs.",
    },
    {
      title: "Infrastructure Development",
      description:
        "Roads, housing, buildings, and essential public works delivered with phased planning and compliance-aware execution.",
    },
    {
      title: "Technology & Business Consulting",
      description:
        "Operational strategy, process improvement, and digital systems that improve visibility across construction programs.",
    },
  ],
  differentiators: [
    "Dual focus on construction delivery and technology-enabled operations",
    "Experience supporting government, developer, and institutional client types",
    "Executive-ready reporting suitable for public-sector and board review",
    "Leadership by Paul Gibbs, President of BGW Construction Company",
    "Disciplined documentation and procurement-ready communication",
  ],
  serviceAreas: services.map((service) => ({
    title: service.title,
    description: service.shortDescription,
    href: `${routes.services.path}#${service.id}`,
  })),
  contactInformation: {
    title: "Contact information",
    email: company.email,
    leadershipEmail: paulGibbs.email,
    leadershipName: paulGibbs.fullTitle,
    address: formattedAddress,
    phone: company.phone,
  },
  downloadCta: {
    title: "Download capability statement",
    description:
      "Request a formatted capability statement package for procurement review, vendor registration, or partnership evaluation.",
    href: routes.contact.path,
    buttonLabel: "Request Capability Package",
  },
  readiness: {
    title: "Government and commercial readiness",
    description:
      "FTBS is building a contract-ready presence with structured credentials, sample past performance, and procurement documentation workflows.",
    items: [
      {
        title: "Government partners",
        description:
          "Structured reporting, compliance-aware documentation, and program governance suitable for public agency review.",
      },
      {
        title: "Commercial developers",
        description:
          "Schedule discipline, investor-ready reporting, and subcontractor accountability for private development programs.",
      },
      {
        title: "Institutional clients",
        description:
          "Occupied-facility coordination, safety protocols, and executive communication for complex institutional work.",
      },
      {
        title: "Procurement documentation",
        description:
          "Capability statement, company profile, and insurance documentation available upon request — verified details published as confirmed.",
      },
    ],
  },
  cta: {
    title: "Discuss qualifications for your program",
    description:
      "Contact FTBS to request credentials, insurance documentation, or a capability briefing for your organization.",
    primaryLabel: "Contact FTBS",
    primaryHref: routes.contact.path,
    secondaryLabel: "View Case Studies",
    secondaryHref: routes.caseStudies.path,
  },
} as const;
