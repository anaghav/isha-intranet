export const LISTING_CATEGORIES = [
  "Bicycle",
  "Car",
  "E-bike",
  "Furniture",
  "Electronics",
  "Other",
] as const;

export const LISTING_CONDITIONS = [
  "New",
  "Like new",
  "Good",
  "Fair",
] as const;

export type ListingCategory = (typeof LISTING_CATEGORIES)[number];
export type ListingCondition = (typeof LISTING_CONDITIONS)[number];

export function listingPhotoPaths(
  listing: { imageUrl?: string | null; images?: { path: string }[] },
) {
  if (listing.images && listing.images.length > 0) {
    return listing.images.map((image) => image.path);
  }
  return listing.imageUrl ? [listing.imageUrl] : [];
}

export function formatPrice(priceInr: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(priceInr);
}

export function formatPostedDate(date: Date) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}
