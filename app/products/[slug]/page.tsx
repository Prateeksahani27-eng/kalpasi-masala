import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/app/components/page-shell";
import { ProductGallery } from "@/app/components/product-gallery";
import { Reveal } from "@/app/components/reveal";
import {
  getAllProductSlugs,
  getProductBySlug,
  type Product,
} from "@/lib/products";
import {
  getProductCanonicalUrl,
  getProductOpenGraph,
  getProductSchemaName,
  getProductStructuredDataScriptHtml,
  getProductTwitter,
} from "@/lib/product-seo";

function productMetaDescription(product: Product) {
  const brandedName = getProductSchemaName(product);
  const description = product.shortDescription;

  return `${brandedName} is ${description.charAt(0).toLowerCase()}${description.slice(1)}`;
}
import {
  getContactWhatsAppUrl,
  getDistributorWhatsAppUrl,
  getProductInfoWhatsAppUrl,
} from "@/lib/whatsapp";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllProductSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product" };

  const socialTitle = `${product.name} | Kalpasi Spices`;
  const canonical = getProductCanonicalUrl(product);

  return {
    title: getProductSchemaName(product),
    description: productMetaDescription(product),
    alternates: {
      canonical,
    },
    openGraph: getProductOpenGraph(product, socialTitle),
    twitter: getProductTwitter(product, socialTitle),
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: getProductStructuredDataScriptHtml(product),
        }}
      />
      <section className="section-padding bg-cream">
        <div className="mx-auto max-w-6xl">
          <nav className="mb-8 text-xs uppercase tracking-widest text-taupe">
            <Link href="/products" className="hover:text-terracotta">
              Our Products
            </Link>
            <span className="mx-2">/</span>
            <span className="text-mocha">{product.name}</span>
          </nav>

          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal variant="scale">
              <ProductGallery images={product.gallery} />
            </Reveal>
            <Reveal delay={80}>
              <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-gold-muted">
                {product.note}
              </p>
              <h1 className="mt-2 font-serif text-4xl font-medium text-espresso md:text-5xl">
                {getProductSchemaName(product)}
              </h1>
              <p className="mt-4 text-sm leading-relaxed text-mocha sm:text-base">
                {product.description}
              </p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {product.highlights.map((h) => (
                  <li
                    key={h}
                    className="rounded-full border border-sand bg-linen px-3 py-1 text-xs text-mocha"
                  >
                    {h}
                  </li>
                ))}
              </ul>
              {product.packSizes?.length ? (
                <div className="mt-6">
                  <p className="text-xs font-medium uppercase tracking-widest text-mocha">
                    Pack sizes
                  </p>
                  <p className="mt-2 text-sm text-taupe">
                    {product.packSizes.join(" · ")}
                  </p>
                </div>
              ) : null}
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-padding border-t border-sand bg-linen">
        <div className="mx-auto max-w-6xl grid gap-12 md:grid-cols-2 md:gap-16">
          <Reveal>
            <h2 className="font-serif text-2xl text-espresso sm:text-3xl">
              Ingredients
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-mocha">
              {product.ingredients}
            </p>
          </Reveal>
          <Reveal delay={60}>
            <h2 className="font-serif text-2xl text-espresso sm:text-3xl">
              Usage
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-mocha">
              {product.usage}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-padding bg-cream">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <h2 className="font-serif text-2xl text-espresso sm:text-3xl">
              Brand story
            </h2>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-mocha sm:text-base">
              {product.brandStory}
            </p>
          </Reveal>
          <Reveal delay={80} className="mt-10">
            <h3 className="font-serif text-xl text-espresso">Benefits</h3>
            <ul className="mt-4 space-y-2 text-sm text-mocha">
              {product.benefits.map((b) => (
                <li key={b} className="flex gap-2">
                  <span className="text-terracotta">•</span>
                  {b}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={120} className="mt-8">
            <h3 className="font-serif text-xl text-espresso">Storage</h3>
            <p className="mt-3 text-sm leading-relaxed text-mocha">
              {product.storage}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-padding bg-espresso text-linen">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <h2 className="font-serif text-3xl font-medium sm:text-4xl">
              Get in touch
            </h2>
            <p className="mt-4 text-sm text-cream/90 sm:text-base">
              Questions about {product.name}? We&apos;re here to help — no cart, no checkout, just honest conversation.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
              <a
                href={getContactWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-premium rounded-full bg-linen px-8 py-3 text-xs font-medium uppercase tracking-wider text-espresso hover:bg-cream"
              >
                Contact Us
              </a>
              <a
                href={getDistributorWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-premium rounded-full border border-linen/40 px-8 py-3 text-xs font-medium uppercase tracking-wider text-linen hover:bg-linen/10"
              >
                Become a Distributor
              </a>
              <a
                href={getProductInfoWhatsAppUrl(product.name)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-premium rounded-full border border-linen/40 px-8 py-3 text-xs font-medium uppercase tracking-wider text-linen hover:bg-linen/10"
              >
                Request Product Information
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
