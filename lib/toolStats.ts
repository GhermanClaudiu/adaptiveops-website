/**
 * Tool usage counters + testimonials, backed by the AdaptiveOps Academy
 * Marketing API. Everything is keyed by a free-form `toolSlug`
 * (`^[a-z0-9-]{1,64}$`) so a new tool needs zero backend change.
 *
 * Contract (source of truth): Academy repo
 * `backend/docs/api-contracts/marketing-tool-stats-testimonials.md`.
 *
 * - Reads (counts, approved testimonials) are fetched SERVER-SIDE — no CORS,
 *   cached 60s. See `getToolCounts` / `getToolTestimonials`.
 * - Writes (start ping, testimonial submit) happen CLIENT-SIDE and only work
 *   from the whitelisted prod origins (adaptiveops.eu). See `fireToolStart`
 *   and the submit helper used by the testimonial form.
 */

export const ACADEMY_API =
  process.env.NEXT_PUBLIC_ACADEMY_API ?? "https://academy.adaptiveops.eu";

/** Display thresholds (decided in the grill): hide weak social proof. */
export const MIN_STARTS_TO_SHOW = 10; // below this → "New" instead of a count
export const MIN_REVIEWS_TO_SHOW = 1; // need at least one approved review to show rating

export interface ToolTestimonial {
  id: string;
  firstName: string;
  lastName: string;
  role: string;
  company: string | null;
  rating: number; // 1–5
  content: string;
  submittedAtUtc: string; // ISO 8601 UTC
}

export interface ToolTestimonialsResponse {
  toolSlug: string;
  averageRating: number; // rounded to 1 decimal; 0 when none
  count: number; // total approved (may exceed items.length, which is capped at 50)
  items: ToolTestimonial[];
}

const EMPTY_TESTIMONIALS = (toolSlug: string): ToolTestimonialsResponse => ({
  toolSlug,
  averageRating: 0,
  count: 0,
  items: [],
});

/* -------------------------------------------------------------------------- */
/*  SERVER-SIDE READS                                                          */
/* -------------------------------------------------------------------------- */

/**
 * Lifetime "started" count per tool. A slug with zero hits is absent from the
 * map → callers treat a missing key as 0. Never throws; returns {} on failure
 * so the page renders without counters rather than erroring.
 */
export async function getToolCounts(): Promise<Record<string, number>> {
  try {
    const res = await fetch(`${ACADEMY_API}/api/v1/marketing/tool-usage/counts`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return {};
    const data = (await res.json()) as Record<string, number>;
    return data && typeof data === "object" ? data : {};
  } catch {
    return {};
  }
}

/** Approved testimonials for a tool (newest first, capped at 50) + aggregate. */
export async function getToolTestimonials(
  toolSlug: string,
): Promise<ToolTestimonialsResponse> {
  try {
    const res = await fetch(
      `${ACADEMY_API}/api/v1/marketing/testimonials?toolSlug=${encodeURIComponent(toolSlug)}`,
      { next: { revalidate: 60 } },
    );
    if (!res.ok) return EMPTY_TESTIMONIALS(toolSlug);
    const data = (await res.json()) as ToolTestimonialsResponse;
    return data && Array.isArray(data.items) ? data : EMPTY_TESTIMONIALS(toolSlug);
  } catch {
    return EMPTY_TESTIMONIALS(toolSlug);
  }
}

/* -------------------------------------------------------------------------- */
/*  CLIENT-SIDE WRITES                                                         */
/* -------------------------------------------------------------------------- */

/**
 * Fire a "started" ping for a tool — once per browser session per slug.
 * Fire-and-forget: the backend dedups per IP/slug/UTC-day, and we add a
 * session guard so replays in the same tab don't spam the endpoint. Never
 * throws; safe to call from any start handler.
 */
export function fireToolStart(toolSlug: string): void {
  if (typeof window === "undefined") return;
  const guardKey = `aotool_started_${toolSlug}`;
  try {
    if (window.sessionStorage.getItem(guardKey)) return;
    window.sessionStorage.setItem(guardKey, "1");
  } catch {
    // sessionStorage unavailable (private mode quota) — still fire once-ish
  }

  try {
    void fetch(`${ACADEMY_API}/api/v1/marketing/tool-usage`, {
      method: "POST",
      mode: "cors",
      keepalive: true,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ toolSlug }),
    }).catch((err) => {
      console.warn("Tool-usage ping failed (non-blocking):", err);
    });
  } catch (err) {
    console.warn("Tool-usage ping failed (non-blocking):", err);
  }
}

