import { MIN_STARTS_TO_SHOW, MIN_REVIEWS_TO_SHOW } from "@/lib/toolStats";

/**
 * Social-proof chips for a tool: "{n} started" (or a "New" pill below the
 * threshold) + an average-rating chip (only once at least one review exists).
 * Pure server component — pass already-fetched numbers.
 *
 * Thresholds (decided in the grill): counter shows at >= 10 starts, rating
 * shows from >= 1 approved review. Below those we avoid weak social proof.
 */
export default function ToolStatBadge({
  count,
  averageRating,
  reviewCount,
  size = "sm",
}: {
  count: number;
  averageRating: number;
  reviewCount: number;
  size?: "sm" | "md";
}) {
  const showCount = count >= MIN_STARTS_TO_SHOW;
  const showRating = reviewCount >= MIN_REVIEWS_TO_SHOW;

  const text = size === "md" ? "text-sm" : "text-xs";
  const star = size === "md" ? "w-4 h-4" : "w-3.5 h-3.5";

  return (
    <div className={`flex flex-wrap items-center gap-x-4 gap-y-2 ${text}`}>
      {showCount ? (
        <span className="inline-flex items-center gap-1.5 font-medium text-mid">
          <span className="w-1.5 h-1.5 rounded-full bg-secondary" aria-hidden="true" />
          <span className="font-bold text-primary tabular-nums">
            {count.toLocaleString("en-US")}
          </span>
          started
        </span>
      ) : (
        <span className="inline-flex items-center gap-1.5 font-semibold text-secondary">
          <span className="w-1.5 h-1.5 rounded-full bg-secondary" aria-hidden="true" />
          New
        </span>
      )}

      {showRating && (
        <span className="inline-flex items-center gap-1.5 text-mid">
          <svg
            className={`${star} text-amber-400`}
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path d="M9.05 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 0 0 .95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.367 2.446a1 1 0 0 0-.364 1.118l1.287 3.957c.3.922-.755 1.688-1.54 1.118l-3.366-2.446a1 1 0 0 0-1.176 0l-3.366 2.446c-.784.57-1.838-.196-1.539-1.118l1.286-3.957a1 1 0 0 0-.363-1.118L2.354 9.374c-.783-.57-.38-1.81.588-1.81h4.161a1 1 0 0 0 .951-.69l1.286-3.957Z" />
          </svg>
          <span className="font-bold text-primary tabular-nums">
            {averageRating.toFixed(1)}
          </span>
          <span className="text-mid">
            ({reviewCount.toLocaleString("en-US")})
          </span>
        </span>
      )}
    </div>
  );
}
