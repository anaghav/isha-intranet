import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const offerings = [
  {
    title: "Kitchen seva, Mahashivratri",
    location: "Isha Yoga Centre",
    startsOn: new Date("2026-02-12T00:00:00.000Z"),
    neededSkills: ["Cooking", "Kitchen", "Prasad"],
    description:
      "Help prepare and serve meals for volunteers and visitors during Mahashivratri. Long hours, early start, lots of cooking.",
  },
  {
    title: "Visitor care desk",
    location: "Reception, Isha Yoga Centre",
    startsOn: new Date("2026-10-05T00:00:00.000Z"),
    neededSkills: ["Visitor care", "Tamil", "English"],
    description:
      "Welcome guests, answer directions, and keep the reception calm. Tamil or English helps a lot.",
  },
  {
    title: "Medical camp support",
    location: "Isha Foothills",
    startsOn: new Date("2026-10-18T00:00:00.000Z"),
    neededSkills: ["First aid", "Medical"],
    description:
      "Support the first-aid tent: crowd flow, basic care, and fetching supplies for the medical team.",
  },
  {
    title: "Transport coordination",
    location: "Isha Foothills and IYC",
    startsOn: new Date("2026-10-08T00:00:00.000Z"),
    neededSkills: ["Driving", "Transport"],
    description:
      "Move volunteers and materials between Foothills and the yoga centre. Own two-wheeler or licence preferred.",
  },
  {
    title: "Guru Purnima ushering",
    location: "Adiyogi Alayam",
    startsOn: new Date("2026-07-29T00:00:00.000Z"),
    neededSkills: ["Visitor care", "Crowd care"],
    description:
      "Guide people to seating, keep aisles clear, and help elders during Guru Purnima.",
  },
  {
    title: "International Day of Yoga registration",
    location: "Isha Yoga Centre",
    startsOn: new Date("2026-06-21T00:00:00.000Z"),
    neededSkills: ["Registration", "English", "Tamil"],
    description:
      "Check people in, hand out tokens, and keep the queue moving for the Yoga Day gathering.",
  },
  {
    title: "Garden and farm seva",
    location: "Towards Velliangiri",
    startsOn: new Date("2026-10-22T00:00:00.000Z"),
    neededSkills: ["Gardening", "Outdoor"],
    description:
      "Morning work on the farm plots: watering, weeding, and packing produce for the kitchen.",
  },
  {
    title: "Children's program support",
    location: "Isha Yoga Centre",
    startsOn: new Date("2026-11-08T00:00:00.000Z"),
    neededSkills: ["Children", "Teaching", "First aid"],
    description:
      "Help with games, water, and safety for a children's outdoor session. First aid is a plus.",
  },
  {
    title: "Festival night lighting crew",
    location: "Ashram grounds",
    startsOn: new Date("2026-10-30T00:00:00.000Z"),
    neededSkills: ["Electrical", "Hands-on"],
    description:
      "Set up and take down lights and cables for an evening gathering. Practical, physical work.",
  },
  {
    title: "Translation and announcements",
    location: "Isha Yoga Centre",
    startsOn: new Date("2026-11-02T00:00:00.000Z"),
    neededSkills: ["Tamil", "English", "Translation"],
    description:
      "Help with bilingual announcements and simple translation at the information desk.",
  },
  {
    title: "Housing volunteers meet support",
    location: "Isha Foothills",
    startsOn: new Date("2026-10-11T00:00:00.000Z"),
    neededSkills: ["Visitor care", "Housing"],
    description:
      "Help new volunteers find rooms and answer Foothills housing questions.",
  },
  {
    title: "Satsang seating and water",
    location: "Isha Yoga Centre",
    startsOn: new Date("2026-10-15T00:00:00.000Z"),
    neededSkills: ["Visitor care", "Crowd care"],
    description:
      "Seat people before satsang and keep water stations filled. Calm, steady presence.",
  },
];

await prisma.programOffering.deleteMany();
await prisma.programOffering.createMany({ data: offerings });
const count = await prisma.programOffering.count();
console.log(`Program offerings: ${count}`);
await prisma.$disconnect();
