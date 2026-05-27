import FadeUp from "@/components/shared/FadeUp";

const outcomes = [
  {
    metric: "+51%",
    label: "Production efficiency",
    note: "sustained gain vs baseline",
    accent: "#10B981",
  },
  {
    metric: "-30%",
    label: "Scrap rate",
    note: "via structured PDCA cycles",
    accent: "#2F80ED",
  },
  {
    metric: "€3.2M",
    label: "Peak annual savings",
    note: "across the plant portfolio",
    accent: "#E65100",
  },
  {
    metric: "8",
    label: "Tier-1 & Tier-2 plants",
    note: "Romania & Western Europe, 2010–2024",
    accent: "#8B5CF6",
  },
];

export default function Benefits() {
  return (
    <section className="bg-light py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp>
          <div className="text-center mb-14">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary">
              What Your Plant Looks Like After the System Holds
            </h2>
            <p className="mt-4 text-mid text-base md:text-lg max-w-2xl mx-auto">
              Documented outcomes from past engagements. Not projections &mdash; production-floor results from 8 plants in Romania and Western Europe (2010&ndash;2024).
            </p>
          </div>
        </FadeUp>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {outcomes.map((o, i) => (
            <FadeUp key={o.label} delay={i * 100}>
              <div
                className="bg-white border border-gray-100 rounded-xl p-6 lg:p-8 h-full flex flex-col shadow-sm hover:shadow-md transition-shadow"
                style={{ borderTopColor: o.accent, borderTopWidth: "3px" }}
              >
                <p
                  className="text-4xl lg:text-5xl font-bold leading-none mb-3"
                  style={{ color: o.accent }}
                >
                  {o.metric}
                </p>
                <p className="text-base font-semibold text-primary mb-2 leading-tight">
                  {o.label}
                </p>
                <p className="text-xs text-mid leading-relaxed mt-auto">
                  {o.note}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>

        <FadeUp delay={500}>
          <p className="mt-10 text-center text-sm text-mid italic max-w-2xl mx-auto">
            We don&apos;t just advise. We implement &mdash; and stay until the new standard holds without us.
          </p>
        </FadeUp>
      </div>
    </section>
  );
}
