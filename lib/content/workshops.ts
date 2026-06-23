/**
 * Data-driven registry for the FREE online workshops on /resources/workshops.
 *
 * Adding a workshop = add one entry here. The `slug` doubles as the route
 * segment (/resources/workshops/<slug>) and the key the post-workshop
 * testimonial form is tagged with.
 *
 * v1 architecture (meetergo-first, thin site): registration, confirmation,
 * .ics, reminders and the Zoom/Meet/Teams link are all handled by the embedded
 * meetergo scheduler. The site only renders display content + the embed. The
 * real source of truth for the date/availability is meetergo; `displayDate`
 * here is for display only and is synced manually by the founder.
 *
 * Keep `slug` lowercase-kebab (`^[a-z0-9-]{1,64}$`).
 */

export type WorkshopStatus = "upcoming" | "past";

export interface WorkshopTestimonial {
  /** Display name, e.g. "Andrei P." */
  name: string;
  /** Role + optional company, e.g. "Production Manager, Automotive Tier-1". */
  role: string;
  quote: string;
}

export interface WorkshopEntry {
  /** Route segment AND testimonial key. */
  slug: string;
  title: string;
  /** One line for the listing card. */
  shortDesc: string;
  /** Full intro paragraph for the detail page. */
  longDesc: string;
  /** Who it's for, e.g. "Team leaders, shift supervisors, process engineers". */
  audience: string;
  /** 3–6 concrete takeaways. */
  whatYouLearn: string[];
  /** Human duration, e.g. "60 minutes" / "90 minutes". */
  duration: string;
  /**
   * Delivery language, shown as a badge on the (English) site so attendees
   * know what language the live session runs in, e.g. "Romanian".
   */
  language: string;
  /**
   * Human-readable date for display only (synced manually with meetergo).
   * Leave empty until a session is scheduled — the card shows "New date soon".
   */
  displayDate?: string;
  status: WorkshopStatus;
  /**
   * meetergo booking page URL, embedded inline as the registration form.
   * Empty until the founder configures the event in meetergo — the page then
   * shows a "registration opens soon" placeholder.
   */
  meetergoUrl?: string;
  /** Optional recording link for past workshops (on-demand value + lead gen). */
  recordingUrl?: string;
  /** Manually curated participant testimonials (separate from LinkedIn proof). */
  testimonials?: WorkshopTestimonial[];
}

export const WORKSHOPS: WorkshopEntry[] = [
  {
    slug: "5s-that-sticks",
    title: "5S That Actually Sticks",
    shortDesc:
      "Why most 5S programs fade in three months — and the simple system that keeps the floor clean after the consultants leave.",
    longDesc:
      "Almost every plant has 'done' 5S. Almost none have it six months later. In this free online workshop we skip the red-tag photos and get to the real question: what makes 5S survive once the kickoff energy is gone? You'll see how Sort, Set in Order, Shine, Standardize and Sustain work as one system — and where the first four quietly die without the fifth.",
    audience:
      "Team leaders, shift supervisors, zone owners and process engineers who have to make 5S last on a real shop floor.",
    whatYouLearn: [
      "The five steps as a system — and why Sustain is the only one that matters long-term",
      "How to build a visual standard your team can read in two seconds",
      "A lightweight 5S audit that takes minutes, not a clipboard marathon",
      "The two behaviours that decide whether 5S survives the next busy week",
    ],
    duration: "60 minutes",
    language: "Romanian",
    displayDate: "9 July 2026 · 18:30–19:30 (Bucharest)",
    status: "upcoming",
    meetergoUrl:
      "https://cal.meetergo.com/ghermanclaudiu77/5s-that-actually-sticks-free-online-workshop",
  },
  {
    slug: "time-and-motion-basics",
    title: "Time & Motion: Seeing the Waste You Stopped Noticing",
    shortDesc:
      "A practical intro to observing work the way an industrial engineer does — and spotting the motion waste hiding in plain sight.",
    longDesc:
      "After years on the same line, the waste becomes invisible — it's just 'how we do it'. Time & motion study is the discipline of seeing it again. This free online workshop walks you through how to observe a real task, separate value-adding work from motion and waiting, and quantify what a small change is actually worth, without expensive software or a stopwatch ceremony.",
    audience:
      "Process engineers, team leaders, continuous improvement specialists and anyone responsible for line productivity.",
    whatYouLearn: [
      "How to observe a task without your presence changing the result",
      "Separating value-add, necessary non-value-add, and pure waste",
      "Turning observed motion into a number management understands",
      "Where to look first — the motion waste that's almost always there",
    ],
    duration: "60 minutes",
    language: "Romanian",
    status: "upcoming",
  },
  {
    slug: "problem-solving-a3",
    title: "Problem Solving with A3 Thinking",
    shortDesc:
      "Stop fighting the same problem every month. Get to real root cause on one page — 5 Whys and A3, the way it's used on the floor.",
    longDesc:
      "Most 'solved' problems come back because the team fixed the symptom, not the cause. A3 thinking is the structure that stops that — the whole story of a problem, from condition to countermeasure, on a single page. In this free online workshop you'll see how a real A3 is built, where 5 Whys goes wrong, and how to define a problem so clearly that the root cause becomes obvious.",
    audience:
      "Engineers, quality managers, team leaders and production managers tired of recurring problems.",
    whatYouLearn: [
      "The A3 structure — from problem to countermeasure on one page",
      "5 Whys and Ishikawa without the usual dead ends",
      "How to define a problem so the root cause reveals itself",
      "Verifying a fix actually held — and preventing recurrence",
    ],
    duration: "75 minutes",
    language: "Romanian",
    status: "upcoming",
  },
  {
    slug: "ai-for-beginners-manufacturing",
    title: "AI for Beginners — for People Who Run Factories",
    shortDesc:
      "No hype, no code. What AI can realistically do for a manufacturing operation today — and where it's still just a buzzword.",
    longDesc:
      "AI is either the answer to everything or a scam, depending on who's selling. The truth is more useful and more boring. This free online workshop is a plain-language tour for operations people: what these tools actually are, the handful of things they're genuinely good at on a shop floor, where they fail, and how to try one this week without a data science team or a budget approval.",
    audience:
      "Plant managers, operations managers, engineers and team leaders curious about AI but allergic to hype.",
    whatYouLearn: [
      "What 'AI' actually means in plain operational language",
      "Real, low-risk use cases for a manufacturing operation today",
      "Where AI fails — and the questions that expose vendor hype",
      "One small experiment you can run this week with no budget",
    ],
    duration: "60 minutes",
    language: "Romanian",
    status: "upcoming",
  },
];

export function getWorkshop(slug: string): WorkshopEntry | undefined {
  return WORKSHOPS.find((w) => w.slug === slug);
}

export const upcomingWorkshops = (): WorkshopEntry[] =>
  WORKSHOPS.filter((w) => w.status === "upcoming");

export const pastWorkshops = (): WorkshopEntry[] =>
  WORKSHOPS.filter((w) => w.status === "past");
