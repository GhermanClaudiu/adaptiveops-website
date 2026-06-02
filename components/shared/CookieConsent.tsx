"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { GoogleAnalytics } from "@next/third-parties/google";

type Consent = "accepted" | "declined" | null;

const STORAGE_KEY = "cookie-consent";

/**
 * Single source of truth for cookie consent.
 * Google Analytics is loaded ONLY after the user explicitly accepts —
 * required by GDPR / ePrivacy because GA sets non-essential analytics cookies.
 * "Decline" means GA never loads and no _ga cookies are set.
 */
export default function CookieConsent({ gaId }: { gaId?: string }) {
  // null until we have read localStorage on the client (avoids hydration mismatch)
  const [consent, setConsent] = useState<Consent>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "accepted" || stored === "declined") {
      setConsent(stored);
    }
    setReady(true);

    // Allow other parts of the site (e.g. the cookie policy page) to re-open
    // the banner so visitors can change their decision at any time.
    function reopen() {
      window.localStorage.removeItem(STORAGE_KEY);
      setConsent(null);
    }
    window.addEventListener("cookie-consent:reset", reopen);
    return () => window.removeEventListener("cookie-consent:reset", reopen);
  }, []);

  function decide(value: Exclude<Consent, null>) {
    window.localStorage.setItem(STORAGE_KEY, value);
    setConsent(value);
  }

  const showBanner = ready && consent === null;
  const loadAnalytics = ready && consent === "accepted" && Boolean(gaId);

  return (
    <>
      {loadAnalytics && <GoogleAnalytics gaId={gaId as string} />}

      {showBanner && (
        <div
          role="dialog"
          aria-live="polite"
          aria-label="Cookie consent"
          className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-sm z-50 bg-[#0B1F3B] border border-white/10 rounded-xl p-5 shadow-[0_12px_40px_rgba(11,31,59,0.45)] print:hidden"
        >
          <p className="text-sm text-white/75 leading-relaxed">
            We use cookies to analyse site traffic and improve your experience.
            Analytics cookies load only if you accept. See our{" "}
            <Link
              href="/cookie-policy"
              className="text-accent underline underline-offset-2 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded transition-colors"
            >
              Cookie Policy
            </Link>
            .
          </p>
          <div className="flex gap-3 mt-4">
            <button
              type="button"
              onClick={() => decide("declined")}
              className="text-sm text-white/70 hover:text-white px-3 py-1.5 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Decline
            </button>
            <button
              type="button"
              onClick={() => decide("accepted")}
              className="text-sm bg-accent hover:bg-[#2563EB] active:scale-[0.98] text-white font-semibold px-4 py-1.5 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1F3B]"
            >
              Accept
            </button>
          </div>
        </div>
      )}
    </>
  );
}
