export function DashboardIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <rect
        x="3.4"
        y="4.4"
        width="13.2"
        height="12.2"
        rx="1.2"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path d="M3.4 8h13.2M7.5 4.4V2.8M12.5 4.4V2.8" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M7 11h1.4M10 11h1.4M13 11h1.4M7 13.6h1.4M10 13.6h1.4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function AnnouncementsIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M3.5 8.5v3M5 6.5v7M8 4.5v11M11 7v6M14 5.5v9M16.5 8v4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function BuySellIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M4.5 8.2 9.2 3.5a1.2 1.2 0 0 1 1.7 0l5.6 5.6a1.2 1.2 0 0 1 0 1.7l-4.7 4.7a1.2 1.2 0 0 1-1.7 0L4.5 9.9a1.2 1.2 0 0 1 0-1.7Z"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <circle cx="12.2" cy="7.8" r="1" fill="currentColor" />
    </svg>
  );
}

export function YantraCareIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <circle cx="10" cy="10" r="6.2" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M10 5.5 13.2 12H6.8L10 5.5Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function RentIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M3.8 9.2 10 3.8l6.2 5.4V16a.8.8 0 0 1-.8.8H4.6a.8.8 0 0 1-.8-.8V9.2Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path d="M8 16.8v-4.2h4v4.2" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

export function HrIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <circle cx="10" cy="6.2" r="2.3" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M4.8 16.2c.4-2.6 2.4-4 5.2-4s4.8 1.4 5.2 4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <circle cx="5.4" cy="7.4" r="1.6" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="14.6" cy="7.4" r="1.6" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

export function TicketIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M3.5 7.2c0-.9.7-1.6 1.6-1.6h9.8c.9 0 1.6.7 1.6 1.6v1.3a1.5 1.5 0 0 0 0 3v1.3c0 .9-.7 1.6-1.6 1.6H5.1c-.9 0-1.6-.7-1.6-1.6v-1.3a1.5 1.5 0 0 0 0-3V7.2Z"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="M8 5.6v8.8"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeDasharray="1.6 1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function DonationsIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M10 16.4s-6.2-3.7-6.2-8.1A3.3 3.3 0 0 1 10 6.2a3.3 3.3 0 0 1 6.2 2.1c0 4.4-6.2 8.1-6.2 8.1Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export const navIcons = {
  "/dashboard": DashboardIcon,
  "/announcements": AnnouncementsIcon,
  "/buy-sell": BuySellIcon,
  "/yantra-care": YantraCareIcon,
  "/rent": RentIcon,
  "/hr": HrIcon,
  "/raise-a-ticket": TicketIcon,
  "/donations": DonationsIcon,
} as const;
