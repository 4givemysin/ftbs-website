type EmailEnv = {
  resendApiKey: string;
  resendFromEmail: string;
  contactNotificationEmail: string;
};

function readRequiredEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

/** Returns email env vars or throws if any required value is missing. */
export function getEmailEnv(): EmailEnv {
  return {
    resendApiKey: readRequiredEnv("RESEND_API_KEY"),
    resendFromEmail: readRequiredEnv("RESEND_FROM_EMAIL"),
    contactNotificationEmail: readRequiredEnv("CONTACT_NOTIFICATION_EMAIL"),
  };
}

/** Safe check for configuration without throwing (used for health/debug). */
export function isEmailConfigured(): boolean {
  return Boolean(
    process.env.RESEND_API_KEY?.trim() &&
      process.env.RESEND_FROM_EMAIL?.trim() &&
      process.env.CONTACT_NOTIFICATION_EMAIL?.trim(),
  );
}
