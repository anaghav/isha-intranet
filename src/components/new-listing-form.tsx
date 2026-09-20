"use client";

import { createListing } from "@/app/actions/listings";
import { setSellerEmail } from "@/lib/seller-identity";

export function NewListingForm({ children }: { children: React.ReactNode }) {
  return (
    <form
      action={async (formData) => {
        setSellerEmail(String(formData.get("sellerEmail") ?? ""));
        await createListing(formData);
      }}
      className="mt-10 space-y-5"
    >
      {children}
    </form>
  );
}
