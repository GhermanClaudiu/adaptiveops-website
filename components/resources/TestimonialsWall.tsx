import type { ToolTestimonial } from "@/lib/toolStats";

/**
 * Animated "wall of love" — three columns of testimonials scrolling upward at
 * different speeds, with a soft top/bottom mask. Pure CSS (no JS / no motion
 * dependency); honours `prefers-reduced-motion` by falling back to a static,
 * fully-visible list. Brand-fit (AdaptiveOps tokens), initials instead of
 * photos, keeps the star rating. Server component.
 *
 * Used only when there are enough approved testimonials to look full
 * (see MIN_TESTIMONIALS_FOR_WALL); below that the static grid is shown.
 */

function Stars({ rating }: { rating: number }) {
  return (
    <span className="inline-flex items-center" aria-label={`${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <svg
          key={n}
          className={`w-4 h-4 ${n <= rating ? "text-amber-400" : "text-gray-300"}`}
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

function initials(first: string, last: string): string {
  return `${first.charAt(0)}${last.charAt(0)}`.toUpperCase();
}

function Card({ t }: { t: ToolTestimonial }) {
  return (
    <figure className="rounded-2xl border border-gray-100 bg-white p-6 shadow-[0_4px_20px_-8px_rgba(11,31,59,0.12)]">
      <Stars rating={t.rating} />
      <blockquote className="mt-3 text-[15px] text-primary leading-relaxed">
        &ldquo;{t.content}&rdquo;
      </blockquote>
      <figcaption className="mt-5 flex items-center gap-3">
        <span
          className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-accent to-secondary text-sm font-bold text-white"
          aria-hidden="true"
        >
          {initials(t.firstName, t.lastName)}
        </span>
        <div className="min-w-0">
          <div className="font-bold text-primary text-sm leading-5 truncate">
            {t.firstName} {t.lastName}
          </div>
          <div className="text-xs text-mid leading-5 truncate">
            {t.role}
            {t.company ? ` · ${t.company}` : ""}
          </div>
        </div>
      </figcaption>
    </figure>
  );
}

function Column({
  items,
  duration,
  className = "",
}: {
  items: ToolTestimonial[];
  duration: string;
  className?: string;
}) {
  if (items.length === 0) return null;
  return (
    <div
      className={`relative h-[640px] overflow-hidden motion-reduce:h-auto motion-reduce:overflow-visible ${className}`}
    >
      <div
        className="flex flex-col gap-6 animate-marquee-up motion-reduce:animate-none"
        style={{ animationDuration: duration }}
      >
        {items.map((t) => (
          <Card key={t.id} t={t} />
        ))}
        {/* Duplicate set makes the upward loop seamless; hidden for reduced motion. */}
        <div className="contents motion-reduce:hidden" aria-hidden="true">
          {items.map((t) => (
            <Card key={`dup-${t.id}`} t={t} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsWall({ items }: { items: ToolTestimonial[] }) {
  const n = items.length;

  // Few testimonials: a clean, centered static set of the same brand-fit cards.
  // An infinite scroll with one or two cards would just loop a single card, so
  // we only animate once there are enough to fill the columns (see below).
  if (n < 4) {
    return (
      <div className="flex flex-wrap justify-center gap-5">
        {items.map((t) => (
          <div key={t.id} className="w-full sm:w-[340px] max-w-sm">
            <Card t={t} />
          </div>
        ))}
      </div>
    );
  }

  // Enough to animate: 3 columns at >=6, otherwise 2. Round-robin keeps them
  // balanced even on mobile (where only the first column shows).
  const colCount = n >= 6 ? 3 : 2;
  const columns: ToolTestimonial[][] = Array.from({ length: colCount }, () => []);
  items.forEach((t, i) => columns[i % colCount].push(t));

  const durations = ["26s", "32s", "29s"];
  const reveal = colCount === 3 ? ["", "hidden md:block", "hidden lg:block"] : ["", "hidden md:block"];

  return (
    <div className="flex justify-center gap-6 [mask-image:linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)] motion-reduce:[mask-image:none]">
      {columns.map((col, i) => (
        <Column key={i} items={col} duration={durations[i]} className={reveal[i]} />
      ))}
    </div>
  );
}
