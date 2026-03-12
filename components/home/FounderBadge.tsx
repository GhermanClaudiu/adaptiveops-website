import Image from "next/image";
import Link from "next/link";
import FadeUp from "@/components/shared/FadeUp";

export default function FounderBadge() {
  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp>
          <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
            {/* Photo */}
            <div className="flex-shrink-0">
              <Image
                src="/ClaudiuPoza.png"
                alt="Gherman Claudiu Cristian — Founder & Principal Consultant"
                width={96}
                height={96}
                className="rounded-full border-2 border-accent/20"
              />
            </div>

            {/* Text */}
            <div className="text-center sm:text-left">
              <p className="text-base md:text-lg text-dark leading-relaxed">
                &ldquo;Every system we build comes from 20+ years on the shop floor —
                across Valeo, Leoni, and Lear Corporation. We don&apos;t just advise.
                We implement.&rdquo;
              </p>
              <div className="mt-3 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                <span className="text-sm font-semibold text-primary">
                  Gherman Claudiu Cristian
                </span>
                <span className="hidden sm:inline text-mid">&middot;</span>
                <span className="text-sm text-mid">
                  Founder &amp; Principal Consultant
                </span>
              </div>
              <Link
                href="/about"
                className="inline-flex items-center gap-1 mt-3 text-sm font-semibold text-accent hover:text-blue-600 transition-colors"
              >
                Read the full story &rarr;
              </Link>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
