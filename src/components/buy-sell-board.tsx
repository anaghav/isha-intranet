"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { markListingSold } from "@/app/actions/listings";
import { LISTING_CATEGORIES } from "@/lib/listings";
import {
  buySellHref,
  listingsApiPath,
  type BuySellFilters,
} from "@/lib/buy-sell-query";
import { getSellerEmail, setSellerEmail } from "@/lib/seller-identity";
import { ListingCard } from "@/components/listing-card";

type ListingResult = {
  id: string;
  title: string;
  priceInr: number;
  category: string;
  imageUrl: string | null;
  images: { path: string }[];
  status: string;
  createdAt: string;
};

type BuySellBoardProps = {
  initialFilters: BuySellFilters;
  initialListings: ListingResult[];
};

export function BuySellBoard({
  initialFilters,
  initialListings,
}: BuySellBoardProps) {
  const [q, setQ] = useState(initialFilters.q);
  const [debouncedQ, setDebouncedQ] = useState(initialFilters.q);
  const [category, setCategory] = useState(initialFilters.category);
  const [mine, setMine] = useState(initialFilters.mine);
  const [sellerEmail, setSellerEmailState] = useState("");
  const [emailDraft, setEmailDraft] = useState("");
  const [listings, setListings] = useState(initialListings);
  const [loading, setLoading] = useState(false);
  const requestId = useRef(0);
  const hasMountedSearch = useRef(false);

  useEffect(() => {
    const saved = getSellerEmail();
    setSellerEmailState(saved);
    setEmailDraft(saved);
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedQ(q), 350);
    return () => window.clearTimeout(timer);
  }, [q]);

  useEffect(() => {
    const filters: BuySellFilters = {
      q: debouncedQ.trim(),
      category: mine ? "" : category,
      mine,
      sellerEmail,
    };

    if (!hasMountedSearch.current) {
      hasMountedSearch.current = true;
      syncUrl(filters);
      if (!mine) {
        return;
      }
    }

    const controller = new AbortController();
    const currentRequest = ++requestId.current;

    syncUrl(filters);
    setLoading(true);

    fetch(listingsApiPath(filters), { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Search failed");
        }
        return response.json() as Promise<ListingResult[]>;
      })
      .then((nextListings) => {
        if (currentRequest === requestId.current) {
          setListings(nextListings);
        }
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }
      })
      .finally(() => {
        if (currentRequest === requestId.current) {
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, [debouncedQ, category, mine, sellerEmail]);

  async function onMarkSold(id: string) {
    const formData = new FormData();
    formData.set("id", id);
    formData.set("stay", "1");
    await markListingSold(formData);
    setListings((current) =>
      current.map((listing) =>
        listing.id === id ? { ...listing, status: "sold" } : listing,
      ),
    );
  }

  return (
    <section className="relative mx-auto w-full max-w-2xl pb-28">
      <div className="space-y-3">
        <label className="block text-sm text-muted">
          Search
          <input
            type="search"
            value={q}
            onChange={(event) => setQ(event.target.value)}
            placeholder="Search title or description"
            className="mt-1 block h-12 w-full rounded-full border border-line bg-cream-soft px-5 text-[15px] text-ink outline-none placeholder:text-muted/70 focus:border-sidebar"
          />
        </label>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        <FilterChip
          active={!mine && !category}
          onClick={() => {
            setMine(false);
            setCategory("");
          }}
        >
          All
        </FilterChip>
        <FilterChip
          active={mine}
          onClick={() => {
            setMine(true);
            setCategory("");
          }}
        >
          My listings
        </FilterChip>
        {LISTING_CATEGORIES.map((item) => (
          <FilterChip
            key={item}
            active={!mine && category === item}
            onClick={() => {
              setMine(false);
              setCategory(item);
            }}
          >
            {item}
          </FilterChip>
        ))}
      </div>

      {mine ? (
        <form
          className="mt-4 flex flex-wrap items-end gap-2"
          onSubmit={(event) => {
            event.preventDefault();
            const nextEmail = emailDraft.trim().toLowerCase();
            setSellerEmail(nextEmail);
            setSellerEmailState(nextEmail);
          }}
        >
          <label className="block min-w-[220px] flex-1 text-sm text-muted">
            Your listing email
            <input
              type="email"
              value={emailDraft}
              onChange={(event) => setEmailDraft(event.target.value)}
              placeholder="you@sadhguru.org"
              className="mt-1 block h-11 w-full rounded-full border border-line bg-cream-soft px-4 text-[15px] text-ink outline-none focus:border-sidebar"
            />
          </label>
          <button
            type="submit"
            className="h-11 rounded-full bg-sidebar px-4 text-sm text-cream-soft"
          >
            Show mine
          </button>
        </form>
      ) : null}

      {loading ? (
        <p className="mt-6 text-sm text-muted">Searching…</p>
      ) : null}

      {listings.length === 0 ? (
        <p className="mt-16 text-lg leading-8 text-muted">
          {mine
            ? "No listings for this email yet. Post one, or enter the email you used."
            : "No listings match these filters."}
        </p>
      ) : (
        <div className="mt-8">
          {listings.map((listing) => (
            <div key={listing.id} className="border-b border-line last:border-b-0">
              <ListingCard
                {...listing}
                createdAt={new Date(listing.createdAt)}
                flush
              />
              {mine && listing.status === "available" ? (
                <button
                  type="button"
                  onClick={() => onMarkSold(listing.id)}
                  className="mb-5 h-10 rounded-full border border-line px-4 text-sm text-ink"
                >
                  Mark as sold
                </button>
              ) : null}
            </div>
          ))}
        </div>
      )}

      <Link
        href="/buy-sell/new"
        className="fixed right-6 bottom-6 z-20 inline-flex h-14 items-center justify-center rounded-full bg-cta px-6 text-[15px] font-medium text-white shadow-none md:right-10 md:bottom-8"
      >
        Post listing
      </Link>
    </section>
  );
}

function syncUrl(filters: BuySellFilters) {
  window.history.replaceState(window.history.state, "", buySellHref(filters));
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-3 py-1.5 text-sm ${
        active ? "bg-sidebar text-cream-soft" : "bg-cream-soft text-muted"
      }`}
    >
      {children}
    </button>
  );
}
