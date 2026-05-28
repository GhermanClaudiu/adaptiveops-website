import Link from "next/link";

interface ToolCtaProps {
  /** Eyebrow label above the title */
  eyebrow?: string;
  /** Main heading */
  title?: string;
  /** Supporting line */
  description?: string;
  /** Button label */
  cta?: string;
  /** Destination — defaults to the Level 5 targeting tool */
  href?: string;
}

/**
 * Reusable call-to-action card linking to an interactive tool.
 * Defaults to the Level 5 Targeting Self-Assessment but accepts overrides
 * so it can point at future tools.
 */
export default function ToolCta({
  eyebrow = "Free self-assessment · 15 minutes",
  title = "Which 20% of your processes actually deserve Level 5?",
  description = "Run the same logic chain we use with clients — from your plant's single financial goal down to the specific processes worth taking to Level 5. Your numbers stay in your browser.",
  cta = "Open the targeting tool",
  href = "/resources/level-5-targeting",
}: ToolCtaProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-primary p-7 lg:p-9 shadow-[0_4px_14px_rgba(11,31,59,0.10)]">
      {/* Subtle accent glow */}
      <div className="absolute -top-1/4 -right-10 w-64 h-64 bg-accent/10 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

      <div className="relative">
        <div className="inline-flex items-center gap-2 mb-4">
          <span className="flex w-2 h-2">
            <span className="relative inline-flex w-2 h-2 rounded-full bg-secondary" />
          </span>
          <span className="text-[11px] font-bold tracking-widest uppercase text-secondary">
            {eyebrow}
          </span>
        </div>

        <h3 className="text-xl md:text-2xl font-bold text-white leading-snug max-w-xl">
          {title}
        </h3>
        <p className="mt-3 text-sm md:text-base text-white/70 leading-relaxed max-w-xl">
          {description}
        </p>

        <Link
          href={href}
          className="mt-6 inline-flex items-center gap-2 bg-accent text-white font-semibold px-7 py-3.5 rounded-full transition-shadow hover:shadow-[0_0_24px_rgba(47,128,237,0.5)] active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
        >
          {cta}
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
