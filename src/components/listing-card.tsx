import Link from "next/link";
import { formatPostedDate, formatPrice, listingPhotoPaths } from "@/lib/listings";

type ListingCardProps = {
  id: string;
  title: string;
  priceInr: number;
  category: string;
  imageUrl: string | null;
  images?: { path: string }[];
  status: string;
  createdAt: Date;
  flush?: boolean;
};

export function ListingCard({
  id,
  title,
  priceInr,
  category,
  imageUrl,
  images,
  status,
  createdAt,
  flush = false,
}: ListingCardProps) {
  const photos = listingPhotoPaths({ imageUrl, images });

  return (
    <Link
      href={`/buy-sell/${id}`}
      className={`flex gap-4 py-5 ${flush ? "" : "border-b border-line first:pt-0 last:border-b-0"}`}
    >
      <div className="relative h-28 w-28 shrink-0 overflow-hidden bg-cream-soft sm:h-32 sm:w-32">
        {photos[0] ? (
          // Uploaded files are local; older listings may still use a URL.
          // eslint-disable-next-line @next/next/no-img-element
          <img src={photos[0]} alt="" className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center px-2 text-center text-xs text-muted">
            No photo
          </div>
        )}
        {status === "sold" ? (
          <span className="absolute top-2 left-2 bg-sidebar px-1.5 py-0.5 text-[10px] tracking-wide text-cream-soft uppercase">
            Sold
          </span>
        ) : null}
      </div>
      <div className="min-w-0 flex-1 py-0.5">
        <p className="text-xs tracking-[0.16em] text-muted uppercase">{category}</p>
        <h2 className="mt-1 font-serif text-2xl leading-snug text-ink">{title}</h2>
        <p className="mt-2 text-[15px] text-ink">{formatPrice(priceInr)}</p>
        <p className="mt-1 text-xs text-muted">{formatPostedDate(createdAt)}</p>
      </div>
    </Link>
  );
}
