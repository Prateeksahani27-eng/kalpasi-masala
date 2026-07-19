"use client";

import Image from "next/image";
import { useState } from "react";
import type { ProductGalleryImage } from "@/lib/products";
import { cn } from "@/lib/utils";

export function ProductGallery({ images }: { images: ProductGalleryImage[] }) {
  const [active, setActive] = useState(0);
  const current = images[active] ?? images[0];

  if (!current) return null;

  const darkPack = current.src.includes("chicken") || current.src.includes("black-pepper");

  return (
    <div>
      <div
        className={cn(
          "relative aspect-[4/5] w-full overflow-hidden rounded-2xl sm:rounded-3xl",
          darkPack ? "bg-black ring-1 ring-white/10" : "bg-white ring-1 ring-sand/80"
        )}
      >
        <Image
          src={current.src}
          alt={current.alt}
          fill
          unoptimized
          className="object-contain p-6 sm:p-10"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
        <span className="absolute bottom-4 left-4 rounded-full bg-espresso/80 px-3 py-1 text-[10px] uppercase tracking-widest text-linen backdrop-blur-sm">
          {current.label}
        </span>
      </div>
      {images.length > 1 ? (
        <div
          className={cn(
            "mt-4 grid gap-2 sm:gap-3",
            images.length <= 2 ? "grid-cols-2" : "grid-cols-4"
          )}
        >
          {images.map((img, i) => (
            <button
              key={`${img.label}-${i}`}
              type="button"
              onClick={() => setActive(i)}
              className={cn(
                "relative aspect-square overflow-hidden rounded-lg border transition-premium sm:rounded-xl",
                i === active
                  ? "border-terracotta ring-2 ring-terracotta/30"
                  : "border-sand hover:border-terracotta/40"
              )}
              aria-label={`View ${img.label}`}
              aria-pressed={i === active}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                unoptimized
                className="object-contain p-1"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
