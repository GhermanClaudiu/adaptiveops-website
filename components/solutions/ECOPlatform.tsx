"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

// TODO: Claudiu — verify and adjust the `status` per system before production:
//   "live"     → in production at a client
//   "beta"     → working build, not yet client-deployed
//   "dev"      → in active development
//   "roadmap"  → planned, not started
type Status = "live" | "beta" | "dev" | "roadmap";

interface Module {
  name: string;
  outcome: string;
  tier: 1 | 2;
}

interface System {
  id: string;
  name: string;
  abbr: string;
  color: string;
  standard: string;
  status: Status;
  pitch: string;
  modules: Module[];
}

const statusBadge: Record<Status, { label: string; bg: string; text: string; dot: string; pulse: boolean }> = {
  live: { label: "LIVE NOW", bg: "bg-secondary/20", text: "text-secondary", dot: "bg-secondary", pulse: true },
  beta: { label: "IN BETA", bg: "bg-amber-500/20", text: "text-amber-300", dot: "bg-amber-400", pulse: false },
  dev: { label: "IN DEVELOPMENT", bg: "bg-accent/20", text: "text-accent", dot: "bg-accent", pulse: false },
  roadmap: { label: "ROADMAP", bg: "bg-white/10", text: "text-white/50", dot: "bg-white/30", pulse: false },
};

