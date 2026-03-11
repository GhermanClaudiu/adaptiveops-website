import type { Metadata } from "next";
import { Inter } from "next/font/google";
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
  metadataBase: new URL("https://adaptiveops.eu"),
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
  authors: [{ name: "AdaptiveOps", url: "https://adaptiveops.eu" }],
  creator: "AdaptiveOps",
  publisher: "AdaptiveOps",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://adaptiveops.eu",
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
    canonical: "https://adaptiveops.eu",
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
    url: "https://adaptiveops.eu",
    logo: "https://adaptiveops.eu/logo.png",
    description:
      "AdaptiveOps helps industrial organizations improve performance through practical training, operational coaching and digital management systems.",
    foundingDate: "2024",
    founder: {
      "@type": "Person",
      name: "Gherman Claudiu Cristian",
      jobTitle: "Founder & Principal Consultant",
    },
    areaServed: "Europe",
    knowsAbout: [
      "Operational Excellence",
      "Lean Manufacturing",
      "Quality Management Systems",
      "Equipment Management",
      "Toyota Kata",
      "Digital Transformation in Manufacturing",
    ],
    sameAs: [
      "https://www.linkedin.com/company/adaptiveops",
    ],
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "ECO Platform",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web, Windows",
    description:
      "ECO (Execution & Control of Operations) is an integrated digital platform with 6 management systems — QMS, EMS, MMS, PMS, OMS, CIS — covering quality, equipment, materials, people, operations, and continuous improvement.",
    offers: {
      "@type": "Offer",
      priceCurrency: "EUR",
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "EUR",
        description: "Custom pricing based on modules and deployment scope. Contact for a tailored proposal.",
      },
    },
    featureList: [
      "Quality Management (ISO 9001)",
      "Equipment Management (ISO 55000)",
      "Material Management (DDMRP / Kanban)",
      "People Management (ISO 45001)",
      "Operations Management (TPS / Lean)",
      "Continuous Improvement (Toyota Kata)",
      "Shared Kernel: Workflow Engine, Audit Trail, Reporting & Analytics, API Integration",
    ],
    author: {
      "@type": "Organization",
      name: "AdaptiveOps",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is the ECO Platform?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "ECO stands for Execution & Control of Operations. It is an integrated digital platform with 6 management systems (QMS, EMS, MMS, PMS, OMS, CIS) that connects quality, equipment, materials, people, operations, and continuous improvement into a single unified system.",
        },
      },
      {
        "@type": "Question",
        name: "Who is AdaptiveOps for?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "AdaptiveOps serves manufacturing and automotive companies in Europe that need practical training, operational coaching, and digital management systems. We work with organizations from small suppliers to Fortune 500 operations.",
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
        name: "Does AdaptiveOps provide training alongside digital solutions?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. AdaptiveOps integrates training, coaching, and digital systems into one framework. We believe tools without trained people fail, and training without digital systems loses momentum. The ECO approach combines all three.",
        },
      },
    ],
  };

  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <JsonLd data={organizationSchema} />
        <JsonLd data={softwareSchema} />
        <JsonLd data={faqSchema} />
        <Header />
        <div className="pt-16">{children}</div>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
