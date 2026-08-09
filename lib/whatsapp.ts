const DEFAULT_WHATSAPP_NUMBER = "916306704158";

const CONTACT_MESSAGE =
  "Hi Kalpasi Masala! I'd like to get in touch. Please share more details.";

function digitsOnly(phone: string): string {
  return phone.replace(/\D/g, "");
}

export function getWhatsAppNumber(): string {
  const fromEnv = digitsOnly(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "");
  return fromEnv || DEFAULT_WHATSAPP_NUMBER;
}

function resolveWhatsAppHref(message: string): string {
  return `https://wa.me/${getWhatsAppNumber()}?text=${encodeURIComponent(message)}`;
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
