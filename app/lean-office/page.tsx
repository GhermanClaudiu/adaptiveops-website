"use client";

import { useState } from "react";
import Link from "next/link";
import FadeUp from "@/components/shared/FadeUp";

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
  const [activeModule, setActiveModule] = useState<string | null>(null);

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
            <p className="mt-5 text-lg text-white/60 max-w-2xl leading-relaxed">
              Operations do not stop at the production line. Planning, logistics, HR, finance and
              customer service all have processes — and all of them generate waste, rework and
              unpredictable results when left unstructured.
            </p>
          </FadeUp>
          <FadeUp delay={200}>
            <p className="mt-4 text-sm text-white/40 tracking-wide">
              A 6-module methodology &nbsp;·&nbsp; Applied to any operational area &nbsp;·&nbsp; The same framework that works on the shop floor
            </p>
          </FadeUp>
          <FadeUp delay={300}>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#why" className="inline-flex items-center gap-2 text-white/70 hover:text-white border border-white/20 hover:border-white/40 px-5 py-2.5 rounded-full text-sm font-medium transition-colors">
                The problem &darr;
              </a>
              <a href="#methodology" className="inline-flex items-center gap-2 text-white/70 hover:text-white border border-white/20 hover:border-white/40 px-5 py-2.5 rounded-full text-sm font-medium transition-colors">
                The methodology &darr;
              </a>
              <a href="#where" className="inline-flex items-center gap-2 text-white/70 hover:text-white border border-white/20 hover:border-white/40 px-5 py-2.5 rounded-full text-sm font-medium transition-colors">
                Where we apply it &darr;
              </a>
            </div>
          </FadeUp>
        </div>
      </section>

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
                Six modules. One direction: operational control.
              </h2>
              <p className="text-mid text-lg max-w-2xl mx-auto">
                The same structured approach used in production — adapted and validated
                for indirect operations. Click any module for details.
              </p>
            </div>
          </FadeUp>

          <div className="space-y-3 max-w-4xl mx-auto">
            {modules.map((mod, i) => {
              const isOpen = activeModule === mod.number;
              return (
                <FadeUp key={mod.number} delay={i * 60}>
                  <div
                    className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                      isOpen
                        ? "border-accent/30 shadow-sm"
                        : "border-gray-200 bg-white hover:border-gray-300"
                    }`}
                    style={isOpen ? { borderColor: `${mod.color}40`, backgroundColor: `${mod.color}06` } : {}}
                  >
                    <button
                      className="w-full flex items-center gap-4 px-6 py-5 text-left"
                      onClick={() => setActiveModule(isOpen ? null : mod.number)}
                    >
                      {/* Number */}
                      <span
                        className="text-2xl font-black flex-shrink-0 w-10 text-center"
                        style={{ color: mod.color }}
                      >
                        {mod.number}
                      </span>
                      {/* Title + objective */}
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-primary text-base">{mod.title}</p>
                        <p className="text-mid text-sm mt-0.5">{mod.objective}</p>
                      </div>
                      {/* Methods preview */}
                      <div className="hidden md:flex flex-wrap gap-1.5 max-w-xs justify-end">
                        {mod.methods.slice(0, 2).map((m) => (
                          <span
                            key={m}
                            className="text-[10px] font-semibold px-2 py-0.5 rounded-full border"
                            style={{ color: mod.color, borderColor: `${mod.color}40`, backgroundColor: `${mod.color}10` }}
                          >
                            {m}
                          </span>
                        ))}
                        {mod.methods.length > 2 && (
                          <span className="text-[10px] text-white/40 px-2 py-0.5">
                            +{mod.methods.length - 2}
                          </span>
                        )}
                      </div>
                      {/* Arrow */}
                      <svg
                        className={`w-5 h-5 flex-shrink-0 transition-transform duration-200 text-mid ${isOpen ? "rotate-180" : ""}`}
                        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {isOpen && (
                      <div className="px-6 pb-6 grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-white/50"
                        style={{ borderColor: `${mod.color}20` }}>
                        {/* Detail */}
                        <div className="md:col-span-2 pt-5">
                          <p className="text-dark text-sm leading-relaxed mb-4">{mod.detail}</p>
                          <div>
                            <p className="text-xs font-bold uppercase tracking-widest text-mid mb-2">Expected outcomes</p>
                            <ul className="space-y-1.5">
                              {mod.outcomes.map((o) => (
                                <li key={o} className="flex items-start gap-2 text-sm text-dark">
                                  <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: mod.color }} />
                                  {o}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        {/* Methods */}
                        <div className="pt-5">
                          <p className="text-xs font-bold uppercase tracking-widest text-mid mb-3">Methods &amp; tools</p>
                          <div className="flex flex-wrap gap-2">
                            {mod.methods.map((m) => (
                              <span
                                key={m}
                                className="text-xs font-semibold px-3 py-1 rounded-full border"
                                style={{ color: mod.color, borderColor: `${mod.color}40`, backgroundColor: `${mod.color}10` }}
                              >
                                {m}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </FadeUp>
              );
            })}
          </div>
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
                  href="/solutions"
                  className="inline-flex items-center gap-2 border border-accent text-accent font-semibold px-6 py-3 rounded-full hover:bg-accent hover:text-white transition-colors text-sm"
                >
                  Explore ECO Platform &rarr;
                </Link>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-accent py-16">
        <FadeUp>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Ready to bring structure to your indirect operations?
            </h2>
            <p className="mt-4 text-lg text-white/80 max-w-xl mx-auto">
              Book the free 30-minute diagnostic. We will map your situation and tell you
              honestly which module to start with — and what results to expect.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-block bg-white text-accent font-semibold px-10 py-4 rounded-full hover:bg-gray-100 transition-colors"
              >
                Book Free 30-Min Call
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-1.5 text-white/60 hover:text-white font-medium transition-colors"
              >
                Explore all services &rarr;
              </Link>
            </div>
          </div>
        </FadeUp>
      </section>
    </main>
  );
}
