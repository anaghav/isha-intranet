import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { AnnouncementCard } from "@/components/announcement-card";

export const metadata: Metadata = {
  title: "Announcements",
};

const SECTION_ORDER = ["Featured", "Monthly", "Annual", "Special"] as const;

export default async function AnnouncementsPage() {
  const announcements = await prisma.announcement.findMany({
    orderBy: { createdAt: "asc" },
  });

  const sections = SECTION_ORDER.map((section) => ({
    section,
    items: announcements.filter((item) => item.category === section),
  }));

  return (
    <section className="mx-auto w-full max-w-6xl">
      <p className="text-center text-xs font-medium tracking-[0.22em] text-accent uppercase">
        Community
      </p>
      <h1 className="mt-3 text-center font-serif text-4xl leading-tight text-ink md:text-6xl">
        Events
      </h1>
      <p className="mx-auto mt-5 max-w-2xl text-center text-lg leading-8 text-muted">
        Volunteer notices drawn from upcoming Isha events at the Yoga Centre.
      </p>

      {sections.map(({ section, items }) =>
        items.length > 0 ? (
          <div key={section} className="mt-16">
            <h2 className="text-center font-serif text-3xl text-ink md:text-4xl">
              {section} Events
            </h2>
            <div className="mt-8 flex flex-wrap justify-center gap-[15px] md:gap-[30px]">
              {items.map((item) => (
                <AnnouncementCard
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  summary={item.summary}
                  imageUrl={item.imageUrl}
                  category={item.category}
                />
              ))}
            </div>
          </div>
        ) : null,
      )}
    </section>
  );
}
