import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/components/forms/ContactForm";
import FadeUp from "@/components/shared/FadeUp";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with AdaptiveOps to discuss your operational challenges and explore how we can help improve performance across your organization.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact — AdaptiveOps",
    description:
      "Book your free 30-minute diagnostic call for training, coaching or digital solutions.",
    url: "/contact",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact — AdaptiveOps",
    description:
      "Discuss your operational challenges and explore how AdaptiveOps can help improve performance.",
    images: ["/og-image.png"],
  },
};

export default function ContactPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary py-20">
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.05]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="gridContact" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#gridContact)" />
          </svg>
        </div>
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <span className="inline-block text-xs font-bold tracking-widest uppercase text-accent mb-4">
              Let&apos;s talk
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">
              Contact Us
            </h1>
          </FadeUp>
          <FadeUp delay={100}>
            <p className="mt-5 text-lg text-white/60 max-w-2xl leading-relaxed">
              Ready to improve your operational performance? Whether you need training,
              coaching, or a complete digital operations system — it all starts with a conversation.
            </p>
          </FadeUp>
          <FadeUp delay={200}>
            <p className="mt-6 text-sm text-white/30 tracking-wide">
              24h Response &nbsp;&middot;&nbsp; Free 30-Min Diagnostic Call &nbsp;&middot;&nbsp; Tailored Solutions
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Form */}
            <FadeUp className="lg:col-span-3">
              <div>
                <span className="inline-block text-xs font-bold tracking-widest uppercase text-accent mb-3">
                  Send a message
                </span>
                <h2 className="text-2xl font-bold text-primary mb-6">
                  Tell us about your challenge
                </h2>
                <ContactForm />
              </div>
            </FadeUp>

            {/* Sidebar */}
            <FadeUp delay={150} className="lg:col-span-2">
              <div className="sticky top-24 space-y-5">
                {/* What to expect */}
                <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
                  <h3 className="text-xs font-bold tracking-widest uppercase text-accent mb-4">
                    What to expect
                  </h3>
                  <ul className="space-y-3">
                    {[
                      { text: "We respond within 24 hours", icon: "clock" },
                      { text: "Free 30-minute diagnostic call", icon: "chat" },
                      { text: "Tailored proposal based on your needs", icon: "doc" },
                    ].map((item) => (
                      <li key={item.text} className="flex items-start gap-3">
                        <div className="w-7 h-7 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          {item.icon === "clock" && (
                            <svg className="w-3.5 h-3.5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                          )}
                          {item.icon === "chat" && (
                            <svg className="w-3.5 h-3.5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
                            </svg>
                          )}
                          {item.icon === "doc" && (
                            <svg className="w-3.5 h-3.5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                            </svg>
                          )}
                        </div>
                        <span className="text-sm text-mid leading-relaxed">{item.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Direct contact */}
                <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
                  <h3 className="text-xs font-bold tracking-widest uppercase text-accent mb-4">
                    Reach us directly
                  </h3>
                  <div className="space-y-3">
                    <a
                      href="tel:+40740230178"
                      className="flex items-center gap-3 text-sm text-mid hover:text-primary transition-colors"
                    >
                      <div className="w-7 h-7 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <svg className="w-3.5 h-3.5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                        </svg>
                      </div>
                      +40 740 230 178
                    </a>
                    <a
                      href="mailto:ghermanclaudiu77@gmail.com"
                      className="flex items-center gap-3 text-sm text-mid hover:text-primary transition-colors"
                    >
                      <div className="w-7 h-7 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <svg className="w-3.5 h-3.5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                        </svg>
                      </div>
                      ghermanclaudiu77@gmail.com
                    </a>
                    <div className="flex items-center gap-3 text-sm text-mid">
                      <div className="w-7 h-7 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <svg className="w-3.5 h-3.5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                        </svg>
                      </div>
                      Pitești, Romania
                    </div>
                    <a
                      href="https://www.linkedin.com/in/ghermanclaudiucristian/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-sm text-mid hover:text-accent transition-colors"
                    >
                      <div className="w-7 h-7 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <svg className="w-3.5 h-3.5 text-accent" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      </div>
                      LinkedIn — Claudiu Gherman
                    </a>
                  </div>
                </div>

                {/* Areas */}
                <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
                  <h3 className="text-xs font-bold tracking-widest uppercase text-accent mb-4">
                    Areas we can help with
                  </h3>
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
                        className="text-xs bg-light border border-gray-200 text-mid px-3 py-1.5 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Quote */}
                <div className="bg-primary rounded-xl p-6">
                  <svg className="w-6 h-6 text-accent/40 mb-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <p className="text-sm leading-relaxed text-white/70">
                    We don&apos;t just advise. We implement. Every solution we propose is built
                    on real experience from real factories.
                  </p>
                  <p className="mt-3 text-sm font-semibold text-white">
                    Gherman Claudiu Cristian
                  </p>
                  <p className="text-xs text-white/40">Founder &amp; Principal Consultant</p>
                </div>

                {/* ECO reference */}
                <div className="bg-light border border-gray-100 rounded-xl p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 bg-accent rounded-md flex items-center justify-center text-[10px] font-black text-white">
                      E
                    </div>
                    <span className="text-xs font-bold tracking-widest uppercase text-accent">
                      ECO Platform
                    </span>
                  </div>
                  <p className="text-xs text-mid leading-relaxed mb-3">
                    Explore our integrated digital management systems before reaching out.
                  </p>
                  <Link
                    href="/solutions"
                    className="text-xs font-semibold text-accent hover:text-blue-600 transition-colors"
                  >
                    See the platform &rarr;
                  </Link>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>
    </main>
  );
}
