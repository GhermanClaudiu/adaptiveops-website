import type { Metadata } from "next";
import Link from "next/link";
import FiveSGame from "@/components/resources/FiveSGame";
import ToolTestimonials from "@/components/resources/ToolTestimonials";
import ToolReviewsBar from "@/components/resources/ToolReviewsBar";
import NewsletterSignup from "@/components/shared/NewsletterSignup";

export const metadata: Metadata = {
  title: "5S Numbers Game",
  description:
    "Play the classic lean 5S Numbers Game in your browser. Same task, same 30 seconds — watch your score climb as Sort and Set in Order clean up the workplace. A hands-on demo of what 5S does on a real shop floor.",
  alternates: { canonical: "/resources/5s-numbers-game" },
  openGraph: {
    title: "5S Numbers Game — AdaptiveOps",
    description:
      "See what 5S does in 30 seconds. The lean training game we run on the shop floor — now interactive, free, in your browser.",
    url: "/resources/5s-numbers-game",
  },
  twitter: {
    card: "summary_large_image",
    title: "5S Numbers Game — AdaptiveOps",
    description: "Same task, same 30 seconds — watch what 5S does. Free interactive lean game.",
    images: ["/og-image.png"],
  },
};

export default function FiveSNumbersGamePage() {
  return (
    <main className="bg-light">
      {/* Breadcrumb / back to tools */}
      <div className="bg-primary print:hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
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

      <ToolReviewsBar toolSlug="5s-numbers-game" />

      <FiveSGame />

      <ToolTestimonials toolSlug="5s-numbers-game" />

      <NewsletterSignup variant="dark" />
    </main>
  );
}
