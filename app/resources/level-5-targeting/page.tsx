import type { Metadata } from "next";
import Link from "next/link";
import Level5TargetingTool from "@/components/resources/Level5TargetingTool";
import ToolTestimonials from "@/components/resources/ToolTestimonials";

export const metadata: Metadata = {
  title: "Level 5 Targeting Self-Assessment",
  description:
    "Which 20% of your processes actually deserve Level 5? A 15-minute self-assessment that traces your plant's financial goal down to the specific processes worth the maturity investment.",
  alternates: { canonical: "/resources/level-5-targeting" },
  openGraph: {
    title: "Level 5 Targeting Self-Assessment — AdaptiveOps",
    description:
      "Trace your plant's financial goal down to the specific processes that deserve Level 5. 15 minutes, your numbers stay in your browser.",
    url: "/resources/level-5-targeting",
  },
  twitter: {
    card: "summary_large_image",
    title: "Level 5 Targeting Self-Assessment — AdaptiveOps",
    description:
      "Which 20% of your processes actually deserve Level 5? A free 15-minute self-assessment.",
    images: ["/og-image.png"],
  },
};

export default function Level5TargetingPage() {
  return (
    <main className="bg-light">
      {/* Breadcrumb / back to resources */}
      <div className="bg-primary print:hidden">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <Link
            href="/resources/tools"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-white/70 hover:text-white transition-colors py-2 px-1 -mx-1 rounded focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
            Resources / Tools
          </Link>
        </div>
      </div>

      <Level5TargetingTool />

      <ToolTestimonials toolSlug="level-5-targeting" />
    </main>
  );
}
