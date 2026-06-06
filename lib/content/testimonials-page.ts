import { routes } from "../routes";

export const testimonialsPageContent = {
  banner: {
    eyebrow: "Client Perspectives",
    title: "Testimonials",
    description:
      "Client feedback and success stories across government, construction, institutional, and technology engagements. All content is sample/demo until real testimonials are approved.",
  },
  intro: {
    title: "Trusted by organizations that expect accountability",
    description:
      "FTBS supports partners who require professional communication, disciplined delivery, and clear reporting across complex programs.",
  },
  cta: {
    title: "Become a reference partner",
    description:
      "If you have worked with FTBS and would like to share feedback, contact our team to discuss approved testimonial publication.",
    primaryLabel: "Contact FTBS",
    primaryHref: routes.contact.path,
    secondaryLabel: "View Case Studies",
    secondaryHref: routes.caseStudies.path,
  },
} as const;
