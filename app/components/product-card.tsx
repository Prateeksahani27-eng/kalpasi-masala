import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/app/components/reveal";

type ProductCardProps = {
  slug: string;
  name: string;
  note: string;
  description: string;
  image: string;
  imageFit?: "contain" | "cover";
  index?: number;
};

export function ProductCard({
  slug,
  name,
  note,
  description,
  image,
  imageFit = "cover",
  index = 0,
}: ProductCardProps) {
  const darkPack =
    slug === "black-pepper-powder" || slug === "chicken-masala";
  const brandedName = `Kalpasi ${name}`;

  return (
    <Reveal delay={index * 80}>
      <Link href={`/products/${slug}`} className="group flex flex-col">
        <article className="card-premium flex flex-col">
          <div
            className={`relative mx-auto aspect-[3/4] w-full max-w-[180px] overflow-hidden rounded-xl sm:max-w-[200px] md:max-w-[220px] lg:max-w-[240px] ${
              darkPack
                ? "bg-black shadow-sm ring-1 ring-white/10"
                : imageFit === "contain"
                  ? "bg-white shadow-sm ring-1 ring-sand/80"
                  : "bg-mocha/5"
            }`}
          >
            <Image
              src={image}
              alt={`Kalpasi ${name}`}
              fill
              unoptimized={imageFit === "contain"}
              className={
                darkPack
                  ? "object-contain p-3 transition-premium group-hover:scale-[1.02] sm:p-4"
                  : imageFit === "contain"
                    ? "object-contain p-5 transition-premium group-hover:scale-[1.02] sm:p-6"
                    : "object-cover transition-premium group-hover:scale-105"
              }
              sizes="(max-width: 640px) 42vw, 240px"
            />
            {imageFit !== "contain" && (
              <div className="absolute inset-0 bg-gradient-to-t from-espresso/40 via-transparent to-transparent" />
            )}
            <span
              className={`absolute bottom-3 left-3 text-[10px] uppercase tracking-widest sm:text-xs ${
                darkPack
                  ? "text-linen"
                  : imageFit === "contain"
                    ? "text-mocha"
                    : "text-linen"
              }`}
            >
              {note}
            </span>
          </div>
          <div className="mt-4 text-center sm:mt-5 md:mt-6">
            <h3 className="font-serif text-lg text-espresso sm:text-xl md:text-2xl">
              {brandedName}
            </h3>
            <p className="mt-2 px-1 text-xs leading-relaxed text-taupe sm:px-0 sm:text-sm">
              {description}
            </p>
            <span className="mt-4 inline-block text-[10px] font-medium uppercase tracking-widest text-terracotta transition-premium group-hover:text-terracotta-light sm:text-xs">
              Explore {brandedName} →
            </span>
          </div>
        </article>
      </Link>
    </Reveal>
  );
}
