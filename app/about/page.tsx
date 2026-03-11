import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import FadeUp from "@/components/shared/FadeUp";
import JsonLd from "@/components/shared/JsonLd";

export const metadata: Metadata = {
  title: "About",
  description:
    "AdaptiveOps is a consultancy built from the shop floor up, helping manufacturers in Europe improve performance through people, processes and technology.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About — AdaptiveOps",
    description:
      "20+ years of hands-on experience in automotive manufacturing. Built from the shop floor up.",
    url: "/about",
  },
  twitter: {
    card: "summary_large_image",
    title: "About — AdaptiveOps",
    description:
      "A consultancy built from the shop floor up, helping manufacturers improve performance through people, processes and technology.",
    images: ["/og-image.png"],
  },
};

const milestones = [
  {
    year: "2002",
    title: "First step on the shop floor",
    description: "Started as a production engineer in automotive wiring systems. Learned that improvement starts where the work happens.",
    accent: false,
  },
  {
    year: "2008",
    title: "Leading production lines",
    description: "Took ownership of production operations. Achieved 51% efficiency gains and 300+ PPM reduction through hands-on lean implementation.",
    accent: false,
  },
  {
    year: "2012",
    title: "The pivot: from doing to building systems",
    description: "Transitioned from managing production to coaching teams and building improvement frameworks across an entire region. Generated EUR 3.2M/year in savings through structured Yearly Improvement Plans.",
    accent: true,
  },
  {
    year: "2016",
    title: "Scaling to Fortune 500",
    description: "Applied the integrated approach at larger scale — OEE standardization, dynamic warehouse systems, Kata coaching. Confirmed that training + tools + coaching must work as one.",
    accent: false,
  },
  {
    year: "2024",
    title: "AdaptiveOps & the ECO Framework",
    description: "Founded AdaptiveOps to share what 20+ years taught us. Built the ECO platform — Execution & Control of Operations — so other organizations don\u2019t have to learn these lessons the hard way.",
    accent: true,
  },
];

const credentials = [
  { type: "certification", label: "CPIM — Certified in Production and Inventory Management (APICS)" },
  { type: "certification", label: "NLP Practitioner — Neuro-Linguistic Programming" },
  { type: "training", label: "Toyota Kata (Lean Partners)" },
  { type: "training", label: "Leadership & Communication · Strategic Management · Project Management" },
  { type: "education", label: "Master\u2019s Degree in Design of Flexible Systems — Technical University Cluj-Napoca" },
  { type: "education", label: "Bachelor\u2019s Degree in Robotics — Technical University Cluj-Napoca" },
];

