"use client";

import { useState } from "react";
import { ReviewForm } from "@/app/components/review-form";

export function ShareExperienceEntry() {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-8 text-center sm:mt-10">
      {!open ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="text-[11px] font-medium uppercase tracking-[0.2em] text-taupe transition-premium hover:text-terracotta sm:text-xs"
        >
          Share your experience
        </button>
      ) : (
        <div className="mx-auto max-w-xl text-left">
          <div className="mb-4 flex items-center justify-between gap-4">
            <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-gold-muted">
              Your review
            </p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="shrink-0 text-[11px] uppercase tracking-widest text-taupe transition-premium hover:text-espresso"
            >
              Close
            </button>
          </div>
          <ReviewForm variant="compact" />
        </div>
      )}
    </div>
  );
}
