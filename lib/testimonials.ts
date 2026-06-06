export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  title: string;
  organization: string;
  /** Sample content flag — replace with client-approved quotes */
  isSample: true;
};

export const testimonials: Testimonial[] = [
  {
    id: "sample-government-program",
    quote:
      "Sample testimonial: FTBS brought structure to a complex public infrastructure program. Reporting was consistent, communication was clear, and our team always knew where the project stood.",
    name: "Program Director",
    title: "Capital Projects Office",
    organization: "Sample Municipal Agency",
    isSample: true,
  },
  {
    id: "sample-developer-partner",
    quote:
      "Sample testimonial: We needed a partner who understood both schedule discipline and stakeholder expectations. FTBS helped us keep multiple workstreams aligned without losing sight of quality.",
    name: "Development Manager",
    title: "Project Development",
    organization: "Sample Regional Developer",
    isSample: true,
  },
  {
    id: "sample-institutional-client",
    quote:
      "Sample testimonial: The FTBS team approached our facility program with professionalism and accountability. Their documentation and coordination made executive updates straightforward.",
    name: "Facilities Director",
    title: "Operations & Facilities",
    organization: "Sample Institutional Client",
    isSample: true,
  },
  {
    id: "sample-technology-consulting",
    quote:
      "Sample testimonial: FTBS helped us evaluate systems with a practical lens — focused on what field teams would actually use, not just software features on a brochure.",
    name: "Operations Lead",
    title: "Construction Operations",
    organization: "Sample Construction Firm",
    isSample: true,
  },
];

export function getFeaturedTestimonials(limit = 3): Testimonial[] {
  return testimonials.slice(0, limit);
}
