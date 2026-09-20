import { prisma } from "@/lib/prisma";
import { rentalWhere, type RentFilters } from "@/lib/rent-query";

export async function searchRentals(filters: RentFilters) {
  return prisma.rental.findMany({
    where: rentalWhere(filters),
    include: { images: { orderBy: { sortOrder: "asc" } } },
    orderBy: { createdAt: "desc" },
  });
}
