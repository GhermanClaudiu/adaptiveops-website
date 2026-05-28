"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

type Cell = {
  id: number;
  value: number | null;
  isJunk: boolean;
  dirty: boolean;
  rotate: number;
  muted: boolean;
  defect: boolean;
  zone: number;
  marked: boolean;
};

type StepId = "without" | "sort" | "order" | "shine" | "standardize" | "sustain";
type Kind = "find" | "sort" | "shine" | "sustain" | "standardize";
type Phase = "intro" | "playing" | "stepDone" | "finished";

const TARGET = 50;
const ROUND_TIME = 30;

const NEXT: Record<StepId, StepId | "finished"> = {
  without: "sort",
  sort: "order",
  order: "shine",
  shine: "standardize",
  standardize: "sustain",
  sustain: "finished",
};

const STEP: Record<StepId, { kind: Kind; tag: string; instruction: string; timed: boolean }> = {
  without: { kind: "find", tag: "Round 1 · Without 5S", instruction: "Find 1 → 50 in order, as fast as you can.", timed: true },
  sort: { kind: "sort", tag: "1S · Sort (Seiri)", instruction: "Red-tag the clutter: click every number above 50 to remove it.", timed: true },
  order: { kind: "find", tag: "2S · Set in Order — replay", instruction: "Find 1 → 50 again. Notice the difference.", timed: true },
  shine: { kind: "shine", tag: "3S · Shine (Seiso)", instruction: "Clean & inspect: click every number that's faded or struck-through.", timed: true },
  standardize: { kind: "standardize", tag: "4S · Standardize (Seiketsu)", instruction: "The range is now color-coded into zones — a visual standard anyone can follow.", timed: false },
  sustain: { kind: "sustain", tag: "5S · Sustain (Shitsuke)", instruction: "Audit the area: click anything abnormal — a defect that crept back in.", timed: true },
};

const FIVE_S: { id: StepId; s: string; name: string; dot: string; principle: string }[] = [
  { id: "sort", s: "1S", name: "Sort (Seiri)", dot: "bg-accent", principle: "Remove what you don't need. “When in doubt, move it out.”" },
  { id: "order", s: "2S", name: "Set in Order (Seiton)", dot: "bg-secondary", principle: "A place for everything, and everything in its place." },
  { id: "shine", s: "3S", name: "Shine (Seiso)", dot: "bg-accent", principle: "Clean and inspect — cleaning is how you find problems early." },
  { id: "standardize", s: "4S", name: "Standardize (Seiketsu)", dot: "bg-secondary", principle: "Make the rules visual and easy to follow — color-coding, signage." },
  { id: "sustain", s: "5S", name: "Sustain (Shitsuke)", dot: "bg-accent", principle: "Audit regularly so abnormal conditions are obvious at a glance." },
];

const ZONE_BG = ["bg-accent/15", "bg-secondary/15", "bg-accent/25", "bg-secondary/25", "bg-primary/10"];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function range(from: number, to: number): number[] {
  return Array.from({ length: to - from + 1 }, (_, i) => from + i);
}
function pick<T>(arr: T[], n: number): T[] {
  return shuffle(arr).slice(0, n);
}

function chaos(): Cell[] {
  const vals = shuffle([...range(1, TARGET), ...range(51, 100)]);
  return vals.map((v, i) => ({
    id: i,
    value: v,
    isJunk: v > 50,
    dirty: Math.random() < 0.18,
    rotate: Math.random() < 0.3 ? Math.round(Math.random() * 24 - 12) : 0,
    muted: Math.random() < 0.15,
    defect: false,
    zone: Math.floor(((v - 1) % 50) / 10),
    marked: false,
  }));
}

function ordered(opts: { dirty?: boolean; defects?: boolean }): Cell[] {
  const cells: Cell[] = [];
  for (let i = 0; i < 100; i++) {
    const v = i < TARGET ? i + 1 : null;
    cells.push({
      id: i,
      value: v,
      isJunk: false,
      dirty: false,
      rotate: 0,
      muted: false,
      defect: false,
      zone: v ? Math.floor((v - 1) / 10) : 0,
      marked: false,
    });
  }
  if (opts.dirty) {
    pick(range(0, TARGET - 1), 12).forEach((idx) => {
      cells[idx].dirty = true;
      cells[idx].rotate = Math.random() < 0.5 ? Math.round(Math.random() * 20 - 10) : 0;
    });
  }
  if (opts.defects) {
    pick(range(0, TARGET - 1), 5).forEach((idx, k) => {
      cells[idx].defect = true;
      const t = k % 3;
      if (t === 0) {
        cells[idx].value = 51 + Math.floor(Math.random() * 49); // clutter crept back
        cells[idx].isJunk = true;
      } else if (t === 1) {
        cells[idx].dirty = true; // not cleaned
        cells[idx].rotate = Math.round(Math.random() * 18 - 9);
      } else {
        cells[idx].value = ((idx + 7) % TARGET) + 1; // duplicate / wrong number
      }
    });
  }
  return cells;
}

