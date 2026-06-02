"use client";

import { FormEvent, useState } from "react";
import FadeUp from "@/components/shared/FadeUp";
import { captureLead } from "@/lib/leadCapture";

interface NewsletterSignupProps {
  variant?: "dark" | "light";
  title?: string;
  subtitle?: string;
}

export default function NewsletterSignup({
  variant = "dark",
  title = "Steal one operational improvement every month.",
  subtitle = "5 minutes of reading. Real plants. No theory. So your next shift starts with one less problem than last month.",
}: NewsletterSignupProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const isDark = variant === "dark";

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email || !consent) return;

    setStatus("loading");
    setErrorMsg("");

    // Fire-and-forget lead capture to Academy (consent is required above).
    captureLead({
      email,
      name: name || undefined,
      source: "Newsletter",
      consent,
    });

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name }),
      });

      if (res.ok) {
        setStatus("success");
        setName("");
        setEmail("");
        setConsent(false);
      } else {
        const data = await res.json().catch(() => ({}));
        setErrorMsg((data as Record<string, string>).error || "Something went wrong. Try again.");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Something went wrong. Try again.");
      setStatus("error");
    }
  }

  return (
    <section className={isDark ? "bg-primary py-16 lg:py-20" : "bg-light py-16 lg:py-20"}>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <FadeUp>
          <h2
            className={`text-xl sm:text-2xl md:text-3xl font-bold leading-tight ${
              isDark ? "text-white" : "text-primary"
            }`}
          >
            {title}
          </h2>
          <p
            className={`mt-3 text-sm md:text-base leading-relaxed max-w-lg mx-auto ${
              isDark ? "text-white/70" : "text-mid"
            }`}
          >
            {subtitle}
          </p>
        </FadeUp>

        <FadeUp delay={100}>
          {status === "success" ? (
            <div className={`mt-8 rounded-xl px-6 py-5 ${isDark ? "bg-secondary/10 border border-secondary/20" : "bg-secondary/10 border border-secondary/20"}`}>
              <div className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
                <p className={`text-sm font-medium ${isDark ? "text-white" : "text-primary"}`}>
                  Thank you! Practical insights from the shop floor — delivered monthly.
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8">
              <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                <input
                  type="text"
                  placeholder="First name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`flex-1 min-w-0 rounded-lg px-4 py-3 text-sm outline-none transition-shadow focus:ring-2 focus:ring-accent ${
                    isDark
                      ? "bg-white/[0.08] border border-white/10 text-white placeholder:text-white/30"
                      : "bg-white border border-gray-200 text-dark placeholder:text-mid"
                  }`}
                />
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={`flex-1 min-w-0 rounded-lg px-4 py-3 text-sm outline-none transition-shadow focus:ring-2 focus:ring-accent ${
                    isDark
                      ? "bg-white/[0.08] border border-white/10 text-white placeholder:text-white/30"
                      : "bg-white border border-gray-200 text-dark placeholder:text-mid"
                  }`}
                />
              </div>
              <label
                className={`mt-4 flex items-start gap-2.5 text-left text-xs leading-relaxed cursor-pointer ${
                  isDark ? "text-white/55" : "text-mid"
                }`}
              >
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  required
                  className="mt-0.5 w-4 h-4 flex-shrink-0 rounded accent-accent focus-visible:ring-2 focus-visible:ring-accent"
                />
                <span>
                  I agree to AdaptiveOps storing my details to send the monthly
                  newsletter. I can unsubscribe anytime.
                </span>
              </label>

              <button
                type="submit"
                disabled={status === "loading" || !consent}
                className="mt-3 w-full sm:w-auto bg-accent text-white font-semibold px-8 py-3 rounded-lg transition-shadow hover:shadow-[0_0_20px_rgba(47,128,237,0.4)] disabled:opacity-60 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary text-sm"
              >
                {status === "loading" ? (
                  <span className="inline-flex items-center gap-2">
                    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="32" strokeLinecap="round" />
                    </svg>
                    Subscribing…
                  </span>
                ) : (
                  "Get Free Operational Excellence Tips"
                )}
              </button>

              {status === "error" && (
                <p className="mt-3 text-sm text-red-400">{errorMsg}</p>
              )}

              <p className={`mt-4 text-xs ${isDark ? "text-white/25" : "text-mid/60"}`}>
                No spam. Unsubscribe anytime. We respect your inbox.
              </p>
            </form>
          )}
        </FadeUp>
      </div>
    </section>
  );
}
