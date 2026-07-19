"use client";

import { useState } from "react";

type NewsletterFormProps = {
  className?: string;
  inputClassName?: string;
  buttonClassName?: string;
  layout?: "row" | "column";
};

export function NewsletterForm({
  className = "",
  inputClassName = "",
  buttonClassName = "",
  layout = "row",
}: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus("error");
        setMessage(data.error ?? "Something went wrong.");
        return;
      }
      setStatus("success");
      setMessage(data.message);
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <p className={`text-sm text-espresso ${className}`} role="status">
        {message}
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`${layout === "row" ? "flex flex-col gap-2 sm:flex-row" : "flex flex-col gap-2"} ${className}`}
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email"
        aria-label="Email for newsletter"
        className={
          inputClassName ||
          "min-h-11 min-w-0 flex-1 rounded-full border border-sand bg-cream px-4 py-2.5 text-sm text-espresso placeholder:text-taupe/60 focus:border-terracotta focus:outline-none"
        }
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className={
          buttonClassName ||
          "btn-premium min-h-11 shrink-0 rounded-full bg-espresso px-6 py-2.5 text-xs font-medium uppercase tracking-wider text-linen hover:bg-mocha sm:px-5 disabled:opacity-60"
        }
      >
        {status === "loading" ? "…" : "Join"}
      </button>
      {status === "error" && message ? (
        <p className="text-xs text-terracotta sm:col-span-2" role="alert">
          {message}
        </p>
      ) : null}
    </form>
  );
}
