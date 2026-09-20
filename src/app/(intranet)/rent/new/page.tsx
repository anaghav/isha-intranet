import type { Metadata } from "next";
import Link from "next/link";
import { createRental } from "@/app/actions/rentals";
import { PhotoUpload } from "@/components/photo-upload";
import { RENTAL_TYPES } from "@/lib/rentals";

export const metadata: Metadata = {
  title: "Post property",
};

export default function NewRentalPage() {
  return (
    <section className="mx-auto w-full max-w-2xl">
      <p className="text-xs font-medium tracking-[0.22em] text-accent uppercase">
        Housing
      </p>
      <h1 className="mt-3 font-serif text-4xl leading-tight text-ink md:text-5xl">
        Post a property
      </h1>
      <p className="mt-4 text-lg leading-8 text-muted">
        Share the home, facilities, and your phone. People will call you.
      </p>

      <form action={createRental} className="mt-10 space-y-5">
        <Field label="Title" name="title" required />
        <label className="block text-sm text-muted">
          Type
          <select
            name="type"
            required
            className="mt-1 block h-12 w-full rounded-full border border-line bg-cream-soft px-4 text-[15px] text-ink outline-none focus:border-sidebar"
          >
            {RENTAL_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm text-muted">
          Address
          <textarea
            name="address"
            required
            rows={2}
            className="mt-1 block w-full rounded-sm border border-line bg-cream-soft px-4 py-3 text-[15px] text-ink outline-none focus:border-sidebar"
          />
        </label>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            label="Distance from IYC (km)"
            name="distanceKm"
            type="number"
            required
            step="0.1"
          />
          <Field label="Rent per month (INR)" name="rentInr" type="number" required />
        </div>
        <label className="block text-sm text-muted">
          Description and facilities
          <textarea
            name="description"
            required
            rows={6}
            placeholder="Water, power backup, furnished, parking, who can stay…"
            className="mt-1 block w-full rounded-sm border border-line bg-cream-soft px-4 py-3 text-[15px] text-ink outline-none focus:border-sidebar"
          />
        </label>
        <PhotoUpload />
        <Field label="Your name" name="ownerName" required />
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Email" name="ownerEmail" type="email" required />
          <Field label="Phone" name="ownerPhone" required />
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          <button
            type="submit"
            className="inline-flex h-12 items-center justify-center rounded-full bg-cta px-6 text-[15px] font-medium text-white"
          >
            Publish property
          </button>
          <Link
            href="/rent"
            className="inline-flex h-12 items-center justify-center px-4 text-[15px] text-muted"
          >
            Cancel
          </Link>
        </div>
      </form>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  step,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  step?: string;
}) {
  return (
    <label className="block text-sm text-muted">
      {label}
      <input
        name={name}
        type={type}
        required={required}
        min={type === "number" ? 0 : undefined}
        step={step}
        className="mt-1 block h-12 w-full rounded-full border border-line bg-cream-soft px-4 text-[15px] text-ink outline-none focus:border-sidebar"
      />
    </label>
  );
}
