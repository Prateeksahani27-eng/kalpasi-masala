import Link from "next/link";
import { NewsletterForm } from "@/app/components/newsletter-form";
import { SocialLinks } from "@/app/components/social-links";
import {
  getContactWhatsAppUrl,
  getWholesaleWhatsAppUrl,
} from "@/lib/whatsapp";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-sand bg-linen px-4 py-12 sm:px-6 sm:py-14 md:py-16">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-10 sm:gap-12 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="font-serif text-xl text-espresso sm:text-2xl">
              Kalpasi Masala
            </p>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-taupe sm:mt-3">
              Premium spices for families who refuse to compromise on purity,
              taste, or trust.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:grid-cols-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-mocha">
                Explore
              </p>
              <ul className="mt-4 space-y-3 text-sm text-taupe">
                <li>
                  <Link href="/products" className="transition-premium hover:text-terracotta">
                    Products
                  </Link>
                </li>
                <li>
                  <Link href="/#about" className="hover:text-terracotta">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/#stories" className="hover:text-terracotta">
                    Stories
                  </Link>
                </li>
                <li>
                  <Link href="/reviews" className="hover:text-terracotta">
                    Reviews
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-mocha">
                Shop
              </p>
              <ul className="mt-4 space-y-3 text-sm text-taupe">
                <li>
                  <Link href="/#order" className="hover:text-terracotta">
                    Order online
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-mocha">
                Contact
              </p>
              <ul className="mt-4 space-y-3 text-sm text-taupe">
                <li>
                  <a
                    href={getContactWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 hover:text-[#25D366]"
                  >
                    <WhatsAppIcon className="h-4 w-4" />
                    WhatsApp
                  </a>
                </li>
                <li>
                  <a
                    href={getWholesaleWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-terracotta"
                  >
                    Wholesale enquiry
                  </a>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-terracotta">
                    Contact page
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <p className="text-xs font-medium uppercase tracking-widest text-mocha">
                Newsletter
              </p>
              <p className="mt-3 text-sm text-taupe sm:mt-4">
                Recipes &amp; new arrivals, once a month.
              </p>
              <NewsletterForm className="mt-3 sm:mt-4" />
            </div>
          </div>
        </div>
        <div className="mt-10 rounded-2xl border border-sand/80 bg-linen/70 p-6 backdrop-blur-md sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-gold-muted sm:text-xs">
                Social Connect
              </p>
              <h3 className="mt-2 font-serif text-2xl font-medium text-espresso sm:text-3xl">
                Follow Our Journey
              </h3>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-taupe">
                Follow for spice drops, kitchen stories, and shop on your favourite marketplace.
              </p>
            </div>
            <SocialLinks variant="footer-buttons" />
          </div>
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-sand pt-6 text-center text-[11px] text-taupe sm:mt-12 sm:flex-row sm:gap-4 sm:pt-8 sm:text-left sm:text-xs md:mt-16">
          <p>© {new Date().getFullYear()} Kalpasi Masala. All rights reserved.</p>
          <p className="uppercase tracking-widest">Pure · Honest · Unforgettable</p>
        </div>
      </div>
    </footer>
  );
}
