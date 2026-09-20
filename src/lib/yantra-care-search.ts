import { prisma } from "@/lib/prisma";
import { yantraCareWhere, type YantraCareFilters } from "@/lib/yantra-care-query";

export async function searchYantraCare(filters: YantraCareFilters) {
  return prisma.yantraCare.findMany({
    where: yantraCareWhere(filters),
    orderBy: { createdAt: "desc" },
  });
}