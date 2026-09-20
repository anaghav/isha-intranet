import type { Metadata } from "next";
import { RentBoard } from "@/components/rent-board";
import { parseRentFilters } from "@/lib/rent-query";
import { searchRentals } from "@/lib/rental-search";

export const metadata: Metadata = {
  title: "Rent near Isha",
};

type RentPageProps = {
  searchParams: Promise<{ q?: string; type?: string }>;
};

export default async function RentPage({ searchParams }: RentPageProps) {
  const filters = parseRentFilters(await searchParams);
  const rentals = await searchRentals(filters);

  return (
    <RentBoard
      initialFilters={filters}
      initialRentals={rentals.map((rental) => ({
        ...rental,
        createdAt: rental.createdAt.toISOString(),
      }))}
    />
  );
}
