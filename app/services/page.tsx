import type { Metadata } from "next";
import Link from "next/link";
import { trainingPrograms } from "@/lib/content/training";
import { coachingPrograms } from "@/lib/content/coaching";
import FadeUp from "@/components/shared/FadeUp";
import JsonLd from "@/components/shared/JsonLd";
import ServicesPricing from "@/components/services/ServicesPricing";
import LogoWall from "@/components/home/LogoWall";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Discover AdaptiveOps training, coaching and audit services for lean manufacturing, OEE improvement and operational excellence in industrial environments.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Services — Training & Coaching — AdaptiveOps",
    description:
      "Professional training and operational coaching for industrial organizations.",
    url: "/services",
  },
  twitter: {
    card: "summary_large_image",
    title: "Services — Training & Coaching — AdaptiveOps",
    description:
      "Training, coaching and audit services for lean manufacturing, OEE improvement and operational excellence.",
    images: ["/og-image.png"],
  },
};

const trainingSystemMap: Record<string, { abbr: string; color: string }[]> = {
  T1: [{ abbr: "EMS", color: "#E65100" }, { abbr: "PMS", color: "#2E7D32" }],
  T2: [{ abbr: "EMS", color: "#E65100" }],
  T3: [{ abbr: "EMS", color: "#E65100" }],
  T4: [{ abbr: "EMS", color: "#E65100" }, { abbr: "PMS", color: "#2E7D32" }],
  T5: [{ abbr: "CIS", color: "#00695C" }],
  T6: [{ abbr: "CIS", color: "#00695C" }, { abbr: "MMS", color: "#6A1B9A" }],
  T7: [{ abbr: "MMS", color: "#6A1B9A" }],
  T8: [{ abbr: "PMS", color: "#2E7D32" }, { abbr: "OMS", color: "#558B2F" }],
};

const coachingSystemMap: Record<string, { abbr: string; color: string }[]> = {
  C1: [{ abbr: "MMS", color: "#6A1B9A" }, { abbr: "PMS", color: "#2E7D32" }],
  C2: [{ abbr: "EMS", color: "#E65100" }, { abbr: "CIS", color: "#00695C" }],
  C3: [{ abbr: "PMS", color: "#2E7D32" }, { abbr: "OMS", color: "#558B2F" }],
  C4: [{ abbr: "EMS", color: "#E65100" }],
  C5: [{ abbr: "CIS", color: "#00695C" }],
};

