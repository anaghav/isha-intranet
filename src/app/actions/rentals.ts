"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { RENTAL_TYPES } from "@/lib/rentals";
import { saveRentalPhotos } from "@/lib/uploads";

function readString(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

export async function createRental(formData: FormData) {
  const title = readString(formData, "title");
  const description = readString(formData, "description");
  const type = readString(formData, "type");
  const address = readString(formData, "address");
  const distanceKm = Number(readString(formData, "distanceKm"));
  const rentInr = Number(readString(formData, "rentInr"));
  const ownerName = readString(formData, "ownerName");
  const ownerEmail = readString(formData, "ownerEmail");
  const ownerPhone = readString(formData, "ownerPhone");

  if (
    !title ||
    !description ||
    !RENTAL_TYPES.includes(type as (typeof RENTAL_TYPES)[number]) ||
    !address ||
    !Number.isFinite(distanceKm) ||
    distanceKm < 0 ||
    !Number.isInteger(rentInr) ||
    rentInr < 0 ||
    !ownerName ||
    !ownerEmail.includes("@") ||
    !ownerPhone
  ) {
    throw new Error("Please fill every required field with a valid value.");
  }

  const rental = await prisma.rental.create({
    data: {
      title,
      description,
      type,
      address,
      distanceKm,
      rentInr,
      ownerName,
      ownerEmail,
      ownerPhone,
    },
  });

  const photoPaths = await saveRentalPhotos(rental.id, formData);
  if (photoPaths.length > 0) {
    await prisma.rentalImage.createMany({
      data: photoPaths.map((path, sortOrder) => ({
        rentalId: rental.id,
        path,
        sortOrder,
      })),
    });
  }

  revalidatePath("/rent");
  redirect(`/rent/${rental.id}`);
}
