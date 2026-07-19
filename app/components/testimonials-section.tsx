import Link from "next/link";
import { Reveal } from "@/app/components/reveal";
import { ShareExperienceEntry } from "@/app/components/share-experience-entry";
import {
  CustomerReviewCardBlock,
  StaticTestimonialCard,
} from "@/app/components/testimonial-card";
import { getApprovedReviews } from "@/lib/reviews";
import { staticTestimonials } from "@/lib/testimonials";

function formatReviewDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export async function TestimonialsSection() {
  const customerReviews = await getApprovedReviews(3);

  return (
    <section id="stories" className="section-padding">
      <div className="mx-auto max-w-6xl">
        <Reveal className="text-center">
          <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-gold-muted sm:text-xs sm:tracking-[0.35em]">
            From Our Kitchens
          </p>
          <h2 className="mt-3 font-serif text-3xl font-medium text-espresso sm:mt-4 sm:text-4xl md:text-5xl">
            Loved by home cooks
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-5 sm:mt-12 sm:gap-6 md:mt-16 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {staticTestimonials.map((t, index) => (
            <Reveal key={t.author} delay={index * 100}>
              <StaticTestimonialCard t={t} />
            </Reveal>
          ))}
          {customerReviews.map((r, index) => (
            <Reveal key={r.id} delay={(staticTestimonials.length + index) * 100}>
              <CustomerReviewCardBlock
                review={{
                  quote: r.formattedMessage,
                  author: r.name,
                  location: r.city,
                  rating: r.rating,
                  verified: r.verified,
                }}
              />
            </Reveal>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center gap-4 text-center sm:mt-12">
          <Link
            href="/reviews"
            className="btn-premium inline-flex min-h-11 items-center justify-center rounded-full border border-sand bg-cream px-8 py-3 text-xs font-medium uppercase tracking-wider text-espresso hover:border-terracotta/40 hover:bg-linen"
          >
            See All Reviews
          </Link>
          <ShareExperienceEntry />
        </div>
      </div>
    </section>
  );
}

export { formatReviewDate };
