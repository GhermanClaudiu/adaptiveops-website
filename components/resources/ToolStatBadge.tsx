import { MIN_STARTS_TO_SHOW, MIN_REVIEWS_TO_SHOW } from "@/lib/toolStats";

/**
 * Social-proof for a tool: a prominent community badge
 * ("Join {N} {usagePhrase}", e.g. "Join 14 people who played this"), with a
 * "Be one of the first" state below the threshold, plus an average-rating chip
 * once at least one review exists. Pure server component.
 *
 * Thresholds (grill): community count shows at >= 10 starts, rating at >= 1
 * approved review.
 */
export default function ToolStatBadge({
  count,
  usagePhrase,
  averageRating,
  reviewCount,
  size = "sm",
}: {
  count: number;
  usagePhrase: string;
  averageRating: number;
  reviewCount: number;
  size?: "sm" | "md";
}) {
  const showCount = count >= MIN_STARTS_TO_SHOW;
  const showRating = reviewCount >= MIN_REVIEWS_TO_SHOW;

  const pad = size === "md" ? "px-4 py-2" : "px-3.5 py-1.5";
  const text = size === "md" ? "text-base" : "text-sm";
  const num = size === "md" ? "text-lg" : "text-base";
  const icon = size === "md" ? "w-5 h-5" : "w-4 h-4";

  return (
    <div className="flex flex-wrap items-center gap-3">
      {showCount ? (
        <span
          className={`inline-flex items-center gap-2 rounded-full bg-secondary/10 ${pad} ${text} text-mid`}
        >
          {/* people icon */}
          <svg className={`${icon} text-secondary flex-shrink-0`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
          </svg>
          <span>
            Join{" "}
            <span className={`font-bold text-primary tabular-nums ${num}`}>
              {count.toLocaleString("en-US")}
            </span>{" "}
            {usagePhrase}
          </span>
        </span>
      ) : (
        <span
          className={`inline-flex items-center gap-2 rounded-full bg-secondary/10 ${pad} ${text} font-semibold text-secondary`}
        >
          <svg className={`${icon} flex-shrink-0`} fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path d="M10 2a1 1 0 0 1 .894.553l1.7 3.42 3.77.55a1 1 0 0 1 .554 1.705l-2.73 2.66.645 3.76a1 1 0 0 1-1.45 1.054L10 15.347l-3.373 1.775a1 1 0 0 1-1.45-1.054l.644-3.76-2.73-2.66a1 1 0 0 1 .554-1.705l3.77-.55 1.7-3.42A1 1 0 0 1 10 2Z" />
          </svg>
          Be one of the first
        </span>
      )}

      {showRating && (
        <span className={`inline-flex items-center gap-1.5 text-mid ${text}`}>
          <svg className={`${icon} text-amber-400`} fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path d="M9.05 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 0 0 .95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.367 2.446a1 1 0 0 0-.364 1.118l1.287 3.957c.3.922-.755 1.688-1.54 1.118l-3.366-2.446a1 1 0 0 0-1.176 0l-3.366 2.446c-.784.57-1.838-.196-1.539-1.118l1.286-3.957a1 1 0 0 0-.363-1.118L2.354 9.374c-.783-.57-.38-1.81.588-1.81h4.161a1 1 0 0 0 .951-.69l1.286-3.957Z" />
          </svg>
          <span className="font-bold text-primary tabular-nums">
            {averageRating.toFixed(1)}
          </span>
          <span>({reviewCount.toLocaleString("en-US")})</span>
        </span>
      )}
    </div>
  );
}
