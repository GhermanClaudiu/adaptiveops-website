"use client";

import { useState } from "react";
import Turnstile from "@/components/resources/Turnstile";
import { WORKSHOPS } from "@/lib/content/workshops";

// Cloudflare Turnstile SITE key is public (rendered into the browser anyway).
const SITE_KEY =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "0x4AAAAAADpFjD_w0lL5oXUh";
const MAX_QUOTE = 800;

const inputCls =
  "w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-primary placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:border-accent";
const labelCls = "block text-sm font-semibold text-primary mb-1.5";
const errCls = "mt-1 text-xs text-red-600";

/** Star picker (1–5), accessible as a radiogroup. */
function RatingPicker({
  value,
  onChange,
}: {
  value: number;
  onChange: (n: number) => void;
}) {
  const [hover, setHover] = useState(0);
  const shown = hover || value;
  return (
    <div role="radiogroup" aria-label="Rating" className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          role="radio"
          aria-checked={value === n}
          aria-label={`${n} star${n > 1 ? "s" : ""}`}
          onClick={() => onChange(n)}
          onMouseEnter={() => setHover(n)}
          onMouseLeave={() => setHover(0)}
          className="p-0.5 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <svg
            className={`w-7 h-7 ${n <= shown ? "text-amber-400" : "text-gray-300"}`}
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path d="M9.05 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 0 0 .95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.367 2.446a1 1 0 0 0-.364 1.118l1.287 3.957c.3.922-.755 1.688-1.54 1.118l-3.366-2.446a1 1 0 0 0-1.176 0l-3.366 2.446c-.784.57-1.838-.196-1.539-1.118l1.286-3.957a1 1 0 0 0-.363-1.118L2.354 9.374c-.783-.57-.38-1.81.588-1.81h4.161a1 1 0 0 0 .951-.69l1.286-3.957Z" />
          </svg>
        </button>
      ))}
    </div>
  );
}

/**
 * Post-workshop testimonial form. When `workshopSlug` is given the topic is
 * locked; otherwise the participant picks it from a selector (the "one common
 * form" variant from the plan). Submissions email the founder, who curates the
 * good ones into the registry by hand (v1).
 */
