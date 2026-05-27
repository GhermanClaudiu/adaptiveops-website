import Link from "next/link";
import FadeUp from "@/components/shared/FadeUp";

export default function ServicesPricing() {
  return (
    <section id="pricing" className="bg-light py-20 scroll-mt-20">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-12">

        {/* Header */}
        <FadeUp>
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-bold tracking-widest uppercase text-accent mb-4">
              Transparent Pricing
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              What does it cost?
            </h2>
            <p className="text-mid text-lg max-w-2xl mx-auto leading-relaxed">
              Most consultants hide their prices. We don&apos;t. You deserve to know
              before you call — so this conversation can start from the right place.
            </p>
          </div>
        </FadeUp>

        {/* Cards grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">

          {/* Training */}
          <FadeUp delay={100}>
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm h-full flex flex-col">
              <div className="mb-6">
                <span className="inline-block text-xs font-bold tracking-widest uppercase text-accent mb-3">
                  Training Programs
                </span>
                <div className="flex items-end gap-2 mb-1">
                  <span className="text-4xl font-bold text-primary">€700</span>
                  <span className="text-mid mb-1.5">/ day</span>
                </div>
                <p className="text-sm text-mid">Group of 12–15 participants</p>
              </div>

              <ul className="space-y-3 flex-1 mb-8">
                {[
                  "~€54 per participant per day",
                  "8 programs: Lean, OEE, Quality, Equipment, Problem Solving and more",
                  "Delivered on-site, in Romanian or English",
                  "Includes workbooks and practical exercises",
                  "Aligned with ECO Framework modules",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-dark">
                    <svg className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="pt-4 border-t border-gray-100">
                <p className="text-xs text-mid">
                  <span className="font-semibold text-dark">Volume:</span> €650/day for 3+ days booked together.
                </p>
              </div>
            </div>
          </FadeUp>

          {/* Implementation Workshop */}
          <FadeUp delay={200}>
            <div className="bg-primary rounded-2xl p-8 h-full flex flex-col relative overflow-hidden">
              {/* Subtle grid pattern */}
              <div className="absolute inset-0 opacity-[0.04]">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="pricingGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#pricingGrid)" />
                </svg>
              </div>

              <div className="relative mb-6">
                <span className="inline-block text-xs font-bold tracking-widest uppercase text-accent mb-3">
                  Implementation Workshops
                </span>
                <div className="flex items-end gap-2 mb-1">
                  <span className="text-4xl font-bold text-white">€1,000</span>
                  <span className="text-white/50 mb-1.5">/ day</span>
                </div>
                <p className="text-sm text-white/50">Results-focused, on-site delivery</p>
                <span className="inline-block mt-3 bg-accent text-white text-xs font-bold px-3 py-1 rounded-full">
                  Most popular
                </span>
              </div>

              <ul className="space-y-3 flex-1 mb-8 relative">
                {[
                  "Objective: implement a specific system or achieve a measurable result",
                  "Includes pre-session diagnostic and post-session follow-up",
                  "Combines training, hands-on work and coaching in one day",
                  "Suitable for Daily Management, OEE improvement, 5S deployment and more",
                  "Delivered directly on the shop floor, not in a conference room",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-white/80">
                    <svg className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="relative pt-4 border-t border-white/10">
                <p className="text-xs text-white/40">
                  <span className="font-semibold text-white/60">Includes:</span> Phone coaching support in the week following each session.
                </p>
              </div>
            </div>
          </FadeUp>

          {/* Coaching */}
          <FadeUp delay={300}>
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm h-full flex flex-col">
              <div className="mb-6">
                <span className="inline-block text-xs font-bold tracking-widest uppercase text-accent mb-3">
                  Operational Coaching
                </span>
                <div className="flex items-end gap-2 mb-1">
                  <span className="text-4xl font-bold text-primary">€120</span>
                  <span className="text-mid mb-1.5">/ hour</span>
                </div>
                <p className="text-sm text-mid">Individual — phone or video</p>
              </div>

              <ul className="space-y-3 flex-1 mb-6">
                {[
                  "5 coaching programs: Daily Management, Equipment, Lean Leadership and more",
                  "Structured sessions with clear objectives and accountability",
                  "Direct access to a practitioner — not a junior consultant",
                  "Available for Plant Managers, Operations Directors, Team Leaders",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-dark">
                    <svg className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>

              {/* Coaching packages */}
              <div className="space-y-2 mb-6">
                <p className="text-xs font-bold uppercase tracking-wider text-mid mb-3">Session packages</p>
                <div className="flex items-center justify-between bg-light rounded-lg px-4 py-2.5">
                  <span className="text-sm text-dark font-medium">5 sessions</span>
                  <div className="text-right">
                    <span className="text-sm font-bold text-primary">€550</span>
                    <span className="text-xs text-mid ml-1">save €50</span>
                  </div>
                </div>
                <div className="flex items-center justify-between bg-light rounded-lg px-4 py-2.5">
                  <span className="text-sm text-dark font-medium">10 sessions</span>
                  <div className="text-right">
                    <span className="text-sm font-bold text-primary">€1,000</span>
                    <span className="text-xs text-mid ml-1">save €200</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <p className="text-xs text-mid">
                  <span className="font-semibold text-dark">Group coaching</span> (2–4 managers from the same plant): €180/hour.
                </p>
              </div>
            </div>
          </FadeUp>
        </div>

        {/* Bottom note */}
        <FadeUp delay={400}>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-sm text-dark font-semibold mb-1">
                Not sure which option fits your situation?
              </p>
              <p className="text-sm text-mid">
                Book a free 30-minute diagnostic call. We&apos;ll figure out together what your plant actually needs — no sales pressure.
              </p>
            </div>
            <Link
              href="/contact"
              className="flex-shrink-0 bg-accent text-white font-semibold px-6 py-3 rounded-full hover:bg-blue-600 transition-colors text-sm whitespace-nowrap"
            >
              Book Free Call &rarr;
            </Link>
          </div>
        </FadeUp>

      </div>
    </section>
  );
}
