/**
 * Client-side workshop registration against the Academy marketing endpoint.
 *
 * Unlike `lib/leadCapture.ts` (fire-and-forget), this AWAITS the response and
 * returns a result, because the visitor needs feedback ("you're registered").
 *
 * Same security envelope as the leads endpoint: public, Turnstile-protected,
 * per-IP rate-limited, CORS-whitelisted to the adaptiveops.eu origins — so it is
 * called directly from the visitor's browser. See
 * ACADEMY-WORKSHOP-REGISTRATION-SPEC.md and academy-lead-capture-integration.
 *
 * NOTE: CORS allows only the prod origins, so this only works on
 * adaptiveops.eu — not localhost or Vercel previews.
 */

const ENDPOINT =
  "https://academy.adaptiveops.eu/api/v1/marketing/workshop-registrations";

export interface WorkshopRegistrationInput {
  workshopSlug: string;
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
  role?: string;
  /** GDPR processing consent — must be true. */
  consent: boolean;
  /** Newsletter / nurture opt-in. */
  marketingOptIn: boolean;
  language?: string;
  /** Cloudflare Turnstile token — required by the endpoint. */
  turnstileToken?: string;
}

export type RegistrationStatus =
  | "registered"
  | "already_registered"
  | "full"
  | "closed";

export interface RegistrationResult {
  ok: boolean;
  status?: RegistrationStatus;
  /** Human-readable error for the form to show. */
  error?: string;
}

export async function registerForWorkshop(
  input: WorkshopRegistrationInput,
): Promise<RegistrationResult> {
  if (!input.consent || !input.email) {
    return { ok: false, error: "Please complete the required fields." };
  }

  const language =
    input.language ||
    (typeof document !== "undefined" ? document.documentElement.lang : "") ||
    "ro";

  const body = JSON.stringify({
    workshopSlug: input.workshopSlug,
    firstName: input.firstName,
    lastName: input.lastName,
    email: input.email,
    company: input.company || undefined,
    role: input.role || undefined,
    consent: input.consent,
    marketingOptIn: input.marketingOptIn,
    language,
    turnstileToken: input.turnstileToken || undefined,
  });

  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body,
    });

    // Success: 201 (registered) or 200 (already registered).
    if (res.ok) {
      const data = (await res.json().catch(() => ({}))) as {
        status?: RegistrationStatus;
      };
      return { ok: true, status: data.status ?? "registered" };
    }

    // Known non-OK states the form should explain specifically.
    if (res.status === 409) return { ok: false, status: "full", error: "This session is full." };
    if (res.status === 410) return { ok: false, status: "closed", error: "Registration for this session has closed." };
    if (res.status === 403) return { ok: false, error: "Anti-spam check failed. Please try again." };
    if (res.status === 429) return { ok: false, error: "Too many attempts. Please wait a minute and try again." };

    const data = (await res.json().catch(() => ({}))) as { error?: string };
    return { ok: false, error: data.error || "Something went wrong. Please try again." };
  } catch {
    // Network / CORS failure.
    return { ok: false, error: "Couldn't reach the registration service. Please try again." };
  }
}
