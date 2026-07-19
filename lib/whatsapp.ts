import { siteConfig } from "@/lib/site-config";

const CONTACT_MESSAGE =
  "Hi Kalpasi Masala! I'd like to get in touch. Please share more details.";

function digitsOnly(phone: string): string {
  return phone.replace(/\D/g, "");
}

export function getWhatsAppNumber(): string {
  return digitsOnly(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "");
}

function resolveWhatsAppHref(message: string): string {
  const configured = siteConfig.whatsappUrl.trim();
  if (configured) {
    try {
      const url = new URL(configured);
      if (!url.searchParams.has("text")) {
        url.searchParams.set("text", message);
      }
      return url.toString();
    } catch {
      return configured;
    }
  }

  const number = getWhatsAppNumber();
  if (!number) {
    return `https://wa.me/?text=${encodeURIComponent(message)}`;
  }
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function getContactWhatsAppUrl(
  message = CONTACT_MESSAGE
): string {
  return resolveWhatsAppHref(message);
}

export function getWholesaleWhatsAppUrl(): string {
  return getContactWhatsAppUrl(
    "Hi Kalpasi Masala! I'd like to enquire about wholesale."
  );
}

export function getDistributorWhatsAppUrl(): string {
  return getContactWhatsAppUrl(
    "Hi Kalpasi Masala! I'm interested in becoming a distributor."
  );
}

export function getProductInfoWhatsAppUrl(productName?: string): string {
  const productLine = productName
    ? ` about ${productName}`
    : "";
  return getContactWhatsAppUrl(
    `Hi Kalpasi Masala! I'd like to request product information${productLine}.`
  );
}
