import { staticTestimonials } from "@/lib/testimonials";

export const STATIC_FALLBACK_REVIEW_ID_PREFIX = "static-testimonial-";

export function isStaticFallbackReview(review: { id: string }): boolean {
  return review.id.startsWith(STATIC_FALLBACK_REVIEW_ID_PREFIX);
}

export function getStaticFallbackReviews() {
  return staticTestimonials.map((testimonial, index) => ({
    id: `${STATIC_FALLBACK_REVIEW_ID_PREFIX}${index}`,
    name: testimonial.author,
    city: testimonial.location,
    rating: 0,
    message: testimonial.quote,
    formattedMessage: testimonial.quote,
    status: "approved" as const,
    verified: false,
    createdAt: "1970-01-01T00:00:00.000Z",
  }));
}
