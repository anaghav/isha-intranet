"use client";

import { useRef } from "react";
import { updateProfilePhoto } from "@/app/actions/profile";

type ProfilePhotoCardProps = {
  name: string;
  initials: string;
  imageUrl: string | null;
};

export function ProfilePhotoCard({
  name,
  initials,
  imageUrl,
}: ProfilePhotoCardProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <article className="flex flex-col items-center rounded-2xl bg-cream-soft p-8 xl:col-span-3">
      <form action={updateProfilePhoto} className="flex w-full flex-col items-center">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="relative h-40 w-40 overflow-hidden rounded-full bg-sidebar"
          aria-label={imageUrl ? "Change profile picture" : "Upload profile picture"}
        >
          {imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imageUrl}
              alt={name}
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="flex h-full w-full items-center justify-center font-serif text-5xl text-cream-soft">
              {initials || "I"}
            </span>
          )}
        </button>
        <input
          ref={inputRef}
          name="photo"
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          className="sr-only"
          onChange={(event) => {
            if (event.currentTarget.files?.length) {
              event.currentTarget.form?.requestSubmit();
            }
          }}
        />
        <p className="mt-5 text-sm text-muted">
          {imageUrl ? "Change photo" : "Upload photo"}
        </p>
      </form>
    </article>
  );
}
