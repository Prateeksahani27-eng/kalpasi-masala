export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { PageShell } from "@/app/components/page-shell";
import { ReviewsExplorer } from "@/app/components/reviews-explorer";
import { ReviewForm } from "@/app/components/review-form";
import { Reveal } from "@/app/components/reveal";
import { pageOpenGraph, pageTwitter, siteUrl } from "@/lib/seo";
import { getReviewsForPublicDisplay } from "@/lib/reviews";

const title = "Customer Reviews | Kalpasi Spices";
const description =
  "Read approved customer reviews of Kalpasi Spices — premium, preservative-free Indian spices loved in homes across India.";

export const metadata: Metadata = {
  title: "Customer Reviews",
  description,
  alternates: {
    canonical: `${siteUrl}/reviews`,
  },
  openGraph: pageOpenGraph({
    title,
    description,
    url: `${siteUrl}/reviews`,
  }),
  twitter: pageTwitter({
    title,
    description,
  }),
};

export default async function ReviewsPage() {
  const reviews = await getReviewsForPublicDisplay();

  return (
    <PageShell>
      <section className="section-padding bg-espresso text-linen">
        <div className="mx-auto max-w-6xl text-center">
          <Reveal>
            <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-saffron sm:text-xs">
              Voices from our kitchens
            </p>
            <h1 className="mt-3 font-serif text-4xl font-medium sm:text-5xl md:text-6xl">
              Customer Reviews
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-cream/90 sm:text-base">
              Real experiences from families who cook with Kalpasi every day.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-padding">
        <div className="mx-auto max-w-6xl">
          <ReviewsExplorer initialReviews={reviews} />
        </div>
      </section>

      <section className="section-padding border-t border-sand bg-cream">
        <div className="mx-auto max-w-6xl">
          <Reveal className="text-center">
            <h2 className="font-serif text-2xl text-espresso sm:text-3xl">
              Write a review
            </h2>
          </Reveal>
          <div className="mt-8">
            <ReviewForm />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
