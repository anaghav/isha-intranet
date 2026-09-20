"use client";

import { useState, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { Sidebar } from "@/components/sidebar";
import { navItems } from "@/lib/navigation";

const STORAGE_KEY = "isha-sidebar-collapsed";
const listeners = new Set<() => void>();
let collapsedValue = false;

function emitCollapsed() {
  listeners.forEach((listener) => listener());
}

function subscribeCollapsed(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getCollapsed() {
  return collapsedValue;
}

function getCollapsedServer() {
  return false;
}

if (typeof window !== "undefined") {
  collapsedValue = window.localStorage.getItem(STORAGE_KEY) === "true";
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const collapsed = useSyncExternalStore(
    subscribeCollapsed,
    getCollapsed,
    getCollapsedServer,
  );
  const pathname = usePathname();
  const current = navItems.find((item) => item.href === pathname);

  function toggleCollapsed() {
    collapsedValue = !collapsedValue;
    window.localStorage.setItem(STORAGE_KEY, String(collapsedValue));
    emitCollapsed();
  }

  return (
    <div className="min-h-dvh">
      <Sidebar
        open={open}
        collapsed={collapsed}
        onClose={() => setOpen(false)}
        onToggleCollapsed={toggleCollapsed}
      />

      <div
        className={`flex min-h-dvh min-w-0 flex-col transition-[padding] duration-200 ${
          collapsed ? "md:pl-[76px]" : "md:pl-[272px]"
        }`}
      >
        <header className="flex items-center gap-3 border-b border-line bg-cream-soft px-4 py-3 md:hidden">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="flex h-10 w-10 items-center justify-center text-ink"
            aria-label="Open menu"
          >
            <MenuIcon />
          </button>
          <p className="font-serif text-xl text-ink">
            {current?.label ?? (pathname === "/profile" ? "Profile" : "Isha Intranet")}
          </p>
        </header>

        <main className="flex-1 px-6 py-10 md:px-12 md:py-14">{children}</main>
      </div>
    </div>
  );
}

function MenuIcon() {
  return (
    <svg width="22" height="16" viewBox="0 0 22 16" fill="none" aria-hidden>
      <path d="M1 1h20M1 8h20M1 15h20" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
