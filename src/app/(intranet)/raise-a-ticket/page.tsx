import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/page-placeholder";

export const metadata: Metadata = {
  title: "Raise a Ticket",
};

export default function RaiseATicketPage() {
  return (
    <PagePlaceholder
      kicker="Support"
      title="Raise a Ticket"
      body="Open a request for IT, facilities, or other help."
    />
  );
}
