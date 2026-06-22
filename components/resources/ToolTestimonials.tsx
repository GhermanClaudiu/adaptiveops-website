import {
  getToolTestimonials,
  getToolCounts,
  MIN_REVIEWS_TO_SHOW,
  MIN_STARTS_TO_SHOW,
  type ToolTestimonial,
} from "@/lib/toolStats";
import ToolTestimonialForm from "@/components/resources/ToolTestimonialForm";

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

function formatMonth(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

function TestimonialCard({ t }: { t: ToolTestimonial }) {
  const month = formatMonth(t.submittedAtUtc);
  return (
    <figure className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col h-full">
      <Stars rating={t.rating} />
      <blockquote className="mt-3 text-[15px] text-primary leading-relaxed flex-1">
        &ldquo;{t.content}&rdquo;
      </blockquote>
      <figcaption className="mt-4 border-t border-gray-100 pt-3">
        <p className="text-sm font-bold text-primary">
          {t.firstName} {t.lastName}
        </p>
        <p className="text-xs text-mid">
          {t.role}
          {t.company ? ` · ${t.company}` : ""}
        </p>
        {month && <p className="mt-1 text-[11px] text-gray-400">{month}</p>}
      </figcaption>
    </figure>
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
              <p className="text-sm text-mid">
                <span className="font-bold text-primary tabular-nums">
                  {startedCount.toLocaleString("en-US")}
                </span>{" "}
                started this tool
              </p>
            )}
          </div>
        </div>

        {hasReviews ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {data.items.map((t) => (
              <TestimonialCard key={t.id} t={t} />
            ))}
          </div>
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
