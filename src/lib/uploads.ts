import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

const MAX_FILES = 8;
const MAX_BYTES = 5 * 1024 * 1024;

function extensionFor(type: string, originalName: string) {
  const fromName = path.extname(originalName).toLowerCase();
  if (fromName === ".jpg" || fromName === ".jpeg" || fromName === ".png" || fromName === ".webp" || fromName === ".gif") {
    return fromName;
  }
  if (type === "image/jpeg") return ".jpg";
  if (type === "image/png") return ".png";
  if (type === "image/webp") return ".webp";
  return ".gif";
}

export async function saveUploadedPhotos(
  folder: "listings" | "rentals",
  id: string,
  formData: FormData,
) {
  const incoming = formData
    .getAll("photos")
    .filter((value): value is File => value instanceof File && value.size > 0);

  if (incoming.length > MAX_FILES) {
    throw new Error(`You can upload up to ${MAX_FILES} photos.`);
  }

  const directory = path.join(process.cwd(), "public", "uploads", folder, id);
  await mkdir(directory, { recursive: true });

  const paths: string[] = [];

  for (const [index, file] of incoming.entries()) {
    if (!ALLOWED_TYPES.has(file.type) || file.size > MAX_BYTES) {
      throw new Error("Photos must be JPG, PNG, WEBP, or GIF and under 5 MB each.");
    }

    const filename = `${index + 1}${extensionFor(file.type, file.name)}`;
    await writeFile(path.join(directory, filename), Buffer.from(await file.arrayBuffer()));
    paths.push(`/uploads/${folder}/${id}/${filename}`);
  }

  return paths;
}

export function saveListingPhotos(listingId: string, formData: FormData) {
  return saveUploadedPhotos("listings", listingId, formData);
}

export function saveRentalPhotos(rentalId: string, formData: FormData) {
  return saveUploadedPhotos("rentals", rentalId, formData);
}
