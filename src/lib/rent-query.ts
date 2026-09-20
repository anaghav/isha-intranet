import { RENTAL_TYPES } from "@/lib/rentals";

export type RentFilters = {
  q: string;
  type: string;
};

export function parseRentFilters(params: {
  q?: string;
  type?: string;
}): RentFilters {
  const type = RENTAL_TYPES.find((item) => item === params.type) ?? "";
  return {
    q: params.q?.trim() ?? "",
    type,
  };
}

export function rentHref(filters: Partial<RentFilters>) {
  const search = new URLSearchParams();
  if (filters.q) search.set("q", filters.q);
  if (filters.type) search.set("type", filters.type);
  const query = search.toString();
  return query ? `/rent?${query}` : "/rent";
}

export function rentalsApiPath(filters: RentFilters) {
  const search = new URLSearchParams();
  if (filters.q) search.set("q", filters.q);
  if (filters.type) search.set("type", filters.type);
  const query = search.toString();
  return query ? `/api/rentals?${query}` : "/api/rentals";
}

export function rentalWhere(filters: RentFilters) {
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
              {
                address: { contains: filters.q, mode: "insensitive" as const },
              },
            ],
          }
        : {},
      filters.type ? { type: filters.type } : {},
    ],
  };
}
