"use client";

import Image from "next/image";
import Link from "next/link";
import FadeUp from "@/components/shared/FadeUp";

const credibilityMarkers = [
  { value: "20+", label: "Years on the\nshop floor" },
  { value: "8", label: "Tier-1 & Tier-2\nplants delivered" },
  { value: "€3.2M", label: "Peak annual\nsavings" },
  { value: "3", label: "Tier-1 OEMs\n(Valeo · Leoni · Lear)" },
];

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden animate-hero-gradient bg-[length:200%_200%]"
      style={{
        backgroundImage:
          "linear-gradient(135deg, #0B1F3B 0%, #162D50 20%, #0B1F3B 40%, #1A3455 60%, #0F2744 80%, #0B1F3B 100%)",
      }}
    >
      {/* Accent glow orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-accent/[0.12] blur-[120px] animate-drift-slow" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[45%] h-[45%] rounded-full bg-[#8B5CF6]/[0.08] blur-[120px] animate-drift-slow-reverse" />
      </div>

      {/* Geometric grid pattern */}
      <div className="absolute inset-0 opacity-[0.04]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 lg:py-40">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-16 items-center">
          {/* Left: Text */}
          <div>
            <FadeUp>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1]">
                Cut Scrap <span className="text-accent">30%</span>.{" "}
                Lift Efficiency <span className="text-accent">51%</span>.
                <br />
                <span className="text-white/60 text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem]">
                  Proven across 8 Tier-1 plants &mdash; in 6 months, not 18.
                </span>
              </h1>
            </FadeUp>
            <FadeUp delay={150}>
              <p className="mt-6 text-lg md:text-xl text-white/55 leading-relaxed max-w-xl">
                The operational system behind &euro;3.2M in peak annual savings &mdash; installed on your servers, owned by your team. No consultants you&apos;ll never see again. No disruption to daily production.
              </p>
            </FadeUp>

            <FadeUp delay={300}>
              <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <Link
                  href="/contact"
                  className="inline-block bg-accent text-white font-semibold px-8 py-4 rounded-full text-base lg:text-lg whitespace-nowrap transition-shadow hover:shadow-[0_0_24px_rgba(47,128,237,0.5)] active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
                >
                  Book Your Free 30-Min Diagnostic Call
                </Link>
                <Link
                  href="/before-you-call"
                  className="inline-flex items-center gap-1.5 text-white/50 hover:text-white font-medium transition-colors"
                >
                  Read before you call &rarr;
                </Link>
              </div>
            </FadeUp>

            <FadeUp delay={400}>
              <ul className="mt-6 space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2.5">
                  <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  <span>30 minutes, free, no commitment</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  <span>Talk to the founder (20 yrs Tier-1), not a sales rep</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  <span>Concrete diagnosis you keep &mdash; even if you don&apos;t hire us</span>
                </li>
              </ul>
            </FadeUp>
          </div>

          {/* Right: Founder card (replaces dashboard mockup per Hormozi pattern — founder = strongest trust anchor for consulting) */}
          <FadeUp delay={300}>
            <div className="relative">
              <div className="bg-white/[0.07] backdrop-blur-sm border border-white/10 rounded-2xl p-7 lg:p-8 shadow-2xl">
                {/* Header — wraps on narrow screens */}
                <div className="flex items-center justify-between flex-wrap gap-x-3 gap-y-2 mb-6">
                  <span className="text-[10px] font-bold tracking-widest uppercase text-accent">
                    Who you&apos;ll be working with
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-green-400 whitespace-nowrap">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    Q3 2026 &middot; 2 spots
                  </span>
                </div>

                {/* Photo + name */}
                <div className="flex items-center gap-4 mb-6">
                  <Image
                    src="/ClaudiuPoza.png"
                    alt="Claudiu Gherman — Founder & Principal Consultant"
                    width={88}
                    height={88}
                    className="rounded-full border-2 border-accent/40 flex-shrink-0"
                    priority
                  />
                  <div>
                    <p className="text-white font-bold text-lg leading-tight">
                      Claudiu Gherman
                    </p>
                    <p className="text-xs text-white/50 mt-0.5">
                      Founder &amp; Principal Consultant
                    </p>
                    <Link
                      href="/about"
                      className="inline-flex items-center gap-1 mt-1.5 text-xs font-semibold text-accent hover:text-white transition-colors"
                    >
                      Read full story &rarr;
                    </Link>
                  </div>
                </div>

                {/* Pull quote */}
                <p className="text-sm text-white/75 italic leading-relaxed border-l-2 border-accent/40 pl-4 mb-6">
                  &ldquo;Every system we build comes from 20+ years on the shop floor &mdash; across Valeo, Leoni and Lear Corporation. We don&apos;t just advise. We implement.&rdquo;
                </p>

                {/* Credibility markers */}
                <div className="grid grid-cols-2 gap-x-4 gap-y-4 pt-5 border-t border-white/10">
                  {credibilityMarkers.map((m) => (
                    <div key={m.label}>
                      <p className="text-xl lg:text-2xl font-bold text-white leading-none">
                        {m.value}
                      </p>
                      <p className="mt-1 text-[10px] text-white/50 uppercase tracking-wider leading-tight whitespace-pre-line">
                        {m.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating LinkedIn verified badge */}
              <div className="absolute -bottom-4 -right-3 bg-white/[0.1] backdrop-blur-sm border border-white/10 rounded-xl px-4 py-3 shadow-xl">
                <div className="flex items-center gap-2.5">
                  <svg className="w-5 h-5 text-[#0A66C2]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  <div>
                    <p className="text-[11px] font-semibold text-white leading-tight">Verified on LinkedIn</p>
                    <p className="text-[9px] text-white/40">Cross-checkable profile</p>
                  </div>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
