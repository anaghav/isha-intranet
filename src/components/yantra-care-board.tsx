"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  yantraCareApiPath,
  yantraCareHref,
  type YantraCareFilters,
} from "@/lib/yantra-care-query";
import { YantraCareCard } from "@/components/yantra-care-card";

type YantraCareResult = {
  id: string;
  title: string;
  location: string;
  fromDate: string;
  toDate: string;
  createdAt: string;
};

type YantraCareBoardProps = {
  initialFilters: YantraCareFilters;
  initialRequests: YantraCareResult[];
};

export function YantraCareBoard({
  initialFilters,
  initialRequests,
}: YantraCareBoardProps) {
  const [q, setQ] = useState(initialFilters.q);
  const [debouncedQ, setDebouncedQ] = useState(initialFilters.q);
  const [requests, setRequests] = useState(initialRequests);
  const [loading, setLoading] = useState(false);
  const requestId = useRef(0);
  const hasMountedSearch = useRef(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedQ(q), 350);
    return () => window.clearTimeout(timer);
  }, [q]);

  useEffect(() => {
    const filters: YantraCareFilters = {
      q: debouncedQ.trim(),
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

    fetch(yantraCareApiPath(filters), { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Search failed");
        }
        return response.json() as Promise<YantraCareResult[]>;
      })
      .then((nextRequests) => {
        if (currentRequest === requestId.current) {
          setRequests(nextRequests);
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
  }, [debouncedQ]);

  return (
    <section className="relative mx-auto w-full max-w-2xl pb-28">
      <label className="block text-sm text-muted">
        Search
        <input
          type="search"
          value={q}
          onChange={(event) => setQ(event.target.value)}
          placeholder="Search yantra, place, or description"
          className="mt-1 block h-12 w-full rounded-full border border-line bg-cream-soft px-5 text-[15px] text-ink outline-none placeholder:text-muted/70 focus:border-sidebar"
        />
      </label>

      {loading ? (
        <p className="mt-6 text-sm text-muted">Searching…</p>
      ) : null}

      {requests.length === 0 ? (
        <p className="mt-16 text-lg leading-8 text-muted">
          No care requests match this search.
        </p>
      ) : (
        <div className="mt-8">
          {requests.map((request) => (
            <YantraCareCard
              key={request.id}
              id={request.id}
              title={request.title}
              location={request.location}
              fromDate={new Date(request.fromDate)}
              toDate={new Date(request.toDate)}
              createdAt={new Date(request.createdAt)}
            />
          ))}
        </div>
      )}

      <Link
        href="/yantra-care/new"
        className="fixed right-6 bottom-6 z-20 inline-flex h-14 items-center justify-center rounded-full bg-cta px-6 text-[15px] font-medium text-white md:right-10 md:bottom-8"
      >
        Ask for care
      </Link>
    </section>
  );
}

function syncUrl(filters: YantraCareFilters) {
  window.history.replaceState(window.history.state, "", yantraCareHref(filters));
}