"use client";

import Image from "next/image";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";

/** Scroll-driven hero showcase — uses local hero art; swap src for another asset anytime. */
const HERO_IMAGE = "/images/hero-scroll-garam-masala.png";

export function HeroScroll() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-linen via-cream to-cream px-0">
      <HeroScrollContent />
    </section>
  );
}

function HeroScrollContent() {
  return (
    <ContainerScroll
      titleComponent={
        <>
          <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.28em] text-gold-muted sm:mb-4 sm:text-xs sm:tracking-[0.35em]">
            Crafted in small batches
          </p>
          <h2 className="font-serif text-3xl font-medium text-espresso sm:text-4xl md:text-5xl lg:text-6xl">
            Pure spices,
            <span className="mt-1 block text-terracotta sm:mt-2">honest flavor.</span>
          </h2>
        </>
      }
    >
      <Image
        src={HERO_IMAGE}
        alt="Assorted Kalpasi Masala spices in bowls"
        height={720}
        width={1400}
        className="mx-auto h-full w-full rounded-xl object-contain object-center p-1 sm:rounded-2xl sm:object-cover sm:object-center sm:p-0"
        draggable={false}
        priority
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 80rem"
      />
    </ContainerScroll>
  );
}
