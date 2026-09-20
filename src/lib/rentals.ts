export const RENTAL_TYPES = [
  "1 BHK apartment",
  "2 BHK apartment",
  "3 BHK apartment",
  "Standalone house",
  "PG",
  "Others",
] as const;

export type RentalType = (typeof RENTAL_TYPES)[number];

export function rentalPhotoPaths(
  rental: { imageUrl?: string | null; images?: { path: string }[] },
) {
  if (rental.images && rental.images.length > 0) {
    return rental.images.map((image) => image.path);
  }
  return rental.imageUrl ? [rental.imageUrl] : [];
}

export function formatRent(rentInr: number) {
  return `${new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(rentInr)} / month`;
}

export function formatDistance(distanceKm: number) {
  return `${distanceKm} km from IYC`;
}
