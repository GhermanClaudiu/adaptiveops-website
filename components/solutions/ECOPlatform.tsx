"use client";

import { useState } from "react";
import Link from "next/link";

interface Module {
  icon: string;
  name: string;
  tier: 1 | 2;
}

interface System {
  id: string;
  name: string;
  abbr: string;
  color: string;
  icon: string;
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
    icon: "\u2705",
    standard: "ISO 9001",
    description:
      "Full quality lifecycle management from document control to supplier quality assurance.",
    modules: [
      { icon: "\uD83D\uDCC4", name: "Document Control", tier: 1 },
      { icon: "\uD83D\uDD27", name: "CAPA Management", tier: 1 },
      { icon: "\u2705", name: "Audit Management", tier: 1 },
      { icon: "\u26A0\uFE0F", name: "Nonconformance", tier: 1 },
      { icon: "\uD83D\uDCDE", name: "Complaint Management", tier: 2 },
      { icon: "\uD83C\uDFED", name: "Supplier Quality", tier: 2 },
      { icon: "\uD83C\uDFAF", name: "Risk & FMEA", tier: 2 },
    ],
  },
  {
    id: "EMS",
    name: "Equipment Management",
    abbr: "EMS",
    color: "#E65100",
    icon: "\uD83D\uDD27",
    standard: "ISO 55000",
    description:
      "Complete asset lifecycle from preventive maintenance to condition-based monitoring.",
    modules: [
      { icon: "\uD83C\uDFED", name: "Asset Registry", tier: 1 },
      { icon: "\uD83D\uDCCB", name: "Work Orders", tier: 1 },
      { icon: "\uD83D\uDD27", name: "Preventive Maintenance", tier: 1 },
      { icon: "\uD83D\uDCD0", name: "Calibration", tier: 1 },
      { icon: "\uD83D\uDCE6", name: "Spare Parts", tier: 1 },
      { icon: "\uD83D\uDCE1", name: "Condition Monitoring", tier: 2 },
      { icon: "\uD83D\uDCCA", name: "Equipment KPIs", tier: 2 },
    ],
  },
  {
    id: "MMS",
    name: "Material Management",
    abbr: "MMS",
    color: "#6A1B9A",
    icon: "\uD83D\uDCE6",
    standard: "DDMRP",
    description:
      "Lean material flow with Kanban, traceability and dynamic buffer management.",
    modules: [
      { icon: "\uD83D\uDCE6", name: "Material Master & Registry", tier: 1 },
      { icon: "\uD83D\uDD04", name: "Kanban Classic", tier: 1 },
      { icon: "\uD83D\uDD0D", name: "Material Traceability", tier: 1 },
      { icon: "\uD83D\uDCCB", name: "BOM Management", tier: 1 },
      { icon: "\u26A1", name: "Dynamic Kanban", tier: 2 },
      { icon: "\uD83D\uDCCA", name: "WIP & Flow Control", tier: 2 },
      { icon: "\uD83C\uDFEA", name: "Supermarket & Buffer", tier: 2 },
    ],
  },
  {
    id: "HMS",
    name: "Human Management",
    abbr: "HMS",
    color: "#2E7D32",
    icon: "\uD83D\uDC65",
    standard: "ISO 45001",
    description:
      "People development from competence tracking to workforce analytics and safety.",
    modules: [
      { icon: "\uD83C\uDF93", name: "Training & Competence", tier: 1 },
      { icon: "\uD83D\uDCCA", name: "Performance Evaluation", tier: 1 },
      { icon: "\uD83C\uDFE2", name: "Org Structure", tier: 1 },
      { icon: "\uD83D\uDC4B", name: "Recruitment & Onboarding", tier: 1 },
      { icon: "\uD83D\uDEE1\uFE0F", name: "Workplace Safety (OHS)", tier: 2 },
      { icon: "\uD83D\uDCC5", name: "Attendance & Leave", tier: 2 },
      { icon: "\uD83D\uDCC8", name: "Workforce Analytics", tier: 2 },
    ],
  },
  {
    id: "OMS",
    name: "Operations Management",
    abbr: "OMS",
    color: "#558B2F",
    icon: "\u2699\uFE0F",
    standard: "TPS / Lean",
    description:
      "Daily production management, KPI cascading and operational performance systems.",
    modules: [
      { icon: "\uD83D\uDCCA", name: "Daily Management System", tier: 1 },
      { icon: "\uD83C\uDFAF", name: "KPI Cascading", tier: 1 },
      { icon: "\uD83D\uDCCB", name: "Production Planning", tier: 1 },
      { icon: "\uD83D\uDD04", name: "Shift Management", tier: 1 },
      { icon: "\uD83D\uDCC8", name: "OEE Tracking", tier: 2 },
      { icon: "\uD83C\uDFC6", name: "Performance Dashboards", tier: 2 },
    ],
    comingSoon: true,
  },
  {
    id: "CIS",
    name: "Continuous Improvement",
    abbr: "CIS",
    color: "#00695C",
    icon: "\uD83D\uDD04",
    standard: "Toyota Kata",
    description:
      "Structured improvement cycles with A3 thinking, Kaizen and problem solving tools.",
    modules: [
      { icon: "\uD83D\uDD04", name: "Kaizen Management", tier: 1 },
      { icon: "\uD83D\uDCCB", name: "A3 Problem Solving", tier: 1 },
      { icon: "\uD83C\uDFAF", name: "Improvement Projects", tier: 1 },
      { icon: "\uD83D\uDCCA", name: "Savings Tracker", tier: 2 },
      { icon: "\uD83C\uDFC6", name: "Best Practice Library", tier: 2 },
    ],
    comingSoon: true,
  },
];

