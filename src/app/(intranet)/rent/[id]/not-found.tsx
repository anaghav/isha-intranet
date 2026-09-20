import Link from "next/link";

export default function RentalNotFound() {
  return (
    <section className="mx-auto max-w-xl">
      <h1 className="font-serif text-4xl text-ink">Property not found</h1>
      <p className="mt-4 text-lg text-muted">This listing may have been removed.</p>
      <Link href="/rent" className="mt-6 inline-block text-accent">
        Back to Rent near Isha
      </Link>
    </section>
  );
}
