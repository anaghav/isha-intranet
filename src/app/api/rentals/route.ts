import { NextResponse } from "next/server";
import { requireApiUser } from "@/lib/api-auth";
import { parseRentFilters } from "@/lib/rent-query";
import { searchRentals } from "@/lib/rental-search";

export async function GET(request: Request) {
  const user = await requireApiUser();
  if (user instanceof NextResponse) {
    return user;
  }

  const url = new URL(request.url);
  const filters = parseRentFilters({
    q: url.searchParams.get("q") ?? undefined,
    type: url.searchParams.get("type") ?? undefined,
  });

  const rentals = await searchRentals(filters);
  return NextResponse.json(rentals);
}
