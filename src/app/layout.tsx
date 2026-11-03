import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "../../design-system/tokens.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sarvam design system",
  description: "Sarvam AI brand and design system, applied to Indus Cowork",
};

// Free stand-ins for Sarvam's licensed fonts (see design-system/typography.md):
// Gambetta (for Season Mix) + General Sans (for Matter) from Fontshare,
// DM Mono (for Matter Mono) + Noto Devanagari fallbacks from Google Fonts.
// Banners load the same two stylesheets, so web and banners render identically.
const FONTSHARE = "https://api.fontshare.com/v2/css?f[]=gambetta@300,400,500,600&f[]=general-sans@400,500,600&display=swap";
const GOOGLE =
  "https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Noto+Sans+Devanagari:wght@400;500&family=Noto+Serif+Devanagari:wght@300;400;500&display=swap";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="stylesheet" href={FONTSHARE} />
        <link rel="stylesheet" href={GOOGLE} />
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
