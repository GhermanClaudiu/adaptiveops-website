"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

interface Module {
  name: string;
  tier: 1 | 2;
}

interface System {
  id: string;
  name: string;
  abbr: string;
  color: string;
  standard: string;
  description: string;
  modules: Module[];
  comingSoon?: boolean;
}

const systems: System[] = [
  {
    id: "QMS",
    name: "Quality Management",
    abbr: "QMS",
    color: "#1565C0",
    standard: "ISO 9001",
    description:
      "Full quality lifecycle management from document control to supplier quality assurance.",
    modules: [
      { name: "Document Control", tier: 1 },
      { name: "CAPA Management", tier: 1 },
      { name: "Audit Management", tier: 1 },
      { name: "Nonconformance", tier: 1 },
      { name: "Complaint Management", tier: 2 },
      { name: "Supplier Quality", tier: 2 },
      { name: "Risk & FMEA", tier: 2 },
    ],
  },
  {
    id: "EMS",
    name: "Equipment Management",
    abbr: "EMS",
    color: "#E65100",
    standard: "ISO 55000",
    description:
      "Complete asset lifecycle from preventive maintenance to condition-based monitoring.",
    modules: [
      { name: "Asset Registry", tier: 1 },
      { name: "Work Orders", tier: 1 },
      { name: "Preventive Maintenance", tier: 1 },
      { name: "Calibration", tier: 1 },
      { name: "Spare Parts", tier: 1 },
      { name: "Condition Monitoring", tier: 2 },
      { name: "Equipment KPIs", tier: 2 },
    ],
  },
  {
    id: "MMS",
    name: "Material Management",
    abbr: "MMS",
    color: "#6A1B9A",
    standard: "DDMRP",
    description:
      "Lean material flow with Kanban, traceability and dynamic buffer management.",
    modules: [
      { name: "Material Master & Registry", tier: 1 },
      { name: "Kanban Classic", tier: 1 },
      { name: "Material Traceability", tier: 1 },
      { name: "BOM Management", tier: 1 },
      { name: "Dynamic Kanban", tier: 2 },
      { name: "WIP & Flow Control", tier: 2 },
      { name: "Supermarket & Buffer", tier: 2 },
    ],
  },
  {
    id: "PMS",
    name: "People Management",
    abbr: "PMS",
    color: "#2E7D32",
    standard: "ISO 45001",
    description:
      "People development from competence tracking to workforce analytics and safety.",
    modules: [
      { name: "Training & Competence", tier: 1 },
      { name: "Performance Evaluation", tier: 1 },
      { name: "Org Structure", tier: 1 },
      { name: "Recruitment & Onboarding", tier: 1 },
      { name: "Workplace Safety (OHS)", tier: 2 },
      { name: "Attendance & Leave", tier: 2 },
      { name: "Workforce Analytics", tier: 2 },
    ],
  },
  {
    id: "OMS",
    name: "Operations Management",
    abbr: "OMS",
    color: "#558B2F",
    standard: "TPS / Lean",
    description:
      "Daily production management, KPI cascading and operational performance systems.",
    modules: [
      { name: "Daily Management System", tier: 1 },
      { name: "KPI Cascading", tier: 1 },
      { name: "Production Planning", tier: 1 },
      { name: "Shift Management", tier: 1 },
      { name: "OEE Tracking", tier: 2 },
      { name: "Performance Dashboards", tier: 2 },
    ],
    comingSoon: true,
  },
  {
    id: "CIS",
    name: "Continuous Improvement",
    abbr: "CIS",
    color: "#00695C",
    standard: "Toyota Kata",
    description:
      "Structured improvement cycles with A3 thinking, Kaizen and problem solving tools.",
    modules: [
      { name: "Kaizen Management", tier: 1 },
      { name: "A3 Problem Solving", tier: 1 },
      { name: "Improvement Projects", tier: 1 },
      { name: "Savings Tracker", tier: 2 },
      { name: "Best Practice Library", tier: 2 },
    ],
    comingSoon: true,
  },
];

const kernel = [
  "User & Role Mgmt",
  "Workflow Engine",
  "Notifications",
  "Audit Trail",
  "Reporting & Analytics",
  "API Integration",
  "Backup & Security",
];

