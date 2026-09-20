import { NextResponse } from "next/server";
import { requireApiUser } from "@/lib/api-auth";
import { parseBuySellFilters } from "@/lib/buy-sell-query";
import { searchListings } from "@/lib/listing-search";

export async function GET(request: Request) {
  const user = await requireApiUser();
  if (user instanceof NextResponse) {
    return user;
  }

  const url = new URL(request.url);
  const filters = parseBuySellFilters({
    q: url.searchParams.get("q") ?? undefined,
    category: url.searchParams.get("category") ?? undefined,
    mine: url.searchParams.get("mine") ?? undefined,
    sellerEmail: url.searchParams.get("sellerEmail") ?? undefined,
  });

  const listings = await searchListings(filters);
  return NextResponse.json(listings);
}
