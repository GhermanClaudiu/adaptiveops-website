"use client";

import { useState, useEffect } from "react";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) setVisible(true);
  }, []);

  function accept() {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  }

  function decline() {
    localStorage.setItem("cookie-consent", "declined");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-sm z-50 bg-dark border border-white/10 rounded-xl p-4 shadow-2xl">
      <p className="text-sm text-white/70 leading-relaxed">
        We use cookies to improve your experience.
      </p>
      <div className="flex gap-3 mt-3">
        <button
          onClick={decline}
          className="text-sm text-white/50 hover:text-white px-3 py-1.5 rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-white"
        >
          Decline
        </button>
        <button
          onClick={accept}
          className="text-sm bg-accent hover:bg-blue-600 active:scale-[0.98] text-white font-semibold px-4 py-1.5 rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-dark"
        >
          Accept
        </button>
      </div>
    </div>
  );
}