export default function ECOPlatform() {
  const [active, setActive] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const detailRef = useRef<HTMLDivElement>(null);

  const selected = systems.find((s) => s.id === active);

  useEffect(() => {
    if (active && detailRef.current) {
      detailRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [active]);

  return (
    <div className="bg-primary pt-0 pb-16 lg:pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Platform header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center text-xl font-black text-white">
              E
            </div>
            <span className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              ECO Platform
            </span>
          </div>
          <p className="text-white/50 text-sm md:text-base">
            6 Integrated Management Systems &middot; One Unified Platform
          </p>
        </div>

        {/* Systems grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 mb-5">
          {systems.map((sys) => {
            const isActive = active === sys.id;
            const isHovered = hovered === sys.id;

            return (
              <button
                key={sys.id}
                onClick={() => setActive(isActive ? null : sys.id)}
                onMouseEnter={() => setHovered(sys.id)}
                onMouseLeave={() => setHovered(null)}
                className="group relative text-left rounded-2xl p-5 md:p-6 transition-colors duration-200 overflow-hidden"
                style={{
                  background: isActive
                    ? sys.color
                    : isHovered
                      ? `${sys.color}1A`
                      : "rgba(255,255,255,0.05)",
                  borderTop: `2px solid ${isActive || isHovered ? sys.color : "rgba(255,255,255,0.1)"}`,
                  borderRight: `2px solid ${isActive || isHovered ? sys.color : "rgba(255,255,255,0.1)"}`,
                  borderBottom: `2px solid ${isActive || isHovered ? sys.color : "rgba(255,255,255,0.1)"}`,
                  borderLeft: `3px solid ${sys.color}`,
                }}
              >
                {sys.comingSoon && (
                  <span className="absolute top-2.5 right-2.5 bg-white/15 rounded-full px-2.5 py-0.5 text-[10px] font-semibold tracking-wider text-white">
                    COMING SOON
                  </span>
                )}

                {/* System icon — styled letter badge */}
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-lg font-black text-white mb-3"
                  style={{ backgroundColor: isActive ? "rgba(255,255,255,0.2)" : sys.color }}
                >
                  {sys.abbr.charAt(0)}
                </div>

                <span
                  className="text-[11px] font-bold tracking-widest uppercase block mb-1"
                  style={{ color: isActive ? "rgba(255,255,255,0.7)" : sys.color }}
                >
                  {sys.abbr}
                </span>
                <span className="text-sm md:text-[15px] font-semibold text-white block mb-1">
                  {sys.name}
                </span>
                <span className="text-[11px] text-white/40 italic block mb-3">
                  {sys.standard}
                </span>
                <span className="text-[10px] text-white/25 group-hover:text-white/40 transition-colors">
                  Click to explore &rarr;
                </span>
              </button>
            );
          })}
        </div>

        {/* Detail panel */}
        {selected && (
          <div
            ref={detailRef}
            className="rounded-2xl p-6 md:p-8 mb-5 bg-white/5 border-2 animate-in fade-in duration-200"
            style={{ borderColor: selected.color }}
          >
            <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-lg font-black text-white"
                    style={{ backgroundColor: selected.color }}
                  >
                    {selected.abbr.charAt(0)}
                  </div>
                  <span className="text-xl md:text-2xl font-bold text-white">
                    {selected.name}
                  </span>
                  <span
                    className="rounded-md px-2.5 py-0.5 text-xs font-bold text-white"
                    style={{ background: selected.color }}
                  >
                    {selected.abbr}
                  </span>
                </div>
                <p className="text-white/50 text-sm max-w-lg">
                  {selected.description}
                </p>
              </div>
              <div className="bg-white/[0.08] rounded-lg px-4 py-2 text-xs text-white/50">
                Standard:{" "}
                <strong className="text-white">{selected.standard}</strong>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Tier 1 */}
              <div>
                <p
                  className="text-[11px] font-bold tracking-widest uppercase mb-3"
                  style={{ color: selected.color }}
                >
                  Tier 1 — Core Modules
                </p>
                <div className="space-y-2">
                  {selected.modules
                    .filter((m) => m.tier === 1)
                    .map((mod) => (
                      <div
                        key={mod.name}
                        className="bg-white/[0.06] border border-white/[0.08] rounded-lg px-3.5 py-2.5 flex items-center gap-2.5"
                      >
                        <span
                          className="w-2 h-2 rounded-full flex-shrink-0"
                          style={{ backgroundColor: selected.color }}
                        />
                        <span className="text-[13px] text-white/85">
                          {mod.name}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
              {/* Tier 2 */}
              <div>
                <p className="text-[11px] font-bold tracking-widest uppercase text-white/40 mb-3">
                  Tier 2 — Advanced Modules
                </p>
                <div className="space-y-2">
                  {selected.modules
                    .filter((m) => m.tier === 2)
                    .map((mod) => (
                      <div
                        key={mod.name}
                        className="bg-white/[0.03] border border-white/[0.05] rounded-lg px-3.5 py-2.5 flex items-center gap-2.5"
                      >
                        <span className="w-2 h-2 rounded-full flex-shrink-0 bg-white/20" />
                        <span className="text-[13px] text-white/50">
                          {mod.name}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-white/[0.08] flex justify-end">
              <Link
                href="/contact"
                className="text-white font-semibold text-sm px-6 py-2.5 rounded-full transition-colors hover:opacity-90"
                style={{ background: selected.color }}
              >
                Request a demo &rarr;
              </Link>
            </div>
          </div>
        )}

        {/* Shared Kernel */}
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 md:p-6">
          <p className="text-[11px] font-bold tracking-widest uppercase text-white/30 mb-4">
            Shared Infrastructure — Available Across All Systems
          </p>
          <div className="flex flex-wrap gap-2">
            {kernel.map((k) => (
              <span
                key={k}
                className="bg-white/[0.06] border border-white/[0.08] rounded-full px-3.5 py-1.5 text-xs text-white/50 flex items-center gap-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-accent/50" />
                {k}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
