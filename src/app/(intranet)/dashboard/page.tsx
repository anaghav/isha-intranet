import type { Metadata } from "next";
import { DashboardBoard } from "@/components/dashboard-board";
import { prisma } from "@/lib/prisma";
import { recommendProgramsForCurrentUser } from "@/lib/recommend-programs";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  const [meetings, recommendations] = await Promise.all([
    prisma.meeting.findMany({ orderBy: { startsAt: "asc" } }),
    recommendProgramsForCurrentUser(),
  ]);

  return (
    <DashboardBoard
      meetings={meetings.map((meeting) => ({
        id: meeting.id,
        title: meeting.title,
        location: meeting.location,
        startsAt: meeting.startsAt.toISOString(),
        endsAt: meeting.endsAt?.toISOString() ?? null,
      }))}
      recommendations={recommendations}
    />
  );
}
