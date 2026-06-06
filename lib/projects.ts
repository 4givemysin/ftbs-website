export type PortfolioTrack = "construction" | "technology" | "business-consulting";

export type ClientType = "government" | "developer" | "institution" | "private";

export type PortfolioProject = {
  id: string;
  title: string;
  summary: string;
  track: PortfolioTrack;
  featured: boolean;
  clientType: ClientType;
  location: string;
  year: string;
  services: string[];
  impact: string;
  results: string[];
  /** Sample content flag — replace with approved project data */
  isSample: true;
};

export const portfolioTracks: { id: PortfolioTrack; label: string }[] = [
  { id: "construction", label: "Construction Projects" },
  { id: "technology", label: "Technology Projects" },
  { id: "business-consulting", label: "Business Consulting Projects" },
];

export const portfolioProjects: PortfolioProject[] = [
  {
    id: "featured-corridor",
    title: "Regional Transportation Corridor Program",
    summary:
      "Sample featured project: phased roadway rehabilitation and safety upgrades for a public agency partner.",
    track: "construction",
    featured: true,
    clientType: "government",
    location: "Southeastern United States",
    year: "2024",
    services: ["Infrastructure Development", "Construction Project Management"],
    impact:
      "Sample impact: improved corridor safety features and structured reporting for agency oversight.",
    results: [
      "Three delivery phases completed on sample schedule",
      "Weekly stakeholder reporting maintained throughout",
      "Documented compliance checkpoints for public review",
    ],
    isSample: true,
  },
  {
    id: "featured-capital-program",
    title: "Multi-Site Capital Improvement Oversight",
    summary:
      "Sample featured project: owner-side program management with executive reporting across multiple facilities.",
    track: "business-consulting",
    featured: true,
    clientType: "institution",
    location: "Multi-site",
    year: "2023",
    services: ["Construction Project Management", "Technology & Business Consulting"],
    impact:
      "Sample impact: consolidated visibility for leadership and faster decision-making across vendors.",
    results: [
      "Standardized reporting across six sample sites",
      "Monthly executive summaries delivered on schedule",
      "Risk log maintained with zero critical open items at closeout",
    ],
    isSample: true,
  },
  {
    id: "tech-operations-assessment",
    title: "Construction Operations Systems Assessment",
    summary:
      "Sample technology project: evaluation of field reporting, document control, and project visibility platforms.",
    track: "technology",
    featured: false,
    clientType: "private",
    location: "Remote / On-site",
    year: "2024",
    services: ["Technology & Business Consulting", "Digital Project Systems"],
    impact:
      "Sample impact: practical roadmap for systems adoption aligned with active job sites.",
    results: [
      "14 workflows mapped across operations",
      "Five platform options evaluated",
      "Three-phase implementation plan delivered",
    ],
    isSample: true,
  },
  {
    id: "tech-dashboard-rollout",
    title: "Executive Project Visibility Dashboard",
    summary:
      "Sample technology project: dashboard design for schedule, budget, and milestone tracking.",
    track: "technology",
    featured: false,
    clientType: "developer",
    location: "Georgia",
    year: "2023",
    services: ["Digital Project Systems", "Technology & Business Consulting"],
    impact:
      "Sample impact: leadership gained a single view of program health without disrupting field teams.",
    results: [
      "KPI definitions agreed with executive sponsors",
      "Pilot dashboard deployed for sample program",
      "Adoption checklist created for field rollout",
    ],
    isSample: true,
  },
  {
    id: "consulting-vendor-selection",
    title: "Vendor Selection & Contract Readiness Review",
    summary:
      "Sample consulting engagement: structured evaluation of subcontractors and procurement documentation.",
    track: "business-consulting",
    featured: false,
    clientType: "government",
    location: "Georgia",
    year: "2024",
    services: ["Technology & Business Consulting", "Construction Project Management"],
    impact:
      "Sample impact: clearer vendor accountability and procurement-ready documentation packages.",
    results: [
      "Evaluation matrix applied to eight sample vendors",
      "Procurement checklist aligned to agency standards",
      "Recommendation summary delivered for leadership review",
    ],
    isSample: true,
  },
  {
    id: "consulting-program-governance",
    title: "Program Governance Framework Design",
    summary:
      "Sample consulting project: governance model for a multi-year infrastructure capital program.",
    track: "business-consulting",
    featured: false,
    clientType: "institution",
    location: "Georgia",
    year: "2023",
    services: ["Technology & Business Consulting"],
    impact:
      "Sample impact: defined roles, escalation paths, and reporting cadence for complex programs.",
    results: [
      "Governance charter drafted for sample program",
      "RACI matrix completed for key workstreams",
      "Quarterly review cycle established",
    ],
    isSample: true,
  },
  {
    id: "construction-facility-renovation",
    title: "Institutional Facility Renovation",
    summary:
      "Sample construction project: occupied-facility upgrades with phased access and compliance oversight.",
    track: "construction",
    featured: false,
    clientType: "institution",
    location: "Georgia",
    year: "2023",
    services: ["Commercial Construction", "Construction Project Management"],
    impact:
      "Sample impact: core facility upgrades completed within planned operational windows.",
    results: [
      "45,000 SF sample scope managed in zones",
      "Zero recordable safety incidents in sample reporting",
      "Institutional compliance documentation maintained",
    ],
    isSample: true,
  },
  {
    id: "construction-housing-development",
    title: "Community Housing Development Support",
    summary:
      "Sample construction project: schedule and budget oversight for a residential development program.",
    track: "construction",
    featured: false,
    clientType: "developer",
    location: "Georgia",
    year: "2024",
    services: ["Infrastructure Development", "Construction Project Management"],
    impact:
      "Sample impact: improved milestone tracking across civil, vertical, and utility workstreams.",
    results: [
      "48 sample units tracked through defined milestones",
      "Budget variance held under 2% in sample reporting",
      "Lender draw schedule alignment maintained",
    ],
    isSample: true,
  },
];

export function getFeaturedProjects(): PortfolioProject[] {
  return portfolioProjects.filter((project) => project.featured);
}

export function getProjectsByTrack(track: PortfolioTrack): PortfolioProject[] {
  return portfolioProjects.filter((project) => project.track === track);
}

export function getTrackLabel(track: PortfolioTrack): string {
  return portfolioTracks.find((item) => item.id === track)?.label ?? track;
}

export function getClientTypeLabel(clientType: ClientType): string {
  const labels: Record<ClientType, string> = {
    government: "Government",
    developer: "Developer",
    institution: "Institution",
    private: "Private Sector",
  };
  return labels[clientType];
}

/** Aggregate impact metrics for portfolio results section */
export const portfolioImpactSummary = [
  {
    label: "Sample programs supported",
    value: "8+",
  },
  {
    label: "Client types served",
    value: "4",
  },
  {
    label: "Service tracks",
    value: "3",
  },
  {
    label: "Reporting standard",
    value: "Executive-ready",
  },
] as const;
