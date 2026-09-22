import Link from "next/link";
import { formatPostedDate } from "@/lib/listings";
import { formatCareRange } from "@/lib/yantra-care";

type YantraCareCardProps = {
  id: string;
  title: string;
  location: string;
  fromDate: Date;
  toDate: Date;
  createdAt: Date;
};

export function YantraCareCard({
  id,
  title,
  location,
  fromDate,
  toDate,
  createdAt,
}: YantraCareCardProps) {
  return (
    <Link
      href={`/yantra-care/${id}`}
      className="flex h-full flex-col bg-cream-soft p-5"
    >
      <p className="text-xs tracking-[0.16em] text-muted uppercase">
        {location}
      </p>
      <h2 className="mt-2 font-serif text-2xl leading-snug text-ink">{title}</h2>
      <p className="mt-3 text-[15px] text-ink">
        {formatCareRange(fromDate, toDate)}
      </p>
      <p className="mt-auto pt-3 text-xs text-muted">
        Posted {formatPostedDate(createdAt)}
      </p>
    </Link>
  );
}
