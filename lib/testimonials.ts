export type TestimonialIndustry =
  | "government"
  | "construction"
  | "institutional"
  | "technology";

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  title: string;
  organization: string;
  industry: TestimonialIndustry;
  featured: boolean;
  /** Sample content flag — replace with client-approved quotes */
  isSample: true;
};

export type SuccessStory = {
  id: string;
  title: string;
  summary: string;
  industry: TestimonialIndustry;
  /** Sample content flag */
  isSample: true;
};

export const testimonialIndustries: { id: TestimonialIndustry; label: string }[] = [
  { id: "government", label: "Government & Public Sector" },
  { id: "construction", label: "Construction & Development" },
  { id: "institutional", label: "Institutional" },
  { id: "technology", label: "Technology & Operations" },
];

export const testimonials: Testimonial[] = [
  {
    id: "sample-government-program",
    quote:
      "Sample testimonial: FTBS brought structure to a complex public infrastructure program. Reporting was consistent, communication was clear, and our team always knew where the project stood.",
    name: "Program Director",
    title: "Capital Projects Office",
    organization: "Sample Municipal Agency",
    industry: "government",
    featured: true,
    isSample: true,
  },
  {
    id: "sample-developer-partner",
    quote:
      "Sample testimonial: We needed a partner who understood both schedule discipline and stakeholder expectations. FTBS helped us keep multiple workstreams aligned without losing sight of quality.",
    name: "Development Manager",
    title: "Project Development",
    organization: "Sample Regional Developer",
    industry: "construction",
    featured: true,
    isSample: true,
  },
  {
    id: "sample-institutional-client",
    quote:
      "Sample testimonial: The FTBS team approached our facility program with professionalism and accountability. Their documentation and coordination made executive updates straightforward.",
    name: "Facilities Director",
    title: "Operations & Facilities",
    organization: "Sample Institutional Client",
    industry: "institutional",
    featured: true,
    isSample: true,
  },
  {
    id: "sample-technology-consulting",
    quote:
      "Sample testimonial: FTBS helped us evaluate systems with a practical lens — focused on what field teams would actually use, not just software features on a brochure.",
    name: "Operations Lead",
    title: "Construction Operations",
    organization: "Sample Construction Firm",
    industry: "technology",
    featured: false,
    isSample: true,
  },
  {
    id: "sample-government-reporting",
    quote:
      "Sample testimonial: Weekly reporting cadence and risk documentation gave our leadership team confidence during a high-visibility public works phase.",
    name: "Deputy Director",
    title: "Public Works",
    organization: "Sample County Agency",
    industry: "government",
    featured: false,
    isSample: true,
  },
  {
    id: "sample-construction-schedule",
    quote:
      "Sample testimonial: FTBS maintained schedule accountability across subcontractors and kept our investor updates aligned with field progress.",
    name: "Project Executive",
    title: "Development",
    organization: "Sample Housing Developer",
    industry: "construction",
    featured: false,
    isSample: true,
  },
];

export const successStories: SuccessStory[] = [
  {
    id: "story-public-reporting",
    title: "Restored reporting confidence for a public program",
    summary:
      "Sample success story: standardized executive reporting and risk tracking for a multi-phase infrastructure engagement.",
    industry: "government",
    isSample: true,
  },
  {
    id: "story-occupied-renovation",
    title: "Delivered occupied-facility upgrades on schedule",
    summary:
      "Sample success story: zone-based sequencing kept institutional operations running during renovation work.",
    industry: "institutional",
    isSample: true,
  },
  {
    id: "story-systems-roadmap",
    title: "Created a practical technology adoption roadmap",
    summary:
      "Sample success story: field-informed systems evaluation and phased rollout planning for a construction operator.",
    industry: "technology",
    isSample: true,
  },
];

export function getFeaturedTestimonials(): Testimonial[] {
  return testimonials.filter((item) => item.featured);
}

export function getTestimonialsByIndustry(
  industry: TestimonialIndustry,
): Testimonial[] {
  return testimonials.filter((item) => item.industry === industry);
}

export function getIndustryLabel(industry: TestimonialIndustry): string {
  return (
    testimonialIndustries.find((item) => item.id === industry)?.label ?? industry
  );
}
