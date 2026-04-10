"use client";

import { useState } from "react";

// ─── Data ────────────────────────────────────────────────────────────────────────────

const equipmentNodes = [
  {
    id: "login",
    title: "Operator Login",
    meta: "Badge scan → team + shift",
    detail:
      "The operator scans their badge at the start of the shift. The system automatically loads the team, shift and associated equipment — no manual entry.",
  },
  {
    id: "job",
    title: "Job Loading",
    meta: "Barcode scan → circuit displayed",
    detail:
      "Scanning the job label (format DP0{Circuit}_{Operation}) automatically displays the full circuit drawing with terminals, wires and seals.",
  },
  {
    id: "scan",
    title: "Material Scanning",
    meta: "Terminal · Seal · Crimping tool",
    detail:
      "Every material is automatically verified by EPN. If the terminal, seal or crimping tool does not match the job specification, the operation is blocked.",
  },
  {
    id: "measure",
    title: "Measurement",
    meta: "Crimp Height · Pull Force · ADAM",
    detail:
      "Crimping parameters are recorded manually or automatically via the ADAM device. Values are validated against backend specifications in real time.",
  },
  {
    id: "production",
    title: "Production Counting",
    meta: "Foot pedal → OK / NOK",
    detail:
      "Each completed part is confirmed via the foot pedal. OK/NOK counters update in real time and are pushed to the server as a batch.",
  },
  {
    id: "downtime",
    title: "Downtime Logging",
    meta: "4M taxonomy · Reason codes",
    detail:
      "Stoppages are classified using 4M taxonomy (Machine, Method, Material, Man) with reason codes. Data feeds directly into OEE Availability calculation.",
  },
];

const serverNodes = [
  {
    id: "planningHistory",
    title: "Planning History",
    endpoint: "GET /planning-history/equipment/:name",
    endpointPost: "POST /planning-history/complete",
    db: "paom_planning_history",
    detail:
      "Stores planned and completed jobs per equipment. Primary source for OEE Availability calculation — anchors actual vs. planned production time.",
  },
  {
    id: "standardTime",
    title: "Standard Time",
    endpoint: "GET /standard-time/lookup",
    db: "paom_job_oee",
    detail:
      "Reference for OEE Performance. Compares the standard job time with the actual execution time per part to calculate the performance rate.",
  },
  {
    id: "productionEvents",
    title: "Production Events",
    endpoint: "POST /production-events/batch",
    db: "paom_job_scrap",
    detail:
      "Receives OK/NOK part batches from the equipment client. Calculates OEE Quality and feeds the Scrap dashboard with job-level detail.",
  },
  {
    id: "downtimeEvents",
    title: "Downtime Events",
    endpoint: "POST /downtime-events",
    endpointGet: "GET /downtime-categories",
    db: "paom_downtime_event",
    detail:
      "Records every stoppage with duration and 4M reason code. Data is aggregated into Availability and visualised in the Downtime Pareto dashboard.",
  },
  {
    id: "spc",
    title: "SPC Measurements",
    endpoint: "POST /spc/measurement",
    db: "paom_spc_measurement",
    detail:
      "Stores Crimp Height and Pull Force measurements. The server calculates Cp/Cpk and detects deviation patterns before they exceed control limits.",
  },
];

const dashboards = [
  {
    title: "OEE Dashboard",
    sub: "Yearly · Weekly · Daily · Per equipment",
    color: "text-green-400",
    border: "border-green-500/30",
    bg: "bg-green-500/5",
    dot: "bg-green-400",
  },
  {
    title: "Scrap Dashboard",
    sub: "KPIs + Pareto + job-level detail",
    color: "text-blue-400",
    border: "border-blue-500/30",
    bg: "bg-blue-500/5",
    dot: "bg-blue-400",
  },
  {
    title: "Plant Dashboard",
    sub: "Real-time equipment status",
    color: "text-orange-400",
    border: "border-orange-500/30",
    bg: "bg-orange-500/5",
    dot: "bg-orange-400",
  },
  {
    title: "SPC Charts",
    sub: "Control chart · Cp · Cpk",
    color: "text-purple-400",
    border: "border-purple-500/30",
    bg: "bg-purple-500/5",
    dot: "bg-purple-400",
  },
  {
    title: "Production History",
    sub: "Job-level detail · Export",
    color: "text-cyan-400",
    border: "border-cyan-500/30",
    bg: "bg-cyan-500/5",
    dot: "bg-cyan-400",
  },
  {
    title: "Downtime Pareto",
    sub: "Top stoppage reasons · 4M trend",
    color: "text-yellow-400",
    border: "border-yellow-500/30",
    bg: "bg-yellow-500/5",
    dot: "bg-yellow-400",
  },
];

