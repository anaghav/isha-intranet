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

export type DashboardProgram = {
  id: string;
  title: string;
  location: string;
  completedOn: string;
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
  programs: DashboardProgram[];
  recommendations: DashboardRecommendation[];
};

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function DashboardBoard({
  meetings,
  programs,
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

  const upcoming = meetings
    .filter((meeting) => new Date(meeting.startsAt) >= upcomingStart)
    .sort(
      (a, b) =>
        new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime(),
    );

  function shiftMonth(delta: number) {
    const next = new Date(Date.UTC(year, month + delta, 1));
    setYear(next.getUTCFullYear());
    setMonth(next.getUTCMonth());
  }

  return (
    <section className="mx-auto w-full max-w-5xl space-y-14">
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
        <h2 className="mt-2 font-serif text-3xl text-ink">Programs to offer seva</h2>
        <p className="mt-3 text-muted">
          Picked from the upcoming offerings using your skills and programs
          volunteered for.
        </p>
        {recommendations.length === 0 ? (
          <p className="mt-6 text-lg leading-8 text-muted">
            Add skills and seva history on Profile to get recommendations.
          </p>
        ) : (
          <div className="mt-6">
            {recommendations.map((item) => (
              <article
                key={item.id}
                className="border-b border-line py-5 first:pt-0 last:border-b-0"
              >
                <p className="text-xs tracking-[0.16em] text-muted uppercase">
                  {formatProgramDate(new Date(item.startsOn))}
                  {item.location ? ` · ${item.location}` : ""}
                </p>
                <h3 className="mt-1 font-serif text-2xl leading-snug text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 text-[15px] leading-7 text-ink">{item.why}</p>
                <p className="mt-2 text-sm text-muted">{item.description}</p>
                {item.neededSkills.length > 0 ? (
                  <p className="mt-2 text-xs tracking-[0.08em] text-muted uppercase">
                    {item.neededSkills.join(" · ")}
                  </p>
                ) : null}
              </article>
            ))}
          </div>
        )}
      </section>

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
          <div className="min-w-[640px] rounded-sm border border-line bg-cream-soft">
            <div className="grid grid-cols-7 border-b border-line">
              {WEEKDAYS.map((day) => (
                <p
                  key={day}
                  className="px-2 py-3 text-center text-xs tracking-[0.16em] text-muted uppercase"
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
                    className={`min-h-[108px] border-t border-r border-line px-2 py-2 [&:nth-child(7n)]:border-r-0 ${
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

      <section>
        <p className="text-xs font-medium tracking-[0.22em] text-accent uppercase">
          Meetings
        </p>
        <h2 className="mt-2 font-serif text-3xl text-ink">Upcoming</h2>
        {upcoming.length === 0 ? (
          <p className="mt-6 text-lg leading-8 text-muted">
            No upcoming meetings.
          </p>
        ) : (
          <div className="mt-6">
            {upcoming.map((meeting) => {
              const startsAt = new Date(meeting.startsAt);
              const endsAt = meeting.endsAt ? new Date(meeting.endsAt) : null;
              return (
                <article
                  key={meeting.id}
                  className="border-b border-line py-5 first:pt-0 last:border-b-0"
                >
                  <p className="text-xs tracking-[0.16em] text-muted uppercase">
                    {formatMeetingDay(startsAt)}
                  </p>
                  <h3 className="mt-1 font-serif text-2xl leading-snug text-ink">
                    {meeting.title}
                  </h3>
                  <p className="mt-2 text-[15px] text-ink">
                    {formatMeetingRange(startsAt, endsAt)}
                  </p>
                  {meeting.location ? (
                    <p className="mt-1 text-sm text-muted">{meeting.location}</p>
                  ) : null}
                </article>
              );
            })}
          </div>
        )}
      </section>

      <section>
        <p className="text-xs font-medium tracking-[0.22em] text-accent uppercase">
          Programs
        </p>
        <h2 className="mt-2 font-serif text-3xl text-ink">
          Completed so far
        </h2>
        {programs.length === 0 ? (
          <p className="mt-6 text-lg leading-8 text-muted">
            No completed programs yet.
          </p>
        ) : (
          <div className="mt-6">
            {programs.map((program) => (
              <article
                key={program.id}
                className="border-b border-line py-5 first:pt-0 last:border-b-0"
              >
                <h3 className="font-serif text-2xl leading-snug text-ink">
                  {program.title}
                </h3>
                <p className="mt-2 text-[15px] text-ink">
                  {formatProgramDate(new Date(program.completedOn))}
                </p>
                {program.location ? (
                  <p className="mt-1 text-sm text-muted">{program.location}</p>
                ) : null}
              </article>
            ))}
          </div>
        )}
      </section>
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