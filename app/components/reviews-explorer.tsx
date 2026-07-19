"use client";

import { useMemo, useState } from "react";
import { CustomerReviewCardBlock } from "@/app/components/testimonial-card";
import type { CustomerReview } from "@/lib/reviews";

function formatReviewDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function ReviewsExplorer({
  initialReviews,
}: {
  initialReviews: CustomerReview[];
}) {
  const [query, setQuery] = useState("");
  const [ratingFilter, setRatingFilter] = useState<number | "all">("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return initialReviews.filter((r) => {
      if (ratingFilter !== "all" && r.rating !== ratingFilter) return false;
      if (!q) return true;
      const haystack = [
        r.name,
        r.city ?? "",
        r.formattedMessage,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [initialReviews, query, ratingFilter]);

  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex-1">
          <label htmlFor="review-search" className="text-xs font-medium uppercase tracking-widest text-mocha">
            Search reviews
          </label>
          <input
            id="review-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Name, city, or keywords…"
            className="mt-2 w-full max-w-md rounded-full border border-sand bg-linen px-4 py-2.5 text-sm text-espresso focus:border-terracotta focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="rating-filter" className="text-xs font-medium uppercase tracking-widest text-mocha">
            Filter by rating
          </label>
          <select
            id="rating-filter"
            value={ratingFilter}
            onChange={(e) => {
              const v = e.target.value;
              setRatingFilter(v === "all" ? "all" : Number(v));
            }}
            className="mt-2 block w-full min-w-[140px] rounded-full border border-sand bg-linen px-4 py-2.5 text-sm text-espresso focus:border-terracotta focus:outline-none"
          >
            <option value="all">All ratings</option>
            {[5, 4, 3, 2, 1].map((n) => (
              <option key={n} value={n}>
                {n} stars
              </option>
            ))}
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-12 text-center text-sm text-taupe">
          No reviews match your search yet.
        </p>
      ) : (
        <div className="mt-10 grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((r) => (
            <CustomerReviewCardBlock
              key={r.id}
              review={{
                quote: r.formattedMessage,
                author: r.name,
                location: r.city,
                rating: r.rating,
                verified: r.verified,
                date: formatReviewDate(r.createdAt),
              }}
            />
          ))}
        </div>
      )}
    </>
  );
}
