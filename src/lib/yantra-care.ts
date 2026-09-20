export function formatCareDate(date: Date) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

export function formatCareRange(fromDate: Date, toDate: Date) {
  return `${formatCareDate(fromDate)} – ${formatCareDate(toDate)}`;
}