export default function FiveSGame() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [step, setStep] = useState<StepId>("without");
  const [cells, setCells] = useState<Cell[]>([]);
  const [nextNumber, setNextNumber] = useState(1);
  const [progress, setProgress] = useState(0);
  const [stepTotal, setStepTotal] = useState(0);
  const [timeLeft, setTimeLeft] = useState(ROUND_TIME);
  const [results, setResults] = useState({
    without: null as number | null,
    sort: null as number | null,
    sortTotal: 0,
    order: null as number | null,
    shine: null as number | null,
    shineTotal: 0,
    standardize: false,
    sustain: null as number | null,
    sustainTotal: 0,
  });

  const startStep = useCallback((s: StepId) => {
    let c: Cell[];
    if (s === "without" || s === "sort") c = chaos();
    else if (s === "order") c = ordered({});
    else if (s === "shine") c = ordered({ dirty: true });
    else if (s === "sustain") c = ordered({ defects: true });
    else c = ordered({}); // standardize
    let total = 0;
    if (s === "sort") total = c.filter((x) => x.isJunk).length;
    else if (s === "shine") total = c.filter((x) => x.dirty).length;
    else if (s === "sustain") total = c.filter((x) => x.defect).length;
    setCells(c);
    setStep(s);
    setNextNumber(1);
    setProgress(0);
    setStepTotal(total);
    setTimeLeft(ROUND_TIME);
    setPhase("playing");
  }, []);

  const finishStep = useCallback(
    (value: number) => {
      setResults((r) => {
        switch (step) {
          case "without": return { ...r, without: value };
          case "sort": return { ...r, sort: value, sortTotal: stepTotal };
          case "order": return { ...r, order: value };
          case "shine": return { ...r, shine: value, shineTotal: stepTotal };
          case "standardize": return { ...r, standardize: true };
          case "sustain": return { ...r, sustain: value, sustainTotal: stepTotal };
          default: return r;
        }
      });
      setPhase("stepDone");
    },
    [step, stepTotal],
  );

  // Countdown (timed steps only)
  useEffect(() => {
    if (phase !== "playing" || !STEP[step].timed || timeLeft <= 0) return;
    const id = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(id);
  }, [phase, step, timeLeft]);

  // Time's up
  useEffect(() => {
    if (phase === "playing" && STEP[step].timed && timeLeft === 0) {
      finishStep(STEP[step].kind === "find" ? Math.max(0, nextNumber - 1) : progress);
    }
  }, [phase, step, timeLeft, nextNumber, progress, finishStep]);

  function mark(id: number) {
    setCells((cs) => cs.map((c) => (c.id === id ? { ...c, marked: true } : c)));
  }

  function onCell(c: Cell) {
    if (phase !== "playing" || c.marked || c.value === null) return;
    const kind = STEP[step].kind;
    if (kind === "find") {
      if (c.value !== nextNumber) return;
      mark(c.id);
      if (c.value === TARGET) finishStep(TARGET);
      else setNextNumber(c.value + 1);
    } else if (kind === "sort") {
      if (!c.isJunk) return;
      mark(c.id);
      const np = progress + 1;
      setProgress(np);
      if (np >= stepTotal) finishStep(np);
    } else if (kind === "shine") {
      if (!c.dirty) return;
      mark(c.id);
      const np = progress + 1;
      setProgress(np);
      if (np >= stepTotal) finishStep(np);
    } else if (kind === "sustain") {
      if (!c.defect) return;
      mark(c.id);
      const np = progress + 1;
      setProgress(np);
      if (np >= stepTotal) finishStep(np);
    }
  }

  function advance() {
    const n = NEXT[step];
    if (n === "finished") setPhase("finished");
    else startStep(n);
  }

  function replay() {
    setResults({
      without: null, sort: null, sortTotal: 0, order: null,
      shine: null, shineTotal: 0, standardize: false, sustain: null, sustainTotal: 0,
    });
    setPhase("intro");
  }

  const kind = STEP[step].kind;
  const metricValue = kind === "find" ? Math.max(0, nextNumber - 1) : progress;
  const metricTotal = kind === "find" ? TARGET : stepTotal;
  const metricLabel = kind === "find" ? "Found" : kind === "sort" ? "Removed" : kind === "shine" ? "Cleaned" : "Caught";
  const lowTime = timeLeft <= 6;

  // ---- cell rendering ----
  function renderCell(c: Cell) {
    // Sort: removed junk disappears
    if (step === "sort" && c.marked) {
      return <div key={c.id} className="aspect-square rounded-md bg-black/[0.025]" aria-hidden="true" />;
    }
    if (c.value === null) {
      return <div key={c.id} className="aspect-square rounded-md bg-black/[0.025]" aria-hidden="true" />;
    }

    const zoneBg = step === "standardize" || step === "sustain" ? ZONE_BG[c.zone] : "bg-white";
    const isDirtyNow = c.dirty && !(step === "shine" && c.marked);

    let stateCls = `${zoneBg} border-gray-200 text-primary`;
    if (kind === "find" && c.marked) stateCls = "bg-secondary border-secondary text-white";
    else if (step === "shine" && c.marked) stateCls = "bg-white border-secondary ring-2 ring-secondary text-primary";
    else if (step === "sustain" && c.marked) stateCls = "bg-secondary/15 border-secondary ring-2 ring-secondary text-primary";

    const noiseCls = `${isDirtyNow ? "line-through text-mid" : ""} ${c.muted && !c.marked ? "text-mid" : ""}`;
    const interactive = step !== "standardize";

    return (
      <button
        key={c.id}
        type="button"
        onClick={() => onCell(c)}
        disabled={!interactive}
        aria-label={`Number ${c.value}`}
        aria-pressed={c.marked}
        className={`aspect-square rounded-md border text-[10px] sm:text-xs md:text-sm font-bold flex items-center justify-center select-none transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:z-10 ${interactive ? "hover:border-accent" : "cursor-default"} ${stateCls} ${noiseCls}`}
        style={c.rotate ? { transform: `rotate(${c.rotate}deg)` } : undefined}
      >
        {c.value}
      </button>
    );
  }

  return (
    <section className="bg-light">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="mb-6">
          <span className="inline-block text-xs font-bold tracking-widest uppercase text-accent mb-3">5S Numbers Game</span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary leading-tight">See what 5S does in 30 seconds.</h1>
        </div>

        {/* INTRO */}
        {phase === "intro" && (
          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 sm:p-9">
            <p className="text-mid leading-relaxed">
              The lean training game we run on the shop floor &mdash; now in your browser. You&apos;ll play the
              <strong className="text-primary"> full 5S</strong>, step by step, starting from a messy workplace.
              First task: find the numbers <strong className="text-primary">1 to 50 in order</strong> in
              <strong className="text-primary"> 30 seconds</strong>.
            </p>
            <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-mid">
              {[
                "1S Sort — clear the clutter",
                "2S Set in Order — give it a home",
                "3S Shine — clean & inspect",
                "4S Standardize — make it visual",
                "5S Sustain — audit & hold the gain",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2.5">
                  <span className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full bg-accent/10 flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => startStep("without")}
              className="mt-7 inline-flex items-center gap-2 bg-accent hover:bg-blue-600 text-white font-semibold px-7 py-3.5 rounded-lg transition-colors active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              Start Round 1
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </button>
          </div>
        )}

        {/* PLAYING */}
        {phase === "playing" && (
          <div>
            <div className="flex items-center justify-between gap-4 mb-2">
              <p className="text-[11px] font-bold tracking-widest uppercase text-mid">{STEP[step].tag}</p>
              {STEP[step].timed && (
                <p className={`text-lg font-bold tabular-nums ${lowTime ? "text-red-500" : "text-primary"}`}>{timeLeft}s</p>
              )}
            </div>

            <div className="flex items-center justify-between gap-4 mb-3">
              <p className="text-base sm:text-lg font-bold text-primary">
                {kind === "find" ? (
                  <>Find: <span className="text-accent">{nextNumber > TARGET ? "✓" : nextNumber}</span></>
                ) : (
                  STEP[step].instruction
                )}
              </p>
              {STEP[step].timed && (
                <p className="text-sm font-bold text-secondary whitespace-nowrap">
                  {metricLabel} {metricValue}/{metricTotal}
                </p>
              )}
            </div>

            {STEP[step].timed && (
              <div className="h-1.5 w-full rounded-full bg-gray-200 overflow-hidden mb-5">
                <div
                  className={`h-full rounded-full transition-[width] duration-1000 ease-linear ${lowTime ? "bg-red-500" : "bg-accent"}`}
                  style={{ width: `${(timeLeft / ROUND_TIME) * 100}%` }}
                />
              </div>
            )}

            {step === "standardize" && (
              <p className="text-mid text-sm leading-relaxed mb-5 max-w-2xl">{STEP[step].instruction}</p>
            )}

            <div className="grid grid-cols-10 gap-1 sm:gap-1.5">{cells.map(renderCell)}</div>

            {kind === "find" && (
              <p className="mt-4 text-xs text-mid text-center">
                Click the numbers in order. You&apos;re looking for{" "}
                <span className="font-bold text-primary">{nextNumber > TARGET ? "done" : nextNumber}</span>.
              </p>
            )}

            {step === "standardize" && (
              <button
                type="button"
                onClick={() => finishStep(1)}
                className="mt-6 inline-flex items-center gap-2 bg-accent hover:bg-blue-600 text-white font-semibold px-7 py-3.5 rounded-lg transition-colors active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              >
                Lock in the standard
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </button>
            )}
          </div>
        )}

        {/* STEP DONE */}
        {phase === "stepDone" && <StepDone step={step} results={results} onAdvance={advance} />}

        {/* FINISHED */}
        {phase === "finished" && <Finished results={results} onReplay={replay} />}
      </div>
    </section>
  );
}

