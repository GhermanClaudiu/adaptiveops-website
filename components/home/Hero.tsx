import Link from "next/link";

// TODO: replace with real industrial photo
// Add hero-bg.jpg to /public and uncomment the Image import + element below

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-[#0D2B4E]">
      {/* Background image overlay — uncomment when hero-bg.jpg is added */}
      {/* <Image src="/hero-bg.jpg" alt="" fill className="object-cover" priority /> */}
      {/* <div className="absolute inset-0 bg-primary/85" /> */}

      {/* Geometric grid pattern */}
      <div className="absolute inset-0 opacity-[0.05]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Accent glow */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 lg:py-40">
        <div className="max-w-3xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.15]">
            Operational{" "}
            <span className="text-accent">Excellence</span>
            <br className="hidden sm:block" /> through Training, Coaching
            <br className="hidden sm:block" /> and Digital Solutions
          </h1>
          <p className="mt-6 text-lg md:text-xl text-white/60 leading-relaxed max-w-2xl">
            AdaptiveOps helps industrial organizations improve performance
            through practical training, operational coaching and digital
            management systems.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <Link
              href="/contact"
              className="inline-block bg-accent hover:bg-blue-600 text-white font-semibold px-10 py-4 rounded-full transition-colors text-lg"
            >
              Request a consultation
            </Link>
            <Link
              href="/solutions"
              className="inline-flex items-center gap-1.5 text-white/50 hover:text-white font-medium transition-colors"
            >
              Explore solutions &rarr;
            </Link>
          </div>

          <p className="mt-12 text-sm text-white/30 tracking-wide">
            Trusted by automotive and manufacturing organizations
          </p>
        </div>
      </div>
    </section>
  );
}
