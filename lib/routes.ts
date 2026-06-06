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
  // Phase 2
  capabilities: {
    path: "/about/capabilities",
    label: "Capability Statement",
    phase: 2,
    active: false,
    description: "Corporate capability statement",
  },
  projects: {
    path: "/projects",
    label: "Projects",
    phase: 2,
    active: false,
    description: "Projects portfolio hub",
  },
  certifications: {
    path: "/about/certifications",
    label: "Certifications",
    phase: 2,
    active: false,
    description: "Licenses and certifications",
  },
  faq: {
    path: "/faq",
    label: "FAQ",
    phase: 2,
    active: false,
    description: "Frequently asked questions",
  },
  privacy: {
    path: "/legal/privacy",
    label: "Privacy Policy",
    phase: 2,
    active: false,
    description: "Privacy policy",
  },
  terms: {
    path: "/legal/terms",
    label: "Terms of Service",
    phase: 2,
    active: false,
    description: "Terms of service",
  },
  // Phase 3
  divisions: {
    path: "/divisions",
    label: "Divisions",
    phase: 3,
    active: false,
    description: "FTBS divisions overview",
  },
  bgwConstruction: {
    path: "/divisions/bgw-construction",
    label: "BGW Construction",
    phase: 3,
    active: false,
    description: "BGW Construction Company division hub",
  },
  bgwGallery: {
    path: "/divisions/bgw-construction/projects",
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
