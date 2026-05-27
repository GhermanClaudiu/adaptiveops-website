export interface CoachingProgram {
  id: string;
  title: string;
  subtitle: string;
  hook: string;
  format: string;
  duration: string;
  audience: string;
  walkOut: string[];
  firstResult: string;
}

export const coachingPrograms: CoachingProgram[] = [
  {
    id: "C1",
    title: "Coaching for Production Managers",
    subtitle: "Lead the plant. Stop reacting to it.",
    hook:
      "Running a plant means being pulled in 12 directions at once. This coaching builds the systems that let the plant run — so you can lead instead of react.",
    format: "Individual",
    duration: "3–6 months",
    audience:
      "Newly promoted Production Managers — or experienced ones navigating a period of change (new line, new team, restructuring).",
    walkOut: [
      "Initial leadership assessment with concrete development areas",
      "Bi-weekly 1:1 coaching sessions (90 min) for the engagement length",
      "Stage-by-stage measurable objectives — auditable progress",
      "Between-session support (email/WhatsApp) for real-time issues",
      "Personal management framework you keep after the engagement ends",
    ],
    firstResult: "First behavioral shift visible to your team within 30 days.",
  },
  {
    id: "C2",
    title: "Production Team Coaching — Lean Implementation",
    subtitle: "Bring the system to the line. Make it stick.",
    hook:
      "When your plants aren’t performing consistently, the gap is rarely technical. It’s in how performance is managed and escalated. This program works on that layer.",
    format: "Team",
    duration: "1–3 months on-site",
    audience:
      "Production teams implementing Lean for the first time — where the gap is behavioral, not technical.",
    walkOut: [
      "5S implementation done IN your actual production area",
      "Work standards drafted, validated and posted on the line",
      "Daily performance visualization the team actually looks at",
      "Behavior-change coaching with the team — not lectures",
      "Monthly progress report you can share with management",
    ],
    firstResult: "Visible workplace change within 2 weeks of engagement start.",
  },
  {
    id: "C3",
    title: "Operational Management System Implementation",
    subtitle:
      "Build the management system that runs the plant — so leadership can lead it.",
    hook:
      "Team leaders are where strategy meets the shop floor. If they’re not equipped to coach and problem-solve, nothing above them matters.",
    format: "Project-based",
    duration: "3–6 months",
    audience:
      "Plants building or restructuring their production management system from scratch.",
    walkOut: [
      "SQCDM KPI framework specified and rolled out across shifts",
      "Daily Management System running with named owners",
      "Problem escalation circuit with decision rights",
      "Production meeting cadence restructured for action",
      "Full system documentation transferred to your team",
    ],
    firstResult: "First Daily Management cycle running by week 4.",
  },
  {
    id: "C4",
    title: "OEE & Equipment Performance Implementation",
    subtitle: "Make OEE numbers actually drive shop floor action.",
    hook:
      "OEE that’s calculated but ignored is worse than no OEE — it gives the illusion of measurement. This program closes the loop between number and action.",
    format: "Project-based",
    duration: "2–3 months",
    audience:
      "Plants where OEE is calculated but ignored — or not calculated at all.",
    walkOut: [
      "OEE data collection system designed for your equipment",
      "6 Big Losses identified and prioritized for your line",
      "Action plan tied to each major loss with named owners",
      "Performance tracking dashboard implemented and live",
      "Team trained to maintain the system without us",
    ],
    firstResult: "First OEE-driven shop floor decision within 30 days.",
  },
  {
    id: "C5",
    title: "Mentoring for Lean / CI Managers",
    subtitle: "Build a CI program that survives the next budget cycle.",
    hook:
      "When department heads optimize for their own KPIs, the plant loses. This program aligns the leadership around a shared system and shared priorities.",
    format: "Individual mentoring",
    duration: "6–12 months",
    audience:
      "CI Managers or Lean Managers starting out — or ready to step up to the next level.",
    walkOut: [
      "Continuous improvement program designed from scratch for your plant",
      "Management and shop-floor buy-in strategy specific to your culture",
      "Internal coach development pipeline",
      "Monthly deep mentoring sessions (2–3h) — focused, agenda-driven",
      "Continuous between-session support — practical materials included",
    ],
    firstResult: "Internal coaching cycle started within 90 days.",
  },
];
