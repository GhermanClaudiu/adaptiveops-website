import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import FadeUp from "@/components/shared/FadeUp";
import LogoWall from "@/components/home/LogoWall";
import JsonLd from "@/components/shared/JsonLd";

const ACADEMY_URL = "https://academy.adaptiveops.eu/";

export const metadata: Metadata = {
  title: "Academy",
  description:
    "Practice operational reflexes 15 minutes a day. 16 problem-solving methods, AI coach on real scenarios, Dreyfus skill matrix. The AdaptiveOps Academy.",
  alternates: { canonical: "/academy" },
  openGraph: {
    title: "Academy — AdaptiveOps",
    description:
      "Where you practice operational reflexes — 15 minutes a day. 16 problem-solving methods with AI coaching on real scenarios.",
    url: "/academy",
  },
  twitter: {
    card: "summary_large_image",
    title: "Academy — AdaptiveOps",
    description:
      "Practice operational reflexes 15 minutes a day. AI coaching on real production scenarios.",
    images: ["/og-image.png"],
  },
};

const howItWorks = [
  {
    step: "01",
    title: "Real cases from your last 7 days",
    description:
      "Each engineer brings a case from their actual production week — parts on hold, first-off at 02:30, escalation on shift. Bringing a case per week is mandatory. No textbook scenarios.",
  },
  {
    step: "02",
    title: "25 minutes per engineer per week",
    description:
      "Each of the 8 participants spends 25 min/week on the platform applying the method to their case. Low overhead, high repetition. The reflex builds through volume, not duration.",
  },
  {
    step: "03",
    title: "AI coach asks the Socratic questions",
    description:
      "A Claude-based conversational coach plays the role of facilitator. It does not give the answer. It requests evidence, flags skipped steps, and corrects the engineer in real time — exactly when they would normally call a colleague on gut feel.",
  },
  {
    step: "04",
    title: "Compare against the real plant decision",
    description:
      "Each case is compared to the actual decision made in the plant that week. The engineer sees where the method would have led them — and where their actual decision deviated.",
  },
];

const clusters = [
  {
    id: "fundamentals",
    title: "Problem Solving — Fundamentals",
    tagline:
      "The daily toolkit: define, scope, diagnose, prioritise, dig to root cause, close the loop with an experiment.",
    methods: [
      {
        name: "Problem Statement",
        outcome: "Frame the problem in one sentence — specific, measurable, no hidden cause, no hidden solution",
        source: "Kepner-Tregoe / Lean Six Sigma",
      },
      {
        name: "5 Why",
        outcome: "Stop at root cause, not at symptoms — with evidence at each step",
        source: "Toyota Production System",
      },
      {
        name: "Is / Is Not",
        outcome: "Eliminate noise by contrasting what IS the problem against what isn't",
        source: "Kepner-Tregoe",
      },
      {
        name: "Fishbone (Ishikawa)",
        outcome: "Map all 6M cause categories before jumping to conclusions",
        source: "Kaoru Ishikawa",
      },
      {
        name: "Pareto Analysis",
        outcome: "Find the 20% of causes driving 80% of the pain",
        source: "Joseph Juran",
      },
      {
        name: "Gap Analysis",
        outcome: "Quantify exactly how far you are from where you need to be — on multiple dimensions",
        source: "Lean Management",
      },
      {
        name: "PDCA",
        outcome: "Test improvements in small cycles — without betting the whole line on one big change",
        source: "W. Edwards Deming",
      },
    ],
    accent: "#2F80ED",
    startsWith: "Problem Statement & 5 Why",
  },
  {
    id: "synthesis",
    title: "Problem Solving — Synthesis & Communication",
    tagline:
      "Distill root-cause work into a format management, customers or your team can absorb.",
    methods: [
      {
        name: "A3 Thinking",
        outcome: "Tell the entire problem story on one page — that management actually reads",
        source: "John Shook — Managing to Learn",
      },
      {
        name: "8D Problem Solving",
        outcome: "Respond to a customer complaint in 8 disciplined steps with a cross-functional team",
        source: "Ford Motor Company",
      },
      {
        name: "Structured Retrospective",
        outcome: "Run a blame-free post-event analysis the team will actually engage with",
        source: "Norm Kerth — Agile Retrospectives",
      },
    ],
    accent: "#10B981",
  },
  {
    id: "risk",
    title: "Problem Solving — Risk & Prevention",
    tagline:
      "Anticipate instead of react. The tools used by professionals in quality, safety and critical operations.",
    methods: [
      {
        name: "FMEA",
        outcome: "Spot failure modes before they reach production — Severity × Occurrence × Detection",
        source: "AIAG FMEA Manual",
      },
      {
        name: "Fault Tree Analysis (FTA)",
        outcome: "Work backwards from the unwanted event to all combinations of causes that produce it",
        source: "Bell Labs (IEC 61025)",
      },
      {
        name: "Kepner-Tregoe",
        outcome: "Separate situation, problem, decision and risk into 4 distinct thought processes",
        source: "Charles Kepner & Benjamin Tregoe",
      },
    ],
    accent: "#E65100",
  },
  {
    id: "systems",
    title: "Problem Solving — Systems & Leadership",
    tagline:
      "Systems thinking plus leading a team through process. For those who shape the thinking of others — not just their own.",
    methods: [
      {
        name: "Structured RCA",
        outcome: "Pick the right tool and validate cause across physical, human and systemic dimensions",
        source: "Dean Gano — Apollo RCA",
      },
      {
        name: "Systems Thinking",
        outcome: "See circular causality and the leverage points where small changes have outsized effect",
        source: "Peter Senge — The Fifth Discipline",
      },
      {
        name: "Problem Solving Facilitation",
        outcome: "Lead a team through analysis while staying neutral on content, active on process",
        source: "Roger Schwarz — The Skilled Facilitator",
      },
    ],
    accent: "#8B5CF6",
  },
];

