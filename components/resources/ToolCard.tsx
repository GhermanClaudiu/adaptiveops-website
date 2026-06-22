import Link from "next/link";
import type { ToolEntry } from "@/lib/content/tools";
import ToolStatBadge from "@/components/resources/ToolStatBadge";

/**
 * One tool on the /resources/tools listing — data-driven from the registry,
 * with live "started" count + rating chips. Server component.
 */
export default function ToolCard({
  tool,
  count,
  averageRating,
  reviewCount,
}: {
  tool: ToolEntry;
  count: number;
  averageRating: number;
  reviewCount: number;
}) {
  const blob = tool.tone === "accent" ? "bg-accent/10" : "bg-secondary/10";
  const pill =
    tool.tone === "accent"
      ? "text-accent bg-accent/10"
      : "text-secondary bg-secondary/10";

  return (
    <Link
      href={`/resources/${tool.slug}`}
      className="group block bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Visual */}
        <div className="relative bg-primary p-8 lg:p-10 flex flex-col justify-center min-h-[240px]">
          <div
            className={`absolute -top-1/4 -right-10 w-64 h-64 ${blob} rounded-full blur-3xl pointer-events-none`}
            aria-hidden="true"
          />
          <div className="relative">
            <span className="inline-flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-secondary" />
              <span className="text-[11px] font-bold tracking-widest uppercase text-secondary">
                {tool.meta}
              </span>
            </span>
            <p className="text-4xl lg:text-5xl font-black text-white leading-none">
              {tool.statValue}
            </p>
            <p className="mt-2 text-sm text-white/70 max-w-xs">{tool.statCaption}</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 lg:p-10 flex flex-col justify-center">
          <span
            className={`text-xs font-semibold ${pill} px-2.5 py-1 rounded-full self-start`}
          >
            {tool.category}
          </span>
          <h3 className="mt-4 text-2xl font-bold text-primary leading-tight group-hover:text-accent transition-colors">
            {tool.title}
          </h3>
          <p className="mt-3 text-mid leading-relaxed">{tool.blurb}</p>

          <div className="mt-5">
            <ToolStatBadge
              count={count}
              usagePhrase={tool.usagePhrase}
              averageRating={averageRating}
              reviewCount={reviewCount}
            />
          </div>

          <span className="mt-6 inline-flex items-center gap-1.5 text-accent font-semibold text-sm group-hover:gap-2.5 transition-all">
            {tool.cta}
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
