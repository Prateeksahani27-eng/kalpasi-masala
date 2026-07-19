import { NextResponse } from "next/server";
import { notifyAdminNewReview } from "@/lib/newsletter";
import { formatReviewMessage, submitReview } from "@/lib/reviews";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = String(body.name ?? "").trim();
    const city = body.city ? String(body.city).trim() : undefined;
    const rating = Number(body.rating);
    const message = String(body.message ?? "").trim();

    if (!name || name.length < 2) {
      return NextResponse.json(
        { error: "Please enter your name." },
        { status: 400 }
      );
    }
    if (!message || message.length < 10) {
      return NextResponse.json(
        { error: "Please share a bit more about your experience." },
        { status: 400 }
      );
    }
    if (!Number.isFinite(rating) || rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "Please select a star rating." },
        { status: 400 }
      );
    }

    const formatted = formatReviewMessage(message);
    if (!formatted) {
      return NextResponse.json(
        { error: "Please enter a valid review." },
        { status: 400 }
      );
    }

    await submitReview({ name, city, rating, message });
    await notifyAdminNewReview({ name, rating });

    return NextResponse.json({
      message: "Thank you for sharing your experience with Kalpasi.",
    });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
