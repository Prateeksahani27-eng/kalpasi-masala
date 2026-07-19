"use client";

import { useEffect, useRef, useState } from "react";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Stagger delay in ms */
  delay?: number;
  variant?: "up" | "fade" | "scale";
  /** Animate on mount (hero) instead of on scroll */
  immediate?: boolean;
};

export function Reveal({
  children,
  className = "",
  delay = 0,
  variant = "up",
  immediate = false,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (immediate) {
      const id = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(id);
    }

    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const id = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(id);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.08,
        rootMargin:
          window.innerWidth < 768 ? "0px 0px -24px 0px" : "0px 0px -48px 0px",
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [immediate]);

  const variantClass =
    variant === "fade"
      ? "reveal-fade"
      : variant === "scale"
        ? "reveal-scale"
        : "reveal-up";

  return (
    <div
      ref={ref}
      data-visible={visible || undefined}
      className={`${variantClass} ${visible ? "is-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
