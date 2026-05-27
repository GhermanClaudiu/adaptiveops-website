import type { Metadata } from "next";
import Link from "next/link";
import ECOPlatform from "@/components/solutions/ECOPlatform";
import ECOInAction from "@/components/solutions/ECOInAction";
import FoundingPartners from "@/components/solutions/FoundingPartners";
import LogoWall from "@/components/home/LogoWall";
import FadeUp from "@/components/shared/FadeUp";
import JsonLd from "@/components/shared/JsonLd";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "ECO Platform — 6 integrated management systems for equipment, quality, materials and people. Built for European manufacturing organizations.",
  alternates: { canonical: "/solutions" },
  openGraph: {
    title: "Solutions — ECO Platform — AdaptiveOps",
    description:
      "ECO Platform: one platform, six systems, full operational control for industrial organizations.",
    url: "/solutions",
  },
  twitter: {
    card: "summary_large_image",
    title: "Solutions — ECO Platform — AdaptiveOps",
    description:
      "6 integrated management systems for equipment, quality, materials and people. Built for manufacturing.",
    images: ["/og-image.png"],
  },
};

export default function SolutionsPage() {
  return (
    <main>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "ECO Platform",
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web",
          description:
            "ECO is an integrated operational management platform combining 6 modules: Equipment Management (EMS), Quality Management (QMS), Materials Management (MMS), People Management (PMS), Operations Management (OMS) and Continuous Improvement System (CIS).",
          offers: {
            "@type": "Offer",
            url: "https://www.adaptiveops.eu/solutions",
          },
          provider: {
            "@type": "Organization",
            name: "AdaptiveOps",
          },
          featureList: [
            "Quality Management (ISO 9001)",
            "Equipment Management (ISO 55000)",
            "Material Management (DDMRP / Kanban)",
            "People Management (ISO 45001)",
            "Operations Management (TPS / Lean)",
            "Continuous Improvement (Toyota Kata)",
          ],
        }}
      />
      {/* Enhanced Hero */}
      <section className="relative overflow-hidden bg-primary py-20">
        {/* Geometric grid pattern */}
        <div className="absolute inset-0 opacity-[0.05]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="gridSol" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#gridSol)" />
          </svg>
        </div>
        {/* Accent glow */}
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <div className="inline-flex items-center gap-2 mb-5 px-3 py-1.5 bg-secondary/15 border border-secondary/30 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
              <span className="text-xs font-bold tracking-widest uppercase text-secondary">
                EMS Live in Production &middot; 1 Client &middot; 5 Modules in Development
              </span>
            </div>
          </FadeUp>
          <FadeUp delay={50}>
            <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">
              See Every Quality Deviation, Equipment Alert and KPI Gap{" "}
              <span className="text-accent">on One Screen.</span>
            </h1>
          </FadeUp>
          <FadeUp delay={150}>
            <p className="mt-5 text-lg text-white/65 max-w-2xl leading-relaxed">
              ECO Platform &mdash; six management systems installed on your servers. The digital layer behind the 30% scrap cut and 51% efficiency lift proven across 8 Tier-1 plants. No cloud dependency. Air-gap compatible.
            </p>
          </FadeUp>
          <FadeUp delay={250}>
            <p className="mt-5 text-sm text-white/70 tracking-wide">
              Always paired with training &amp; coaching &mdash; software alone never moves the line.
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
              <a
                href="#in-action"
                className="inline-flex items-center gap-1.5 text-white/70 hover:text-white font-medium transition-colors text-sm"
              >
                See ECO in action &darr;
              </a>
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
                href="#systems"
                className="inline-flex items-center gap-2 text-white/65 hover:text-white/70 text-xs font-medium transition-colors"
              >
                Browse 6 modules &darr;
              </a>
              <span className="text-white/20">|</span>
              <a
                href="#why"
                className="inline-flex items-center gap-2 text-white/65 hover:text-white/70 text-xs font-medium transition-colors"
              >
                Why one platform &darr;
              </a>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Trust strip — reused from home for consistency */}
      <LogoWall />

      {/* See ECO Platform in Action — moved up: real dashboard screenshots are the strongest visual proof on this page */}
      <div id="in-action">
        <ECOInAction />
      </div>

      {/* Why One Platform? */}
      <section id="why" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <div className="text-center mb-12">
              <span className="inline-block text-xs font-bold tracking-widest uppercase text-accent mb-4">
                Why one platform
              </span>
              <h2 className="text-2xl md:text-4xl font-bold text-primary mb-4">
                Four outcomes &mdash; not four features.
              </h2>
              <p className="text-mid text-lg max-w-2xl mx-auto">
                Manufacturing platforms usually promise &ldquo;single source of truth.&rdquo; That&apos;s a SaaS slogan. Here&apos;s what ECO actually does on the floor:
              </p>
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Quality issue \u2192 equipment alert in 30 seconds",
                description:
                  "When QMS flags a defect, EMS automatically reviews the equipment that produced it. No more 3-hour root cause hunts across siloed tools.",
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
              },
              {
                title: "Audit-ready every shift",
                description:
                  "Every action, deviation and decision logged automatically. No more pre-audit Excel marathons. ISO traceability without the binder.",
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                  </svg>
                ),
              },
              {
                title: "Your data stays on your servers",
                description:
                  "On-premise installation. Air-gap compatible. Connects to Palantir, PowerBI, SAP via API or SQL export. No cloud vendor between you and your data.",
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 0 1-3-3m3 3a3 3 0 1 0 0 6h13.5a3 3 0 1 0 0-6m-16.5-3a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3m-19.5 0a4.5 4.5 0 0 1 .9-2.7L5.737 5.1a3.375 3.375 0 0 1 2.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 0 1 .9 2.7m0 0a3 3 0 0 1-3 3m0 3h.008v.008h-.008v-.008Zm0-6h.008v.008h-.008v-.008Zm-3 6h.008v.008h-.008v-.008Zm0-6h.008v.008h-.008v-.008Z" />
                  </svg>
                ),
              },
              {
                title: "Start with one module. Add others when ready.",
                description:
                  "Deploy EMS in week 1. Validate the value. Then add QMS, MMS, PMS, OMS, CIS when ready. No big-bang implementation. No vendor lock-in.",
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                  </svg>
                ),
              },
            ].map((benefit, index) => (
              <FadeUp key={benefit.title} delay={index * 80}>
                <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow h-full">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent mb-4">
                    {benefit.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-primary mb-2">{benefit.title}</h3>
                  <p className="text-sm text-mid leading-relaxed">{benefit.description}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* What is ECO? */}
      <section className="relative overflow-hidden bg-primary py-20">
        {/* Subtle grid */}
        <div className="absolute inset-0 opacity-[0.03]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="gridEco" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#gridEco)" />
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            {/* Left — acronym visual */}
            <FadeUp className="lg:w-5/12">
              <div className="flex flex-col items-center lg:items-start">
                {/* Big ECO letters — colored to match each initial in the phrase below */}
                <div className="flex items-baseline gap-1 mb-5">
                  <span className="text-5xl md:text-7xl font-black leading-none" style={{ color: "#2F80ED" }}>E</span>
                  <span className="text-5xl md:text-7xl font-black leading-none" style={{ color: "#10B981" }}>C</span>
                  <span className="text-5xl md:text-7xl font-black leading-none" style={{ color: "#2F80ED" }}>O</span>
                </div>
                {/* Full phrase — initials color-matched to letters above */}
                <p className="text-sm md:text-base font-semibold text-white/85 leading-snug text-center lg:text-left">
                  <span style={{ color: "#2F80ED" }}>E</span>xecution &amp;{" "}
                  <span style={{ color: "#10B981" }}>C</span>ontrol of{" "}
                  <span style={{ color: "#2F80ED" }}>O</span>perations
                </p>
                <div className="flex items-center gap-3 mt-5">
                  <div className="h-px w-12 bg-accent/30" />
                  <span className="text-xs font-bold uppercase tracking-widest text-accent/60">
                    Framework
                  </span>
                  <div className="h-px w-12 bg-accent/30" />
                </div>
              </div>
            </FadeUp>

            {/* Right — explanation */}
            <FadeUp delay={150} className="lg:w-7/12">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-5">
                  What is ECO?
                </h2>
                <p className="text-white/70 text-base md:text-lg leading-relaxed mb-4">
                  Most factories run their operational systems across spreadsheets, whiteboards,
                  and email threads. Performance data exists, but it&apos;s scattered. Problems get
                  logged, but never tracked to resolution. Improvement projects start, stall,
                  and disappear.
                </p>
                <p className="text-white/70 text-base md:text-lg leading-relaxed mb-4">
                  <strong className="text-white">ECO Platform</strong> is AdaptiveOps&apos; own digital solution — built specifically for
                  automotive and manufacturing operations. Six integrated systems in one place:
                  daily management, KPI tracking, problem solving, improvement planning, audit
                  management, and training records.
                </p>
                <p className="text-white/70 leading-relaxed mb-6">
                  Everything your plant needs to manage operational excellence — visible,
                  traceable, and connected.{" "}
                  <span className="text-accent font-semibold">EMS is live</span> — deployed
                  and running at our first client. Additional modules in active development.
                  Founding Partner access available for selected organizations.
                </p>

                {/* Three pillars of ECO */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    {
                      label: "Execute",
                      desc: "Implement work plans, assign resources, and produce deliverables",
                      icon: (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
                        </svg>
                      ),
                    },
                    {
                      label: "Control",
                      desc: "Monitor performance, ensure compliance, and manage deviations",
                      icon: (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                        </svg>
                      ),
                    },
                    {
                      label: "Improve",
                      desc: "Drive continuous improvement and maximize operational efficiency",
                      icon: (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
                        </svg>
                      ),
                    },
                  ].map((pillar) => (
                    <div
                      key={pillar.label}
                      className="bg-white/[0.05] border border-white/[0.08] rounded-xl p-4"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-accent">{pillar.icon}</span>
                        <span className="text-sm font-bold text-white">{pillar.label}</span>
                      </div>
                      <p className="text-xs text-white/65 leading-relaxed">{pillar.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ECO Platform */}
      <div id="systems">
        <ECOPlatform />
      </div>

      {/* Founding Partners Programme */}
      <FoundingPartners />

      {/* Management Layer Bridge */}
      <section className="py-20 bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Visual */}
            <FadeUp className="lg:w-1/2 w-full order-last lg:order-first">
              <div className="rounded-2xl border-2 border-dashed border-accent/30 bg-white p-6">
                <div className="text-center mb-4">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-accent">
                    The complete picture
                  </span>
                </div>

                {/* Digital layer */}
                <div className="rounded-xl bg-primary/5 border border-primary/10 p-4 mb-3">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-primary/40 mb-3 text-center">
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
                        className="flex flex-col items-center gap-1.5 py-2.5 rounded-lg"
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

                {/* Arrow */}
                <div className="flex justify-center my-2">
                  <div className="flex items-center gap-1.5 text-[10px] text-mid uppercase tracking-wider">
                    <svg className="w-4 h-4 text-accent rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
                    </svg>
                    <span>sustained by</span>
                    <svg className="w-4 h-4 text-accent rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
                    </svg>
                  </div>
                </div>

                {/* Management layer */}
                <div className="rounded-xl bg-accent/5 border border-accent/20 p-4">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-accent/60 mb-3 text-center">
                    Management Layer
                  </div>
                  <div className="flex justify-center gap-3">
                    {["Training", "Coaching", "Audit"].map((item) => (
                      <span
                        key={item}
                        className="px-3 py-1.5 rounded-full text-xs font-semibold bg-accent/10 text-accent border border-accent/20"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </FadeUp>

            {/* Text */}
            <FadeUp delay={150} className="lg:w-1/2">
              <div>
                <span className="inline-block text-xs font-bold tracking-widest uppercase text-accent mb-4">
                  Systems + People
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">
                  Digital systems need skilled people.
                </h2>
                <p className="text-mid text-lg leading-relaxed mb-4">
                  A platform is only as good as the people using it. That&apos;s why every ECO implementation
                  comes with training programs and coaching support to ensure your team can operate,
                  maintain, and improve the systems independently.
                </p>
                <p className="text-mid leading-relaxed mb-6">
                  Training provides the knowledge. Coaching ensures adoption. Together, they form the
                  Management Layer — the human foundation that makes digital transformation stick.
                </p>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-1.5 text-accent font-semibold text-sm hover:underline"
                >
                  Explore training &amp; coaching &rarr;
                </Link>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Enhanced CTA */}
      <section className="bg-accent py-16">
        <FadeUp>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">
              Ready to see ECO running on your servers?
            </h2>
            <p className="mt-4 text-lg text-white/85 max-w-xl mx-auto">
              One 30-minute call. We map your situation honestly and tell you whether ECO is the right fit &mdash; or what is.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-block bg-white text-accent font-semibold px-10 py-4 rounded-full hover:bg-gray-100 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-shadow"
              >
                Book Your Free 30-Min Diagnostic Call
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-1.5 text-white/70 hover:text-white font-medium transition-colors"
              >
                Explore our services &rarr;
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
