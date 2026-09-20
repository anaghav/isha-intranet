import type { Metadata } from "next";
import { YantraCareBoard } from "@/components/yantra-care-board";
import { parseYantraCareFilters } from "@/lib/yantra-care-query";
import { searchYantraCare } from "@/lib/yantra-care-search";

export const metadata: Metadata = {
  title: "Yantra Care",
};

type YantraCarePageProps = {
  searchParams: Promise<{ q?: string }>;
};

export default async function YantraCarePage({
  searchParams,
}: YantraCarePageProps) {
  const filters = parseYantraCareFilters(await searchParams);
  const requests = await searchYantraCare(filters);

  return (
    <YantraCareBoard
      initialFilters={filters}
      initialRequests={requests.map((request) => ({
        ...request,
        fromDate: request.fromDate.toISOString(),
        toDate: request.toDate.toISOString(),
        createdAt: request.createdAt.toISOString(),
      }))}
    />
  );
}
