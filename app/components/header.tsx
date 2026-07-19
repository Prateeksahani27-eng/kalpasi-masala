"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import { getShopUrl, isExternalShopUrl } from "@/lib/shop";

const navLinks = [
  { href: "/products", label: "Products" },
  { href: "/#order", label: "Shop" },
  { href: "/#about", label: "About" },
  { href: "/#stories", label: "Stories" },
  { href: "/reviews", label: "Reviews" },
  { href: "/contact", label: "Contact" },
] as const;

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
    >
      {open ? (
        <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
      ) : (
        <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
      )}
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg
      className="h-[18px] w-[18px]"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
    >
      <circle cx="11" cy="11" r="7" />
      <path strokeLinecap="round" d="M20 20l-3-3" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg
      className="h-[18px] w-[18px]"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
    >
      <circle cx="12" cy="8" r="4" />
      <path strokeLinecap="round" d="M5 20c1.5-3 4-4.5 7-4.5s5.5 1.5 7 4.5" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg
      className="h-[18px] w-[18px]"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
    >
      <path strokeLinecap="round" d="M6 6h15l-1.5 9h-11L6 6z" />
      <path strokeLinecap="round" d="M9 6V5a3 3 0 0 1 6 0v1" />
    </svg>
  );
}

function IconButton({
  label,
  children,
  onClick,
  href,
}: {
  label: string;
  children: ReactNode;
  onClick?: () => void;
  href?: string;
}) {
  const className =
    "flex h-9 w-9 items-center justify-center rounded-full text-mocha transition-premium hover:bg-cream hover:text-espresso";

  if (href) {
    return (
      <Link href={href} aria-label={label} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} aria-label={label} className={className}>
      {children}
    </button>
  );
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const shopUrl = getShopUrl();
  const shopExternal = isExternalShopUrl(shopUrl);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-linen/95 backdrop-blur-md">
      <nav
        className="border-b border-sand/80"
        aria-label="Main navigation"
      >
        <div className="mx-auto grid h-14 max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-2 px-4 sm:h-16 sm:px-6">
          <div className="flex items-center gap-1 sm:gap-2">
            <IconButton label={menuOpen ? "Close menu" : "Open menu"} onClick={() => setMenuOpen((o) => !o)}>
              <MenuIcon open={menuOpen} />
            </IconButton>
            <IconButton label="Search products" href="/products">
              <SearchIcon />
            </IconButton>
          </div>

          <Link href="/" className="justify-self-center" aria-label="Kalpasi Masala home">
            <Image
              src="/images/logo-transparent.png"
              alt="Kalpasi Masala"
              width={160}
              height={48}
              priority
              className="h-7 w-auto sm:h-8 md:h-9"
            />
          </Link>

          <div className="flex items-center justify-end gap-1 sm:gap-2">
            <IconButton label="Account" href="#order">
              <UserIcon />
            </IconButton>
            <IconButton label="View cart" href="#order">
              <CartIcon />
            </IconButton>
          </div>
        </div>
      </nav>

      <div
        id="mobile-nav"
        className={`overflow-hidden border-b border-sand/80 bg-linen transition-[max-height,opacity] duration-300 ease-out lg:hidden ${
          menuOpen ? "max-h-[min(28rem,80dvh)] opacity-100" : "max-h-0 opacity-0"
        }`}
        aria-hidden={!menuOpen}
      >
        <ul className="flex flex-col px-4 py-4 sm:px-6">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={closeMenu}
                className="block border-b border-sand/60 py-3.5 text-sm font-medium tracking-wide text-mocha transition-premium last:border-0 hover:text-terracotta"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="pt-4">
            <a
              href={shopUrl}
              onClick={closeMenu}
              {...(shopExternal
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="btn-premium flex w-full items-center justify-center rounded-full bg-espresso px-5 py-3 text-xs font-medium uppercase tracking-widest text-linen hover:bg-mocha"
            >
              Shop Online
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}

/** Total fixed header height for layout offset (announcement + nav). */
export const HEADER_OFFSET_CLASS = "pt-14 sm:pt-16";
