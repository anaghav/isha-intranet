import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/page-placeholder";

export const metadata: Metadata = {
  title: "Announcements",
};

export default function AnnouncementsPage() {
  return (
    <PagePlaceholder
      kicker="Community"
      title="Announcements"
      body="Ashram and center updates will live here. We will build this page next."
    />
  );
}
