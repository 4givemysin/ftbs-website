import type { InquiryType, ProjectFocus, BgwProjectFocus } from "@/lib/inquiry-types";

export type ContactSubmission = {
  fullName: string;
  organization: string;
  email: string;
  phone: string;
  inquiryType: InquiryType;
  projectFocus: (ProjectFocus | BgwProjectFocus)[];
  message: string;
  submittedAt: Date;
};
