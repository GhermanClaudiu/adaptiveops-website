/**
 * Data-driven registry for the interactive tools on /resources/tools.
 *
 * Adding a new tool = add one entry here (and its page/component). The `slug`
 * doubles as the route segment (/resources/<slug>) AND the `toolSlug` the
 * Academy backend keys usage counters + testimonials by — so a new tool
 * inherits stats + testimonials with zero backend change.
 *
 * Keep `slug` lowercase-kebab (`^[a-z0-9-]{1,64}$`).
 */

export type Tone = "accent" | "secondary";

export interface ToolEntry {
  /** Route segment AND backend toolSlug. */
  slug: string;
  /** Pill label, e.g. "Self-Assessment". */
  category: string;
  /** Pill + visual accent colour. */
  tone: Tone;
  title: string;
  blurb: string;
  /** Link text, e.g. "Open the tool" / "Play the game". */
  cta: string;
  /** The big number on the dark visual panel, e.g. "20%" / "30s". */
  statValue: string;
  /** One line under the big number. */
  statCaption: string;
  /** Eyebrow meta on the visual, e.g. "Free · 15 minutes · No cloud upload". */
  meta: string;
}

export const TOOLS: ToolEntry[] = [
  {
    slug: "level-5-targeting",
    category: "Self-Assessment",
    tone: "accent",
    title: "Level 5 Targeting Self-Assessment",
    blurb:
      "Trace your plant's single financial goal down to the specific processes worth the maturity investment. From Plant Cost Rate to a ranked Level 5 candidate list, owned by named departments.",
    cta: "Open the tool",
    statValue: "20%",
    statCaption:
      "of your processes drive the result. This tool finds which ones deserve Level 5.",
    meta: "Free · 15 minutes · No cloud upload",
  },
  {
    slug: "5s-numbers-game",
    category: "Lean game",
    tone: "secondary",
    title: "The 5S Numbers Game",
    blurb:
      "Find the numbers 1 to 50 in 30 seconds — first in a messy workplace, then after Sort and Set in Order clean it up. Watch your score climb as the system improves, not the person. The training classic, now in your browser.",
    cta: "Play the game",
    statValue: "30s",
    statCaption:
      "is all it takes to feel what 5S does — same task, very different result.",
    meta: "Free · 3 rounds · No signup",
  },
];

export function getTool(slug: string): ToolEntry | undefined {
  return TOOLS.find((t) => t.slug === slug);
}
