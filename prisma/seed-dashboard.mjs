import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function ist(isoLocal) {
  return new Date(`${isoLocal}+05:30`);
}

const meetings = [
  {
    title: "Volunteer briefing",
    location: "Ashram office, Isha Yoga Centre",
    startsAt: ist("2026-09-19T10:00:00"),
    endsAt: ist("2026-09-19T11:00:00"),
  },
  {
    title: "Guru Pooja",
    location: "Isha Yoga Centre",
    startsAt: ist("2026-09-21T06:00:00"),
    endsAt: ist("2026-09-21T07:00:00"),
  },
  {
    title: "Department sync",
    location: "Meeting room, Adiyogi Alayam",
    startsAt: ist("2026-09-22T16:00:00"),
    endsAt: ist("2026-09-22T17:00:00"),
  },
  {
    title: "Housing volunteers meet",
    location: "Isha Foothills",
    startsAt: ist("2026-09-24T11:00:00"),
    endsAt: ist("2026-09-24T12:00:00"),
  },
  {
    title: "Yantra care orientation",
    location: "Volunteer quarters",
    startsAt: ist("2026-09-26T15:00:00"),
    endsAt: ist("2026-09-26T16:00:00"),
  },
  {
    title: "Monthly ashram meeting",
    location: "Ashram office, Isha Yoga Centre",
    startsAt: ist("2026-10-01T09:30:00"),
    endsAt: ist("2026-10-01T11:00:00"),
  },
  {
    title: "Program support briefing",
    location: "Isha Yoga Centre",
    startsAt: ist("2026-10-04T14:00:00"),
    endsAt: ist("2026-10-04T15:30:00"),
  },
  {
    title: "Visitor seva meeting",
    location: "Reception, Isha Yoga Centre",
    startsAt: ist("2026-10-08T10:00:00"),
    endsAt: ist("2026-10-08T11:00:00"),
  },
  {
    title: "Festival prep",
    location: "Ashram office",
    startsAt: ist("2026-10-12T16:30:00"),
    endsAt: ist("2026-10-12T18:00:00"),
  },
  {
    title: "Satsang briefing",
    location: "Isha Yoga Centre",
    startsAt: ist("2026-10-15T18:00:00"),
    endsAt: ist("2026-10-15T19:00:00"),
  },
];

const programs = [
  {
    title: "Inner Engineering",
    location: "Coimbatore",
    completedOn: new Date("2023-06-12T00:00:00.000Z"),
  },
  {
    title: "Inner Engineering Retreat",
    location: "Isha Yoga Centre",
    completedOn: new Date("2024-01-20T00:00:00.000Z"),
  },
  {
    title: "Bhava Spandana",
    location: "Isha Yoga Centre",
    completedOn: new Date("2024-08-18T00:00:00.000Z"),
  },
  {
    title: "Shoonya Intensive",
    location: "Isha Yoga Centre",
    completedOn: new Date("2025-02-10T00:00:00.000Z"),
  },
  {
    title: "Guru Pooja training",
    location: "Isha Yoga Centre",
    completedOn: new Date("2025-11-22T00:00:00.000Z"),
  },
];

const meetingCount = await prisma.meeting.createMany({ data: meetings });
const programCount = await prisma.completedProgram.createMany({ data: programs });
console.log(
  `Inserted ${meetingCount.count} meetings and ${programCount.count} programs.`,
);
await prisma.$disconnect();
