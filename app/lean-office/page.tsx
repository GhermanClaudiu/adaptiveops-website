"use client";

import { useState } from "react";
import Link from "next/link";
import FadeUp from "@/components/shared/FadeUp";
import LogoWall from "@/components/home/LogoWall";

// ── Data ────────────────────────────────────────────────────────────────────

const problems = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776" />
      </svg>
    ),
    title: "Processes live in email chains and spreadsheets",
    description:
      "No standard process, no version control, no single source of truth. The planning document is in someone's inbox and the latest version is on a USB stick.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
      </svg>
    ),
    title: "Results depend on who is working today",
    description:
      "No standard work means no predictable output. When the best person is on holiday, performance drops. When they leave, knowledge walks out with them.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
      </svg>
    ),
    title: "Workload imbalances nobody sees",
    description:
      "Some people are overwhelmed, others underutilised — but there is no data to prove it. Capacity planning happens by gut feeling, not by measurement.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
      </svg>
    ),
    title: "No visibility, no improvement",
    description:
      "Without measured performance, every team meeting is an opinion contest. Problems get discussed, rarely resolved. The same issues appear in every monthly review.",
  },
];

const modules = [
  {
    number: "01",
    title: "Focus the Operation",
    objective: "Understand what your customer wants and where performance stands",
    color: "#E65100",
    methods: ["SIPOC", "High Level Process Map (HLPM)", "3×3 Metrics (Speed · Quality · Cost)", "Control Charts"],
    outcomes: [
      "Clear picture of who the customer is and what they value",
      "Performance measured against customer requirements",
      "Key inputs identified — the ones with the largest impact on outputs",
    ],
    without: [
      "Improvement efforts target the wrong activities — nobody agreed on what matters",
      "No baseline exists, so nobody knows if things are getting better or worse",
      "Each manager has a different definition of 'good performance'",
    ],
    detail:
      "Before optimising anything, you need to know what you are optimising for. This module maps the process at a high level, defines the customer and their requirements, and establishes the baseline metrics that will measure all future improvement.",
  },
  {
    number: "02",
    title: "Standardize the Operation",
    objective: "Define how work is done and make it consistent",
    color: "#1565C0",
    methods: ["Detailed Process Map (DPM)", "Standard Work Instructions", "Process Control Plan", "MOS & RACI"],
    outcomes: [
      "Every activity documented — who does what and how",
      "Work performed consistently to deliver predictable outcomes",
      "Integrated Management Operating System (MOS) in place",
    ],
    without: [
      "Performance depends entirely on who is in today — the best person carries the team",
      "Onboarding new people takes months; knowledge is tribal, not documented",
      "When someone leaves, their expertise walks out with them",
    ],
    detail:
      "Standardisation is not bureaucracy — it is the foundation of improvement. You cannot improve a process that is not defined. This module creates the standard work that makes performance predictable and independent of any single person.",
  },
  {
    number: "03",
    title: "Plan Operations Work",
    objective: "Match available resources to actual demand",
    color: "#6A1B9A",
    methods: ["Resource Planning Tool", "Polyvalence Matrix"],
    outcomes: [
      "Workload quantified and visible across the team",
      "Resources matched to demand — no guesswork on capacity",
      "Peaks and troughs managed proactively, not reactively",
    ],
    without: [
      "Overtime spikes every peak period because nobody saw it coming",
      "Capacity decisions are made by gut feeling, not measurement",
      "Managers react to overload after it happens — instead of planning ahead",
    ],
    detail:
      "Most indirect teams do not know how much work they actually have. This module quantifies the workload, maps available capacity, and creates the tools to balance the two — so managers plan instead of react.",
  },
  {
    number: "04",
    title: "Organize the Operation",
    objective: "Reduce inefficiencies through layout and visual organisation",
    color: "#2E7D32",
    methods: ["Office Layout", "5S for Office", "Team organisation around the process"],
    outcomes: [
      "Teams structured around the process flow, not the org chart",
      "Workspaces organised so everything needed is accessible",
      "Waste from searching, waiting and unnecessary movement eliminated",
    ],
    without: [
      "People spend hours searching for documents, tools, or the right person to ask",
      "Ownership is unclear — tasks fall between teams because the structure follows the org chart, not the flow",
      "The same questions get asked repeatedly because nothing is where it should be",
    ],
    detail:
      "5S is not just for the shop floor. An office or admin environment has the same inefficiencies — time spent searching for information, unclear ownership, poor visual organisation. This module applies the same discipline to indirect workspaces.",
  },
  {
    number: "05",
    title: "Make the Operation Visual",
    objective: "Display performance so the whole team can see and react",
    color: "#00695C",
    methods: ["Visual Controls", "Visual Management Plan", "Performance boards integrated with MOS"],
    outcomes: [
      "Performance data visible and up to date — not buried in reports",
      "Visual controls in place to catch problems before they escalate",
      "Trends identified early and acted on, not discovered in retrospect",
    ],
    without: [
      "Problems are discovered in the monthly review — already a month old by the time they are discussed",
      "Managers present slides instead of managing live operations",
      "Teams only know something went wrong after the customer complains",
    ],
    detail:
      "If performance is only visible in a monthly PowerPoint, problems are already a month old when they are discussed. This module makes the operational heartbeat visible daily — so teams manage the present, not the past.",
  },
  {
    number: "06",
    title: "Improve the Operation",
    objective: "Build a continuous improvement culture with the right tools",
    color: "#558B2F",
    methods: ["Makigami", "Improvement & Coaching KATA", "Cycle Checks", "Lean principles and toolkit"],
    outcomes: [
      "Teams drive improvement — not just comply with standards",
      "Root cause identified and addressed, not just symptoms",
      "First Pass Yield used as a key measure to expose rework",
    ],
    without: [
      "The same problems appear in every monthly meeting — discussed, never resolved",
      "Root causes are never addressed because nobody has a structured way to investigate them",
      "Improvement depends on consultants or the one person who 'knows how to fix things'",
    ],
    detail:
      "Makigami is the process mapping tool designed specifically for indirect flows — it makes waste visible in administrative processes the way Value Stream Mapping does for production. Combined with KATA coaching, it builds teams that solve their own problems.",
  },
];

