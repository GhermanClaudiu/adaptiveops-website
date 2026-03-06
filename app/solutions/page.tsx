import type { Metadata } from "next";
import Link from "next/link";
import ECOPlatform from "@/components/solutions/ECOPlatform";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "ECO Platform — six integrated management systems for full operational control. Quality, equipment, materials, people, operations and continuous improvement.",
  openGraph: {
    title: "Solutions — AdaptiveOps",
    description:
      "ECO Platform: one platform, six systems, full operational control for industrial organizations.",
  },
};

export default function SolutionsPage() {
  return (
    <main>
      {/* Page Hero */}
      <section className="bg-primary pt-20 pb-12 lg:pt-24 lg:pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">
            One Platform. Six Systems.
            <br />
            <span className="text-accent">Full Operational Control.</span>
          </h1>
          <p className="mt-5 text-lg text-white/60 max-w-2xl leading-relaxed">
            ECO Platform integrates quality, equipment, materials, people,
            operations and continuous improvement in a single system.
          </p>
        </div>
      </section>

      {/* ECO Platform */}
      <ECOPlatform />

      {/* CTA */}
      <section className="bg-accent py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Need a custom solution for your operations?
          </h2>
          <p className="mt-4 text-lg text-white/70 max-w-xl mx-auto">
            We build digital tools tailored to your specific operational
            challenges.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-block bg-white text-accent font-semibold px-10 py-4 rounded-full hover:bg-white/90 transition-colors text-lg"
          >
            Get in touch
          </Link>
        </div>
      </section>
    </main>
  );
}
