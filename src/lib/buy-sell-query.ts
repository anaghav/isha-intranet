import { LISTING_CATEGORIES } from "@/lib/listings";

export type BuySellFilters = {
  q: string;
  category: string;
  mine: boolean;
  sellerEmail: string;
};

export function parseBuySellFilters(params: {
  q?: string;
  category?: string;
  mine?: string;
  sellerEmail?: string;
}): BuySellFilters {
  const category = LISTING_CATEGORIES.find((item) => item === params.category) ?? "";
  const mine = params.mine === "1";
  return {
    q: params.q?.trim() ?? "",
    category: mine ? "" : category,
    mine,
    sellerEmail: params.sellerEmail?.trim().toLowerCase() ?? "",
  };
}

export function buySellHref(filters: Partial<BuySellFilters>) {
  const search = new URLSearchParams();
  if (filters.q) search.set("q", filters.q);
  if (filters.mine) {
    search.set("mine", "1");
  } else if (filters.category) {
    search.set("category", filters.category);
  }
  const query = search.toString();
  return query ? `/buy-sell?${query}` : "/buy-sell";
}

export function listingsApiPath(filters: BuySellFilters) {
  const search = new URLSearchParams();
  if (filters.q) search.set("q", filters.q);
  if (filters.mine) {
    search.set("mine", "1");
    if (filters.sellerEmail) search.set("sellerEmail", filters.sellerEmail);
  } else if (filters.category) {
    search.set("category", filters.category);
  }
  const query = search.toString();
  return query ? `/api/listings?${query}` : "/api/listings";
}

export function listingWhere(filters: BuySellFilters) {
  return {
    AND: [
      filters.q
        ? {
            OR: [
              { title: { contains: filters.q, mode: "insensitive" as const } },
              {
                description: {
                  contains: filters.q,
                  mode: "insensitive" as const,
                },
              },
            ],
          }
        : {},
      filters.category ? { category: filters.category } : {},
      filters.mine && filters.sellerEmail
        ? {
            sellerEmail: {
              equals: filters.sellerEmail,
              mode: "insensitive" as const,
            },
          }
        : {},
      filters.mine && !filters.sellerEmail ? { id: "__none__" } : {},
    ],
  };
}
