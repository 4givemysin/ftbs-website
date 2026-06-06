/**
 * Central route registry for current and planned pages.
 * Phase 1 routes are active; future routes document expansion paths.
 */
export type RoutePhase = 1 | 2 | 3 | 4 | 5 | 6;

export type RouteDefinition = {
  path: string;
  label: string;
  phase: RoutePhase;
  active: boolean;
  description: string;
};

export const routes = {
  home: {
    path: "/",
    label: "Home",
    phase: 1,
    active: true,
    description: "Corporate homepage",
  },
  about: {
    path: "/about",
    label: "About",
    phase: 1,
    active: true,
    description: "Company overview and mission",
  },
  services: {
    path: "/services",
    label: "Services",
    phase: 1,
    active: true,
    description: "Construction and technology services",
  },
  contact: {
    path: "/contact",
    label: "Contact",
    phase: 1,
    active: true,
    description: "General inquiry and contact information",
  },
  // Phase 2 — business credibility
  capabilities: {
    path: "/capability-statement",
    label: "Capability Statement",
    phase: 2,
    active: true,
    description: "Corporate capability statement for government and commercial partners",
  },
  projects: {
    path: "/projects",
    label: "Projects",
    phase: 2,
    active: true,
    description: "Projects portfolio hub",
  },
  caseStudies: {
    path: "/case-studies",
    label: "Case Studies",
    phase: 2,
    active: true,
    description: "Detailed case studies with challenge, solution, and results",
  },
  testimonials: {
    path: "/testimonials",
    label: "Testimonials",
    phase: 2,
    active: true,
    description: "Client testimonials and references",
  },
  certifications: {
    path: "/certifications",
    label: "Certifications",
    phase: 2,
    active: true,
    description: "Licenses, compliance standards, and certification goals",
  },
  companyProfile: {
    path: "/company-profile",
    label: "Company Profile",
    phase: 2,
    active: true,
    description: "Company profile and procurement downloads",
  },
  faq: {
    path: "/faq",
    label: "FAQ",
    phase: 2,
    active: true,
    description: "Frequently asked questions",
  },
  privacy: {
    path: "/legal/privacy",
    label: "Privacy Policy",
    phase: 2,
    active: true,
    description: "Privacy policy",
  },
  terms: {
    path: "/legal/terms",
    label: "Terms of Service",
    phase: 2,
    active: true,
    description: "Terms of service",
  },
  cookies: {
    path: "/legal/cookies",
    label: "Cookie Policy",
    phase: 2,
    active: true,
    description: "Cookie and tracking disclosure",
  },
  // Phase 3 — BGW Construction division
  bgw: {
    path: "/bgw",
    label: "BGW Construction",
    phase: 3,
    active: true,
    description: "BGW Construction Company division hub",
  },
  bgwInfrastructure: {
    path: "/bgw/infrastructure",
    label: "Infrastructure",
    phase: 3,
    active: true,
    description: "BGW infrastructure services — roads, public works, essential systems",
  },
  bgwCommercial: {
    path: "/bgw/commercial",
    label: "Commercial Construction",
    phase: 3,
    active: true,
    description: "BGW commercial buildings and facilities",
  },
  bgwResidential: {
    path: "/bgw/residential",
    label: "Residential Construction",
    phase: 3,
    active: true,
    description: "BGW housing and residential development",
  },
  bgwFutureDevelopment: {
    path: "/bgw/future-development",
    label: "Future Development",
    phase: 3,
    active: true,
    description: "BGW long-term development vision and partnerships",
  },
  bgwProjects: {
    path: "/bgw/projects",
    label: "Project Gallery",
    phase: 3,
    active: true,
    description: "BGW project photo gallery",
  },
  bgwCapabilityStatement: {
    path: "/bgw/capability-statement",
    label: "BGW Capability Statement",
    phase: 3,
    active: true,
    description: "BGW construction capability statement for procurement partners",
  },
  bgwInquiry: {
    path: "/bgw/inquiry",
    label: "Construction Inquiry",
    phase: 3,
    active: true,
    description: "BGW construction inquiry form",
  },
  /** @deprecated Use routes.bgw — kept for redirect registry */
  divisions: {
    path: "/divisions",
    label: "Divisions",
    phase: 3,
    active: false,
    description: "FTBS divisions overview",
  },
  /** @deprecated Use routes.bgw */
  bgwConstruction: {
    path: "/bgw",
    label: "BGW Construction",
    phase: 3,
    active: false,
    description: "BGW Construction Company division hub",
  },
  /** @deprecated Use routes.bgwProjects */
  bgwGallery: {
    path: "/bgw/projects",
    label: "BGW Project Gallery",
    phase: 3,
    active: false,
    description: "BGW project photo gallery",
  },
  // Phase 4
  consultation: {
    path: "/contact/consultation",
    label: "Consultation",
    phase: 4,
    active: false,
    description: "Consultation request form",
  },
  quote: {
    path: "/contact/quote",
    label: "Quote Request",
    phase: 4,
    active: false,
    description: "Quote request form",
  },
  projectInquiry: {
    path: "/contact/project-inquiry",
    label: "Project Inquiry",
    phase: 4,
    active: false,
    description: "Project inquiry form",
  },
  // Phase 5
  blog: {
    path: "/blog",
    label: "Blog",
    phase: 5,
    active: false,
    description: "Company blog",
  },
  news: {
    path: "/news",
    label: "News",
    phase: 5,
    active: false,
    description: "Company news and announcements",
  },
  resources: {
    path: "/resources",
    label: "Resource Center",
    phase: 5,
    active: false,
    description: "Guides, downloads, and resources",
  },
  careers: {
    path: "/careers",
    label: "Careers",
    phase: 5,
    active: false,
    description: "Careers and open positions",
  },
  mediaKit: {
    path: "/media-kit",
    label: "Media Kit",
    phase: 5,
    active: false,
    description: "Press and media resources",
  },
  // Phase 6
  government: {
    path: "/government",
    label: "Government Contracting",
    phase: 6,
    active: false,
    description: "Government contracting portal",
  },
  vendorInfo: {
    path: "/government/vendor-information",
    label: "Vendor Information",
    phase: 6,
    active: false,
    description: "Vendor and procurement information",
  },
} as const satisfies Record<string, RouteDefinition>;

export type RouteKey = keyof typeof routes;

export const activeRoutes = Object.values(routes).filter((route) => route.active);

export const routesByPhase = (phase: RoutePhase) =>
  Object.values(routes).filter((route) => route.phase === phase);

export function getRoute(key: RouteKey): RouteDefinition {
  return routes[key];
}
