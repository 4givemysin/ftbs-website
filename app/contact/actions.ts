"use server";

import {
  isValidInquiryType,
  parseProjectFocus,
  sendContactEmails,
} from "@/lib/email/send-contact-emails";
import type { ContactSubmission } from "@/lib/email/types";

export type ContactFormState = {
  success: boolean;
  message: string;
  errors: Record<string, string>;
};

const SUCCESS_MESSAGE =
  "Thank you for your inquiry. We sent a confirmation to your email and our team will respond as soon as possible.";

const GENERIC_ERROR_MESSAGE =
  "We could not submit your inquiry right now. Please try again shortly or email us directly at info@ftbsllc.com.";

const SPAM_MESSAGE =
  "We could not submit your inquiry. Please try again or contact us directly.";

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const honeypot = String(formData.get("companyWebsite") ?? "").trim();
  if (honeypot) {
    console.warn("[contact-form] Honeypot triggered");
    return {
      success: false,
      message: SPAM_MESSAGE,
      errors: {},
    };
  }

  const fullName = String(formData.get("fullName") ?? "").trim();
  const organization = String(formData.get("organization") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const inquiryTypeRaw = String(formData.get("inquiryType") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const projectFocus = parseProjectFocus(formData.getAll("projectFocus"));

  const errors: Record<string, string> = {};

  if (!fullName) errors.fullName = "Full name is required.";
  if (!organization) errors.organization = "Organization is required.";
  if (!email) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Enter a valid email address.";
  }
  if (!inquiryTypeRaw) {
    errors.inquiryType = "Select an inquiry type.";
  } else if (!isValidInquiryType(inquiryTypeRaw)) {
    errors.inquiryType = "Select a valid inquiry type.";
  }
  if (!message) errors.message = "Message is required.";
  if (message.length > 5000) {
    errors.message = "Message must be 5,000 characters or fewer.";
  }

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      message: "Please correct the highlighted fields and try again.",
      errors,
    };
  }

  const submission: ContactSubmission = {
    fullName,
    organization,
    email,
    phone,
    inquiryType: inquiryTypeRaw as ContactSubmission["inquiryType"],
    projectFocus,
    message,
    submittedAt: new Date(),
  };

  const result = await sendContactEmails(submission);

  if (!result.ok) {
    return {
      success: false,
      message: GENERIC_ERROR_MESSAGE,
      errors: {},
    };
  }

  return {
    success: true,
    message: result.confirmationSent
      ? SUCCESS_MESSAGE
      : "Thank you for your inquiry. Our team received your message and will respond as soon as possible.",
    errors: {},
  };
}
