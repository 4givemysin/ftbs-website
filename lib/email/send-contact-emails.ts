import { Resend } from "resend";
import { getEmailEnv } from "@/lib/env";
import type { ContactSubmission } from "@/lib/email/types";
import {
  contactConfirmationHtml,
  contactConfirmationSubject,
  contactConfirmationText,
} from "@/lib/email/templates/contact-confirmation";
import {
  contactNotificationHtml,
  contactNotificationSubject,
  contactNotificationText,
} from "@/lib/email/templates/contact-notification";
import {
  inquiryTypes,
  projectFocusOptions,
  type InquiryType,
  type ProjectFocus,
} from "@/lib/inquiry-types";

export type SendContactEmailsResult =
  | { ok: true; confirmationSent: boolean }
  | { ok: false; reason: "config" | "send_failed" };

export async function sendContactEmails(
  submission: ContactSubmission,
): Promise<SendContactEmailsResult> {
  let env;

  try {
    env = getEmailEnv();
  } catch (error) {
    console.error("[contact-form] Email configuration error:", error);
    return { ok: false, reason: "config" };
  }

  const resend = new Resend(env.resendApiKey);

  const notification = await resend.emails.send({
    from: env.resendFromEmail,
    to: env.contactNotificationEmail,
    replyTo: submission.email,
    subject: contactNotificationSubject(submission),
    html: contactNotificationHtml(submission),
    text: contactNotificationText(submission),
  });

  if (notification.error) {
    console.error("[contact-form] Notification email failed:", notification.error);
    return { ok: false, reason: "send_failed" };
  }

  const confirmation = await resend.emails.send({
    from: env.resendFromEmail,
    to: submission.email,
    replyTo: env.contactNotificationEmail,
    subject: contactConfirmationSubject(),
    html: contactConfirmationHtml(submission),
    text: contactConfirmationText(submission),
  });

  if (confirmation.error) {
    console.error("[contact-form] Confirmation email failed:", confirmation.error);
    return { ok: true, confirmationSent: false };
  }

  return { ok: true, confirmationSent: true };
}

export function isValidInquiryType(value: string): value is InquiryType {
  return inquiryTypes.includes(value as InquiryType);
}

export function parseProjectFocus(values: FormDataEntryValue[]): ProjectFocus[] {
  return values
    .map((value) => String(value))
    .filter((value): value is ProjectFocus =>
      projectFocusOptions.includes(value as ProjectFocus),
    );
}
