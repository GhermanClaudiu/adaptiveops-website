import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "20+ years of hands-on experience in automotive manufacturing. Built from the shop floor up.",
  openGraph: {
    title: "About — AdaptiveOps",
    description:
      "20+ years of hands-on experience in automotive manufacturing. Built from the shop floor up.",
  },
};

const stats = [
  { value: "EUR 3.2M", label: "Yearly savings through regional Improvement Plan" },
  { value: "51%", label: "Efficiency increase with 300+ PPM reduction" },
  { value: "30%", label: "Scrap rate reduction through CI tools" },
  { value: "10%", label: "OEE improvement in preassembly area" },
];

const career = [
  { role: "Production Manager", company: "Lear Corporation Romania (Fortune 500)", period: "2018 – present" },
  { role: "Production Area Manager", company: "Leoni Wiring Systems", period: "2016 – 2018" },
  { role: "Lean Manager Coach / Productivity System Manager", company: "Leoni", period: "2012 – 2016" },
  { role: "Production Manager", company: "Leoni", period: "2008 – 2012" },
  { role: "UAP Production Manager", company: "Valeo Pitesti", period: "2007 – 2008" },
];

const certifications = [
  "CPIM — Certified in Production and Inventory Management (APICS)",
  "NLP Practitioner — Neuro-Linguistic Programming",
  "Toyota Kata — Lean Partners",
  "Master's Degree in Design of Flexible Systems — Technical University Cluj-Napoca",
  "Bachelor's Degree in Robotics — Technical University Cluj-Napoca",
];

export default function AboutPage() {
  return (
    <main>
      {/* Page Hero */}
      <section className="bg-primary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-5xl font-bold text-white">About AdaptiveOps</h1>
          <p className="mt-4 text-lg text-white/70 max-w-2xl">
            Helping organizations build better operational systems through people, processes and technology.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">Our Mission</h2>
            <p className="text-xl text-mid leading-relaxed">
              We help industrial organizations achieve operational excellence by combining practical
              training, hands-on coaching and digital solutions. We speak the language of people on the
              production floor — because that&apos;s where we come from.
            </p>
            <div className="mt-8 flex justify-center gap-8 text-sm text-mid">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-accent rounded-full" />
                People
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-secondary rounded-full" />
                Processes
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full" />
                Technology
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.value} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-accent">{stat.value}</div>
                <div className="mt-2 text-sm text-mid">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Photo placeholder + info */}
            <div className="lg:col-span-2">
              <div className="bg-light rounded-2xl aspect-[3/4] flex items-center justify-center border border-gray-200 mb-6">
                <div className="text-center px-6">
                  <div className="w-24 h-24 rounded-full bg-accent/10 mx-auto mb-4 flex items-center justify-center">
                    <svg className="w-12 h-12 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>
                  </div>
                  <div className="text-xl font-bold text-primary">Gherman Claudiu Cristian</div>
                  <div className="text-sm text-mid mt-1">Founder &amp; Principal Consultant</div>
                </div>
              </div>

              {/* Certifications */}
              <h3 className="text-lg font-semibold text-primary mb-3">Certifications &amp; Education</h3>
              <ul className="space-y-2">
                {certifications.map((cert) => (
                  <li key={cert} className="flex items-start gap-2 text-sm text-mid">
                    <svg className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                    {cert}
                  </li>
                ))}
              </ul>
            </div>

            {/* Career + philosophy */}
            <div className="lg:col-span-3">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                Built from the shop floor up
              </h2>
              <p className="text-lg text-mid leading-relaxed mb-8">
                20+ years of hands-on experience in automotive manufacturing and industrial operations.
                From managing production lines at Valeo and Leoni to leading operations at Lear Corporation (Fortune 500),
                every system we teach and build comes from real factory experience.
              </p>

              <h3 className="text-lg font-semibold text-primary mb-4">Career Highlights</h3>
              <div className="space-y-4 mb-10">
                {career.map((item) => (
                  <div key={item.period} className="flex gap-4 items-start">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-dark">{item.role}</div>
                      <div className="text-sm text-mid">{item.company} &middot; {item.period}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quote */}
              <div className="bg-primary rounded-xl p-8 text-white">
                <svg className="w-8 h-8 text-accent mb-4 opacity-60" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="text-lg leading-relaxed">
                  We don&apos;t just advise. We implement. Every training program, every coaching session,
                  every digital tool is built on real experience from real factories.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-accent py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Let&apos;s work together
          </h2>
          <p className="mt-4 text-lg text-white/80 max-w-xl mx-auto">
            Whether you need training, coaching or digital solutions — we&apos;re here to help.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-block bg-white text-accent font-semibold px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Get in touch
          </Link>
        </div>
      </section>
    </main>
  );
}
