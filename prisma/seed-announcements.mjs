import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const announcements = [
  {
    title: "Guru Purnima",
    category: "Featured",
    eventDate: new Date("2026-07-29T00:00:00.000Z"),
    imageUrl:
      "https://static.sadhguru.org/d/46272/1652128648-guru-purnima-2019-1.jpg",
    sourceUrl: "https://isha.sadhguru.org/in/en/events/guru-purnima",
    summary:
      "Seva call for Guru Purnima at Isha Yoga Centre. Ushers, water stations, and seating volunteers — briefing the evening before.",
  },
  {
    title: "Monthly Events",
    category: "Monthly",
    imageUrl:
      "https://static.sadhguru.org/d/46272/1651457816-monthly-events.jpg",
    sourceUrl: "https://isha.sadhguru.org/in/en/events/monthly",
    summary:
      "Pournami, Amavasya, Maha Aarti, and monthly satsang. Rotating seva slots go up on the board each moon cycle.",
  },
  {
    title: "Annual Events",
    category: "Annual",
    imageUrl:
      "https://static.sadhguru.org/d/46272/1651955234-annual-event.jpg",
    sourceUrl: "https://isha.sadhguru.org/in/en/events/annual",
    summary:
      "Mahashivratri, Navratri, Yaksha, and Yoga Day. Large volunteer teams — put your name down early if you can stay on campus.",
  },
  {
    title: "Special Events",
    category: "Special",
    imageUrl:
      "https://static.sadhguru.org/d/46272/1651228035-iso-special-event.jpg",
    sourceUrl: "https://isha.sadhguru.org/in/en/events/special-events",
    summary:
      "Talks, darshans, and one-off gatherings with Sadhguru. Extra hands needed at registration and visitor care.",
  },
  {
    title: "Pancha Bhuta Kriya",
    category: "Monthly",
    eventDate: new Date("2026-10-12T00:00:00.000Z"),
    imageUrl:
      "https://static.sadhguru.org/d/46272/1651457816-monthly-events.jpg",
    sourceUrl: "https://isha.sadhguru.org/in/en/events",
    summary:
      "Support for the monthly Pancha Bhuta Kriya at IYC. Quiet crowd care and shoe-counter help.",
  },
  {
    title: "Mahashivratri",
    category: "Annual",
    eventDate: new Date("2026-02-15T00:00:00.000Z"),
    imageUrl:
      "https://static.sadhguru.org/d/46272/1651955234-annual-event.jpg",
    sourceUrl: "https://isha.sadhguru.org/in/en/events",
    summary:
      "Night-long seva at Isha Yoga Centre. Kitchen, transport, and medical tent still need people.",
  },
  {
    title: "International Day of Yoga",
    category: "Annual",
    eventDate: new Date("2026-06-21T00:00:00.000Z"),
    imageUrl:
      "https://static.sadhguru.org/d/46272/1650272081-website-thumbnail-yogameditation-suryakriya.jpg",
    sourceUrl: "https://isha.sadhguru.org/in/en/events",
    summary:
      "Registration and ground volunteers for Yoga Day. Tamil or English at the desk is useful.",
  },
  {
    title: "Linga Bhairavi at Salem",
    category: "Special",
    eventDate: new Date("2026-11-08T00:00:00.000Z"),
    imageUrl:
      "https://static.sadhguru.org/d/46272/1651661570-lb-salem-temple-thumb.jpg",
    sourceUrl: "https://isha.sadhguru.org/in/en/events/special-events",
    summary:
      "Travel seva to Salem. Drivers and visitor-care volunteers, two-day trip.",
  },
  {
    title: "Saptarishi Avahanam",
    category: "Special",
    eventDate: new Date("2026-12-01T00:00:00.000Z"),
    imageUrl:
      "https://static.sadhguru.org/d/46272/1651320397-dls2021_saptrishiaratilandingpage_thumb_v1.jpg",
    sourceUrl: "https://isha.sadhguru.org/in/en/events/special-events",
    summary:
      "Evening gathering at Dhyanalinga. Ushers and water seva; arrive an hour early.",
  },
  {
    title: "In Conversation with the Mystic",
    category: "Special",
    eventDate: new Date("2026-10-28T00:00:00.000Z"),
    imageUrl:
      "https://static.sadhguru.org/d/46272/1650521169-emd20_iso-banner-inconversationwiththemystic_thumbnail.jpg",
    sourceUrl: "https://isha.sadhguru.org/in/en/events/special-events",
    summary:
      "Hall seating and overflow screens. Calm presence needed at the doors.",
  },
];

await prisma.announcement.deleteMany();
await prisma.announcement.createMany({ data: announcements });
const count = await prisma.announcement.count();
console.log(`Announcements: ${count}`);
await prisma.$disconnect();
