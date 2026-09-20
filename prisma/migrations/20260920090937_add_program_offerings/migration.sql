-- CreateTable
CREATE TABLE "ProgramOffering" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "startsOn" DATE NOT NULL,
    "neededSkills" TEXT[],

    CONSTRAINT "ProgramOffering_pkey" PRIMARY KEY ("id")
);
