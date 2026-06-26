"use client";

import { useState } from "react";

/**
 * Inline meetergo booking for the free 30-minute diagnostic call.
 *
 * GDPR: meetergo is a third-party iframe that may set cookies, so it is NOT
 * loaded on page render. We show a click-to-load facade — the iframe mounts
 * only after the visitor explicitly asks for it. This keeps the page free of
 * third-party requests until the visitor opts in, decoupled from the analytics
 * cookie banner (which gates Google Analytics only).
 *
 * URL: `NEXT_PUBLIC_MEETERGO_DIAGNOSTIC_URL` overrides if set; otherwise it
 * falls back to the founder's live 30-minute meetergo event. Setting the env
 * var lets us point at a dedicated "30-Min Diagnostic" event later (nicer name
 * + qualification questions) without a code change. If both were ever empty the
 * component renders nothing and the contact form below becomes the primary path.
 */
const DEFAULT_BOOKING_URL =
  "https://cal.meetergo.com/ghermanclaudiu77/30-min-meeting-with-ghermanclaudiu77";

const BOOKING_URL =
  process.env.NEXT_PUBLIC_MEETERGO_DIAGNOSTIC_URL || DEFAULT_BOOKING_URL;

export default function MeetergoEmbed() {
  const [loaded, setLoaded] = useState(false);

  // Graceful fallback: nothing configured at all → render nothing, the form
  // below takes over as the primary path.
  if (!BOOKING_URL) return null;

  if (loaded) {
    return (
      <div className="overflow-hidden rounded-xl border border-[#E5E7EB] bg-white shadow-[0_4px_14px_rgba(47,128,237,0.08)]">
        <iframe
          src={BOOKING_URL}
          title="Book your free 30-minute diagnostic call"
          loading="lazy"
          className="w-full h-[640px] sm:h-[720px] border-0"
        />
      </div>
    );
  }

  // Click-to-load facade.
  return (
    <div className="rounded-xl border border-[#E5E7EB] bg-white p-7 sm:p-9 shadow-[0_4px_14px_rgba(11,31,59,0.06)]">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
          <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
          </svg>
        </div>
        <div>
          <h3 className="text-xl font-bold text-primary leading-snug">
            Pick a time that works for you
          </h3>
          <p className="mt-1 text-mid leading-relaxed">
            30 minutes &middot; Free &middot; With the founder, not a sales rep &middot; No pitch
          </p>
        </div>
      </div>

      <ul className="mt-6 space-y-2.5 text-sm text-mid">
        {[
          "Instant confirmation with your meeting link",
          "Calendar invite + reminders before the call",
          "A concrete next step you keep — even if you don't hire us",
        ].map((line) => (
          <li key={line} className="flex items-start gap-2.5">
            <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            <span>{line}</span>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={() => setLoaded(true)}
        className="mt-7 w-full inline-flex items-center justify-center gap-2 bg-accent hover:bg-[#2563EB] text-white font-semibold px-7 py-4 rounded-lg transition-colors active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
      >
        Show available times
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
        </svg>
      </button>

      <p className="mt-3 text-xs text-mid text-center leading-relaxed">
        Loads the booking calendar from meetergo, a third-party scheduling tool.
      </p>
    </div>
  );
}
