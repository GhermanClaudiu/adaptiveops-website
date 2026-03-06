import Link from "next/link";

export default function UrgencyCTA() {
  return (
    <section className="bg-accent py-20 lg:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
          Every day without a system costs you more than you think.
        </h2>
        <p className="mt-5 text-base md:text-lg text-white/75 leading-relaxed">
          Scrap, rework, disengaged teams, missed KPIs — these aren&apos;t
          isolated problems. They&apos;re symptoms of a system that needs to
          change. Let&apos;s build it together.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-5">
          <Link
            href="/contact"
            className="bg-white text-accent font-semibold px-10 py-4 rounded-full hover:bg-white/90 transition-colors text-lg"
          >
            Request a consultation
          </Link>
          <Link
            href="/services"
            className="text-white/70 hover:text-white font-medium transition-colors"
          >
            See how it works &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
