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
  "BGW Construction Inquiry",
  "BGW Infrastructure Project",
  "BGW Commercial Project",
  "BGW Residential Project",
  "BGW Government / Public Works",
] as const;

export type InquiryType = (typeof inquiryTypes)[number];

export const projectFocusOptions = [
  "Roads",
  "Buildings",
  "Housing",
  "Other Infrastructure",
] as const;

export type ProjectFocus = (typeof projectFocusOptions)[number];

export const bgwInquiryTypes = [
  "BGW Construction Inquiry",
  "BGW Infrastructure Project",
  "BGW Commercial Project",
  "BGW Residential Project",
  "BGW Government / Public Works",
] as const;

export type BgwInquiryType = (typeof bgwInquiryTypes)[number];

export const bgwProjectFocusOptions = [
  "Roads & Transportation",
  "Public Buildings",
  "Commercial Facilities",
  "Housing & Residential",
  "Public Works",
] as const;

export type BgwProjectFocus = (typeof bgwProjectFocusOptions)[number];

/** Phase 4 planned form routes */
export const plannedFormRoutes = {
  consultation: "/contact/consultation",
  quote: "/contact/quote",
  projectInquiry: "/contact/project-inquiry",
} as const;
