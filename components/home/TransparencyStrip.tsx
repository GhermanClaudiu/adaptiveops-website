import Link from "next/link";
import FadeUp from "@/components/shared/FadeUp";

const pillars = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33" />
      </svg>
    ),
    label: "Transparent pricing",
    description: "Training from €700/day. Coaching from €120/hour. ECO Platform from €6,500/module. No hidden fees.",
    cta: "See full pricing",
    href: "/services#pricing",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
      </svg>
    ),
    label: "20 honest answers",
    description: "Pricing, comparisons, risks, timelines — every question a Plant Manager asks before deciding, answered directly.",
    cta: "Before you call",
    href: "/before-you-call",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
      </svg>
    ),
    label: "Free 30-min diagnostic",
    description: "No sales pitch. No commitment. We map your situation and tell you honestly if AdaptiveOps is the right fit.",
    cta: "Book free call",
    href: "/contact",
  },
];

export default function TransparencyStrip() {
  return (
    <section className="bg-primary py-16 border-t border-white/5">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-12">
        <FadeUp>
          <p className="text-center text-xs font-bold tracking-widest uppercase text-white/30 mb-10">
            Before you decide
          </p>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 rounded-2xl overflow-hidden">
          {pillars.map((p, i) => (
            <FadeUp key={i} delay={i * 100}>
              <div className="bg-primary hover:bg-white/[0.04] transition-colors p-8 flex flex-col gap-4 h-full">
                <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent flex-shrink-0">
                  {p.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-bold text-lg mb-2">{p.label}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{p.description}</p>
                </div>
                <Link
                  href={p.href}
                  className="inline-flex items-center gap-1.5 text-accent font-semibold text-sm hover:text-white transition-colors mt-2"
                >
                  {p.cta} &rarr;
                </Link>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
