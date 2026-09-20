"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "@/lib/navigation";
import { navIcons } from "@/components/nav-icons";
import { SignOutButton } from "@/components/sign-out-button";
import { useSession } from "next-auth/react";

type SidebarProps = {
  open: boolean;
  collapsed: boolean;
  onClose: () => void;
  onToggleCollapsed: () => void;
};

export function Sidebar({
  open,
  collapsed,
  onClose,
  onToggleCollapsed,
}: SidebarProps) {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <>
      <button
        type="button"
        aria-hidden={!open}
        tabIndex={open ? 0 : -1}
        className={`fixed inset-0 z-30 bg-sidebar/40 transition-opacity md:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
      />

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex h-dvh flex-col bg-sidebar text-cream-soft transition-[width,transform] duration-200 ${
          collapsed ? "w-[272px] md:w-[76px]" : "w-[272px]"
        } ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <div
          className={`border-b border-white/10 ${
            collapsed ? "px-3 py-5 md:px-3 md:py-6" : "px-6 py-7"
          }`}
        >
          <Link href="/dashboard" onClick={onClose} className="block">
            <Image
              src="/isha-logo.png"
              alt="Isha"
              width={196}
              height={136}
              className={`h-auto ${collapsed ? "w-[148px] md:w-[48px]" : "w-[148px]"}`}
              priority
            />
            <p
              className={`mt-3 text-[11px] font-medium tracking-[0.28em] text-cream-soft/70 uppercase ${
                collapsed ? "md:hidden" : ""
              }`}
            >
              Volunteer intranet
            </p>
          </Link>
        </div>

        <nav className="flex flex-1 flex-col gap-1 px-3 py-5" aria-label="Main">
          {navItems.map((item) => {
            const active = pathname === item.href;
            const Icon = navIcons[item.href];

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                title={item.label}
                className={`group relative rounded-sm py-3 transition-colors ${
                  collapsed ? "px-3 md:px-0 md:flex md:justify-center" : "px-3"
                } ${
                  active
                    ? "bg-white/10 text-cream-soft"
                    : "text-cream-soft/70 hover:bg-white/5 hover:text-cream-soft"
                }`}
              >
                {active ? (
                  <span
                    aria-hidden
                    className="absolute inset-y-2 left-0 w-[2px] bg-accent"
                  />
                ) : null}
                <span className="flex items-start gap-3">
                  <span className="mt-0.5 shrink-0">
                    <Icon />
                  </span>
                  <span className={collapsed ? "md:hidden" : ""}>
                    <span className="block text-[15px] font-medium tracking-wide">
                      {item.label}
                    </span>
                    <span className="mt-0.5 block text-xs text-cream-soft/45">
                      {item.description}
                    </span>
                  </span>
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-white/10 px-3 py-4">
          <p
            className={`px-3 pb-3 text-xs leading-5 text-cream-soft/40 ${
              collapsed ? "md:hidden" : ""
            }`}
          >
            {session?.user?.name ?? session?.user?.email ?? "Isha Yoga Center"}
          </p>
          <Link
            href="/profile"
            onClick={onClose}
            title="Profile"
            className={`block w-full rounded-sm px-3 py-2 text-left text-sm transition-colors ${
              pathname === "/profile"
                ? "bg-white/10 text-cream-soft"
                : "text-cream-soft/70 hover:bg-white/5 hover:text-cream-soft"
            }`}
          >
            <span className={collapsed ? "md:hidden" : ""}>Profile</span>
            <span className={collapsed ? "hidden md:inline" : "hidden"}>Me</span>
          </Link>
          <SignOutButton collapsed={collapsed} />
          <button
            type="button"
            onClick={onToggleCollapsed}
            className="hidden w-full items-center gap-3 rounded-sm px-3 py-2 text-cream-soft/70 transition-colors hover:bg-white/5 hover:text-cream-soft md:flex"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <ChevronIcon collapsed={collapsed} />
            <span className={`text-sm ${collapsed ? "md:hidden" : ""}`}>
              Collapse
            </span>
          </button>
        </div>
      </aside>
    </>
  );
}

function ChevronIcon({ collapsed }: { collapsed: boolean }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden
      className={collapsed ? "rotate-180" : ""}
    >
      <path
        d="M11 4.5 6.5 9l4.5 4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
