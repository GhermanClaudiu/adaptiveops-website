import Link from "next/link";
import type { WorkshopEntry } from "@/lib/content/workshops";

/**
 * One workshop on the /resources/workshops listing. Server component.
 * Layout mirrors ToolCard (dark visual panel + content) for a consistent
 * Resources look. `past` flips the framing to a recap / recording entry.
 */
export default function WorkshopCard({
  workshop,
}: {
  workshop: WorkshopEntry;
}) {
  const past = workshop.status === "past";
  const dateLabel = workshop.displayDate ?? "New date soon";

  return (
    <Link
      href={`/resources/workshops/${workshop.slug}`}
      className="group block bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
    >
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_1.5fr]">
        {/* Visual */}
        <div className="relative bg-primary p-8 lg:p-10 flex flex-col justify-center min-h-[200px]">
          <div
            className="absolute -top-1/4 -right-10 w-64 h-64 bg-secondary/10 rounded-full blur-3xl pointer-events-none"
            aria-hidden="true"
          />
          <div className="relative">
            <span className="inline-flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-secondary" />
              <span className="text-[11px] font-bold tracking-widest uppercase text-secondary">
                {past ? "Past session" : "Free · Online · Live"}
              </span>
            </span>
            <p className="text-sm font-semibold uppercase tracking-wide text-white/50">
              {past ? "Held on" : "Next session"}
            </p>
            <p className="mt-1 text-2xl lg:text-3xl font-black text-white leading-tight">
              {dateLabel}
            </p>
            <p className="mt-3 text-sm text-white/60">{workshop.duration}</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 lg:p-10 flex flex-col justify-center">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-secondary bg-secondary/10 px-2.5 py-1 rounded-full">
              Free workshop
            </span>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-mid bg-light px-2.5 py-1 rounded-full">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.95 8.95 0 0 0 2.6-6.4M12 21a8.95 8.95 0 0 1-2.6-6.4M3.6 9h16.8M3.6 15h16.8" />
              </svg>
              Held in {workshop.language}
            </span>
            {past && (
              <span className="text-xs font-semibold text-mid bg-light px-2.5 py-1 rounded-full">
                Session ended
              </span>
            )}
          </div>
          <h3 className="mt-4 text-2xl font-bold text-primary leading-tight group-hover:text-accent transition-colors">
            {workshop.title}
          </h3>
          <p className="mt-3 text-mid leading-relaxed">{workshop.shortDesc}</p>

          <span className="mt-6 inline-flex items-center gap-1.5 text-accent font-semibold text-sm group-hover:gap-2.5 transition-all">
            {past
              ? workshop.recordingUrl
                ? "Watch the recording"
                : "See the recap"
              : "See details & register"}
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
