import type { Metadata } from "next";

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.kalpasispices.com";

export const homeTitle = "Kalpasi Spices & Masala | Pure Indian Spices";

export const siteDescription =
  "Kalpasi Spices makes pure Indian spices and masala blends without artificial colours or preservatives. Explore Garam Masala, Chicken Masala and more.";

export const openGraphDescription =
  "Pure Indian spices and masala blends without artificial colours or preservatives. Explore Kalpasi Garam Masala, Chicken Masala and more.";

export const ogImagePath = "/images/products/garam-masala-front.png";

export const ogImage = {
  url: ogImagePath,
  width: 1200,
  height: 1200,
  alt: "Kalpasi Garam Masala premium pack",
};

export const sharedOpenGraph: NonNullable<Metadata["openGraph"]> = {
  siteName: "Kalpasi Spices",
  type: "website",
  locale: "en_IN",
  images: [ogImage],
};

export const sharedTwitter: NonNullable<Metadata["twitter"]> = {
  card: "summary_large_image",
  images: [ogImagePath],
};

type PageOpenGraphFields = Pick<
  NonNullable<Metadata["openGraph"]>,
  "title" | "description" | "url"
>;

type PageTwitterFields = Pick<
  NonNullable<Metadata["twitter"]>,
  "title" | "description"
>;

export function pageOpenGraph(
  page: PageOpenGraphFields
): NonNullable<Metadata["openGraph"]> {
  return {
    ...sharedOpenGraph,
    ...page,
    images: [ogImage],
  };
}

export function pageTwitter(
  page: PageTwitterFields
): NonNullable<Metadata["twitter"]> {
  return {
    ...sharedTwitter,
    ...page,
    card: "summary_large_image",
    images: [ogImagePath],
  };
}
