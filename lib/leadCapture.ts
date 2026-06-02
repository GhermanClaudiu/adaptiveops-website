/**
 * Client-side lead capture for the Academy marketing endpoint.
 *
 * Fire-and-forget by design (see marketing-lead-capture-integration.md §8):
 * the caller shows its result/report immediately and never awaits this.
 * Rate limiting is per-IP, so each visitor calls the endpoint directly from
 * their own browser — CORS is whitelisted for the adaptiveops.eu origins.
 *
 * GDPR: this never sends unless `consent` is true.
 */

const ENDPOINT = "https://academy.adaptiveops.eu/api/v1/marketing/leads";

export type LeadSource =
  | "Level5Targeting"
  | "OeeLossDiagnostic"
  | "FiveSGame"
  | "WorksheetDownload"
  | "Newsletter"
  | "ContactForm"
  | "Other";

export interface LeadInput {
  email: string;
  name?: string;
  role?: string;
  company?: string;
  country?: string;
  language?: string;
  source: LeadSource;
  payload?: Record<string, unknown>;
  consent: boolean;
}

/**
 * Sends a lead to the Academy endpoint without blocking the UI.
 * Silently no-ops without consent or a usable email; never throws.
 */
export function captureLead(input: LeadInput): void {
  if (!input.consent || !input.email) return;

  const language =
    input.language ||
    (typeof document !== "undefined" ? document.documentElement.lang : "") ||
    "en";

  const body = JSON.stringify({
    email: input.email,
    name: input.name || undefined,
    role: input.role || undefined,
    company: input.company || undefined,
    country: input.country || undefined,
    language,
    source: input.source,
    payload: input.payload,
    consent: input.consent,
  });

  try {
    void fetch(ENDPOINT, {
      method: "POST",
      mode: "cors",
      // keepalive lets the request survive a page navigation right after submit
      keepalive: true,
      headers: { "Content-Type": "application/json" },
      body,
    }).catch((err) => {
      // Non-blocking: log for debugging, never disrupt the user's experience
      console.warn("Lead capture failed (non-blocking):", err);
    });
  } catch (err) {
    console.warn("Lead capture failed (non-blocking):", err);
  }
}
