export type CertificationStatus = "active" | "pending" | "sample";

export type Certification = {
  id: string;
  name: string;
  issuer: string;
  description: string;
  status: CertificationStatus;
  /** Sample content flag — verify and replace with real credentials */
  isSample: true;
  renewalNote?: string;
};

export const certifications: Certification[] = [
  {
    id: "sample-georgia-contractor",
    name: "Georgia Contractor Registration (Sample)",
    issuer: "State of Georgia",
    description:
      "Sample placeholder for state-level contractor registration. Replace with verified license number and expiration when available.",
    status: "sample",
    isSample: true,
    renewalNote: "Pending verification — update quarterly",
  },
  {
    id: "sample-osha-safety",
    name: "OSHA Safety Compliance Program (Sample)",
    issuer: "Internal Program",
    description:
      "Sample placeholder representing documented safety training and jobsite compliance protocols aligned with OSHA standards.",
    status: "sample",
    isSample: true,
  },
  {
    id: "sample-insurance-general",
    name: "General Liability Insurance (Sample)",
    issuer: "Insurance Carrier TBD",
    description:
      "Sample placeholder for general liability coverage documentation. Certificate of insurance available upon request for qualified partners.",
    status: "sample",
    isSample: true,
  },
  {
    id: "sample-insurance-workers",
    name: "Workers Compensation Coverage (Sample)",
    issuer: "Insurance Carrier TBD",
    description:
      "Sample placeholder for workers compensation coverage. Replace with carrier details when policy is finalized for publication.",
    status: "sample",
    isSample: true,
  },
  {
    id: "sample-sam-registration",
    name: "SAM.gov Registration (Pending)",
    issuer: "System for Award Management",
    description:
      "Placeholder for federal SAM registration status. Full vendor profile and NAICS detail planned for Phase 6 government contracting pages.",
    status: "pending",
    isSample: true,
    renewalNote: "Phase 6 — Government Contracting readiness",
  },
  {
    id: "sample-minority-business",
    name: "Small Business Certification (Sample)",
    issuer: "Certifying Agency TBD",
    description:
      "Sample placeholder for applicable small business or diversity certifications. Add only when officially verified and approved for public display.",
    status: "sample",
    isSample: true,
  },
];

export const certificationDisclaimers = [
  "All certifications listed as “Sample” are placeholders for layout and content structure only.",
  "FTBS will publish verifiable licenses, registrations, and insurance details only after official confirmation.",
  "SAM.gov, NAICS codes, and full vendor documentation will expand in Phase 6.",
] as const;
