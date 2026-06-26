/**
 * Live workshop schedule, backed by the AdaptiveOps Academy Marketing API.
 *
 * The founder manages scheduling IN Academy (close one occurrence, open a new
 * one under the same slug). The site reads the live schedule here and reflects
 * the new date automatically — no registry edit, no redeploy.
 *
 * Split of responsibility:
 * - CONTENT (title, copy, audience, language, recording) → `lib/content/workshops.ts`.
 * - SCHEDULE (date + open/closed) → live from here; the registry's
 *   `displayDate`/`status` are kept only as a build-time / outage FALLBACK that
 *   the live value overrides (hybrid). The displayed date is derived from the
 *   live `startsAtUtc` via Intl (Europe/Bucharest), preferring the backend's
 *   preformatted `displayDate` once Academy ships that field.
 *
 * Mirrors `lib/toolStats.ts`: server-side GET (no CORS), cached 60s, NEVER
 * throws — on any failure the caller falls back to the registry so the page
 * renders exactly like today.
 *
 * Live contract (source of truth: Academy repo
 * `backend/src/Modules/Marketing/Marketing.Contracts/WorkshopStatusResponse.cs`):
 *   GET /api/v1/marketing/workshop-registrations/status?slug=<slug> → 200
 *   { status, remaining, startsAtUtc, occurrenceId, displayDate? }
 * `displayDate` is an additive field the site auto-upgrades to once Academy
 * ships it (ACADEMY-STATUS-DISPLAYDATE-CR); until then we fall back to the
 * registry `displayDate` string.
 */

import { ACADEMY_API } from "@/lib/toolStats";
import type { WorkshopEntry } from "@/lib/content/workshops";

/** The three UI states the listing + detail pages render. */
export type WorkshopScheduleState = "scheduled" | "unscheduled" | "ended";

/** Live status bucket emitted by the Academy `/status` endpoint. */
export type WorkshopLiveStatus = "open" | "almostFull" | "full" | "closed";

/**
 * Normalised live schedule for one slug. `null` everywhere a field is absent —
 * the TS-strict network boundary. `displayDate` is null until the backend ships
 * the additive field (then the site auto-upgrades to the live string).
 */
export interface WorkshopSchedule {
  status: WorkshopLiveStatus;
  remaining: number | null;
  startsAtUtc: string | null;
  occurrenceId: string | null;
  displayDate: string | null;
}

/** Output of `resolveSchedule` — pure/total merge of live + registry fallback. */
export interface ResolvedWorkshop {
  state: WorkshopScheduleState;
  /** Human date string (live overrides registry); null when nothing scheduled. */
  displayDate: string | null;
  /** True only for a `scheduled` state — drives the register form vs waitlist. */
  registrationOpen: boolean;
  /** Optional recording link for ended sessions (content, registry-owned). */
  recordingUrl: string | null;
}

const LIVE_STATUSES: readonly WorkshopLiveStatus[] = [
  "open",
  "almostFull",
  "full",
  "closed",
];

/**
 * Strict guard over untrusted network JSON. Validates the `status` literal,
 * coerces optionals to `null`, and returns `null` on malformed payloads so the
 * caller falls back to the registry instead of rendering garbage.
 */
function normalize(raw: unknown): WorkshopSchedule | null {
  if (!raw || typeof raw !== "object") return null;
  const o = raw as Record<string, unknown>;

  const status = o.status;
  if (
    typeof status !== "string" ||
    !LIVE_STATUSES.includes(status as WorkshopLiveStatus)
  ) {
    return null;
  }

  return {
    status: status as WorkshopLiveStatus,
    remaining: typeof o.remaining === "number" ? o.remaining : null,
    startsAtUtc: typeof o.startsAtUtc === "string" ? o.startsAtUtc : null,
    occurrenceId: typeof o.occurrenceId === "string" ? o.occurrenceId : null,
    displayDate: typeof o.displayDate === "string" ? o.displayDate : null,
  };
}

/**
 * Live schedule for one slug, or `null` (no open occurrence / endpoint down /
 * malformed JSON). Server-side GET — no CORS. Cached 60s; a 3s timeout hardens
 * the build against a hung Academy.
 */
export async function getWorkshopSchedule(
  slug: string,
): Promise<WorkshopSchedule | null> {
  try {
    const res = await fetch(
      `${ACADEMY_API}/api/v1/marketing/workshop-registrations/status?slug=${encodeURIComponent(slug)}`,
      { next: { revalidate: 60 }, signal: AbortSignal.timeout(3000) },
    );
    if (!res.ok) return null;
    return normalize(await res.json());
  } catch {
    return null;
  }
}

/**
 * Live schedules for every registry slug, keyed by slug. No batch endpoint
 * shipped (§6 deferred) → N parallel per-slug calls (each ISR-cached 60s).
 * Returns a partial map on failure (missing slugs fall back to the registry).
 */
