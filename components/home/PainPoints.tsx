import FadeUp from "@/components/shared/FadeUp";

const symptoms = [
  {
    title: "Recurring quality problems",
    description: "Defects and rework keep appearing despite corrective actions.",
    color: "#EF4444",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
      </svg>
    ),
  },
  {
    title: "KPIs without real follow-up",
    description: "Numbers are tracked but nothing changes on the shop floor.",
    color: "#F59E0B",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6 9 12.75l4.286-4.286a11.948 11.948 0 0 1 4.306 6.43l.776 2.898m0 0 3.182-5.511m-3.182 5.51-5.511-3.181" />
      </svg>
    ),
  },
  {
    title: "Improvement initiatives that stall",
    description: "Training happens, but habits and results don\u2019t change.",
    color: "#8B5CF6",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182" />
      </svg>
    ),
  },
];

export default function PainPoints() {
  return (
    <section className="bg-light py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">
          {/* Left: Visual — broken system diagram (on mobile appears after text) */}
          <FadeUp className="h-full order-last lg:order-first">
            <div className="relative h-full flex flex-col">
              {/* The "broken" system visualization */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04)] flex-1 flex flex-col justify-between">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-semibold tracking-widest uppercase text-gray-400">Typical Operation</span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-50/70 text-red-400 text-xs font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-300 animate-pulse" />
                    Issues detected
                  </span>
                </div>

                {/* Flow diagram: People → Process → Results with broken connections */}
                <div className="flex items-center justify-between gap-3 mb-8">
                  {/* People */}
                  <div className="flex-1 text-center">
                    <div className="w-16 h-16 mx-auto rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center mb-2.5">
                      <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                      </svg>
                    </div>
                    <span className="text-sm font-semibold text-primary">People</span>
                  </div>

                  {/* Broken arrow */}
                  <div className="flex flex-col items-center gap-1">
                    <svg className="w-10 h-5 text-red-200" viewBox="0 0 40 20">
                      <line x1="0" y1="10" x2="14" y2="10" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 3" />
                      <line x1="26" y1="10" x2="40" y2="10" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 3" />
                      <circle cx="20" cy="10" r="3" fill="#FCA5A5" />
                    </svg>
                    <span className="text-[10px] text-red-300 font-medium">Gap</span>
                  </div>

                  {/* Process */}
                  <div className="flex-1 text-center">
                    <div className="w-16 h-16 mx-auto rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center mb-2.5">
                      <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
                      </svg>
                    </div>
                    <span className="text-sm font-semibold text-primary">Process</span>
                  </div>

                  {/* Broken arrow */}
                  <div className="flex flex-col items-center gap-1">
                    <svg className="w-10 h-5 text-red-200" viewBox="0 0 40 20">
                      <line x1="0" y1="10" x2="14" y2="10" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 3" />
                      <line x1="26" y1="10" x2="40" y2="10" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 3" />
                      <circle cx="20" cy="10" r="3" fill="#FCA5A5" />
                    </svg>
                    <span className="text-[10px] text-red-300 font-medium">Gap</span>
                  </div>

                  {/* Results */}
                  <div className="flex-1 text-center">
                    <div className="w-16 h-16 mx-auto rounded-xl bg-red-50/60 border border-red-100 flex items-center justify-center mb-2.5">
                      <svg className="w-8 h-8 text-red-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                      </svg>
                    </div>
                    <span className="text-sm font-semibold text-red-500">Inconsistent</span>
                  </div>
                </div>

                {/* KPI rows showing problems */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between bg-gray-50/80 rounded-xl px-4 py-3 border border-gray-100">
                    <span className="text-sm font-medium text-gray-700">Scrap Rate</span>
                    <div className="flex items-center gap-3">
                      <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-red-400 rounded-full" style={{ width: "68%" }} />
                      </div>
                      <span className="text-sm font-semibold text-red-500 w-10 text-right">6.8%</span>
                      <svg className="w-3.5 h-3.5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex items-center justify-between bg-gray-50/80 rounded-xl px-4 py-3 border border-gray-100">
                    <span className="text-sm font-medium text-gray-700">OEE</span>
                    <div className="flex items-center gap-3">
                      <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-400 rounded-full" style={{ width: "52%" }} />
                      </div>
                      <span className="text-sm font-semibold text-amber-600 w-10 text-right">52%</span>
                      <svg className="w-3.5 h-3.5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex items-center justify-between bg-gray-50/80 rounded-xl px-4 py-3 border border-gray-100">
                    <span className="text-sm font-medium text-gray-700">CAPA Closure</span>
                    <div className="flex items-center gap-3">
                      <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-purple-400 rounded-full" style={{ width: "35%" }} />
                      </div>
                      <span className="text-sm font-semibold text-purple-500 w-10 text-right">35%</span>
                      <span className="text-[11px] text-purple-400 font-medium">overdue</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeUp>

          {/* Right: Text + symptom list */}
          <div>
            <FadeUp>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary leading-tight">
                Is inefficiency, rework and poor visibility still costing your
                operation every day?
              </h2>
              <p className="mt-5 text-base md:text-lg text-mid leading-relaxed">
                Industrial organizations invest in people and processes — yet
                results are inconsistent, problems repeat, and improvement
                initiatives fade. The issue is rarely the tools. It&apos;s the
                system.
              </p>
            </FadeUp>

            <div className="mt-8 space-y-4">
              {symptoms.map((item, i) => (
                <FadeUp key={item.title} delay={i * 100}>
                  <div className="flex items-start gap-4">
                    <div
                      className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${item.color}15`, color: item.color }}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-primary">
                        {item.title}
                      </h3>
                      <p className="text-sm text-mid leading-relaxed mt-0.5">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>

            <FadeUp delay={400}>
              <p className="mt-8 text-mid text-sm leading-relaxed italic border-l-2 border-accent/30 pl-4">
                You&apos;re not alone. Every plant we&apos;ve worked with has faced
                this. The difference is having the right system — for people,
                processes and technology.
              </p>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}
