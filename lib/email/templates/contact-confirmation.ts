import { company } from "@/lib/company";
import type { ContactSubmission } from "@/lib/email/types";

export function contactConfirmationSubject(): string {
  return `We received your inquiry — ${company.shortName}`;
}

export function contactConfirmationHtml(submission: ContactSubmission): string {
  return `<!DOCTYPE html>
<html lang="en">
  <body style="font-family: Arial, sans-serif; color: #1a2332; line-height: 1.6;">
    <h2 style="color: #1b2a4a;">Thank you for contacting ${company.shortName}</h2>
    <p>Dear ${escapeHtml(submission.fullName)},</p>
    <p>
      We received your ${escapeHtml(submission.inquiryType.toLowerCase())} and our team will review it
      promptly during business hours.
    </p>
    <h3 style="color: #1b2a4a; margin-top: 24px;">Your submission summary</h3>
    <ul>
      <li><strong>Organization:</strong> ${escapeHtml(submission.organization)}</li>
      <li><strong>Inquiry type:</strong> ${escapeHtml(submission.inquiryType)}</li>
      ${
        submission.projectFocus.length
          ? `<li><strong>Project focus:</strong> ${escapeHtml(submission.projectFocus.join(", "))}</li>`
          : ""
      }
    </ul>
    <p style="white-space: pre-wrap; background: #f4f6f8; padding: 16px; border-radius: 8px;">${escapeHtml(submission.message)}</p>
    <p>
      If you need to add details, reply to this email or contact us at
      <a href="mailto:${company.email}">${company.email}</a>.
    </p>
    <p style="margin-top: 32px;">
      Sincerely,<br />
      ${company.name}
    </p>
  </body>
</html>`;
}

export function contactConfirmationText(submission: ContactSubmission): string {
  return [
    `Thank you for contacting ${company.shortName}`,
    "",
    `Dear ${submission.fullName},`,
    "",
    `We received your ${submission.inquiryType.toLowerCase()} and our team will review it promptly during business hours.`,
    "",
    "Your submission summary:",
    `- Organization: ${submission.organization}`,
    `- Inquiry type: ${submission.inquiryType}`,
    submission.projectFocus.length
      ? `- Project focus: ${submission.projectFocus.join(", ")}`
      : "",
    "",
    "Message:",
    submission.message,
    "",
    `If you need to add details, contact us at ${company.email}.`,
    "",
    "Sincerely,",
    company.name,
  ]
    .filter(Boolean)
    .join("\n");
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
