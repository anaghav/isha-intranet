type ListingGalleryProps = {
  photos: string[];
  sold: boolean;
};

export function ListingGallery({ photos, sold }: ListingGalleryProps) {
  if (photos.length === 0) {
    return (
      <div className="flex aspect-[16/9] items-center justify-center bg-cream-soft text-muted">
        No photo
      </div>
    );
  }

  return (
    <div>
      <div className="relative overflow-hidden bg-cream-soft">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photos[0]}
          alt=""
          className="aspect-[16/9] w-full object-cover"
        />
        {sold ? (
          <span className="absolute top-4 left-4 bg-sidebar px-3 py-1 text-xs tracking-wide text-cream-soft uppercase">
            Sold
          </span>
        ) : null}
      </div>
      {photos.length > 1 ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {photos.map((src) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={src}
              src={src}
              alt=""
              className="h-20 w-20 object-cover"
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
