import type { InquiryType, ProjectFocus } from "@/lib/inquiry-types";

export type ContactSubmission = {
  fullName: string;
  organization: string;
  email: string;
  phone: string;
  inquiryType: InquiryType;
  projectFocus: ProjectFocus[];
  message: string;
  submittedAt: Date;
};
