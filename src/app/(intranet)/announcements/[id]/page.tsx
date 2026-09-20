import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatPostedDate } from "@/lib/listings";

type AnnouncementPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: AnnouncementPageProps): Promise<Metadata> {
  const { id } = await params;
  const announcement = await prisma.announcement.findUnique({ where: { id } });
  return { title: announcement?.title ?? "Announcement" };
}

export default async function AnnouncementPage({
  params,
}: AnnouncementPageProps) {
  const { id } = await params;
  const announcement = await prisma.announcement.findUnique({
    where: { id },
  });

  if (!announcement) {
    notFound();
  }

  return (
    <article className="mx-auto w-full max-w-4xl">
      <Link href="/announcements" className="text-sm text-muted hover:text-ink">
        Back to Events
      </Link>

      <div
        className="mt-6 overflow-hidden bg-[#01365D] shadow-[0_12px_15px_-6px_rgba(0,0,0,0.3)]"
      >
        <div
          className="aspect-[16/8] overflow-hidden"
          style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 90%)" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={announcement.imageUrl}
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
        <div className="px-6 py-5">
          <p className="text-xs tracking-[0.22em] text-white/70 uppercase">
            {announcement.category} Events
          </p>
          <h1 className="mt-2 text-3xl leading-tight font-medium text-white md:text-4xl">
            {announcement.title}
          </h1>
        </div>
      </div>
      {announcement.eventDate ? (
        <p className="mt-3 text-sm text-muted">
          {formatPostedDate(announcement.eventDate)}
        </p>
      ) : null}
      <p className="mt-8 max-w-2xl text-lg leading-8 text-muted">
        {announcement.summary}
      </p>
      {announcement.sourceUrl ? (
        <p className="mt-8">
          <a
            href={announcement.sourceUrl}
            target="_blank"
            rel="noreferrer"
            className="text-accent"
          >
            View on isha.sadhguru.org
          </a>
        </p>
      ) : null}
    </article>
  );
}
