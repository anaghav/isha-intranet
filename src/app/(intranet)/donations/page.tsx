import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Donations",
};

export default function DonationsPage() {
  return (
    <section className="mx-auto w-full max-w-5xl">
      <p className="text-xs font-medium tracking-[0.22em] text-accent uppercase">
        Give
      </p>
      <h1 className="mt-3 font-serif text-4xl leading-tight text-ink md:text-5xl">
        Donations
      </h1>
      <p className="mt-4 max-w-2xl text-lg leading-8 text-muted">
        Upcoming drives at the Yoga Centre. Drop-off points and timings are on
        each card.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <article className="flex h-full flex-col bg-cream-soft p-6">
          <p className="text-xs tracking-[0.16em] text-muted uppercase">
            22 September 2026
          </p>
          <h2 className="mt-3 font-serif text-2xl leading-snug text-ink">
            Donation Drive
          </h2>
          <p className="mt-3 text-[15px] leading-7 text-ink">
            Collection of unused clothes, dry rations, and school supplies for
            nearby village seva.
          </p>
          <dl className="mt-5 space-y-3 text-sm leading-6">
            <div>
              <dt className="text-xs tracking-[0.16em] text-muted uppercase">
                Time
              </dt>
              <dd className="mt-1 text-ink">9:00 am – 5:00 pm</dd>
            </div>
            <div>
              <dt className="text-xs tracking-[0.16em] text-muted uppercase">
                Drop-off
              </dt>
              <dd className="mt-1 text-ink">
                Volunteer desk, Ashram office, Isha Yoga Centre
              </dd>
            </div>
            <div>
              <dt className="text-xs tracking-[0.16em] text-muted uppercase">
                Notes
              </dt>
              <dd className="mt-1 text-ink">
                Packed, labelled bags only. Please do not leave items after 5:00
                pm — the van leaves the same evening.
              </dd>
            </div>
          </dl>
        </article>
      </div>
    </section>
  );
}
