export interface TrainingProgram {
  id: string;
  title: string;
  subtitle: string;
  hook: string;
  level: string;
  duration: string;
  audience: string;
  walkOut: string[];
  firstResult: string;
}

export const trainingPrograms: TrainingProgram[] = [
  {
    id: "T1",
    title: "Lean Manufacturing Fundamentals",
    subtitle: "Get your team to agree on what “waste” actually means — in 2 days.",
    hook:
      "Most plants run improvement initiatives in parallel that never connect. This program gives the team a shared system — not more initiatives.",
    level: "Introductory",
    duration: "1–2 days",
    audience:
      "Teams new to Lean — operators, team leaders and process engineers running their first improvement program.",
    walkOut: [
      "Your team spots the 8 types of waste in their own area",
      "A 5S audit checklist running on every shift",
      "One value stream mapped, photographed, taped to the wall",
      "Common Lean vocabulary across team, supervisors and management",
      "A 30-day waste-elimination action plan signed by area supervisor",
    ],
    firstResult: "First waste items eliminated within 30 days of completion.",
  },
  {
    id: "T2",
    title: "5S — The Order That Drives Performance",
    subtitle:
      "Stop seeing “normal” clutter. Start seeing waste — and fixing it.",
    hook:
      "Every factory has waste. Most can’t see it because it’s been there so long it looks normal. This program changes what your team sees when they walk the floor.",
    level: "Practical",
    duration: "1 day workshop + on-site follow-up",
    audience:
      "Production teams and area supervisors fighting daily clutter that hides the bigger problems.",
    walkOut: [
      "5S audit completed in your priority production area",
      "Visual standard board created and posted on the line",
      "Sustainment routine assigned to specific roles per shift",
      "Hands-on session done IN your real production area — not a meeting room",
      "Before/after photos for management reporting",
    ],
    firstResult: "Visible workplace change within 1 week of the workshop.",
  },
  {
    id: "T3",
    title: "OEE — Overall Equipment Effectiveness",
    subtitle: "Spot losses while there’s still time to act — not after the shift.",
    hook:
      "Most OEE numbers are calculated after the shift ends. By then the losses are already locked in. This program makes performance visible in real time, while there’s still time to act.",
    level: "Intermediate",
    duration: "1–2 days",
    audience:
      "Production engineers, maintenance managers and line managers measuring OEE for the first time — or trying to make existing numbers actually drive action.",
    walkOut: [
      "OEE calculation method validated against your line data",
      "6 Big Losses identified and prioritized for your specific equipment",
      "Real-time measurement framework specified for your shop floor",
      "Top-3 loss action plan with named owners",
      "Case study workshop using your line numbers — not generic theory",
    ],
    firstResult: "First OEE-driven shop floor decision made within 1 week.",
  },
  {
    id: "T4",
    title: "SMED — Single-Minute Exchange of Die",
    subtitle: "Cut setup time without buying new machines or replacing people.",
    hook:
      "Setup time is invisible until you measure it. Once measured, most plants find 30–50% reduction available — with the existing equipment and the existing operators.",
    level: "Intermediate",
    duration: "1–2 days",
    audience:
      "Process engineers, advanced operators and team leaders working on equipment-bound throughput.",
    walkOut: [
      "Video analysis of one full changeover on your equipment",
      "Internal vs external activities separated and documented",
      "New standardized changeover sequence created",
      "Setup time reduction measured and quantified in minutes",
      "Cost savings calculated for the management report",
    ],
    firstResult: "Measurable setup-time reduction by end of training week.",
  },
  {
    id: "T5",
    title: "Problem Solving — A3 Thinking & Root Cause Analysis",
    subtitle: "Stop seeing the same problem on next month’s report.",
    hook:
      "The same problem appearing on the weekly report for the third time is not bad luck. It means the root cause was never reached. This program teaches your team to stop there.",
    level: "Intermediate",
    duration: "1–2 days",
    audience:
      "Engineers, quality managers, team leaders and production managers tired of recurring problems that keep coming back.",
    walkOut: [
      "One real factory problem solved using A3 during the training",
      "A3 template adapted to your reporting style",
      "Root cause analysis tree (5-Why or Ishikawa) on your real problem",
      "Implementation plan with verification checkpoints",
      "Recurrence-prevention standard documented",
    ],
    firstResult: "Solved problem in hand by end of training day 2.",
  },
  {
    id: "T6",
    title: "Toyota Kata — Coaching for Continuous Improvement",
    subtitle: "Build a daily improvement routine that doesn’t need you watching.",
    hook:
      "Improvement programs die when the trainer leaves. Toyota Kata is the routine that keeps improvement happening daily — without you watching.",
    level: "Advanced",
    duration: "2–3 days",
    audience:
      "Production managers, supervisors and internal coaches who want CI to outlive the program.",
    walkOut: [
      "Improvement Kata 4-step cycle running on your line",
      "Coaching Kata daily session structure (~15 min/day)",
      "Starter Kata practice exercises adapted to your context",
      "Shift-by-shift questioning framework — not telling",
      "Improvement routine that survives turnover and shift changes",
    ],
    firstResult: "Daily Kata sessions running within 2 weeks of training.",
  },
  {
    id: "T7",
    title: "Leadership for Production Teams",
    subtitle: "Lead the team you actually have — not the one you wish you had.",
    hook:
      "Promoting your best technical operator to team leader doesn’t make them a leader. Leadership is a separate skill — and it can be taught.",
    level: "Intermediate–Advanced",
    duration: "2–3 days (modular program)",
    audience:
      "Team leaders, supervisors and newly promoted line managers making the jump from doing the work to leading the work.",
    walkOut: [
      "Personal communication style identified and sharpened",
      "Conflict-management techniques you can use on Monday",
      "Constructive feedback framework — not destructive",
      "Plan for managing absenteeism and turnover in YOUR team",
      "30-day action plan with measurable behavior targets",
    ],
    firstResult: "Different team dynamic visible within 2 weeks.",
  },
  {
    id: "T8",
    title: "Operational Performance Management",
    subtitle: "Lead through KPIs and questions — not orders.",
    hook:
      "A manager who gives orders gets compliance. A manager who asks the right questions gets improvement. This program is about the second kind.",
    level: "Advanced",
    duration: "2 days",
    audience:
      "Production Managers, Operations Managers and Plant Managers running KPI dashboards that don’t actually drive action.",
    walkOut: [
      "Daily Management System designed for your plant",
      "SQCDM dashboards specified and templated",
      "Production meeting agenda restructured for action — not status updates",
      "Problem escalation and decision circuit defined",
      "Production cost budget framework",
    ],
    firstResult: "Restructured production meeting running within 1 week.",
  },
];
