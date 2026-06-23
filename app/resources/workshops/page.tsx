import type { Metadata } from "next";
import Link from "next/link";
import FadeUp from "@/components/shared/FadeUp";
import NewsletterSignup from "@/components/shared/NewsletterSignup";
import LogoWall from "@/components/home/LogoWall";
import WorkshopCard from "@/components/resources/WorkshopCard";
import { upcomingWorkshops, pastWorkshops } from "@/lib/content/workshops";

export const metadata: Metadata = {
  title: "Free Online Workshops",
  description:
    "Free live online workshops for manufacturing and operations teams — 5S, time & motion, problem solving with A3, and AI for beginners. Practical, no theory, no sales pitch.",
  alternates: { canonical: "/resources/workshops" },
  openGraph: {
    title: "Free Online Workshops — AdaptiveOps",
    description:
      "Free live online workshops for manufacturing and operations teams. Practical sessions built from 20+ years on real shop floors.",
    url: "/resources/workshops",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Online Workshops — AdaptiveOps",
    description:
      "Free, practical live workshops for manufacturing and operations teams.",
    images: ["/og-image.png"],
  },
};

export default function WorkshopsPage() {
  const upcoming = upcomingWorkshops();
  const past = pastWorkshops();

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary py-20">
        <div className="absolute inset-0 opacity-[0.05]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="gridWorkshops" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#gridWorkshops)" />
          </svg>
        </div>
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <span className="inline-block text-xs font-bold tracking-widest uppercase text-secondary mb-4">
              Free online workshops
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight max-w-3xl">
              An hour of the real methods &mdash; free, live, online.
            </h1>
          </FadeUp>
          <FadeUp delay={100}>
            <p className="mt-5 text-lg text-white/70 max-w-2xl leading-relaxed">
              Short, practical sessions on the methods we run with clients &mdash; 5S that
              sticks, time &amp; motion, problem solving with A3, AI for beginners. Built from
              20+ years across Valeo, Leoni and Lear Corporation. No theory dump, no sales pitch.
            </p>
          </FadeUp>
          <FadeUp delay={300}>
            <ul className="mt-8 space-y-2 text-sm text-white/70">
              {[
                "Live and online — join from the floor, the office, or home",
                "Free to attend — register, get the link, show up",
                "Practical methods you can use on your next shift, not academic theory",
              ].map((point) => (
                <li key={point} className="flex items-start gap-2.5">
                  <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </FadeUp>
        </div>
      </section>

      {/* Trust strip */}
      <LogoWall />

      {/* Upcoming workshops */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <div className="mb-10">
              <span className="inline-block text-xs font-bold tracking-widest uppercase text-secondary mb-3">
                Workshops
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-primary">
                Pick a topic. Reserve a free seat.
              </h2>
              <p className="mt-3 text-mid text-base md:text-lg max-w-2xl">
                Each workshop runs as a single live online session. Dates are announced per
                topic &mdash; register and you&apos;ll get the joining link and reminders by email.
              </p>
            </div>
          </FadeUp>

          <div className="space-y-6">
            {upcoming.map((workshop, i) => (
              <FadeUp key={workshop.slug} delay={100 + i * 80}>
                <WorkshopCard workshop={workshop} />
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Past workshops */}
      {past.length > 0 && (
        <section className="bg-light py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeUp>
              <div className="mb-8">
                <span className="inline-block text-xs font-bold tracking-widest uppercase text-mid mb-3">
                  Past workshops
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-primary">
                  Missed one? Catch the recap.
                </h2>
              </div>
            </FadeUp>
            <div className="space-y-6">
              {past.map((workshop, i) => (
                <FadeUp key={workshop.slug} delay={100 + i * 80}>
                  <WorkshopCard workshop={workshop} />
                </FadeUp>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bridge to the paid offer */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8 sm:p-10 flex flex-col sm:flex-row sm:items-center gap-6">
              <div className="flex-1">
                <h2 className="text-xl sm:text-2xl font-bold text-primary leading-snug">
                  Want this run with your own team, on your own line?
                </h2>
                <p className="mt-2 text-mid leading-relaxed">
                  The free workshop shows you the method. A free 30-minute diagnostic call shows
                  you how it applies to your plant &mdash; a concrete next step you keep, even if
                  you don&apos;t hire us.
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
      <NewsletterSignup
        variant="dark"
        title="Be first to know when a new workshop is scheduled."
        subtitle="New free workshops are announced to the list before anywhere else. One short email when a date goes live — nothing else."
      />
    </main>
  );
}
