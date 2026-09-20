import type { Metadata } from "next";
import Link from "next/link";
import { createYantraCare } from "@/app/actions/yantra-care";

export const metadata: Metadata = {
  title: "Ask for care",
};

export default function NewYantraCarePage() {
  return (
    <section className="mx-auto w-full max-w-2xl">
      <p className="text-xs font-medium tracking-[0.22em] text-accent uppercase">
        Seva
      </p>
      <h1 className="mt-3 font-serif text-4xl leading-tight text-ink md:text-5xl">
        Ask for yantra care
      </h1>
      <p className="mt-4 text-lg leading-8 text-muted">
        Share which yantra it is, where it is, and the dates you will be away.
        People will call you.
      </p>

      <form action={createYantraCare} className="mt-10 space-y-5">
        <Field
          label="Which yantra"
          name="title"
          required
          placeholder="Linga Bhairavi Yantra"
        />
        <label className="block text-sm text-muted">
          Description
          <textarea
            name="description"
            required
            rows={5}
            placeholder="Any notes for the person offering care…"
            className="mt-1 block w-full rounded-sm border border-line bg-cream-soft px-4 py-3 text-[15px] text-ink outline-none focus:border-sidebar"
          />
        </label>
        <label className="block text-sm text-muted">
          Location
          <textarea
            name="location"
            required
            rows={2}
            placeholder="Isha Foothills, Coimbatore"
            className="mt-1 block w-full rounded-sm border border-line bg-cream-soft px-4 py-3 text-[15px] text-ink outline-none focus:border-sidebar"
          />
        </label>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Away from" name="fromDate" type="date" required />
          <Field label="Away until" name="toDate" type="date" required />
        </div>
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
            Publish request
          </button>
          <Link
            href="/yantra-care"
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
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="block text-sm text-muted">
      {label}
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="mt-1 block h-12 w-full rounded-full border border-line bg-cream-soft px-4 text-[15px] text-ink outline-none focus:border-sidebar"
      />
    </label>
  );
}
