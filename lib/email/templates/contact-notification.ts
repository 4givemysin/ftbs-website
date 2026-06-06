import { company } from "@/lib/company";
import type { ContactSubmission } from "@/lib/email/types";

function formatList(items: string[]): string {
  return items.length > 0 ? items.join(", ") : "None selected";
}

export function contactNotificationSubject(submission: ContactSubmission): string {
  return `[FTBS Inquiry] ${submission.inquiryType} — ${submission.organization}`;
}

export function contactNotificationHtml(submission: ContactSubmission): string {
  const submittedAt = submission.submittedAt.toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "America/New_York",
  });

  return `<!DOCTYPE html>
<html lang="en">
  <body style="font-family: Arial, sans-serif; color: #1a2332; line-height: 1.6;">
    <h2 style="color: #1b2a4a; margin-bottom: 8px;">New website inquiry</h2>
    <p style="margin-top: 0;">A new contact form submission was received on ${company.url}.</p>
    <table style="border-collapse: collapse; width: 100%; max-width: 640px;">
      <tbody>
        ${row("Submitted", submittedAt)}
        ${row("Inquiry type", submission.inquiryType)}
        ${row("Name", submission.fullName)}
        ${row("Organization", submission.organization)}
        ${row("Email", submission.email)}
        ${row("Phone", submission.phone || "Not provided")}
        ${row("Project focus", formatList(submission.projectFocus))}
      </tbody>
    </table>
    <h3 style="color: #1b2a4a; margin-top: 24px;">Message</h3>
    <p style="white-space: pre-wrap; background: #f4f6f8; padding: 16px; border-radius: 8px;">${escapeHtml(submission.message)}</p>
    <p style="font-size: 12px; color: #64748b; margin-top: 24px;">
      Reply directly to this email to respond to ${escapeHtml(submission.fullName)} at ${escapeHtml(submission.email)}.
    </p>
  </body>
</html>`;
}

export function contactNotificationText(submission: ContactSubmission): string {
  return [
    "New FTBS website inquiry",
    "",
    `Submitted: ${submission.submittedAt.toISOString()}`,
    `Inquiry type: ${submission.inquiryType}`,
    `Name: ${submission.fullName}`,
    `Organization: ${submission.organization}`,
    `Email: ${submission.email}`,
    `Phone: ${submission.phone || "Not provided"}`,
    `Project focus: ${formatList(submission.projectFocus)}`,
    "",
    "Message:",
    submission.message,
  ].join("\n");
}

function row(label: string, value: string): string {
  return `<tr>
      <td style="padding: 8px 12px 8px 0; font-weight: 600; vertical-align: top; width: 140px;">${escapeHtml(label)}</td>
      <td style="padding: 8px 0; vertical-align: top;">${escapeHtml(value)}</td>
    </tr>`;
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
