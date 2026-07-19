export function StarRating({
  rating,
  className = "",
}: {
  rating: number;
  className?: string;
}) {
  const stars = [1, 2, 3, 4, 5];
  return (
    <div
      className={`flex gap-0.5 text-saffron ${className}`}
      aria-label={`${rating} out of 5 stars`}
      role="img"
    >
      {stars.map((n) => (
        <span key={n} aria-hidden className={n <= rating ? "opacity-100" : "opacity-25"}>
          ★
        </span>
      ))}
    </div>
  );
}

export function StarRatingInput({
  value,
  onChange,
}: {
  value: number;
  onChange: (rating: number) => void;
}) {
  return (
    <div className="flex gap-2" role="radiogroup" aria-label="Your rating">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          role="radio"
          aria-checked={value === n}
          onClick={() => onChange(n)}
          className={`text-2xl transition-premium ${
            n <= value ? "text-saffron" : "text-sand hover:text-saffron/60"
          }`}
        >
          ★
        </button>
      ))}
    </div>
  );
}
