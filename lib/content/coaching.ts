export interface CoachingProgram {
  id: string;
  title: string;
  hook: string;
  format: string;
  duration: string;
  audience: string;
  description: string;
  deliverables: string[];
}

export const coachingPrograms: CoachingProgram[] = [
  {
    id: "C1",
    title: "Coaching for Production Managers",
    hook: "Running a plant means being pulled in 12 directions at once. This coaching program helps you build the systems that let the plant run — so you can lead instead of react.",
    format: "Individual",
    duration: "3–6 months",
    audience:
      "Newly promoted Production Manager or one going through a period of change",
    description:
      "Transition from technical specialist to leader. Managing a large team under KPI pressure. Developing a personal management style.",
    deliverables: [
      "Initial assessment (1 diagnostic session)",
      "Bi-weekly 1:1 sessions of 90 minutes",
      "Clear, measurable objectives per stage",
      "Between-session support (email/WhatsApp)",
    ],
  },
  {
    id: "C2",
    title: "Production Team Coaching — Lean Implementation",
    hook: "When your plants aren\u2019t performing consistently, the gap is rarely technical. It\u2019s in how performance is managed and escalated. This program works on that layer.",
    format: "Team",
    duration: "1–3 months on-site",
    audience: "Production teams implementing Lean for the first time",
    description:
      "Practical 5S implementation on the line. Creating work standards. Visualizing daily performance. Changing behaviors — not just procedures.",
    deliverables: [
      "Regular on-site visits (1–2x/week)",
      "Direct work with the team in the production area",
      "Monthly progress report",
    ],
  },
  {
    id: "C3",
    title: "Operational Management System Implementation",
    hook: "Team leaders are where strategy meets the shop floor. If they\u2019re not equipped to coach and problem-solve, nothing above them matters. This program develops that capability.",
    format: "Project-based",
    duration: "3–6 months",
    audience:
      "Companies building or restructuring their production management system",
    description:
      "Full implementation of SQCDM KPIs, Daily Management System, problem escalation, efficient production meetings.",
    deliverables: [
      "Phase 1 (month 1): Diagnostic and system design",
      "Phase 2 (months 2–4): Implementation and intensive coaching",
      "Phase 3 (months 5–6): Consolidation and competence transfer",
    ],
  },
  {
    id: "C4",
    title: "OEE & Equipment Performance Implementation",
    hook: "Being the OpEx Manager means selling improvement to people who think the current way works fine. This program gives you the tools — and the language — to change that.",
    format: "Project-based",
    duration: "2–3 months",
    audience:
      "Companies looking to measure and improve equipment efficiency",
    description:
      "OEE data collection and calculation system. Identifying and prioritizing major losses. Action plan for OEE improvement.",
    deliverables: [
      "OEE calculation and data collection system",
      "Major loss identification and prioritization",
      "OEE improvement action plan",
      "Team training on methodology",
      "Performance tracking dashboard",
    ],
  },
  {
    id: "C5",
    title: "Mentoring for Lean / CI Managers",
    hook: "When department heads optimize for their own KPIs, the plant loses. This program aligns the leadership team around a shared system and shared priorities.",
    format: "Individual mentoring",
    duration: "6–12 months",
    audience:
      "CI Manager or Lean Manager starting out, or looking to advance to the next level",
    description:
      "Building a continuous improvement program from scratch. Getting buy-in from management and the shop floor. Forming internal coaches.",
    deliverables: [
      "Monthly in-depth sessions (2–3h)",
      "Continuous between-session support",
      "Access to materials and tools from real practice",
    ],
  },
];
