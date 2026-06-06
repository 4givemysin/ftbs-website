import { routes } from "../routes";

export const certificationsPageContent = {
  banner: {
    eyebrow: "Credentials & Compliance",
    title: "Certifications",
    description:
      "Current credentials, future certification goals, compliance standards, and industry practices. FTBS does not claim unearned certifications.",
  },
  intro: {
    title: "Honest, verifiable credentials",
    description:
      "Only verified licenses, registrations, and certifications will be published. Placeholder sections indicate where documentation will appear once confirmed.",
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
