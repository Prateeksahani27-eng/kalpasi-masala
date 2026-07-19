export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden pt-16">
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-cream via-linen to-linen"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-32 top-1/4 h-[480px] w-[480px] rounded-full bg-terracotta/8 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-24 bottom-1/4 h-80 w-80 rounded-full bg-sage/10 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl flex-col justify-center px-6 py-24 md:py-32">
        <p className="mb-6 text-xs font-medium uppercase tracking-[0.35em] text-gold-muted">
          100% Pure &amp; Honest Spices
        </p>

        <h1 className="max-w-4xl font-serif text-5xl font-medium leading-[1.08] text-espresso md:text-7xl lg:text-8xl">
          Taste real masala again.
        </h1>

        <p className="mt-8 max-w-xl text-base leading-relaxed text-mocha md:text-lg">
          No adulteration. No artificial colors. No preservatives. Just
          small-batch spices crafted for kitchens that refuse to compromise.
        </p>

        <div className="mt-12 flex flex-wrap gap-4">
          <a
            href="#products"
            className="inline-flex items-center justify-center rounded-full bg-espresso px-8 py-4 text-xs font-medium uppercase tracking-[0.2em] text-linen transition-opacity hover:opacity-90"
          >
            Explore collection
          </a>
          <a
            href="#about"
            className="inline-flex items-center justify-center rounded-full border border-espresso/20 px-8 py-4 text-xs font-medium uppercase tracking-[0.2em] text-espresso transition-colors hover:border-espresso hover:bg-espresso/5"
          >
            Our story
          </a>
        </div>

        <dl className="mt-20 grid grid-cols-3 gap-6 border-t border-espresso/10 pt-10 md:max-w-lg md:gap-10">
          {[
            { value: "0", label: "Preservatives" },
            { value: "100%", label: "Pure spice" },
            { value: "Small", label: "Batch crafted" },
          ].map((stat) => (
            <div key={stat.label}>
              <dt className="font-serif text-2xl text-terracotta md:text-3xl">
                {stat.value}
              </dt>
              <dd className="mt-1 text-[10px] uppercase tracking-[0.2em] text-taupe md:text-xs">
                {stat.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