export default function WorkshopTestimonialForm({
  workshopSlug,
}: {
  workshopSlug?: string;
}) {
  const [open, setOpen] = useState(false);
  const [slug, setSlug] = useState(workshopSlug ?? "");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [rating, setRating] = useState(0);
  const [quote, setQuote] = useState("");
  const [consent, setConsent] = useState(false);
  const [token, setToken] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [generic, setGeneric] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  function clientValidate(): boolean {
    const e: Record<string, string> = {};
    if (!slug) e.slug = "Please choose a workshop.";
    if (!name.trim()) e.name = "Please enter your name.";
    if (!role.trim()) e.role = "Please enter your role.";
    if (rating < 1 || rating > 5) e.rating = "Please pick a rating.";
    if (!quote.trim()) e.quote = "Please write a few words.";
    if (quote.length > MAX_QUOTE) e.quote = `Please keep it under ${MAX_QUOTE} characters.`;
    if (!consent) e.consent = "Please tick the consent box.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    setGeneric(null);
    if (!clientValidate()) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/workshop-testimonial", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          workshopSlug: slug,
          name: name.trim(),
          role: role.trim(),
          company: company.trim() || undefined,
          rating,
          quote: quote.trim(),
          consent,
          turnstileToken: token,
        }),
      });
      if (res.ok) {
        setSuccess(true);
      } else {
        const data = await res.json().catch(() => ({}));
        setGeneric((data as Record<string, string>).error || "Something went wrong. Try again.");
        setToken("");
      }
    } catch {
      setGeneric("Something went wrong. Try again.");
      setToken("");
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <div className="rounded-2xl border border-secondary/30 bg-secondary/5 p-6 sm:p-8">
        <div className="flex items-start gap-3">
          <svg className="w-6 h-6 flex-shrink-0 text-secondary mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
          <div>
            <h4 className="text-lg font-bold text-primary">Thank you</h4>
            <p className="mt-1 text-mid leading-relaxed">
              Your feedback was sent. With your consent it may appear on this page after a
              quick review.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 border border-accent text-accent font-semibold px-6 py-3 rounded-lg hover:bg-accent/5 transition-colors active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
      >
        Leave feedback on this workshop
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="rounded-2xl border border-gray-100 bg-white shadow-sm p-6 sm:p-8">
      <h4 className="text-lg font-bold text-primary">Share your feedback</h4>
      <p className="mt-1 text-sm text-mid">
        Attended a workshop? Tell us how it went. With your consent we may feature it here &mdash;
        real name and role, please.
      </p>

      {/* Workshop selector (only when not pre-selected) */}
      {!workshopSlug && (
        <div className="mt-5">
          <label className={labelCls} htmlFor="w-slug">Workshop</label>
          <select
            id="w-slug"
            className={inputCls}
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
          >
            <option value="">Choose a workshop…</option>
            {WORKSHOPS.map((w) => (
              <option key={w.slug} value={w.slug}>{w.title}</option>
            ))}
          </select>
          {errors.slug && <p className={errCls}>{errors.slug}</p>}
        </div>
      )}

      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelCls} htmlFor="w-name">Name</label>
          <input id="w-name" className={inputCls} value={name}
            onChange={(e) => setName(e.target.value)} maxLength={120} autoComplete="name" />
          {errors.name && <p className={errCls}>{errors.name}</p>}
        </div>
        <div>
          <label className={labelCls} htmlFor="w-role">Role</label>
          <input id="w-role" className={inputCls} value={role} placeholder="e.g. Production Manager"
            onChange={(e) => setRole(e.target.value)} maxLength={120} autoComplete="organization-title" />
          {errors.role && <p className={errCls}>{errors.role}</p>}
        </div>
        <div className="sm:col-span-2">
          <label className={labelCls} htmlFor="w-company">
            Company <span className="font-normal text-mid">(optional)</span>
          </label>
          <input id="w-company" className={inputCls} value={company}
            onChange={(e) => setCompany(e.target.value)} maxLength={120} autoComplete="organization" />
        </div>
      </div>

      <div className="mt-4">
        <label className={labelCls}>Rating</label>
        <RatingPicker value={rating} onChange={setRating} />
        {errors.rating && <p className={errCls}>{errors.rating}</p>}
      </div>

      <div className="mt-4">
        <label className={labelCls} htmlFor="w-quote">Your feedback</label>
        <textarea id="w-quote" className={`${inputCls} min-h-[120px] resize-y`} value={quote}
          onChange={(e) => setQuote(e.target.value)} maxLength={MAX_QUOTE}
          placeholder="What did you take away from this workshop?" />
        <div className="mt-1 flex justify-between">
          {errors.quote ? <p className={errCls}>{errors.quote}</p> : <span />}
          <span className="text-xs text-mid tabular-nums">{quote.length}/{MAX_QUOTE}</span>
        </div>
      </div>

      <label className="mt-4 flex items-start gap-2.5 cursor-pointer" htmlFor="w-consent">
        <input id="w-consent" type="checkbox" checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5 h-4 w-4 rounded border-gray-300 text-accent focus-visible:ring-2 focus-visible:ring-accent" />
        <span className="text-sm text-mid leading-relaxed">
          I agree to AdaptiveOps publishing this feedback with my name, role and company on this site.
        </span>
      </label>
      {errors.consent && <p className={errCls}>{errors.consent}</p>}

      <div className="mt-5">
        <Turnstile
          sitekey={SITE_KEY}
          action="workshop-testimonial"
          appearance="interaction-only"
          onVerify={setToken}
          onExpire={() => setToken("")}
          onError={() => setToken("")}
        />
      </div>

      {generic && <p className="mt-4 text-sm text-red-600">{generic}</p>}

      <div className="mt-5 flex items-center gap-3">
        <button
          type="submit"
          disabled={submitting || !consent}
          className="inline-flex items-center gap-2 bg-accent hover:bg-blue-600 text-white font-semibold px-7 py-3 rounded-lg transition-colors active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-accent"
        >
          {submitting ? "Submitting…" : "Submit feedback"}
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="text-sm font-medium text-mid hover:text-primary transition-colors px-2 py-2 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
