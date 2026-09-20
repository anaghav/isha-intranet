"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
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

export async function createYantraCare(formData: FormData) {
  const title = readString(formData, "title");
  const description = readString(formData, "description");
  const location = readString(formData, "location");
  const fromDate = parseDate(readString(formData, "fromDate"));
  const toDate = parseDate(readString(formData, "toDate"));
  const ownerName = readString(formData, "ownerName");
  const ownerEmail = readString(formData, "ownerEmail");
  const ownerPhone = readString(formData, "ownerPhone");

  if (
    !title ||
    !description ||
    !location ||
    !fromDate ||
    !toDate ||
    toDate < fromDate ||
    !ownerName ||
    !ownerEmail.includes("@") ||
    !ownerPhone
  ) {
    throw new Error("Please fill every required field with a valid value.");
  }

  const request = await prisma.yantraCare.create({
    data: {
      title,
      description,
      location,
      fromDate,
      toDate,
      ownerName,
      ownerEmail,
      ownerPhone,
    },
  });

  revalidatePath("/yantra-care");
  redirect(`/yantra-care/${request.id}`);
}