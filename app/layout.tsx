import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CookieBanner from "@/components/shared/CookieBanner";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "AdaptiveOps — Operational Excellence through Training, Coaching and Digital Solutions",
    template: "%s — AdaptiveOps",
  },
  description:
    "AdaptiveOps helps industrial organizations improve performance through practical training, operational coaching and digital management systems.",
  keywords: [
    "operational excellence consulting",
    "equipment management system",
    "quality management software",
    "manufacturing digitalization",
    "lean manufacturing training",
    "industrial coaching",
    "production management",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "AdaptiveOps",
    title: "AdaptiveOps — Operational Excellence through Training, Coaching and Digital Solutions",
    description:
      "AdaptiveOps helps industrial organizations improve performance through practical training, operational coaching and digital management systems.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Header />
        <div className="pt-16">{children}</div>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
