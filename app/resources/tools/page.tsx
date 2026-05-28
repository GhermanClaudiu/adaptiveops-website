import type { Metadata } from "next";
import Link from "next/link";
import FadeUp from "@/components/shared/FadeUp";
import NewsletterSignup from "@/components/shared/NewsletterSignup";

export const metadata: Metadata = {
  title: "Tools & Self-Assessments",
  description:
    "Run the same logic we use with clients — on your own plant. Free interactive self-assessments for operational excellence, including the Level 5 Targeting tool. Your numbers stay in your browser.",
  alternates: { canonical: "/resources/tools" },
  openGraph: {
    title: "Tools & Self-Assessments — AdaptiveOps",
    description:
      "Free interactive self-assessments that walk you through the same chains we use with clients — on your own numbers.",
    url: "/resources/tools",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tools & Self-Assessments — AdaptiveOps",
    description:
      "Run the same logic we use with clients — on your own plant. Free interactive tools.",
    images: ["/og-image.png"],
  },
};

export default function ResourcesToolsPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary py-20">
        <div className="absolute inset-0 opacity-[0.05]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="gridResourcesTools" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#gridResourcesTools)" />
          </svg>
        </div>
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <span className="inline-block text-xs font-bold tracking-widest uppercase text-accent mb-4">
              Interactive tools
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight max-w-3xl">
              Run the same logic we use with clients &mdash; on your own plant.
            </h1>
          </FadeUp>
          <FadeUp delay={100}>
            <p className="mt-5 text-lg text-white/70 max-w-2xl leading-relaxed">
              Practical instruments you can use today &mdash; interactive self-assessments, worksheets, and articles written from 20+ years across Valeo, Leoni and Lear Corporation. No theory, no jargon.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Tools */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <div className="mb-10">
              <span className="inline-block text-xs font-bold tracking-widest uppercase text-accent mb-3">
                Self-assessments
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-primary">
                Run the logic, not just the theory.
              </h2>
              <p className="mt-3 text-mid text-base md:text-lg max-w-2xl">
                Self-assessments that walk you through the same chains we use with clients &mdash; on your own numbers, in your own browser.
              </p>
            </div>
          </FadeUp>

          <FadeUp delay={100}>
            <Link
              href="/resources/level-5-targeting"
              className="group block bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Visual */}
                <div className="relative bg-primary p-8 lg:p-10 flex flex-col justify-center min-h-[240px]">
                  <div className="absolute -top-1/4 -right-10 w-64 h-64 bg-accent/10 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
                  <div className="relative">
                    <span className="inline-flex items-center gap-2 mb-4">
                      <span className="w-2 h-2 rounded-full bg-secondary" />
                      <span className="text-[11px] font-bold tracking-widest uppercase text-secondary">
                        Free · 15 minutes · No cloud upload
                      </span>
                    </span>
                    <p className="text-4xl lg:text-5xl font-black text-white leading-none">20%</p>
                    <p className="mt-2 text-sm text-white/70 max-w-xs">
                      of your processes drive the result. This tool finds which ones deserve Level 5.
                    </p>
                  </div>
                </div>
                {/* Content */}
                <div className="p-8 lg:p-10 flex flex-col justify-center">
                  <span className="text-xs font-semibold text-accent bg-accent/10 px-2.5 py-1 rounded-full self-start">
                    Self-Assessment
                  </span>
                  <h3 className="mt-4 text-2xl font-bold text-primary leading-tight group-hover:text-accent transition-colors">
                    Level 5 Targeting Self-Assessment
                  </h3>
                  <p className="mt-3 text-mid leading-relaxed">
                    Trace your plant&apos;s single financial goal down to the specific processes worth the maturity investment. From Plant Cost Rate to a ranked Level 5 candidate list, owned by named departments.
                  </p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-accent font-semibold text-sm group-hover:gap-2.5 transition-all">
                    Open the tool
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* Newsletter */}
      <NewsletterSignup variant="dark" />
    </main>
  );
}
