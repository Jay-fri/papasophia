import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PAPA SOPHIA — CODM Creator",
  description: "The official archive of PAPA SOPHIA."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
