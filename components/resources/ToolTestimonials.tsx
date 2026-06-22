import {
  getToolTestimonials,
  getToolCounts,
  MIN_REVIEWS_TO_SHOW,
  MIN_STARTS_TO_SHOW,
} from "@/lib/toolStats";
import ToolTestimonialForm from "@/components/resources/ToolTestimonialForm";
import TestimonialsWall from "@/components/resources/TestimonialsWall";
import { getTool } from "@/lib/content/tools";

/** Inline filled/empty stars for a given rating. */
function Stars({ rating, size = "w-4 h-4" }: { rating: number; size?: string }) {
  return (
    <span className="inline-flex items-center" aria-label={`${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <svg
          key={n}
          className={`${size} ${n <= rating ? "text-amber-400" : "text-gray-300"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d="M9.05 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 0 0 .95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.367 2.446a1 1 0 0 0-.364 1.118l1.287 3.957c.3.922-.755 1.688-1.54 1.118l-3.366-2.446a1 1 0 0 0-1.176 0l-3.366 2.446c-.784.57-1.838-.196-1.539-1.118l1.286-3.957a1 1 0 0 0-.363-1.118L2.354 9.374c-.783-.57-.38-1.81.588-1.81h4.161a1 1 0 0 0 .951-.69l1.286-3.957Z" />
        </svg>
      ))}
    </span>
  );
}

/**
 * Per-tool testimonials section. Deliberately a DIFFERENT trust tier from the
 * "Verified · LinkedIn" leadership recommendations on the home page — its own
 * heading, no "verified" badge. Server component; fetches its own data.
 */
export default async function ToolTestimonials({ toolSlug }: { toolSlug: string }) {
  const [data, counts] = await Promise.all([
    getToolTestimonials(toolSlug),
    getToolCounts(),
  ]);
  const hasReviews = data.count >= MIN_REVIEWS_TO_SHOW;
  const startedCount = counts[toolSlug] ?? 0;
  const showStarted = startedCount >= MIN_STARTS_TO_SHOW;
  const usagePhrase = getTool(toolSlug)?.usagePhrase ?? "people who used this";

  return (
    <section className="bg-light py-16 sm:py-20 print:hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <span className="inline-block text-xs font-bold tracking-widest uppercase text-accent mb-2">
              From people who used it
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-primary">
              What users say about this tool
            </h2>
          </div>
          <div className="flex flex-col items-start sm:items-end gap-1.5">
            {hasReviews && (
              <div className="flex items-center gap-3">
                <Stars rating={Math.round(data.averageRating)} size="w-5 h-5" />
                <span className="text-sm text-mid">
                  <span className="font-bold text-primary text-base tabular-nums">
                    {data.averageRating.toFixed(1)}
                  </span>{" "}
                  based on {data.count.toLocaleString("en-US")} review
                  {data.count === 1 ? "" : "s"}
                </span>
              </div>
            )}
            {showStarted && (
              <span className="inline-flex items-center gap-2 rounded-full bg-secondary/10 px-3.5 py-1.5 text-sm text-mid">
                <svg className="w-4 h-4 text-secondary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                </svg>
                <span>
                  Join{" "}
                  <span className="font-bold text-primary tabular-nums">
                    {startedCount.toLocaleString("en-US")}
                  </span>{" "}
                  {usagePhrase}
                </span>
              </span>
            )}
          </div>
        </div>

        {hasReviews ? (
          <TestimonialsWall items={data.items} />
        ) : (
          <p className="text-mid leading-relaxed max-w-xl">
            No testimonials yet &mdash; if you&apos;ve run this tool on your floor, be the
            first to tell other operators what it showed you.
          </p>
        )}

        <div className="mt-10">
          <ToolTestimonialForm toolSlug={toolSlug} />
        </div>
      </div>
    </section>
  );
}
