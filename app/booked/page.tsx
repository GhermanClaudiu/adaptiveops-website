import type { Metadata } from "next";
import Link from "next/link";
import FadeUp from "@/components/shared/FadeUp";

/**
 * Post-booking thank-you page.
 *
 * Set as the "Redirect after booking" URL on the meetergo 30-min diagnostic
 * event (Confirmation page tab). After a visitor books inside the embed,
 * meetergo sends them here instead of showing its own confirmation screen —
 * so the booking flow ends on an on-brand AdaptiveOps page and never exposes
 * meetergo's confirmation UI. The calendar invite + meeting link still arrive
 * by email (.ics), which is the reliable delivery mechanism.
 *
 * noindex: this is a transactional endpoint, not a page we want in search.
 */
export const metadata: Metadata = {
  title: "You're booked — AdaptiveOps",
  description:
    "Your free 30-minute diagnostic call is booked. Check your email for the invite and meeting link.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/booked" },
};

export default function BookedPage() {
  return (
    <main className="bg-light">
      <section className="relative overflow-hidden bg-primary py-20">
        <div className="absolute inset-0 opacity-[0.05]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="gridBooked" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#gridBooked)" />
          </svg>
        </div>
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeUp>
            <div className="mx-auto w-16 h-16 rounded-2xl bg-secondary/15 flex items-center justify-center">
              <svg className="w-9 h-9 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
          </FadeUp>
          <FadeUp delay={100}>
            <h1 className="mt-6 text-3xl md:text-5xl font-bold text-white leading-tight">
              You&apos;re booked. <span className="text-accent">Talk soon.</span>
            </h1>
          </FadeUp>
          <FadeUp delay={150}>
            <p className="mt-5 text-lg text-white/70 leading-relaxed">
              Your free 30-minute diagnostic call is confirmed. We&apos;ve emailed you the calendar
              invite and the meeting link &mdash; check your inbox (and the Promotions or Spam tab,
              just in case).
            </p>
          </FadeUp>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <div className="bg-white border border-gray-100 rounded-xl p-7 sm:p-9 shadow-[0_4px_14px_rgba(11,31,59,0.06)]">
              <h2 className="text-xs font-bold tracking-widest uppercase text-accent mb-5">
                What happens on the call
              </h2>
              <ul className="space-y-4">
                {[
                  "30 minutes, with the founder — 20 years on Tier-1 shop floors, not a sales rep.",
                  "We map your situation: current state, biggest operational pain, what you've already tried.",
                  "You leave with a concrete next step you keep — even if it's not us.",
                ].map((line) => (
                  <li key={line} className="flex items-start gap-3">
                    <svg className="w-5 h-5 mt-0.5 flex-shrink-0 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    <span className="text-primary leading-relaxed">{line}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-7 pt-6 border-t border-gray-100">
                <p className="text-sm text-mid leading-relaxed">
                  Didn&apos;t get the email within a few minutes? Check Promotions/Spam, or reach us
                  directly at{" "}
                  <a href="mailto:ghermanclaudiu77@gmail.com" className="font-semibold text-accent hover:text-blue-600 transition-colors">
                    ghermanclaudiu77@gmail.com
                  </a>{" "}
                  /{" "}
                  <a href="tel:+40740230178" className="font-semibold text-accent hover:text-blue-600 transition-colors">
                    +40 740 230 178
                  </a>
                  .
                </p>
              </div>
            </div>
          </FadeUp>

          <FadeUp delay={100}>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/resources/tools"
                className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-blue-600 text-white font-semibold px-7 py-3.5 rounded-lg transition-colors active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              >
                Prep with our free tools
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 border border-gray-300 text-primary font-semibold px-7 py-3.5 rounded-lg hover:bg-gray-50 transition-colors active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              >
                Back to home
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </main>
  );
}
