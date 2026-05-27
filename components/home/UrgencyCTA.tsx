import Link from "next/link";
import FadeUp from "@/components/shared/FadeUp";

export default function UrgencyCTA() {
  return (
    <section className="bg-accent py-20 lg:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <FadeUp>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
            Every quarter you wait, the same problems compound.
          </h2>
          <p className="mt-3 text-base md:text-lg font-semibold text-white/90">
            The math doesn&apos;t change while you wait.
          </p>
        </FadeUp>
        <FadeUp delay={100}>
          <p className="mt-6 text-base md:text-lg text-white/75 leading-relaxed">
            Scrap, rework, missed KPIs and stalled initiatives don&apos;t fix themselves. Across 8 plants, the same patterns drove the documented &euro;3.2M peak annual savings once the system was in place. One 30-minute call: we map your situation honestly and tell you whether AdaptiveOps is the right fit &mdash; or what is.
          </p>
        </FadeUp>
        <FadeUp delay={200}>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-5">
            <Link
              href="/contact"
              className="bg-white text-accent font-semibold px-10 py-4 rounded-full hover:bg-white/90 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-shadow text-lg"
            >
              Book Your Free 30-Min Diagnostic Call
            </Link>
            <Link
              href="/services"
              className="text-white/70 hover:text-white font-medium transition-colors"
            >
              See how it works &rarr;
            </Link>
          </div>
        </FadeUp>

        <FadeUp delay={300}>
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
        </FadeUp>
      </div>
    </section>
  );
}
