import { getToolTestimonials, MIN_REVIEWS_TO_SHOW } from "@/lib/toolStats";

/**
 * Slim strip shown near the top of a tool page so visitors can reach the
 * reviews + the "Leave a testimonial" form without scrolling past the whole
 * tool. Anchors to the #tool-testimonials section. Server component.
 */
export default async function ToolReviewsBar({ toolSlug }: { toolSlug: string }) {
  const data = await getToolTestimonials(toolSlug);
  const hasReviews = data.count >= MIN_REVIEWS_TO_SHOW;
  const rounded = Math.round(data.averageRating);

  return (
    <div className="bg-light border-b border-gray-100 print:hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
        {hasReviews ? (
          <a
            href="#tool-testimonials"
            className="group inline-flex items-center gap-2 text-sm text-mid hover:text-primary transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <span className="inline-flex items-center" aria-hidden="true">
              {[1, 2, 3, 4, 5].map((n) => (
                <svg
                  key={n}
                  className={`w-4 h-4 ${n <= rounded ? "text-amber-400" : "text-gray-300"}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.05 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 0 0 .95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.367 2.446a1 1 0 0 0-.364 1.118l1.287 3.957c.3.922-.755 1.688-1.54 1.118l-3.366-2.446a1 1 0 0 0-1.176 0l-3.366 2.446c-.784.57-1.838-.196-1.539-1.118l1.286-3.957a1 1 0 0 0-.363-1.118L2.354 9.374c-.783-.57-.38-1.81.588-1.81h4.161a1 1 0 0 0 .951-.69l1.286-3.957Z" />
                </svg>
              ))}
            </span>
            <span>
              <span className="font-bold text-primary tabular-nums">
                {data.averageRating.toFixed(1)}
              </span>{" "}
              · {data.count.toLocaleString("en-US")} review
              {data.count === 1 ? "" : "s"}
            </span>
            <span className="text-accent font-semibold group-hover:underline">
              Read
            </span>
          </a>
        ) : (
          <span className="text-sm text-mid">
            Used this tool on your floor? Tell other operators what it showed you.
          </span>
        )}

        <a
          href="#tool-testimonials"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:text-blue-600 transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          Leave a testimonial
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
          </svg>
        </a>
      </div>
    </div>
  );
}
