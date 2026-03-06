export interface TrainingProgram {
  id: string;
  title: string;
  level: string;
  duration: string;
  audience: string;
  topics: string[];
  outcome: string;
}

export const trainingPrograms: TrainingProgram[] = [
  {
    id: "T1",
    title: "Lean Manufacturing Fundamentals",
    level: "Introductory",
    duration: "1–2 days",
    audience: "Operators, team leaders, process engineers",
    topics: [
      "8 Wastes — identification and elimination",
      "5S principles — implementation and sustainment",
      "Value Stream Mapping — basics",
      "Introduction to Lean thinking",
    ],
    outcome:
      "Participants identify waste in their own work area and propose elimination actions.",
  },
  {
    id: "T2",
    title: "5S — The Order That Drives Performance",
    level: "Practical",
    duration: "1 day workshop + on-site follow-up",
    audience: "Production teams, area supervisors",
    topics: [
      "The 5 steps: Sort, Set in Order, Shine, Standardize, Sustain",
      "5S Audit — how to conduct and maintain",
      "Creating visual standards",
      "Hands-on session in the production area",
    ],
    outcome:
      "Audited production area, visual standard created, sustainment plan defined.",
  },
  {
    id: "T3",
    title: "OEE — Overall Equipment Effectiveness",
    level: "Intermediate",
    duration: "1–2 days",
    audience: "Production engineers, maintenance managers, line managers",
    topics: [
      "3 OEE pillars: Availability, Performance, Quality",
      "OEE calculation and interpretation",
      "Identifying major losses (6 Big Losses)",
      "Implementing an OEE measurement system",
      "Real production case studies",
    ],
    outcome:
      "OEE calculation system implemented or improved, priority actions identified.",
  },
  {
    id: "T4",
    title: "SMED — Single-Minute Exchange of Die",
    level: "Intermediate",
    duration: "1–2 days",
    audience: "Process engineers, advanced operators, team leaders",
    topics: [
      "Internal vs. external activities",
      "Video analysis of changeover",
      "Externalization and parallelization techniques",
      "Standardizing the new method",
      "Calculating generated savings",
    ],
    outcome: "Measurable setup time reduction, documented standard.",
  },
  {
    id: "T5",
    title: "Problem Solving — A3 Thinking & Root Cause Analysis",
    level: "Intermediate",
    duration: "1–2 days",
    audience: "Engineers, quality managers, team leaders, production managers",
    topics: [
      "A3 structure — from problem to solution on a single page",
      "Root Cause Analysis: 5 Why, Ishikawa (Fishbone)",
      "Correct problem definition",
      "Solution implementation and verification",
      "Recurrence prevention",
    ],
    outcome:
      "Participants solve a real factory problem using A3 during the training.",
  },
  {
    id: "T6",
    title: "Toyota Kata — Coaching for Continuous Improvement",
    level: "Advanced",
    duration: "2–3 days",
    audience: "Production managers, supervisors, internal coaches",
    topics: [
      "Improvement Kata — the 4 steps",
      "Coaching Kata — daily coaching session structure",
      "Creating a culture of continuous improvement",
      "Daily practice: Starter Kata",
      "Management by questions vs. management by directives",
    ],
    outcome:
      "Managers apply Coaching Kata with their teams, generating a sustainable improvement routine.",
  },
  {
    id: "T7",
    title: "Leadership for Production Teams",
    level: "Intermediate–Advanced",
    duration: "2–3 days (modular program)",
    audience: "Team leaders, supervisors, newly promoted line managers",
    topics: [
      "Leader role in production vs. operator role",
      "Effective shop floor communication",
      "Conflict management in teams",
      "Motivation and engagement — what actually works",
      "Constructive feedback and people development",
      "Managing absenteeism and turnover",
    ],
    outcome:
      "Leaders apply concrete communication and motivation techniques in daily work.",
  },
  {
    id: "T8",
    title: "Operational Performance Management",
    level: "Advanced",
    duration: "2 days",
    audience: "Production Managers, Operations Managers, Plant Managers",
    topics: [
      "Defining and cascading operational KPIs",
      "Daily Management System — what a well-run day looks like",
      "Performance visualization (dashboards, SQCDM)",
      "Efficient production meetings — structure and discipline",
      "Problem escalation and decision circuits",
      "Production cost budgeting and control",
    ],
    outcome:
      "Daily management system defined, KPIs aligned, production meetings restructured.",
  },
];
