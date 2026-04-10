"use client";

import { useState } from "react";
import Link from "next/link";
import FadeUp from "@/components/shared/FadeUp";

const sections = [
  {
    id: "training",
    label: "Training & Coaching",
    description: "8 training programs, 5 coaching programs — here is everything you should know before booking.",
    faqs: [
      {
        q: "Why does training alone rarely produce lasting results?",
        a: "Because knowledge without application is just information. In most factories, participants attend training to tick a box — not because they chose to change. When the course ends, there is no list of new habits to practise, no one follows up after two weeks, and the process owner never observes or standardises the new behaviour. The individual might want to change, but the system around them has not.\n\nConsider a communication course teaching Covey's Third Alternative — the idea that your idea and my idea can combine into a third, better solution. It sounds powerful in the training room. Monday morning, during a production conflict, the participant reverts to old habits because no one around them knows what the Third Alternative is and no process supports it. The habit dies in 48 hours.\n\nThis is why AdaptiveOps combines training with structured coaching and follow-up: knowledge needs a system to survive.",
      },
      {
        q: "What is the difference between training and coaching — which one do I actually need?",
        a: "Training gives your team the knowledge — what to do and why. Coaching gives them the application — how to do it when things get hard, with someone alongside when they get stuck.\n\nYou can read every book about swimming and still need someone in the pool with you the first time.\n\nTraining is enough when the goal is awareness or a specific skill your team can immediately apply without structural change. Coaching is needed when you are implementing a new system, changing a management routine, or building a habit that requires accountability over weeks or months.\n\nMost meaningful operational improvements need both: training to align the team on what good looks like, coaching to make it stick.",
      },
      {
        q: "Where should we start — there are 8 training and 5 coaching programs?",
        a: "Start with your biggest operational pain, not with what sounds most interesting.\n\n• Scrap is the main problem → T2 (Quality Fundamentals) + T3 (Problem Solving), supported by C4 coaching\n• OEE below 60% → T1 (Equipment Management) + T4 (Maintenance Planning), with C2 coaching\n• Building a Daily Management System → T5 (DMS) + C3 (Leadership Coaching)\n• Preparing for an ISO audit → T2 + T6 (ISO Standards)\n• Indirect teams (planning, logistics, HR, finance) running without structure → start with the Process Excellence diagnostic for indirect operations\n\nNot sure? The free 30-minute diagnostic call exists exactly for this — we map your situation and recommend the right starting point with no obligation.",
      },
      {
        q: "We are not in production — our team is in planning, logistics or HR. Can you still help us?",
        a: "Yes — and this is one of the most common misconceptions about operational excellence.\n\nThe same waste that slows down a production line exists in every indirect team: undocumented processes, results that depend on who is working today, workload imbalances nobody sees, problems discussed in every meeting but never resolved.\n\nAdaptiveOps applies a dedicated 6-module Process Excellence framework specifically designed for indirect operations — planning, logistics, HR, finance, customer service. It uses different tools than the shop floor methodology (Makigami instead of VSM, Resource Planning instead of line balancing) but the same logic: define, standardise, measure, improve.\n\nImportant: indirect inefficiency does not stay in the back office. Planning gaps, undocumented procedures and unbalanced workloads show up as delays, defects and extra cost on the production floor — in Speed, Quality and Delivery. Structuring indirect operations is not a support function project. It is an operational cost reduction project.",
      },
      {
        q: "How long before we see real results?",
        a: "First visible signs — within 2 to 4 weeks after the first implementation workshop. You will notice changes in how problems are raised, how meetings are run, how decisions are documented.\n\nFirst measurable results (scrap rate, OEE, maintenance response time) — typically 6 to 10 weeks, depending on consistency of application.\n\nSustainable systems that hold without the consultant present — 4 to 6 months.\n\nThe biggest accelerator is management involvement: if the plant manager participates in the first session and follows up weekly, results come faster. The biggest blocker is passive participation — training delivered to a team whose manager does not believe in the change.",
      },
      {
        q: "Do we need to stop production for training?",
        a: "No. Training at AdaptiveOps is designed for engineers, quality technicians and shift supervisors — not for operators on the line. This means production does not stop.\n\nInstead of compressing everything into full 8-hour days, sessions are typically structured over 4 to 5 days at 4 to 5 hours per day. This keeps the content digestible, gives participants time to apply what they learned between sessions, and fits naturally into a working week without disrupting the production schedule.\n\nImplementation workshops happen on the shop floor, not in a conference room — the work gets done where the problems actually exist.",
      },
      {
        q: "What happens if we have high turnover — does the training investment disappear with the people?",
        a: "No — and this is one of the most important things to understand. Training builds systems, not just people. The checklists, standards, visual boards, and management routines created during workshops belong to your factory. They stay when the person leaves.\n\nThe goal of coaching is to transfer capability into the team and embed it into your processes, not to create a dependency on the consultant. New team members step into a structured system that guides their behaviour from day one.\n\nFor factories with high turnover, we also design refresh modules — shorter sessions for new hires that bring them up to speed on existing systems at a reduced cost.",
      },
      {
        q: "How do we know the training is the right level for our team?",
        a: "We find out in the diagnostic call before we recommend anything. In 30 minutes we ask about current OEE, scrap rate, team structure, existing standards, and recent audit results. This tells us whether your team needs foundational training or applied training.\n\nGetting this wrong is costly — a team that finds the content too basic loses interest; a team that finds it too advanced loses confidence. The diagnostic is free and carries no obligation.",
      },
      {
        q: "Do you offer Lean Six Sigma Belt certifications (Yellow, Green, Black Belt)?",
        a: "No — and we are transparent about it.\n\nOur focus is entirely on what happens after the training: measurable results in production and in the indirect areas that slow everything else down — planning, logistics, shift handover, team leadership routines. Certifications are a separate discipline, and accredited Lean Six Sigma training firms do it well. If you need both, we will tell you honestly how to structure the engagement so you do not pay twice for the same thing.\n\nWhat we do not issue: diplomas. What we do deliver: OEE up, scrap down, and managers who lead with data instead of gut feeling.",
      },
      {
        q: "Why choose AdaptiveOps over a large consulting firm or a certified lean trainer?",
        a: "Three honest differences.\n\nWith large consulting firms, the senior partner sells the project and a junior consultant delivers it — someone who has never managed a supplier escalation at 2am or run a production line under customer audit pressure. The methodology is generic, the cost is 5 to 10 times higher, and the relationship ends when the project ends.\n\nA certified lean trainer typically knows the tools well but has not lived them under real production pressure — ISO audits, line shutdowns, customer complaints that cannot wait until Monday.\n\nAdaptiveOps is built on 20+ years as a Regional Operational Excellence Manager at Lear Corporation, Leoni and Valeo — implementing these systems in real factories, not teaching them from slides. Results are documented: €3.2M in savings, 51% scrap reduction, 30% OEE improvement across 8 plants. You are hiring the practitioner, not the presenter.",
      },
    ],
  },
  {
    id: "eco",
    label: "ECO Platform",
    description: "An integrated operational management system for manufacturing — 6 modules, on-premise, built from the shop floor up.",
    faqs: [
      {
        q: "What exactly is the ECO Platform?",
        a: "ECO is an integrated operational management platform built on ISO Annex L — the same structural framework used by ISO 9001, ISO 45001 and ISO 55000. It has 6 modules:\n\n• EMS — Equipment Management System (ISO 55000): asset registry, preventive maintenance, calibration, spare parts\n• QMS — Quality Management System (ISO 9001): document control, CAPA, SPC, audit management\n• MMS — Material Management System (DDMRP): Kanban, traceability, supplier performance\n• PMS — People Management System (ISO 45001): competence matrix, training records, safety\n• OMS — Operations Management System (Lean/TPS): production planning, OEE, daily management\n• CIS — Continuous Improvement System (Toyota Kata): improvement projects, A3, problem solving\n\nThe EMS module is already live — deployed and running at our first client, managing 161 equipment assets.",
      },
      {
        q: "How much does the ECO Platform cost?",
        a: "Standard price: €15,000 per module — perpetual licence with no annual fee.\n\nFounding Partner price: €6,500 per module — a saving of €8,500 per module. This price is available to a limited number of organisations who join early and are willing to provide structured feedback during the active development phase.\n\nThe Founding Partner price includes: initial setup and configuration, data population support, user training, and 5 to 6 months of free support. After the support period, maintenance is €100/month per module.\n\nThere is no lock-in — you can exit at any time with no penalties. You keep all data and configurations.",
      },
      {
        q: "How is ECO different from an ERP like SAP or Microsoft Dynamics?",
        a: "ERP systems focus on transactional data — procurement, finance, inventory accounting, invoicing. They are built for finance departments and supply chain teams.\n\nECO focuses on operational execution — daily management, OEE tracking, calibration, problem solving, and continuous improvement on the shop floor. It is built for Plant Managers, Maintenance Managers, and Quality Engineers.\n\nPractical differences:\n• ECO deploys in weeks, not 18-month ERP projects\n• ECO costs a fraction of SAP licensing\n• ECO does not require a dedicated IT team or expensive consultants to configure\n• ECO bridges the gap between what the ERP records and what actually happens on the line",
      },
      {
        q: "How is ECO different from a CMMS like Fiix or UpKeep?",
        a: "Traditional CMMS tools like Fiix, UpKeep or eMaint cover maintenance work orders and asset tracking — one slice of operational management.\n\nECO's EMS module covers equipment management end-to-end: asset registry, preventive maintenance, calibration, spare parts, condition monitoring and KPIs. And it connects to the other 5 modules on the same platform.\n\nMaintenance data in ECO is directly linked to quality data (QMS), production data (OMS), and people data (PMS). You see the full picture in one system, not in five disconnected tools that do not talk to each other.",
      },
      {
        q: "Is ECO cloud-based or on-premise? Where does our data go?",
        a: "ECO is deployed on-premise, on your own servers inside your facility. Your operational data never leaves your network.\n\nThere is no mandatory cloud subscription, no SaaS fee, and no dependency on internet connectivity for day-to-day use. This is particularly important for automotive plants with strict data governance requirements, customer NDA obligations, or IT security policies that restrict cloud storage of production data.",
      },
      {
        q: "Can we start with just one module?",
        a: "Yes — ECO is modular by design. You can start with a single system and add more modules as your organisation grows and your team is ready.\n\nThe most common starting point is EMS, because equipment management touches every other system — quality, production, people, materials. Getting your assets, calibration and maintenance under control first creates a solid foundation for everything else.\n\nEach module also has a Tier 1 (core functions) and Tier 2 (advanced functions), so you can grow within a module without switching systems.",
      },
      {
        q: "What does the Founding Partner price actually include?",
        a: "At €6,500/module, the Founding Partner price includes:\n\n• Full software licence (perpetual — no annual renewal)\n• Initial setup and configuration on your servers\n• Data population support (we help you migrate or input your existing data)\n• User training for your team\n• 5 to 6 months of priority support from the development team\n• Direct input into future features — your operational needs shape the roadmap\n\nAfter the support period, ongoing maintenance is €100/month per module — covering updates, bug fixes and technical support.\n\nThis offer is available to a limited number of organisations. Once the Founding Partner cohort closes, the standard price of €15,000/module applies.",
      },
    ],
  },
  {
    id: "general",
    label: "About AdaptiveOps",
    description: "Who we are, what we have built, and how to take the first step.",
    faqs: [
      {
        q: "Who is AdaptiveOps and why should I trust you with my plant?",
        a: "AdaptiveOps was founded by Gherman Claudiu, a Regional Operational Excellence Manager with 20+ years of experience at Lear Corporation, Leoni and Valeo — three of the largest automotive Tier-1 suppliers in Europe.\n\nThe results from that career are documented and real: €3.2M in cost savings, 51% scrap reduction, 30% OEE improvement — generated across 8 factories in active production environments, not in pilot programmes or controlled experiments.\n\nAdaptiveOps was built because the tools that actually worked in those factories — the management systems, the coaching methods, the digital platforms — did not exist as products a smaller plant could buy. We built them.",
      },
      {
        q: "What industries and countries do you work in?",
        a: "Primary focus: automotive Tier-1 and Tier-2 suppliers in Romania and Central/Eastern Europe. This includes wire harness, stamping, injection, assembly, and electronics manufacturing plants.\n\nWe also work with manufacturing organisations outside automotive — any plant where operational excellence, OEE improvement, quality management, or equipment reliability is a priority.\n\nBeyond the factory floor: the Process Excellence framework for indirect operations applies to any organisation where planning, logistics, HR, finance or customer service teams run without documented standards. This is not limited to manufacturing — any organisation where indirect inefficiency adds cost to operations qualifies.\n\nTraining and coaching are delivered in Romanian or English. ECO Platform is available in both languages.",
      },
      {
        q: "How do we take the first step without committing to anything?",
        a: "Book the free 30-minute diagnostic call. No sales pitch, no proposal on the first call.\n\nIn those 30 minutes we ask about your biggest operational pain, your current metrics, your team structure and your timeline. At the end we tell you honestly whether AdaptiveOps is a fit, and if so, what the right starting point looks like.\n\nIf we are not the right fit, we will tell you that too.",
      },
    ],
  },
];

