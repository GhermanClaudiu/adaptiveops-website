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
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-dark border-t border-white/10 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="text-sm text-white/70">
          We use cookies to improve your experience. By continuing to use this site, you agree to our use of cookies.
        </p>
        <div className="flex gap-3 flex-shrink-0">
          <button
            onClick={decline}
            className="text-sm text-white/50 hover:text-white px-4 py-2 transition-colors"
          >
            Decline
          </button>
          <button
            onClick={accept}
            className="text-sm bg-accent hover:bg-blue-600 text-white font-semibold px-5 py-2 rounded-lg transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