export default function AboutPage() {
  return (
    <main>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: "About AdaptiveOps",
          description: "20+ years of hands-on experience in automotive manufacturing.",
          url: "https://adaptiveops.eu/about",
          datePublished: "2026-03-06",
          dateModified: "2026-03-11",
          mainEntity: {
            "@type": "Person",
            name: "Gherman Claudiu Cristian",
            jobTitle: "Founder & Principal Consultant",
            worksFor: { "@type": "Organization", name: "AdaptiveOps" },
          },
        }}
      />
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary py-20">
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.05]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="gridAbout" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#gridAbout)" />
          </svg>
        </div>
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">
              Built from the shop floor up.
            </h1>
          </FadeUp>
          <FadeUp delay={100}>
            <p className="mt-5 text-lg text-white/60 max-w-2xl leading-relaxed">
              20+ years of hands-on experience in automotive manufacturing turned into a framework
              that integrates training, coaching, and digital systems. This is the story behind AdaptiveOps.
            </p>
          </FadeUp>
          <FadeUp delay={200}>
            <p className="mt-6 text-sm text-white/30 tracking-wide">
              20+ Years &nbsp;&middot;&nbsp; Fortune 500 &nbsp;&middot;&nbsp; Automotive &amp; Manufacturing
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Quote — prominent */}
      <section className="bg-white py-16 border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <div className="text-center">
              <svg className="w-10 h-10 text-accent/30 mx-auto mb-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <blockquote className="text-xl md:text-2xl font-semibold text-primary leading-relaxed">
                We don&apos;t just advise. We implement. Every training program, every coaching session,
                every digital tool is built on real experience from real factories.
              </blockquote>
              <div className="mt-6 flex items-center justify-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                  <span className="text-sm font-bold text-accent">GC</span>
                </div>
                <div className="text-left">
                  <div className="text-sm font-semibold text-primary">Gherman Claudiu Cristian</div>
                  <div className="text-xs text-mid">Founder &amp; Principal Consultant</div>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* The Origin Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
            {/* Left — narrative */}
            <FadeUp className="lg:w-1/2">
              <div>
                <span className="inline-block text-xs font-bold tracking-widest uppercase text-accent mb-4">
                  The origin of ECO
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-primary mb-5">
                  Why AdaptiveOps exists
                </h2>
                <div className="space-y-4 text-mid leading-relaxed">
                  <p>
                    After 20+ years managing production lines, coaching teams, and implementing lean systems
                    across automotive suppliers, one pattern kept repeating: <strong className="text-primary">organizations invest in training
                    that doesn&apos;t stick, buy digital tools that nobody uses, and run improvement programs that
                    fade after the consultant leaves.</strong>
                  </p>
                  <p>
                    The problem isn&apos;t the training. It&apos;s not the tools. It&apos;s the disconnect between them.
                    Training without digital systems to sustain it loses momentum. Digital systems without
                    skilled people become expensive dashboards. Coaching without both is just conversation.
                  </p>
                  <p className="text-primary font-medium">
                    AdaptiveOps was founded to solve this. The ECO framework — Execution &amp; Control of Operations —
                    integrates training, coaching, and digital management systems into one coherent approach.
                    Because that&apos;s how operations actually work: everything is connected.
                  </p>
                </div>
              </div>
            </FadeUp>

            {/* Right — visual: the problem → solution */}
            <FadeUp delay={150} className="lg:w-1/2">
              <div className="space-y-4">
                {/* The problem */}
                <div className="rounded-xl border border-red-200 bg-red-50/50 p-5">
                  <div className="text-xs font-bold uppercase tracking-widest text-red-400 mb-3">
                    What we kept seeing
                  </div>
                  <div className="space-y-2.5">
                    {[
                      "Training programs that end at the classroom door",
                      "Digital tools collecting dust — no adoption, no ROI",
                      "Improvement projects that fade when the consultant leaves",
                      "Disconnected systems: quality in one app, maintenance in another, people in spreadsheets",
                    ].map((item) => (
                      <div key={item} className="flex items-start gap-2.5 text-sm text-red-700/70">
                        <svg className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Arrow */}
                <div className="flex justify-center">
                  <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
                  </svg>
                </div>

                {/* The solution */}
                <div className="rounded-xl border-2 border-accent/30 bg-accent/[0.03] p-5">
                  <div className="text-xs font-bold uppercase tracking-widest text-accent mb-3">
                    The ECO approach
                  </div>
                  <div className="space-y-2.5">
                    {[
                      "Training + coaching + digital in one integrated system",
                      "Management Layer ensures people can use the tools",
                      "Digital Solutions Layer gives structure to daily operations",
                      "Everything connects: quality, equipment, materials, people",
                    ].map((item) => (
                      <div key={item} className="flex items-start gap-2.5 text-sm text-primary/70">
                        <svg className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* The Journey */}
      <section className="py-20 bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
            {/* Left — Founder card */}
            <FadeUp className="lg:w-5/12">
              <div className="sticky top-24">
                {/* Photo placeholder — replace with real image */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="flex justify-center bg-[#E5E7EB] py-6">
                    <Image
                      src="/ClaudiuPoza.png"
                      alt="Gherman Claudiu Cristian — Founder & Principal Consultant"
                      width={200}
                      height={200}
                      className="rounded-full"
                      priority
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-primary">Gherman Claudiu Cristian</h3>
                    <p className="text-sm text-accent font-medium mt-1">Founder &amp; Principal Consultant</p>
                    <p className="text-sm text-mid mt-3 leading-relaxed">
                      20+ years in automotive manufacturing across Valeo, Leoni, and Lear Corporation (Fortune 500).
                      From production engineer to operations leader — every system we teach and build
                      comes from real factory experience.
                    </p>
                    <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap gap-2">
                      {["Lean Manufacturing", "Toyota Kata", "CPIM (APICS)", "NLP Practitioner"].map((tag) => (
                        <span key={tag} className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-light text-mid border border-gray-200">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </FadeUp>

            {/* Right — Journey timeline */}
            <FadeUp delay={100} className="lg:w-7/12">
              <div>
                <span className="inline-block text-xs font-bold tracking-widest uppercase text-accent mb-4">
                  The journey
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-primary mb-8">
                  From the shop floor to a framework.
                </h2>

                {/* Timeline */}
                <div className="relative">
                  {/* Vertical line */}
                  <div className="absolute left-[15px] top-2 bottom-0 w-px bg-gray-200" />

                  <div className="space-y-8">
                    {milestones.map((ms, index) => (
                      <FadeUp key={ms.year} delay={index * 80}>
                        <div className="relative flex gap-5">
                          {/* Dot on the timeline */}
                          <div className="flex-shrink-0 relative z-10">
                            <div className={`w-[31px] h-[31px] rounded-full flex items-center justify-center border-2 ${
                              ms.accent
                                ? "bg-accent border-accent text-white"
                                : "bg-white border-gray-300 text-mid"
                            }`}>
                              <span className="text-[10px] font-bold">{ms.year.slice(2)}</span>
                            </div>
                          </div>

                          {/* Content */}
                          <div className={`flex-1 rounded-xl p-5 -mt-1 ${
                            ms.accent
                              ? "bg-primary text-white"
                              : "bg-white border border-gray-100 shadow-sm"
                          }`}>
                            <div className={`text-xs font-bold tracking-widest uppercase mb-1 ${
                              ms.accent ? "text-accent" : "text-accent"
                            }`}>
                              {ms.year}
                            </div>
                            <h3 className={`text-lg font-bold mb-2 ${
                              ms.accent ? "text-white" : "text-primary"
                            }`}>
                              {ms.title}
                            </h3>
                            <p className={`text-sm leading-relaxed ${
                              ms.accent ? "text-white/60" : "text-mid"
                            }`}>
                              {ms.description}
                            </p>
                          </div>
                        </div>
                      </FadeUp>
                    ))}

                    {/* The journey continues */}
                    <div className="relative flex gap-5">
                      <div className="flex-shrink-0 relative z-10">
                        <div className="w-[31px] h-[31px] rounded-full bg-accent/10 border-2 border-dashed border-accent/40 flex items-center justify-center">
                          <svg className="w-3.5 h-3.5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                          </svg>
                        </div>
                      </div>
                      <div className="flex-1 py-2">
                        <p className="text-sm font-medium text-accent italic">
                          The journey continues...
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12">
            <FadeUp className="lg:w-1/3">
              <div>
                <span className="inline-block text-xs font-bold tracking-widest uppercase text-accent mb-4">
                  Credentials
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">
                  Education &amp; Certifications
                </h2>
                <p className="text-mid leading-relaxed">
                  Formal training that complements 20+ years of practical experience.
                  Not theory for theory&apos;s sake — every certification was applied on the shop floor.
                </p>
              </div>
            </FadeUp>

            <FadeUp delay={100} className="lg:w-2/3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {credentials.map((cred) => (
                  <div
                    key={cred.label}
                    className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm flex items-start gap-3"
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      cred.type === "certification"
                        ? "bg-accent/10 text-accent"
                        : cred.type === "education"
                          ? "bg-secondary/10 text-secondary"
                          : "bg-primary/10 text-primary"
                    }`}>
                      {cred.type === "certification" ? (
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.745 3.745 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                        </svg>
                      ) : cred.type === "education" ? (
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                        </svg>
                      )}
                    </div>
                    <span className="text-sm text-dark leading-relaxed">{cred.label}</span>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-accent py-16">
        <FadeUp>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Let&apos;s build something that works.
            </h2>
            <p className="mt-4 text-lg text-white/80 max-w-xl mx-auto">
              Whether you need training, coaching, or a complete digital operations system —
              it all starts with a conversation.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-block bg-white text-accent font-semibold px-10 py-4 rounded-full hover:bg-gray-100 transition-colors"
              >
                Get in touch
              </Link>
              <Link
                href="/solutions"
                className="inline-flex items-center gap-1.5 text-white/60 hover:text-white font-medium transition-colors"
              >
                Explore the ECO platform &rarr;
              </Link>
            </div>
          </div>
        </FadeUp>
      </section>
    </main>
  );
}
