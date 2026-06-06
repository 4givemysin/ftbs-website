import { company } from "../company";
import { routes } from "../routes";

export const capabilitiesContent = {
  banner: {
    eyebrow: "Corporate Credentials",
    title: "Capability Statement",
    description: `${company.shortName} provides construction project management, infrastructure support, and technology consulting for government agencies, developers, and institutional partners.`,
  },
  overview: {
    title: "Company overview",
    paragraphs: [
      `${company.name} is a professional services firm supporting complex construction and infrastructure programs with disciplined project management and technology-enabled delivery.`,
      "Our team combines field experience, business leadership, and systems thinking to help partners execute with accountability, transparency, and long-term community impact.",
    ],
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
    "Professional reporting suitable for executive and public-sector review",
    "Community-minded infrastructure approach through BGW Construction Company",
  ],
  pastPerformance: {
    title: "Past performance highlights (sample)",
    description:
      "Representative project profiles below are sample content for layout and credibility structure. Approved case studies will replace these entries.",
    linkLabel: "View sample projects",
    linkHref: routes.projects.path,
  },
  naicsPreview: {
    title: "NAICS codes (preview)",
    description:
      "Full NAICS listing, SAM registration, and vendor documentation will be published in Phase 6. Preview categories below reflect anticipated service areas.",
    codes: [
      { code: "236220", label: "Commercial and Institutional Building Construction" },
      { code: "237310", label: "Highway, Street, and Bridge Construction" },
      { code: "541618", label: "Other Management Consulting Services" },
      { code: "541512", label: "Computer Systems Design Services" },
    ],
    note: "Sample preview only — verify codes before government submissions.",
  },
  downloadCta: {
    title: "Download company profile",
    description:
      "Request a formatted capability statement and company profile package suitable for procurement review.",
    href: routes.companyProfile.path,
    buttonLabel: "Company Profile Download",
  },
  cta: {
    title: "Discuss qualifications for your program",
    description:
      "Contact FTBS to request credentials, insurance documentation, or a capability briefing for your organization.",
    primaryLabel: "Contact FTBS",
    primaryHref: routes.contact.path,
    secondaryLabel: "View Projects",
    secondaryHref: routes.projects.path,
  },
} as const;
