"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { ShopCtaButton } from "@/app/components/shop-cta-button";
import { cn } from "@/lib/utils";

export type HeroSlide = {
  id: string;
  image: string;
  alt: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  align?: "left" | "center" | "right";
  unoptimized?: boolean;
  /** When set, slide image links to this product detail page */
  productSlug?: string;
  /** Accessible label for product slide links */
  productLinkLabel?: string;
};

const defaultSlides: HeroSlide[] = [
  {
    id: "pure-spices",
    image:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663578704316/QWzmzk9erefK3gTeeB6CKq/hero-spices-cinematic-8YNFpZuUxuyjVkYcAdYVR3.webp",
    alt: "Premium Kalpasi spices in warm cinematic light",
    eyebrow: "100% Pure & Honest",
    title: "Taste real masala again.",
    subtitle:
      "Preservative-free blends crafted in small batches for families who deserve purity.",
    align: "left",
    unoptimized: true,
  },
  {
    id: "garam-masala",
    image: "/images/hero-scroll-garam-masala.png",
    alt: "Kalpasi Garam Masala premium pack",
    eyebrow: "Signature Blend",
    title: "Garam Masala, elevated.",
    subtitle:
      "Warm, aromatic, and authentically Indian — ground slow for depth in every dish.",
    align: "right",
    productSlug: "garam-masala",
    productLinkLabel: "Kalpasi Garam Masala",
  },
  {
    id: "our-story",
    image: "/images/about-story-bridge.png",
    alt: "Traditional Indian spice preparation illustration",
    eyebrow: "Our Story",
    title: "Honesty back in your kitchen.",
    subtitle:
      "From sourcing to sealing, every pack carries our promise of transparency.",
    align: "center",
  },
];

const AUTO_INTERVAL_MS = 5000;

const alignClasses: Record<NonNullable<HeroSlide["align"]>, string> = {
  left: "items-start text-left mr-auto",
  center: "items-center text-center mx-auto",
  right: "items-end text-right ml-auto",
};

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
    >
      {direction === "left" ? (
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 6l-6 6 6 6" />
      ) : (
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 6l6 6-6 6" />
      )}
    </svg>
  );
}

function PauseIcon({ paused }: { paused: boolean }) {
  return paused ? (
    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M8 5v14l11-7z" />
    </svg>
  ) : (
    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M6 5h4v14H6V5zm8 0h4v14h-4V5z" />
    </svg>
  );
}

export function HeroCarousel({ slides = defaultSlides }: { slides?: HeroSlide[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const goTo = useCallback(
    (next: number) => {
      setIndex((next + slides.length) % slides.length);
    },
    [slides.length]
  );

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    if (paused || prefersReducedMotion) return;
    const timer = window.setInterval(next, AUTO_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [paused, prefersReducedMotion, next]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const endX = e.changedTouches[0]?.clientX ?? touchStartX.current;
    const delta = endX - touchStartX.current;
    if (Math.abs(delta) > 48) {
      if (delta < 0) next();
      else prev();
    }
    touchStartX.current = null;
  };

  const slide = slides[index];
  const align = slide.align ?? "left";

  return (
    <section
      className="relative w-full overflow-hidden bg-espresso"
      aria-roledescription="carousel"
      aria-label="Featured promotions"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="relative h-[50vh] min-h-[320px] md:h-[60vh] md:min-h-[420px] lg:h-[75vh] lg:min-h-[520px]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={slide.id}
            className="absolute inset-0"
            initial={
              prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: 32 }
            }
            animate={
              prefersReducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }
            }
            exit={
              prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: -32 }
            }
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="absolute inset-0"
              initial={{ scale: 1 }}
              animate={{ scale: prefersReducedMotion ? 1 : 1.06 }}
              transition={{ duration: 8, ease: "linear" }}
            >
              {slide.productSlug ? (
                <Link
                  href={`/products/${slide.productSlug}`}
                  className="absolute inset-0 block"
                  aria-label={`View ${slide.productLinkLabel ?? slide.title}`}
                >
                  <Image
                    src={slide.image}
                    alt={slide.alt}
                    fill
                    priority={index === 0}
                    unoptimized={slide.unoptimized}
                    className="object-cover object-center"
                    sizes="100vw"
                  />
                </Link>
              ) : (
                <Image
                  src={slide.image}
                  alt={slide.alt}
                  fill
                  priority={index === 0}
                  unoptimized={slide.unoptimized}
                  className="object-cover object-center"
                  sizes="100vw"
                />
              )}
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-r from-espresso/75 via-espresso/35 to-espresso/20" />
            <div className="absolute inset-0 bg-gradient-to-t from-espresso/50 via-transparent to-transparent" />
          </motion.div>
        </AnimatePresence>

        <div className="relative z-10 mx-auto flex h-full max-w-6xl items-center px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${slide.id}-copy`}
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -8 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className={cn(
                "flex max-w-xl flex-col gap-4 sm:max-w-2xl",
                alignClasses[align]
              )}
            >
              <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-saffron sm:text-xs">
                {slide.eyebrow}
              </p>
              <h1 className="font-serif text-3xl font-medium leading-[1.1] text-linen sm:text-5xl md:text-6xl lg:text-7xl">
                {slide.title}
              </h1>
              <p className="max-w-md text-sm leading-relaxed text-cream/90 sm:text-base md:text-lg">
                {slide.subtitle}
              </p>
              <div
                className={cn(
                  "mt-2 flex flex-col gap-3 sm:flex-row",
                  align === "center" && "items-center",
                  align === "right" && "items-end"
                )}
              >
                <ShopCtaButton className="w-full sm:w-auto">
                  Order Online
                </ShopCtaButton>
                <Link
                  href="/products"
                  className="btn-premium inline-flex min-h-11 items-center justify-center rounded-full border border-linen/30 px-6 py-3 text-sm font-medium text-linen transition-premium hover:border-linen hover:bg-linen/10"
                >
                  Explore Products
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <button
          type="button"
          onClick={prev}
          aria-label="Previous slide"
          className="btn-premium absolute left-3 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-linen/25 bg-linen/15 text-linen backdrop-blur-sm transition-premium hover:bg-linen/25 sm:flex md:left-6"
        >
          <ChevronIcon direction="left" />
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="Next slide"
          className="btn-premium absolute right-3 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-linen/25 bg-linen/15 text-linen backdrop-blur-sm transition-premium hover:bg-linen/25 sm:flex md:right-6"
        >
          <ChevronIcon direction="right" />
        </button>
      </div>

      <div className="relative z-20 flex items-center justify-center gap-4 border-t border-linen/10 bg-espresso/90 px-4 py-4 backdrop-blur-sm">
        <div
          className="flex items-center gap-2"
          role="tablist"
          aria-label="Carousel pagination"
        >
          {slides.map((s, i) => (
            <button
              key={s.id}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goTo(i)}
              className={cn(
                "h-2 w-2 rounded-full transition-premium",
                i === index
                  ? "w-6 bg-saffron"
                  : "bg-linen/35 hover:bg-linen/55"
              )}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-label={paused ? "Play carousel" : "Pause carousel"}
          className="btn-premium flex h-8 w-8 items-center justify-center rounded-full border border-linen/25 text-linen transition-premium hover:bg-linen/15"
        >
          <PauseIcon paused={paused} />
        </button>
      </div>
    </section>
  );
}
