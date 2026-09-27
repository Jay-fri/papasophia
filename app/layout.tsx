import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark"
};

export const metadata: Metadata = {
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  title: "PAPA SOPHIA — Call of Duty Mobile Creator",
  description: "The official archive of PAPA SOPHIA. Call of Duty Mobile creator. Live, active, unfiltered.",
  applicationName: "PAPA SOPHIA",
  keywords: ["Papa Sophia", "Call of Duty Mobile", "CODM", "TikTok creator", "streamer"],
  authors: [{ name: "PAPA SOPHIA" }],
  alternates: siteUrl ? { canonical: "/" } : undefined,
  openGraph: {
    title: "PAPA SOPHIA — Call of Duty Mobile Creator",
    description: "Live, active, unfiltered.",
    type: "website",
    locale: "en_US"
  },
  twitter: {
    card: "summary_large_image",
    title: "PAPA SOPHIA — Call of Duty Mobile Creator",
    description: "Live, active, unfiltered."
  },
  robots: { index: true, follow: true }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
