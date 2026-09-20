import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatPostedDate } from "@/lib/listings";
import { formatDistance, formatRent, rentalPhotoPaths } from "@/lib/rentals";
import { ListingGallery } from "@/components/listing-gallery";

type RentalPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: RentalPageProps): Promise<Metadata> {
  const { id } = await params;
  const rental = await prisma.rental.findUnique({ where: { id } });
  return { title: rental?.title ?? "Property" };
}

export default async function RentalPage({ params }: RentalPageProps) {
  const { id } = await params;
  const rental = await prisma.rental.findUnique({
    where: { id },
    include: { images: { orderBy: { sortOrder: "asc" } } },
  });

  if (!rental) {
    notFound();
  }

  return (
    <article className="mx-auto w-full max-w-4xl">
      <Link href="/rent" className="text-sm text-muted hover:text-ink">
        Back to Rent near Isha
      </Link>

      <div className="mt-6">
        <ListingGallery photos={rentalPhotoPaths(rental)} sold={false} />
      </div>

      <p className="mt-8 text-xs font-medium tracking-[0.22em] text-accent uppercase">
        {rental.type}
      </p>
      <h1 className="mt-3 font-serif text-4xl leading-tight text-ink md:text-5xl">
        {rental.title}
      </h1>
      <p className="mt-4 text-2xl text-ink">{formatRent(rental.rentInr)}</p>
      <p className="mt-2 text-sm text-muted">{formatDistance(rental.distanceKm)}</p>
      <p className="mt-2 text-sm text-muted">{rental.address}</p>
      <p className="mt-2 text-sm text-muted">
        Posted {formatPostedDate(rental.createdAt)}
      </p>
      <p className="mt-8 max-w-2xl text-lg leading-8 text-muted whitespace-pre-wrap">
        {rental.description}
      </p>

      <section className="mt-10 max-w-lg rounded-sm bg-cream-soft px-6 py-6">
        <h2 className="font-serif text-2xl text-ink">Call the owner</h2>
        <p className="mt-3 text-ink">{rental.ownerName}</p>
        <p className="mt-1">
          <a href={`tel:${rental.ownerPhone}`} className="text-accent">
            {rental.ownerPhone}
          </a>
        </p>
        <p className="mt-1">
          <a href={`mailto:${rental.ownerEmail}`} className="text-accent">
            {rental.ownerEmail}
          </a>
        </p>
      </section>
    </article>
  );
}
