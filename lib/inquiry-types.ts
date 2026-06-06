/**
 * Inquiry types for contact forms.
 * Phase 4 will split these into dedicated form routes.
 */
export const inquiryTypes = [
  "General Inquiry",
  "Infrastructure Partnership",
  "Construction Project Management",
  "Technology Consulting",
  "Request a Quote",
] as const;

export type InquiryType = (typeof inquiryTypes)[number];

export const projectFocusOptions = [
  "Roads",
  "Buildings",
  "Housing",
  "Other Infrastructure",
] as const;

export type ProjectFocus = (typeof projectFocusOptions)[number];

/** Phase 4 planned form routes */
export const plannedFormRoutes = {
  consultation: "/contact/consultation",
  quote: "/contact/quote",
  projectInquiry: "/contact/project-inquiry",
} as const;
