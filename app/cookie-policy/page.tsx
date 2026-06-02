import type { Metadata } from "next";
import Link from "next/link";
import CookiePreferencesButton from "@/components/shared/CookiePreferencesButton";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "How AdaptiveOps uses cookies. We load analytics cookies only after you consent — and you can change your choice at any time.",
  alternates: {
    canonical: "https://www.adaptiveops.eu/cookie-policy",
  },
  openGraph: {
    title: "Cookie Policy — AdaptiveOps",
    description:
      "How AdaptiveOps uses cookies. Analytics cookies load only after you consent.",
    url: "https://www.adaptiveops.eu/cookie-policy",
  },
};

const LAST_UPDATED = "2 June 2026";

const analyticsCookies = [
  {
    name: "_ga",
    provider: "Google Analytics 4",
    purpose: "Distinguishes individual visitors so we can measure site usage.",
    duration: "2 years",
  },
  {
    name: "_ga_<container-id>",
    provider: "Google Analytics 4",
    purpose: "Persists session state for the analytics property.",
    duration: "2 years",
  },
];

export default function CookiePolicyPage() {
  return (
    <main className="bg-white">
      {/* Header */}
      <section className="bg-[#0B1F3B] text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">
            Legal
          </p>
          <h1 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight">
            Cookie Policy
          </h1>
          <p className="mt-4 text-base md:text-lg text-white/70 leading-relaxed">
            This policy explains what cookies are, which ones this website uses,
            and how you stay in control of them.
          </p>
          <p className="mt-6 text-sm text-white/50">
            Last updated: {LAST_UPDATED}
          </p>
        </div>
      </section>

      {/* Body */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
        <div className="space-y-12 text-[#374151] leading-relaxed text-base md:text-lg">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#0B1F3B]">
              What are cookies?
            </h2>
            <p className="mt-4">
              Cookies are small text files stored on your device when you visit a
              website. They are widely used to make sites work, to remember your
              preferences, and to provide usage statistics to site owners. Some
              technologies — such as your browser&rsquo;s local storage — work
              similarly and are covered by this policy too.
            </p>
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#0B1F3B]">
              Our approach to consent
            </h2>
            <p className="mt-4">
              We do not load any analytics or tracking cookies until you give us
              permission. When you first visit, a banner lets you{" "}
              <strong>Accept</strong> or <strong>Decline</strong>. Analytics
              cookies are set <strong>only</strong> if you accept. If you decline,
              no analytics cookies are placed on your device.
            </p>
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#0B1F3B]">
              Strictly necessary storage
            </h2>
            <p className="mt-4">
              To remember your cookie choice we store a single value in your
              browser&rsquo;s local storage:
            </p>
            <div className="mt-5 overflow-x-auto">
              <table className="w-full text-left text-sm border border-[#E5E7EB] rounded-xl overflow-hidden">
                <thead className="bg-[#F3F4F6] text-[#111827]">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Name</th>
                    <th className="px-4 py-3 font-semibold">Type</th>
                    <th className="px-4 py-3 font-semibold">Purpose</th>
                    <th className="px-4 py-3 font-semibold">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-[#E5E7EB]">
                    <td className="px-4 py-3 font-mono text-[#0B1F3B]">
                      cookie-consent
                    </td>
                    <td className="px-4 py-3">Local storage</td>
                    <td className="px-4 py-3">
                      Remembers whether you accepted or declined analytics
                      cookies, so we don&rsquo;t ask again.
                    </td>
                    <td className="px-4 py-3">Until cleared</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-sm text-[#6B7280]">
              This value contains no personal data and is never sent to a third
              party. Because it is essential to honour your choice, it does not
              require consent.
            </p>
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#0B1F3B]">
              Analytics cookies (only if you accept)
            </h2>
            <p className="mt-4">
              If you accept, we use Google Analytics 4 to understand how visitors
              use the site — which pages are read, on what device — so we can
              improve it. These cookies set the following:
            </p>
            <div className="mt-5 overflow-x-auto">
              <table className="w-full text-left text-sm border border-[#E5E7EB] rounded-xl overflow-hidden">
                <thead className="bg-[#F3F4F6] text-[#111827]">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Name</th>
                    <th className="px-4 py-3 font-semibold">Provider</th>
                    <th className="px-4 py-3 font-semibold">Purpose</th>
                    <th className="px-4 py-3 font-semibold">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  {analyticsCookies.map((c) => (
                    <tr key={c.name} className="border-t border-[#E5E7EB]">
                      <td className="px-4 py-3 font-mono text-[#0B1F3B]">
                        {c.name}
                      </td>
                      <td className="px-4 py-3">{c.provider}</td>
                      <td className="px-4 py-3">{c.purpose}</td>
                      <td className="px-4 py-3">{c.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-sm text-[#6B7280]">
              Google processes this data as described in the{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent underline underline-offset-2 hover:text-[#0B1F3B] transition-colors"
              >
                Google Privacy Policy
              </a>
              . You can read more about Google Analytics cookies in{" "}
              <a
                href="https://developers.google.com/analytics/devguides/collection/ga4/cookie-usage"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent underline underline-offset-2 hover:text-[#0B1F3B] transition-colors"
              >
                Google&rsquo;s documentation
              </a>
              .
            </p>
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#0B1F3B]">
              Hosting
            </h2>
            <p className="mt-4">
              This website is hosted on Vercel. Vercel may process technical
              request data (such as your IP address) to deliver the site
              securely, but this site does not set any Vercel or CDN tracking
              cookies on your device.
            </p>
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#0B1F3B]">
              Managing your preferences
            </h2>
            <p className="mt-4">
              You can change or withdraw your choice at any time. This reopens
              the consent banner — choosing Decline stops analytics cookies from
              loading on future visits.
            </p>
            <div className="mt-5">
              <CookiePreferencesButton />
            </div>
            <p className="mt-5 text-sm text-[#6B7280]">
              You can also delete existing cookies and block new ones through your
              browser settings. Note that blocking strictly necessary storage may
              mean the consent banner reappears on every visit.
            </p>
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#0B1F3B]">
              Contact
            </h2>
            <p className="mt-4">
              Questions about this policy or your data? Email us at{" "}
              <a
                href="mailto:ghermanclaudiu77@gmail.com"
                className="text-accent underline underline-offset-2 hover:text-[#0B1F3B] transition-colors"
              >
                ghermanclaudiu77@gmail.com
              </a>{" "}
              or use our{" "}
              <Link
                href="/contact"
                className="text-accent underline underline-offset-2 hover:text-[#0B1F3B] transition-colors"
              >
                contact page
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
