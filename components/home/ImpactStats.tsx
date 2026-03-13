"use client";

import { useCountUp } from "@/components/shared/useCountUp";
import FadeUp from "@/components/shared/FadeUp";

function StatItem({ prefix, value, suffix, label }: {
  prefix?: string;
  value: number;
  suffix?: string;
  label: string;
}) {
  const { count, ref } = useCountUp(value);

  return (
    <div ref={ref} className="text-center">
      <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">
        {prefix}{count}{suffix}
      </p>
      <p className="text-xs sm:text-sm text-white/60 leading-relaxed">
        {label}
      </p>
    </div>
  );
}

function StatItemDecimal({ prefix, suffix, label }: {
  prefix?: string;
  suffix?: string;
  label: string;
}) {
  const { count, ref } = useCountUp(32); // animate to 32, display as 3.2

  return (
    <div ref={ref} className="text-center">
      <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">
        {prefix}{(count / 10).toFixed(1)}{suffix}
      </p>
      <p className="text-xs sm:text-sm text-white/60 leading-relaxed">
        {label}
      </p>
    </div>
  );
}

export default function ImpactStats() {
  return (
    <section className="bg-primary py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <StatItemDecimal
            prefix="EUR "
            suffix="M"
            label="Annual savings generated through structured improvement programs"
          />
          <StatItem prefix="" value={51} suffix="%" label="Efficiency increase achieved in production operations" />
          <StatItem prefix="" value={30} suffix="%" label="Scrap rate reduction through continuous improvement tools" />
          <StatItem prefix="" value={20} suffix="+" label="Years of hands-on industrial experience" />
        </div>
        </FadeUp>
        <FadeUp delay={200}>
        <p className="mt-12 text-center text-white/40 text-base lg:text-lg max-w-2xl mx-auto">
          These aren&apos;t projections. They&apos;re results from real
          production environments.
        </p>
        <p className="mt-4 text-center text-gray-400/70 text-sm italic max-w-2xl mx-auto leading-relaxed">
          Achieved across 8 Tier-1 and Tier-2 automotive manufacturing plants,
          Romania and Western Europe, 2010–2024.
        </p>
        </FadeUp>
      </div>
    </section>
  );
}
