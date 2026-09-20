import { prisma } from "@/lib/prisma";
import { listingWhere, type BuySellFilters } from "@/lib/buy-sell-query";

export async function searchListings(filters: BuySellFilters) {
  return prisma.listing.findMany({
    where: listingWhere(filters),
    include: { images: { orderBy: { sortOrder: "asc" } } },
    orderBy: { createdAt: "desc" },
  });
}
