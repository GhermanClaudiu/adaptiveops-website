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
    "operational excellence Romania",
    "consultanta operational excellence",
    "equipment management system",
    "quality management software",
    "manufacturing digitalization",
    "lean manufacturing training",
    "lean manufacturing Romania",
    "industrial coaching",
    "production management",
    "ECO platform",
    "CMMS software",
    "ISO 9001 quality management",
    "ISO 55000 equipment management",
    "Toyota Kata coaching",
    "daily management system",
    "automotive manufacturing consulting",
    "Tier 1 supplier operational excellence",
    "OEE improvement manufacturing",
    "scrap reduction automotive",
    "plant manager coaching",
    "operations director consulting",
    "manufacturing performance management",
    "on-premise manufacturing software",
    "ECO Platform EMS QMS OMS",
    "Gherman Claudiu operational excellence",
  ],
  authors: [{ name: "Gherman Claudiu", url: "https://www.adaptiveops.eu/about" }],
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
    email: "noreply@adaptiveops.eu",
    description:
      "AdaptiveOps provides operational excellence consulting, industrial management systems, training and coaching for manufacturing and automotive organizations across Europe. Founded by Gherman Claudiu, Regional Operational Excellence Manager with 20+ years at Lear, Leoni and Valeo — with proven results: €3.2M savings, 51% scrap reduction, 30% OEE improvement across 8 factories.",
    foundingDate: "2024",
    founder: {
      "@type": "Person",
      name: "Gherman Claudiu Cristian",
      jobTitle: "Founder & Principal Consultant — Regional Operational Excellence Manager",
      url: "https://www.adaptiveops.eu/about",
      sameAs: [
        "https://www.linkedin.com/in/gherman-claudiu",
      ],
      knowsAbout: [
        "Operational Excellence",
        "Lean Manufacturing",
        "Toyota Kata",
        "OEE Improvement",
        "Scrap Reduction",
        "Quality Management Systems",
        "Equipment Management",
        "Daily Management Systems",
        "Shop-floor Coaching",
        "Automotive Manufacturing",
      ],
    },
    areaServed: [
      {
        "@type": "Country",
        name: "Romania",
      },
      {
        "@type": "Continent",
        name: "Europe",
      },
    ],
    knowsAbout: [
      "Operational Excellence",
      "OEE Improvement",
      "Lean Manufacturing",
      "Quality Management Systems",
      "Equipment Management Systems",
      "Continuous Improvement",
      "Industrial Coaching",
      "Manufacturing Performance Management",
      "Toyota Kata",
      "Digital Transformation in Manufacturing",
      "Daily Management System",
      "Automotive Tier-1 and Tier-2 Manufacturing",
      "CMMS Software",
      "ISO 9001",
      "ISO 55000",
      "ISO 45001",
      "Scrap Reduction",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      url: "https://www.adaptiveops.eu/contact",
      availableLanguage: ["English", "Romanian"],
    },
    sameAs: [
      "https://www.linkedin.com/company/adaptiveops",
      "https://www.linkedin.com/in/gherman-claudiu",
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
          text: "AdaptiveOps is a consultancy that helps industrial and automotive manufacturing organizations achieve operational excellence through digital management systems, practical training and hands-on shop-floor coaching. It was founded by Gherman Claudiu, a Regional Operational Excellence Manager with 20+ years of experience at Lear Corporation, Leoni and Valeo, who delivered €3.2M in savings, 51% scrap reduction and 30% OEE improvement across 8 factories.",
        },
      },
      {
        "@type": "Question",
        name: "What is the ECO Platform?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "ECO is an integrated operational management platform built on ISO Annex L with 6 modules: EMS (Equipment Management, ISO 55000), QMS (Quality Management, ISO 9001), MMS (Material Management, DDMRP), PMS (People Management, ISO 45001), OMS (Operations Management, Lean/TPS) and CIS (Continuous Improvement, Toyota Kata). It is deployed on-premise — your data stays on your servers. The EMS module is already live at its first client managing 161 equipment assets.",
        },
      },
      {
        "@type": "Question",
        name: "How much does the ECO Platform cost?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The standard price is €15,000 per module (perpetual licence — no annual fee). Founding Partners who apply early get access at €6,500 per module — a saving of €8,500 per module. This price includes initial setup, data population, user training and 5–6 months of free support. Monthly maintenance after the support period is €100/month. There is no lock-in: you can exit at any time with no penalties.",
        },
      },
      {
        "@type": "Question",
        name: "How is ECO Platform different from a traditional ERP like SAP or Oracle?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "ERP systems (SAP, Oracle, Microsoft Dynamics) focus on transactional data — procurement, finance, inventory accounting. ECO Platform focuses on operational execution: daily management, OEE tracking, calibration, problem solving and continuous improvement on the shop floor. ECO is faster to deploy, significantly cheaper, does not require SAP consultants to configure, and is designed specifically for operational excellence in manufacturing — not for finance teams.",
        },
      },
      {
        "@type": "Question",
        name: "How is ECO Platform different from a traditional CMMS like Fiix or UpKeep?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Traditional CMMS tools like Fiix, UpKeep or eMaint focus only on maintenance work orders. ECO's EMS module covers equipment management end-to-end — asset registry, preventive maintenance, calibration, spare parts, condition monitoring and KPIs — and it connects to the other 5 modules on the same platform. You get one system where maintenance data is linked to quality, production and people data, not siloed in a separate tool.",
        },
      },
      {
        "@type": "Question",
        name: "What problems does AdaptiveOps solve?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "AdaptiveOps solves operational problems common in automotive and manufacturing plants: high scrap rates and quality escapes, poor OEE (below 60%), equipment breakdowns due to reactive maintenance, inconsistent daily management routines, ISO audit failures, missing traceability for calibration and maintenance, and lack of structured continuous improvement. The company has proven results: 51% scrap reduction, 30% OEE improvement and €3.2M savings across 8 factories.",
        },
      },
      {
        "@type": "Question",
        name: "What industries does AdaptiveOps serve?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "AdaptiveOps primarily serves automotive Tier-1 and Tier-2 suppliers and manufacturing organizations across Romania and Europe. Typical clients are Plant Managers, Operations Directors and HR Directors who want to build sustainable operational systems and reduce waste without generic management theory.",
        },
      },
      {
        "@type": "Question",
        name: "What services does AdaptiveOps offer?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "AdaptiveOps offers three main services: (1) Digital Solutions — the ECO Platform software (EMS, QMS, MMS, PMS, OMS, CIS) deployed on-premise; (2) Training programs — 8 programmes covering Operational Excellence, Lean Manufacturing, Daily Management, Problem Solving, Quality Management, Equipment Management, Continuous Improvement and Leadership Coaching; (3) Shop-floor Coaching — 5 programmes to help leadership teams implement and sustain operational systems.",
        },
      },
      {
        "@type": "Question",
        name: "Can I start with just one module?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. ECO is modular by design. You can start with a single system like EMS or QMS and add more modules as your organization grows. Each system has Tier 1 (core) and Tier 2 (advanced) modules, so you can also grow within a system. The most common starting point is EMS — already live at our first client.",
        },
      },
      {
        "@type": "Question",
        name: "Is the ECO Platform cloud-based or on-premise?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "ECO Platform is deployed on-premise, on your own servers. Your operational data never leaves your facility. There is no mandatory cloud subscription, no SaaS fee and no dependency on internet connectivity for day-to-day use. This is particularly important for automotive plants with strict data governance requirements.",
        },
      },
    ],
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "ECO Platform",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web, On-Premise",
    url: "https://www.adaptiveops.eu/solutions",
    description:
      "ECO Platform is an integrated operational management system for manufacturing and automotive organizations. It includes 6 modules: EMS (Equipment Management), QMS (Quality Management), MMS (Material Management), PMS (People Management), OMS (Operations Management) and CIS (Continuous Improvement). Built on ISO Annex L. Deployed on-premise.",
    offers: {
      "@type": "Offer",
      price: "6500",
      priceCurrency: "EUR",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: "6500",
        priceCurrency: "EUR",
        unitText: "per module (Founding Partner price, perpetual licence)",
        referenceQuantity: {
          "@type": "QuantitativeValue",
          value: "1",
          unitText: "module",
        },
      },
      description:
        "Founding Partner price: €6,500 per module (perpetual licence). Standard price €15,000/module after cohort closes. Includes setup, training and 5–6 months support. No lock-in.",
      seller: {
        "@type": "Organization",
        name: "AdaptiveOps",
        url: "https://www.adaptiveops.eu",
      },
    },
    creator: {
      "@type": "Organization",
      name: "AdaptiveOps",
      url: "https://www.adaptiveops.eu",
    },
    featureList: [
      "Equipment asset registry and maintenance scheduling",
      "Calibration tracking and automated reports",
      "Quality document control and CAPA management",
      "Statistical Process Control (SPC)",
      "Material Kanban and traceability",
      "OEE tracking and performance dashboards",
      "Daily Management System",
      "ISO 9001, ISO 55000, ISO 45001 aligned",
      "On-premise deployment — data stays on your servers",
      "No annual licence fee — perpetual licence",
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
        <JsonLd data={softwareSchema} />
        <Header />
        <div className="pt-16">{children}</div>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