export default function ServicesPage() {
  return (
    <main>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Operational Excellence Training",
          provider: { "@type": "Organization", name: "AdaptiveOps" },
          description:
            "Professional training programs for industrial teams covering Lean fundamentals, problem-solving, continuous improvement and leadership development.",
          areaServed: "Europe",
          serviceType: "Training",
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Operational Coaching",
          provider: { "@type": "Organization", name: "AdaptiveOps" },
          description:
            "Hands-on shop-floor coaching for process optimization, management systems implementation and team development in manufacturing environments.",
          areaServed: "Europe",
          serviceType: "Coaching",
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Digital Solutions — ECO Platform",
          provider: { "@type": "Organization", name: "AdaptiveOps" },
          description:
            "Integrated digital management platform with 6 modules covering equipment, quality, materials, people, operations and continuous improvement.",
          areaServed: "Europe",
          serviceType: "Digital Solutions",
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Audit Services",
          provider: { "@type": "Organization", name: "AdaptiveOps" },
          description:
            "Operational audits for manufacturing organizations covering lean maturity, management systems, OEE and process capability assessments.",
          areaServed: "Europe",
          serviceType: "Audit",
        }}
      />
      {/* Page Hero */}
      <section className="relative overflow-hidden bg-primary py-20">
        {/* Geometric grid pattern */}
        <div className="absolute inset-0 opacity-[0.05]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        {/* Accent glow */}
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">
              Training Alone Doesn&apos;t Stick.<br />
              <span className="text-accent">Here&apos;s What Does.</span>
            </h1>
          </FadeUp>
          <FadeUp delay={100}>
            <p className="mt-5 text-lg text-white/70 max-w-2xl leading-relaxed">
              8 training programs + 5 coaching tracks + ECO Platform &mdash; combined into one system that hits 30% scrap cut and 51% efficiency lift. Proven across 8 Tier-1 plants in Romania and Western Europe.
            </p>
          </FadeUp>
          <FadeUp delay={200}>
            <p className="mt-5 text-sm text-white/50 tracking-wide">
              Training builds the why &nbsp;&middot;&nbsp; Coaching ensures the how &nbsp;&middot;&nbsp; Digital makes it visible &nbsp;&middot;&nbsp; Together &mdash; not separately.
            </p>
          </FadeUp>
          <FadeUp delay={300}>
            <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <Link
                href="/contact"
                className="inline-block bg-accent text-white font-semibold px-8 py-4 rounded-full text-base whitespace-nowrap transition-shadow hover:shadow-[0_0_24px_rgba(47,128,237,0.5)] active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
              >
                Book Your Free 30-Min Diagnostic Call
              </Link>
              <Link
                href="/before-you-call"
                className="inline-flex items-center gap-1.5 text-white/50 hover:text-white font-medium transition-colors text-sm"
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
          <FadeUp delay={500}>
            <div className="mt-8 flex gap-3">
              <a
                href="#training"
                className="inline-flex items-center gap-2 text-white/40 hover:text-white/70 text-xs font-medium transition-colors"
              >
                Jump to training &darr;
              </a>
              <span className="text-white/20">|</span>
              <a
                href="#coaching"
                className="inline-flex items-center gap-2 text-white/40 hover:text-white/70 text-xs font-medium transition-colors"
              >
                Jump to coaching &darr;
              </a>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Trust strip — reused from home for consistency */}
      <LogoWall />

      {/* Start Here — 3-persona quick router */}
      <section className="bg-light py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <div className="text-center mb-10">
              <p className="text-xs font-bold tracking-widest uppercase text-accent mb-3">
                Not sure where to start?
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-primary">
                Pick your situation. We&apos;ll do the rest.
              </h2>
            </div>
          </FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                tag: "We're new to Lean",
                title: "Start with the foundations",
                detail: "Get your leadership team on a shared system before adding more initiatives.",
                cta: "T1 — Lean Manufacturing Fundamentals",
                href: "#training",
                accent: "#2F80ED",
              },
              {
                tag: "Standards don't hold on the floor",
                title: "Bring the system to the line",
                detail: "On-site coaching that turns procedures into actual daily behavior.",
                cta: "C2 — Production Team Coaching",
                href: "#coaching",
                accent: "#10B981",
              },
              {
                tag: "Not sure what's broken",
                title: "Map it in 30 minutes",
                detail: "We diagnose your situation honestly and tell you whether AdaptiveOps fits — or what does.",
                cta: "Book the diagnostic call",
                href: "/contact",
                accent: "#E65100",
              },
            ].map((row) => (
              <FadeUp key={row.tag}>
                <Link
                  href={row.href}
                  className="group bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md hover:border-gray-200 transition-shadow h-full flex flex-col"
                  style={{ borderTopColor: row.accent, borderTopWidth: "3px" }}
                >
                  <p
                    className="text-[10px] font-bold tracking-widest uppercase mb-3"
                    style={{ color: row.accent }}
                  >
                    {row.tag}
                  </p>
                  <h3 className="text-lg font-bold text-primary mb-2">{row.title}</h3>
                  <p className="text-sm text-mid leading-relaxed mb-5 flex-1">{row.detail}</p>
                  <span
                    className="text-sm font-semibold inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all"
                    style={{ color: row.accent }}
                  >
                    {row.cta} &rarr;
                  </span>
                </Link>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ECO Framework Context Section */}
      <section className="bg-white py-16 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">

            {/* Text column */}
            <FadeUp className="lg:w-1/2">
              <div>
                <span className="inline-block text-xs font-bold tracking-widest uppercase text-accent mb-4">
                  ECO Framework
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">
                  Why the three work together
                </h2>
                <p className="text-mid text-lg leading-relaxed mb-6">
                  Training builds knowledge. Coaching turns that knowledge into new habits on the shop
                  floor. The digital layer makes progress visible and keeps it from sliding back.
                  Each lever amplifies the others — which is why we never sell them in isolation.
                </p>
                <Link
                  href="/solutions"
                  className="inline-flex items-center gap-1.5 text-accent font-semibold text-sm hover:underline"
                >
                  Learn more about ECO &rarr;
                </Link>
              </div>
            </FadeUp>

            {/* Visual column — ECO concentric diagram */}
            <FadeUp delay={150} className="lg:w-1/2 w-full">
              <div className="relative w-full">
                {/* Outer layer: Management Layer */}
                <div className="rounded-2xl border-2 border-dashed border-accent/40 bg-accent/[0.03] p-5">
                  {/* Outer label */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-accent">
                      Management Layer
                    </span>
                    {/* Management tags */}
                    <div className="flex gap-2">
                      {[
                        { label: "Training" },
                        { label: "Coaching" },
                        { label: "Audit" },
                      ].map((tag) => (
                        <span
                          key={tag.label}
                          className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-accent/10 text-accent border border-accent/20"
                        >
                          {tag.label}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Arrow pointing inward */}
                  <div className="flex justify-center mb-2">
                    <div className="flex items-center gap-1.5 text-[10px] text-mid uppercase tracking-wider">
                      <span>enables &amp; sustains</span>
                      <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
                      </svg>
                    </div>
                  </div>

                  {/* Inner layer: Digital Solutions */}
                  <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                    <div className="text-[11px] font-bold uppercase tracking-widest text-primary/50 mb-3 text-center">
                      Digital Solutions Layer
                    </div>
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                      {[
                        { abbr: "EMS", color: "#E65100" },
                        { abbr: "QMS", color: "#1565C0" },
                        { abbr: "MMS", color: "#6A1B9A" },
                        { abbr: "PMS", color: "#2E7D32" },
                        { abbr: "OMS", color: "#558B2F" },
                        { abbr: "CIS", color: "#00695C" },
                      ].map((sys) => (
                        <div
                          key={sys.abbr}
                          className="flex flex-col items-center gap-1.5 py-2.5 px-1 rounded-lg"
                          style={{ backgroundColor: `${sys.color}12` }}
                        >
                          <span
                            className="w-2.5 h-2.5 rounded-full"
                            style={{ backgroundColor: sys.color }}
                          />
                          <span
                            className="text-[11px] font-bold tracking-wide"
                            style={{ color: sys.color }}
                          >
                            {sys.abbr}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </FadeUp>

          </div>
        </div>
      </section>

      {/* Training Section */}
      <section id="training" className="py-20 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342" />
                  </svg>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-primary">Your team solves the next problem without us.</h2>
              </div>
              <p className="text-mid text-lg max-w-3xl">
                Your engineers and managers learn by working on real problems in your plant &mdash; not slides, not theory. Each program connects directly with the coaching and digital layer that follows.
              </p>
            </div>
          </FadeUp>

          {/* Training format badges */}
          <FadeUp delay={100}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              {/* Workshop */}
              <div className="bg-light rounded-lg p-4 text-center hover:shadow-sm transition-shadow">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                  </svg>
                  <span className="font-semibold text-primary">Workshop</span>
                </div>
                <div className="text-sm text-mid">1 day (8h)</div>
              </div>

              {/* Multi-session */}
              <div className="bg-light rounded-lg p-4 text-center hover:shadow-sm transition-shadow">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75 2.25 12l4.179 2.25m0-4.5 5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0 4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0-5.571 3-5.571-3" />
                  </svg>
                  <span className="font-semibold text-primary">Multi-session</span>
                </div>
                <div className="text-sm text-mid">3–5 days</div>
              </div>

              {/* On-site */}
              <div className="bg-light rounded-lg p-4 text-center hover:shadow-sm transition-shadow">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                  </svg>
                  <span className="font-semibold text-primary">On-site</span>
                </div>
                <div className="text-sm text-mid">Variable</div>
              </div>

              {/* Online */}
              <div className="bg-light rounded-lg p-4 text-center hover:shadow-sm transition-shadow">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
                  </svg>
                  <span className="font-semibold text-primary">Online</span>
                </div>
                <div className="text-sm text-mid">2–4h sessions</div>
              </div>
            </div>
          </FadeUp>

          {/* Training cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {trainingPrograms.map((program, index) => (
              <FadeUp key={program.id} delay={index * 80}>
                <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
                  {/* Header: ID + meta + price teaser */}
                  <div className="flex items-center justify-between gap-3 mb-3 flex-wrap">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-accent bg-accent/10 px-2 py-1 rounded">
                        {program.id}
                      </span>
                      <span className="text-xs text-mid">{program.level} &middot; {program.duration}</span>
                    </div>
                    <span className="text-xs font-semibold text-mid">From &euro;700/day</span>
                  </div>

                  {/* Title + subtitle */}
                  <h3 className="text-xl font-bold text-primary mb-1.5 leading-tight">{program.title}</h3>
                  <p className="text-sm font-semibold text-accent mb-4 leading-snug">{program.subtitle}</p>

                  {/* Pain (hook) */}
                  <div className="bg-light border-l-2 border-mid/30 pl-3 py-2 mb-4">
                    <p className="text-xs text-mid leading-relaxed italic">{program.hook}</p>
                  </div>

                  {/* Audience */}
                  <p className="text-xs text-mid mb-4 leading-relaxed">
                    <span className="font-semibold text-primary/70 uppercase tracking-wider text-[10px]">For: </span>
                    {program.audience}
                  </p>

                  {/* Walk out — outcomes */}
                  <p className="text-[10px] font-bold text-primary/70 uppercase tracking-wider mb-2">What your team walks out with</p>
                  <ul className="space-y-2 mb-5 flex-1">
                    {program.walkOut.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-dark leading-relaxed">
                        <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* First result */}
                  <div className="bg-accent/[0.06] border border-accent/15 rounded-lg px-3 py-2.5 mb-4">
                    <p className="text-[10px] font-bold tracking-wider uppercase text-accent mb-0.5">First measurable improvement</p>
                    <p className="text-sm font-semibold text-primary leading-snug">{program.firstResult}</p>
                  </div>

                  {/* Footer: supports + CTA */}
                  <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
                    {trainingSystemMap[program.id] && (
                      <div className="flex flex-wrap gap-1.5">
                        <span className="text-[10px] text-mid uppercase tracking-wider mr-1">Supports</span>
                        {trainingSystemMap[program.id].map((sys) => (
                          <span
                            key={sys.abbr}
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold"
                            style={{ backgroundColor: `${sys.color}15`, color: sys.color }}
                          >
                            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: sys.color }} />
                            {sys.abbr}
                          </span>
                        ))}
                      </div>
                    )}
                    <Link
                      href={`/contact?service=${program.id}`}
                      className="text-xs font-semibold text-accent hover:text-blue-600 transition-colors whitespace-nowrap ml-auto"
                    >
                      Inquire About {program.id} &rarr;
                    </Link>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>


      {/* Coaching Section */}
      <section id="coaching" className="py-20 bg-light scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                  </svg>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-primary">The fix sticks after we leave.</h2>
              </div>
              <p className="text-mid text-lg max-w-3xl">
                Coaching is what turns training into reality. We work on your shop floor alongside your team &mdash; not from a conference room &mdash; until the new standard becomes the normal way of working.
              </p>
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coachingPrograms.map((program, index) => (
              <FadeUp key={program.id} delay={index * 80}>
                <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
                  {/* Header: ID + meta + price teaser */}
                  <div className="flex items-center justify-between gap-3 mb-3 flex-wrap">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-accent bg-accent/10 px-2 py-1 rounded">
                        {program.id}
                      </span>
                      <span className="text-xs text-mid">{program.format} &middot; {program.duration}</span>
                    </div>
                    <span className="text-xs font-semibold text-mid">From &euro;120/h</span>
                  </div>

                  {/* Title + subtitle */}
                  <h3 className="text-xl font-bold text-primary mb-1.5 leading-tight">{program.title}</h3>
                  <p className="text-sm font-semibold text-accent mb-4 leading-snug">{program.subtitle}</p>

                  {/* Pain (hook) */}
                  <div className="bg-light border-l-2 border-mid/30 pl-3 py-2 mb-4">
                    <p className="text-xs text-mid leading-relaxed italic">{program.hook}</p>
                  </div>

                  {/* Audience */}
                  <p className="text-xs text-mid mb-4 leading-relaxed">
                    <span className="font-semibold text-primary/70 uppercase tracking-wider text-[10px]">For: </span>
                    {program.audience}
                  </p>

                  {/* Walk out — outcomes */}
                  <p className="text-[10px] font-bold text-primary/70 uppercase tracking-wider mb-2">What you walk out with</p>
                  <ul className="space-y-2 mb-5 flex-1">
                    {program.walkOut.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-dark leading-relaxed">
                        <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* First result */}
                  <div className="bg-accent/[0.06] border border-accent/15 rounded-lg px-3 py-2.5 mb-4">
                    <p className="text-[10px] font-bold tracking-wider uppercase text-accent mb-0.5">First measurable improvement</p>
                    <p className="text-sm font-semibold text-primary leading-snug">{program.firstResult}</p>
                  </div>

                  {/* Footer: supports + CTA */}
                  <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
                    {coachingSystemMap[program.id] && (
                      <div className="flex flex-wrap gap-1.5">
                        <span className="text-[10px] text-mid uppercase tracking-wider mr-1">Supports</span>
                        {coachingSystemMap[program.id].map((sys) => (
                          <span
                            key={sys.abbr}
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold"
                            style={{ backgroundColor: `${sys.color}15`, color: sys.color }}
                          >
                            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: sys.color }} />
                            {sys.abbr}
                          </span>
                        ))}
                      </div>
                    )}
                    <Link
                      href={`/contact?service=${program.id}`}
                      className="text-xs font-semibold text-accent hover:text-blue-600 transition-colors whitespace-nowrap ml-auto"
                    >
                      Inquire About {program.id} &rarr;
                    </Link>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <ServicesPricing />

      {/* CTA */}
      <section className="bg-accent py-16">
        <FadeUp>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">
              Ready to stop the cycle of improvements that don&apos;t stick?
            </h2>
            <p className="mt-4 text-lg text-white/85 max-w-xl mx-auto">
              One 30-minute call. We map your situation honestly and design the right combination &mdash; training, coaching, digital, or all three working together.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-block bg-white text-accent font-semibold px-10 py-4 rounded-full hover:bg-gray-100 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-shadow"
              >
                Book Your Free 30-Min Diagnostic Call
              </Link>
              <Link
                href="/solutions"
                className="inline-flex items-center gap-1.5 text-white/70 hover:text-white font-medium transition-colors"
              >
                Explore digital solutions &rarr;
              </Link>
            </div>
            <ul className="mt-8 flex flex-col sm:flex-row sm:justify-center gap-3 sm:gap-8 text-sm text-white/85">
              <li className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <span>30 minutes, free, no commitment</span>
              </li>
              <li className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <span>Talk to the founder, not a sales rep</span>
              </li>
              <li className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <span>Concrete diagnosis you keep</span>
              </li>
            </ul>
          </div>
        </FadeUp>
      </section>
    </main>
  );
}
