import Link from "next/link";

/**
 * Registration call-to-action for a workshop detail page.
 *
 * For a FIXED-DATE workshop a scheduling calendar is the wrong metaphor — the
 * session has one time, the visitor doesn't pick it. So instead of embedding the
 * meetergo calendar inline, we show a clean card with the fixed date + a single
 * prominent button that opens the meetergo booking form in a new tab. meetergo
 * still handles the form, confirmation, .ics, Google Meet link and reminders.
 *
 * Two states:
 *  1. No `meetergoUrl` yet → "registration opens soon" + newsletter CTA.
 *  2. URL set → date/meta card + "Register free" button (opens meetergo).
 *
 * Opening meetergo in a new tab means no third-party iframe loads on our page,
 * so there's no cookie-consent concern here.
 */
export default function WorkshopMeetergoEmbed({
  meetergoUrl,
  title,
  displayDate,
  duration,
  language,
}: {
  meetergoUrl?: string;
  title: string;
  displayDate?: string;
  duration: string;
  language: string;
}) {
  // State 1 — no event configured yet.
  if (!meetergoUrl) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-light p-8 sm:p-10 text-center">
        <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-accent">
          <span className="w-2 h-2 rounded-full bg-accent" aria-hidden="true" />
          Registration opens soon
        </span>
        <h3 className="mt-4 text-xl font-bold text-primary">
          The next date is being scheduled
        </h3>
        <p className="mt-2 text-mid leading-relaxed max-w-md mx-auto">
          This workshop is free and runs online. Registration isn&apos;t open yet
          &mdash; leave your email below and we&apos;ll tell you the moment the next
          session is scheduled.
        </p>
        <Link
          href="#workshop-newsletter"
          className="mt-6 inline-flex items-center gap-2 bg-accent hover:bg-blue-600 text-white font-semibold px-7 py-3.5 rounded-lg transition-colors active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        >
          Notify me about the next session
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
          </svg>
        </Link>
      </div>
    );
  }

  // State 2 — registration CTA card.
  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-7 sm:p-8">
      {displayDate && (
        <div className="flex items-start gap-3">
          <svg className="w-6 h-6 flex-shrink-0 text-accent mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
          </svg>
          <div>
            <p className="text-lg font-bold text-primary leading-snug">{displayDate}</p>
            <p className="mt-0.5 text-sm text-mid">
              {duration} &middot; Online (Google Meet) &middot; Free &middot; {language}
            </p>
          </div>
        </div>
      )}

      <a
        href={meetergoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 w-full inline-flex items-center justify-center gap-2 bg-accent hover:bg-blue-600 text-white font-semibold px-7 py-4 rounded-lg transition-colors active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
      >
        Register free
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
        </svg>
        <span className="sr-only">(opens registration in a new tab)</span>
      </a>

      <ul className="mt-5 space-y-2 text-sm text-mid">
        {[
          "Instant confirmation email with your Google Meet link",
          "Calendar invite + reminders before the session",
          "No account needed — just your name and email",
        ].map((line) => (
          <li key={line} className="flex items-start gap-2.5">
            <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            <span>{line}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
