import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const requests = [
  {
    title: "Linga Bhairavi Yantra",
    location: "Isha Yoga Centre, volunteer quarters",
    fromDate: new Date("2026-09-22T00:00:00.000Z"),
    toDate: new Date("2026-10-05T00:00:00.000Z"),
    ownerName: "Meera",
    ownerEmail: "meera@sadhguru.org",
    ownerPhone: "9876500201",
    description:
      "Daily care while I am at a program. Morning abhishekam if you can, otherwise just keep the space clean and the lamp lit in the evening.",
  },
  {
    title: "Home yantra, copper",
    location: "Isha Foothills, Lane 2",
    fromDate: new Date("2026-10-01T00:00:00.000Z"),
    toDate: new Date("2026-10-15T00:00:00.000Z"),
    ownerName: "Ravi",
    ownerEmail: "ravi@sadhguru.org",
    ownerPhone: "9876500202",
    description:
      "Small copper yantra on the altar. Need someone nearby who can come in once a day. Key can be left with the neighbour.",
  },
  {
    title: "Sannidhi in apartment",
    location: "Green Gardens, Ikkarai Boluvampatti",
    fromDate: new Date("2026-10-10T00:00:00.000Z"),
    toDate: new Date("2026-10-20T00:00:00.000Z"),
    ownerName: "Priya",
    ownerEmail: "priya@sadhguru-ext.org",
    ownerPhone: "9876500203",
    description:
      "Sannidhi in the living room. Water the tulsi, keep the space quiet. Stay overnight if you prefer — extra bed is there.",
  },
  {
    title: "Devi yantra",
    location: "Thondamuthur, near the school",
    fromDate: new Date("2026-09-25T00:00:00.000Z"),
    toDate: new Date("2026-10-02T00:00:00.000Z"),
    ownerName: "Lakshmi",
    ownerEmail: "lakshmi@sadhguru.org",
    ownerPhone: "9876500204",
    description:
      "Travelling for a week. Simple daily care, no special process. Family in the house next door can let you in.",
  },
  {
    title: "Guru Pooja yantra",
    location: "Perur main road, Coimbatore",
    fromDate: new Date("2026-11-05T00:00:00.000Z"),
    toDate: new Date("2026-11-20T00:00:00.000Z"),
    ownerName: "Anand",
    ownerEmail: "anand@sadhguru.org",
    ownerPhone: "9876500205",
    description:
      "Away for two weeks. Please do the usual morning offering if you are comfortable, otherwise just keep the altar clean.",
  },
  {
    title: "Linga Bhairavi Yantra at home",
    location: "Alandurai",
    fromDate: new Date("2026-10-03T00:00:00.000Z"),
    toDate: new Date("2026-10-12T00:00:00.000Z"),
    ownerName: "Divya",
    ownerEmail: "divya@sadhguru.org",
    ownerPhone: "9876500206",
    description:
      "Need someone with their own vehicle. House is quiet. Instructions are written next to the altar.",
  },
  {
    title: "Two yantras, shared house",
    location: "Isha Foothills, behind the bakery",
    fromDate: new Date("2026-10-08T00:00:00.000Z"),
    toDate: new Date("2026-10-18T00:00:00.000Z"),
    ownerName: "Karthik",
    ownerEmail: "karthik@sadhguru-ext.org",
    ownerPhone: "9876500207",
    description:
      "Housemates are also travelling. Two small yantras in one room. Daily lamp is enough. Water can is filled.",
  },
  {
    title: "Sannidhi during program",
    location: "Isha Yoga Centre",
    fromDate: new Date("2026-12-01T00:00:00.000Z"),
    toDate: new Date("2026-12-10T00:00:00.000Z"),
    ownerName: "Sneha",
    ownerEmail: "sneha@sadhguru.org",
    ownerPhone: "9876500208",
    description:
      "In ashram quarters while I am on a 10-day program. Someone staying on campus is ideal.",
  },
  {
    title: "Home altar yantra",
    location: "Shop street, Isha Foothills",
    fromDate: new Date("2026-09-20T00:00:00.000Z"),
    toDate: new Date("2026-09-28T00:00:00.000Z"),
    ownerName: "Arun",
    ownerEmail: "arun@sadhguru.org",
    ownerPhone: "9876500209",
    description:
      "Short trip. Please drop in every evening. Parking for a two-wheeler in front of the shop.",
  },
  {
    title: "Family yantra, standalone house",
    location: "Near Alandurai, Coimbatore",
    fromDate: new Date("2026-10-15T00:00:00.000Z"),
    toDate: new Date("2026-10-30T00:00:00.000Z"),
    ownerName: "Naveen",
    ownerEmail: "naveen@sadhguru-ext.org",
    ownerPhone: "9876500210",
    description:
      "Whole family travelling. Garden tap works, well water. Stay in the house if that is easier — one bedroom is free.",
  },
];

const created = await prisma.yantraCare.createMany({ data: requests });
const count = await prisma.yantraCare.count();
console.log(`Inserted ${created.count}. YantraCare table now has ${count} rows.`);
await prisma.$disconnect();
