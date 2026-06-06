import { routes } from "../routes";

export const caseStudiesPageContent = {
  banner: {
    eyebrow: "In-Depth Analysis",
    title: "Case Studies",
    description:
      "Detailed examinations of business challenges, solutions, results, and lessons learned. All three case studies below are sample/demo content.",
  },
  intro: {
    title: "How FTBS approaches complex programs",
    description:
      "Each case study follows a structured format — challenge, solution, results, and lessons learned — suitable for procurement review and partner evaluation.",
  },
  cta: {
    title: "Explore partnership on your next program",
    description:
      "Contact FTBS to discuss qualifications or request a capability briefing tailored to your organization.",
    primaryLabel: "Contact FTBS",
    primaryHref: routes.contact.path,
    secondaryLabel: "View Projects",
    secondaryHref: routes.projects.path,
  },
} as const;
