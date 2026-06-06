import { company } from "../company";
import { routes } from "../routes";

export const companyProfileContent = {
  banner: {
    eyebrow: "Procurement Resources",
    title: "Company Profile Download",
    description: `Download or request a formatted company profile and capability package for ${company.shortName} procurement review.`,
  },
  packages: [
    {
      title: "Capability Statement (PDF)",
      description:
        "One-page overview of core competencies, differentiators, and contact information suitable for initial vendor review.",
      status: "Sample package — PDF generation planned",
      actionLabel: "Request via Contact",
      actionHref: `${routes.contact.path}?inquiry=capability-request`,
    },
    {
      title: "Company Profile (PDF)",
      description:
        "Extended company profile with leadership overview, service summary, and sample past performance highlights.",
      status: "Sample package — PDF generation planned",
      actionLabel: "Request via Contact",
      actionHref: `${routes.contact.path}?inquiry=profile-request`,
    },
    {
      title: "Insurance & Registration Packet",
      description:
        "Certificate of insurance and registration documentation for qualified procurement partners.",
      status: "Available upon request",
      actionLabel: "Contact FTBS",
      actionHref: routes.contact.path,
    },
  ],
  includes: [
    "Company legal name, address, and primary contact",
    "Core competencies and service overview",
    "Sample past performance summaries",
    "Certification and registration status (as verified)",
    "NAICS preview (full detail in Phase 6)",
  ],
  cta: {
    title: "Need a custom procurement package?",
    description:
      "Contact FTBS with your solicitation requirements and our team will prepare appropriate documentation for review.",
    primaryLabel: "Contact FTBS",
    primaryHref: routes.contact.path,
    secondaryLabel: "View Capability Statement",
    secondaryHref: routes.capabilities.path,
  },
} as const;
