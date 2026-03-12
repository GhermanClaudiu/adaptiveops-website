"use client";

import { useEffect, useRef, useState } from "react";

const bars = [
  { label: "Scrap Rate", value: "6.8%", width: 68, color: "bg-red-400", textColor: "text-red-500", arrow: true },
  { label: "OEE", value: "52%", width: 52, color: "bg-amber-400", textColor: "text-amber-600", arrowDown: true },
  { label: "CAPA Closure", value: "35%", width: 35, color: "bg-purple-400", textColor: "text-purple-500", overdue: true },
];

export default function AnimatedBars() {
  const ref = useRef<HTMLDivElement>(null);
  const [filled, setFilled] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setFilled(true);
          observerRef.current?.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observerRef.current.observe(el);
    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <div ref={ref} className="space-y-2.5">
      {bars.map((bar) => (
        <div key={bar.label} className="flex items-center justify-between bg-gray-50/80 rounded-xl px-4 py-3 border border-gray-100">
          <span className="text-sm font-medium text-gray-700">{bar.label}</span>
          <div className="flex items-center gap-3">
            <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full ${bar.color} rounded-full`}
                style={{
                  width: filled ? `${bar.width}%` : "0%",
                  transition: "width 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              />
            </div>
            <span className={`text-sm font-semibold ${bar.textColor} w-10 text-right`}>{bar.value}</span>
            {bar.arrow && (
              <svg className="w-3.5 h-3.5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            )}
            {bar.arrowDown && (
              <svg className="w-3.5 h-3.5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5" />
              </svg>
            )}
            {bar.overdue && (
              <span className="text-[11px] text-purple-400 font-medium">overdue</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
