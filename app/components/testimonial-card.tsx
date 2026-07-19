import { StarRating } from "@/app/components/star-rating";

type StaticTestimonial = {
  quote: string;
  author: string;
  location: string;
};

type CustomerReviewCard = {
  quote: string;
  author: string;
  location?: string;
  rating?: number;
  verified?: boolean;
  date?: string;
};

export function StaticTestimonialCard({ t }: { t: StaticTestimonial }) {
  return (
    <blockquote className="card-premium flex flex-col rounded-xl border border-sand bg-linen p-6 sm:rounded-2xl sm:p-8">
      <p className="font-serif text-lg leading-relaxed text-espresso sm:text-xl">
        &ldquo;{t.quote}&rdquo;
      </p>
      <footer className="mt-8 border-t border-sand pt-6">
        <cite className="not-italic text-sm font-medium text-espresso">
          {t.author}
        </cite>
        <p className="mt-1 text-xs uppercase tracking-widest text-taupe">
          {t.location}
        </p>
      </footer>
    </blockquote>
  );
}

export function CustomerReviewCardBlock({ review }: { review: CustomerReviewCard }) {
  return (
    <blockquote className="card-premium flex flex-col rounded-xl border border-sand bg-linen p-6 sm:rounded-2xl sm:p-8">
      {review.rating ? (
        <StarRating rating={review.rating} className="mb-4 text-base" />
      ) : null}
      <p className="font-serif text-lg leading-relaxed text-espresso sm:text-xl">
        &ldquo;{review.quote}&rdquo;
      </p>
      <footer className="mt-8 border-t border-sand pt-6">
        <div className="flex flex-wrap items-center gap-2">
          <cite className="not-italic text-sm font-medium text-espresso">
            {review.author}
          </cite>
          {review.verified ? (
            <span className="inline-flex items-center rounded-full border border-sand bg-cream px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-mocha">
              Verified Customer
            </span>
          ) : null}
        </div>
        {review.location ? (
          <p className="mt-1 text-xs uppercase tracking-widest text-taupe">
            {review.location}
          </p>
        ) : null}
        {review.date ? (
          <p className="mt-1 text-xs text-taupe">{review.date}</p>
        ) : null}
      </footer>
    </blockquote>
  );
}
