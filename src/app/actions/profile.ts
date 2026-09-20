"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Prisma } from "@prisma/client";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

function readString(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function parseDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return null;
  }

  const date = new Date(`${value}T00:00:00.000Z`);
  return Number.isNaN(date.getTime()) ? null : date;
}

async function requireCurrentUser() {
  const session = await auth();
  const email = session?.user?.email;

  if (!email) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    redirect("/login");
  }

  return user;
}

export async function addSkill(formData: FormData) {
  const user = await requireCurrentUser();
  const name = readString(formData, "name");

  if (!name) {
    return;
  }

  try {
    await prisma.userSkill.create({
      data: { userId: user.id, name },
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      revalidatePath("/profile");
      return;
    }
    throw error;
  }

  revalidatePath("/profile");
}

export async function removeSkill(formData: FormData) {
  const user = await requireCurrentUser();
  const id = readString(formData, "id");

  if (!id) {
    return;
  }

  await prisma.userSkill.deleteMany({
    where: { id, userId: user.id },
  });

  revalidatePath("/profile");
}

export async function addVolunteerProgram(formData: FormData) {
  const user = await requireCurrentUser();
  const title = readString(formData, "title");
  const volunteeredOn = parseDate(readString(formData, "volunteeredOn"));

  if (!title || !volunteeredOn) {
    return;
  }

  await prisma.volunteerProgram.create({
    data: {
      userId: user.id,
      title,
      volunteeredOn,
    },
  });

  revalidatePath("/profile");
}

export async function removeVolunteerProgram(formData: FormData) {
  const user = await requireCurrentUser();
  const id = readString(formData, "id");

  if (!id) {
    return;
  }

  await prisma.volunteerProgram.deleteMany({
    where: { id, userId: user.id },
  });

  revalidatePath("/profile");
}
