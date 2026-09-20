"use client";

import { useState } from "react";

export function PhotoUpload() {
  const [previews, setPreviews] = useState<string[]>([]);

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);
    setPreviews((current) => {
      current.forEach((url) => URL.revokeObjectURL(url));
      return files.map((file) => URL.createObjectURL(file));
    });
  }

  return (
    <label className="block text-sm text-muted">
      Photos
      <input
        name="photos"
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        multiple
        onChange={onChange}
        className="mt-1 block w-full text-[15px] text-ink file:mr-4 file:rounded-full file:border-0 file:bg-sidebar file:px-4 file:py-2 file:text-sm file:text-cream-soft"
      />
      <span className="mt-2 block text-xs text-muted">
        You can add up to 8 photos. JPG, PNG, WEBP, or GIF, 5 MB each.
      </span>
      {previews.length > 0 ? (
        <span className="mt-3 flex flex-wrap gap-2">
          {previews.map((src) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={src}
              src={src}
              alt=""
              className="h-20 w-20 rounded-sm object-cover"
            />
          ))}
        </span>
      ) : null}
    </label>
  );
}
