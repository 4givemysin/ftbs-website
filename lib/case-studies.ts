export type CaseStudyIndustry =
  | "government"
  | "infrastructure"
  | "institutional"
  | "technology";

export type CaseStudy = {
  slug: string;
  title: string;
  summary: string;
  industry: CaseStudyIndustry;
  clientType: string;
  year: string;
  services: string[];
  challenge: string;
  solution: string;
  results: string[];
  lessonsLearned: string[];
  /** Sample content flag — replace with client-approved case studies */
  isSample: true;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "public-infrastructure-program-recovery",
    title: "Public Infrastructure Program Recovery",
    summary:
      "Sample case study: restoring schedule confidence and reporting discipline for a multi-phase public infrastructure program.",
    industry: "government",
    clientType: "Sample Municipal Agency",
    year: "2024",
    services: ["Construction Project Management", "Infrastructure Development"],
    challenge:
      "A public agency partner faced schedule drift, inconsistent subcontractor reporting, and executive stakeholders who lacked a single view of program status across three active phases.",
    solution:
      "FTBS implemented phased milestone planning, standardized weekly reporting, and a centralized risk log with defined escalation paths aligned to agency review requirements.",
    results: [
      "Sample program phases returned to an agreed reporting cadence within six weeks",
      "Executive summaries delivered on a fixed weekly schedule",
      "Documented compliance checkpoints prepared for audit review",
      "Subcontractor accountability matrix adopted across work packages",
    ],
    lessonsLearned: [
      "Early alignment on reporting formats prevents rework during agency reviews.",
      "Phased sequencing must be communicated to the public and internal teams simultaneously.",
      "A single accountable program lead accelerates decision-making.",
    ],
    isSample: true,
  },
  {
    slug: "institutional-facility-modernization",
    title: "Institutional Facility Modernization",
    summary:
      "Sample case study: delivering occupied-facility upgrades with minimal disruption and strict compliance oversight.",
    industry: "institutional",
    clientType: "Sample Institutional Client",
    year: "2023",
    services: ["Commercial Construction", "Construction Project Management"],
    challenge:
      "Renovation work needed to proceed in active facilities with limited shutdown windows, multiple subcontractors, and strict safety and compliance requirements.",
    solution:
      "FTBS deployed zone-based scheduling, daily coordination stand-ups, and quality checkpoints tied to institutional safety protocols and owner communication standards.",
    results: [
      "Core upgrade scopes completed within planned operational windows",
      "Zero recordable safety incidents in sample reporting period",
      "Change orders tracked with full documentation for leadership review",
      "Facility operations maintained throughout sample phased work",
    ],
    lessonsLearned: [
      "Occupied facilities require communication plans as rigorous as construction plans.",
      "Zone-based access reduces conflict between operations and construction teams.",
      "Quality checkpoints should be defined before subcontractor mobilization.",
    ],
    isSample: true,
  },
  {
    slug: "construction-technology-adoption",
    title: "Construction Technology Adoption Program",
    summary:
      "Sample case study: improving field-to-office visibility through a practical systems assessment and phased rollout plan.",
    industry: "technology",
    clientType: "Sample Construction Firm",
    year: "2024",
    services: ["Technology & Business Consulting", "Digital Project Systems"],
    challenge:
      "A growing construction organization relied on disconnected spreadsheets and email threads for field updates, creating delays in RFIs, schedule changes, and executive reporting.",
    solution:
      "FTBS mapped current workflows, evaluated platform options against field usability criteria, and designed a phased implementation roadmap with training and adoption KPIs.",
    results: [
      "14 workflows documented with owner and field input",
      "Five platform options scored against practical adoption criteria",
      "Three-phase rollout plan with training milestones delivered",
      "Executive KPI dashboard requirements defined for pilot deployment",
    ],
    lessonsLearned: [
      "Technology adoption succeeds when field teams help define requirements.",
      "Pilot programs should start on one active job before enterprise rollout.",
      "Adoption KPIs matter as much as software features.",
    ],
    isSample: true,
  },
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.slug === slug);
}

export function getIndustryLabel(industry: CaseStudyIndustry): string {
  const labels: Record<CaseStudyIndustry, string> = {
    government: "Government",
    infrastructure: "Infrastructure",
    institutional: "Institutional",
    technology: "Technology",
  };
  return labels[industry];
}
