import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const sampleSkills = [
  "Cooking",
  "First aid",
  "Driving",
  "Tamil",
  "Visitor care",
];

const samplePrograms = [
  {
    title: "Mahashivratri",
    volunteeredOn: new Date("2026-02-15T00:00:00.000Z"),
  },
  {
    title: "Guru Purnima",
    volunteeredOn: new Date("2025-07-10T00:00:00.000Z"),
  },
  {
    title: "International Day of Yoga",
    volunteeredOn: new Date("2025-06-21T00:00:00.000Z"),
  },
  {
    title: "Visitor seva week",
    volunteeredOn: new Date("2025-11-12T00:00:00.000Z"),
  },
];

const users = await prisma.user.findMany({ select: { id: true, email: true } });

for (const user of users) {
  const [skillCount, programCount] = await Promise.all([
    prisma.userSkill.count({ where: { userId: user.id } }),
    prisma.volunteerProgram.count({ where: { userId: user.id } }),
  ]);

  if (skillCount === 0) {
    await prisma.userSkill.createMany({
      data: sampleSkills.map((name) => ({ userId: user.id, name })),
    });
  }

  if (programCount === 0) {
    await prisma.volunteerProgram.createMany({
      data: samplePrograms.map((program) => ({
        userId: user.id,
        title: program.title,
        volunteeredOn: program.volunteeredOn,
      })),
    });
  }
}

console.log(`Updated profile sample data for ${users.length} user(s).`);
await prisma.$disconnect();
