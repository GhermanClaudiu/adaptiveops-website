import type { Metadata } from "next";
import Link from "next/link";
import ECOPlatform from "@/components/solutions/ECOPlatform";
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
            <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">
              One Platform. Six Systems.
              <br />
              <span className="text-accent">Full Operational Control.</span>
            </h1>
          </FadeUp>
          <FadeUp delay={100}>
            <p className="mt-5 text-lg text-white/60 max-w-2xl leading-relaxed">
              ECO Platform integrates quality, equipment, materials, people,
              operations and continuous improvement into a single digital core.
            </p>
          </FadeUp>
          <FadeUp delay={200}>
            <p className="mt-6 text-sm text-white/30 tracking-wide">
              6 Management Systems &nbsp;&middot;&nbsp; 40+ Modules &nbsp;&middot;&nbsp; 7 Industry Standards
            </p>
          </FadeUp>
          <FadeUp delay={300}>
            <div className="mt-8 flex gap-4">
              <a
                href="#systems"
                className="inline-flex items-center gap-2 text-white/70 hover:text-white border border-white/20 hover:border-white/40 px-5 py-2.5 rounded-full text-sm font-medium transition-colors"
              >
                Explore Systems <span>&darr;</span>
              </a>
              <a
                href="#why"
                className="inline-flex items-center gap-2 text-white/70 hover:text-white border border-white/20 hover:border-white/40 px-5 py-2.5 rounded-full text-sm font-medium transition-colors"
              >
                Why one platform? <span>&darr;</span>
              </a>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Why One Platform? */}
      <section id="why" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <div className="text-center mb-12">
              <span className="inline-block text-xs font-bold tracking-widest uppercase text-accent mb-4">
                The problem we solve
              </span>
              <h2 className="text-2xl md:text-4xl font-bold text-primary mb-4">
                Why one platform?
              </h2>
              <p className="text-mid text-lg max-w-2xl mx-auto">
                Most factories run operations on disconnected spreadsheets, legacy tools, and tribal knowledge.
                ECO replaces the chaos with structure.
              </p>
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Eliminate Data Silos",
                description:
                  "Systems that share data, context, and workflows. Quality issues automatically trigger equipment reviews.",
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                  </svg>
                ),
              },
              {
                title: "Single Source of Truth",
                description:
                  "One place for all operational data. Not 12 spreadsheets, 3 shared drives, and someone\u2019s notebook.",
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
                  </svg>
                ),
              },
              {
                title: "Cross-System Analytics",
                description:
                  "See connections between quality, equipment, and people performance in real-time dashboards.",
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
                  </svg>
                ),
              },
              {
                title: "Grow at Your Pace",
                description:
                  "Start with one system \u2014 EMS or QMS. Add others when ready. No big-bang implementation required.",
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
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
                <div className="flex items-baseline gap-1 mb-6">
                  {[
                    { letter: "E", word: "Execution", color: "#2F80ED" },
                    { letter: "C", word: "Control", color: "#10B981" },
                    { letter: "O", word: "Operations", color: "#2F80ED" },
                  ].map((item) => (
                    <div key={item.letter} className="flex flex-col items-center">
                      <span
                        className="text-5xl md:text-7xl font-black leading-none"
                        style={{ color: item.color }}
                      >
                        {item.letter}
                      </span>
                      <span className="text-[10px] md:text-xs font-semibold uppercase tracking-widest text-white/40 mt-2">
                        {item.word}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-3 mt-2">
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
                  ECO stands for <strong className="text-white">Execution &amp; Control of Operations</strong> —
                  the practice of turning operational plans into measurable results. It bridges the gap between
                  strategy and shop-floor reality by connecting people, materials, equipment, and processes
                  into one structured digital framework.
                </p>
                <p className="text-white/50 leading-relaxed mb-6">
                  Where traditional tools stop at planning, ECO focuses on what happens next: prioritizing tasks,
                  allocating resources, monitoring performance in real time, and managing deviations before they
                  become losses. Quality control, continuous improvement, and daily management are not separate
                  initiatives — they are built into the way work gets done.
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
                      <p className="text-xs text-white/40 leading-relaxed">{pillar.desc}</p>
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
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Ready to see ECO in action?
            </h2>
            <p className="mt-4 text-lg text-white/80 max-w-xl mx-auto">
              Book a demo and see how a unified platform transforms your operational performance.
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
                className="inline-flex items-center gap-1.5 text-white/60 hover:text-white font-medium transition-colors"
              >
                Explore our services &rarr;
              </Link>
            </div>
          </div>
        </FadeUp>
      </section>
    </main>
  );
}
