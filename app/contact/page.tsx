import type { Metadata } from "next";
import { PageShell } from "@/app/components/page-shell";
import { Reveal } from "@/app/components/reveal";
import { SocialLinks } from "@/app/components/social-links";
import { pageOpenGraph, pageTwitter, siteUrl } from "@/lib/seo";
import {
  getContactWhatsAppUrl,
  getDistributorWhatsAppUrl,
  getWholesaleWhatsAppUrl,
} from "@/lib/whatsapp";

const title = "Contact | Kalpasi Spices";
const description =
  "Contact Kalpasi Spices for product information, wholesale partnerships, and distributor enquiries.";

export const metadata: Metadata = {
  title: "Contact",
  description,
  alternates: {
    canonical: `${siteUrl}/contact`,
  },
  openGraph: pageOpenGraph({
    title,
    description,
    url: `${siteUrl}/contact`,
  }),
  twitter: pageTwitter({
    title,
    description,
  }),
};

export default function ContactPage() {
  return (
    <PageShell>
      <section className="section-padding bg-espresso text-linen">
        <div className="mx-auto max-w-6xl text-center">
          <Reveal>
            <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-saffron sm:text-xs">
              We&apos;d love to hear from you
            </p>
            <h1 className="mt-3 font-serif text-4xl font-medium sm:text-5xl md:text-6xl">
              Contact
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-cream/90 sm:text-base">
              Reach our team for product questions, partnerships, or marketplace orders.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-padding bg-cream">
        <div className="mx-auto max-w-6xl grid gap-10 md:grid-cols-2 md:gap-16">
          <Reveal>
            <h2 className="font-serif text-2xl text-espresso sm:text-3xl">
              Get in touch
            </h2>
            <div className="mt-6 flex flex-col gap-3">
              <a
                href={getContactWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-premium inline-flex min-h-11 items-center justify-center rounded-full bg-espresso px-8 py-3 text-xs font-medium uppercase tracking-wider text-linen hover:bg-mocha"
              >
                Contact Us on WhatsApp
              </a>
              <a
                href={getDistributorWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-premium inline-flex min-h-11 items-center justify-center rounded-full border border-sand bg-linen px-8 py-3 text-xs font-medium uppercase tracking-wider text-espresso hover:border-terracotta/40"
              >
                Become a Distributor
              </a>
              <a
                href={getWholesaleWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-premium inline-flex min-h-11 items-center justify-center rounded-full border border-sand bg-linen px-8 py-3 text-xs font-medium uppercase tracking-wider text-espresso hover:border-terracotta/40"
              >
                Wholesale Enquiry
              </a>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="font-serif text-2xl text-espresso sm:text-3xl">
              Connect &amp; shop
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-mocha">
              Follow our journey or find Kalpasi on your preferred marketplace.
            </p>
            <div className="mt-6">
              <SocialLinks variant="icons" showMarketplaces />
            </div>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
