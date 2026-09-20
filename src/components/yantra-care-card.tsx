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
      className="block border-b border-line py-5 first:pt-0 last:border-b-0"
    >
      <p className="text-xs tracking-[0.16em] text-muted uppercase">
        {location}
      </p>
      <h2 className="mt-1 font-serif text-2xl leading-snug text-ink">{title}</h2>
      <p className="mt-2 text-[15px] text-ink">{formatCareRange(fromDate, toDate)}</p>
      <p className="mt-1 text-xs text-muted">Posted {formatPostedDate(createdAt)}</p>
    </Link>
  );
}