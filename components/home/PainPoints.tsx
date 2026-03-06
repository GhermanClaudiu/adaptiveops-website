const symptoms = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
      </svg>
    ),
    title: "Recurring quality problems",
    description:
      "Defects and rework keep appearing despite corrective actions.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6 9 12.75l4.286-4.286a11.948 11.948 0 0 1 4.306 6.43l.776 2.898m0 0 3.182-5.511m-3.182 5.51-5.511-3.181" />
      </svg>
    ),
    title: "KPIs without real follow-up",
    description:
      "Numbers are tracked but nothing changes on the shop floor.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182" />
      </svg>
    ),
    title: "Improvement initiatives that stall",
    description:
      "Training happens, but habits and results don\u2019t change.",
  },
];

export default function PainPoints() {
  return (
    <section className="bg-light py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-14">
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {symptoms.map((item) => (
            <div
              key={item.title}
              className="bg-white border border-gray-200 rounded-xl p-7 shadow-sm hover:shadow-md transition-shadow text-center"
            >
              <div className="inline-flex items-center justify-center w-13 h-13 rounded-full bg-accent/10 text-accent mb-5">
                {item.icon}
              </div>
              <h3 className="text-lg font-semibold text-primary mb-2">
                {item.title}
              </h3>
              <p className="text-mid text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-12 text-center text-mid leading-relaxed max-w-2xl mx-auto italic">
          You&apos;re not alone. Every plant we&apos;ve worked with has faced
          this. The difference is having the right system — for people,
          processes and technology.
        </p>
      </div>
    </section>
  );
}
