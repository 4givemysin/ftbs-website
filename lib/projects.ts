export type ProjectCategory =
  | "infrastructure"
  | "commercial"
  | "residential"
  | "project-management"
  | "technology";

export type ClientType = "government" | "developer" | "institution" | "private";

export type ProjectCaseStudy = {
  slug: string;
  title: string;
  summary: string;
  category: ProjectCategory;
  clientType: ClientType;
  location: string;
  year: string;
  services: string[];
  /** Sample content flag — replace with approved project data */
  isSample: true;
  challenge: string;
  approach: string;
  outcome: string;
  timeline: string;
  metrics: { label: string; value: string }[];
};

export const projectCategories: {
  id: ProjectCategory;
  label: string;
}[] = [
  { id: "infrastructure", label: "Infrastructure" },
  { id: "commercial", label: "Commercial" },
  { id: "residential", label: "Residential" },
  { id: "project-management", label: "Project Management" },
  { id: "technology", label: "Technology" },
];

export const projects: ProjectCaseStudy[] = [
  {
    slug: "regional-transportation-corridor",
    title: "Regional Transportation Corridor Improvements",
    summary:
      "Sample case study: multi-phase roadway rehabilitation and safety upgrades supporting regional connectivity and public access.",
    category: "infrastructure",
    clientType: "government",
    location: "Southeastern United States",
    year: "2024",
    services: ["Infrastructure Development", "Construction Project Management"],
    isSample: true,
    challenge:
      "A municipal partner needed to modernize aging corridor infrastructure while maintaining traffic flow and meeting federal reporting requirements.",
    approach:
      "FTBS established phased construction sequencing, stakeholder communication protocols, and milestone-based reporting aligned with agency standards.",
    outcome:
      "The sample project demonstrates on-schedule phase delivery, improved safety features, and documentation suitable for public-sector audit review.",
    timeline: "14 months (sample)",
    metrics: [
      { label: "Project value (sample)", value: "$4.2M" },
      { label: "Phases delivered", value: "3" },
      { label: "Reporting cadence", value: "Weekly" },
    ],
  },
  {
    slug: "institutional-facility-renovation",
    title: "Institutional Facility Renovation Program",
    summary:
      "Sample case study: facility upgrades for an institutional client requiring minimal operational disruption and strict compliance oversight.",
    category: "commercial",
    clientType: "institution",
    location: "Georgia",
    year: "2023",
    services: ["Commercial Construction", "Construction Project Management"],
    isSample: true,
    challenge:
      "Renovation work had to proceed in occupied facilities with limited downtime windows and coordinated subcontractor access.",
    approach:
      "FTBS implemented zone-based scheduling, quality checkpoints, and a single point of accountability for owner communications.",
    outcome:
      "Sample outcomes include completed core upgrades within the planned window and documented compliance with institutional safety requirements.",
    timeline: "9 months (sample)",
    metrics: [
      { label: "Square footage (sample)", value: "45,000 SF" },
      { label: "Change orders managed", value: "12" },
      { label: "Safety incidents", value: "0" },
    ],
  },
  {
    slug: "community-housing-development",
    title: "Community Housing Development Support",
    summary:
      "Sample case study: project management support for a residential development focused on durable housing and community access.",
    category: "residential",
    clientType: "developer",
    location: "Georgia",
    year: "2024",
    services: ["Infrastructure Development", "Construction Project Management"],
    isSample: true,
    challenge:
      "A development partner required disciplined schedule control across civil, vertical construction, and utility coordination workstreams.",
    approach:
      "FTBS aligned milestone planning with lender draw schedules and established clear reporting for investor and community stakeholders.",
    outcome:
      "This sample profile illustrates structured delivery tracking, budget visibility, and readiness for long-term community occupancy.",
    timeline: "18 months (sample)",
    metrics: [
      { label: "Units (sample)", value: "48" },
      { label: "Milestones tracked", value: "24" },
      { label: "Budget variance (sample)", value: "< 2%" },
    ],
  },
  {
    slug: "capital-program-oversight",
    title: "Capital Program Oversight & Reporting",
    summary:
      "Sample case study: owner-side project management for a multi-site capital improvement program with executive reporting needs.",
    category: "project-management",
    clientType: "government",
    location: "Multi-site",
    year: "2023",
    services: ["Construction Project Management", "Technology & Business Consulting"],
    isSample: true,
    challenge:
      "Program leadership needed consolidated visibility across vendors, schedules, and budget performance for board-level reporting.",
    approach:
      "FTBS deployed standardized reporting templates, risk logs, and executive dashboards with defined escalation paths.",
    outcome:
      "Sample results show improved decision speed, consistent reporting formats, and clearer accountability across work packages.",
    timeline: "12 months (sample)",
    metrics: [
      { label: "Sites overseen (sample)", value: "6" },
      { label: "Executive reports", value: "Monthly" },
      { label: "Open risks at closeout", value: "0 critical" },
    ],
  },
  {
    slug: "construction-operations-systems",
    title: "Construction Operations Systems Assessment",
    summary:
      "Sample case study: technology consulting engagement to evaluate field reporting, document control, and project visibility tools.",
    category: "technology",
    clientType: "private",
    location: "Remote / On-site",
    year: "2024",
    services: ["Technology & Business Consulting", "Digital Project Systems"],
    isSample: true,
    challenge:
      "A growing construction organization needed clearer systems for field updates, RFIs, and executive visibility without disrupting active jobs.",
    approach:
      "FTBS mapped current workflows, evaluated platform options, and defined a phased implementation roadmap with training requirements.",
    outcome:
      "Sample deliverables include a systems recommendation summary, implementation phases, and KPIs for adoption measurement.",
    timeline: "10 weeks (sample)",
    metrics: [
      { label: "Workflows mapped", value: "14" },
      { label: "Platform options evaluated", value: "5" },
      { label: "Implementation phases", value: "3" },
    ],
  },
];

export function getProjectBySlug(slug: string): ProjectCaseStudy | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getProjectsByCategory(
  category: ProjectCategory | "all",
): ProjectCaseStudy[] {
  if (category === "all") return projects;
  return projects.filter((project) => project.category === category);
}

export function getCategoryLabel(category: ProjectCategory): string {
  return projectCategories.find((item) => item.id === category)?.label ?? category;
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
