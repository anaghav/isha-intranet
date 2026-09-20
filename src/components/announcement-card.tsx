import Link from "next/link";

export type AnnouncementCardData = {
  id: string;
  title: string;
  summary: string;
  imageUrl: string;
  category: string;
};

const CARD_THEME: Record<
  string,
  { band: string; clip: string }
> = {
  Featured: {
    band: "#01365D",
    clip: "polygon(0 0, 100% 0, 100% 100%, 0 90%)",
  },
  Monthly: {
    band: "#01365D",
    clip: "polygon(0 0, 100% 0, 100% 100%, 0 90%)",
  },
  Annual: {
    band: "#004D85",
    clip: "polygon(0 0, 100% 0, 100% 90%, 0 98%)",
  },
  Special: {
    band: "#18679F",
    clip: "polygon(0 0, 100% 0, 100% 100%, 0 90%)",
  },
};

export function AnnouncementCard({
  id,
  title,
  summary,
  imageUrl,
  category,
}: AnnouncementCardData) {
  const theme = CARD_THEME[category] ?? CARD_THEME.Monthly;

  return (
    <Link
      href={`/announcements/${id}`}
      className="group block w-full max-w-[370px] sm:w-[330px] lg:w-[370px]"
    >
      <article className="h-full bg-white text-left shadow-[0_12px_15px_-6px_rgba(0,0,0,0.3)] transition-shadow duration-200 group-hover:shadow-[0_0_48px_0_rgba(0,0,0,0.25)]">
        <div className="relative" style={{ backgroundColor: theme.band }}>
          <div
            className="h-[220px] w-full overflow-hidden lg:h-[225px]"
            style={{ clipPath: theme.clip }}
          >
            {/* Public Isha event photos */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageUrl}
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
          <div className="px-[18px] py-[18px]">
            <h3 className="truncate text-2xl leading-tight font-medium text-white">
              {title}
            </h3>
          </div>
        </div>
        <div className="px-[18px] py-[18px]">
          <p className="line-clamp-4 text-[17px] leading-[1.35] text-[#28231e]">
            {summary}
          </p>
        </div>
      </article>
    </Link>
  );
}
