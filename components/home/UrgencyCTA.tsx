import Link from "next/link";
import FadeUp from "@/components/shared/FadeUp";

export default function UrgencyCTA() {
  return (
    <section className="bg-accent py-20 lg:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <FadeUp>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
            Every day without a system costs you more than you think.
          </h2>
        </FadeUp>
        <FadeUp delay={100}>
          <p className="mt-5 text-base md:text-lg text-white/75 leading-relaxed">
            Scrap, rework, disengaged teams, missed KPIs — these aren&apos;t
            isolated problems. They&apos;re symptoms of a system that needs to
            change. Let&apos;s build it together.
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
      </div>
    </section>
  );
}
