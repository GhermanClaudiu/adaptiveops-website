import type { Metadata } from "next";
import Link from "next/link";
import FadeUp from "@/components/shared/FadeUp";
import NewsletterSignup from "@/components/shared/NewsletterSignup";
import LogoWall from "@/components/home/LogoWall";
import ToolCard from "@/components/resources/ToolCard";
import { TOOLS } from "@/lib/content/tools";
import { getToolCounts, getToolTestimonials } from "@/lib/toolStats";

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

export default async function ResourcesToolsPage() {
  // Live social proof, fetched server-side (no CORS). Per-tool aggregates run
  // in parallel; all fetchers degrade to zeros on failure so the page is robust.
  const [counts, aggregates] = await Promise.all([
    getToolCounts(),
    Promise.all(TOOLS.map((t) => getToolTestimonials(t.slug))),
  ]);

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
              Free interactive self-assessments that walk you through the same chains we run with clients &mdash; on your own numbers, in your own browser. Built from 20+ years across Valeo, Leoni and Lear Corporation. No theory, no jargon.
            </p>
          </FadeUp>
          <FadeUp delay={200}>
            <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <Link
                href="/resources/level-5-targeting"
                className="inline-block bg-accent text-white font-semibold px-8 py-4 rounded-full text-base whitespace-nowrap transition-shadow hover:shadow-[0_0_24px_rgba(47,128,237,0.5)] active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
              >
                Open the Level 5 Targeting tool
              </Link>
              <span className="text-sm text-white/70">free &middot; 15 minutes &middot; no signup</span>
            </div>
          </FadeUp>
          <FadeUp delay={300}>
            <ul className="mt-6 space-y-2 text-sm text-white/70">
              <li className="flex items-start gap-2.5">
                <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <span>Runs entirely in your browser &mdash; your numbers never leave your device</span>
              </li>
              <li className="flex items-start gap-2.5">
                <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <span>No signup, no cloud upload, no sales call required</span>
              </li>
              <li className="flex items-start gap-2.5">
                <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <span>The same logic we run on Tier-1 floors &mdash; not a generic template</span>
              </li>
            </ul>
          </FadeUp>
        </div>
      </section>

      {/* Trust strip */}
      <LogoWall />

      {/* Tools */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <div className="mb-10">
              <span className="inline-block text-xs font-bold tracking-widest uppercase text-accent mb-3">
                Interactive tools
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-primary">
                Run the logic, not just the theory.
              </h2>
              <p className="mt-3 text-mid text-base md:text-lg max-w-2xl">
                Self-assessments and training games that put the methods in your hands &mdash; on your own numbers, in your own browser.
              </p>
            </div>
          </FadeUp>

          <div className="space-y-6">
            {TOOLS.map((tool, i) => {
              const agg = aggregates[i];
              return (
                <FadeUp key={tool.slug} delay={100 + i * 80}>
                  <ToolCard
                    tool={tool}
                    count={counts[tool.slug] ?? 0}
                    averageRating={agg.averageRating}
                    reviewCount={agg.count}
                  />
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bridge to the paid offer */}
      <section className="bg-light py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8 sm:p-10 flex flex-col sm:flex-row sm:items-center gap-6">
              <div className="flex-1">
                <h2 className="text-xl sm:text-2xl font-bold text-primary leading-snug">
                  Want this run on your plant &mdash; with your team, your data, your targets?
                </h2>
                <p className="mt-2 text-mid leading-relaxed">
                  The tool gives you the map. A free 30-minute diagnostic call gives you the route &mdash; a concrete next step you keep, even if you don&apos;t hire us.
                </p>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-blue-600 text-white font-semibold px-7 py-3.5 rounded-lg whitespace-nowrap transition-colors active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 self-start sm:self-auto"
              >
                Book a free diagnostic call
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Newsletter */}
      <NewsletterSignup variant="dark" />
    </main>
  );
}
