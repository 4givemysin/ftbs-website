export type CertificationStatus = "verified" | "pending" | "placeholder";

export type Certification = {
  id: string;
  name: string;
  issuer: string;
  description: string;
  status: CertificationStatus;
  /** Only true for layout placeholders — not claimed credentials */
  isSample: true;
  renewalNote?: string;
};

export const currentCertifications: Certification[] = [
  {
    id: "placeholder-insurance-gl",
    name: "General Liability Insurance",
    issuer: "To be published upon verification",
    description:
      "Placeholder section for general liability coverage. FTBS will publish carrier and policy details only after verification. Certificates available upon request for qualified partners.",
    status: "placeholder",
    isSample: true,
  },
  {
    id: "placeholder-insurance-wc",
    name: "Workers Compensation Coverage",
    issuer: "To be published upon verification",
    description:
      "Placeholder section for workers compensation coverage. Details will be added when approved for public display.",
    status: "placeholder",
    isSample: true,
  },
];

export const futureCertificationGoals = [
  {
    title: "SAM.gov Registration",
    description:
      "Federal System for Award Management registration planned for Phase 6 government contracting readiness. Not claimed until verified and active.",
    timeline: "Phase 6",
  },
  {
    title: "Applicable Small Business Certifications",
    description:
      "FTBS will pursue relevant small business or diversity certifications only when eligible and officially verified.",
    timeline: "As eligible",
  },
  {
    title: "State Contractor License Publication",
    description:
      "Verified state contractor license numbers and expiration dates will be published when confirmed for public release.",
    timeline: "Upon verification",
  },
] as const;

export const complianceStandards = [
  {
    title: "OSHA-aligned safety practices",
    description:
      "Jobsite safety protocols aligned with OSHA standards. Formal certification listings will be published only when verified.",
  },
  {
    title: "Document control & reporting",
    description:
      "Structured reporting, change-order documentation, and audit-ready records for public and institutional partners.",
  },
  {
    title: "Procurement ethics",
    description:
      "Transparent vendor evaluation and conflict-of-interest awareness in subcontractor and partner selection.",
  },
] as const;

export const industryStandards = [
  {
    title: "Construction management best practices",
    description:
      "Schedule control, quality assurance, and stakeholder communication aligned with professional project delivery standards.",
  },
  {
    title: "Public-sector accountability",
    description:
      "Reporting formats suitable for government oversight, milestone tracking, and compliance documentation.",
  },
  {
    title: "Technology governance",
    description:
      "Practical systems evaluation and adoption planning for construction and infrastructure organizations.",
  },
] as const;

export const certificationDisclaimers = [
  "FTBS does not claim certifications, registrations, or licenses that have not been earned and verified.",
  "Sections marked as placeholder are included for layout and procurement readiness structure only.",
  "SAM.gov, NAICS detail, and full vendor profiles will expand in Phase 6.",
] as const;

/** @deprecated Use currentCertifications */
export const certifications = currentCertifications;
