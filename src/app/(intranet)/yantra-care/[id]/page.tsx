import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatPostedDate } from "@/lib/listings";
import { formatCareRange } from "@/lib/yantra-care";

type YantraCareDetailProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: YantraCareDetailProps): Promise<Metadata> {
  const { id } = await params;
  const request = await prisma.yantraCare.findUnique({ where: { id } });
  return { title: request?.title ?? "Yantra care" };
}

export default async function YantraCareDetailPage({
  params,
}: YantraCareDetailProps) {
  const { id } = await params;
  const request = await prisma.yantraCare.findUnique({ where: { id } });

  if (!request) {
    notFound();
  }

  return (
    <article className="mx-auto w-full max-w-4xl">
      <Link href="/yantra-care" className="text-sm text-muted hover:text-ink">
        Back to Yantra Care
      </Link>

      <p className="mt-8 text-xs font-medium tracking-[0.22em] text-accent uppercase">
        {request.location}
      </p>
      <h1 className="mt-3 font-serif text-4xl leading-tight text-ink md:text-5xl">
        {request.title}
      </h1>
      <p className="mt-4 text-2xl text-ink">
        {formatCareRange(request.fromDate, request.toDate)}
      </p>
      <p className="mt-2 text-sm text-muted">
        Posted {formatPostedDate(request.createdAt)}
      </p>
      <p className="mt-8 max-w-2xl text-lg leading-8 text-muted whitespace-pre-wrap">
        {request.description}
      </p>

      <section className="mt-10 max-w-lg rounded-sm bg-cream-soft px-6 py-6">
        <h2 className="font-serif text-2xl text-ink">Offer to help</h2>
        <p className="mt-3 text-ink">{request.ownerName}</p>
        <p className="mt-1">
          <a href={`tel:${request.ownerPhone}`} className="text-accent">
            {request.ownerPhone}
          </a>
        </p>
        <p className="mt-1">
          <a href={`mailto:${request.ownerEmail}`} className="text-accent">
            {request.ownerEmail}
          </a>
        </p>
      </section>
    </article>
  );
}
