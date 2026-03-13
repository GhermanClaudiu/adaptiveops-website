import FadeUp from "@/components/shared/FadeUp";

interface LinkedInBannerProps {
  variant?: "light" | "dark";
}

export default function LinkedInBanner({ variant = "light" }: LinkedInBannerProps) {
  const isDark = variant === "dark";

  return (
    <FadeUp>
      <div
        className={`rounded-xl border p-6 ${
          isDark
            ? "bg-white/[0.04] border-white/10"
            : "bg-white border-gray-100 shadow-sm"
        }`}
      >
        <div className="flex items-center gap-3 mb-3">
          <div
            className={`w-9 h-9 rounded-lg flex items-center justify-center ${
              isDark ? "bg-accent/20" : "bg-accent/10"
            }`}
          >
            <svg className="w-4.5 h-4.5 text-accent" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </div>
          <span
            className={`text-xs font-bold tracking-widest uppercase ${
              isDark ? "text-accent" : "text-accent"
            }`}
          >
            Connect on LinkedIn
          </span>
        </div>
        <p
          className={`text-sm leading-relaxed mb-4 ${
            isDark ? "text-white/60" : "text-mid"
          }`}
        >
          Follow Claudiu Gherman for weekly insights on operational excellence — straight from the shop floor.
        </p>
        <a
          href="https://www.linkedin.com/in/ghermanclaudiucristian/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-blue-600 transition-colors"
        >
          Follow on LinkedIn &rarr;
        </a>
      </div>
    </FadeUp>
  );
}
