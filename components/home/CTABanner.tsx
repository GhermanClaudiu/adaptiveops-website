import Link from "next/link";

export default function CTABanner() {
  return (
    <section className="bg-accent py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white">
          Ready to improve your operational performance?
        </h2>
        <p className="mt-4 text-lg text-white/80 max-w-xl mx-auto">
          Schedule a discovery call and let&apos;s discuss how we can help your organization.
        </p>
        <Link
          href="/contact"
          className="mt-8 inline-block bg-white text-accent font-semibold px-8 py-4 rounded-lg hover:bg-gray-100 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-shadow"
        >
          Book Your Free 30-Min Diagnostic Call
        </Link>
      </div>
    </section>
  );
}
