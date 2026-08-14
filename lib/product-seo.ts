import type { Metadata } from "next";
import type { Product } from "@/lib/products";
import { organizationId, siteName, siteUrl, structuredDataScriptHtml } from "@/lib/seo";

const productImageDimensions: Record<
  string,
  { width: number; height: number }
> = {
  "/images/products/garam-masala-front.png": { width: 768, height: 1024 },
  "/images/products/chicken-masala.png": { width: 819, height: 1024 },
  "/images/products/black-pepper-powder.png": { width: 819, height: 1024 },
  "/images/products/sabji-masala.png": { width: 768, height: 1024 },
};

export function getProductImageDimensions(imagePath: string) {
  return (
    productImageDimensions[imagePath] ?? {
      width: 768,
      height: 1024,
    }
  );
}

export function getProductSchemaName(product: Product) {
  return `Kalpasi ${product.name}`;
}

export function getProductCanonicalUrl(product: Product) {
  return `${siteUrl}/products/${product.slug}`;
}

export function getProductOpenGraphImage(product: Product) {
  const { width, height } = getProductImageDimensions(product.image);

  return {
    url: product.image,
    width,
    height,
    alt: `Kalpasi ${product.name}`,
  };
}

export function getProductOpenGraph(
  product: Product,
  title: string
): NonNullable<Metadata["openGraph"]> {
  const canonical = getProductCanonicalUrl(product);
  const image = getProductOpenGraphImage(product);

  return {
    siteName,
    type: "website",
    locale: "en_IN",
    title,
    description: product.shortDescription,
    url: canonical,
    images: [image],
  };
}

export function getProductTwitter(
  product: Product,
  title: string
): NonNullable<Metadata["twitter"]> {
  return {
    card: "summary_large_image",
    title,
    description: product.shortDescription,
    images: [product.image],
  };
}

export function getProductStructuredData(product: Product) {
  const canonical = getProductCanonicalUrl(product);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "@id": `${canonical}#product`,
        name: getProductSchemaName(product),
        image: `${siteUrl}${product.image}`,
        description: product.description,
        brand: {
          "@type": "Brand",
          name: siteName,
          alternateName: "Kalpasi Masala",
        },
        manufacturer: {
          "@id": organizationId,
        },
        url: canonical,
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${canonical}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: `${siteUrl}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Products",
            item: `${siteUrl}/products`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: getProductSchemaName(product),
            item: canonical,
          },
        ],
      },
    ],
  };
}

export function getProductStructuredDataScriptHtml(product: Product): string {
  return structuredDataScriptHtml(getProductStructuredData(product));
}
