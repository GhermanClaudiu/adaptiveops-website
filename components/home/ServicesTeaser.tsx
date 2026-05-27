import Link from "next/link";
import FadeUp from "@/components/shared/FadeUp";

const paths = [
  {
    title: "Training & OE",
    teaser: "8 hands-on programs (T1–T8). From operational fundamentals to leadership development. Delivered on your floor.",
    href: "/services#training",
    cta: "Explore training",
    accent: "#2F80ED",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
      </svg>
    ),
  },
  {
    title: "Hands-on Coaching",
    teaser: "5 coaching packages (C1–C5). Engineers and managers solve your bottleneck under direct guidance until the standard sticks.",
    href: "/services#coaching",
    cta: "Explore coaching",
    accent: "#10B981",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
      </svg>
    ),
  },
  {
    title: "ECO Platform",
    teaser: "6 management systems. One unified core. Runs entirely on your servers — zero cloud dependency. Air-gap compatible.",
    href: "/solutions#in-action",
    cta: "Explore platform",
    accent: "#8B5CF6",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" />
      </svg>
    ),
  },
];

export default function ServicesTeaser() {
  return (
    <section className="bg-white py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp>
          <div className="text-center mb-14">
            <p className="text-xs font-bold tracking-widest uppercase text-accent mb-3">
              Three Ways We Work
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary">
              Pick the entry point. We design the combination.
            </h2>
            <p className="mt-4 text-base md:text-lg text-mid max-w-2xl mx-auto">
              Most engagements blend all three. The right mix depends on where your plant is &mdash; we figure that out on the diagnostic call.
            </p>
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {paths.map((p, i) => (
            <FadeUp key={p.title} delay={i * 100}>
              <Link
                href={p.href}
                className="group bg-white border border-gray-100 rounded-xl p-7 shadow-sm hover:shadow-md hover:border-gray-200 transition-shadow h-full flex flex-col"
                style={{ borderTopColor: p.accent, borderTopWidth: "3px" }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ backgroundColor: `${p.accent}15`, color: p.accent }}
                >
                  {p.icon}
                </div>
                <h3 className="text-lg font-bold text-primary mb-2">
                  {p.title}
                </h3>
                <p className="text-sm text-mid leading-relaxed mb-5 flex-1">
                  {p.teaser}
                </p>
                <span
                  className="text-sm font-semibold inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all"
                  style={{ color: p.accent }}
                >
                  {p.cta} &rarr;
                </span>
              </Link>
            </FadeUp>
          ))}
        </div>

        {/* Secondary mentions — Lean Office (different scope) + Academy (different audience) */}
        <FadeUp delay={400}>
          <div className="mt-10 space-y-3 text-center text-sm">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <span className="text-mid">Beyond the production floor:</span>
              <Link
                href="/lean-office"
                className="inline-flex items-center gap-1.5 text-accent font-semibold hover:text-blue-600 transition-colors"
              >
                Lean in the Office &mdash; for planning, logistics, HR &amp; finance &rarr;
              </Link>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <span className="text-mid">Or learn on your own:</span>
              <Link
                href="/academy"
                className="inline-flex items-center gap-1.5 text-accent font-semibold hover:text-blue-600 transition-colors"
              >
                Academy &mdash; practice operational reflexes 15 min a day &rarr;
              </Link>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
