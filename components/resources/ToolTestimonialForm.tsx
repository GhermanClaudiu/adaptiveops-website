"use client";

import { useRef, useState } from "react";
import Turnstile from "@/components/resources/Turnstile";
import { submitTestimonial } from "@/lib/toolStats";

// Cloudflare Turnstile SITE key is public (rendered into the browser anyway).
// Default to the real key so the form works on Vercel even without the env var;
// override via NEXT_PUBLIC_TURNSTILE_SITE_KEY (e.g. to swap keys) if needed.
const SITE_KEY =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "0x4AAAAAADpFjD_w0lL5oXUh";
const MAX_CONTENT = 800;

function newIdempotencyKey(): string {
  try {
    return crypto.randomUUID();
  } catch {
    return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  }
}

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

const inputCls =
  "w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-primary placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:border-accent";
const labelCls = "block text-sm font-semibold text-primary mb-1.5";
const errCls = "mt-1 text-xs text-red-600";

export default function ToolTestimonialForm({ toolSlug }: { toolSlug: string }) {
  const [open, setOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");
  const [consent, setConsent] = useState(false);
  const [token, setToken] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [generic, setGeneric] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const idemKey = useRef<string>("");

  if (!SITE_KEY) {
    // No site key configured — don't render a form that can't pass anti-spam.
    return null;
  }

  function clientValidate(): boolean {
    const e: Record<string, string> = {};
    if (!firstName.trim()) e.firstName = "Please enter your first name.";
    if (!lastName.trim()) e.lastName = "Please enter your last name.";
    if (!role.trim()) e.role = "Please enter your role.";
    if (rating < 1 || rating > 5) e.rating = "Please pick a rating.";
    if (!content.trim()) e.content = "Please write a few words.";
    if (content.length > MAX_CONTENT)
      e.content = `Please keep it under ${MAX_CONTENT} characters.`;
    if (!consent) e.consent = "Please tick the consent box.";
    if (!token) e.turnstileToken = "Please complete the anti-spam check.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    setGeneric(null);
    if (!clientValidate()) return;
    if (!idemKey.current) idemKey.current = newIdempotencyKey();

    setSubmitting(true);
    const result = await submitTestimonial(
      {
        toolSlug,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        role: role.trim(),
        company: company.trim() || undefined,
        rating,
        content: content.trim(),
        consent,
        turnstileToken: token,
        language: "en",
      },
      idemKey.current,
    );
    setSubmitting(false);

    if (result.ok) {
      setSuccess(true);
      return;
    }
    setErrors(result.fieldErrors);
    setGeneric(result.generic ?? null);
    // Token is single-use; force the widget to re-issue on retry.
    setToken("");
    idemKey.current = "";
  }

  if (success) {
    return (
      <div className="rounded-2xl border border-secondary/30 bg-secondary/5 p-6 sm:p-8">
        <div className="flex items-start gap-3">
          <svg
            className="w-6 h-6 flex-shrink-0 text-secondary mt-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
          <div>
            <h4 className="text-lg font-bold text-primary">Thank you</h4>
            <p className="mt-1 text-mid leading-relaxed">
              Your testimonial was submitted and will appear here once it&apos;s reviewed.
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
        Leave a testimonial
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      </button>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-2xl border border-gray-100 bg-white shadow-sm p-6 sm:p-8"
    >
      <h4 className="text-lg font-bold text-primary">Leave a testimonial</h4>
      <p className="mt-1 text-sm text-mid">
        Your review appears publicly after a quick moderation check. Real name and role,
        please &mdash; it&apos;s what makes it useful to other operators.
      </p>

      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelCls} htmlFor="t-first">First name</label>
          <input id="t-first" className={inputCls} value={firstName}
            onChange={(e) => setFirstName(e.target.value)} maxLength={80} autoComplete="given-name" />
          {errors.firstName && <p className={errCls}>{errors.firstName}</p>}
        </div>
        <div>
          <label className={labelCls} htmlFor="t-last">Last name</label>
          <input id="t-last" className={inputCls} value={lastName}
            onChange={(e) => setLastName(e.target.value)} maxLength={80} autoComplete="family-name" />
          {errors.lastName && <p className={errCls}>{errors.lastName}</p>}
        </div>
        <div>
          <label className={labelCls} htmlFor="t-role">Role</label>
          <input id="t-role" className={inputCls} value={role} placeholder="e.g. Plant Manager"
            onChange={(e) => setRole(e.target.value)} maxLength={120} autoComplete="organization-title" />
          {errors.role && <p className={errCls}>{errors.role}</p>}
        </div>
        <div>
          <label className={labelCls} htmlFor="t-company">
            Company <span className="font-normal text-mid">(optional)</span>
          </label>
          <input id="t-company" className={inputCls} value={company}
            onChange={(e) => setCompany(e.target.value)} maxLength={120} autoComplete="organization" />
          {errors.company && <p className={errCls}>{errors.company}</p>}
        </div>
      </div>

      <div className="mt-4">
        <label className={labelCls}>Rating</label>
        <RatingPicker value={rating} onChange={setRating} />
        {errors.rating && <p className={errCls}>{errors.rating}</p>}
      </div>

      <div className="mt-4">
        <label className={labelCls} htmlFor="t-content">Your testimonial</label>
        <textarea id="t-content" className={`${inputCls} min-h-[120px] resize-y`} value={content}
          onChange={(e) => setContent(e.target.value)} maxLength={MAX_CONTENT}
          placeholder="What did this tool show you, in your own words?" />
        <div className="mt-1 flex justify-between">
          {errors.content ? <p className={errCls}>{errors.content}</p> : <span />}
          <span className="text-xs text-mid tabular-nums">{content.length}/{MAX_CONTENT}</span>
        </div>
      </div>

      <label className="mt-4 flex items-start gap-2.5 cursor-pointer" htmlFor="t-consent">
        <input id="t-consent" type="checkbox" checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5 h-4 w-4 rounded border-gray-300 text-accent focus-visible:ring-2 focus-visible:ring-accent" />
        <span className="text-sm text-mid leading-relaxed">
          I agree to AdaptiveOps publishing this testimonial with my name, role and company
          on this site.
        </span>
      </label>
      {errors.consent && <p className={errCls}>{errors.consent}</p>}

      <div className="mt-5">
        <Turnstile
          sitekey={SITE_KEY}
          action="tool-testimonial"
          onVerify={setToken}
          onExpire={() => setToken("")}
          onError={() => setToken("")}
        />
        {errors.turnstileToken && <p className={errCls}>{errors.turnstileToken}</p>}
      </div>

      {generic && (
        <p className="mt-4 text-sm text-red-600">{generic}</p>
      )}

      <div className="mt-5 flex items-center gap-3">
        <button
          type="submit"
          disabled={submitting || !consent || !token}
          className="inline-flex items-center gap-2 bg-accent hover:bg-blue-600 text-white font-semibold px-7 py-3 rounded-lg transition-colors active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-accent"
        >
          {submitting ? "Submitting…" : "Submit testimonial"}
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
