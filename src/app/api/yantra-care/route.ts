import { NextResponse } from "next/server";
import { requireApiUser } from "@/lib/api-auth";
import { parseYantraCareFilters } from "@/lib/yantra-care-query";
import { searchYantraCare } from "@/lib/yantra-care-search";

export async function GET(request: Request) {
  const user = await requireApiUser();
  if (user instanceof NextResponse) {
    return user;
  }

  const url = new URL(request.url);
  const filters = parseYantraCareFilters({
    q: url.searchParams.get("q") ?? undefined,
  });

  const requests = await searchYantraCare(filters);
  return NextResponse.json(requests);
}