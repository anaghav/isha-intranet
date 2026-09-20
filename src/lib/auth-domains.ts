export const ALLOWED_EMAIL_DOMAINS = ["sadhguru.org", "sadhguru-ext.org"] as const;

export function isAllowedEmail(email?: string | null) {
  if (!email) return false;
  const domain = email.split("@")[1]?.toLowerCase();
  return ALLOWED_EMAIL_DOMAINS.some((allowed) => domain === allowed);
}