// ─── Sub-components ────────────────────────────────────────────────────────────────────────

function EquipmentNode({
  node,
  active,
  onClick,
}: {
  node: (typeof equipmentNodes)[0];
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-3 rounded-lg border transition-all duration-200 ${
        active
          ? "border-orange-400/60 bg-orange-400/10"
          : "border-white/10 bg-white/[0.02] hover:border-orange-400/30 hover:bg-orange-400/5"
      }`}
    >
      <div className="flex items-center gap-2 mb-0.5">
        <span
          className={`w-2 h-2 rounded-full flex-shrink-0 ${
            active
              ? "bg-orange-400 shadow-[0_0_8px_theme(colors.orange.400)]"
              : "bg-orange-400/40"
          }`}
        />
        <span className="text-sm font-semibold text-white">{node.title}</span>
      </div>
      <p className="text-xs text-white/40 pl-4">{node.meta}</p>
      {active && (
        <p className="text-xs text-white/60 pl-4 mt-2 leading-relaxed border-t border-white/10 pt-2">
          {node.detail}
        </p>
      )}
    </button>
  );
}

function ServerNode({
  node,
  active,
  onClick,
}: {
  node: (typeof serverNodes)[0];
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-3 rounded-lg border transition-all duration-200 ${
        active
          ? "border-blue-400/60 bg-blue-400/10"
          : "border-white/10 bg-white/[0.02] hover:border-blue-400/30 hover:bg-blue-400/5"
      }`}
    >
      <div className="flex items-center gap-2 mb-0.5">
        <span
          className={`w-2 h-2 rounded-full flex-shrink-0 ${
            active
              ? "bg-blue-400 shadow-[0_0_8px_theme(colors.blue.400)]"
              : "bg-blue-400/40"
          }`}
        />
        <span className="text-sm font-semibold text-white">{node.title}</span>
      </div>
      <code className="block text-[10px] text-blue-300/60 pl-4 font-mono">
        {node.endpoint}
      </code>
      {node.endpointPost && (
        <code className="block text-[10px] text-orange-300/50 pl-4 font-mono">
          {node.endpointPost}
        </code>
      )}
      {node.endpointGet && (
        <code className="block text-[10px] text-blue-300/60 pl-4 font-mono">
          {node.endpointGet}
        </code>
      )}
      {active && (
        <div className="mt-2 pt-2 border-t border-white/10 pl-4 space-y-1">
          <p className="text-xs text-white/60 leading-relaxed">{node.detail}</p>
          {node.db && (
            <span className="inline-block text-[10px] font-mono text-green-400/70 bg-green-400/5 border border-green-400/20 rounded px-2 py-0.5">
              {node.db}
            </span>
          )}
        </div>
      )}
    </button>
  );
}

