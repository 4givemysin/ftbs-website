import { routes } from "../routes";

export const projectsPageContent = {
  banner: {
    eyebrow: "Past Performance",
    title: "Projects Portfolio",
    description:
      "Representative construction, technology, and business consulting engagements. All entries are sample placeholder content until client-approved projects are published.",
  },
  intro: {
    title: "Proof of professional delivery",
    description:
      "Explore featured programs and track-specific project profiles that demonstrate how FTBS supports complex work with clarity, accountability, and measurable results.",
  },
  resultsSection: {
    eyebrow: "Results & impact",
    title: "Delivery outcomes that matter to partners",
    description:
      "Sample aggregate indicators below illustrate the reporting standards and impact framing FTBS applies across programs. Replace with verified metrics as approved projects are published.",
  },
  cta: {
    title: "Discuss a project or program opportunity",
    description:
      "Contact FTBS to review qualifications, request references, or explore partnership on upcoming work.",
    primaryLabel: "Partner With Us",
    primaryHref: routes.contact.path,
    secondaryLabel: "Capability Statement",
    secondaryHref: routes.capabilities.path,
  },
} as const;
