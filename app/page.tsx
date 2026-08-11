import type { Metadata } from "next";
import {
  getWebsiteStructuredData,
  openGraphDescription,
  pageOpenGraph,
  pageTwitter,
  siteDescription,
  siteName,
  siteUrl,
  structuredDataScriptHtml,
} from "@/lib/seo";

export const metadata: Metadata = {
  description: siteDescription,
  alternates: {
    canonical: `${siteUrl}/`,
  },
  openGraph: pageOpenGraph({
    title: `${siteName} | Pure Indian Spices & Masala`,
    description: openGraphDescription,
    url: `${siteUrl}/`,
  }),
  twitter: pageTwitter({
    title: `${siteName} | Pure Indian Spices & Masala`,
    description: openGraphDescription,
  }),
};

export const dynamic = "force-dynamic";

import Image from "next/image";
import Link from "next/link";
import { Header, HEADER_OFFSET_CLASS } from "@/app/components/header";
import { HeroCarousel } from "@/app/components/hero-carousel";
import { ProductCard } from "@/app/components/product-card";
import { Reveal } from "@/app/components/reveal";
import { ShopCtaButton } from "@/app/components/shop-cta-button";
import { SiteFooter } from "@/app/components/site-footer";
import { TestimonialsSection } from "@/app/components/testimonials-section";
import { WhatsAppFloat } from "@/app/components/whatsapp-float";
import { getHomepageProducts } from "@/lib/products";
import { getShopUrl, isExternalShopUrl } from "@/lib/shop";
import {
  getContactWhatsAppUrl,
  getWholesaleWhatsAppUrl,
} from "@/lib/whatsapp";

function WhatsAppLink({
  href,
  className,
  children,
  ...props
}: React.ComponentProps<"a"> & { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      {...props}
    >
      {children}
    </a>
  );
}

const images = {
  about: "/images/about-story-bridge.png",
} as const;

const homepageProducts = getHomepageProducts();

const comparisonPoints = [
  {
    topic: "Preservatives",
    generic: "Often includes shelf-life additives",
    kalpasi: "Preservative-free, naturally fresh",
  },
  {
    topic: "Color",
    generic: "Artificial enhancers are common",
    kalpasi: "Natural spice color only",
  },
  {
    topic: "Flavor",
    generic: "Batch-to-batch inconsistency",
    kalpasi: "Authentic, consistent flavor profile",
  },
  {
    topic: "Purity",
    generic: "Risk of hidden adulteration",
    kalpasi: "Transparent sourcing and checks",
  },
  {
    topic: "Production",
    generic: "Mass-scale processing",
    kalpasi: "Small-batch grinding for freshness",
  },
] as const;

const qualityProcess = [
  {
    title: "Sourcing",
    description: "Whole spices selected from trusted growers.",
    icon: "01",
  },
  {
    title: "Grinding",
    description: "Slow-ground in small batches to preserve aroma.",
    icon: "02",
  },
  {
    title: "Quality Checks",
    description: "Purity and consistency verified before packing.",
    icon: "03",
  },
  {
    title: "Packaging",
    description: "Sealed carefully to lock in freshness and flavor.",
    icon: "04",
  },
  {
    title: "Delivery",
    description: "Dispatched quickly for peak taste at your kitchen.",
    icon: "05",
  },
] as const;

const wholesaleCards = [
  {
    title: "Restaurants & Catering",
    description:
      "Reliable bulk spice supply for professional kitchens and events.",
  },
  {
    title: "Retailers & Shops",
    description: "Premium shelf-ready packs that customers trust and reorder.",
  },
  {
    title: "Distributors",
    description:
      "Strong regional support with consistent quality and fulfillment.",
  },
  {
    title: "Corporate Orders",
    description:
      "Curated festive and gifting packs with dependable delivery timelines.",
  },
] as const;

const partnerBenefits = [
  "Premium quality your customers can trust",
  "Competitive pricing for sustainable margins",
  "Direct support for repeat and bulk orders",
  "Small-batch freshness and natural aroma",
  "Transparent sourcing and quality assurance",
  "Consistent flavor across every order",
] as const;

const faqItems = [
  {
    question: "How do you ensure purity?",
    answer:
      "We source whole spices, grind in small batches, and run quality checks before every pack is sealed.",
  },
  {
    question: "What makes Kalpasi different?",
    answer:
      "Kalpasi focuses on preservative-free, natural spices with transparent processes and consistency in flavor.",
  },
  {
    question: "What is the shelf life?",
    answer: "Our recommended shelf life is 8 months from packing.",
  },
  {
    question: "Are the spices natural?",
    answer:
      "Yes. We avoid artificial colors and preservatives, keeping the spices as natural as possible.",
  },
  {
    question: "How should they be stored?",
    answer:
      "Store in a cool, dry place away from direct sunlight and keep packs tightly closed after use.",
  },
] as const;

