import Image from "next/image";
import Link from "next/link";
import FadeUp from "@/components/shared/FadeUp";

const credibilityMarkers = [
  { value: "20+", label: "Years on the\nshop floor" },
  { value: "8", label: "Plants turned\naround" },
  { value: "€15M+", label: "Documented\nsavings delivered" },
  { value: "3", label: "Tier-1 OEMs\n(Valeo, Leoni, Lear)" },
];

export default function FounderBadge() {
  return (
    <section className="bg-white border-y border-gray-100 py-12 lg:py-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp>
          <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr_auto] items-center gap-8 lg:gap-12">
            {/* Photo + name */}
            <div className="flex items-center gap-5 lg:flex-col lg:items-center lg:text-center">
              <Image
                src="/ClaudiuPoza.png"
                alt="Gherman Claudiu Cristian — Founder & Principal Consultant"
                width={120}
                height={120}
                className="rounded-full border-2 border-accent/20 flex-shrink-0"
              />
              <div className="lg:mt-3">
                <p className="text-sm font-bold text-primary leading-tight">
                  Claudiu Gherman
                </p>
                <p className="text-xs text-mid mt-0.5">
                  Founder &amp; Principal Consultant
                </p>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-1 mt-1.5 text-xs font-semibold text-accent hover:text-blue-600 transition-colors"
                >
                  Read full story &rarr;
                </Link>
              </div>
            </div>

            {/* Quote */}
            <div className="border-l-0 lg:border-l lg:border-r border-gray-200 lg:px-10">
              <p className="text-base md:text-lg text-dark leading-relaxed italic">
                &ldquo;Every system we build comes from 20+ years on the shop floor &mdash;
                across Valeo, Leoni, and Lear Corporation. We don&apos;t just advise.
                We implement.&rdquo;
              </p>
            </div>

            {/* Credibility markers */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-4 lg:gap-x-8">
              {credibilityMarkers.map((m) => (
                <div key={m.label} className="text-center lg:text-left">
                  <p className="text-2xl lg:text-3xl font-bold text-primary leading-none">
                    {m.value}
                  </p>
                  <p className="mt-1 text-[11px] text-mid uppercase tracking-wider leading-tight whitespace-pre-line">
                    {m.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
