import Link from "next/link";
import FadeUp from "@/components/shared/FadeUp";

const included = [
  "On-premise software licence — perpetual, no annual renewal",
  "Initial setup, data population and configuration",
  "User training for your team",
  "5–6 months of free support and platform improvements",
  "Monthly maintenance after support period: €100 / month",
  "Exit at any time — no lock-in, no penalties",
];

export default function FoundingPartners() {
  return (
    <section className="py-20 bg-light border-t border-gray-100">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-12">
        <FadeUp>
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-bold tracking-widest uppercase text-accent mb-4">
              Limited Access
            </span>
            <h2 className="text-2xl md:text-4xl font-bold text-primary mb-4">
              Founding Partners Programme
            </h2>
            <p className="text-mid text-lg max-w-2xl mx-auto leading-relaxed">
              A fixed number of organisations can access ECO Platform at the founding price —
              before the standard licence fee applies. You get the platform. We get real-world
              feedback that shapes development.
            </p>
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Pricing card */}
          <FadeUp className="h-full">
            <div className="bg-primary rounded-2xl p-8 relative overflow-hidden h-full flex flex-col">
              {/* Background glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

              <div className="relative flex flex-col flex-1">
                <span className="inline-block bg-white/15 border border-white/25 text-white text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full mb-6">
                  Founding Partner Price
                </span>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-end gap-3 mb-1">
                    <span className="text-5xl md:text-6xl font-black text-white">€6,500</span>
                    <span className="text-white/70 text-sm pb-2">/ module<br />perpetual licence</span>
                  </div>
                  <div className="flex items-center gap-3 mt-3">
                    <span className="text-white/55 line-through text-lg">€15,000</span>
                    <span className="bg-accent text-white text-xs font-bold px-2.5 py-1 rounded-full">
                      Save €8,500 / module
                    </span>
                  </div>
                  <p className="text-white/55 text-xs mt-2">
                    Standard price applies after founding cohort closes
                  </p>
                </div>

                {/* Divider */}
                <div className="border-t border-white/10 mb-6" />

                {/* What's included */}
                <p className="text-white/70 text-xs font-bold uppercase tracking-widest mb-4">
                  What&apos;s included
                </p>
                <ul className="space-y-3 mb-8 flex-1">
                  {included.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      </span>
                      <span className="text-white/70 text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 bg-accent text-white font-semibold px-8 py-4 rounded-full hover:bg-accent/90 transition-colors"
                >
                  Apply for Founding Partner Access &rarr;
                </Link>
              </div>
            </div>
          </FadeUp>

          {/* Why founding partners */}
          <FadeUp delay={150}>
            <div className="space-y-6">
              {/* Positioning statement */}
              <div className="bg-white border border-gray-100 rounded-2xl p-7 shadow-sm">
                <p className="text-xl font-semibold text-primary leading-snug mb-3">
                  &ldquo;You&apos;re not just a client.
                  <br />
                  You&apos;re a co-author of the platform.&rdquo;
                </p>
                <p className="text-mid text-sm leading-relaxed">
                  Founding Partners get priority access to every new module, direct input into
                  the development roadmap, and a price that will never be available again once
                  the cohort closes.
                </p>
              </div>

              {/* Already live */}
              <div className="bg-white border border-gray-100 rounded-2xl p-7 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-primary mb-1">Not a promise — a live product</p>
                    <p className="text-mid text-sm leading-relaxed">
                      EMS is already deployed and running at our first client —
                      161 equipment assets managed, calibrations tracked automatically,
                      maintenance reports generated without manual effort.
                      You&apos;re not investing in vaporware.
                    </p>
                  </div>
                </div>
              </div>

              {/* Built on ISO */}
              <div className="bg-white border border-gray-100 rounded-2xl p-7 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-primary mb-1">On-premise. Your data stays yours.</p>
                    <p className="text-mid text-sm leading-relaxed">
                      No mandatory cloud. No recurring subscription. Built on ISO Annex L —
                      the common structure behind ISO 9001, ISO 55000 and ISO 45001.
                      One platform that speaks the language of your auditors.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
