import { company } from "./company";

export type WorkExperience = {
  id: string;
  company: string;
  role: string;
  location: string;
  period: string;
  highlights: string[];
};

export type EducationEntry = {
  id: string;
  name: string;
  detail?: string;
  period?: string;
};

/**
 * FTBS / BGW leadership — single source of truth for executive content and resume.
 */
export const paulGibbs = {
  name: "Paul Gibbs",
  /** Primary role at FTBS (parent company) */
  ftbsTitle: "CEO",
  /** Role leading the BGW Construction division */
  title: "President",
  organization: company.division.name,
  fullTitle: "CEO, FTBS · President, BGW Construction Company",
  resumeHeadline: "CEO — Regional Project Manager",
  phone: "(954) 224-1283",
  email: company.email,
  website: company.url,
  languages: ["English", "Spanish"] as const,
  summary:
    "Highly skilled and versatile project manager with extensive experience in IT, electrical services, and maintenance across construction, retail, and institutional environments. Proven track record as a field supervisor and regional project manager — training technicians, managing complex electrical and network systems, and delivering excellent customer service. Certified in EPA HVAC Type 1 & 2 and OSHA 10 Construction Safety. Committed, independent, and a strong team player with the ability to work effectively across diverse cultures and backgrounds.",
  bio: "Paul Gibbs serves as CEO of FTBS and President of BGW Construction Company. He brings construction industry leadership, regional project management, IT infrastructure delivery, and hands-on electrical and building experience — with a focus on infrastructure development, community growth, and long-term national progress.",
  skills: [
    "Construction and electrical project management",
    "Field supervision and technician training",
    "HVAC fundamentals",
    "Drywall and sheetrock installation",
    "Electrical installation and testing",
    "Plumbing fundamentals",
    "Cisco routers, switches, and Meraki access points",
    "Microsoft Office and Windows",
  ] as const,
  professionalCertifications: [
    "EPA HVAC Type 1 & 2",
    "Certified Pool Operator",
    "OSHA 10 Construction Safety",
  ] as const,
  education: [
    {
      id: "lincoln-tech",
      name: "Lincoln Technical Institute",
      detail: "Union, NJ",
    },
    {
      id: "goodwill-north-ga",
      name: "Goodwill of North Georgia",
      period: "Feb 2012 – Apr 2012",
    },
  ] satisfies EducationEntry[],
  workExperience: [
    {
      id: "ftbs-ceo",
      company: "FTBS, LLC",
      role: "CEO",
      location: "Georgia / Florida",
      period: "Aug 2022 – Present",
      highlights: [
        "Manage and maintain project budgets, technicians, and deliverables",
        "Lead multi-technician projects for partners including Tesla and Jenkins Restorations while driving goals and deadlines",
        "Deploy, maintain, and troubleshoot Cisco routers, switches, and Meraki access points nationwide",
        "Awarded QuikTrip Digital Media Upgrade contract",
        "Led graphic design projects to improve company marketing and website experience",
      ],
    },
    {
      id: "ftiss-rpm",
      company: "FTISS, LLC",
      role: "Regional Project Manager",
      location: "Georgia / Florida",
      period: "Aug 2017 – 2022",
      highlights: [
        "Managed IT and electrical projects across regional accounts",
        "Supervised field technicians and coordinated remote support sessions",
        "Configured remote connections using PuTTY, HyperTerminal, and related tools",
        "Installed, maintained, and troubleshooted Cisco equipment — routers, switches, and Meraki access points",
        "Ran cabling and installed store camera systems",
        "Hillsborough County Public Schools registered contractor",
      ],
    },
    {
      id: "ac-electrical",
      company: "A/C Electrical Service",
      role: "IT Technician · Field Supervisor · Project Manager",
      location: "National",
      period: "2016 – Present",
      highlights: [
        "Electrical and IT field supervision for national service accounts",
        "Authorized to purchase tools and equipment for project delivery",
        "Training new technicians on installation and service standards",
        "Running cables, installing store cameras, and wiring music systems",
      ],
    },
    {
      id: "tradesman-intl",
      company: "Tradesman International",
      role: "Construction · Electrical",
      location: "Fort Lauderdale, FL",
      period: "2016",
      highlights: [
        "Running conduit and making up circuits",
        "Termination of electrical circuits",
        "Installation of fixtures, switches, and receptacles",
      ],
    },
  ] satisfies WorkExperience[],
  referencesNote: "Professional references furnished upon request.",
  /** Registrations and prequalifications from verified resume history */
  registrations: [
    "Hillsborough County Public Schools registered contractor (FTISS tenure)",
  ] as const,
} as const;

/** Compact career highlights for BGW and procurement pages */
export const leadershipCareerHighlights = [
  "CEO, FTBS — multi-technician programs for Tesla, Jenkins Restorations, and QuikTrip nationwide",
  "Regional Project Manager — IT and electrical projects across Georgia and Florida (2017–2022)",
  "Field supervisor and project manager — national electrical and IT accounts since 2016",
  "Hands-on construction — electrical conduit, circuits, fixtures, and termination",
] as const;

export const presidentLetter = {
  salutation: "To Whom It May Concern,",
  paragraphs: [
    "My name is Paul Gibbs, and I am the President of BGW Construction Company. I am writing to formally express my interest and commitment to returning home in order to contribute to the continued infrastructure development and growth of our country.",
    "Over the years, I have gained valuable experience in the construction industry through leadership, project management, and hands-on involvement in building and development projects. Through BGW Construction Company, my goal is to bring that experience, professionalism, and dedication back home to help support the nation's progress through quality infrastructure and community development.",
    "I strongly believe that infrastructure is one of the foundations of economic growth and national improvement. Roads, housing, commercial developments, and public works projects all play a major role in strengthening communities and creating opportunities for future generations. It would be an honor for me and my company to contribute to these efforts.",
    "BGW Construction Company is prepared to work collaboratively with local leaders, organizations, contractors, and government agencies to support projects that improve living conditions, create jobs, and help modernize the country's infrastructure.",
    "Returning home is not only a professional goal for me, but also a personal mission to give back and be part of building a stronger future for our people.",
  ],
  closing:
    "Thank you for your time and consideration. I look forward to the opportunity to discuss how BGW Construction Company can contribute to the nation's development and infrastructure goals.",
  signature: {
    name: paulGibbs.name,
    title: paulGibbs.title,
    organization: paulGibbs.organization,
  },
} as const;

/** Short excerpt for home page and banners */
export const presidentMissionExcerpt =
  "Returning home is not only a professional goal for me, but also a personal mission to give back and be part of building a stronger future for our people.";

export const leadership = paulGibbs;
