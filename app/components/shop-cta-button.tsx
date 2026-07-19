"use client";

import { useEffect, useState, type ReactNode } from "react";
import { LiquidButton } from "@/components/ui/liquid-glass-button";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

type ShopCtaButtonProps = {
  children: ReactNode;
  className?: string;
};

const platformLinks = [
  { label: "Amazon", href: siteConfig.amazonStoreUrl },
  { label: "Flipkart", href: siteConfig.flipkartStoreUrl },
  { label: "Meesho", href: siteConfig.meeshoStoreUrl },
];

export function ShopCtaButton({
  children,
  className,
}: ShopCtaButtonProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onEscape);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onEscape);
    };
  }, [open]);

  return (
    <>
      <LiquidButton
        type="button"
        size="lg"
        onClick={() => setOpen(true)}
        className={cn(
          "min-h-11 rounded-full px-6 py-3 text-sm font-medium tracking-wide text-espresso sm:min-h-0 sm:px-8 sm:py-3.5 md:px-10 md:py-4",
          className
        )}
      >
        {children}
      </LiquidButton>

      {open && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-espresso/55 p-4 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-md rounded-2xl border border-sand/70 bg-linen p-5 shadow-2xl shadow-espresso/20 sm:p-6"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Choose shopping platform"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-gold-muted sm:text-xs">
                  Order Online
                </p>
                <h3 className="mt-2 font-serif text-2xl text-espresso sm:text-3xl">
                  Choose a platform
                </h3>
                <p className="mt-2 text-sm text-taupe">
                  Shop Kalpasi Masala from your preferred marketplace.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full border border-sand px-2.5 py-1 text-xs text-mocha transition-premium hover:border-terracotta/40 hover:text-terracotta"
                aria-label="Close"
              >
                Close
              </button>
            </div>

            <div className="mt-5 grid gap-2.5">
              {platformLinks.map((platform) => (
                <a
                  key={platform.label}
                  href={platform.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-premium inline-flex min-h-11 items-center justify-between rounded-xl border border-sand bg-cream px-4 py-3 text-sm font-medium text-espresso hover:border-terracotta/35 hover:bg-linen"
                >
                  {platform.label}
                  <span className="text-xs uppercase tracking-widest text-taupe">
                    Open
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
