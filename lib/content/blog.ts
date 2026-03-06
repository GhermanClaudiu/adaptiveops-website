export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "what-is-operational-excellence",
    title: "What Is Operational Excellence and Why It Matters in Manufacturing",
    date: "2026-02-15",
    category: "Operational Excellence",
    excerpt:
      "Operational excellence is not a destination — it's a system. Learn why manufacturing organizations that build the right systems outperform those chasing quick fixes.",
    content: `
Operational excellence is often misunderstood. Many organizations treat it as a goal — something to "achieve" and then move on. In reality, it's a management system. It's a way of running your operations so that every person, every process, and every tool works toward the same measurable outcomes.

## Why It Matters

In manufacturing, the difference between a well-run plant and a struggling one is rarely about technology or equipment. It's about systems. Specifically:

- **Do your people know what good performance looks like?** If your team leaders can't tell you today's OEE or yesterday's scrap rate, you have a visibility problem.
- **Do your processes prevent problems or just detect them?** Reactive quality management is expensive. Standardized processes with built-in checks catch issues before they become defects.
- **Do your managers coach or just direct?** The best-performing plants have managers who ask questions (Toyota Kata) rather than giving orders.

## The Three Pillars

At AdaptiveOps, we structure operational excellence around three pillars:

1. **People** — Training and developing your workforce from the shop floor up. Not theory, but practical skills they can apply tomorrow.
2. **Processes** — Implementing management systems (Daily Management, KPI cascading, problem solving routines) that create consistency.
3. **Technology** — Using digital tools (EMS, QMS, dashboards) to make performance visible and traceable.

## Where to Start

If you're starting from scratch, begin with visibility. You can't improve what you can't see. Implement a simple daily management routine: a 15-minute production meeting, 3-5 KPIs on a board, and a clear escalation path for problems.

Then build from there. Add problem-solving capability (A3, 5 Why). Train your leaders. Digitize when you're ready — not before.

The key insight: operational excellence is not about doing everything at once. It's about building systems, one layer at a time, that compound over months and years.
    `.trim(),
  },
  {
    slug: "daily-management-system-guide",
    title: "How to Build a Daily Management System That Actually Works",
    date: "2026-03-01",
    category: "Management Systems",
    excerpt:
      "Most daily management systems fail because they focus on meetings instead of behaviors. Here's how to build one that drives real performance improvement.",
    content: `
A Daily Management System (DMS) is the backbone of any well-run manufacturing operation. Yet most attempts at implementing one fail within 6 months. Why? Because organizations focus on the visible parts (meetings, boards, KPIs) and ignore the behaviors that make them work.

## What a DMS Actually Is

A Daily Management System is a structured routine that ensures:

1. Performance is **visible** — everyone knows how yesterday went
2. Problems are **identified** quickly — within hours, not days
3. Actions are **assigned and tracked** — accountability is clear
4. Escalation is **systematic** — the right level handles the right problems

## The Typical Failure Mode

Here's what usually happens: A consultant or internal team designs a beautiful tiered meeting structure. Level 1 (team leader) at 7:00, Level 2 (area manager) at 8:00, Level 3 (plant manager) at 9:00. KPI boards are installed. Templates are created.

For the first 2-3 weeks, attendance is high. Then reality kicks in. Meetings run long. The same problems appear every day with no resolution. Managers start skipping. Within 3 months, it's dead.

## What Actually Works

**Keep meetings short and structured.** Level 1 should be 10 minutes maximum. Use a fixed agenda: Safety, Quality, Delivery, Cost — done. If a topic needs more than 2 minutes of discussion, it gets escalated or scheduled separately.

**Focus on deviations, not status updates.** Don't review every KPI. Only discuss what's RED. Green means the system is working — move on.

**Make the escalation path clear.** If a team leader can't solve it in 24 hours, it goes up. If an area manager can't solve it in 48 hours, it goes up again. No problem should sit unresolved for more than a week.

**Train the behavior, not just the format.** The hardest part of DMS is not the boards or the meetings. It's teaching managers to ask the right questions: "What's the target? What's the actual? What's the gap? What's your next step?"

This is where Toyota Kata and coaching skills become essential. A DMS without coaching capability is just a reporting system.

## Start Small

Don't implement all tiers at once. Start with one production area. Get Level 1 working consistently for 4 weeks before adding Level 2. Build the habit before scaling the system.

The goal is not a perfect system on day one. The goal is a system that improves every week.
    `.trim(),
  },
];

export const blogCategories = [
  "Operational Excellence",
  "Management Systems",
  "Quality",
  "Digital Transformation",
  "Leadership",
];
