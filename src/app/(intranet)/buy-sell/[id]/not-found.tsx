import Link from "next/link";

export default function ListingNotFound() {
  return (
    <section className="mx-auto max-w-xl">
      <h1 className="font-serif text-4xl text-ink">Listing not found</h1>
      <p className="mt-4 text-lg text-muted">
        This item may have been removed.
      </p>
      <Link href="/buy-sell" className="mt-6 inline-block text-accent">
        Back to Buy / Sell
      </Link>
    </section>
  );
}
