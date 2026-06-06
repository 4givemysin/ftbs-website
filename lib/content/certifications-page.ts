import { routes } from "../routes";

export const certificationsPageContent = {
  banner: {
    eyebrow: "Credentials",
    title: "Certifications & Registrations",
    description:
      "Licenses, insurance, and professional registrations that support FTBS work with public and private partners. Sample entries are placeholders pending verification.",
  },
  intro: {
    title: "Verifiable credentials only",
    description:
      "FTBS publishes certifications and registrations only after official confirmation. Items marked as sample or pending will be updated as documentation is verified.",
  },
  cta: {
    title: "Request credential documentation",
    description:
      "Qualified partners may request certificates of insurance, registration details, or capability materials for procurement review.",
    primaryLabel: "Contact FTBS",
    primaryHref: routes.contact.path,
    secondaryLabel: "Capability Statement",
    secondaryHref: routes.capabilities.path,
  },
} as const;
