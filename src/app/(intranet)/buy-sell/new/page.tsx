import type { Metadata } from "next";
import Link from "next/link";
import { PhotoUpload } from "@/components/photo-upload";
import { NewListingForm } from "@/components/new-listing-form";
import { RememberedEmailField } from "@/components/remembered-email-field";
import { LISTING_CATEGORIES, LISTING_CONDITIONS } from "@/lib/listings";

export const metadata: Metadata = {
  title: "Post listing",
};

export default function NewListingPage() {
  return (
    <section className="mx-auto w-full max-w-2xl">
      <p className="text-xs font-medium tracking-[0.22em] text-accent uppercase">
        Marketplace
      </p>
      <h1 className="mt-3 font-serif text-4xl leading-tight text-ink md:text-5xl">
        Post a listing
      </h1>
      <p className="mt-4 text-lg leading-8 text-muted">
        No payments here — just the listing and how to reach you.
      </p>

      <NewListingForm>
        <Field label="Title" name="title" required />
        <label className="block text-sm text-muted">
          Description
          <textarea
            name="description"
            required
            rows={5}
            className="mt-1 block w-full rounded-sm border border-line bg-cream-soft px-4 py-3 text-[15px] text-ink outline-none focus:border-sidebar"
          />
        </label>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Price (INR)" name="priceInr" type="number" required />
          <Select label="Category" name="category" options={LISTING_CATEGORIES} />
          <Select label="Condition" name="condition" options={LISTING_CONDITIONS} />
        </div>
        <PhotoUpload />
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Your name" name="sellerName" required />
          <RememberedEmailField />
        </div>
        <Field label="Phone" name="sellerPhone" />

        <div className="flex flex-wrap gap-3 pt-2">
          <button
            type="submit"
            className="inline-flex h-12 items-center justify-center rounded-full bg-cta px-6 text-[15px] font-medium text-white"
          >
            Publish listing
          </button>
          <Link
            href="/buy-sell"
            className="inline-flex h-12 items-center justify-center px-4 text-[15px] text-muted"
          >
            Cancel
          </Link>
        </div>
      </NewListingForm>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block text-sm text-muted">
      {label}
      <input
        name={name}
        type={type}
        required={required}
        min={type === "number" ? 0 : undefined}
        className="mt-1 block h-12 w-full rounded-full border border-line bg-cream-soft px-4 text-[15px] text-ink outline-none focus:border-sidebar"
      />
    </label>
  );
}

function Select({
  label,
  name,
  options,
}: {
  label: string;
  name: string;
  options: readonly string[];
}) {
  return (
    <label className="block text-sm text-muted">
      {label}
      <select
        name={name}
        required
        className="mt-1 block h-12 w-full rounded-full border border-line bg-cream-soft px-4 text-[15px] text-ink outline-none focus:border-sidebar"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}
