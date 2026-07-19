"use client";

import { useCallback, useEffect, useState } from "react";
import type { CustomerReview, ReviewStatus } from "@/lib/reviews";

export default function AdminReviewsPage() {
  const [token, setToken] = useState("");
  const [authed, setAuthed] = useState(false);
  const [reviews, setReviews] = useState<CustomerReview[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const load = useCallback(async (secret: string) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/reviews", {
        headers: { Authorization: `Bearer ${secret}` },
      });
      if (!res.ok) {
        setError("Invalid admin secret.");
        setAuthed(false);
        return;
      }
      const data = await res.json();
      setReviews(data.reviews);
      setAuthed(true);
      sessionStorage.setItem("kalpasi_admin_secret", secret);
    } catch {
      setError("Failed to load reviews.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const saved = sessionStorage.getItem("kalpasi_admin_secret");
    if (saved) load(saved);
  }, [load]);

  async function patchReview(
    id: string,
    body: Record<string, unknown>
  ) {
    const secret = sessionStorage.getItem("kalpasi_admin_secret") ?? token;
    const res = await fetch("/api/admin/reviews", {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${secret}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, ...body }),
    });
    if (res.ok) {
      const data = await res.json();
      setReviews((prev) =>
        prev.map((r) => (r.id === id ? data.review : r))
      );
    }
  }

  async function removeReview(id: string) {
    const secret = sessionStorage.getItem("kalpasi_admin_secret") ?? token;
    const res = await fetch(`/api/admin/reviews?id=${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${secret}` },
    });
    if (res.ok) {
      setReviews((prev) => prev.filter((r) => r.id !== id));
    }
  }

  if (!authed) {
    return (
      <main className="min-h-screen bg-cream px-4 py-16">
        <div className="mx-auto max-w-md rounded-2xl border border-sand bg-linen p-8">
          <h1 className="font-serif text-2xl text-espresso">Review moderation</h1>
          <p className="mt-2 text-sm text-taupe">
            Enter your admin secret to manage customer reviews.
          </p>
          <input
            type="password"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            className="mt-4 w-full rounded-full border border-sand bg-cream px-4 py-2.5 text-sm"
            placeholder="ADMIN_SECRET"
          />
          {error ? (
            <p className="mt-2 text-sm text-terracotta">{error}</p>
          ) : null}
          <button
            type="button"
            onClick={() => load(token)}
            disabled={loading || !token}
            className="btn-premium mt-4 rounded-full bg-espresso px-6 py-2.5 text-xs uppercase tracking-wider text-linen disabled:opacity-50"
          >
            {loading ? "Loading…" : "Enter"}
          </button>
        </div>
      </main>
    );
  }

  const statusOptions: ReviewStatus[] = [
    "pending",
    "approved",
    "rejected",
    "hidden",
  ];

  return (
    <main className="min-h-screen bg-cream px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <h1 className="font-serif text-3xl text-espresso">Review moderation</h1>
        <p className="mt-2 text-sm text-taupe">
          Approve, reject, hide, verify, edit, or delete customer reviews.
        </p>
        <button
          type="button"
          className="mt-4 text-xs uppercase tracking-widest text-terracotta hover:underline"
          onClick={async () => {
            const secret = sessionStorage.getItem("kalpasi_admin_secret");
            if (!secret) return;
            const res = await fetch("/api/admin/subscribers?format=csv", {
              headers: { Authorization: `Bearer ${secret}` },
            });
            if (!res.ok) return;
            const blob = await res.blob();
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "kalpasi-subscribers.csv";
            a.click();
            URL.revokeObjectURL(url);
          }}
        >
          Export newsletter subscribers (CSV)
        </button>

        <ul className="mt-8 space-y-6">
          {reviews.map((r) => (
            <li
              key={r.id}
              className="rounded-2xl border border-sand bg-linen p-5 sm:p-6"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-medium text-espresso">
                  {r.name}
                  {r.city ? ` · ${r.city}` : ""} · {r.rating}★
                </p>
                <span className="text-xs uppercase tracking-widest text-taupe">
                  {r.status}
                </span>
              </div>
              <textarea
                className="mt-3 w-full rounded-xl border border-sand bg-cream p-3 text-sm"
                rows={3}
                value={r.formattedMessage}
                onChange={(e) =>
                  setReviews((prev) =>
                    prev.map((x) =>
                      x.id === r.id
                        ? { ...x, formattedMessage: e.target.value }
                        : x
                    )
                  )
                }
              />
              <div className="mt-3 flex flex-wrap gap-2">
                {statusOptions.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => patchReview(r.id, { status: s })}
                    className="rounded-full border border-sand px-3 py-1 text-xs uppercase tracking-wider hover:border-terracotta"
                  >
                    {s}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    patchReview(r.id, { verified: !r.verified })
                  }
                  className="rounded-full border border-sand px-3 py-1 text-xs uppercase tracking-wider hover:border-terracotta"
                >
                  {r.verified ? "Unverify" : "Verified Customer"}
                </button>
                <button
                  type="button"
                  onClick={() =>
                    patchReview(r.id, {
                      formattedMessage: r.formattedMessage,
                    })
                  }
                  className="rounded-full border border-sand px-3 py-1 text-xs uppercase tracking-wider"
                >
                  Save text
                </button>
                <button
                  type="button"
                  onClick={() => removeReview(r.id)}
                  className="rounded-full border border-terracotta/40 px-3 py-1 text-xs uppercase tracking-wider text-terracotta"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
