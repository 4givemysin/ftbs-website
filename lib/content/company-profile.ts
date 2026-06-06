import { company } from "../company";
import { routes } from "../routes";
import { services } from "../services";
import { paulGibbs } from "../leadership";

export const companyProfileContent = {
  banner: {
    eyebrow: "Corporate Profile",
    title: "Company Profile",
    description: `Executive overview, company history, services, and growth vision for ${company.name}.`,
  },
  executiveOverview: {
    title: "Executive overview",
    paragraphs: [
      `${company.name} (${company.shortName}) is a construction and technology services firm headquartered in ${company.address.city}, ${company.address.state}.`,
      `${paulGibbs.name} serves as ${paulGibbs.fullTitle} and brings construction leadership, project management, and hands-on development experience to FTBS and its partners.`,
      "FTBS supports government agencies, developers, and institutional partners with project management, infrastructure program support, and technology consulting designed for accountable, long-term delivery.",
    ],
  },
  companyHistory: {
    title: "Company history",
    paragraphs: [
      "FTBS was established to bring disciplined construction project management and practical technology consulting together under one professional partner.",
      `Through ${company.division.name}, led by ${paulGibbs.name}, FTBS pursues infrastructure work — roads, buildings, housing, and essential public systems — with a community-minded commitment to returning home and contributing to national development.`,
    ],
  },
  servicesOverview: {
    title: "Services overview",
    items: services.map((service) => ({
      title: service.title,
      description: service.shortDescription,
      href: `${routes.services.path}#${service.id}`,
    })),
  },
  growthVision: {
    title: "Growth vision",
    paragraphs: [
      "FTBS is building a contract-ready presence with capability statements, past performance profiles, and procurement documentation suitable for government and commercial opportunities.",
      "Near-term growth focuses on credibility assets, verified credentials, approved case studies, and division expansion — without compromising the professional standards partners expect.",
    ],
    goals: [
      "Publish verified certifications and insurance documentation",
      "Replace sample projects and testimonials with approved client content",
      "Expand BGW Construction division pages in Phase 3",
      "Launch government contracting portal in Phase 6",
    ],
  },
  downloadCta: {
    title: "Download company profile",
    description:
      "PDF generation is planned for a future phase. Request a formatted company profile and capability package through our contact team.",
    href: routes.contact.path,
    buttonLabel: "Request Company Profile",
  },
  cta: {
    title: "Need a custom procurement package?",
    description:
      "Contact FTBS with your solicitation requirements and our team will prepare appropriate documentation for review.",
    primaryLabel: "Contact FTBS",
    primaryHref: routes.contact.path,
    secondaryLabel: "Capability Statement",
    secondaryHref: routes.capabilities.path,
  },
} as const;
