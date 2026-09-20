"use client";

import { signOut } from "next-auth/react";

export function SignOutButton({ collapsed }: { collapsed: boolean }) {
  return (
    <button
      type="button"
      onClick={() => signOut({ redirectTo: "/login" })}
      className="w-full rounded-sm px-3 py-2 text-left text-sm text-cream-soft/70 transition-colors hover:bg-white/5 hover:text-cream-soft"
    >
      <span className={collapsed ? "md:hidden" : ""}>Sign out</span>
      <span className={collapsed ? "hidden md:inline" : "hidden"}>Out</span>
    </button>
  );
}
