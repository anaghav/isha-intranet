import Link from "next/link";

export default function YantraCareNotFound() {
  return (
    <section className="mx-auto max-w-xl">
      <h1 className="font-serif text-4xl text-ink">Request not found</h1>
      <p className="mt-4 text-lg text-muted">
        This care request may have been removed.
      </p>
      <Link href="/yantra-care" className="mt-6 inline-block text-accent">
        Back to Yantra Care
      </Link>
    </section>
  );
}
