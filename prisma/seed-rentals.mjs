import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const rentals = [
  {
    title: "Quiet 1 BHK near Foothills gate",
    type: "1 BHK apartment",
    address: "Lane 3, Isha Foothills, Coimbatore",
    distanceKm: 1.2,
    rentInr: 8500,
    ownerName: "Meera",
    ownerEmail: "meera@sadhguru.org",
    ownerPhone: "9876500101",
    imageUrl:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80",
    description:
      "One bedroom, hall, kitchen. Borewell water, inverter, two-wheeler parking. Suitable for a single volunteer or couple. No broker.",
  },
  {
    title: "2 BHK apartment, Ikkarai",
    type: "2 BHK apartment",
    address: "Green Gardens, Ikkarai Boluvampatti, Coimbatore",
    distanceKm: 4.5,
    rentInr: 14000,
    ownerName: "Ravi",
    ownerEmail: "ravi@sadhguru.org",
    ownerPhone: "9876500102",
    imageUrl:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=80",
    description:
      "Two bedrooms, balcony, modular kitchen. 24x7 water, covered car park, first floor. Family preferred. Available immediately.",
  },
  {
    title: "3 BHK for sharing, Thondamuthur road",
    type: "3 BHK apartment",
    address: "Sri Sai Apts, Thondamuthur Main Road, Coimbatore",
    distanceKm: 8,
    rentInr: 22000,
    ownerName: "Priya",
    ownerEmail: "priya@sadhguru-ext.org",
    ownerPhone: "9876500103",
    imageUrl:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80",
    description:
      "Three bedrooms, two baths, lift, generator. Semi-furnished with cots and fridge. Can be shared by volunteers.",
  },
  {
    title: "Standalone house with garden",
    type: "Standalone house",
    address: "Near Alandurai, Coimbatore",
    distanceKm: 11,
    rentInr: 18000,
    ownerName: "Arun",
    ownerEmail: "arun@sadhguru.org",
    ownerPhone: "9876500104",
    imageUrl:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1200&q=80",
    description:
      "Independent house, two bedrooms, sit-out, small garden. Well water, parking for a car. Pets okay if kept outside.",
  },
  {
    title: "Ladies PG, two sharing",
    type: "PG",
    address: "Isha Foothills, behind the bakery",
    distanceKm: 0.8,
    rentInr: 5500,
    ownerName: "Lakshmi",
    ownerEmail: "lakshmi@sadhguru.org",
    ownerPhone: "9876500105",
    imageUrl:
      "https://images.unsplash.com/photo-1554995207-c18c203853cb?w=1200&q=80",
    description:
      "Two sharing room, attached bath, meals optional. Wi-Fi, washing machine, drinking water. Only women. Rent per person.",
  },
  {
    title: "Gents PG near bus stop",
    type: "PG",
    address: "Foothills main road, Coimbatore",
    distanceKm: 1.5,
    rentInr: 4500,
    ownerName: "Karthik",
    ownerEmail: "karthik@sadhguru-ext.org",
    ownerPhone: "9876500106",
    imageUrl:
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1200&q=80",
    description:
      "Three sharing, common bath, cot and cupboard given. Walking distance to IYC bus. Rent per person, electricity extra.",
  },
  {
    title: "1 BHK above shops, Foothills",
    type: "1 BHK apartment",
    address: "Shop street, Isha Foothills",
    distanceKm: 1,
    rentInr: 7000,
    ownerName: "Sneha",
    ownerEmail: "sneha@sadhguru.org",
    ownerPhone: "9876500107",
    imageUrl:
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1200&q=80",
    description:
      "Compact 1 BHK, good light, loft storage. Two-wheeler parking on street. Water morning and evening.",
  },
  {
    title: "2 BHK, newly painted",
    type: "2 BHK apartment",
    address: "Perur main road, Coimbatore",
    distanceKm: 14,
    rentInr: 12500,
    ownerName: "Anand",
    ownerEmail: "anand@sadhguru.org",
    ownerPhone: "9876500108",
    imageUrl:
      "https://images.unsplash.com/photo-1502005097973-6a7082348e28?w=1200&q=80",
    description:
      "Second floor, two balconies, bore + corporation water. Cupboards in both rooms. 11 month agreement.",
  },
  {
    title: "Farm stay room, others",
    type: "Others",
    address: "Towards Velliangiri, past Alandurai",
    distanceKm: 9,
    rentInr: 6000,
    ownerName: "Divya",
    ownerEmail: "divya@sadhguru.org",
    ownerPhone: "9876500109",
    imageUrl:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1200&q=80",
    description:
      "Single room on a small farm, attached bath, kitchenette. Very quiet. Own vehicle needed. Suitable for one person.",
  },
  {
    title: "Family house near school",
    type: "Standalone house",
    address: "Thondamuthur, next to the government school",
    distanceKm: 7.5,
    rentInr: 16000,
    ownerName: "Naveen",
    ownerEmail: "naveen@sadhguru-ext.org",
    ownerPhone: "9876500110",
    imageUrl:
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1200&q=80",
    description:
      "Two bedroom independent house, portico, backyard. Power backup for lights and fan. Family or long-term volunteers.",
  },
];

const created = await prisma.rental.createMany({ data: rentals });
const count = await prisma.rental.count();
console.log(`Inserted ${created.count}. Rental table now has ${count} rows.`);
await prisma.$disconnect();
