import type { Metadata } from "next";

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.kalpasispices.com";

export const siteName = "Kalpasi Spices";

export const siteAlternateNames = [
  "Kalpasi Masala",
  "Kalpasi Spices & Masala",
] as const;

export const organizationLogoPath = "/images/kalpasi-logo.png";

export const organizationId = `${siteUrl}/#organization`;

export const homeTitle = "Kalpasi Spices & Masala | Pure Indian Spices";

export const siteDescription =
  "Kalpasi Spices makes pure Indian spices and masala blends without artificial colours or preservatives. Explore Garam Masala, Chicken Masala and more.";

export const openGraphDescription =
  "Pure Indian spices and masala blends without artificial colours or preservatives. Explore Kalpasi Garam Masala, Chicken Masala and more.";

export const ogImagePath = "/images/products/garam-masala-front.png";

export const ogImage = {
  url: ogImagePath,
  width: 768,
  height: 1024,
  alt: "Kalpasi Garam Masala premium pack",
};

export const sharedOpenGraph: NonNullable<Metadata["openGraph"]> = {
  siteName,
  type: "website",
  locale: "en_IN",
  images: [ogImage],
};

export function getOrganizationStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": organizationId,
    name: siteName,
    alternateName: [...siteAlternateNames],
    url: `${siteUrl}/`,
    logo: {
      "@type": "ImageObject",
      url: `${siteUrl}${organizationLogoPath}`,
    },
    brand: {
      "@type": "Brand",
      name: siteName,
      alternateName: "Kalpasi Masala",
    },
    description: siteDescription,
  };
}

/** Homepage-only WebSite schema for Google's site-name feature. */
export function getWebsiteStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: siteName,
    alternateName: [...siteAlternateNames],
    url: `${siteUrl}/`,
    description: siteDescription,
    publisher: {
      "@id": organizationId,
    },
    inLanguage: "en-IN",
  };
}

export function structuredDataScriptHtml(data: object): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export const sharedTwitter: NonNullable<Metadata["twitter"]> = {
  card: "summary_large_image",
  images: [ogImagePath],
};

type PageOpenGraphFields = Pick<
  NonNullable<Metadata["openGraph"]>,
  "title" | "description" | "url"
> & {
  images?: NonNullable<Metadata["openGraph"]>["images"];
};

type PageTwitterFields = Pick<
  NonNullable<Metadata["twitter"]>,
  "title" | "description"
> & {
  images?: NonNullable<Metadata["twitter"]>["images"];
};

export function pageOpenGraph(
  page: PageOpenGraphFields
): NonNullable<Metadata["openGraph"]> {
  const { images, ...fields } = page;

  return {
    ...sharedOpenGraph,
    ...fields,
    images: images ?? [ogImage],
  };
}

export function pageTwitter(
  page: PageTwitterFields
): NonNullable<Metadata["twitter"]> {
  const { images, ...fields } = page;

  return {
    ...sharedTwitter,
    ...fields,
    card: "summary_large_image",
    images: images ?? [ogImagePath],
  };
}
