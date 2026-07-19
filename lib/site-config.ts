/**
 * Editable site links & emails — update via environment variables.
 * Prefix public URLs with NEXT_PUBLIC_ for client components.
 */

export const siteConfig = {
  instagramUrl:
    process.env.NEXT_PUBLIC_INSTAGRAM_URL ??
    process.env.INSTAGRAM_URL ??
    "https://instagram.com/yourusername",
  whatsappUrl:
    process.env.NEXT_PUBLIC_WHATSAPP_URL ??
    process.env.WHATSAPP_URL ??
    "",
  amazonStoreUrl:
    process.env.NEXT_PUBLIC_AMAZON_STORE_URL ??
    process.env.AMAZON_STORE_URL ??
    "https://amazon.in",
  flipkartStoreUrl:
    process.env.NEXT_PUBLIC_FLIPKART_STORE_URL ??
    process.env.FLIPKART_STORE_URL ??
    "https://flipkart.com",
  meeshoStoreUrl:
    process.env.NEXT_PUBLIC_MEESHO_STORE_URL ??
    process.env.MEESHO_STORE_URL ??
    "https://meesho.com",
  facebookUrl:
    process.env.NEXT_PUBLIC_FACEBOOK_URL ??
    process.env.FACEBOOK_URL ??
    "https://facebook.com/yourpage",
  newsletterReceiverEmail:
    process.env.NEWSLETTER_RECEIVER_EMAIL ?? "",
  adminSecret: process.env.ADMIN_SECRET ?? "",
} as const;
