"use client";

import { useState } from "react";
import Turnstile from "@/components/resources/Turnstile";
import {
  registerForWorkshop,
  type RegistrationStatus,
} from "@/lib/workshopRegistration";

// Cloudflare Turnstile SITE key is public (rendered into the browser anyway).
const SITE_KEY =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "0x4AAAAAADpFjD_w0lL5oXUh";

const inputCls =
  "w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-primary placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:border-accent";
const labelCls = "block text-sm font-semibold text-primary mb-1.5";
const errCls = "mt-1 text-xs text-red-600";

/**
 * Native workshop registration form — posts to the Academy endpoint via
 * `registerForWorkshop`. Replaces the meetergo embed: the visitor registers
 * without leaving adaptiveops.eu. Academy sends confirmation + join link + .ics
 * + reminders. No phone field.
 */
export default function WorkshopRegisterForm({
  workshopSlug,
  displayDate,
  duration,
  language,
}: {
  workshopSlug: string;
  displayDate?: string;
  duration: string;
  language: string;
}) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [consent, setConsent] = useState(false);
  const [marketingOptIn, setMarketingOptIn] = useState(false);
  const [token, setToken] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [generic, setGeneric] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState<RegistrationStatus | null>(null);

  function clientValidate(): boolean {
    const e: Record<string, string> = {};
    if (!firstName.trim()) e.firstName = "Please enter your first name.";
    if (!lastName.trim()) e.lastName = "Please enter your last name.";
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      e.email = "Please enter a valid email.";
    if (!consent) e.consent = "Please tick the consent box.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    setGeneric(null);
    if (!clientValidate()) return;

    setSubmitting(true);
    const result = await registerForWorkshop({
      workshopSlug,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      company: company.trim() || undefined,
      role: role.trim() || undefined,
      consent,
      marketingOptIn,
      turnstileToken: token,
      language: "ro",
    });
    setSubmitting(false);

    if (result.ok) {
      setDone(result.status ?? "registered");
      return;
    }
    setGeneric(result.error ?? "Something went wrong. Please try again.");
    // Token is single-use; force the widget to re-issue on retry.
    setToken("");
  }

  if (done) {
    const already = done === "already_registered";
    return (
      <div className="rounded-2xl border border-secondary/30 bg-secondary/5 p-6 sm:p-8">
        <div className="flex items-start gap-3">
          <svg className="w-6 h-6 flex-shrink-0 text-secondary mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
          <div>
            <h4 className="text-lg font-bold text-primary">
              {already ? "You're already on the list" : "You're registered!"}
            </h4>
            <p className="mt-1 text-mid leading-relaxed">
              {already
                ? "This email is already registered for this workshop. Check your inbox for the confirmation and the join link."
                : "Check your email for the confirmation, the join link and a calendar invite. We'll send reminders before the session."}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="rounded-2xl border border-gray-200 bg-white shadow-sm p-6 sm:p-8">
      {displayDate && (
        <div className="flex items-start gap-3 pb-5 mb-5 border-b border-gray-100">
          <svg className="w-6 h-6 flex-shrink-0 text-accent mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
          </svg>
          <div>
            <p className="text-base font-bold text-primary leading-snug">{displayDate}</p>
            <p className="mt-0.5 text-sm text-mid">
              {duration} &middot; Online &middot; Free &middot; {language}
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelCls} htmlFor="r-first">First name</label>
          <input id="r-first" className={inputCls} value={firstName}
            onChange={(e) => setFirstName(e.target.value)} maxLength={80} autoComplete="given-name" />
          {errors.firstName && <p className={errCls}>{errors.firstName}</p>}
        </div>
        <div>
          <label className={labelCls} htmlFor="r-last">Last name</label>
          <input id="r-last" className={inputCls} value={lastName}
            onChange={(e) => setLastName(e.target.value)} maxLength={80} autoComplete="family-name" />
          {errors.lastName && <p className={errCls}>{errors.lastName}</p>}
        </div>
        <div className="sm:col-span-2">
          <label className={labelCls} htmlFor="r-email">Email</label>
          <input id="r-email" type="email" className={inputCls} value={email}
            onChange={(e) => setEmail(e.target.value)} maxLength={160} autoComplete="email" />
          {errors.email && <p className={errCls}>{errors.email}</p>}
        </div>
        <div>
          <label className={labelCls} htmlFor="r-company">
            Company <span className="font-normal text-mid">(optional)</span>
          </label>
          <input id="r-company" className={inputCls} value={company}
            onChange={(e) => setCompany(e.target.value)} maxLength={120} autoComplete="organization" />
        </div>
        <div>
          <label className={labelCls} htmlFor="r-role">
            Role <span className="font-normal text-mid">(optional)</span>
          </label>
          <input id="r-role" className={inputCls} value={role} placeholder="e.g. Production Manager"
            onChange={(e) => setRole(e.target.value)} maxLength={120} autoComplete="organization-title" />
        </div>
      </div>

      <label className="mt-5 flex items-start gap-2.5 cursor-pointer" htmlFor="r-consent">
        <input id="r-consent" type="checkbox" checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5 h-4 w-4 rounded border-gray-300 text-accent focus-visible:ring-2 focus-visible:ring-accent" />
        <span className="text-sm text-mid leading-relaxed">
          I agree to AdaptiveOps processing my details to register me for this workshop and send
          the joining link and reminders.
        </span>
      </label>
      {errors.consent && <p className={errCls}>{errors.consent}</p>}

      <label className="mt-3 flex items-start gap-2.5 cursor-pointer" htmlFor="r-marketing">
        <input id="r-marketing" type="checkbox" checked={marketingOptIn}
          onChange={(e) => setMarketingOptIn(e.target.checked)}
          className="mt-0.5 h-4 w-4 rounded border-gray-300 text-accent focus-visible:ring-2 focus-visible:ring-accent" />
        <span className="text-sm text-mid leading-relaxed">
          Also send me the monthly operational-excellence newsletter <span className="text-mid/70">(optional)</span>.
        </span>
      </label>

      <div className="mt-5">
        <Turnstile
          sitekey={SITE_KEY}
          action="workshop-registration"
          appearance="interaction-only"
          onVerify={setToken}
          onExpire={() => setToken("")}
          onError={() => setToken("")}
        />
      </div>

      {generic && <p className="mt-4 text-sm text-red-600">{generic}</p>}

      <button
        type="submit"
        disabled={submitting || !consent}
        className="mt-5 w-full inline-flex items-center justify-center gap-2 bg-accent hover:bg-blue-600 text-white font-semibold px-7 py-4 rounded-lg transition-colors active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-accent"
      >
        {submitting ? "Registering…" : "Register free"}
      </button>

      <p className="mt-3 text-xs text-mid text-center">
        Free &middot; You&apos;ll get the join link and reminders by email &middot; No account needed
      </p>
    </form>
  );
}
