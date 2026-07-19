import { siteConfig } from "@/lib/site-config";
import { getContactWhatsAppUrl } from "@/lib/whatsapp";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7Zm10 2c1.66 0 3 1.34 3 3v10c0 1.66-1.34 3-3 3H7c-1.66 0-3-1.34-3-3V7c0-1.66 1.34-3 3-3h10ZM12 7.5c-2.48 0-4.5 2.02-4.5 4.5s2.02 4.5 4.5 4.5 4.5-2.02 4.5-4.5-2.02-4.5-4.5-4.5Zm0 7a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Zm4.75-8.1a1.1 1.1 0 1 0 0 2.2 1.1 1.1 0 0 0 0-2.2Z" />
    </svg>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function StoreIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path strokeLinecap="round" d="M4 7h16l-1.5 12H5.5L4 7z" />
      <path strokeLinecap="round" d="M9 7V6a3 3 0 0 1 6 0v1" />
    </svg>
  );
}

const iconLinkClass =
  "btn-premium group flex h-12 w-12 items-center justify-center rounded-full border border-sand bg-cream text-espresso transition-premium hover:border-terracotta/40 hover:bg-linen hover:scale-105 sm:h-14 sm:w-14";

type SocialLinksProps = {
  variant?: "icons" | "footer-buttons";
  showMarketplaces?: boolean;
};

export function SocialLinks({
  variant = "icons",
  showMarketplaces = true,
}: SocialLinksProps) {
  const whatsappHref =
    siteConfig.whatsappUrl.trim() || getContactWhatsAppUrl();

  const links = [
    {
      href: siteConfig.instagramUrl,
      label: "Instagram",
      icon: InstagramIcon,
    },
    { href: whatsappHref, label: "WhatsApp", icon: WhatsAppIcon },
    ...(showMarketplaces
      ? [
          { href: siteConfig.amazonStoreUrl, label: "Amazon Store", icon: StoreIcon },
          { href: siteConfig.flipkartStoreUrl, label: "Flipkart Store", icon: StoreIcon },
          { href: siteConfig.meeshoStoreUrl, label: "Meesho Store", icon: StoreIcon },
        ]
      : []),
  ];

  if (variant === "footer-buttons") {
    return (
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        {links.map(({ href, label, icon: Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-premium inline-flex items-center justify-center gap-2 rounded-full border border-sand bg-cream px-6 py-2.5 text-xs font-medium uppercase tracking-wider text-espresso hover:border-terracotta/40 hover:bg-linen sm:px-7"
            aria-label={label}
          >
            <Icon className="h-4 w-4" />
            {label.replace(" Store", "")}
          </a>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-3 sm:gap-4">
      {links.map(({ href, label, icon: Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className={iconLinkClass}
        >
          <Icon className="h-5 w-5 transition-premium group-hover:text-terracotta sm:h-6 sm:w-6" />
        </a>
      ))}
    </div>
  );
}
