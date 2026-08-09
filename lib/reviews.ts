import { readJsonFile, writeJsonFile } from "@/lib/storage";
import { getStaticFallbackReviews } from "@/lib/review-fallback";

export type ReviewStatus = "pending" | "approved" | "rejected" | "hidden";

export type CustomerReview = {
  id: string;
  name: string;
  city?: string;
  rating: number;
  message: string;
  formattedMessage: string;
  status: ReviewStatus;
  verified: boolean;
  createdAt: string;
};

const FILE = "reviews.json";

export function formatReviewMessage(raw: string): string {
  const text = raw.replace(/\s+/g, " ").trim();
  if (!text) return "";
  const sentences = text.split(/(?<=[.!?])\s+/);
  const normalized = sentences
    .map((s) => {
      const t = s.trim();
      if (!t) return "";
      return t.charAt(0).toUpperCase() + t.slice(1);
    })
    .filter(Boolean)
    .join(" ");
  return normalized.charAt(0).toUpperCase() + normalized.slice(1);
}

async function loadReviews(): Promise<CustomerReview[]> {
  return readJsonFile<CustomerReview[]>(FILE, []);
}

async function saveReviews(reviews: CustomerReview[]): Promise<void> {
  await writeJsonFile(FILE, reviews);
}

export async function submitReview(input: {
  name: string;
  city?: string;
  rating: number;
  message: string;
}): Promise<void> {
  const reviews = await loadReviews();
  const review: CustomerReview = {
    id: crypto.randomUUID(),
    name: input.name.trim(),
    city: input.city?.trim() || undefined,
    rating: Math.min(5, Math.max(1, Math.round(input.rating))),
    message: input.message.trim(),
    formattedMessage: formatReviewMessage(input.message),
    status: "pending",
    verified: false,
    createdAt: new Date().toISOString(),
  };
  reviews.unshift(review);
  await saveReviews(reviews);
}

export async function getApprovedReviews(limit?: number): Promise<CustomerReview[]> {
  const reviews = await loadReviews();
  const approved = reviews
    .filter((r) => r.status === "approved")
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  return limit ? approved.slice(0, limit) : approved;
}

/** Approved customer reviews for public pages, with curated static fallback when none exist. */
export async function getReviewsForPublicDisplay(
  limit?: number
): Promise<CustomerReview[]> {
  const approved = await getApprovedReviews(limit);
  if (approved.length > 0) {
    return approved;
  }

  const fallback = getStaticFallbackReviews();
  return limit ? fallback.slice(0, limit) : fallback;
}

export async function getAllReviewsForAdmin(): Promise<CustomerReview[]> {
  const reviews = await loadReviews();
  return reviews.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function updateReview(
  id: string,
  patch: Partial<
    Pick<
      CustomerReview,
      "status" | "verified" | "formattedMessage" | "name" | "city" | "rating"
    >
  >
): Promise<CustomerReview | null> {
  const reviews = await loadReviews();
  const index = reviews.findIndex((r) => r.id === id);
  if (index === -1) return null;
  reviews[index] = { ...reviews[index], ...patch };
  await saveReviews(reviews);
  return reviews[index];
}

export async function deleteReview(id: string): Promise<boolean> {
  const reviews = await loadReviews();
  const next = reviews.filter((r) => r.id !== id);
  if (next.length === reviews.length) return false;
  await saveReviews(next);
  return true;
}