function ProductShowcase() {
  return (
    <section id="products" className="section-padding bg-cream">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto mb-10 max-w-2xl text-center sm:mb-12 md:mb-16">
          <h2 className="font-serif text-3xl font-medium tracking-[0.12em] text-espresso sm:text-4xl md:text-5xl">
            OUR PRODUCTS
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-mocha sm:mt-4 sm:text-base">
            Premium masala packs, ground in small batches and sealed for
            authentic aroma in every kitchen.
          </p>
        </Reveal>

        <div className="mx-auto grid max-w-lg grid-cols-1 gap-y-10 sm:max-w-3xl sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12 md:max-w-4xl md:gap-x-10 md:gap-y-16 lg:max-w-5xl">
          {homepageProducts.map((product, index) => (
            <ProductCard key={product.slug} {...product} index={index} />
          ))}
        </div>
        <Reveal className="mt-12 text-center sm:mt-16">
          <Link
            href="/products"
            className="btn-premium inline-flex min-h-11 items-center justify-center rounded-full border border-sand bg-linen px-8 py-3 text-xs font-medium uppercase tracking-wider text-espresso hover:border-terracotta/40"
          >
            View all products
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

function OrderOnline() {
  const shopUrl = getShopUrl();
  const external = isExternalShopUrl(shopUrl);

  return (
    <section id="order" className="section-padding border-y border-sand bg-linen">
      <Reveal className="mx-auto max-w-3xl px-1 text-center sm:px-0">
        <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-gold-muted sm:text-xs sm:tracking-[0.35em]">
          Shop
        </p>
        <h2 className="mt-3 font-serif text-3xl font-medium text-espresso sm:mt-4 sm:text-4xl md:text-5xl">
          Order online
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-mocha sm:mt-4 sm:text-base">
          Browse our full range, add to cart, and checkout securely — delivered
          straight to your kitchen.
        </p>
        <ShopCtaButton
          className="mx-auto mt-8 w-full max-w-xs sm:mt-10 sm:w-auto sm:max-w-none sm:px-10 md:px-12"
        >
          {external ? "Go to online store" : "Start shopping"}
        </ShopCtaButton>
        <p className="mt-6 text-xs text-taupe sm:mt-8 sm:text-sm">
          Need help before you order?{" "}
          <WhatsAppLink
            href={getContactWhatsAppUrl()}
            className="font-medium text-[#25D366] transition-premium underline-offset-2 hover:underline"
          >
            Contact us on WhatsApp
          </WhatsAppLink>
        </p>
      </Reveal>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="section-padding bg-espresso text-linen">
      <div className="mx-auto grid max-w-6xl items-center gap-10 sm:gap-12 md:gap-16 lg:grid-cols-2">
        <Reveal variant="scale" className="lg:order-first">
          <div className="relative mx-auto aspect-[4/5] max-w-md overflow-hidden rounded-xl sm:max-w-none sm:rounded-2xl lg:mx-0">
            <Image
              src={images.about}
              alt="Spices at a traditional Indian market"
              fill
              className="object-cover transition-premium md:hover:scale-[1.03]"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </Reveal>
        <Reveal delay={100}>
          <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-saffron sm:text-xs sm:tracking-[0.35em]">
            Our Story
          </p>
          <h2 className="mt-3 font-serif text-3xl font-medium leading-tight sm:mt-4 sm:text-4xl md:text-5xl">
            Bringing honesty back to Indian kitchens
          </h2>
          <div className="mt-6 space-y-4 text-sm leading-relaxed text-cream/90 sm:mt-8 sm:space-y-6 sm:text-base">
            <p>
              Kalpasi Masala was born from a simple belief — families deserve
              spices that are truly pure, deeply flavorful, and free from
              compromise. We work directly with growers and grind in small
              batches so nothing is lost between the field and your stove.
            </p>
            <p>
              Every pack is a promise: no fillers, no artificial colors, no
              shortcuts. Just the rich aroma and bold taste that made Indian
              cooking unforgettable for generations.
            </p>
            <ul className="grid gap-4 pt-4 sm:grid-cols-2">
              {[
                "Ethically sourced",
                "Lab-tested purity",
                "Recyclable packaging",
                "Family-owned",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-sm text-sand"
                >
                  <span className="h-1 w-1 rounded-full bg-saffron" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function BrandComparison() {
  return (
    <section className="section-padding bg-cream">
      <div className="mx-auto max-w-6xl">
        <Reveal className="text-center">
          <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-gold-muted sm:text-xs sm:tracking-[0.35em]">
            Why Kalpasi
          </p>
          <h2 className="mt-3 font-serif text-3xl font-medium text-espresso sm:mt-4 sm:text-4xl md:text-5xl">
            Generic spice brands vs Kalpasi Masala
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-5 sm:mt-12 md:grid-cols-2 md:gap-6">
          <Reveal>
            <article className="rounded-2xl border border-sand bg-linen p-5 sm:p-7">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-taupe">
                Generic Market Brands
              </p>
              <ul className="mt-5 space-y-3 text-sm text-mocha">
                {comparisonPoints.map((point) => (
                  <li key={point.topic} className="rounded-xl bg-cream px-4 py-3">
                    <span className="font-medium text-espresso">{point.topic}:</span>{" "}
                    {point.generic}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>

          <Reveal delay={80}>
            <article className="rounded-2xl border border-terracotta/20 bg-espresso p-5 text-linen shadow-lg shadow-espresso/10 sm:p-7">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-saffron">
                Kalpasi Masala
              </p>
              <ul className="mt-5 space-y-3 text-sm text-cream/95">
                {comparisonPoints.map((point) => (
                  <li key={point.topic} className="rounded-xl bg-linen/10 px-4 py-3">
                    <span className="font-medium text-sand">{point.topic}:</span>{" "}
                    {point.kalpasi}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function QualityProcess() {
  return (
    <section className="section-padding border-y border-sand bg-linen">
      <div className="mx-auto max-w-6xl">
        <Reveal className="text-center">
          <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-gold-muted sm:text-xs sm:tracking-[0.35em]">
            Craftsmanship
          </p>
          <h2 className="mt-3 font-serif text-3xl font-medium text-espresso sm:mt-4 sm:text-4xl md:text-5xl">
            Our Quality Process
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 lg:grid-cols-5">
          {qualityProcess.map((step, idx) => (
            <Reveal key={step.title} delay={idx * 60}>
              <article className="h-full rounded-2xl border border-sand bg-cream p-5 transition-premium hover:border-terracotta/35 sm:p-6">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-terracotta/30 bg-linen font-serif text-sm text-terracotta">
                  {step.icon}
                </div>
                <h3 className="mt-4 font-serif text-xl text-espresso">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-taupe">
                  {step.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function WholesalePartnerships() {
  return (
    <section className="section-padding bg-cream">
      <div className="mx-auto max-w-6xl">
        <Reveal className="text-center">
          <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-gold-muted sm:text-xs sm:tracking-[0.35em]">
            Business
          </p>
          <h2 className="mt-3 font-serif text-3xl font-medium text-espresso sm:mt-4 sm:text-4xl md:text-5xl">
            Wholesale & Partnership
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-5 sm:mt-12 sm:grid-cols-2 lg:grid-cols-4">
          {wholesaleCards.map((card, idx) => (
            <Reveal key={card.title} delay={idx * 70}>
              <article className="flex h-full flex-col rounded-2xl border border-sand bg-linen p-5 sm:p-6">
                <h3 className="font-serif text-2xl text-espresso">{card.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-taupe">
                  {card.description}
                </p>
                <WhatsAppLink
                  href={getWholesaleWhatsAppUrl()}
                  className="btn-premium mt-5 inline-flex min-h-11 items-center justify-center rounded-full border border-espresso/20 px-5 py-2.5 text-xs font-medium uppercase tracking-wider text-espresso hover:border-terracotta/40 hover:bg-cream"
                >
                  Enquire now
                </WhatsAppLink>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyPartner() {
  return (
    <section className="section-padding border-y border-sand bg-linen">
      <div className="mx-auto max-w-6xl">
        <Reveal className="text-center">
          <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-gold-muted sm:text-xs sm:tracking-[0.35em]">
            Partnership Benefits
          </p>
          <h2 className="mt-3 font-serif text-3xl font-medium text-espresso sm:mt-4 sm:text-4xl md:text-5xl">
            Why Partner With Kalpasi Masala
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-3 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3">
          {partnerBenefits.map((benefit, idx) => (
            <Reveal key={benefit} delay={idx * 50}>
              <div className="rounded-xl border border-sand bg-cream px-4 py-4 text-sm text-mocha sm:px-5">
                <span className="mr-2 text-terracotta">•</span>
                {benefit}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  return (
    <section className="section-padding bg-cream">
      <div className="mx-auto max-w-4xl">
        <Reveal className="text-center">
          <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-gold-muted sm:text-xs sm:tracking-[0.35em]">
            FAQ
          </p>
          <h2 className="mt-3 font-serif text-3xl font-medium text-espresso sm:mt-4 sm:text-4xl md:text-5xl">
            Frequently asked questions
          </h2>
        </Reveal>

        <div className="mt-8 space-y-3 sm:mt-10">
          {faqItems.map((item, idx) => (
            <Reveal key={item.question} delay={idx * 40}>
              <details className="group rounded-xl border border-sand bg-linen px-4 py-3 sm:px-5">
                <summary className="cursor-pointer list-none pr-8 text-sm font-medium text-espresso marker:content-none sm:text-base">
                  {item.question}
                  <span className="float-right text-taupe transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-taupe">{item.answer}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default async function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: structuredDataScriptHtml(getWebsiteStructuredData()),
        }}
      />
      <Header />
      <main className="overflow-x-hidden">
        <div className={HEADER_OFFSET_CLASS}>
          <HeroCarousel />
        </div>
        <ProductShowcase />
        <OrderOnline />
        <TestimonialsSection />
        <About />
        <BrandComparison />
        <QualityProcess />
        <WholesalePartnerships />
        <WhyPartner />
        <FAQSection />
      </main>
      <SiteFooter />
      <WhatsAppFloat />
    </>
  );
}