export default function BeforeYouCallPage() {
  const [openMap, setOpenMap] = useState<Record<string, boolean>>({});

  const toggle = (key: string) => {
    setOpenMap((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary py-20">
        <div className="absolute inset-0 opacity-[0.05]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="bycGrid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#bycGrid)" />
          </svg>
        </div>
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

        <div className="relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-12">
          <FadeUp>
            <span className="inline-block text-xs font-bold tracking-widest uppercase text-accent mb-4">
              Transparent Answers
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-white max-w-3xl leading-tight">
              Before You Call
            </h1>
          </FadeUp>
          <FadeUp delay={100}>
            <p className="mt-4 text-lg text-white/70 max-w-2xl leading-relaxed">
              Every question a Plant Manager or Operations Director typically asks before making a decision —
              answered directly, without a sales pitch.
            </p>
          </FadeUp>
          <FadeUp delay={200}>
            <div className="mt-8 flex flex-wrap gap-3">
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="inline-flex items-center gap-2 text-white/70 hover:text-white border border-white/20 hover:border-white/40 px-4 py-2 rounded-full text-sm font-medium transition-colors"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Q&A Sections */}
      {sections.map((section, si) => (
        <section
          key={section.id}
          id={section.id}
          className={`py-20 ${si % 2 === 0 ? "bg-white" : "bg-light"}`}
        >
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-12">
            <FadeUp>
              <div className="mb-12">
                <span className="inline-block text-xs font-bold tracking-widest uppercase text-accent mb-3">
                  {section.label}
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-primary mb-3">
                  {section.label === "Training & Coaching"
                    ? "Questions about training and coaching"
                    : section.label === "ECO Platform"
                    ? "Questions about the ECO Platform"
                    : "Questions about AdaptiveOps"}
                </h2>
                <p className="text-mid text-lg max-w-2xl">{section.description}</p>
              </div>
            </FadeUp>

            <div className="max-w-3xl space-y-3">
              {section.faqs.map((faq, fi) => {
                const key = `${si}-${fi}`;
                const isOpen = !!openMap[key];
                return (
                  <FadeUp key={fi} delay={fi * 50}>
                    <div
                      className={`rounded-xl border transition-all duration-200 ${
                        isOpen
                          ? "border-accent/30 bg-accent/[0.03] shadow-sm"
                          : si % 2 === 0
                          ? "border-gray-100 bg-light hover:border-gray-200"
                          : "border-gray-200 bg-white hover:border-gray-300"
                      }`}
                    >
                      <button
                        className="w-full flex items-start justify-between gap-4 px-6 py-5 text-left"
                        onClick={() => toggle(key)}
                        aria-expanded={isOpen}
                      >
                        <span className={`font-semibold text-base leading-snug ${isOpen ? "text-accent" : "text-primary"}`}>
                          {faq.q}
                        </span>
                        <svg
                          className={`w-5 h-5 flex-shrink-0 mt-0.5 transition-transform duration-200 ${
                            isOpen ? "rotate-180 text-accent" : "text-mid"
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      {isOpen && (
                        <div className="px-6 pb-6">
                          {faq.a.split("\n\n").map((para, pi) => {
                            if (para.startsWith("•")) {
                              const items = para.split("\n").filter(Boolean);
                              return (
                                <ul key={pi} className="space-y-2 my-3">
                                  {items.map((item, ii) => (
                                    <li key={ii} className="flex items-start gap-2.5 text-[15px] text-dark">
                                      <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0" />
                                      <span>{item.replace(/^•\s*/, "")}</span>
                                    </li>
                                  ))}
                                </ul>
                              );
                            }
                            return (
                              <p key={pi} className="text-mid leading-relaxed text-[15px] mb-3 last:mb-0">
                                {para}
                              </p>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </FadeUp>
                );
              })}
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="bg-accent py-16">
        <FadeUp>
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Still have a question we did not answer?
            </h2>
            <p className="mt-4 text-lg text-white/80 max-w-xl mx-auto">
              Book the free 30-minute diagnostic call. No sales pitch — just an honest conversation
              about whether AdaptiveOps is the right fit for your plant.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-block bg-white text-accent font-semibold px-10 py-4 rounded-full hover:bg-gray-100 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-shadow"
              >
                Book Free 30-Min Call
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-1.5 text-white/60 hover:text-white font-medium transition-colors"
              >
                Explore services &rarr;
              </Link>
              <Link
                href="/lean-office"
                className="inline-flex items-center gap-1.5 text-white/60 hover:text-white font-medium transition-colors"
              >
                Lean in the Office &rarr;
              </Link>
            </div>
          </div>
        </FadeUp>
      </section>
    </main>
  );
}
