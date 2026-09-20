import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/page-placeholder";

export const metadata: Metadata = {
  title: "HR",
};

export default function HrPage() {
  return (
    <PagePlaceholder
      kicker="People"
      title="HR"
      body="Leave, policies, and staff notices will live here."
    />
  );
}
