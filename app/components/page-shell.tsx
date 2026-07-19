import { Header, HEADER_OFFSET_CLASS } from "@/app/components/header";
import { SiteFooter } from "@/app/components/site-footer";
import { WhatsAppFloat } from "@/app/components/whatsapp-float";

export function PageShell({
  children,
  withHeaderOffset = true,
}: {
  children: React.ReactNode;
  withHeaderOffset?: boolean;
}) {
  return (
    <>
      <Header />
      <main
        className={`overflow-x-hidden ${withHeaderOffset ? HEADER_OFFSET_CLASS : ""}`}
      >
        {children}
      </main>
      <SiteFooter />
      <WhatsAppFloat />
    </>
  );
}
