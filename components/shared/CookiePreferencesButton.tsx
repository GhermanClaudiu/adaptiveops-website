"use client";

/**
 * Lets a visitor reopen the cookie banner from anywhere (e.g. the Cookie Policy
 * page or the footer) so they can change or withdraw a previous decision.
 * It clears the stored choice via the event CookieConsent listens for.
 */
export default function CookiePreferencesButton({
  className,
  children = "Change your cookie preferences",
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  function reset() {
    window.dispatchEvent(new Event("cookie-consent:reset"));
    // Scroll to where the banner appears so the action is visible.
    window.scrollTo({ top: document.body.scrollHeight });
  }

  return (
    <button
      type="button"
      onClick={reset}
      className={
        className ??
        "inline-flex items-center gap-2 rounded-lg border border-[#2F80ED] bg-transparent px-6 py-3 text-sm font-semibold text-[#2F80ED] transition-colors hover:bg-[#2F80ED]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2F80ED] focus-visible:ring-offset-2 active:scale-[0.98]"
      }
    >
      {children}
    </button>
  );
}
