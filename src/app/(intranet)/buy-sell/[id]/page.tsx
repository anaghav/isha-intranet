import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatPostedDate, formatPrice, listingPhotoPaths } from "@/lib/listings";
import { ListingGallery } from "@/components/listing-gallery";

type ListingPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: ListingPageProps): Promise<Metadata> {
  const { id } = await params;
  const listing = await prisma.listing.findUnique({ where: { id } });
  return { title: listing?.title ?? "Listing" };
}

export default async function ListingPage({ params }: ListingPageProps) {
  const { id } = await params;
  const listing = await prisma.listing.findUnique({
    where: { id },
    include: { images: { orderBy: { sortOrder: "asc" } } },
  });

  if (!listing) {
    notFound();
  }

  const photos = listingPhotoPaths(listing);

  return (
    <article className="mx-auto w-full max-w-4xl">
      <Link href="/buy-sell" className="text-sm text-muted hover:text-ink">
        Back to Buy / Sell
      </Link>

      <div className="mt-6">
        <ListingGallery photos={photos} sold={listing.status === "sold"} />
      </div>

      <p className="mt-8 text-xs font-medium tracking-[0.22em] text-accent uppercase">
        {listing.category}
      </p>
      <h1 className="mt-3 font-serif text-4xl leading-tight text-ink md:text-5xl">
        {listing.title}
      </h1>
      <p className="mt-4 text-2xl text-ink">{formatPrice(listing.priceInr)}</p>
      <p className="mt-2 text-sm text-muted">
        {listing.condition} · Posted {formatPostedDate(listing.createdAt)}
      </p>
      <p className="mt-8 max-w-2xl text-lg leading-8 text-muted whitespace-pre-wrap">
        {listing.description}
      </p>

      <section className="mt-10 max-w-lg rounded-sm bg-cream-soft px-6 py-6">
        <h2 className="font-serif text-2xl text-ink">Contact seller</h2>
        <p className="mt-3 text-ink">{listing.sellerName}</p>
        <p className="mt-1">
          <a href={`mailto:${listing.sellerEmail}`} className="text-accent">
            {listing.sellerEmail}
          </a>
        </p>
        {listing.sellerPhone ? (
          <p className="mt-1">
            <a href={`tel:${listing.sellerPhone}`} className="text-accent">
              {listing.sellerPhone}
            </a>
          </p>
        ) : null}
      </section>

    </article>
  );
}