const dreyfusLevels = [
  { level: 1, name: "Novice", how: "First sessions practised on the platform" },
  { level: 2, name: "Advanced Beginner", how: "Apply the method with guidance" },
  { level: 3, name: "Competent", how: "Lead a complete analysis independently, correctly" },
  { level: 4, name: "Proficient", how: "Validated by a human coach / mentor inside your organisation" },
  { level: 5, name: "Expert", how: "Real experience demonstrated in the field" },
];

const whyItWorks = [
  {
    title: "You practise — you don't memorise",
    description:
      "The skill is built through guided practice on real situations, not by watching slides pass by.",
  },
  {
    title: "Coach available anytime",
    description:
      "The AI coach doesn't get tired, doesn't judge, and is available at 2am — when the line stop actually happens.",
  },
  {
    title: "Content from real practice",
    description:
      "Every method comes from books and standards used daily in factories and operations teams — not generic theory.",
  },
  {
    title: "Visible, verifiable progress",
    description:
      "The competence matrix shows clearly where you are and what's next — for you and for your organisation.",
  },
  {
    title: "Bilingual (RO / EN)",
    description: "Content and coaching in your language.",
  },
];

export default function AcademyPage() {
  return (
    <main>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "EducationalOrganization",
          name: "AdaptiveOps Academy",
          url: ACADEMY_URL,
          description:
            "A micro-learning platform for operational skills with AI coaching on real production scenarios. Problem solving, quality, lean and operations methods.",
          parentOrganization: { "@type": "Organization", name: "AdaptiveOps" },
        }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-primary py-20 lg:py-28">
        <div className="absolute inset-0 opacity-[0.05]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="gridAcademy" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#gridAcademy)" />
          </svg>
        </div>
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            {/* Live trigger — clickable badge proving the platform exists. Solid amber colour + whole-pill pulse for high visibility on dark navy. Hover halts the pulse so the user can read and click without distraction. */}
            <a
              href={ACADEMY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mb-3 px-4 py-2 bg-amber-400 hover:bg-amber-300 border-2 border-amber-500 rounded-full shadow-[0_0_24px_rgba(251,191,36,0.5)] hover:shadow-[0_0_36px_rgba(251,191,36,0.7)] animate-pulse hover:animate-none transition-all focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
            >
              <span className="relative flex w-2 h-2">
                <span className="absolute inline-flex w-full h-full rounded-full bg-amber-900 opacity-60 animate-ping" />
                <span className="relative inline-flex w-2 h-2 rounded-full bg-amber-900" />
              </span>
              <span className="text-[11px] font-black tracking-widest uppercase text-amber-950">
                Live now &middot; academy.adaptiveops.eu
              </span>
              <svg className="w-3.5 h-3.5 text-amber-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
              <span className="sr-only">(opens academy.adaptiveops.eu in new tab)</span>
            </a>
            <span className="block text-xs font-bold tracking-widest uppercase text-accent mb-4">
              AdaptiveOps Academy &middot; 12-Week Pilot Program for Plants
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight max-w-3xl">
              Build the Quality Reflex Your Engineers{" "}
              <span className="text-accent">Don&apos;t Get From Training.</span>
            </h1>
          </FadeUp>
          <FadeUp delay={100}>
            <p className="mt-5 text-lg text-white/75 max-w-2xl leading-relaxed">
              Your engineers know 8D and Six Sigma in theory. The question is whether they apply IS/IS NOT, 5 Why and Pareto Friday at 16:30 when a batch of parts is on quality hold and the decision can&apos;t wait. Academy makes the method a <strong className="text-white">reflex</strong> &mdash; not a poster.
            </p>
          </FadeUp>
          <FadeUp delay={200}>
            <p className="mt-6 text-sm text-white/70 tracking-wide">
              12 weeks &nbsp;&middot;&nbsp; 8 engineers from your plant &nbsp;&middot;&nbsp; 25 min/week per engineer &nbsp;&middot;&nbsp; your real production cases &nbsp;&middot;&nbsp; RO &amp; EN
            </p>
          </FadeUp>
          <FadeUp delay={300}>
            <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <Link
                href="/contact?service=academy"
                className="inline-block bg-accent text-white font-semibold px-8 py-4 rounded-full text-base whitespace-nowrap transition-shadow hover:shadow-[0_0_24px_rgba(47,128,237,0.5)] active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
              >
                Apply for 2026 Cohort
              </Link>
              <a
                href="#pilot"
                className="inline-flex items-center gap-1.5 text-white/70 hover:text-white font-medium transition-colors text-sm py-2 px-1 -mx-1 rounded focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
              >
                See pricing &amp; structure &darr;
              </a>
            </div>
          </FadeUp>
          <FadeUp delay={400}>
            <ul className="mt-6 space-y-2 text-sm text-white/75">
              <li className="flex items-start gap-2.5">
                <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <span>20% escrow until 90 days post-program &mdash; refunded proportionally if criteria not met</span>
              </li>
              <li className="flex items-start gap-2.5">
                <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <span>4 measurable success criteria &mdash; signed by Plant Manager before start</span>
              </li>
              <li className="flex items-start gap-2.5">
                <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <span>First step: 90-min discovery with Quality Director &mdash; zero financial commitment, written go/no-go output</span>
              </li>
            </ul>
          </FadeUp>
        </div>
      </section>

      {/* Trust strip — reused from home for consistency */}
      <LogoWall />

      {/* The context — why training isn't enough */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <div className="text-center mb-12">
              <span className="inline-block text-xs font-bold tracking-widest uppercase text-accent mb-3">
                The context
              </span>
              <h2 className="text-2xl md:text-4xl font-bold text-primary mb-4">
                Your engineers know the methodology. The problem isn&apos;t there.
              </h2>
              <p className="text-mid text-lg max-w-3xl mx-auto leading-relaxed">
                They&apos;ve done Six Sigma, 8D, Black Belt. The problem shows up Friday at 16:30, when they have to decide in 30 minutes what to do with a batch of parts on quality hold &mdash; and they do it by calling two colleagues, on gut feel. The methods learned in training don&apos;t enter the reflex. They stay on the poster.
              </p>
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Training without repetition",
                detail: "3 days of training is not enough to build a reflex. Without weekly practice on real cases, the method fades within weeks.",
              },
              {
                title: "No corrector under pressure",
                detail: "The classroom example is clean. The actual Friday 16:30 case has missing data, political pressure, and a clock. Different beast.",
              },
              {
                title: "Cases prepared from home don't train pressure",
                detail: "Real cases from the last 7 days — with their ambiguity and time pressure — are what builds the reflex. Textbook cases don't.",
              },
            ].map((p) => (
              <FadeUp key={p.title}>
                <div className="bg-light rounded-2xl p-6 border border-gray-100 h-full">
                  <div className="w-10 h-10 rounded-lg bg-red-50 border border-red-100 flex items-center justify-center mb-4">
                    <svg className="w-5 h-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <h3 className="text-primary font-bold text-base mb-2">{p.title}</h3>
                  <p className="text-mid text-sm leading-relaxed">{p.detail}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* See Academy in Action — real platform screenshots */}
      <section className="py-20 bg-primary">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <div className="text-center mb-10">
              <span className="inline-block text-xs font-bold tracking-widest uppercase text-accent mb-3">
                See Academy in action
              </span>
              <h2 className="text-2xl md:text-4xl font-bold text-white mb-3">
                Your dashboard. Real progress. Live now.
              </h2>
              <p className="text-white/75 text-base md:text-lg max-w-2xl mx-auto">
                Not a mockup. A screenshot from a live Academy user &mdash; overall progress, learning streak, activity log and cluster-level skill tracking.
              </p>
            </div>
          </FadeUp>
          <FadeUp delay={150}>
            <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-white">
              <Image
                src="/images/academy/dashboard.png"
                alt="AdaptiveOps Academy dashboard showing overall progress, learning streak, recent activity and progress per cluster"
                width={1920}
                height={1080}
                className="w-full h-auto"
              />
            </div>
          </FadeUp>
          <FadeUp delay={250}>
            <p className="mt-5 text-center text-xs text-white/70 tracking-wide">
              Live dashboard &middot; AdaptiveOps Academy &middot; academy.adaptiveops.eu
            </p>
          </FadeUp>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-20 bg-light scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <div className="text-center mb-14">
              <span className="inline-block text-xs font-bold tracking-widest uppercase text-accent mb-3">
                How the 12-week program works
              </span>
              <h2 className="text-2xl md:text-4xl font-bold text-primary mb-4">
                Real cases. Real time pressure. Real corrector.
              </h2>
              <p className="text-mid text-lg max-w-2xl mx-auto">
                The whole point is to build the reflex your engineers use Friday at 16:30 &mdash; not the slide deck they remember from training. Four steps. Per case. Per week.
              </p>
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {howItWorks.map((s, i) => (
              <FadeUp key={s.step} delay={i * 80}>
                <div className="bg-white border border-gray-100 rounded-xl p-6 h-full flex flex-col shadow-sm">
                  <p className="text-3xl font-black text-accent leading-none mb-3">{s.step}</p>
                  <h3 className="text-base font-bold text-primary mb-2 leading-snug">{s.title}</h3>
                  <p className="text-sm text-mid leading-relaxed">{s.description}</p>
                </div>
              </FadeUp>
            ))}
          </div>

          {/* Dreyfus progression — inline + real skill matrix preview */}
          <FadeUp delay={400}>
            <div className="mt-14 bg-primary rounded-2xl p-7 lg:p-8">
              <div className="flex items-baseline justify-between flex-wrap gap-3 mb-6">
                <h3 className="text-lg md:text-xl font-bold text-white">
                  Progression on the Dreyfus scale &mdash; 5 levels
                </h3>
                <span className="text-xs text-white/65 tracking-wide">
                  Levels 1&ndash;3 tracked automatically &nbsp;&middot;&nbsp; 4&ndash;5 confirmed by a human evaluator
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 mb-7">
                {dreyfusLevels.map((d) => (
                  <div key={d.level} className="bg-white/[0.06] border border-white/10 rounded-lg p-4">
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-2xl font-black text-accent leading-none">{d.level}</span>
                      <span className="text-sm font-bold text-white leading-tight">{d.name}</span>
                    </div>
                    <p className="text-[11px] text-white/70 leading-relaxed">{d.how}</p>
                  </div>
                ))}
              </div>

              {/* Real skill matrix screenshot */}
              <div className="rounded-xl overflow-hidden border border-white/10 bg-white">
                <Image
                  src="/images/academy/skill-matrix.png"
                  alt="AdaptiveOps Academy skill matrix showing Dreyfus progress per method across the Problem Solving Fundamentals cluster"
                  width={1920}
                  height={900}
                  className="w-full h-auto"
                />
              </div>
              <p className="mt-4 text-center text-xs text-white/70 tracking-wide">
                Live skill matrix &middot; colour code: green &ge;67% &middot; yellow 33&ndash;66% &middot; red &lt;33% &middot; gray not started
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Skill clusters — Problem Solving */}
      <section id="clusters" className="py-20 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <div className="text-center mb-10">
              <span className="inline-block text-xs font-bold tracking-widest uppercase text-accent mb-3">
                Problem Solving cluster &middot; available now
              </span>
              <h2 className="text-2xl md:text-4xl font-bold text-primary mb-4">
                16 methods. 4 clusters. From basics to systems thinking.
              </h2>
              <p className="text-mid text-lg max-w-2xl mx-auto">
                Structured problem solving is not one tool &mdash; it&apos;s a full toolkit. From how you formulate a problem, to preventing defects before they appear, to leading a team through analysis.
              </p>
            </div>
          </FadeUp>

          {/* Real clusters page screenshot */}
          <FadeUp delay={100}>
            <div className="mb-14 rounded-2xl overflow-hidden border border-gray-200 shadow-sm bg-white">
              <Image
                src="/images/academy/clusters.png"
                alt="AdaptiveOps Academy skill clusters page showing the 4 Problem Solving clusters as the buyer sees them in the platform"
                width={1920}
                height={1080}
                className="w-full h-auto"
              />
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {clusters.map((c) => (
              <FadeUp key={c.id}>
                <div
                  className="bg-light rounded-2xl p-6 lg:p-7 h-full flex flex-col border border-gray-100"
                  style={{ borderTopColor: c.accent, borderTopWidth: "3px" }}
                >
                  <h3 className="text-lg font-bold text-primary mb-2 leading-snug">{c.title}</h3>
                  <p className="text-sm text-mid italic leading-relaxed mb-5">{c.tagline}</p>

                  <p className="text-[10px] font-bold tracking-wider uppercase text-primary/70 mb-3">
                    What you walk out able to do
                  </p>
                  <ul className="space-y-3 mb-4 flex-1">
                    {c.methods.map((m) => (
                      <li key={m.name} className="flex items-start gap-2.5">
                        <svg
                          className="w-4 h-4 mt-0.5 flex-shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke={c.accent}
                          strokeWidth={2.5}
                          aria-hidden="true"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                        <div>
                          <p className="text-sm text-dark leading-snug">
                            {m.outcome}
                          </p>
                          <p className="text-[10px] text-mid mt-0.5 uppercase tracking-wider">
                            {m.name} &middot; {m.source}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                  {c.startsWith && (
                    <p className="text-[11px] font-bold uppercase tracking-wider mt-2 pt-3 border-t border-gray-200" style={{ color: c.accent }}>
                      Start with: {c.startsWith}
                    </p>
                  )}
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Why Academy works */}
      <section className="py-20 bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <div className="text-center mb-14">
              <span className="inline-block text-xs font-bold tracking-widest uppercase text-accent mb-3">
                Why it works
              </span>
              <h2 className="text-2xl md:text-4xl font-bold text-primary mb-4">
                Built from real factory practice &mdash; not theory.
              </h2>
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
            {whyItWorks.map((w, i) => (
              <FadeUp key={w.title} delay={i * 70}>
                <div className="bg-white rounded-xl p-5 h-full border border-gray-100 shadow-sm">
                  <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center text-accent mb-3">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <h3 className="text-sm font-bold text-primary mb-2 leading-snug">{w.title}</h3>
                  <p className="text-xs text-mid leading-relaxed">{w.description}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Pilot Program — 3 tiers, pricing, risk reversal, scarcity */}
      <section id="pilot" className="py-20 bg-primary scroll-mt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <div className="text-center mb-12">
              <span className="inline-block text-xs font-bold tracking-widest uppercase text-accent mb-3">
                The pilot program
              </span>
              <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
                Three structures. One clear price. No hidden fees.
              </h2>
              <p className="text-white/75 text-base md:text-lg max-w-2xl mx-auto">
                12 weeks, 8 engineers, the 7 fundamental tools of Cluster 1: Problem Statement &middot; IS/IS NOT &middot; Gap Analysis &middot; Pareto &middot; Fishbone &middot; 5 Why &middot; PDCA.
              </p>
            </div>
          </FadeUp>

          {/* Pricing cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
            <FadeUp delay={80}>
              <div className="bg-white/[0.06] border border-white/10 rounded-2xl p-6 h-full flex flex-col">
                <p className="text-[11px] font-bold tracking-widest uppercase text-white/70 mb-3">Standard</p>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-4xl font-black text-white">&euro;10,000</span>
                </div>
                <p className="text-sm text-white/75 leading-relaxed mb-5 flex-1">
                  12 weeks &middot; 8 engineers &middot; weekly real cases &middot; AI coach &middot; final measurement of cases resolved with the method
                </p>
                <p className="text-[10px] text-white/70 uppercase tracking-wider">Delivered remotely with AI coach + certified internal partner</p>
              </div>
            </FadeUp>
            <FadeUp delay={160}>
              <div className="bg-accent/15 border-2 border-accent rounded-2xl p-6 h-full flex flex-col relative">
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full">
                  Founder on-site
                </span>
                <p className="text-[11px] font-bold tracking-widest uppercase text-accent mb-3 mt-2">With my presence in plant</p>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-4xl font-black text-white">&euro;12,000</span>
                </div>
                <p className="text-sm text-white/85 leading-relaxed mb-5 flex-1">
                  Same as Standard + I come personally once to a real material-decision meeting (sort / derogate / scrap). I observe, don&apos;t intervene, then give direct feedback.
                </p>
                <p className="text-[10px] text-white/70 uppercase tracking-wider">Only 2&ndash;3 of these per year in 2026</p>
              </div>
            </FadeUp>
            <FadeUp delay={240}>
              <div className="bg-white/[0.06] border border-white/10 rounded-2xl p-6 h-full flex flex-col">
                <p className="text-[11px] font-bold tracking-widest uppercase text-white/70 mb-3">Two plants &middot; 12 months</p>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-4xl font-black text-white">&euro;18,000</span>
                </div>
                <p className="text-sm text-white/75 leading-relaxed mb-5 flex-1">
                  Extended scope &mdash; two plants over a full year. Cross-plant comparison and learning loop included.
                </p>
                <p className="text-[10px] text-white/70 uppercase tracking-wider">For groups running multiple sites</p>
              </div>
            </FadeUp>
          </div>

          {/* Risk reversal — the real structure */}
          <FadeUp delay={300}>
            <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-7 lg:p-8 mb-10">
              <p className="text-[11px] font-bold tracking-widest uppercase text-accent mb-4">
                How we protect your investment
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-secondary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white mb-1">20% in escrow until day 90</p>
                    <p className="text-xs text-white/75 leading-relaxed">€2,400 of the standard contract is held in escrow until 90 days after the program closes.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-secondary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white mb-1">4 measurable success criteria</p>
                    <p className="text-xs text-white/75 leading-relaxed">Defined together, signed by the Plant Manager before start. Not vague feelings — auditable numbers.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-secondary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white mb-1">3 of 4 hit &rarr; escrow released</p>
                    <p className="text-xs text-white/75 leading-relaxed">If 3 of 4 criteria are met, the program counts as successful. Otherwise, money returns proportionally + 30 days free for remediation.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-secondary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white mb-1">We don&apos;t start in the wrong window</p>
                    <p className="text-xs text-white/75 leading-relaxed">No program start during an active IATF audit, open customer escalation or peak ramp-up. We find the right window together &mdash; or we tell you it&apos;s not the moment.</p>
                  </div>
                </div>
              </div>
            </div>
          </FadeUp>

          {/* Scarcity */}
          <FadeUp delay={400}>
            <div className="text-center">
              <p className="inline-flex items-center gap-2 text-sm font-semibold text-white/85">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                In 2026 I personally run 2&ndash;3 founder-on-site programs. The rest of the year is delivered via AI coach + certified internal partner.
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* First Step — 90-min discovery */}
      <section className="py-16 bg-light border-y border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <div className="text-center mb-8">
              <span className="inline-block text-xs font-bold tracking-widest uppercase text-accent mb-3">
                The first step
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-3">
                90 minutes with your Quality Director and me.
              </h2>
              <p className="text-mid text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
                We look at your plant&apos;s calendar for the next 12&ndash;16 weeks and identify whether there&apos;s a clean window for the program &mdash; or not. <strong className="text-primary">Zero financial commitment at this step.</strong>
              </p>
            </div>
          </FadeUp>
          <FadeUp delay={150}>
            <div className="bg-white border border-gray-100 rounded-2xl p-6 lg:p-8 shadow-sm">
              <p className="text-[11px] font-bold tracking-widest uppercase text-accent mb-4">
                What we walk out of the discovery with
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 mt-0.5 flex-shrink-0 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  <p className="text-sm text-dark leading-relaxed">
                    <strong className="text-primary">One written page</strong> &mdash; either a proposed start date, or a clear decision that now isn&apos;t the moment.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 mt-0.5 flex-shrink-0 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  <p className="text-sm text-dark leading-relaxed">
                    <strong className="text-primary">Honest assessment</strong> &mdash; if we&apos;re not the right fit, we tell you that and what is.
                  </p>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center gap-4">
                <Link
                  href="/contact?service=academy"
                  className="inline-flex items-center gap-2 bg-accent text-white font-semibold px-8 py-3.5 rounded-full hover:shadow-[0_0_24px_rgba(47,128,237,0.5)] active:scale-[0.98] transition-shadow"
                >
                  Apply for the Discovery
                </Link>
                <p className="text-xs text-mid leading-relaxed">
                  No sales pitch. No proposal on the first call. Just an honest look at whether the window exists.
                </p>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Connection back to consulting / ECO */}
      <section className="py-16 bg-primary/[0.03] border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-12">
              <div className="flex-1">
                <p className="text-xs font-bold tracking-widest uppercase text-accent mb-2">
                  Part of the AdaptiveOps ecosystem
                </p>
                <h3 className="text-xl md:text-2xl font-bold text-primary mb-2">
                  Academy is where you build the reflex. Consulting is where we install it at scale.
                </h3>
                <p className="text-mid text-sm leading-relaxed max-w-2xl">
                  Academy is self-paced practice for individuals and teams. When your plant needs the system installed alongside coaching and digital tools, that&apos;s where direct services and the ECO Platform come in.
                </p>
              </div>
              <div className="flex-shrink-0 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 border border-accent text-accent font-semibold px-5 py-2.5 rounded-full hover:bg-accent hover:text-white transition-colors text-sm whitespace-nowrap"
                >
                  Direct services &rarr;
                </Link>
                <Link
                  href="/solutions#systems"
                  className="inline-flex items-center gap-2 border border-accent text-accent font-semibold px-5 py-2.5 rounded-full hover:bg-accent hover:text-white transition-colors text-sm whitespace-nowrap"
                >
                  ECO Platform &rarr;
                </Link>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-accent py-16">
        <FadeUp>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">
              In 2026, only 2&ndash;3 plants get the founder-on-site version.
            </h2>
            <p className="mt-4 text-lg text-white/90 max-w-xl mx-auto">
              The 90-minute discovery costs nothing. The output is one written page &mdash; a proposed start date or a clear decision that this isn&apos;t the moment.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact?service=academy"
                className="inline-flex items-center gap-2 bg-white text-accent font-semibold px-10 py-4 rounded-full hover:bg-gray-100 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-shadow"
              >
                Apply for the 2026 Cohort
              </Link>
              <a
                href={ACADEMY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-white/85 hover:text-white font-medium transition-colors py-2 px-1 rounded focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-accent"
              >
                See the live platform &rarr;
                <span className="sr-only">(opens in new tab)</span>
              </a>
            </div>
            <p className="mt-6 text-xs text-white/85 tracking-wide">
              Bilingual program (RO &amp; EN) &nbsp;&middot;&nbsp; AI coach on your real cases &nbsp;&middot;&nbsp; escrow-backed success criteria
            </p>
          </div>
        </FadeUp>
      </section>
    </main>
  );
}
