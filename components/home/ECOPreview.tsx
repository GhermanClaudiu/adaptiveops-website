"use client";

import Link from "next/link";
import FadeUp from "@/components/shared/FadeUp";

const systems = [
  { abbr: "EMS", label: "Machine", color: "#E65100" },
  { abbr: "QMS", label: "Method", color: "#1565C0", beta: true },
  { abbr: "MMS", label: "Material", color: "#6A1B9A" },
  { abbr: "PMS", label: "People", color: "#2E7D32" },
  { abbr: "OMS", label: "Operations", color: "#558B2F" },
  { abbr: "CIS", label: "Improvement", color: "#00695C" },
];

export default function ECOPreview() {
  return (
    <section className="bg-primary py-20 lg:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text content */}
          <FadeUp>
            <div>
              <div className="inline-flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center text-sm font-black text-white">
                  E
                </div>
                <span className="text-sm font-bold tracking-widest uppercase text-accent">
                  ECO Platform
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight mb-5">
                6 Management Systems.
                <br />
                One Unified Platform.
              </h2>
              <p className="text-white/60 text-base md:text-lg leading-relaxed mb-6 max-w-lg">
                From equipment and quality to materials and people — ECO integrates
                everything your operations need into a single digital core.
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                {systems.map((sys) => (
                  <span
                    key={sys.abbr}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-white/90 border border-white/10"
                    style={{ backgroundColor: `${sys.color}30` }}
                  >
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: sys.color }}
                    />
                    {sys.abbr}
                    {sys.beta && (
                      <span className="text-[9px] text-white/40 ml-0.5">BETA</span>
                    )}
                  </span>
                ))}
              </div>
              <Link
                href="/solutions"
                className="inline-block bg-accent hover:bg-blue-600 active:scale-[0.98] text-white font-semibold px-8 py-3.5 rounded-full transition-colors focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
              >
                Explore the platform &rarr;
              </Link>
            </div>
          </FadeUp>

          {/* Right: Visual diagram */}
          <FadeUp delay={200}>
            <div className="flex flex-col items-center gap-4">
              <div className="relative w-[320px] h-[320px] sm:w-[420px] sm:h-[420px]">
                {/* SVG layer: outer ring text + connecting lines */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                  {/* Outer ring */}
                  <circle cx="50" cy="50" r="49" fill="none" stroke="rgba(47,128,237,0.15)" strokeWidth="0.4" />

                  {/* Circular text paths */}
                  <defs>
                    <path
                      id="outerTextTop"
                      d="M 50,50 m -45,0 a 45,45 0 1,1 90,0"
                      fill="none"
                    />
                    <path
                      id="outerTextBottom"
                      d="M 50,50 m -47,0 a 47,47 0 1,0 94,0"
                      fill="none"
                    />
                  </defs>
                  {/* Top arc: Training · Coaching · Audit */}
                  <text>
                    <textPath
                      href="#outerTextTop"
                      startOffset="50%"
                      textAnchor="middle"
                      fill="#2F80ED"
                      fontSize="2.8"
                      fontWeight="700"
                      letterSpacing="0.5"
                      style={{ textTransform: "uppercase" }}
                    >
                      TRAINING &nbsp; · &nbsp; COACHING &nbsp; · &nbsp; AUDIT
                    </textPath>
                  </text>
                  {/* Bottom arc: Management Layer */}
                  <text>
                    <textPath
                      href="#outerTextBottom"
                      startOffset="50%"
                      textAnchor="middle"
                      fill="#2F80ED"
                      fontSize="2.8"
                      fontWeight="700"
                      letterSpacing="0.5"
                      style={{ textTransform: "uppercase" }}
                    >
                      MANAGEMENT &nbsp; · &nbsp; LAYER
                    </textPath>
                  </text>

                  {/* Inner ring — where nodes sit */}
                  <circle cx="50" cy="50" r="32" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.3" />

                  {/* Connecting lines from center to nodes */}
                  {systems.map((sys, i) => {
                    const angle = (i * 60 - 90) * (Math.PI / 180);
                    const r = 32;
                    const x = 50 + r * Math.cos(angle);
                    const y = 50 + r * Math.sin(angle);
                    return (
                      <line
                        key={sys.abbr}
                        x1="50"
                        y1="50"
                        x2={x}
                        y2={y}
                        stroke={sys.color}
                        strokeWidth="0.3"
                        strokeOpacity="0.35"
                        strokeDasharray="1 1"
                      />
                    );
                  })}
                </svg>

                {/* Center — ECO Core */}
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#0B1F3B] border-2 border-accent/40 flex flex-col items-center justify-center shadow-[0_0_40px_rgba(47,128,237,0.15)]">
                    <span className="text-2xl sm:text-3xl font-black text-white tracking-tight">ECO</span>
                    <span className="text-[8px] sm:text-[9px] font-medium uppercase text-accent/60 tracking-widest">Platform</span>
                  </div>
                </div>

                {/* System nodes positioned in a circle */}
                {systems.map((sys, i) => {
                  const angle = (i * 60 - 90) * (Math.PI / 180);
                  const radius = 32;
                  const x = 50 + radius * Math.cos(angle);
                  const y = 50 + radius * Math.sin(angle);

                  return (
                    <div
                      key={sys.abbr}
                      className="absolute z-10"
                      style={{
                        left: `${x}%`,
                        top: `${y}%`,
                        transform: "translate(-50%, -50%)",
                      }}
                    >
                      <div
                        className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white flex flex-col items-center justify-center border-2 shadow-sm"
                        style={{ borderColor: sys.color }}
                      >
                        <span className="text-sm sm:text-base font-black" style={{ color: sys.color }}>
                          {sys.abbr}
                        </span>
                        <span className="text-[8px] sm:text-[9px] text-gray-500 uppercase font-medium">
                          {sys.label}
                        </span>
                        {sys.beta && (
                          <span className="absolute -top-1 -right-1 bg-accent text-white text-[6px] sm:text-[7px] font-bold px-1.5 py-0.5 rounded-full leading-none">
                            BETA
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="text-center max-w-xs mx-auto">
                <p className="text-sm font-semibold text-white/70">
                  Execution &amp; Control of Operations
                </p>
                <p className="text-[11px] text-white/35 leading-relaxed mt-1">
                  A digital framework that connects people, processes, and
                  equipment to execute operations, monitor performance, and
                  drive continuous improvement.
                </p>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
