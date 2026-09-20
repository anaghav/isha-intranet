"use client";

import { useEffect, useState } from "react";
import { getSellerEmail } from "@/lib/seller-identity";

export function RememberedEmailField() {
  const [email, setEmail] = useState("");

  useEffect(() => {
    setEmail(getSellerEmail());
  }, []);

  return (
    <label className="block text-sm text-muted">
      Email
      <input
        name="sellerEmail"
        type="email"
        required
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        className="mt-1 block h-12 w-full rounded-full border border-line bg-cream-soft px-4 text-[15px] text-ink outline-none focus:border-sidebar"
      />
    </label>
  );
}
