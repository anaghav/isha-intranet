import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const listings = [
  {
    title: "Hero cycle, 21 gear",
    description: "Used around IYC for two years. Good brakes, new tube last month.",
    priceInr: 4500,
    category: "Bicycle",
    condition: "Good",
    sellerName: "Meera",
    sellerEmail: "meera@sadhguru.org",
    sellerPhone: "9876500001",
    imageUrl:
      "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=1200&q=80",
  },
  {
    title: "Honda Activa 5G",
    description: "2019 model, single owner, recently serviced. Papers ready.",
    priceInr: 42000,
    category: "Other",
    condition: "Good",
    sellerName: "Ravi",
    sellerEmail: "ravi@sadhguru.org",
    sellerPhone: "9876500002",
    imageUrl:
      "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=1200&q=80",
  },
  {
    title: "Revolt RV400 e-bike",
    description: "Low mileage, home charger included. Ideal for Coimbatore city rides.",
    priceInr: 95000,
    category: "E-bike",
    condition: "Like new",
    sellerName: "Priya",
    sellerEmail: "priya@sadhguru-ext.org",
    sellerPhone: "9876500003",
    imageUrl:
      "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=1200&q=80",
  },
  {
    title: "Maruti Swift VXI",
    description: "2016, petrol, 68,000 km. Insurance till next March.",
    priceInr: 385000,
    category: "Car",
    condition: "Good",
    sellerName: "Arun",
    sellerEmail: "arun@sadhguru.org",
    sellerPhone: "9876500004",
    imageUrl:
      "https://images.unsplash.com/photo-1549924231-f129b911e442?w=1200&q=80",
  },
  {
    title: "Teak study table",
    description: "Solid wood, 4x2 ft, a few marks. Pickup from Foothills.",
    priceInr: 2800,
    category: "Furniture",
    condition: "Fair",
    sellerName: "Lakshmi",
    sellerEmail: "lakshmi@sadhguru.org",
    sellerPhone: "9876500005",
    imageUrl:
      "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=1200&q=80",
  },
  {
    title: "Single cot with mattress",
    description: "Metal frame, clean mattress. Moving out next week.",
    priceInr: 3500,
    category: "Furniture",
    condition: "Good",
    sellerName: "Karthik",
    sellerEmail: "karthik@sadhguru-ext.org",
    sellerPhone: "9876500006",
    imageUrl:
      "https://images.unsplash.com/photo-1505693416388-bd47cf27c1e2?w=1200&q=80",
  },
  {
    title: "Dell Latitude laptop",
    description: "i5, 16 GB RAM, 256 GB SSD. Charger included.",
    priceInr: 22000,
    category: "Electronics",
    condition: "Good",
    sellerName: "Sneha",
    sellerEmail: "sneha@sadhguru.org",
    sellerPhone: "9876500007",
    imageUrl:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1200&q=80",
  },
  {
    title: "Mixer grinder",
    description: "Prestige, three jars, barely used.",
    priceInr: 1800,
    category: "Electronics",
    condition: "Like new",
    sellerName: "Anand",
    sellerEmail: "anand@sadhguru.org",
    sellerPhone: "9876500008",
    imageUrl:
      "https://images.unsplash.com/photo-1585515320310-259814833e62?w=1200&q=80",
  },
  {
    title: "Kids bicycle, 16 inch",
    description: "Training wheels can be removed. Suitable for 4–6 years.",
    priceInr: 2200,
    category: "Bicycle",
    condition: "Good",
    sellerName: "Divya",
    sellerEmail: "divya@sadhguru.org",
    sellerPhone: "9876500009",
    imageUrl:
      "https://images.unsplash.com/photo-1517649763962-0c623066027b?w=1200&q=80",
  },
  {
    title: "Stainless steel utensils set",
    description: "Plates, bowls, and tumblers for four. Packed and ready.",
    priceInr: 900,
    category: "Other",
    condition: "New",
    sellerName: "Naveen",
    sellerEmail: "naveen@sadhguru-ext.org",
    sellerPhone: "9876500010",
    imageUrl:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80",
    status: "available",
  },
];

const created = await prisma.listing.createMany({ data: listings });
const count = await prisma.listing.count();
console.log(`Inserted ${created.count}. Listing table now has ${count} rows.`);
await prisma.$disconnect();