function FlowArrow({ label, sub }: { label: string; sub: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-1 px-2 select-none">
      <span className="text-[10px] font-bold uppercase tracking-widest text-white/30">
        {label}
      </span>
      <div className="flex items-center gap-1">
        <div className="w-8 h-px bg-gradient-to-r from-white/10 to-white/30" />
        <svg
          width="8"
          height="10"
          viewBox="0 0 8 10"
          className="text-white/30 flex-shrink-0"
        >
          <path d="M0 0 L8 5 L0 10 Z" fill="currentColor" />
        </svg>
      </div>
      <span className="text-[9px] text-white/20 text-center leading-tight max-w-[72px]">
        {sub}
      </span>
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────────────────

export default function OmsHowItWorks() {
  const [activeEquip, setActiveEquip] = useState<string | null>(null);
  const [activeServer, setActiveServer] = useState<string | null>(null);

  return (
    <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-white tracking-wide">
            HOW IT WORKS
          </h3>
          <p className="text-xs text-white/40 mt-0.5">
            Click any node for details · Real data from the shop floor
          </p>
        </div>
        <div className="flex items-center gap-3 text-[10px] text-white/30">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-px bg-orange-400/60 inline-block" />
            WRITE
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-px bg-blue-400/60 inline-block" />
            READ
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-px bg-purple-400/60 inline-block" />
            UI
          </span>
        </div>
      </div>

      {/* Main flow: 3 columns */}
      <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] gap-0 p-4">

        {/* ── Column 1: OMS on Equipment ── */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-1.5 h-6 rounded-full bg-orange-400" />
            <div>
              <p className="text-xs font-bold text-orange-400 uppercase tracking-widest">
                OMS on Equipment
              </p>
              <p className="text-[10px] text-white/30">
                WinForms .NET · one instance per machine
              </p>
            </div>
          </div>
          {equipmentNodes.map((node) => (
            <EquipmentNode
              key={node.id}
              node={node}
              active={activeEquip === node.id}
              onClick={() =>
                setActiveEquip(activeEquip === node.id ? null : node.id)
              }
            />
          ))}
        </div>

        {/* Arrow 1 */}
        <FlowArrow label="HTTPS · JSON" sub=":3000 / api @Public() routes" />

        {/* ── Column 2: OMS Server ── */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-1.5 h-6 rounded-full bg-blue-400" />
            <div>
              <p className="text-xs font-bold text-blue-400 uppercase tracking-widest">
                OMS Server
              </p>
              <p className="text-[10px] text-white/30">
                NestJS 10 · PostgreSQL · Angular 19
              </p>
            </div>
          </div>
          {serverNodes.map((node) => (
            <ServerNode
              key={node.id}
              node={node}
              active={activeServer === node.id}
              onClick={() =>
                setActiveServer(activeServer === node.id ? null : node.id)
              }
            />
          ))}

          {/* DB tables */}
          <div className="mt-3 p-3 rounded-lg border border-dashed border-white/10">
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-2">
              PostgreSQL
            </p>
            <div className="grid grid-cols-2 gap-1.5">
              {[
                "paom_planning_history",
                "paom_job_oee",
                "paom_job_scrap",
                "paom_downtime_event",
              ].map((t) => (
                <span
                  key={t}
                  className="text-[9px] font-mono text-green-400/60 bg-green-400/5 border border-green-400/10 rounded px-1.5 py-0.5 truncate"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Arrow 2 */}
        <FlowArrow label="Angular UI" sub=":4200 Authenticated" />

        {/* ── Column 3: Manager Dashboards ── */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-1.5 h-6 rounded-full bg-purple-400" />
            <div>
              <p className="text-xs font-bold text-purple-400 uppercase tracking-widest">
                Manager Dashboards
              </p>
              <p className="text-[10px] text-white/30">
                Live · Aggregated · Per shift
              </p>
            </div>
          </div>
          {dashboards.map((d) => (
            <div
              key={d.title}
              className={`p-3 rounded-lg border ${d.border} ${d.bg}`}
            >
              <div className="flex items-center gap-2 mb-0.5">
                <span className={`w-2 h-2 rounded-full flex-shrink-0 ${d.dot}`} />
                <span className={`text-sm font-semibold ${d.color}`}>
                  {d.title}
                </span>
              </div>
              <p className="text-xs text-white/40 pl-4">{d.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer stats */}
      <div className="grid grid-cols-4 divide-x divide-white/10 border-t border-white/10">
        {[
          { num: "5", label: "Live data flows" },
          { num: "6", label: "Manager dashboards" },
          { num: "4M", label: "Downtime taxonomy" },
          { num: "1", label: "Source of truth (DB)" },
        ].map((s) => (
          <div key={s.label} className="py-3 text-center">
            <div className="text-lg font-bold text-blue-400">{s.num}</div>
            <div className="text-[10px] uppercase tracking-wider text-white/30">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
      }