// ---- Step transition card ----
function StepDone({
  step,
  results,
  onAdvance,
}: {
  step: StepId;
  results: { without: number | null; sort: number | null; sortTotal: number; order: number | null; shine: number | null; shineTotal: number; sustain: number | null; sustainTotal: number };
  onAdvance: () => void;
}) {
  const done: Record<StepId, { result: string; nextDot: string; nextTitle: string; nextDesc: string; button: string } | { result: string; last: true }> = {
    without: {
      result: `You reached ${results.without} of 50 in the mess.`,
      nextDot: "bg-accent",
      nextTitle: "Now apply 1S · Sort",
      nextDesc: "Red-tag and remove what you don't need — every number above 50. Less to scan, less to trip over.",
      button: "Apply Sort →",
    },
    sort: {
      result: `Cleared ${results.sort} of ${results.sortTotal} clutter items.`,
      nextDot: "bg-secondary",
      nextTitle: "Now apply 2S · Set in Order",
      nextDesc: "Give the 50 you kept a logical home, in order. A place for everything — instant to find.",
      button: "Set in Order →",
    },
    order: {
      result: `You reached ${results.order} of 50 — same task, same clock.`,
      nextDot: "bg-accent",
      nextTitle: "Now apply 3S · Shine",
      nextDesc: "Clean and inspect. Find the items that are damaged or unclear and put them right.",
      button: "Start Shine →",
    },
    shine: {
      result: `Cleaned ${results.shine} of ${results.shineTotal} damaged items.`,
      nextDot: "bg-secondary",
      nextTitle: "Now apply 4S · Standardize",
      nextDesc: "Make the rules visual so anyone can keep it — color-coded zones, signage, simple standards.",
      button: "Standardize →",
    },
    standardize: {
      result: "Standard locked in — the workplace is now color-coded into zones.",
      nextDot: "bg-accent",
      nextTitle: "Now apply 5S · Sustain",
      nextDesc: "Audit the area. Spot the abnormal conditions before they spread — that's how the gains hold.",
      button: "Start the audit →",
    },
    sustain: { result: `Audit complete — you caught ${results.sustain} of ${results.sustainTotal} defects.`, last: true },
  };

  const d = done[step];
  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 sm:p-9">
      <p className="text-[11px] font-bold tracking-widest uppercase text-mid mb-2">{STEP[step].tag} · result</p>
      <h2 className="text-2xl sm:text-3xl font-bold text-primary leading-snug">{d.result}</h2>

      {"last" in d ? (
        <>
          <p className="mt-3 text-mid leading-relaxed">All five S&apos;s done. Here&apos;s what the system did to your score.</p>
          <button
            type="button"
            onClick={onAdvance}
            className="mt-7 inline-flex items-center gap-2 bg-accent hover:bg-blue-600 text-white font-semibold px-7 py-3.5 rounded-lg transition-colors active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          >
            See your results
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </button>
        </>
      ) : (
        <>
          <div className="mt-6 rounded-xl bg-light border border-gray-100 p-5">
            <div className="flex items-center gap-2.5 mb-2">
              <span className={`w-2.5 h-2.5 rounded-full ${d.nextDot}`} />
              <p className="text-sm font-bold tracking-widest uppercase text-primary">{d.nextTitle}</p>
            </div>
            <p className="text-mid leading-relaxed text-sm">{d.nextDesc}</p>
          </div>
          <button
            type="button"
            onClick={onAdvance}
            className="mt-7 inline-flex items-center gap-2 bg-accent hover:bg-blue-600 text-white font-semibold px-7 py-3.5 rounded-lg transition-colors active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          >
            {d.button}
          </button>
        </>
      )}
    </div>
  );
}