export async function getAllWorkshopSchedules(
  slugs: string[],
): Promise<Record<string, WorkshopSchedule>> {
  const entries = await Promise.all(
    slugs.map(async (slug) => [slug, await getWorkshopSchedule(slug)] as const),
  );
  const map: Record<string, WorkshopSchedule> = {};
  for (const [slug, schedule] of entries) {
    if (schedule) map[slug] = schedule;
  }
  return map;
}

/**
 * Format an occurrence start (UTC ISO) + duration into the site's date string,
 * e.g. "16 July 2026 · 18:30–19:30 (Bucharest)". Intl with an explicit
 * Europe/Bucharest timezone → DST-correct even though the server runs UTC.
 * Returns null on unparseable input. Lets the card/detail date be derived
 * straight from Academy's live `startsAtUtc`, with no manual registry date.
 */
function formatBucharestDate(
  startsAtUtc: string,
  durationMinutes: number,
): string | null {
  const start = new Date(startsAtUtc);
  if (Number.isNaN(start.getTime())) return null;

  const tz = "Europe/Bucharest";
  const dateFmt = new Intl.DateTimeFormat("en-GB", {
    timeZone: tz,
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const timeFmt = new Intl.DateTimeFormat("en-GB", {
    timeZone: tz,
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  });

  const datePart = dateFmt.format(start); // "16 July 2026"
  const startTime = timeFmt.format(start); // "18:30"
  if (!Number.isFinite(durationMinutes) || durationMinutes <= 0) {
    return `${datePart} · ${startTime} (Bucharest)`;
  }
  const end = new Date(start.getTime() + durationMinutes * 60_000);
  return `${datePart} · ${startTime}–${timeFmt.format(end)} (Bucharest)`;
}

/**
 * Merge live schedule + registry fallback into a single resolved view.
 * Pure/total — never throws, always returns a valid state.
 *
 * Baseline (registry-equivalent): registry `past` → ended; registry has a
 * `displayDate` → scheduled; otherwise → unscheduled.
 *
 * Live override: an open occurrence with a start time (`status ∈
 * {open,almostFull,full}` + `startsAtUtc`) → scheduled. Otherwise (closed / no
 * open occurrence) we disambiguate via the coarse registry `status`: `past` →
 * ended, `upcoming` → unscheduled.
 *
 * The human date string is live `displayDate` if present, else the registry
 * `displayDate` (hybrid auto-upgrade). Callers keep their own empty-date label.
 */
export function resolveSchedule(
  live: WorkshopSchedule | null,
  registryEntry: WorkshopEntry,
): ResolvedWorkshop {
  let state: WorkshopScheduleState =
    registryEntry.status === "past"
      ? "ended"
      : registryEntry.displayDate
        ? "scheduled"
        : "unscheduled";

  if (live) {
    const liveScheduled =
      live.status !== "closed" && live.startsAtUtc !== null;
    state = liveScheduled
      ? "scheduled"
      : registryEntry.status === "past"
        ? "ended"
        : "unscheduled";
  }

  // Date string priority (most→least authoritative): (1) backend's preformatted
  // `displayDate` once Academy ships it; (2) site-formatted from the LIVE
  // `startsAtUtc` (so the date comes from Academy automatically, no registry
  // edit); (3) the registry `displayDate` as an outage / build-time fallback.
  // `unscheduled` → null so each caller shows its own empty label (card "New
  // date soon", detail "New date being scheduled"); returning a date there would
  // leak a STALE date once an occurrence closes/passes. A date is only
  // meaningful for `scheduled` (upcoming) and `ended` ("Held on {date}").
  const liveFormatted = live?.startsAtUtc
    ? formatBucharestDate(live.startsAtUtc, parseInt(registryEntry.duration, 10))
    : null;
  const displayDate =
    state === "unscheduled"
      ? null
      : (live?.displayDate ?? liveFormatted ?? registryEntry.displayDate ?? null);

  return {
    state,
    displayDate,
    registrationOpen: state === "scheduled",
    recordingUrl: registryEntry.recordingUrl ?? null,
  };
}

/**
 * One-shot resolver for the listing page: fetch every slug's live schedule,
 * merge with the registry, and split into upcoming (scheduled + unscheduled)
 * vs past (ended). Replaces `upcomingWorkshops()` / `pastWorkshops()`.
 */
export async function getResolvedWorkshops(
  workshops: WorkshopEntry[],
): Promise<{
  upcoming: { workshop: WorkshopEntry; resolved: ResolvedWorkshop }[];
  past: { workshop: WorkshopEntry; resolved: ResolvedWorkshop }[];
}> {
  const schedules = await getAllWorkshopSchedules(workshops.map((w) => w.slug));
  const merged = workshops.map((workshop) => ({
    workshop,
    resolved: resolveSchedule(schedules[workshop.slug] ?? null, workshop),
  }));

  return {
    upcoming: merged.filter((m) => m.resolved.state !== "ended"),
    past: merged.filter((m) => m.resolved.state === "ended"),
  };
}
