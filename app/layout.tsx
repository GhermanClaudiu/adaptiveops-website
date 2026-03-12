import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CookieBanner from "@/components/shared/CookieBanner";
import JsonLd from "@/components/shared/JsonLd";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.adaptiveops.eu"),
  title: {
    default: "AdaptiveOps — Operational Excellence through Training, Coaching and Digital Solutions",
    template: "%s — AdaptiveOps",
  },
  description:
    "AdaptiveOps helps industrial organizations improve performance through practical training, operational coaching and digital management systems. Built from 20+ years on the shop floor.",
  keywords: [
    "operational excellence consulting",
    "equipment management system",
    "quality management software",
    "manufacturing digitalization",
    "lean manufacturing training",
    "industrial coaching",
    "production management",
    "ECO platform",
    "CMMS software",
    "ISO 9001 quality management",
    "Toyota Kata coaching",
    "daily management system",
  ],
  authors: [{ name: "AdaptiveOps", url: "https://www.adaptiveops.eu" }],
  creator: "AdaptiveOps",
  publisher: "AdaptiveOps",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.adaptiveops.eu",
    siteName: "AdaptiveOps",
    title: "AdaptiveOps — Operational Excellence through Training, Coaching and Digital Solutions",
    description:
      "AdaptiveOps helps industrial organizations improve performance through practical training, operational coaching and digital management systems.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AdaptiveOps — ECO Platform for Operational Excellence",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AdaptiveOps — Operational Excellence through Training, Coaching and Digital Solutions",
    description:
      "Practical training, operational coaching and digital management systems for manufacturing.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://www.adaptiveops.eu",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "AdaptiveOps",
    url: "https://www.adaptiveops.eu",
    logo: "https://www.adaptiveops.eu/logo.png",
    description:
      "AdaptiveOps provides operational excellence consulting, industrial management systems, training and coaching for manufacturing organizations across Europe.",
    foundingDate: "2024",
    founder: {
      "@type": "Person",
      name: "Gherman Claudiu Cristian",
      jobTitle: "Founder & Principal Consultant",
    },
    areaServed: {
      "@type": "Continent",
      name: "Europe",
    },
    knowsAbout: [
      "Operational Excellence",
      "OEE Improvement",
      "Lean Manufacturing",
      "Quality Management Systems",
      "Equipment Management",
      "Continuous Improvement",
      "Industrial Coaching",
      "Manufacturing Performance",
      "Toyota Kata",
      "Digital Transformation in Manufacturing",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      url: "https://www.adaptiveops.eu/contact",
    },
    sameAs: [
      "https://www.linkedin.com/company/adaptiveops",
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is AdaptiveOps?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "AdaptiveOps is a consultancy that helps industrial organizations achieve operational excellence through digital management systems, practical training and hands-on coaching.",
        },
      },
      {
        "@type": "Question",
        name: "What is the ECO Platform?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "ECO is an integrated operational management platform with 6 modules covering equipment, quality, materials, people, operations and continuous improvement — designed for manufacturing environments.",
        },
      },
      {
        "@type": "Question",
        name: "What industries does AdaptiveOps serve?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "AdaptiveOps primarily serves automotive and manufacturing organizations across Europe, helping them reduce scrap, improve OEE and build sustainable operational systems.",
        },
      },
      {
        "@type": "Question",
        name: "What services does AdaptiveOps offer?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "AdaptiveOps offers three main services: digital solutions (ECO Platform software), operational training programs (Lean, problem-solving, continuous improvement) and shop-floor coaching.",
        },
      },
      {
        "@type": "Question",
        name: "Can I start with just one module?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. ECO is modular by design. You can start with a single system like QMS or EMS and add more modules as your organization grows. Each system has Tier 1 (core) and Tier 2 (advanced) modules.",
        },
      },
      {
        "@type": "Question",
        name: "How is ECO different from a traditional ERP?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Unlike ERP systems that focus on transactional data, ECO focuses on operational execution — daily management, problem solving, performance monitoring, and continuous improvement. It bridges the gap between strategy and shop-floor reality.",
        },
      },
    ],
  };

  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
        <JsonLd data={organizationSchema} />
        <JsonLd data={faqSchema} />
        <Header />
        <div className="pt-16">{children}</div>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
