import Link from "next/link";

export default function AnnouncementNotFound() {
  return (
    <section className="mx-auto max-w-xl">
      <h1 className="font-serif text-4xl text-ink">Announcement not found</h1>
      <p className="mt-4 text-lg text-muted">This notice may have been removed.</p>
      <Link href="/announcements" className="mt-6 inline-block text-accent">
        Back to Events
      </Link>
    </section>
  );
}
