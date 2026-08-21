import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "UOS Medya | 360 Derece Reklamcılık ve Dijital Pazarlama Ajansı",
  description:
    "UOS Medya; dijital pazarlama, video ve fotoğraf çekimi, drone çekimi, sosyal medya yönetimi ve reklamlarını tek çatı altında sunan 360 derece reklam ajansıdır.",
};

// Google Tag Manager Container ID
const GTM_ID = "GTM-5JZ8F9P5";

// GA4 Measurement ID — reference only. GA4 is NOT loaded directly via gtag.js
// here; it will be wired up as a "GA4 Configuration" tag inside the GTM
// container above (see .claude/skills/analytics/references/gtm-implementation.md).
// GA4_MEASUREMENT_ID = "G-HMGN94W5EZ"

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="tr"
      className={`${inter.variable} ${sora.variable} h-full antialiased dark`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        {/* GTM script uses beforeInteractive so Next.js always injects it
            into <head>, regardless of its position in the component tree —
            see next/dist/docs/01-app/03-api-reference/02-components/script.md */}
        <Script id="gtm-base" strategy="beforeInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