/* -------------------------------------------------------------------------- */
/*  TESTIMONIAL SUBMIT (client)                                               */
/* -------------------------------------------------------------------------- */

export interface SubmitTestimonialInput {
  toolSlug: string;
  firstName: string;
  lastName: string;
  role: string;
  company?: string;
  rating: number; // 1–5
  content: string;
  consent: boolean;
  turnstileToken: string;
  language?: string; // "ro" | "en"
}

export type SubmitTestimonialResult =
  | { ok: true; id: string }
  | { ok: false; status: number; fieldErrors: Record<string, string>; generic?: string };

/** Maps the backend's stable MARKETING.* codes to short inline messages. */
const ERROR_MESSAGES: Record<string, string> = {
  "MARKETING.TOOLSLUG_INVALID": "Something went wrong identifying this tool.",
  "MARKETING.FIRSTNAME_INVALID": "Please enter your first name.",
  "MARKETING.LASTNAME_INVALID": "Please enter your last name.",
  "MARKETING.ROLE_INVALID": "Please enter your role.",
  "MARKETING.COMPANY_INVALID": "Company name is too long (max 120).",
  "MARKETING.CONTENT_INVALID": "Please write your testimonial (max 800 characters).",
  "MARKETING.RATING_INVALID": "Please pick a rating from 1 to 5.",
  "MARKETING.CONSENT_REQUIRED": "Please tick the consent box to submit.",
  "MARKETING.TURNSTILE_REQUIRED": "Please complete the anti-spam check.",
  "MARKETING.TURNSTILE_INVALID": "The anti-spam check failed — please try again.",
};

/** Lowercases the field name so we can map errorCodes keys (e.g. "Consent") to inputs. */
function fieldKey(name: string): string {
  return name.charAt(0).toLowerCase() + name.slice(1);
}

export async function submitTestimonial(
  input: SubmitTestimonialInput,
  idempotencyKey: string,
): Promise<SubmitTestimonialResult> {
  try {
    const res = await fetch(`${ACADEMY_API}/api/v1/marketing/testimonials`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": input.language || "en",
        "X-Idempotency-Key": idempotencyKey,
      },
      body: JSON.stringify({
        toolSlug: input.toolSlug,
        firstName: input.firstName,
        lastName: input.lastName,
        role: input.role,
        company: input.company || undefined,
        rating: input.rating,
        content: input.content,
        consent: input.consent,
        turnstileToken: input.turnstileToken,
      }),
    });

    if (res.status === 201) {
      const data = (await res.json().catch(() => ({}))) as { id?: string };
      return { ok: true, id: data.id ?? "" };
    }

    if (res.status === 429) {
      return {
        ok: false,
        status: 429,
        fieldErrors: {},
        generic: "Too many submissions — please wait a minute and try again.",
      };
    }

    // RFC 7807 with per-field `errorCodes` (or `errors`).
    const problem = (await res.json().catch(() => ({}))) as {
      errorCodes?: Record<string, string[]>;
      errors?: Record<string, string[]>;
    };
    const source = problem.errorCodes ?? problem.errors ?? {};
    const fieldErrors: Record<string, string> = {};
    for (const [field, codes] of Object.entries(source)) {
      const code = Array.isArray(codes) ? codes[0] : String(codes);
      fieldErrors[fieldKey(field)] = ERROR_MESSAGES[code] ?? "Invalid value.";
    }
    return {
      ok: false,
      status: res.status,
      fieldErrors,
      generic: Object.keys(fieldErrors).length
        ? undefined
        : "Couldn't submit your testimonial. Please try again.",
    };
  } catch {
    return {
      ok: false,
      status: 0,
      fieldErrors: {},
      generic: "Network error — please try again.",
    };
  }
}
