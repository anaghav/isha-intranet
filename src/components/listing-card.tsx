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
  onMarkSold?: () => void;
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
  onMarkSold,
}: ListingCardProps) {
  const photos = listingPhotoPaths({ imageUrl, images });

  return (
    <article className="flex h-full flex-col bg-cream-soft">
      <Link href={`/buy-sell/${id}`} className="flex flex-1 flex-col">
        <div className="relative aspect-[4/3] overflow-hidden bg-cream">
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
            <span className="absolute top-3 left-3 bg-sidebar px-1.5 py-0.5 text-[10px] tracking-wide text-cream-soft uppercase">
              Sold
            </span>
          ) : null}
        </div>
        <div className="flex flex-1 flex-col p-5">
          <p className="text-xs tracking-[0.16em] text-muted uppercase">
            {category}
          </p>
          <h2 className="mt-2 font-serif text-2xl leading-snug text-ink">
            {title}
          </h2>
          <p className="mt-3 text-[15px] text-ink">{formatPrice(priceInr)}</p>
          <p className="mt-1 text-xs text-muted">{formatPostedDate(createdAt)}</p>
        </div>
      </Link>
      {onMarkSold ? (
        <div className="px-5 pb-5">
          <button
            type="button"
            onClick={onMarkSold}
            className="h-10 rounded-full border border-line px-4 text-sm text-ink"
          >
            Mark as sold
          </button>
        </div>
      ) : null}
    </article>
  );
}
