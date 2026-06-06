import { routes } from "../routes";

export const projectsPageContent = {
  banner: {
    eyebrow: "Past Performance",
    title: "Projects Portfolio",
    description:
      "Explore representative construction, infrastructure, and technology engagements. Sample entries demonstrate FTBS delivery approach and reporting standards.",
  },
  intro: {
    title: "Proof of professional delivery",
    description:
      "Our portfolio highlights the types of programs FTBS supports — from public infrastructure to institutional facilities and technology consulting. All entries below are clearly marked as sample content until client-approved projects are published.",
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
