/** Online store URL (Shopify, Instamojo, your site, etc.). Falls back to #order on this page. */
export function getShopUrl(): string {
  const url = process.env.NEXT_PUBLIC_SHOP_URL?.trim();
  return url && url.length > 0 ? url : "/#order";
}

export function isExternalShopUrl(url: string): boolean {
  return url.startsWith("http://") || url.startsWith("https://");
}

/** Deep link for a product — appends slug when using an external store base URL. */
export function getProductShopUrl(productSlug: string): string {
  const base = getShopUrl();
  if (!isExternalShopUrl(base)) {
    return `/#order?product=${encodeURIComponent(productSlug)}`;
  }
  const separator = base.includes("?") ? "&" : "?";
  return `${base}${separator}product=${encodeURIComponent(productSlug)}`;
}