// ---- Finished screen ----
function Finished({
  results,
  onReplay,
}: {
  results: { without: number | null; sort: number | null; sortTotal: number; order: number | null; shine: number | null; shineTotal: number; standardize: boolean; sustain: number | null; sustainTotal: number };
  onReplay: () => void;
}) {
  const metricFor = (id: StepId): string => {
    switch (id) {
      case "sort": return `Cleared ${results.sort}/${results.sortTotal} clutter items`;
      case "order": return `Found ${results.order}/50 — instantly`;
      case "shine": return `Cleaned ${results.shine}/${results.shineTotal} damaged items`;
      case "standardize": return "Zones color-coded — standard locked in";
      case "sustain": return `Caught ${results.sustain}/${results.sustainTotal} defects in the audit`;
      default: return "";
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 sm:p-9">
        <h2 className="text-xl sm:text-2xl font-bold text-primary">Your score, before vs after 5S</h2>
        <p className="mt-2 text-mid leading-relaxed">
          Same task, same 30-second clock. In the mess you reached{" "}
          <strong className="text-primary">{results.without}</strong>. After Sort and Set in Order,{" "}
          <strong className="text-primary">{results.order}</strong>. That&apos;s not a faster person &mdash; it&apos;s a
          better system. 5S does exactly this to a real shop floor.
        </p>

        <div className="mt-7 grid grid-cols-2 gap-4 max-w-md">
          {(
            [
              { label: "Without 5S", value: results.without, color: "bg-mid" },
              { label: "After 5S", value: results.order, color: "bg-secondary" },
            ] as const
          ).map((b) => (
            <div key={b.label} className="flex flex-col items-center">
              <div className="w-full h-32 sm:h-40 bg-light rounded-lg flex items-end overflow-hidden">
                <div className={`w-full ${b.color} rounded-t-lg transition-[height] duration-700 ease-out`} style={{ height: `${((b.value ?? 0) / TARGET) * 100}%` }} />
              </div>
              <p className="mt-2 text-2xl font-black text-primary tabular-nums">{b.value}</p>
              <p className="text-[11px] font-semibold tracking-wide uppercase text-mid text-center leading-tight">{b.label}</p>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={onReplay}
          className="mt-7 inline-flex items-center gap-2 border border-gray-300 text-primary font-semibold px-6 py-3 rounded-lg hover:bg-light transition-colors active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0 1 12.8-5.3L21 9m0 0V4.5M21 9h-4.5" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12a7.5 7.5 0 0 1-12.8 5.3L3 15m0 0v4.5M3 15h4.5" />
          </svg>
          Play again
        </button>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 sm:p-9">
        <h2 className="text-xl sm:text-2xl font-bold text-primary">Your 5S run</h2>
        <p className="mt-2 text-mid leading-relaxed">Each step you played, and the principle behind it.</p>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {FIVE_S.map((f) => (
            <div key={f.id} className="rounded-xl border border-gray-100 bg-light p-5">
              <div className="flex items-center gap-2.5 mb-1.5">
                <span className={`w-2.5 h-2.5 rounded-full ${f.dot}`} />
                <p className="text-sm font-bold text-primary">
                  <span className="text-mid">{f.s} ·</span> {f.name}
                </p>
              </div>
              <p className="text-xs font-semibold text-secondary mb-1.5">{metricFor(f.id)}</p>
              <p className="text-sm text-mid leading-relaxed">{f.principle}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-primary rounded-2xl p-6 sm:p-9 relative overflow-hidden">
        <div className="absolute -top-1/4 -right-10 w-64 h-64 bg-accent/10 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
        <div className="relative">
          <h2 className="text-xl sm:text-2xl font-bold text-white leading-snug">This is a game. On a real floor, the gain is measured in cost.</h2>
          <p className="mt-2 text-white/70 leading-relaxed max-w-xl">
            Want to see where 5S would pay back fastest in your plant? Book a free 30-minute diagnostic call &mdash; you
            keep a concrete next step, even if you don&apos;t hire us.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-blue-600 text-white font-semibold px-7 py-3.5 rounded-lg transition-colors active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
            >
              Book a free diagnostic call
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
            <Link
              href="/resources/level-5-targeting"
              className="inline-flex items-center gap-1.5 text-white/85 hover:text-white font-medium transition-colors py-2 px-1 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
            >
              Try the Level 5 Targeting tool &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