const systems: System[] = [
  {
    id: "EMS",
    name: "Equipment Management",
    abbr: "EMS",
    color: "#E65100",
    standard: "ISO 55000",
    status: "live",
    pitch:
      "Every machine, every PM, every spare — in one place. Never miss a calibration, never run out of critical spares.",
    modules: [
      { name: "Asset Registry", outcome: "Every machine, line and tool in one searchable register", tier: 1 },
      { name: "Work Orders", outcome: "Maintenance work tracked from request to sign-off", tier: 1 },
      { name: "Preventive Maintenance", outcome: "PM scheduled, executed, evidenced — never missed", tier: 1 },
      { name: "Calibration", outcome: "Every gauge calibrated on schedule — audit-proof", tier: 1 },
      { name: "Spare Parts", outcome: "Critical spares tracked — never out of stock when needed", tier: 1 },
      { name: "Condition Monitoring", outcome: "Equipment health visible — predict failures before downtime", tier: 2 },
      { name: "Equipment KPIs", outcome: "OEE, MTBF, MTTR live — for each line", tier: 2 },
    ],
  },
  {
    id: "QMS",
    name: "Quality Management",
    abbr: "QMS",
    color: "#1565C0",
    standard: "ISO 9001",
    status: "dev",
    pitch:
      "Every defect logged with root cause. Every CAPA closed on time. Every audit ready in minutes — not 3-day Excel marathons.",
    modules: [
      { name: "Document Control", outcome: "Every SOP versioned, signed, traceable", tier: 1 },
      { name: "CAPA Management", outcome: "Every corrective action tracked to closure", tier: 1 },
      { name: "Audit Management", outcome: "Audit-ready every shift — no last-minute Excel marathon", tier: 1 },
      { name: "Nonconformance", outcome: "Every defect logged with root cause and resolution", tier: 1 },
      { name: "Complaint Management", outcome: "Customer complaints answered in hours, not days", tier: 2 },
      { name: "Supplier Quality", outcome: "Supplier non-conformities tracked from incoming to PPM", tier: 2 },
      { name: "Risk & FMEA", outcome: "Failure modes mapped before they reach production", tier: 2 },
    ],
  },
  {
    id: "MMS",
    name: "Material Management",
    abbr: "MMS",
    color: "#6A1B9A",
    standard: "DDMRP",
    status: "dev",
    pitch:
      "Material flow that pulls itself. Every batch traceable. Buffers that self-adjust to demand — no more shortages or overstock.",
    modules: [
      { name: "Material Master & Registry", outcome: "Every part number, BOM and supplier in one place", tier: 1 },
      { name: "Kanban Classic", outcome: "Visual material flow on the line — no manual orders", tier: 1 },
      { name: "Material Traceability", outcome: "Every batch traceable from incoming to shipped", tier: 1 },
      { name: "BOM Management", outcome: "BOMs versioned with engineering change control", tier: 1 },
      { name: "Dynamic Kanban", outcome: "Buffer sizes self-adjust to demand variation", tier: 2 },
      { name: "WIP & Flow Control", outcome: "WIP capped at the constraint — flow visible end-to-end", tier: 2 },
      { name: "Supermarket & Buffer", outcome: "Strategic buffers replenished by pull signals", tier: 2 },
    ],
  },
  {
    id: "PMS",
    name: "People Management",
    abbr: "PMS",
    color: "#2E7D32",
    standard: "ISO 45001",
    status: "dev",
    pitch:
      "Skills, training, certifications and safety — across every shift, without binders. ISO 45001 audits without the panic.",
    modules: [
      { name: "Training & Competence", outcome: "Every skill, certification and refresher tracked across shifts", tier: 1 },
      { name: "Performance Evaluation", outcome: "Evaluations structured, recorded, fair", tier: 1 },
      { name: "Org Structure", outcome: "Reporting lines visible — covers and gaps clear", tier: 1 },
      { name: "Recruitment & Onboarding", outcome: "New hires productive faster — structured 30/60/90 plan", tier: 1 },
      { name: "Workplace Safety (OHS)", outcome: "Incidents, near-misses, audits — ISO 45001 ready", tier: 2 },
      { name: "Attendance & Leave", outcome: "Absenteeism patterns visible — root cause, not just blame", tier: 2 },
      { name: "Workforce Analytics", outcome: "Turnover, productivity, skills gaps — visible to action", tier: 2 },
    ],
  },
  {
    id: "OMS",
    name: "Operations Management",
    abbr: "OMS",
    color: "#558B2F",
    standard: "TPS / Lean",
    status: "roadmap",
    pitch:
      "Every shift starts and ends with structured KPI review. Plant goals broken down to team level — owned by named people.",
    modules: [
      { name: "Daily Management System", outcome: "Every shift starts and ends with structured KPI review", tier: 1 },
      { name: "KPI Cascading", outcome: "Plant KPIs broken down to team level — owned by named people", tier: 1 },
      { name: "Production Planning", outcome: "Production schedule visible and updateable in real-time", tier: 1 },
      { name: "Shift Management", outcome: "Shift handover documented — no information loss", tier: 1 },
      { name: "OEE Tracking", outcome: "OEE live by line, by shift, by hour — actionable, not retrospective", tier: 2 },
      { name: "Performance Dashboards", outcome: "One screen per role — exec, manager, line", tier: 2 },
    ],
  },
  {
    id: "CIS",
    name: "Continuous Improvement",
    abbr: "CIS",
    color: "#00695C",
    standard: "Toyota Kata",
    status: "roadmap",
    pitch:
      "Every improvement idea logged, scored, owned. Every euro of impact documented. Knowledge survives turnover.",
    modules: [
      { name: "Kaizen Management", outcome: "Every improvement idea logged, scored, owned", tier: 1 },
      { name: "A3 Problem Solving", outcome: "Problems solved on one page — root cause to verification", tier: 1 },
      { name: "Improvement Projects", outcome: "Improvement portfolio managed end-to-end with ROI tracking", tier: 1 },
      { name: "Savings Tracker", outcome: "Every euro of improvement value documented and verified", tier: 2 },
      { name: "Best Practice Library", outcome: "Knowledge captured — surviving turnover and time", tier: 2 },
    ],
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
            const badge = statusBadge[sys.status];

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
                {/* Status badge */}
                <span
                  className={`absolute top-2.5 right-2.5 inline-flex items-center gap-1.5 ${badge.bg} ${badge.text} rounded-full px-2.5 py-0.5 text-[10px] font-bold tracking-wider`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${badge.dot} ${badge.pulse ? "animate-pulse" : ""}`} />
                  {badge.label}
                </span>

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
            <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-3 flex-wrap">
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
                  {(() => {
                    const badge = statusBadge[selected.status];
                    return (
                      <span
                        className={`inline-flex items-center gap-1.5 ${badge.bg} ${badge.text} rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wider`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${badge.dot} ${badge.pulse ? "animate-pulse" : ""}`} />
                        {badge.label}
                      </span>
                    );
                  })()}
                </div>
                <p className="text-white/80 text-base md:text-lg leading-relaxed max-w-2xl mb-3">
                  {selected.pitch}
                </p>
              </div>
              <div className="bg-white/[0.08] rounded-lg px-4 py-2 text-xs text-white/50 flex-shrink-0">
                Standard:{" "}
                <strong className="text-white">{selected.standard}</strong>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Tier 1 */}
              <div>
                <div className="flex items-baseline justify-between mb-3">
                  <p
                    className="text-[11px] font-bold tracking-widest uppercase"
                    style={{ color: selected.color }}
                  >
                    Tier 1 &mdash; Core
                  </p>
                  <span className="text-[10px] text-white/40 uppercase tracking-wider">Included in license</span>
                </div>
                <div className="space-y-2">
                  {selected.modules
                    .filter((m) => m.tier === 1)
                    .map((mod) => (
                      <div
                        key={mod.name}
                        className="bg-white/[0.06] border border-white/[0.08] rounded-lg px-3.5 py-3 flex items-start gap-2.5"
                      >
                        <svg
                          className="w-4 h-4 mt-0.5 flex-shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke={selected.color}
                          strokeWidth={2.5}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                        <div>
                          <p className="text-[13px] text-white/90 leading-snug">
                            {mod.outcome}
                          </p>
                          <p className="text-[10px] text-white/40 mt-0.5 uppercase tracking-wider">
                            {mod.name}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              {/* Tier 2 */}
              <div>
                <div className="flex items-baseline justify-between mb-3">
                  <p className="text-[11px] font-bold tracking-widest uppercase text-white/40">
                    Tier 2 &mdash; Advanced
                  </p>
                  <span className="text-[10px] text-white/30 uppercase tracking-wider">Roadmap / add-on</span>
                </div>
                <div className="space-y-2">
                  {selected.modules
                    .filter((m) => m.tier === 2)
                    .map((mod) => (
                      <div
                        key={mod.name}
                        className="bg-white/[0.03] border border-white/[0.05] rounded-lg px-3.5 py-3 flex items-start gap-2.5"
                      >
                        <span className="w-2 h-2 rounded-full flex-shrink-0 bg-white/25 mt-1.5" />
                        <div>
                          <p className="text-[13px] text-white/55 leading-snug">
                            {mod.outcome}
                          </p>
                          <p className="text-[10px] text-white/25 mt-0.5 uppercase tracking-wider">
                            {mod.name}
                          </p>
                        </div>
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
                {selected.status === "live"
                  ? `See ${selected.abbr} in action`
                  : selected.status === "roadmap"
                    ? `Join the ${selected.abbr} waitlist`
                    : `Get on the ${selected.abbr} early-access list`}
                {" "}
                &rarr;
              </Link>
            </div>
          </div>
        )}

        {/* Shared Kernel */}
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 md:p-6">
          <p className="text-[11px] font-bold tracking-widest uppercase text-white/30 mb-4">
            Shared Infrastructure &mdash; Available Across All Systems
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
