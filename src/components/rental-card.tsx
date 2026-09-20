import Link from "next/link";
import { formatPostedDate } from "@/lib/listings";
import { formatDistance, formatRent, rentalPhotoPaths } from "@/lib/rentals";

type RentalCardProps = {
  id: string;
  title: string;
  type: string;
  address: string;
  distanceKm: number;
  rentInr: number;
  imageUrl: string | null;
  images?: { path: string }[];
  createdAt: Date;
};

export function RentalCard({
  id,
  title,
  type,
  address,
  distanceKm,
  rentInr,
  imageUrl,
  images,
  createdAt,
}: RentalCardProps) {
  const photos = rentalPhotoPaths({ imageUrl, images });

  return (
    <Link
      href={`/rent/${id}`}
      className="flex gap-4 border-b border-line py-5 first:pt-0 last:border-b-0"
    >
      <div className="relative h-28 w-28 shrink-0 overflow-hidden bg-cream-soft sm:h-32 sm:w-32">
        {photos[0] ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={photos[0]} alt="" className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center px-2 text-center text-xs text-muted">
            No photo
          </div>
        )}
      </div>
      <div className="min-w-0 flex-1 py-0.5">
        <p className="text-xs tracking-[0.16em] text-muted uppercase">{type}</p>
        <h2 className="mt-1 font-serif text-2xl leading-snug text-ink">{title}</h2>
        <p className="mt-2 text-[15px] text-ink">{formatRent(rentInr)}</p>
        <p className="mt-1 truncate text-sm text-muted">{address}</p>
        <p className="mt-1 text-xs text-muted">
          {formatDistance(distanceKm)} · {formatPostedDate(createdAt)}
        </p>
      </div>
    </Link>
  );
}
