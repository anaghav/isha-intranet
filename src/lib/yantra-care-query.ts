export type YantraCareFilters = {
  q: string;
};

export function parseYantraCareFilters(params: { q?: string }): YantraCareFilters {
  return { q: params.q?.trim() ?? "" };
}

export function yantraCareHref(filters: Partial<YantraCareFilters>) {
  const search = new URLSearchParams();
  if (filters.q) search.set("q", filters.q);
  const query = search.toString();
  return query ? `/yantra-care?${query}` : "/yantra-care";
}

export function yantraCareApiPath(filters: YantraCareFilters) {
  const search = new URLSearchParams();
  if (filters.q) search.set("q", filters.q);
  const query = search.toString();
  return query ? `/api/yantra-care?${query}` : "/api/yantra-care";
}

export function yantraCareWhere(filters: YantraCareFilters) {
  return filters.q
    ? {
        OR: [
          { title: { contains: filters.q, mode: "insensitive" as const } },
          {
            description: {
              contains: filters.q,
              mode: "insensitive" as const,
            },
          },
          { location: { contains: filters.q, mode: "insensitive" as const } },
        ],
      }
    : {};
}