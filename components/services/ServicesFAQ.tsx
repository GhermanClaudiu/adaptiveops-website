"use client";

import { useState } from "react";
import FadeUp from "@/components/shared/FadeUp";

const faqs = [
  {
    q: "Why does training alone rarely produce lasting results?",
    a: "Because knowledge without application is just information. In most factories, participants attend training to tick a box — not because they chose to change. When the course ends, there is no list of new habits to practice, no one follows up after two weeks, and the process owner never observes or standardises the new behaviour. The individual might want to change, but the system around them hasn't. Consider a communication course teaching Covey's Third Alternative — the idea that your idea and my idea can combine into a third, better solution. It sounds powerful in the room. Monday morning, during a production conflict, the participant reverts to old habits because no one around them knows what the Third Alternative is and no process supports it. The habit dies in 48 hours. This is why AdaptiveOps combines training with structured coaching and follow-up: knowledge needs a system to survive.",
  },
  {
    q: "What is the difference between training and coaching — which one do I need?",
    a: "Training gives your team the knowledge — what to do and why. Coaching gives them the application — how to do it when things get hard, and someone alongside them when they get stuck. You can read every book about swimming and still need someone in the pool with you the first time. Training is enough when the goal is awareness or a specific skill your team can immediately apply without structural change. Coaching is needed when you are implementing a new system, changing a management routine, or building a habit that requires accountability over weeks or months. Most meaningful operational improvements need both: training to align the team on what good looks like, coaching to make it stick.",
  },
  {
    q: "Where should we start — there are so many programs?",
    a: "Start with your biggest operational pain, not with what sounds most interesting. If scrap is your main problem: start with T2 (Quality Fundamentals) and T3 (Problem Solving), supported by C4 coaching. If OEE is below 60%: start with T1 (Equipment Management) and T4 (Maintenance Planning), with C2 coaching. If you want to build a Daily Management System: start with T5 (DMS) and C3 (Leadership Coaching). If you are preparing for an ISO audit: T2 and T6 (ISO Standards) are the priority. Not sure? The free 30-minute diagnostic call exists exactly for this — we map your situation and recommend the right starting point.",
  },
  {
    q: "How long before we see results?",
    a: "First visible signs — within 2 to 4 weeks after the first implementation workshop. Team behaviour in meetings, how problems are raised, how decisions are documented. First measurable results (scrap rate, OEE, maintenance response time) — typically 6 to 10 weeks, depending on how consistently the new practices are applied. Sustainable systems that hold without the consultant present — 4 to 6 months. The biggest accelerator is management involvement: if the plant manager participates in the first session and follows up weekly, results come faster. The biggest delay is passive participation: training delivered to a team whose manager does not believe in the change.",
  },
  {
    q: "Do we need to stop production for training?",
    a: "No. There are several practical options depending on your shift structure: sessions during the third shift or weekend when production volume is lower, rotating small groups of 4 to 5 people so the line is never empty, or scheduling sessions during planned downtime and maintenance stops. Implementation workshops are designed to happen on the shop floor, not in a conference room — so they integrate into the workday rather than interrupting it. We design the schedule around your production reality, not around a standard training calendar.",
  },
  {
    q: "What happens if we have high turnover — does the training investment disappear?",
    a: "No, and this is one of the most important things to understand. Training builds systems, not just people. The checklists, standards, visual boards, and management routines created during workshops belong to your factory — they stay when the person leaves. The goal of coaching is to transfer capability into the team and embed it into your processes, not to create a dependency on the consultant. New team members step into a structured system that guides their behaviour, rather than starting from scratch. For factories with high turnover, we also design refresh modules — shorter sessions for new hires that bring them up to speed on existing systems at a reduced cost.",
  },
  {
    q: "How do we know the training is right for our team's level?",
    a: "We find out in the diagnostic call before we recommend anything. In 30 minutes we ask about current OEE, scrap rate, team structure, existing standards, and recent audit results. This tells us whether your team needs foundational training (understanding what lean is and why it matters) or applied training (implementing specific tools they already know exist but haven't deployed properly). Getting this wrong is costly — a team that finds the content too basic loses interest, a team that finds it too advanced loses confidence. The diagnostic is free and has no obligation.",
  },
  {
    q: "Why AdaptiveOps and not a large consulting firm or a certified lean trainer?",
    a: "Three honest differences. First, with large consulting firms the senior partner sells the project and a junior consultant delivers it — someone who has never run a production shift or managed a supplier escalation at 2am. The methodology is generic, the cost is 5 to 10 times higher, and the relationship ends when the project ends. Second, a certified lean trainer typically knows the tools well but has not lived them under real production pressure — ISO audits, customer complaints, line shutdowns. Third, AdaptiveOps is built on 20+ years as a Regional Operational Excellence Manager at Lear, Leoni and Valeo — implementing these systems in real factories, not teaching them from slides. The results are documented: €3.2M in savings, 51% scrap reduction, 30% OEE improvement across 8 plants. You are hiring the practitioner, not the presenter.",
  },
];

export default function ServicesFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-white py-20 border-t border-gray-100">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-12">

        <FadeUp>
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-bold tracking-widest uppercase text-accent mb-4">
              Honest Answers
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Questions you should ask before booking
            </h2>
            <p className="text-mid text-lg max-w-2xl mx-auto leading-relaxed">
              Most consultants avoid these questions. We answer them directly — because
              you deserve clarity before you make a decision.
            </p>
          </div>
        </FadeUp>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <FadeUp key={i} delay={i * 50}>
                <div
                  className={`rounded-xl border transition-all duration-200 ${
                    isOpen
                      ? "border-accent/30 bg-accent/[0.03] shadow-sm"
                      : "border-gray-100 bg-light hover:border-gray-200"
                  }`}
                >
                  <button
                    className="w-full flex items-start justify-between gap-4 px-6 py-5 text-left"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
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
                      <p className="text-mid leading-relaxed text-[15px]">{faq.a}</p>
                    </div>
                  )}
                </div>
              </FadeUp>
            );
          })}
        </div>

      </div>
    </section>
  );
}