const areas = [
  { label: "Planning & Scheduling", pain: "Capacity managed by gut feeling. No standard for how demand translates into workload." },
  { label: "Logistics & Supply Chain", pain: "Supplier communication runs on email threads. No visual standard for escalation or response time." },
  { label: "HR & People Operations", pain: "Skill matrix exists in someone's spreadsheet. Training follow-through is tracked by nobody." },
  { label: "Customer Service", pain: "Response time varies by who picks up the ticket. No standard work, no first-pass-yield measure." },
  { label: "Finance & Controlling", pain: "Month-end close depends on tribal knowledge. Same corrections made every cycle." },
  { label: "Procurement", pain: "No visibility on supplier performance over time. Decisions made on last impression, not data." },
];

// ── Page ─────────────────────────────────────────────────────────────────────

export default function LeanOfficePage() {
  const [activeModule, setActiveModule] = useState<string>("01");

  const selected = modules.find((m) => m.number === activeModule)!;

  return (
    <main>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-primary py-20 lg:py-28">
        <div className="absolute inset-0 opacity-[0.05]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="gridLO" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#gridLO)" />
          </svg>
        </div>
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <span className="inline-block text-xs font-bold tracking-widest uppercase text-accent mb-4">
              ECO — Execution &amp; Control of Operations
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight max-w-3xl">
              Lean in the Office.
              <br />
              <span className="text-accent">The Same Rigour, Beyond the Factory Floor.</span>
            </h1>
          </FadeUp>
          <FadeUp delay={100}>
            <p className="mt-5 text-lg text-white/65 max-w-2xl leading-relaxed">
              The same framework that delivered 30% scrap reduction and 51% efficiency lift on the shop floor &mdash; now applied to planning, logistics, HR, finance and customer service. Indirect inefficiency doesn&apos;t stay in the back office; it shows up in your Speed, Quality and Delivery numbers.
            </p>
          </FadeUp>
          <FadeUp delay={200}>
            <div className="mt-6 flex flex-wrap gap-3">
              {[
                { label: "Speed", desc: "Delays start upstream", color: "#E65100" },
                { label: "Quality", desc: "Defects have indirect roots", color: "#1565C0" },
                { label: "Delivery", desc: "Missed dates begin in planning", color: "#2E7D32" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10"
                  style={{ backgroundColor: `${item.color}25` }}
                >
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                  <span className="text-xs font-bold text-white/80">{item.label}</span>
                  <span className="text-xs text-white/40">{item.desc}</span>
                </div>
              ))}
            </div>
          </FadeUp>
          <FadeUp delay={280}>
            <p className="mt-4 text-sm text-white/40 tracking-wide">
              A 6-module methodology &nbsp;&middot;&nbsp; Applied to any operational area &nbsp;&middot;&nbsp; Built across 8 Tier-1 plants
            </p>
          </FadeUp>
          <FadeUp delay={300}>
            <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <Link
                href="/contact"
                className="inline-block bg-accent text-white font-semibold px-8 py-4 rounded-full text-base whitespace-nowrap transition-shadow hover:shadow-[0_0_24px_rgba(47,128,237,0.5)] active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
              >
                Book Your Free 30-Min Diagnostic Call
              </Link>
              <Link
                href="/before-you-call"
                className="inline-flex items-center gap-1.5 text-white/50 hover:text-white font-medium transition-colors text-sm"
              >
                Read before you call &rarr;
              </Link>
            </div>
          </FadeUp>
          <FadeUp delay={400}>
            <ul className="mt-6 space-y-2 text-sm text-white/70">
              <li className="flex items-start gap-2.5">
                <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <span>30 minutes, free, no commitment</span>
              </li>
              <li className="flex items-start gap-2.5">
                <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <span>Talk to the founder (20 yrs Tier-1), not a sales rep</span>
              </li>
              <li className="flex items-start gap-2.5">
                <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <span>Concrete diagnosis you keep &mdash; even if you don&apos;t hire us</span>
              </li>
            </ul>
          </FadeUp>
          <FadeUp delay={500}>
            <div className="mt-8 flex gap-3">
              <a href="#why" className="inline-flex items-center gap-2 text-white/40 hover:text-white/70 text-xs font-medium transition-colors">
                The problem &darr;
              </a>
              <span className="text-white/20">|</span>
              <a href="#methodology" className="inline-flex items-center gap-2 text-white/40 hover:text-white/70 text-xs font-medium transition-colors">
                The methodology &darr;
              </a>
              <span className="text-white/20">|</span>
              <a href="#where" className="inline-flex items-center gap-2 text-white/40 hover:text-white/70 text-xs font-medium transition-colors">
                Where we apply it &darr;
              </a>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Trust strip — reused from home for consistency */}
      <LogoWall />

      {/* ── The Problem ── */}
      <section id="why" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <div className="text-center mb-14">
              <span className="inline-block text-xs font-bold tracking-widest uppercase text-accent mb-4">
                The problem we solve
              </span>
              <h2 className="text-2xl md:text-4xl font-bold text-primary mb-4">
                What unstructured indirect operations look like
              </h2>
              <p className="text-mid text-lg max-w-2xl mx-auto">
                Most organisations have invested in operational excellence on the shop floor.
                The indirect areas — Planning, HR, Finance, Logistics — are still running on
                habits and spreadsheets.
              </p>
            </div>
          </FadeUp>

          {/* SQD impact strip */}
          <FadeUp delay={80}>
            <div className="mb-10 rounded-2xl border border-accent/20 bg-accent/[0.04] px-6 py-5 flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
              <p className="text-sm font-semibold text-primary md:max-w-xs leading-snug flex-shrink-0">
                Unstructured indirect processes don&apos;t stay in the back office — they add cost to your operations through:
              </p>
              <div className="flex flex-wrap gap-4 flex-1">
                {[
                  { label: "Speed", detail: "Late inputs from planning and logistics delay production start and response time.", color: "#E65100" },
                  { label: "Quality", detail: "Undocumented procedures in HR and supply chain create variation that ends up as defects.", color: "#1565C0" },
                  { label: "Delivery", detail: "Capacity planned by gut feeling means missed dates begin long before the shop floor.", color: "#2E7D32" },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-2.5 min-w-[160px] flex-1">
                    <span
                      className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-white text-[10px] font-black"
                      style={{ backgroundColor: item.color }}
                    >
                      {item.label[0]}
                    </span>
                    <div>
                      <p className="text-xs font-bold text-primary" style={{ color: item.color }}>{item.label}</p>
                      <p className="text-xs text-mid leading-snug">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {problems.map((p, i) => (
              <FadeUp key={i} delay={i * 80}>
                <div className="bg-light rounded-2xl p-6 border border-gray-100 h-full">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-4">
                    {p.icon}
                  </div>
                  <h3 className="text-primary font-bold text-base mb-2">{p.title}</h3>
                  <p className="text-mid text-sm leading-relaxed">{p.description}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6-Module Methodology ── */}
      <section id="methodology" className="py-20 bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <div className="text-center mb-14">
              <span className="inline-block text-xs font-bold tracking-widest uppercase text-accent mb-4">
                Process Excellence Framework
              </span>
              <h2 className="text-2xl md:text-4xl font-bold text-primary mb-4">
                Six modules. Six concrete shifts in how your team operates.
              </h2>
              <p className="text-mid text-lg max-w-2xl mx-auto">
                The same structured approach used in production &mdash; adapted and validated for indirect operations. Click any module to see what changes &mdash; and what happens if you skip it.
              </p>
            </div>
          </FadeUp>

          {/* Module selector grid */}
          <FadeUp delay={80}>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
              {modules.map((mod) => {
                const isActive = activeModule === mod.number;
                return (
                  <button
                    key={mod.number}
                    onClick={() => setActiveModule(mod.number)}
                    className={`relative text-left rounded-2xl p-5 border-2 transition-all duration-200 group ${
                      isActive
                        ? "shadow-md"
                        : "bg-white border-gray-200 hover:border-gray-300 hover:shadow-sm"
                    }`}
                    style={
                      isActive
                        ? {
                            backgroundColor: `${mod.color}10`,
                            borderColor: mod.color,
                          }
                        : {}
                    }
                  >
                    {/* Number */}
                    <span
                      className="block text-3xl font-black leading-none mb-2 transition-colors"
                      style={{ color: isActive ? mod.color : "#cbd5e1" }}
                    >
                      {mod.number}
                    </span>
                    {/* Title */}
                    <p
                      className="font-bold text-sm leading-snug mb-1"
                      style={{ color: isActive ? mod.color : undefined }}
                    >
                      {isActive ? mod.title : <span className="text-primary">{mod.title}</span>}
                    </p>
                    {/* Objective — hidden on mobile */}
                    <p className="hidden sm:block text-xs text-mid leading-snug">
                      {mod.objective}
                    </p>
                    {/* Active dot */}
                    {isActive && (
                      <span
                        className="absolute top-4 right-4 w-2 h-2 rounded-full"
                        style={{ backgroundColor: mod.color }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </FadeUp>

          {/* Detail panel */}
          <FadeUp delay={120}>
            <div
              key={selected.number}
              className="rounded-2xl border-2 overflow-hidden transition-all duration-300"
              style={{ borderColor: `${selected.color}30`, backgroundColor: `${selected.color}06` }}
            >
              {/* Panel header */}
              <div
                className="px-6 py-4 flex items-center gap-4 border-b"
                style={{ borderColor: `${selected.color}20`, backgroundColor: `${selected.color}12` }}
              >
                <span
                  className="text-4xl font-black leading-none flex-shrink-0"
                  style={{ color: selected.color }}
                >
                  {selected.number}
                </span>
                <div>
                  <p className="font-bold text-primary text-lg leading-tight">{selected.title}</p>
                  <p className="text-mid text-sm mt-0.5">{selected.objective}</p>
                </div>
              </div>

              {/* Panel body — 3 columns */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x"
                style={{ borderColor: `${selected.color}15` }}>

                {/* Col 1: What & How */}
                <div className="p-6">
                  <p className="text-xs font-bold uppercase tracking-widest mb-3"
                    style={{ color: selected.color }}>
                    What we do
                  </p>
                  <p className="text-dark text-sm leading-relaxed mb-5">{selected.detail}</p>
                  <p className="text-xs font-bold uppercase tracking-widest text-mid mb-2">
                    Methods &amp; tools
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selected.methods.map((m) => (
                      <span
                        key={m}
                        className="text-xs font-semibold px-3 py-1 rounded-full border"
                        style={{
                          color: selected.color,
                          borderColor: `${selected.color}40`,
                          backgroundColor: `${selected.color}10`,
                        }}
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Col 2: Outcomes */}
                <div className="p-6">
                  <p className="text-xs font-bold uppercase tracking-widest mb-3"
                    style={{ color: selected.color }}>
                    What changes
                  </p>
                  <ul className="space-y-3">
                    {selected.outcomes.map((o) => (
                      <li key={o} className="flex items-start gap-2.5 text-sm text-dark">
                        <span
                          className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                          style={{ backgroundColor: `${selected.color}20` }}
                        >
                          <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none">
                            <path d="M2 6l3 3 5-5" stroke={selected.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                        {o}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Col 3: Without this module */}
                <div className="p-6 bg-white/40">
                  <p className="text-xs font-bold uppercase tracking-widest text-red-400 mb-3">
                    Without this module
                  </p>
                  <ul className="space-y-3">
                    {selected.without.map((w) => (
                      <li key={w} className="flex items-start gap-2.5 text-sm text-dark/70">
                        <span className="w-5 h-5 rounded-full bg-red-50 border border-red-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg className="w-3 h-3 text-red-400" viewBox="0 0 12 12" fill="none">
                            <path d="M3 3l6 6M9 3l-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                          </svg>
                        </span>
                        {w}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Navigation row */}
              <div
                className="px-6 py-3 flex items-center justify-between border-t"
                style={{ borderColor: `${selected.color}15` }}
              >
                <button
                  onClick={() => {
                    const idx = modules.findIndex((m) => m.number === selected.number);
                    if (idx > 0) setActiveModule(modules[idx - 1].number);
                  }}
                  disabled={selected.number === "01"}
                  className="text-xs font-semibold text-mid hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1 transition-colors"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                  Previous module
                </button>
                <div className="flex gap-1.5">
                  {modules.map((m) => (
                    <button
                      key={m.number}
                      onClick={() => setActiveModule(m.number)}
                      className="w-1.5 h-1.5 rounded-full transition-all"
                      style={{
                        backgroundColor:
                          m.number === selected.number ? selected.color : "#d1d5db",
                        transform: m.number === selected.number ? "scale(1.4)" : "scale(1)",
                      }}
                    />
                  ))}
                </div>
                <button
                  onClick={() => {
                    const idx = modules.findIndex((m) => m.number === selected.number);
                    if (idx < modules.length - 1) setActiveModule(modules[idx + 1].number);
                  }}
                  disabled={selected.number === "06"}
                  className="text-xs font-semibold text-mid hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1 transition-colors"
                >
                  Next module
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── Where We Apply It ── */}
      <section id="where" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <div className="text-center mb-14">
              <span className="inline-block text-xs font-bold tracking-widest uppercase text-accent mb-4">
                Where we apply it
              </span>
              <h2 className="text-2xl md:text-4xl font-bold text-primary mb-4">
                Every operation. Not just the production line.
              </h2>
              <p className="text-mid text-lg max-w-2xl mx-auto">
                The Process Excellence framework applies wherever work is done in repeatable flows.
                These are the indirect areas where we most commonly see unstructured operations.
              </p>
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {areas.map((area, i) => (
              <FadeUp key={i} delay={i * 70}>
                <div className="bg-light rounded-2xl p-6 border border-gray-100 h-full flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-accent flex-shrink-0" />
                    <h3 className="font-bold text-primary text-base">{area.label}</h3>
                  </div>
                  <p className="text-mid text-sm leading-relaxed italic">&ldquo;{area.pain}&rdquo;</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Connection to ECO ── */}
      <section className="py-16 bg-primary/[0.03] border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-12">
              <div className="flex-1">
                <p className="text-xs font-bold tracking-widest uppercase text-accent mb-2">
                  Connected to ECO Platform
                </p>
                <h3 className="text-xl md:text-2xl font-bold text-primary mb-2">
                  Some modules have a digital layer already built.
                </h3>
                <p className="text-mid text-sm leading-relaxed max-w-xl">
                  Skill matrices and polyvalence are covered by the PMS module. 5S audits
                  are managed in QMS. As ECO grows, more indirect process tools will have
                  a digital counterpart — eliminating the spreadsheet layer entirely.
                </p>
              </div>
              <div className="flex-shrink-0">
                <Link
                  href="/solutions#systems"
                  className="inline-flex items-center gap-2 border border-accent text-accent font-semibold px-6 py-3 rounded-full hover:bg-accent hover:text-white transition-colors text-sm"
                >
                  Explore the 6 ECO modules &rarr;
                </Link>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-accent py-16">
        <FadeUp>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">
              Ready to bring shop-floor rigour to your indirect operations?
            </h2>
            <p className="mt-4 text-lg text-white/85 max-w-xl mx-auto">
              One 30-minute call. We map your situation honestly and tell you which module to start with &mdash; and what results to expect.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-block bg-white text-accent font-semibold px-10 py-4 rounded-full hover:bg-gray-100 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-shadow"
              >
                Book Your Free 30-Min Diagnostic Call
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-1.5 text-white/70 hover:text-white font-medium transition-colors"
              >
                Explore all services &rarr;
              </Link>
            </div>
            <ul className="mt-8 flex flex-col sm:flex-row sm:justify-center gap-3 sm:gap-8 text-sm text-white/85">
              <li className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <span>30 minutes, free, no commitment</span>
              </li>
              <li className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <span>Talk to the founder, not a sales rep</span>
              </li>
              <li className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <span>Concrete diagnosis you keep</span>
              </li>
            </ul>
          </div>
        </FadeUp>
      </section>
    </main>
  );
}
