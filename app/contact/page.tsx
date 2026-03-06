import type { Metadata } from "next";
import ContactForm from "@/components/forms/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with AdaptiveOps. Request a consultation for training, coaching or digital solutions.",
  openGraph: {
    title: "Contact — AdaptiveOps",
    description:
      "Request a consultation for training, coaching or digital solutions.",
  },
};

export default function ContactPage() {
  return (
    <main>
      {/* Page Hero */}
      <section className="bg-primary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-5xl font-bold text-white">Contact Us</h1>
          <p className="mt-4 text-lg text-white/70 max-w-2xl">
            Ready to improve your operational performance? Let&apos;s talk.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Form */}
            <div className="lg:col-span-3">
              <h2 className="text-2xl font-bold text-primary mb-6">Send us a message</h2>
              <ContactForm />
            </div>

            {/* Contact info */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-primary mb-6">Get in touch</h2>
              <div className="space-y-6">
                <div className="bg-light rounded-xl p-6">
                  <h3 className="font-semibold text-primary mb-2">What to expect</h3>
                  <ul className="space-y-2 text-sm text-mid">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-accent rounded-full mt-1.5 flex-shrink-0" />
                      We respond within 24 hours
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-accent rounded-full mt-1.5 flex-shrink-0" />
                      Free initial consultation
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-accent rounded-full mt-1.5 flex-shrink-0" />
                      Tailored proposal based on your needs
                    </li>
                  </ul>
                </div>

                <div className="bg-light rounded-xl p-6">
                  <h3 className="font-semibold text-primary mb-2">Areas we can help with</h3>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Lean Manufacturing",
                      "Problem Solving",
                      "OEE Improvement",
                      "Leadership Training",
                      "Management Systems",
                      "Equipment Management",
                      "Quality Systems",
                      "Digital Solutions",
                    ].map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-white border border-gray-200 text-mid px-3 py-1.5 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-primary rounded-xl p-6 text-white">
                  <p className="text-sm leading-relaxed text-white/70">
                    &ldquo;We don&apos;t just advise. We implement. Every solution we propose is built
                    on real experience from real factories.&rdquo;
                  </p>
                  <p className="mt-3 text-sm font-semibold">
                    — Gherman Claudiu Cristian, Founder
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
