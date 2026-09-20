"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { LISTING_CATEGORIES, LISTING_CONDITIONS } from "@/lib/listings";
import { saveListingPhotos } from "@/lib/uploads";

function readString(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function isOneOf<T extends readonly string[]>(
  value: string,
  options: T,
): value is T[number] {
  return options.includes(value);
}

export async function createListing(formData: FormData) {
  const title = readString(formData, "title");
  const description = readString(formData, "description");
  const priceInr = Number(readString(formData, "priceInr"));
  const category = readString(formData, "category");
  const condition = readString(formData, "condition");
  const sellerName = readString(formData, "sellerName");
  const sellerEmail = readString(formData, "sellerEmail");
  const sellerPhone = readString(formData, "sellerPhone");

  if (
    !title ||
    !description ||
    !Number.isInteger(priceInr) ||
    priceInr < 0 ||
    !isOneOf(category, LISTING_CATEGORIES) ||
    !isOneOf(condition, LISTING_CONDITIONS) ||
    !sellerName ||
    !sellerEmail.includes("@")
  ) {
    throw new Error("Please fill every required field with a valid value.");
  }

  const listing = await prisma.listing.create({
    data: {
      title,
      description,
      priceInr,
      category,
      condition,
      sellerName,
      sellerEmail,
      sellerPhone: sellerPhone || null,
    },
  });

  const photoPaths = await saveListingPhotos(listing.id, formData);
  if (photoPaths.length > 0) {
    await prisma.listingImage.createMany({
      data: photoPaths.map((path, sortOrder) => ({
        listingId: listing.id,
        path,
        sortOrder,
      })),
    });
  }

  revalidatePath("/buy-sell");
  redirect(`/buy-sell/${listing.id}`);
}

export async function markListingSold(formData: FormData) {
  const id = readString(formData, "id");
  if (!id) {
    throw new Error("Listing is missing.");
  }

  await prisma.listing.update({
    where: { id },
    data: { status: "sold" },
  });

  revalidatePath("/buy-sell");
  revalidatePath(`/buy-sell/${id}`);

  if (readString(formData, "stay") === "1") {
    return;
  }

  redirect(`/buy-sell/${id}`);
}
