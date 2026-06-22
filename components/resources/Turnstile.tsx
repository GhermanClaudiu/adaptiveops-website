"use client";

import { useEffect, useRef } from "react";

/**
 * Minimal Cloudflare Turnstile widget (explicit render, no extra dependency).
 * Loads the official script once and renders a widget bound to this element.
 */

interface TurnstileOptions {
  sitekey: string;
  callback?: (token: string) => void;
  "error-callback"?: () => void;
  "expired-callback"?: () => void;
  theme?: "light" | "dark" | "auto";
  action?: string;
}

interface TurnstileApi {
  render: (el: HTMLElement, opts: TurnstileOptions) => string;
  remove: (id: string) => void;
  reset: (id?: string) => void;
}

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

const SCRIPT_SRC =
  "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
let scriptPromise: Promise<void> | null = null;

function loadScript(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.turnstile) return Promise.resolve();
  if (scriptPromise) return scriptPromise;
  scriptPromise = new Promise<void>((resolve, reject) => {
    const s = document.createElement("script");
    s.src = SCRIPT_SRC;
    s.async = true;
    s.defer = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("Failed to load Turnstile"));
    document.head.appendChild(s);
  });
  return scriptPromise;
}

export default function Turnstile({
  sitekey,
  action,
  theme = "auto",
  onVerify,
  onExpire,
  onError,
}: {
  sitekey: string;
  action?: string;
  theme?: "light" | "dark" | "auto";
  onVerify: (token: string) => void;
  onExpire?: () => void;
  onError?: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  // Keep the latest callbacks without re-rendering the widget.
  const cbs = useRef({ onVerify, onExpire, onError });
  cbs.current = { onVerify, onExpire, onError };

  useEffect(() => {
    let cancelled = false;
    loadScript()
      .then(() => {
        if (cancelled || !ref.current || !window.turnstile || widgetId.current)
          return;
        widgetId.current = window.turnstile.render(ref.current, {
          sitekey,
          action,
          theme,
          callback: (t) => cbs.current.onVerify(t),
          "expired-callback": () => cbs.current.onExpire?.(),
          "error-callback": () => cbs.current.onError?.(),
        });
      })
      .catch(() => cbs.current.onError?.());

    return () => {
      cancelled = true;
      if (widgetId.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetId.current);
        } catch {
          /* widget already gone */
        }
        widgetId.current = null;
      }
    };
  }, [sitekey, action, theme]);

  return <div ref={ref} className="min-h-[65px]" />;
}
