import { routes } from "../routes";

export const testimonialsPageContent = {
  banner: {
    eyebrow: "Client Perspectives",
    title: "Testimonials",
    description:
      "What partners say about working with FTBS. All quotes below are sample content for layout purposes until client-approved testimonials are published.",
  },
  intro: {
    title: "Trusted by organizations that expect accountability",
    description:
      "FTBS supports government agencies, developers, and institutional clients who require professional communication, disciplined delivery, and clear reporting.",
  },
  cta: {
    title: "Become a reference partner",
    description:
      "If you have worked with FTBS and would like to share feedback, contact our team to discuss approved testimonial publication.",
    primaryLabel: "Contact FTBS",
    primaryHref: routes.contact.path,
    secondaryLabel: "View Projects",
    secondaryHref: routes.projects.path,
  },
} as const;
