export const KOLKATA_TZ = "Asia/Kolkata";

export function dateKeyInKolkata(date: Date) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: KOLKATA_TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

export function formatMonthYear(year: number, month: number) {
  return new Intl.DateTimeFormat("en-IN", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month, 1)));
}

export function formatMeetingDay(date: Date) {
  return new Intl.DateTimeFormat("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    timeZone: KOLKATA_TZ,
  }).format(date);
}

export function formatMeetingTime(date: Date) {
  return new Intl.DateTimeFormat("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: KOLKATA_TZ,
  }).format(date);
}

export function formatMeetingRange(startsAt: Date, endsAt: Date | null) {
  const start = formatMeetingTime(startsAt);
  if (!endsAt) {
    return start;
  }
  return `${start} – ${formatMeetingTime(endsAt)}`;
}

export function formatProgramDate(date: Date) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

export function kolkataYearMonth(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: KOLKATA_TZ,
    year: "numeric",
    month: "2-digit",
  }).formatToParts(date);
  const year = Number(parts.find((part) => part.type === "year")?.value);
  const month = Number(parts.find((part) => part.type === "month")?.value) - 1;
  return { year, month };
}

export function todayKeyInKolkata(date = new Date()) {
  return dateKeyInKolkata(date);
}

export function startOfTodayInKolkata(date = new Date()) {
  const key = dateKeyInKolkata(date);
  return new Date(`${key}T00:00:00+05:30`);
}