export type Service = {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  capabilities: string[];
  audience: string;
  division?: "bgw" | "ftbs";
  category: "construction" | "technology";
};

export const services: Service[] = [
  {
    id: "project-management",
    title: "Construction Project Management",
    shortDescription:
      "End-to-end oversight that keeps complex builds on schedule, on budget, and aligned with stakeholder requirements.",
    description:
      "FTBS provides disciplined construction project management for public and private sector clients. We coordinate schedules, budgets, subcontractors, and quality control so projects move forward with clarity and accountability.",
    capabilities: [
      "Schedule and milestone planning",
      "Budget tracking and cost control",
      "Subcontractor coordination",
      "Quality assurance and reporting",
      "Stakeholder communication",
    ],
    audience: "Government agencies, developers, and institutional project owners",
    category: "construction",
  },
  {
    id: "infrastructure",
    title: "Infrastructure Development",
    shortDescription:
      "Roads, housing, buildings, and essential infrastructure that strengthen communities for the long term.",
    description:
      "Through our BGW Construction Company division, FTBS supports infrastructure projects that reinforce roads, buildings, housing, and other essential systems. We partner on work that creates lasting value for communities and national development.",
    capabilities: [
      "Road and transportation infrastructure",
      "Housing and residential development",
      "Public buildings and facilities",
      "Essential utility and civil works",
      "Community-focused project delivery",
    ],
    audience: "Government entities, developers, and infrastructure partners",
    division: "bgw",
    category: "construction",
  },
  {
    id: "commercial-construction",
    title: "Commercial Construction",
    shortDescription:
      "Reliable delivery of commercial buildings and facilities built to specification and regulatory standards.",
    description:
      "FTBS manages commercial construction projects with a focus on safety, compliance, and workmanship. From planning through closeout, we help clients deliver facilities that meet operational and regulatory requirements.",
    capabilities: [
      "Commercial building construction",
      "Facility upgrades and renovations",
      "Code and safety compliance",
      "Site coordination and logistics",
      "Turnover and documentation",
    ],
    audience: "Commercial developers, institutions, and property owners",
    category: "construction",
  },
  {
    id: "technology-consulting",
    title: "Technology & Business Consulting",
    shortDescription:
      "Operational and strategic guidance that helps construction organizations run smarter and scale with confidence.",
    description:
      "FTBS applies business leadership and technology expertise to help construction and infrastructure organizations improve operations, streamline workflows, and make better project decisions.",
    capabilities: [
      "Operational strategy and leadership",
      "Process improvement",
      "Vendor and systems evaluation",
      "Business continuity planning",
      "Executive advisory support",
    ],
    audience: "Construction firms, developers, and growing organizations",
    category: "technology",
  },
  {
    id: "digital-project-systems",
    title: "Digital Project Systems",
    shortDescription:
      "Modern tools and data practices that bring transparency and efficiency to project delivery.",
    description:
      "FTBS helps clients adopt digital project systems for reporting, document control, and field-to-office communication. We bridge construction expertise with practical technology implementation.",
    capabilities: [
      "Project reporting dashboards",
      "Document control workflows",
      "Field data collection",
      "System integration guidance",
      "Training and adoption support",
    ],
    audience: "Project owners and contractors seeking operational modernization",
    category: "technology",
  },
];

export const serviceCategories = [
  { id: "construction", label: "Construction Services" },
  { id: "technology", label: "Technology Services" },
] as const;
