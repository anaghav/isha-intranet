export const SELLER_EMAIL_KEY = "isha-seller-email";

export function getSellerEmail() {
  if (typeof window === "undefined") {
    return "";
  }
  return window.localStorage.getItem(SELLER_EMAIL_KEY)?.trim().toLowerCase() ?? "";
}

export function setSellerEmail(email: string) {
  if (typeof window === "undefined") {
    return;
  }
  const normalized = email.trim().toLowerCase();
  if (normalized.includes("@")) {
    window.localStorage.setItem(SELLER_EMAIL_KEY, normalized);
  }
}
