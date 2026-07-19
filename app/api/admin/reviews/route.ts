import { NextResponse } from "next/server";
import { isAdminAuthorized } from "@/lib/admin-auth";
import {
  deleteReview,
  getAllReviewsForAdmin,
  updateReview,
  type ReviewStatus,
} from "@/lib/reviews";

export async function GET(request: Request) {
  if (!isAdminAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const reviews = await getAllReviewsForAdmin();
  return NextResponse.json({ reviews });
}

export async function PATCH(request: Request) {
  if (!isAdminAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const id = String(body.id ?? "");
    if (!id) {
      return NextResponse.json({ error: "Missing review id." }, { status: 400 });
    }

    const patch: Parameters<typeof updateReview>[1] = {};
    if (body.status) {
      const allowed: ReviewStatus[] = [
        "pending",
        "approved",
        "rejected",
        "hidden",
      ];
      if (!allowed.includes(body.status)) {
        return NextResponse.json({ error: "Invalid status." }, { status: 400 });
      }
      patch.status = body.status;
    }
    if (typeof body.verified === "boolean") patch.verified = body.verified;
    if (body.formattedMessage)
      patch.formattedMessage = String(body.formattedMessage).trim();
    if (body.name) patch.name = String(body.name).trim();
    if (body.city !== undefined)
      patch.city = body.city ? String(body.city).trim() : undefined;
    if (body.rating) patch.rating = Number(body.rating);

    const updated = await updateReview(id, patch);
    if (!updated) {
      return NextResponse.json({ error: "Review not found." }, { status: 404 });
    }
    return NextResponse.json({ review: updated });
  } catch {
    return NextResponse.json({ error: "Update failed." }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  if (!isAdminAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Missing review id." }, { status: 400 });
  }

  const ok = await deleteReview(id);
  if (!ok) {
    return NextResponse.json({ error: "Review not found." }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