const kernel = [
  "\uD83D\uDC64 User & Role Mgmt",
  "\uD83D\uDD04 Workflow Engine",
  "\uD83D\uDD14 Notifications",
  "\uD83D\uDCDD Audit Trail",
  "\uD83D\uDCCA Reporting & Analytics",
  "\uD83D\uDD0C API Integration",
  "\uD83D\uDCBE Backup & Security",
];

export default function ECOPlatform() {
  const [active, setActive] = useState<string | null>(null);

  const selected = systems.find((s) => s.id === active);

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
            return (
              <button
                key={sys.id}
                onClick={() => setActive(isActive ? null : sys.id)}
                className="group relative text-left rounded-2xl p-5 md:p-6 transition-all duration-200 overflow-hidden"
                style={{
                  background: isActive
                    ? sys.color
                    : `rgba(255,255,255,0.05)`,
                  borderTop: "2px solid rgba(255,255,255,0.1)",
                  borderRight: "2px solid rgba(255,255,255,0.1)",
                  borderBottom: "2px solid rgba(255,255,255,0.1)",
                  borderLeft: `3px solid ${sys.color}`,
                  ...(isActive && {
                    borderColor: sys.color,
                  }),
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = `${sys.color}1A`;
                    e.currentTarget.style.borderColor = sys.color;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                    e.currentTarget.style.borderTop = "2px solid rgba(255,255,255,0.1)";
                    e.currentTarget.style.borderRight = "2px solid rgba(255,255,255,0.1)";
                    e.currentTarget.style.borderBottom = "2px solid rgba(255,255,255,0.1)";
                    e.currentTarget.style.borderLeft = `3px solid ${sys.color}`;
                  }
                }}
              >
                {sys.comingSoon && (
                  <span className="absolute top-2.5 right-2.5 bg-white/15 rounded-full px-2.5 py-0.5 text-[10px] font-semibold tracking-wider text-white">
                    COMING SOON
                  </span>
                )}
                <span className="text-2xl block mb-2">{sys.icon}</span>
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
            className="rounded-2xl p-6 md:p-8 mb-5 bg-white/5 border-2 animate-in fade-in duration-200"
            style={{ borderColor: selected.color }}
          >
            <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{selected.icon}</span>
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
                  ● Tier 1 — Core Modules
                </p>
                <div className="space-y-2">
                  {selected.modules
                    .filter((m) => m.tier === 1)
                    .map((mod) => (
                      <div
                        key={mod.name}
                        className="bg-white/[0.06] border border-white/[0.08] rounded-lg px-3.5 py-2.5 flex items-center gap-2.5"
                      >
                        <span className="text-base">{mod.icon}</span>
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
                  ○ Tier 2 — Advanced Modules
                </p>
                <div className="space-y-2">
                  {selected.modules
                    .filter((m) => m.tier === 2)
                    .map((mod) => (
                      <div
                        key={mod.name}
                        className="bg-white/[0.03] border border-white/[0.05] rounded-lg px-3.5 py-2.5 flex items-center gap-2.5"
                      >
                        <span className="text-base">{mod.icon}</span>
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
            ⚙ Shared Infrastructure — Available Across All Systems
          </p>
          <div className="flex flex-wrap gap-2">
            {kernel.map((k) => (
              <span
                key={k}
                className="bg-white/[0.06] border border-white/[0.08] rounded-full px-3.5 py-1.5 text-xs text-white/50"
              >
                {k}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
