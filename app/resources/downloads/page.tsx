import type { Metadata } from "next";
import Link from "next/link";
import FadeUp from "@/components/shared/FadeUp";
import NewsletterSignup from "@/components/shared/NewsletterSignup";

export const metadata: Metadata = {
  title: "Downloads",
  description:
    "Printable worksheets that turn operational-excellence methods into daily practice on the shop floor. The first set is in progress — sign up to be notified when they go live.",
  alternates: { canonical: "/resources/downloads" },
  openGraph: {
    title: "Downloads — AdaptiveOps",
    description:
      "Printable worksheets that turn the methods into daily practice. The first set is in progress.",
    url: "/resources/downloads",
  },
  twitter: {
    card: "summary_large_image",
    title: "Downloads — AdaptiveOps",
    description: "Printable worksheets for the shop floor — in progress.",
    images: ["/og-image.png"],
  },
};

export default function ResourcesDownloadsPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary py-20">
        <div className="absolute inset-0 opacity-[0.05]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="gridResourcesDownloads" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#gridResourcesDownloads)" />
          </svg>
        </div>
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <span className="inline-block text-xs font-bold tracking-widest uppercase text-accent mb-4">
              Downloads
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight max-w-3xl">
              Worksheets you can take to the floor.
            </h1>
          </FadeUp>
          <FadeUp delay={100}>
            <p className="mt-5 text-lg text-white/70 max-w-2xl leading-relaxed">
              Printable templates that turn the methods into daily practice &mdash; built from 20+ years on the shop floor. The first set is in progress.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* In-progress note */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8 sm:p-10 text-center">
              <div className="w-12 h-12 mx-auto rounded-xl bg-accent/10 flex items-center justify-center text-accent mb-5">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                </svg>
              </div>
              <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-mid mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                Worksheets in progress
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-primary leading-snug">
                The first printable worksheets are being built right now.
              </h2>
              <p className="mt-3 text-mid leading-relaxed max-w-xl mx-auto">
                We&apos;re putting together field-ready templates &mdash; 5 Why, Daily Management boards, maturity self-scoring &mdash; the same ones we use with clients. They&apos;ll land here as soon as they&apos;re tested on a real floor.
              </p>
              <p className="mt-2 text-sm text-mid">
                In the meantime, the interactive tool below is live and free to use.
              </p>
              <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href="/resources/level-5-targeting"
                  className="inline-flex items-center gap-2 bg-accent hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                >
                  Open the Level 5 Targeting tool
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-1.5 text-accent font-semibold px-4 py-3 rounded-lg hover:bg-accent/10 transition-colors active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                >
                  Read the articles
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Newsletter — be notified when worksheets land */}
      <NewsletterSignup variant="dark" />
    </main>
  );
}
