"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { RENTAL_TYPES } from "@/lib/rentals";
import { rentHref, rentalsApiPath, type RentFilters } from "@/lib/rent-query";
import { RentalCard } from "@/components/rental-card";

type RentalResult = {
  id: string;
  title: string;
  type: string;
  address: string;
  distanceKm: number;
  rentInr: number;
  imageUrl: string | null;
  images: { path: string }[];
  createdAt: string;
};

type RentBoardProps = {
  initialFilters: RentFilters;
  initialRentals: RentalResult[];
};

export function RentBoard({ initialFilters, initialRentals }: RentBoardProps) {
  const [q, setQ] = useState(initialFilters.q);
  const [debouncedQ, setDebouncedQ] = useState(initialFilters.q);
  const [type, setType] = useState(initialFilters.type);
  const [rentals, setRentals] = useState(initialRentals);
  const [loading, setLoading] = useState(false);
  const requestId = useRef(0);
  const hasMountedSearch = useRef(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedQ(q), 350);
    return () => window.clearTimeout(timer);
  }, [q]);

  useEffect(() => {
    const filters: RentFilters = {
      q: debouncedQ.trim(),
      type,
    };

    if (!hasMountedSearch.current) {
      hasMountedSearch.current = true;
      syncUrl(filters);
      return;
    }

    const controller = new AbortController();
    const currentRequest = ++requestId.current;

    syncUrl(filters);
    setLoading(true);

    fetch(rentalsApiPath(filters), { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Search failed");
        }
        return response.json() as Promise<RentalResult[]>;
      })
      .then((nextRentals) => {
        if (currentRequest === requestId.current) {
          setRentals(nextRentals);
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
  }, [debouncedQ, type]);

  return (
    <section className="relative mx-auto w-full max-w-6xl pb-28">
      <label className="block text-sm text-muted">
        Search
        <input
          type="search"
          value={q}
          onChange={(event) => setQ(event.target.value)}
          placeholder="Search title, description, or address"
          className="mt-1 block h-12 w-full rounded-full border border-line bg-cream-soft px-5 text-[15px] text-ink outline-none placeholder:text-muted/70 focus:border-sidebar"
        />
      </label>

      <div className="mt-6 flex flex-wrap gap-2">
        <FilterChip active={!type} onClick={() => setType("")}>
          All
        </FilterChip>
        {RENTAL_TYPES.map((item) => (
          <FilterChip
            key={item}
            active={type === item}
            onClick={() => setType(item)}
          >
            {item}
          </FilterChip>
        ))}
      </div>

      {loading ? (
        <p className="mt-6 text-sm text-muted">Searching…</p>
      ) : null}

      {rentals.length === 0 ? (
        <p className="mt-16 text-lg leading-8 text-muted">
          No homes match these filters.
        </p>
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {rentals.map((rental) => (
            <RentalCard
              key={rental.id}
              {...rental}
              createdAt={new Date(rental.createdAt)}
            />
          ))}
        </div>
      )}

      <Link
        href="/rent/new"
        className="fixed right-6 bottom-6 z-20 inline-flex h-14 items-center justify-center rounded-full bg-cta px-6 text-[15px] font-medium text-white md:right-10 md:bottom-8"
      >
        Post property
      </Link>
    </section>
  );
}

function syncUrl(filters: RentFilters) {
  window.history.replaceState(window.history.state, "", rentHref(filters));
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
