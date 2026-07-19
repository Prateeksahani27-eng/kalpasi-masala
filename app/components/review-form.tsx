"use client";

import { useState } from "react";
import { StarRatingInput } from "@/app/components/star-rating";

type ReviewFormProps = {
  variant?: "default" | "compact";
  onSuccess?: () => void;
};

export function ReviewForm({
  variant = "default",
  onSuccess,
}: ReviewFormProps) {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [feedback, setFeedback] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setFeedback("");

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, city, rating, message }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus("error");
        setFeedback(data.error ?? "Something went wrong.");
        return;
      }
      setStatus("success");
      setFeedback(data.message);
      setName("");
      setCity("");
      setRating(0);
      setMessage("");
      onSuccess?.();
    } catch {
      setStatus("error");
      setFeedback("Something went wrong. Please try again.");
    }
  }

  const compact = variant === "compact";

  if (status === "success") {
    return (
      <p
        className={`rounded-xl border border-sand bg-linen text-center font-serif text-espresso ${
          compact ? "px-4 py-5 text-base" : "px-6 py-8 text-lg"
        }`}
      >
        {feedback}
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`card-premium mx-auto max-w-xl rounded-2xl border border-sand bg-linen ${
        compact ? "p-4 sm:p-5" : "p-6 sm:p-8"
      }`}
    >
      {!compact ? (
        <>
          <h3 className="font-serif text-xl text-espresso sm:text-2xl">
            Share your experience
          </h3>
          <p className="mt-2 text-sm text-taupe">
            We read every submission with care. Your words help other families
            discover Kalpasi.
          </p>
        </>
      ) : null}

      <div className={compact ? "space-y-3" : "mt-6 space-y-4"}>
        <div>
          <label htmlFor="review-name" className="text-xs font-medium uppercase tracking-widest text-mocha">
            Name <span className="text-terracotta">*</span>
          </label>
          <input
            id="review-name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-2 w-full rounded-full border border-sand bg-cream px-4 py-2.5 text-sm text-espresso focus:border-terracotta focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="review-city" className="text-xs font-medium uppercase tracking-widest text-mocha">
            City
          </label>
          <input
            id="review-city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="mt-2 w-full rounded-full border border-sand bg-cream px-4 py-2.5 text-sm text-espresso focus:border-terracotta focus:outline-none"
          />
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-mocha">
            Rating <span className="text-terracotta">*</span>
          </p>
          <div className="mt-2">
            <StarRatingInput value={rating} onChange={setRating} />
          </div>
        </div>
        <div>
          <label htmlFor="review-message" className="text-xs font-medium uppercase tracking-widest text-mocha">
            Your review <span className="text-terracotta">*</span>
          </label>
          <textarea
            id="review-message"
            required
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="mt-2 w-full resize-y rounded-2xl border border-sand bg-cream px-4 py-3 text-sm text-espresso focus:border-terracotta focus:outline-none"
          />
        </div>
      </div>

      {status === "error" && feedback ? (
        <p className="mt-4 text-sm text-terracotta" role="alert">
          {feedback}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "loading" || rating < 1}
        className={`btn-premium w-full rounded-full bg-espresso px-6 py-3 text-xs font-medium uppercase tracking-wider text-linen hover:bg-mocha disabled:opacity-60 sm:w-auto ${
          compact ? "mt-4" : "mt-6"
        }`}
      >
        {status === "loading" ? "Sending…" : "Submit review"}
      </button>
    </form>
  );
}
