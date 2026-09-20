import type { Metadata } from "next";
import { BuySellBoard } from "@/components/buy-sell-board";
import { parseBuySellFilters } from "@/lib/buy-sell-query";
import { searchListings } from "@/lib/listing-search";

export const metadata: Metadata = {
  title: "Buy / Sell",
};

type BuySellPageProps = {
  searchParams: Promise<{
    q?: string;
    category?: string;
    mine?: string;
  }>;
};

export default async function BuySellPage({ searchParams }: BuySellPageProps) {
  const filters = parseBuySellFilters(await searchParams);
  const listings = await searchListings(filters);

  return (
    <BuySellBoard
      initialFilters={filters}
      initialListings={listings.map((listing) => ({
        ...listing,
        createdAt: listing.createdAt.toISOString(),
      }))}
    />
  );
}
