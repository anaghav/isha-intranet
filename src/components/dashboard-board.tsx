"use client";

import { useMemo, useState } from "react";
import {
  dateKeyInKolkata,
  formatMeetingDay,
  formatMeetingRange,
  formatMonthYear,
  formatProgramDate,
  kolkataYearMonth,
  startOfTodayInKolkata,
  todayKeyInKolkata,
} from "@/lib/dashboard";

export type DashboardMeeting = {
  id: string;
  title: string;
  location: string;
  startsAt: string;
  endsAt: string | null;
};

export type DashboardRecommendation = {
  id: string;
  title: string;
  description: string;
  location: string;
  startsOn: string;
  neededSkills: string[];
  why: string;
  source: "ai" | "profile";
};

type DashboardBoardProps = {
  meetings: DashboardMeeting[];
  recommendations: DashboardRecommendation[];
};

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function DashboardBoard({
  meetings,
  recommendations,
}: DashboardBoardProps) {
  const now = kolkataYearMonth();
  const [year, setYear] = useState(now.year);
  const [month, setMonth] = useState(now.month);
  const todayKey = todayKeyInKolkata();
  const upcomingStart = startOfTodayInKolkata();

  const meetingsByDay = useMemo(() => {
    const grouped = new Map<string, DashboardMeeting[]>();
    for (const meeting of meetings) {
      const key = dateKeyInKolkata(new Date(meeting.startsAt));
      const list = grouped.get(key) ?? [];
      list.push(meeting);
      grouped.set(key, list);
    }
    return grouped;
  }, [meetings]);

  const cells = useMemo(() => monthCells(year, month), [year, month]);

  const upcoming = useMemo(
    () =>
      meetings
        .filter((meeting) => new Date(meeting.startsAt) >= upcomingStart)
        .sort(
          (a, b) =>
            new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime(),
        ),
    [meetings, upcomingStart],
  );

  const upcomingByDay = useMemo(() => {
    const groups: {
      key: string;
      label: string;
      items: DashboardMeeting[];
    }[] = [];
    const indexByKey = new Map<string, number>();

    for (const meeting of upcoming) {
      const key = dateKeyInKolkata(new Date(meeting.startsAt));
      const existing = indexByKey.get(key);
      if (existing === undefined) {
        indexByKey.set(key, groups.length);
        groups.push({
          key,
          label: formatMeetingDay(new Date(meeting.startsAt)),
          items: [meeting],
        });
      } else {
        groups[existing].items.push(meeting);
      }
    }

    return groups;
  }, [upcoming]);

  function shiftMonth(delta: number) {
    const next = new Date(Date.UTC(year, month + delta, 1));
    setYear(next.getUTCFullYear());
    setMonth(next.getUTCMonth());
  }

  return (
    <section className="mx-auto w-full max-w-6xl space-y-14">
      <header>
        <p className="text-xs font-medium tracking-[0.22em] text-accent uppercase">
          Overview
        </p>
        <h1 className="mt-3 font-serif text-4xl leading-tight text-ink md:text-5xl">
          Dashboard
        </h1>
      </header>

      <section>
        <p className="text-xs font-medium tracking-[0.22em] text-accent uppercase">
          {recommendations.some((item) => item.source === "ai")
            ? "AI recommended"
            : "Recommended for you"}
        </p>
        <h2 className="mt-2 font-serif text-3xl text-ink">
          Programs to offer seva
        </h2>
        <p className="mt-3 max-w-2xl text-muted">
          Picked from the upcoming offerings using your skills and programs
          volunteered for.
        </p>
        {recommendations.length === 0 ? (
          <p className="mt-6 text-lg leading-8 text-muted">
            Add skills and seva history on Profile to get recommendations.
          </p>
        ) : (
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {recommendations.map((item) => (
              <article
                key={item.id}
                className="flex h-full flex-col bg-cream-soft p-6"
              >
                <p className="text-xs tracking-[0.16em] text-muted uppercase">
                  {formatProgramDate(new Date(item.startsOn))}
                  {item.location ? ` · ${item.location}` : ""}
                </p>
                <h3 className="mt-3 font-serif text-2xl leading-snug text-ink">
                  {item.title}
                </h3>
                <p className="mt-3 text-[15px] leading-7 text-ink">{item.why}</p>
                <p className="mt-2 line-clamp-3 text-sm leading-6 text-muted">
                  {item.description}
                </p>
                {item.neededSkills.length > 0 ? (
                  <p className="mt-auto pt-4 text-xs tracking-[0.08em] text-muted uppercase">
                    {item.neededSkills.join(" · ")}
                  </p>
                ) : null}
              </article>
            ))}
          </div>
        )}
      </section>

      <div className="grid items-start gap-10 xl:grid-cols-[minmax(0,1.6fr)_minmax(280px,0.9fr)]">
        <section>
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-medium tracking-[0.22em] text-accent uppercase">
                Calendar
              </p>
              <h2 className="mt-2 font-serif text-3xl text-ink">
                {formatMonthYear(year, month)}
              </h2>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => shiftMonth(-1)}
                className="inline-flex h-10 items-center rounded-full border border-line px-4 text-sm text-ink"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={() => shiftMonth(1)}
                className="inline-flex h-10 items-center rounded-full border border-line px-4 text-sm text-ink"
              >
                Next
              </button>
            </div>
          </div>

          <div className="mt-6 overflow-x-auto">
            <div className="min-w-[560px] border border-line bg-cream-soft">
              <div className="grid grid-cols-7 border-b border-line">
                {WEEKDAYS.map((day) => (
                  <p
                    key={day}
                    className="px-1 py-3 text-center text-xs tracking-[0.16em] text-muted uppercase"
                  >
                    {day}
                  </p>
                ))}
              </div>
              <div className="grid grid-cols-7">
                {cells.map((cell) => {
                  const key = `${cell.year}-${String(cell.month + 1).padStart(2, "0")}-${String(cell.day).padStart(2, "0")}`;
                  const dayMeetings = meetingsByDay.get(key) ?? [];
                  const isToday = key === todayKey;
                  const inMonth = cell.month === month;

                  return (
                    <div
                      key={key}
                      className={`min-h-[88px] border-t border-r border-line px-1.5 py-2 [&:nth-child(7n)]:border-r-0 ${
                        inMonth ? "bg-cream-soft" : "bg-cream"
                      }`}
                    >
                      <p
                        className={`text-sm ${
                          isToday
                            ? "inline-flex h-7 w-7 items-center justify-center rounded-full bg-cta text-white"
                            : inMonth
                              ? "text-ink"
                              : "text-muted/60"
                        }`}
                      >
                        {cell.day}
                      </p>
                      <div className="mt-1 space-y-1">
                        {dayMeetings.slice(0, 2).map((meeting) => (
                          <p
                            key={meeting.id}
                            className="truncate rounded-sm bg-sidebar/10 px-1.5 py-0.5 text-[11px] leading-4 text-ink"
                            title={meeting.title}
                          >
                            {meeting.title}
                          </p>
                        ))}
                        {dayMeetings.length > 2 ? (
                          <p className="text-[11px] text-muted">
                            +{dayMeetings.length - 2} more
                          </p>
                        ) : null}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-cream-soft p-6 xl:sticky xl:top-8">
          <p className="text-xs font-medium tracking-[0.22em] text-accent uppercase">
            Meetings
          </p>
          <h2 className="mt-2 font-serif text-3xl text-ink">Upcoming</h2>
          {upcomingByDay.length === 0 ? (
            <p className="mt-6 text-lg leading-8 text-muted">
              No upcoming meetings.
            </p>
          ) : (
            <div className="mt-6 max-h-[640px] space-y-7 overflow-y-auto pr-1">
              {upcomingByDay.map((group) => (
                <div key={group.key}>
                  <p className="text-xs tracking-[0.16em] text-muted uppercase">
                    {group.label}
                  </p>
                  <div className="mt-3 space-y-4">
                    {group.items.map((meeting) => {
                      const startsAt = new Date(meeting.startsAt);
                      const endsAt = meeting.endsAt
                        ? new Date(meeting.endsAt)
                        : null;
                      return (
                        <div key={meeting.id}>
                          <p className="text-sm text-ink">
                            {formatMeetingRange(startsAt, endsAt)}
                          </p>
                          <h3 className="mt-1 font-serif text-xl leading-snug text-ink">
                            {meeting.title}
                          </h3>
                          {meeting.location ? (
                            <p className="mt-1 text-sm text-muted">
                              {meeting.location}
                            </p>
                          ) : null}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </section>
  );
}

function monthCells(year: number, month: number) {
  const first = new Date(Date.UTC(year, month, 1));
  const startOffset = first.getUTCDay();
  const start = new Date(Date.UTC(year, month, 1 - startOffset));
  const cells = [];

  for (let index = 0; index < 42; index += 1) {
    const date = new Date(start);
    date.setUTCDate(start.getUTCDate() + index);
    cells.push({
      year: date.getUTCFullYear(),
      month: date.getUTCMonth(),
      day: date.getUTCDate(),
    });
  }

  return cells;
}
