import Link from "next/link";
import FadeUp from "@/components/shared/FadeUp";

// TODO: replace with real industrial photo
// Add hero-bg.jpg to /public and uncomment the Image import + element below

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-[#0D2B4E]">
      {/* Background image overlay — uncomment when hero-bg.jpg is added */}
      {/* <Image src="/hero-bg.jpg" alt="" fill className="object-cover" priority /> */}
      {/* <div className="absolute inset-0 bg-primary/85" /> */}

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

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 lg:py-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text */}
          <div>
            <FadeUp>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.15]">
                Operational{" "}
                <span className="text-accent">Excellence</span>
                <br className="hidden sm:block" /> through Digital Solutions,
                <br className="hidden sm:block" /> Training and Coaching
              </h1>
            </FadeUp>
            <FadeUp delay={150}>
              <p className="mt-6 text-lg md:text-xl text-white/60 leading-relaxed max-w-2xl">
                AdaptiveOps helps industrial organizations improve performance
                through digital management systems, practical training and
                operational coaching.
              </p>
            </FadeUp>

            <FadeUp delay={300}>
              <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <Link
                  href="/contact"
                  className="inline-block bg-accent hover:bg-blue-600 active:scale-[0.98] text-white font-semibold px-10 py-4 rounded-full transition-colors text-lg focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
                >
                  Request a consultation
                </Link>
                <Link
                  href="/solutions"
                  className="inline-flex items-center gap-1.5 text-white/50 hover:text-white font-medium transition-colors"
                >
                  Explore solutions &rarr;
                </Link>
              </div>
            </FadeUp>

            <FadeUp delay={450}>
              <p className="mt-12 text-sm text-white/30 tracking-wide">
                Trusted by automotive and manufacturing organizations
              </p>
            </FadeUp>
          </div>

          {/* Right: Dashboard mockup */}
          <FadeUp delay={300} className="hidden lg:block">
            <div className="relative">
              {/* Main dashboard card */}
              <div className="bg-white/[0.07] backdrop-blur-sm border border-white/10 rounded-2xl p-6 shadow-2xl">
                {/* Header bar */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400/60" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
                    <div className="w-3 h-3 rounded-full bg-green-400/60" />
                  </div>
                  <span className="text-[10px] font-semibold tracking-widest uppercase text-white/30">ECO Platform</span>
                </div>

                {/* KPI Row */}
                <div className="grid grid-cols-3 gap-3 mb-5">
                  <div className="bg-white/[0.05] rounded-xl p-3 border border-white/[0.06]">
                    <p className="text-[10px] text-white/40 uppercase tracking-wider mb-1">OEE</p>
                    <p className="text-2xl font-bold text-white">87.2<span className="text-sm text-white/40">%</span></p>
                    <div className="mt-2 h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-accent rounded-full" style={{ width: "87%" }} />
                    </div>
                  </div>
                  <div className="bg-white/[0.05] rounded-xl p-3 border border-white/[0.06]">
                    <p className="text-[10px] text-white/40 uppercase tracking-wider mb-1">Quality</p>
                    <p className="text-2xl font-bold text-white">99.1<span className="text-sm text-white/40">%</span></p>
                    <div className="mt-2 h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-secondary rounded-full" style={{ width: "99%" }} />
                    </div>
                  </div>
                  <div className="bg-white/[0.05] rounded-xl p-3 border border-white/[0.06]">
                    <p className="text-[10px] text-white/40 uppercase tracking-wider mb-1">MTBF</p>
                    <p className="text-2xl font-bold text-white">142<span className="text-sm text-white/40">h</span></p>
                    <div className="mt-2 h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-[#E65100] rounded-full" style={{ width: "71%" }} />
                    </div>
                  </div>
                </div>

                {/* Chart area */}
                <div className="bg-white/[0.03] rounded-xl p-4 border border-white/[0.06] mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] text-white/40 uppercase tracking-wider">Production Output — Weekly</span>
                    <span className="text-[10px] text-accent font-semibold">+12.4%</span>
                  </div>
                  {/* Simple bar chart */}
                  <div className="flex items-end gap-1.5 h-16">
                    {[55, 62, 48, 71, 65, 78, 85].map((h, i) => (
                      <div key={i} className="flex-1 rounded-t" style={{
                        height: `${h}%`,
                        background: i === 6 ? '#2F80ED' : 'rgba(47,128,237,0.25)',
                      }} />
                    ))}
                  </div>
                  <div className="flex justify-between mt-1.5">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => (
                      <span key={d} className="text-[8px] text-white/20 flex-1 text-center">{d}</span>
                    ))}
                  </div>
                </div>

                {/* Bottom modules row */}
                <div className="flex gap-2">
                  {[
                    { label: "EMS", color: "#E65100" },
                    { label: "QMS", color: "#1565C0" },
                    { label: "MMS", color: "#6A1B9A" },
                    { label: "PMS", color: "#2E7D32" },
                  ].map((m) => (
                    <div key={m.label} className="flex-1 rounded-lg py-1.5 text-center border border-white/[0.06]"
                      style={{ backgroundColor: `${m.color}20` }}>
                      <span className="text-[10px] font-bold text-white/70">{m.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating notification card */}
              <div className="absolute -bottom-4 -left-4 bg-white/[0.1] backdrop-blur-sm border border-white/10 rounded-xl px-4 py-3 shadow-xl">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center">
                    <svg className="w-4 h-4 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold text-white">PM-2847 completed</p>
                    <p className="text-[9px] text-white/40">Preventive maintenance — Line 3</p>
                  </div>
                </div>
              </div>

              {/* Floating user avatars */}
              <div className="absolute -top-3 -right-3 bg-white/[0.1] backdrop-blur-sm border border-white/10 rounded-xl px-3 py-2 shadow-xl">
                <div className="flex items-center gap-1.5">
                  <div className="flex -space-x-2">
                    <div className="w-6 h-6 rounded-full bg-accent/30 border border-white/20 flex items-center justify-center text-[8px] font-bold text-white">CG</div>
                    <div className="w-6 h-6 rounded-full bg-secondary/30 border border-white/20 flex items-center justify-center text-[8px] font-bold text-white">ML</div>
                    <div className="w-6 h-6 rounded-full bg-[#E65100]/30 border border-white/20 flex items-center justify-center text-[8px] font-bold text-white">DP</div>
                  </div>
                  <span className="text-[9px] text-white/40">12 online</span>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
