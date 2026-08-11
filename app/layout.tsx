import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import {
  getOrganizationStructuredData,
  homeTitle,
  sharedOpenGraph,
  sharedTwitter,
  siteDescription,
  siteName,
  siteUrl,
  structuredDataScriptHtml,
} from "@/lib/seo";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const organizationStructuredData = getOrganizationStructuredData();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  applicationName: siteName,

  title: {
    default: homeTitle,
    template: `%s | ${siteName}`,
  },

  description: siteDescription,

  robots: {
    index: true,
    follow: true,
  },

  openGraph: sharedOpenGraph,

  twitter: sharedTwitter,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col overflow-x-hidden font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: structuredDataScriptHtml(organizationStructuredData),
          }}
        />
        {children}
      </body>
    </html>
  );
}
