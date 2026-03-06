import type { Metadata } from "next";
import Link from "next/link";
import { trainingPrograms } from "@/lib/content/training";
import { coachingPrograms } from "@/lib/content/coaching";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Professional training and operational coaching for industrial organizations. Lean, problem solving, leadership and continuous improvement.",
  openGraph: {
    title: "Services — AdaptiveOps",
    description:
      "Professional training and operational coaching for industrial organizations.",
  },
};

export default function ServicesPage() {
  return (
    <main>
      {/* Page Hero */}
      <section className="bg-primary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-5xl font-bold text-white">Our Services</h1>
          <p className="mt-4 text-lg text-white/70 max-w-2xl">
            Training programs and operational coaching designed for industrial organizations.
            Not theory — systems that work.
          </p>
          <p className="mt-6 text-sm text-white/30 tracking-wide">
            8 Training Programs &nbsp;&middot;&nbsp; 5 Coaching Programs &nbsp;&middot;&nbsp; All delivered on-site in Romanian
          </p>
        </div>
      </section>

      {/* Training Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342" />
                </svg>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary">Training Programs</h2>
            </div>
            <p className="text-mid text-lg max-w-3xl">
              From Lean fundamentals to advanced performance management. All programs are delivered
              on-site or online, tailored to your organization&apos;s reality.
            </p>
          </div>

          {/* Training formats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[
              { format: "Workshop", duration: "1 day (8h)" },
              { format: "Multi-session", duration: "3–5 days" },
              { format: "On-site", duration: "Variable" },
              { format: "Online", duration: "2–4h sessions" },
            ].map((f) => (
              <div key={f.format} className="bg-light rounded-lg p-4 text-center">
                <div className="font-semibold text-primary">{f.format}</div>
                <div className="text-sm text-mid">{f.duration}</div>
              </div>
            ))}
          </div>

          {/* Training cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {trainingPrograms.map((program) => (
              <div
                key={program.id}
                className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-bold text-accent bg-accent/10 px-2 py-1 rounded">
                    {program.id}
                  </span>
                  <span className="text-xs text-mid">{program.level} &middot; {program.duration}</span>
                </div>
                <h3 className="text-xl font-semibold text-primary mb-2">{program.title}</h3>
                <p className="text-sm text-mid mb-3">{program.audience}</p>
                <ul className="space-y-1.5 mb-4">
                  {program.topics.map((topic) => (
                    <li key={topic} className="flex items-start gap-2 text-sm text-dark">
                      <span className="w-1.5 h-1.5 bg-accent rounded-full mt-1.5 flex-shrink-0" />
                      {topic}
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-secondary font-medium">{program.outcome}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Transition divider */}
      <section className="bg-primary py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-lg md:text-xl font-semibold text-white">
            From training knowledge to implementing real change
          </p>
          <p className="mt-2 text-sm text-white/40">
            Coaching programs are available as standalone or as continuation of training
          </p>
        </div>
      </section>

      {/* Coaching Section */}
      <section className="py-20 bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                </svg>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary">Operational Coaching</h2>
            </div>
            <p className="text-mid text-lg max-w-3xl">
              Hands-on support for implementing improvements. We work directly on the shop floor — not from a conference room.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {coachingPrograms.map((program) => (
              <div
                key={program.id}
                className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-bold text-accent bg-accent/10 px-2 py-1 rounded">
                    {program.id}
                  </span>
                  <span className="text-xs text-mid">{program.format} &middot; {program.duration}</span>
                </div>
                <h3 className="text-xl font-semibold text-primary mb-2">{program.title}</h3>
                <p className="text-sm text-mid mb-4">{program.description}</p>
                <ul className="space-y-1.5">
                  {program.deliverables.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-dark">
                      <span className="w-1.5 h-1.5 bg-secondary rounded-full mt-1.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-accent py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Not sure which program fits your needs?
          </h2>
          <p className="mt-4 text-lg text-white/80 max-w-xl mx-auto">
            Let&apos;s discuss your challenges and find the right approach for your organization.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-block bg-white text-accent font-semibold px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Request a consultation
          </Link>
        </div>
      </section>
    </main>
  );
}
