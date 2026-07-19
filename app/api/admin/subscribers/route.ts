import { NextResponse } from "next/server";
import { isAdminAuthorized } from "@/lib/admin-auth";
import { getAllSubscribers } from "@/lib/newsletter";

export async function GET(request: Request) {
  if (!isAdminAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const subscribers = await getAllSubscribers();
  const { searchParams } = new URL(request.url);
  const format = searchParams.get("format");

  if (format === "csv") {
    const lines = ["email,subscribedAt", ...subscribers.map((s) => `${s.email},${s.subscribedAt}`)];
    return new NextResponse(lines.join("\n"), {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": 'attachment; filename="kalpasi-subscribers.csv"',
      },
    });
  }

  return NextResponse.json({ subscribers });
}
