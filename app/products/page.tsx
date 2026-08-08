import type { Metadata } from "next";
import { PageShell } from "@/app/components/page-shell";
import { ProductCard } from "@/app/components/product-card";
import { Reveal } from "@/app/components/reveal";
import { pageOpenGraph, pageTwitter, siteUrl } from "@/lib/seo";
import { products } from "@/lib/products";

const title = "Our Products | Kalpasi Spices";
const description =
  "Explore Kalpasi Spices' premium spice range — preservative-free blends ground in small batches for authentic Indian kitchens.";

export const metadata: Metadata = {
  title: "Our Products",
  description,
  alternates: {
    canonical: `${siteUrl}/products`,
  },
  openGraph: pageOpenGraph({
    title,
    description,
    url: `${siteUrl}/products`,
  }),
  twitter: pageTwitter({
    title,
    description,
  }),
};

export default function ProductsPage() {
  return (
    <PageShell>
      <section className="section-padding bg-espresso text-linen">
        <div className="mx-auto max-w-6xl text-center">
          <Reveal>
            <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-saffron sm:text-xs">
              Catalogue
            </p>
            <h1 className="mt-3 font-serif text-4xl font-medium sm:text-5xl md:text-6xl">
              Our Products
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-cream/90 sm:text-base">
              Premium masala packs crafted for purity, aroma, and trust — a showcase
              of honest Indian spices, not a checkout experience.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-padding bg-cream">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {products.map((product, index) => (
              <ProductCard
                key={product.slug}
                slug={product.slug}
                name={product.name}
                note={product.note}
                description={product.shortDescription}
                image={product.image}
                imageFit={product.imageFit}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
