import { NextResponse } from "next/server";
import { subscribeNewsletter } from "@/lib/newsletter";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = String(body.email ?? "");

    const result = await subscribeNewsletter(email);
    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json({
      message: "Thank you for subscribing to Kalpasi.",
    });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
