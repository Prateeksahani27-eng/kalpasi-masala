const navLinks = [
  { label: "Products", href: "#products" },
  { label: "About", href: "#about" },
  { label: "Stories", href: "#testimonials" },
];

export function SiteHeader() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-espresso/5 bg-linen/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 md:h-18">
        <a
          href="#"
          className="font-serif text-xl tracking-wide text-espresso md:text-2xl"
        >
          Kalpasi Masala
        </a>

        <nav className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs font-medium uppercase tracking-[0.2em] text-mocha transition-colors hover:text-terracotta"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#products"
          className="rounded-full bg-espresso px-5 py-2.5 text-xs font-medium uppercase tracking-[0.15em] text-linen transition-opacity hover:opacity-85"
        >
          Shop
        </a>
      </div>
    </header>
  );
}
