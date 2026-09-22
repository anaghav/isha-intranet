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
    <Link href={`/rent/${id}`} className="flex h-full flex-col bg-cream-soft">
      <div className="relative aspect-[4/3] overflow-hidden bg-cream">
        {photos[0] ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={photos[0]} alt="" className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center px-2 text-center text-xs text-muted">
            No photo
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs tracking-[0.16em] text-muted uppercase">{type}</p>
        <h2 className="mt-2 font-serif text-2xl leading-snug text-ink">{title}</h2>
        <p className="mt-3 text-[15px] text-ink">{formatRent(rentInr)}</p>
        <p className="mt-1 line-clamp-2 text-sm text-muted">{address}</p>
        <p className="mt-auto pt-3 text-xs text-muted">
          {formatDistance(distanceKm)} · {formatPostedDate(createdAt)}
        </p>
      </div>
    </Link>
  );
}
