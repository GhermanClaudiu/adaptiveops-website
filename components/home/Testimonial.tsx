import FadeUp from "@/components/shared/FadeUp";

export default function Testimonial() {
  return (
    <section className="bg-light py-20">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-12">
        <FadeUp>
          <p className="text-center text-xs font-bold tracking-widest uppercase text-accent mb-12">
            What senior leaders say
          </p>
        </FadeUp>

        <FadeUp delay={100}>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-100 relative">

              {/* Quote mark */}
              <div className="absolute top-8 left-8 md:top-10 md:left-10 text-accent/10 select-none pointer-events-none">
                <svg width="64" height="48" viewBox="0 0 64 48" fill="currentColor">
                  <path d="M0 48V29.333C0 12.8 9.067 3.2 27.2 0L30.4 5.333C21.867 7.467 17.6 12.267 17.6 19.733H28.8V48H0ZM35.2 48V29.333C35.2 12.8 44.267 3.2 62.4 0L65.6 5.333C57.067 7.467 52.8 12.267 52.8 19.733H64V48H35.2Z" />
                </svg>
              </div>

              {/* Pull quote */}
              <div className="mb-8 pl-4 border-l-4 border-accent">
                <p className="text-primary font-bold text-lg md:text-xl leading-snug">
                  &ldquo;His dedication, professional approach, and ability to deliver tangible,
                  measurable results have far exceeded our expectations.&rdquo;
                </p>
              </div>

              {/* Full text */}
              <p className="text-mid leading-relaxed text-[15px] mb-10">
                Claudiu became in charge of Lear Romania Production at a time the plant was facing
                significant and challenging issues. Claudiu&apos;s energy, knowledge, capability and
                teamwork ability was a contributing factor in turning around the operations and
                addressing critical issues. As the Director of Europe Operations at that time I
                appreciated his constructive approach and dedication to corporate goals, procedures
                and policies and his excellent execution skills combined with his Lean Mindset. I
                am very confident that he will deliver results by exceeding the expectations.
              </p>

              {/* Attribution */}
              <div className="flex items-center justify-between flex-wrap gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">FA</span>
                  </div>
                  <div>
                    <p className="font-bold text-primary text-base">Ferdi Aksoy</p>
                    <p className="text-mid text-sm">Vice President – Global Logistics</p>
                    <p className="text-mid text-sm">Director of Europe Operations, Lear Corporation</p>
                  </div>
                </div>

                <a
                  href="https://www.linkedin.com/in/ghermanclaudiucristian/details/recommendations/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-mid hover:text-accent transition-colors"
                >
                  <svg className="w-4 h-4 text-[#0A66C2]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  Verified on LinkedIn
                </a>
              </div>
            </div>
          </div>
        </FadeUp>

        {/* Context note */}
        <FadeUp delay={200}>
          <p className="text-center text-sm text-mid mt-8 max-w-xl mx-auto">
            Lear Corporation is a Fortune 500 automotive Tier-1 supplier with 186,000 employees
            across 38 countries. This recommendation reflects results achieved during active
            production operations — not a pilot programme.
          </p>
        </FadeUp>
      </div>
    </section>
  );
}
