"use client";

import { useEffect, useRef } from "react";

/* Markup ported from the standalone tool, restyled to AdaptiveOps tokens.
   The internal topbar is removed (site Header sits above); the report CTA
   points at the internal /contact route. */
const TOOL_HTML = `
<div class="progress" id="l5-progress"><div class="wrap" id="l5-psteps"></div></div>

<section class="panel show" id="p-intro">
  <div class="wrap">
    <div class="eyebrow">Operational Excellence · Level 5 Targeting</div>
    <h1 class="title">Which 20% of your processes actually deserve Level&nbsp;5?</h1>
    <p class="lead">Most plants waste years chasing maturity on processes that don't move the needle. This tool runs the same logic chain we use with clients — from your plant's single financial goal down to the specific processes that deserve the investment.</p>
    <p class="sub">15 minutes. Your numbers stay in your browser until you choose to generate the report. No cloud upload.</p>
    <div class="card">
      <div class="feat"><div class="n">01</div><div><div class="ft">Maturity reality check</div><div class="fd">Rate your processes 0–5. See whether your distribution is healthy — or whether you're over-investing in Level 5 where it won't repay.</div></div></div>
      <div class="feat"><div class="n">02</div><div><div class="ft">Anchor on the one number</div><div class="fd">Plant Cost Rate or EBITDA — the two KRIs a Plant Manager owns. Everything downstream connects back to it.</div></div></div>
      <div class="feat"><div class="n">03</div><div><div class="ft">Decompose to KPIs</div><div class="fd">Identify which operational drivers feed that number, and how far each must move.</div></div></div>
      <div class="feat"><div class="n">04</div><div><div class="ft">Break each KPI to its process indicators</div><div class="fd">Trace each KPI through its formula to the loss component — and the process and department that own it.</div></div></div>
      <div class="feat"><div class="n">05</div><div><div class="ft">Your Level 5 Candidate List</div><div class="fd">A short, ranked list of processes mathematically connected to your goal. The ones worth taking to Level 5.</div></div></div>
    </div>
    <div class="nav-row">
      <span class="sub">Based on the AdaptiveOps operational maturity methodology.</span>
      <button class="btn btn-primary" onclick="l5go('p1')">Start the assessment →</button>
    </div>
  </div>
</section>

<section class="panel" id="p-p1">
  <div class="wrap">
    <div class="eyebrow">Step 1 of 4 · Maturity Reality Check</div>
    <h2 class="title">Where do your processes actually stand?</h2>
    <p class="sub">Rate each process on the 0–5 maturity scale below. Be honest — the value depends on it. A healthy plant runs ~80% at Level 2–3 and only ~20% at Level 4–5.</p>

    <div class="scale-ref">
      <div class="scale-ref-head">The 0–5 maturity scale</div>
      <div class="scale-ref-grid">
        <div class="lvl"><span class="lvl-n">0</span><div class="lvl-body"><div class="lvl-name">Undefined</div><div class="lvl-desc">Runs on individual heroism. No document describes how the process is performed.</div></div></div>
        <div class="lvl"><span class="lvl-n">1</span><div class="lvl-body"><div class="lvl-name">Documented</div><div class="lvl-desc">Exists on paper — but it isn't followed, and the document isn't kept up to date.</div></div></div>
        <div class="lvl"><span class="lvl-n">2</span><div class="lvl-body"><div class="lvl-name">Standardized &amp; controlled</div><div class="lvl-desc">Documents are actually followed. Discipline applied uniformly, not selectively.</div></div></div>
        <div class="lvl"><span class="lvl-n">3</span><div class="lvl-body"><div class="lvl-name">Planned, organized &amp; measured</div><div class="lvl-desc">A coordinated system — KPIs, Daily Management, integration between the tools.</div></div></div>
        <div class="lvl"><span class="lvl-n">4</span><div class="lvl-body"><div class="lvl-name">Visualized &amp; predictable</div><div class="lvl-desc">Legible at a glance. Statistical and proactive — the plant moved from reactive to ahead of the problem.</div></div></div>
        <div class="lvl"><span class="lvl-n">5</span><div class="lvl-body"><div class="lvl-name">Self-regulating</div><div class="lvl-desc">Detects its own deviations and triggers its own corrections — escalation is automatic, not human-initiated.</div></div></div>
      </div>
    </div>

    <div class="card" id="proc-list"></div>
    <div class="nav-row"><button class="btn btn-ghost" onclick="l5go('intro')">← Back</button><button class="btn btn-primary" id="b-p1" onclick="l5go('p2')" disabled>Continue →</button></div>
    <div class="err" id="e-p1">Rate every process to continue.</div>
  </div>
</section>

<section class="panel" id="p-p2">
  <div class="wrap">
    <div class="eyebrow">Step 2 of 4 · The One Number That Matters</div>
    <h2 class="title">Anchor on the KRI you're accountable for.</h2>
    <p class="sub">Plant Cost Rate and EBITDA are the two financial results a Plant Manager owns. Pick one. Whichever you choose, the assessment decomposes the cost lever you control directly.</p>
    <div class="card">
      <div class="field" style="margin-top:0;">
        <label>What is your True North?</label>
        <select class="tn-select" id="tn-type" onchange="l5onTNType()">
          <option value="pcr">Plant Cost Rate — conversion cost per unit (€/unit)</option>
          <option value="ebitda">EBITDA</option>
        </select>
      </div>
      <div id="tn-bridge" class="bridge" style="display:none;">
        <div class="bt">↳ From EBITDA to the lever you control</div>
        <div class="bd">Plant-level EBITDA is driven by three levers: <b>volume / throughput</b>, <b>conversion cost per unit</b>, and <b>working capital</b>. The lever this method decomposes — and the one you control most directly — is conversion cost per unit, i.e. your <b>Plant Cost Rate</b>. Anchor there: set the Plant Cost Rate movement that delivers your EBITDA target.</div>
      </div>
      <div class="field" id="tn-ebitda-target" style="display:none;">
        <label>Your EBITDA target <span style="font-weight:400;color:var(--ink-3);">(optional — for the report)</span></label>
        <div class="inp" style="max-width:300px;"><span class="pre">€</span><input type="text" id="tn-ebitda-val" placeholder="e.g. +1.2M / 14% margin"></div>
      </div>
      <div id="tn-anchor-label" class="field"><label>Plant Cost Rate (conversion cost per unit)</label></div>
      <div class="two">
        <div class="field"><label style="font-size:13px;color:var(--ink-3);">Current</label><div class="inp"><span class="pre">€</span><input type="number" id="tn-cur" placeholder="20.00" step="0.01" oninput="l5checkP2()"></div></div>
        <div class="field"><label style="font-size:13px;color:var(--ink-3);">Target</label><div class="inp"><span class="pre">€</span><input type="number" id="tn-tgt" placeholder="18.00" step="0.01" oninput="l5checkP2()"></div></div>
      </div>
      <div id="tn-gap" class="mono" style="margin-top:18px;font-size:14px;color:var(--rust);"></div>
    </div>
    <div class="nav-row"><button class="btn btn-ghost" onclick="l5go('p1')">← Back</button><button class="btn btn-primary" id="b-p2" onclick="l5go('p3')" disabled>Continue →</button></div>
    <div class="err" id="e-p2">Enter current and target Plant Cost Rate (target below current).</div>
  </div>
</section>

<section class="panel" id="p-p3">
  <div class="wrap">
    <div class="eyebrow">Step 3 of 4 · Decompose to KPIs</div>
    <h2 class="title">Which drivers feed that number — and by how much?</h2>
    <p class="sub">Select the KPIs that, if improved, would move your anchor. For each, enter current and target. Pick only the ones that genuinely matter — discipline here is the whole point.</p>
    <div id="kpi-list"></div>
    <div class="nav-row"><button class="btn btn-ghost" onclick="l5go('p2')">← Back</button><button class="btn btn-primary" id="b-p3" onclick="l5go('p4')" disabled>Continue →</button></div>
    <div class="err" id="e-p3">Select at least 2 KPIs and fill current + target for each selected one.</div>
  </div>
</section>

<section class="panel" id="p-p4">
  <div class="wrap">
    <div class="eyebrow">Step 4 of 4 · Break Each KPI to Its Process</div>
    <h2 class="title">What's stopping each KPI — and who owns it?</h2>
    <p class="sub">A KPI is a result; you improve it only through the process indicators beneath it. For each KPI, select the loss components in play — you can pick more than one — then mark the <b>primary</b> driver. Each points to a process and a department.</p>
    <div id="decomp-list"></div>
    <div class="nav-row"><button class="btn btn-ghost" onclick="l5go('p3')">← Back</button><button class="btn btn-primary" id="b-p4" onclick="l5go('gate')" disabled>See my candidate list →</button></div>
    <div class="err" id="e-p4">For each KPI, select at least one cause and mark one as primary.</div>
  </div>
</section>

<section class="panel" id="p-gate">
  <div class="wrap">
    <div class="eyebrow">Almost there</div>
    <h2 class="title">Your Level 5 Candidate List is ready.</h2>
    <p class="sub">You've done the work most leadership teams never sit down to do — traced a financial goal all the way to named processes. Enter your details to generate the full report.</p>
    <div class="gate">
      <h2>Generate your targeting report</h2>
      <p>We'll show your candidate list on screen now, and send a formatted copy you can bring to your next leadership meeting.</p>
      <div class="gate-form"><input type="email" id="g-email" placeholder="Work email"><input type="text" id="g-role" placeholder="Your role (e.g. Plant Manager)"></div>
      <div class="gate-row"><div class="gate-form"><input type="text" id="g-plant" placeholder="Plant / company (optional)"><button class="btn btn-primary" onclick="l5generate()" style="white-space:nowrap;">Generate report →</button></div></div>
      <div class="err" id="e-gate" style="color:#FCA5A5;">Enter a valid work email and your role.</div>
      <div class="fine">No spam. Your assessment inputs are used only to generate this report. Unsubscribe anytime.</div>
    </div>
    <div class="nav-row"><button class="btn btn-ghost" onclick="l5go('p4')">← Back</button><span></span></div>
  </div>
</section>

<section class="panel" id="p-report">
  <div class="wrap">
    <div class="report-head"><div class="eyebrow">AdaptiveOps · Targeting Report</div><h2>Level 5 Targeting — Candidate List</h2><div class="meta" id="r-meta"></div></div>
    <div class="report-body">
      <div class="rsec">
        <div class="rsec-label">Maturity Distribution</div>
        <div class="verdict" id="r-maturity-verdict"></div>
        <div class="mbar" id="r-mbar"></div>
        <div class="mbar-key"><span><i style="background:#EF4444"></i> Level 0–1 (fragile)</span><span><i style="background:#10B981"></i> Level 2–3 (solid base)</span><span><i style="background:#111827"></i> Level 4–5 (self-regulating)</span></div>
        <div class="sub" id="r-maturity-note" style="margin-top:12px;"></div>
      </div>
      <div class="rsec"><div class="rsec-label">True North</div><div class="verdict" id="r-tn"></div><div class="sub" id="r-tn-note" style="margin-top:10px;"></div></div>
      <div class="rsec">
        <div class="rsec-label">Required KPI Movement</div>
        <p class="sub" style="margin-bottom:6px;">Each selected driver with the move you've set. The combined effect must deliver your anchor gap — the precise contribution of each is what a calibrated conversion model quantifies.</p>
        <table class="ttable" id="r-kpi-table"></table>
      </div>
      <div class="rsec">
        <div class="rsec-label">Your Level 5 Candidate List</div>
        <p class="sub" style="margin-bottom:4px;">Ranked by how strongly your inputs connect each process to the goal (primary drivers weigh heavier). Each owned by a named department. These deserve Level 5 — everything else stays solid at Level 2–3.</p>
        <div id="r-candidates"></div>
        <div class="holdback">
          <div class="ht">What this list gives you — and what it doesn't.</div>
          <div class="hd">You've mapped <b>which</b> processes matter and <b>who</b> owns them. What this tool can't give you is the precise euro-contribution of each, or the next layer down — the maintenance, logistics and engineering metrics (MTBF, changeover time, capability) that calibrate every one. That layer requires a conversion model built on your real cost structure. It's exactly what we build together, so every improvement target is provably connected to your number.</div>
        </div>
      </div>
      <div class="cta-final">
        <h3>Turn the candidate list into a funded plan.</h3>
        <p>In a free 30-minute diagnostic, we pressure-test your chain and show you what a calibrated conversion model would change about this list.</p>
        <a class="btn btn-primary" href="/contact">Book your free 30-min diagnostic →</a>
      </div>
      <div class="disclaimer">This self-assessment is an educational instrument. Outputs are directional and depend entirely on the accuracy of your inputs. It does not replace a calibrated cost-conversion model built on your plant's actual financial data.</div>
    </div>
    <div class="nav-row"><button class="btn btn-ghost" onclick="l5restart()">↺ Start over</button><button class="btn btn-ghost" onclick="window.print()">Print / Save as PDF</button></div>
  </div>
</section>
`;

export default function Level5TargetingTool() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    /* ---------- DATA ---------- */
    const PROCESSES = [
      { name: "Changeover / setup on the bottleneck line", dept: "Engineering" },
      { name: "Preventive & predictive maintenance", dept: "Maintenance" },
      { name: "Scrap control on top-volume product", dept: "Quality" },
      { name: "In-process defect detection (internal PPM)", dept: "Quality" },
      { name: "Customer complaint / containment (external PPM)", dept: "Quality" },
      { name: "Internal material replenishment to lines", dept: "SCM / Logistics" },
      { name: "Absenteeism & retention management", dept: "HR" },
      { name: "Operator cross-training & skill matrix", dept: "HR / Production" },
      { name: "Daily Management System (SQCDP)", dept: "Production" },
      { name: "Production planning & scheduling", dept: "Planning" },
      { name: "Standardized work adherence", dept: "Production" },
      { name: "Problem solving / root cause closure", dept: "Quality / CI" },
    ];

    const KPIS = [
      { id: "oee", name: "OEE", lang: "Area Manager", desc: "Availability × performance × quality on your equipment.", unit: "%" },
      { id: "labor", name: "Labor Efficiency", lang: "Area Manager", desc: "Output produced vs. what available time and labor should allow.", unit: "%" },
      { id: "scrap", name: "Scrap Rate", lang: "Area Manager", desc: "Material paid for and thrown away.", unit: "%" },
      { id: "ippm", name: "Internal PPM", lang: "Area Manager", desc: "Defective parts per million generated inside the plant.", unit: "ppm" },
      { id: "eppm", name: "External PPM", lang: "Area Manager", desc: "Defects escaping to the customer.", unit: "ppm" },
      { id: "obso", name: "Obsolete / Write-off", lang: "Area Manager", desc: "Inventory written off.", unit: "%" },
    ];

    const DECOMP: Record<string, { formula: string; components: { label: string; causes: { t: string; dept: string; proc: string }[] }[] }> = {
      oee: { formula: "OEE = Availability × Performance × Quality", components: [
        { label: "Availability", causes: [
          { t: "Equipment breakdowns & low reliability", dept: "Maintenance", proc: "Preventive & predictive maintenance" },
          { t: "Changeovers / setups eat available time", dept: "Engineering", proc: "Changeover / setup on the bottleneck line" } ] },
        { label: "Performance", causes: [
          { t: "Speed losses — running below rated cycle", dept: "Engineering / Production", proc: "Standardized work & line balancing" },
          { t: "Minor stops & idling", dept: "Production", proc: "Standardized work adherence" } ] },
        { label: "Quality", causes: [
          { t: "In-process defects causing stops & rework", dept: "Quality", proc: "In-process defect detection" } ] },
      ] },
      labor: { formula: "Labor Efficiency = (units × standard time) ÷ (available time × operators)", components: [
        { label: "Operators / available time", causes: [
          { t: "Absenteeism & turnover — lines run short-staffed", dept: "HR", proc: "Absenteeism & retention management" },
          { t: "Skill gaps & slow ramp on new operators", dept: "HR / Production", proc: "Operator cross-training & skill matrix" } ] },
        { label: "Units produced", causes: [
          { t: "Material shortages stop the line", dept: "SCM / Logistics", proc: "Internal material replenishment to lines" },
          { t: "Equipment not available when needed", dept: "Maintenance", proc: "Preventive & predictive maintenance" } ] },
      ] },
      scrap: { formula: "Scrap = material scrapped ÷ material consumed", components: [
        { label: "Sources of scrap", causes: [
          { t: "Process capability on top-volume product", dept: "Quality", proc: "Scrap control on top-volume product" },
          { t: "Material handling & damage", dept: "SCM / Logistics", proc: "Material flow & handling" },
          { t: "Operator method variation", dept: "Production", proc: "Standardized work adherence" },
          { t: "Setup / first-off scrap", dept: "Engineering", proc: "Changeover & first-off validation" } ] },
      ] },
      ippm: { formula: "Internal PPM = internal defects ÷ million produced", components: [
        { label: "Where it comes from", causes: [
          { t: "Detection escapes inside the plant", dept: "Quality", proc: "In-process defect detection" },
          { t: "Root causes never fully closed", dept: "Quality / CI", proc: "Problem solving / root cause closure" },
          { t: "Process capability drift", dept: "Engineering", proc: "Process capability control" } ] },
      ] },
      eppm: { formula: "External PPM = defects reaching customer ÷ million shipped", components: [
        { label: "Where it comes from", causes: [
          { t: "Containment & outgoing inspection gaps", dept: "Quality", proc: "Customer complaint / containment" },
          { t: "Root causes never fully closed", dept: "Quality / CI", proc: "Problem solving / root cause closure" },
          { t: "Change management on customer parts", dept: "Engineering", proc: "Engineering change control" } ] },
      ] },
      obso: { formula: "Obsolete = inventory written off ÷ total inventory value", components: [
        { label: "Where it comes from", causes: [
          { t: "Planning / forecast accuracy", dept: "Planning", proc: "Production planning & scheduling" },
          { t: "Slow-moving inventory governance", dept: "SCM / Logistics", proc: "Inventory governance" },
          { t: "Engineering change phase-in / out", dept: "Engineering", proc: "Engineering change control" } ] },
      ] },
    };

    /* ---------- STATE ---------- */
    const STATE: {
      ratings: Record<number, number>;
      tn: { type: string; cur: number | null; tgt: number | null; ebitda: string };
      kpis: Record<string, { on: boolean; cur: number | null; tgt: number | null }>;
      causes: Record<string, { sel: Set<string>; primary: string | null }>;
      lead: Record<string, string>;
    } = { ratings: {}, tn: { type: "pcr", cur: null, tgt: null, ebitda: "" }, kpis: {}, causes: {}, lead: {} };

    const STEPS = [
      { id: "intro", label: "Intro" }, { id: "p1", label: "Maturity" }, { id: "p2", label: "True North" },
      { id: "p3", label: "KPIs" }, { id: "p4", label: "Processes" }, { id: "gate", label: "Report" },
    ];
    let current = "intro";

    const $ = (id: string) => document.getElementById(id);

    function renderProgress() {
      const order = ["intro", "p1", "p2", "p3", "p4", "gate"];
      const ci = order.indexOf(current === "report" ? "gate" : current);
      const host = $("l5-psteps"); if (!host) return; host.innerHTML = "";
      STEPS.forEach((s, i) => {
        const done = i < ci, active = i === ci;
        const el = document.createElement("div");
        el.className = "pstep" + (active ? " active" : "") + (done ? " done" : "");
        el.innerHTML = `<span class="dot">${done ? "✓" : (i + 1)}</span>${s.label}`;
        host.appendChild(el);
        if (i < STEPS.length - 1) { const a = document.createElement("span"); a.className = "arrow"; a.textContent = "›"; host.appendChild(a); }
      });
    }
    function go(t: string) {
      if (t === "p2" && !validP1()) return showErr("e-p1");
      if (t === "p3" && !validP2()) return showErr("e-p2");
      if (t === "p4" && !validP3()) return showErr("e-p3");
      if (t === "gate" && !validP4()) return showErr("e-p4");
      document.querySelectorAll(".l5tool .panel").forEach((p) => p.classList.remove("show"));
      $("p-" + t)?.classList.add("show");
      current = t; renderProgress();
      if (t === "p4") renderDecomp();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    function showErr(id: string) { const e = $(id); if (!e) return; e.classList.add("show"); setTimeout(() => e.classList.remove("show"), 3500); }

    /* STEP 1 */
    function renderProcesses() {
      const host = $("proc-list"); if (!host) return; host.innerHTML = "";
      PROCESSES.forEach((p, idx) => {
        const row = document.createElement("div"); row.className = "proc";
        let scale = ""; for (let v = 0; v <= 5; v++) scale += `<button data-i="${idx}" data-v="${v}" onclick="l5rate(${idx},${v})">${v}</button>`;
        row.innerHTML = `<div><div class="pname">${p.name}</div><div class="pdept">${p.dept}</div></div><div class="scale">${scale}</div>`;
        host.appendChild(row);
      });
    }
    function rate(idx: number, v: number) {
      STATE.ratings[idx] = v;
      document.querySelectorAll(`.l5tool .scale button[data-i="${idx}"]`).forEach((b) => b.classList.toggle("sel", parseInt((b as HTMLElement).dataset.v || "") === v));
      ($("b-p1") as HTMLButtonElement).disabled = !validP1();
    }
    function validP1() { return Object.keys(STATE.ratings).length === PROCESSES.length; }

    /* STEP 2 */
    function onTNType() {
      STATE.tn.type = ($("tn-type") as HTMLSelectElement).value;
      const isE = STATE.tn.type === "ebitda";
      $("tn-bridge")!.style.display = isE ? "block" : "none";
      $("tn-ebitda-target")!.style.display = isE ? "block" : "none";
      $("tn-anchor-label")!.querySelector("label")!.textContent =
        isE ? "Plant Cost Rate movement that delivers it (conversion cost per unit)" : "Plant Cost Rate (conversion cost per unit)";
      checkP2();
    }
    function checkP2() {
      STATE.tn.cur = parseFloat(($("tn-cur") as HTMLInputElement).value);
      STATE.tn.tgt = parseFloat(($("tn-tgt") as HTMLInputElement).value);
      const ev = $("tn-ebitda-val") as HTMLInputElement | null;
      STATE.tn.ebitda = ev ? ev.value.trim() : "";
      const gap = (STATE.tn.cur as number) - (STATE.tn.tgt as number);
      const el = $("tn-gap")!;
      el.textContent = (!isNaN(gap) && gap > 0) ? `→ You must remove €${gap.toFixed(2)} per unit. Everything downstream connects to this number.` : "";
      ($("b-p2") as HTMLButtonElement).disabled = !validP2();
    }
    function validP2() { return !isNaN(STATE.tn.cur as number) && !isNaN(STATE.tn.tgt as number) && (STATE.tn.tgt as number) < (STATE.tn.cur as number); }

    /* STEP 3 */
    function renderKPIs() {
      const host = $("kpi-list"); if (!host) return; host.innerHTML = "";
      KPIS.forEach((k) => {
        STATE.kpis[k.id] = STATE.kpis[k.id] || { on: false, cur: null, tgt: null };
        const el = document.createElement("div"); el.className = "kpi"; el.id = "kpi-" + k.id;
        el.innerHTML = `<div class="kpi-head" onclick="l5toggleKPI('${k.id}')"><div class="kpi-check">✓</div><div class="kpi-name">${k.name}</div><div class="kpi-lang">${k.lang}</div></div>
          <div class="kpi-desc">${k.desc}</div>
          <div class="kpi-targets">
            <div class="field"><label style="font-size:12px;">Current (${k.unit})</label><input class="mini-inp" type="number" id="kc-${k.id}" oninput="l5kpiInput('${k.id}')"></div>
            <div class="field"><label style="font-size:12px;">Target (${k.unit})</label><input class="mini-inp" type="number" id="kt-${k.id}" oninput="l5kpiInput('${k.id}')"></div>
          </div>`;
        host.appendChild(el);
      });
    }
    function toggleKPI(id: string) { STATE.kpis[id].on = !STATE.kpis[id].on; $("kpi-" + id)!.classList.toggle("on", STATE.kpis[id].on); checkP3(); }
    function kpiInput(id: string) { STATE.kpis[id].cur = parseFloat(($("kc-" + id) as HTMLInputElement).value); STATE.kpis[id].tgt = parseFloat(($("kt-" + id) as HTMLInputElement).value); checkP3(); }
    function checkP3() { ($("b-p3") as HTMLButtonElement).disabled = !validP3(); }
    function selectedKPIs() { return KPIS.filter((k) => STATE.kpis[k.id] && STATE.kpis[k.id].on); }
    function validP3() { const s = selectedKPIs(); return s.length >= 2 && s.every((k) => !isNaN(STATE.kpis[k.id].cur as number) && !isNaN(STATE.kpis[k.id].tgt as number)); }

    /* STEP 4 */
    function renderDecomp() {
      const host = $("decomp-list"); if (!host) return; host.innerHTML = "";
      selectedKPIs().forEach((k) => {
        STATE.causes[k.id] = STATE.causes[k.id] || { sel: new Set<string>(), primary: null };
        const d = DECOMP[k.id];
        const box = document.createElement("div"); box.className = "dkpi"; box.id = "dk-" + k.id;
        let html = `<div class="dkpi-head"><div class="dkpi-name">${k.name}</div><div class="dkpi-formula">${d.formula}</div></div>
          <div class="dkpi-q">Where do you lose most? Select all that apply, then mark one primary.</div>`;
        d.components.forEach((comp, ci) => {
          html += `<div class="comp"><div class="comp-label">${comp.label}</div>`;
          comp.causes.forEach((c, ki) => {
            const key = ci + "-" + ki;
            const sel = STATE.causes[k.id].sel.has(key);
            const prim = STATE.causes[k.id].primary === key;
            html += `<div class="cause${sel ? " sel" : ""}${prim ? " primary" : ""}" id="c-${k.id}-${key}">
              <div class="ck" onclick="l5toggleCause('${k.id}','${key}')">✓</div>
              <div class="ctext" onclick="l5toggleCause('${k.id}','${key}')">${c.t}</div>
              <span class="cdept">${c.dept}</span>
              <span class="pstar" onclick="l5setPrimary('${k.id}','${key}')">${prim ? "★ primary" : "set primary"}</span>
            </div>`;
          });
          html += `</div>`;
        });
        html += `<div class="dkpi-foot" id="foot-${k.id}"></div>`;
        box.innerHTML = html; host.appendChild(box);
        updateFoot(k.id);
      });
    }
    function toggleCause(kid: string, key: string) {
      const c = STATE.causes[kid];
      if (c.sel.has(key)) { c.sel.delete(key); if (c.primary === key) c.primary = c.sel.size ? c.sel.values().next().value as string : null; }
      else { c.sel.add(key); if (!c.primary) c.primary = key; }
      renderDecomp();
      ($("b-p4") as HTMLButtonElement).disabled = !validP4();
    }
    function setPrimary(kid: string, key: string) {
      const c = STATE.causes[kid];
      if (!c.sel.has(key)) c.sel.add(key);
      c.primary = key;
      renderDecomp();
      ($("b-p4") as HTMLButtonElement).disabled = !validP4();
    }
    function updateFoot(kid: string) {
      const c = STATE.causes[kid]; const foot = $("foot-" + kid); if (!foot) return;
      if (!c.sel.size) { foot.innerHTML = "No cause selected yet."; return; }
      foot.innerHTML = `${c.sel.size} cause${c.sel.size > 1 ? "s" : ""} selected · <b>primary set</b>`;
    }
    function validP4() { const s = selectedKPIs(); return s.length > 0 && s.every((k) => STATE.causes[k.id] && STATE.causes[k.id].sel.size > 0 && STATE.causes[k.id].primary); }

    /* GATE */
    function generate() {
      const email = ($("g-email") as HTMLInputElement).value.trim();
      const role = ($("g-role") as HTMLInputElement).value.trim();
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || role.length < 2) return showErr("e-gate");
      STATE.lead = { email, role, plant: ($("g-plant") as HTMLInputElement).value.trim() };
      /* PRODUCTION: POST {lead, ratings, tn, kpis, causes} to backend / MailerLite here */
      buildReport(); go("report");
    }

    /* REPORT */
    function buildReport() {
      const vals = Object.values(STATE.ratings);
      const low = vals.filter((v) => v <= 1).length, mid = vals.filter((v) => v >= 2 && v <= 3).length, high = vals.filter((v) => v >= 4).length, tot = vals.length;
      const pL = Math.round(low / tot * 100), pM = Math.round(mid / tot * 100), pH = Math.round(high / tot * 100);

      $("r-meta")!.textContent = `Prepared for ${STATE.lead.role}${STATE.lead.plant ? " · " + STATE.lead.plant : ""} · ${new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}`;

      const mbar = $("r-mbar")!; mbar.innerHTML = "";
      if (pL > 0) mbar.innerHTML += `<div class="b-low" style="width:${pL}%">${pL > 7 ? pL + "%" : ""}</div>`;
      if (pM > 0) mbar.innerHTML += `<div class="b-mid" style="width:${pM}%">${pM > 7 ? pM + "%" : ""}</div>`;
      if (pH > 0) mbar.innerHTML += `<div class="b-high" style="width:${pH}%">${pH > 7 ? pH + "%" : ""}</div>`;

      let verdict, note;
      if (pL > 25) { verdict = `Your base isn't ready for a Level 5 push yet. <b>${pL}% of processes sit at Level 0–1.</b>`; note = "Stabilize the fragile processes to a documented, standardized Level 2–3 first. Chasing Level 5 on an unstable base is where most programs burn budget without return."; }
      else if (pH > 30) { verdict = `You may be <b>over-investing in Level 5.</b> ${pH}% of processes are at Level 4–5.`; note = "A healthy plant runs ~20% at Level 4–5. If more processes self-regulate than your goal requires, you've likely spent effort where it won't repay. The list below shows where Level 5 is actually justified."; }
      else if (pM >= 55 && pH >= 8 && pH <= 30) { verdict = `Healthy distribution. <b>Your base is solid</b> — now the question is targeting.`; note = "Roughly the 80/20 shape a healthy plant should have. The leverage now is making sure your ~20% at Level 4–5 are the right processes — the ones connected to your goal."; }
      else { verdict = `Solid base, <b>thin on self-regulating processes.</b>`; note = "Most processes are documented and standardized but few are predictable or self-regulating. The list below shows which to elevate first — the ones that threaten your True North if they drift."; }
      $("r-maturity-verdict")!.innerHTML = verdict;
      $("r-maturity-note")!.textContent = note;

      const gap = ((STATE.tn.cur as number) - (STATE.tn.tgt as number)).toFixed(2);
      if (STATE.tn.type === "ebitda") {
        $("r-tn")!.innerHTML = `<b>EBITDA${STATE.tn.ebitda ? " target: €" + STATE.tn.ebitda : ""}</b>, anchored on Plant Cost Rate <b>€${(STATE.tn.cur as number).toFixed(2)} → €${(STATE.tn.tgt as number).toFixed(2)}</b> — remove <b>€${gap}/unit</b>.`;
        $("r-tn-note")!.textContent = "The full bridge from EBITDA down through volume and working capital — and the precise Plant Cost Rate target it implies — is part of the conversion model we build together. Here you've anchored on the cost lever you control directly.";
      } else {
        $("r-tn")!.innerHTML = `<b>Plant Cost Rate: €${(STATE.tn.cur as number).toFixed(2)} → €${(STATE.tn.tgt as number).toFixed(2)}.</b> You must remove <b>€${gap}</b> per unit.`;
        $("r-tn-note")!.textContent = "";
      }

      const kt = $("r-kpi-table")!;
      kt.innerHTML = `<tr><th>Driver</th><th>Current</th><th>Target</th><th>Required move</th></tr>`;
      selectedKPIs().forEach((k) => {
        const s = STATE.kpis[k.id]; const move = (s.tgt as number) - (s.cur as number); const dir = move >= 0 ? "+" : "";
        const u = k.unit === "ppm" ? "ppm" : (k.unit === "%" ? "pts" : "");
        kt.innerHTML += `<tr><td><b>${k.name}</b></td><td class="mono">${s.cur}${k.unit === "%" ? "%" : ""}</td><td class="mono">${s.tgt}${k.unit === "%" ? "%" : ""}</td><td class="move">${dir}${move.toFixed(k.unit === "ppm" ? 0 : 1)} ${u}</td></tr>`;
      });

      const map: Record<string, { proc: string; dept: string; score: number; drivers: string[] }> = {};
      selectedKPIs().forEach((k) => {
        const c = STATE.causes[k.id]; const d = DECOMP[k.id];
        c.sel.forEach((key) => {
          const [ci, ki] = key.split("-").map(Number);
          const cause = d.components[ci].causes[ki];
          const mk = cause.proc + "|" + cause.dept;
          if (!map[mk]) map[mk] = { proc: cause.proc, dept: cause.dept, score: 0, drivers: [] };
          const isPrim = c.primary === key;
          map[mk].score += isPrim ? 3 : 1;
          map[mk].drivers.push(k.name + (isPrim ? " (primary)" : ""));
        });
      });
      const cands = Object.values(map).sort((a, b) => b.score - a.score);
      const host = $("r-candidates")!; host.innerHTML = "";
      cands.forEach((c, i) => {
        host.innerHTML += `<div class="cand${i === 0 ? " top" : ""}"><div class="rank">${i + 1}</div><div class="cmain"><div class="cproc">${c.proc}</div><div class="cdrv">Drives: ${c.drivers.join(" · ")}</div></div><div class="cdept">${c.dept}</div></div>`;
      });
    }

    function restart() {
      STATE.ratings = {}; STATE.tn = { type: "pcr", cur: null, tgt: null, ebitda: "" }; STATE.kpis = {}; STATE.causes = {}; STATE.lead = {};
      document.querySelectorAll(".l5tool input").forEach((i) => { (i as HTMLInputElement).value = ""; });
      ($("tn-type") as HTMLSelectElement).value = "pcr"; onTNType();
      document.querySelectorAll(".l5tool .scale button").forEach((b) => b.classList.remove("sel"));
      renderKPIs();
      ["b-p1", "b-p2", "b-p3", "b-p4"].forEach((id) => { ($(id) as HTMLButtonElement).disabled = true; });
      go("intro");
    }

    /* expose handlers used by inline onclick (prefixed l5* to avoid global collisions) */
    const w = window as unknown as Record<string, unknown>;
    w.l5go = go; w.l5rate = rate; w.l5onTNType = onTNType; w.l5checkP2 = checkP2;
    w.l5toggleKPI = toggleKPI; w.l5kpiInput = kpiInput; w.l5toggleCause = toggleCause;
    w.l5setPrimary = setPrimary; w.l5generate = generate; w.l5restart = restart;

    /* INIT */
    renderProcesses(); renderKPIs(); renderProgress(); onTNType();

    return () => {
      ["l5go", "l5rate", "l5onTNType", "l5checkP2", "l5toggleKPI", "l5kpiInput", "l5toggleCause", "l5setPrimary", "l5generate", "l5restart"].forEach((k) => { delete w[k]; });
    };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
.l5tool{
  --paper:#F3F4F6; --paper-2:#E9EDF2; --ink:#111827; --ink-2:#374151; --ink-3:#6B7280;
  --rust:#2F80ED; --rust-dk:#2563EB; --amber:#10B981; --line:#E5E7EB; --line-2:#D1D5DB;
  --good:#10B981; --warn:#D97706; --bad:#EF4444; --charcoal:#0B1F3B;
  --fs:'Inter',system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;
  --fm:ui-monospace,'SF Mono',Menlo,Consolas,monospace;
  background:var(--paper); color:var(--ink); font-family:var(--fs); font-size:16px; line-height:1.55; -webkit-font-smoothing:antialiased;
}
.l5tool *{box-sizing:border-box}
.l5tool .wrap{max-width:880px;margin:0 auto;padding:0 24px}
.l5tool .mono{font-family:var(--fm)}

.l5tool .progress{position:sticky;top:64px;z-index:20;background:rgba(243,244,246,.95);backdrop-filter:blur(8px);border-bottom:1px solid var(--line)}
.l5tool .progress .wrap{display:flex;align-items:center;gap:4px;height:52px;overflow-x:auto}
.l5tool .pstep{display:flex;align-items:center;gap:8px;flex-shrink:0;font-size:12.5px;color:var(--ink-3);font-weight:500}
.l5tool .pstep .dot{width:22px;height:22px;border-radius:50%;border:1.5px solid var(--line-2);display:flex;align-items:center;justify-content:center;font-family:var(--fm);font-size:11px;color:var(--ink-3);background:#fff}
.l5tool .pstep.active{color:var(--ink)} .l5tool .pstep.active .dot{border-color:var(--rust);background:var(--rust);color:#fff}
.l5tool .pstep.done .dot{border-color:var(--good);background:var(--good);color:#fff}
.l5tool .pstep .arrow{color:var(--line-2);font-size:12px}

.l5tool .panel{display:none;padding:48px 0 80px;animation:l5fade .4s ease}
.l5tool .panel.show{display:block}
@keyframes l5fade{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
@media (prefers-reduced-motion: reduce){.l5tool .panel{animation:none}}

.l5tool .eyebrow{font-family:var(--fm);font-size:12px;text-transform:uppercase;letter-spacing:.14em;color:var(--rust);font-weight:600;margin-bottom:16px}
.l5tool h1.title{font-family:var(--fs);font-weight:700;font-size:clamp(30px,5vw,46px);line-height:1.08;letter-spacing:-.02em;margin-bottom:20px;color:var(--ink)}
.l5tool h2.title{font-family:var(--fs);font-weight:700;font-size:clamp(24px,4vw,34px);line-height:1.12;letter-spacing:-.02em;margin-bottom:14px;color:var(--ink)}
.l5tool .lead{font-size:18px;color:var(--ink-2);max-width:62ch;margin-bottom:8px}
.l5tool .sub{font-size:14.5px;color:var(--ink-3);max-width:62ch}

.l5tool .card{background:#fff;border:1px solid var(--line);border-radius:12px;padding:22px 24px;margin-top:18px;box-shadow:0 1px 3px rgba(11,31,59,.04)}
.l5tool .feat{display:flex;gap:16px;padding:16px 0;border-bottom:1px solid var(--line)}
.l5tool .feat:last-child{border-bottom:none}
.l5tool .feat .n{font-family:var(--fm);font-size:13px;color:var(--rust);font-weight:700;flex-shrink:0;width:24px}
.l5tool .feat .ft{font-weight:600;font-size:15px;margin-bottom:2px;color:var(--ink)}
.l5tool .feat .fd{font-size:14px;color:var(--ink-2)}

.l5tool .btn{display:inline-flex;align-items:center;gap:10px;font-family:var(--fs);font-weight:600;font-size:15px;padding:14px 26px;border-radius:9999px;border:none;cursor:pointer;transition:background .18s,box-shadow .18s,transform .1s;text-decoration:none}
.l5tool .btn-primary{background:var(--rust);color:#fff} .l5tool .btn-primary:hover{background:var(--rust-dk);box-shadow:0 0 24px rgba(47,128,237,.4)} .l5tool .btn-primary:active{transform:scale(.98)}
.l5tool .btn-ghost{background:transparent;color:var(--ink);border:1px solid var(--line-2)} .l5tool .btn-ghost:hover{border-color:var(--ink);background:var(--paper-2)}
.l5tool .btn:disabled{opacity:.4;cursor:not-allowed}
.l5tool .btn:focus-visible{outline:2px solid var(--rust);outline-offset:2px}
.l5tool .nav-row{display:flex;justify-content:space-between;align-items:center;margin-top:36px;gap:12px}

.l5tool .proc{display:grid;grid-template-columns:1fr auto;gap:14px;align-items:center;padding:14px 0;border-bottom:1px solid var(--line)}
.l5tool .proc:last-child{border-bottom:none}
.l5tool .proc .pname{font-weight:600;font-size:14.5px;color:var(--ink)}
.l5tool .proc .pdept{font-family:var(--fm);font-size:11px;color:var(--ink-3);text-transform:uppercase;letter-spacing:.08em;margin-top:2px}
.l5tool .scale{display:flex;gap:5px}
.l5tool .scale button{width:34px;height:34px;border-radius:7px;border:1.5px solid var(--line-2);background:#fff;cursor:pointer;font-family:var(--fm);font-size:13px;font-weight:500;color:var(--ink-2);transition:.13s}
.l5tool .scale button:hover{border-color:var(--rust);color:var(--rust)}
.l5tool .scale button.sel{background:var(--ink);border-color:var(--ink);color:#fff}
.l5tool .scale button:focus-visible{outline:2px solid var(--rust);outline-offset:1px}
.l5tool .scale-legend{display:flex;justify-content:space-between;font-size:11px;color:var(--ink-3);margin-top:6px;font-family:var(--fm);flex-wrap:wrap;gap:4px}

/* Maturity scale reference — moved above the process list, aligned with the maturity-levels article */
.l5tool .scale-ref{background:var(--paper-2);border:1px solid var(--line);border-radius:12px;padding:18px 20px;margin-top:18px}
.l5tool .scale-ref-head{font-family:var(--fm);font-size:11px;text-transform:uppercase;letter-spacing:.1em;color:var(--ink-3);font-weight:600;margin-bottom:14px}
.l5tool .scale-ref-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px 28px}
.l5tool .lvl{display:flex;gap:12px;align-items:flex-start}
.l5tool .lvl-n{font-family:var(--fm);font-weight:700;font-size:13px;width:26px;height:26px;border-radius:7px;background:#fff;border:1.5px solid var(--line-2);display:flex;align-items:center;justify-content:center;color:var(--rust);flex-shrink:0}
.l5tool .lvl-body{flex:1}
.l5tool .lvl-name{font-weight:600;font-size:13.5px;color:var(--ink);line-height:1.25}
.l5tool .lvl-desc{font-size:12.5px;color:var(--ink-2);line-height:1.45;margin-top:2px}
@media(max-width:760px){.l5tool .scale-ref-grid{grid-template-columns:1fr}}

.l5tool .field{margin-top:18px}
.l5tool .field label{display:block;font-weight:600;font-size:14px;margin-bottom:7px;color:var(--ink)}
.l5tool select.tn-select{width:100%;max-width:460px;padding:13px 14px;border:1.5px solid var(--line-2);border-radius:8px;background:#fff;font-family:var(--fs);font-size:15px;color:var(--ink);outline:none;cursor:pointer}
.l5tool select.tn-select:focus{border-color:var(--rust)}
.l5tool .inp{display:flex;align-items:center;border:1.5px solid var(--line-2);border-radius:8px;background:#fff;overflow:hidden;max-width:260px}
.l5tool .inp .pre{padding:0 12px;color:var(--ink-3);font-family:var(--fm);font-size:14px;border-right:1px solid var(--line);align-self:stretch;display:flex;align-items:center;background:var(--paper-2)}
.l5tool .inp input{border:none;outline:none;padding:12px 14px;font-family:var(--fm);font-size:15px;width:100%;background:transparent;color:var(--ink)}
.l5tool .inp:focus-within{border-color:var(--rust)}
.l5tool .two{display:flex;gap:14px;flex-wrap:wrap}
.l5tool .two .field{flex:1;min-width:160px;margin-top:0}

.l5tool .bridge{background:var(--paper-2);border:1px solid var(--line-2);border-left:3px solid var(--amber);border-radius:8px;padding:18px 20px;margin-top:18px}
.l5tool .bridge .bt{font-weight:700;font-size:14px;margin-bottom:6px;display:flex;align-items:center;gap:8px;color:var(--ink)}
.l5tool .bridge .bd{font-size:14px;color:var(--ink-2)}
.l5tool .bridge .bd b{color:var(--ink)}

.l5tool .kpi{border:1.5px solid var(--line);border-radius:10px;padding:16px 18px;margin-top:12px;transition:.15s;cursor:pointer;background:#fff}
.l5tool .kpi.on{border-color:var(--rust);box-shadow:0 0 0 1px var(--rust)}
.l5tool .kpi-head{display:flex;align-items:center;gap:12px}
.l5tool .kpi-check{width:22px;height:22px;border-radius:6px;border:1.5px solid var(--line-2);flex-shrink:0;display:flex;align-items:center;justify-content:center;color:#fff;font-size:13px;transition:.15s;background:#fff}
.l5tool .kpi.on .kpi-check{background:var(--rust);border-color:var(--rust)}
.l5tool .kpi-name{font-weight:600;font-size:15px;color:var(--ink)}
.l5tool .kpi-lang{font-family:var(--fm);font-size:10.5px;color:var(--ink-3);text-transform:uppercase;letter-spacing:.08em;margin-left:auto}
.l5tool .kpi-desc{font-size:13.5px;color:var(--ink-2);margin-top:6px;margin-left:34px}
.l5tool .kpi-targets{margin-top:14px;margin-left:34px;display:none;gap:14px}
.l5tool .kpi.on .kpi-targets{display:flex;flex-wrap:wrap}
.l5tool .kpi-targets .field{margin-top:0}
.l5tool .mini-inp{border:1.5px solid var(--line-2);border-radius:7px;padding:9px 12px;font-family:var(--fm);font-size:14px;width:100px;outline:none}
.l5tool .mini-inp:focus{border-color:var(--rust)}

.l5tool .dkpi{border:1px solid var(--line);border-radius:10px;padding:0;margin-top:18px;overflow:hidden;background:#fff}
.l5tool .dkpi-head{background:var(--paper-2);padding:15px 18px;border-bottom:1px solid var(--line)}
.l5tool .dkpi-name{font-weight:700;font-size:15.5px;color:var(--ink)}
.l5tool .dkpi-formula{font-family:var(--fm);font-size:12.5px;color:var(--rust);margin-top:5px;line-height:1.4}
.l5tool .dkpi-q{font-size:13px;color:var(--ink-3);padding:13px 18px 4px}
.l5tool .comp{padding:0 18px}
.l5tool .comp-label{font-family:var(--fm);font-size:10.5px;text-transform:uppercase;letter-spacing:.1em;color:var(--ink-3);font-weight:500;margin:14px 0 4px;padding-bottom:5px;border-bottom:1px dashed var(--line-2)}
.l5tool .cause{display:flex;align-items:center;gap:11px;padding:10px 0;border-bottom:1px solid var(--line);cursor:pointer}
.l5tool .cause:last-child{border-bottom:none}
.l5tool .cause .ck{width:19px;height:19px;border-radius:5px;border:1.5px solid var(--line-2);flex-shrink:0;display:flex;align-items:center;justify-content:center;color:#fff;font-size:12px;background:#fff;transition:.13s}
.l5tool .cause.sel .ck{background:var(--ink);border-color:var(--ink)}
.l5tool .cause .ctext{font-size:14px;flex:1;color:var(--ink)}
.l5tool .cause .cdept{font-family:var(--fm);font-size:10px;text-transform:uppercase;letter-spacing:.07em;color:var(--ink-3);background:var(--paper-2);padding:3px 8px;border-radius:4px;flex-shrink:0}
.l5tool .cause .pstar{flex-shrink:0;font-size:11px;font-weight:600;padding:4px 9px;border-radius:5px;border:1px solid var(--line-2);color:var(--ink-3);background:#fff;cursor:pointer;display:none;white-space:nowrap}
.l5tool .cause.sel .pstar{display:inline-block}
.l5tool .cause.primary .pstar{background:var(--rust);border-color:var(--rust);color:#fff}
.l5tool .dkpi-foot{padding:11px 18px;background:var(--paper-2);border-top:1px solid var(--line);font-size:12.5px;color:var(--ink-3)}
.l5tool .dkpi-foot b{color:var(--rust)}

.l5tool .gate{background:var(--charcoal);color:#fff;border-radius:12px;padding:40px;margin-top:20px}
.l5tool .gate h2{font-family:var(--fs);font-weight:700;font-size:28px;color:#fff;margin-bottom:10px;letter-spacing:-.01em}
.l5tool .gate p{color:rgba(255,255,255,.7);font-size:15px;max-width:52ch;margin-bottom:24px}
.l5tool .gate-form{display:flex;gap:10px;flex-wrap:wrap}
.l5tool .gate-form input{flex:1;min-width:200px;padding:14px 16px;border-radius:8px;border:1px solid rgba(255,255,255,.2);background:rgba(255,255,255,.08);color:#fff;font-family:var(--fs);font-size:15px;outline:none}
.l5tool .gate-form input:focus{border-color:var(--rust)}
.l5tool .gate-form input::placeholder{color:rgba(255,255,255,.4)}
.l5tool .gate .fine{font-size:12px;color:rgba(255,255,255,.4);margin-top:14px}
.l5tool .gate-row{display:flex;gap:10px;flex-wrap:wrap;margin-top:10px}
.l5tool .gate-row .gate-form{flex:1}

.l5tool .report-head{background:var(--charcoal);color:#fff;border-radius:12px 12px 0 0;padding:32px 34px}
.l5tool .report-head .eyebrow{color:var(--amber)}
.l5tool .report-head h2{font-family:var(--fs);font-weight:700;font-size:30px;color:#fff;letter-spacing:-.01em;line-height:1.1}
.l5tool .report-head .meta{font-family:var(--fm);font-size:12px;color:rgba(255,255,255,.55);margin-top:10px}
.l5tool .report-body{background:#fff;border:1px solid var(--line);border-top:none;border-radius:0 0 12px 12px;padding:8px 34px 34px}
.l5tool .rsec{padding:26px 0;border-bottom:1px solid var(--line)}
.l5tool .rsec:last-child{border-bottom:none}
.l5tool .rsec-label{font-family:var(--fm);font-size:11px;text-transform:uppercase;letter-spacing:.12em;color:var(--rust);font-weight:600;margin-bottom:14px}
.l5tool .verdict{font-family:var(--fs);font-size:22px;line-height:1.3;font-weight:600;letter-spacing:-.01em;color:var(--ink)}
.l5tool .verdict b{color:var(--rust)}

.l5tool .mbar{display:flex;height:42px;border-radius:8px;overflow:hidden;margin:14px 0 8px;border:1px solid var(--line)}
.l5tool .mbar div{display:flex;align-items:center;justify-content:center;color:#fff;font-family:var(--fm);font-size:13px;font-weight:700}
.l5tool .mbar .b-low{background:#EF4444} .l5tool .mbar .b-mid{background:#10B981} .l5tool .mbar .b-high{background:var(--ink)}
.l5tool .mbar-key{display:flex;gap:18px;flex-wrap:wrap;font-size:12px;color:var(--ink-2)}
.l5tool .mbar-key span{display:flex;align-items:center;gap:6px}
.l5tool .mbar-key i{width:11px;height:11px;border-radius:3px;display:inline-block}

.l5tool .ttable{width:100%;border-collapse:collapse;margin-top:6px;font-size:14px}
.l5tool .ttable th{text-align:left;font-family:var(--fm);font-size:10.5px;text-transform:uppercase;letter-spacing:.08em;color:var(--ink-3);font-weight:500;padding:8px 10px;border-bottom:1.5px solid var(--line-2)}
.l5tool .ttable td{padding:11px 10px;border-bottom:1px solid var(--line);color:var(--ink)}
.l5tool .ttable .move{font-family:var(--fm);font-weight:700;color:var(--rust)}

.l5tool .cand{display:flex;align-items:center;gap:16px;padding:16px;border:1px solid var(--line);border-radius:9px;margin-top:10px;background:var(--paper)}
.l5tool .cand.top{border-color:var(--rust);background:#fff}
.l5tool .cand .rank{font-family:var(--fs);font-size:26px;font-weight:700;color:var(--rust);width:34px;flex-shrink:0}
.l5tool .cand .cmain{flex:1}
.l5tool .cand .cproc{font-weight:600;font-size:15px;color:var(--ink)}
.l5tool .cand .cdrv{font-size:13px;color:var(--ink-2);margin-top:2px}
.l5tool .cand .cdept{font-family:var(--fm);font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:#fff;background:var(--ink);padding:5px 10px;border-radius:5px;flex-shrink:0}

.l5tool .holdback{background:var(--paper-2);border:1px solid var(--line-2);border-left:3px solid var(--rust);border-radius:8px;padding:20px 22px;margin-top:18px}
.l5tool .holdback .ht{font-weight:700;font-size:15px;margin-bottom:6px;color:var(--ink)}
.l5tool .holdback .hd{font-size:14px;color:var(--ink-2)}
.l5tool .holdback .hd b{color:var(--ink)}

.l5tool .cta-final{background:var(--charcoal);border-radius:12px;padding:34px;margin-top:24px;text-align:center}
.l5tool .cta-final h3{font-family:var(--fs);color:#fff;font-size:24px;font-weight:700;margin-bottom:8px}
.l5tool .cta-final p{color:rgba(255,255,255,.7);font-size:14.5px;max-width:48ch;margin:0 auto 22px}

.l5tool .disclaimer{font-size:12px;color:var(--ink-3);margin-top:28px;text-align:center;max-width:62ch;margin-left:auto;margin-right:auto}
.l5tool .err{color:var(--bad);font-size:13px;margin-top:8px;display:none}
.l5tool .err.show{display:block}

@media(max-width:640px){
  .l5tool .wrap{padding:0 18px}
  .l5tool .proc{grid-template-columns:1fr}
  .l5tool .scale button{width:30px;height:30px}
  .l5tool .gate,.l5tool .report-body,.l5tool .report-head{padding-left:20px;padding-right:20px}
  .l5tool .cause{flex-wrap:wrap}
  .l5tool .cause .ctext{flex:1 1 100%;order:2;margin-left:30px}
  .l5tool .cause .ck{order:1} .l5tool .cause .cdept{order:3;margin-left:30px} .l5tool .cause .pstar{order:4;margin-left:auto}
}

/* ---- Print / Save as PDF — clean professional report ---- */
@media print{
  /* Hide all site + tool chrome — only the report should print */
  header, footer{display:none !important}
  .l5tool .progress{display:none !important}
  .l5tool .nav-row{display:none !important}
  .l5tool .err{display:none !important}

  /* Page setup */
  @page{margin:14mm}
  html,body{background:#fff !important}
  .pt-16{padding-top:0 !important} /* drop the fixed-header spacer (header hidden in print) */
  .l5tool{background:#fff !important}
  .l5tool .panel{padding:0 !important}
  .l5tool .wrap{max-width:100% !important;padding:0 !important}

  /* Force brand background colours to render (browsers strip them by default) */
  .l5tool .report-head,
  .l5tool .cta-final,
  .l5tool .mbar,
  .l5tool .mbar div,
  .l5tool .cand,
  .l5tool .cand.top,
  .l5tool .cand .cdept,
  .l5tool .holdback,
  .l5tool .bridge{
    -webkit-print-color-adjust:exact !important;
    print-color-adjust:exact !important;
  }

  /* Keep logical blocks from splitting across pages */
  .l5tool .report-head{break-inside:avoid;break-after:avoid}
  .l5tool .rsec{break-inside:avoid}
  .l5tool .cand{break-inside:avoid}
  .l5tool .holdback{break-inside:avoid}
  .l5tool .cta-final{break-inside:avoid}
  .l5tool .ttable tr{break-inside:avoid}

  /* Tighten spacing for paper */
  .l5tool .report-body{padding:0 0 8px !important;border:none !important}
  .l5tool .report-head{border-radius:8px;margin-bottom:4px}
  .l5tool .rsec{padding:18px 0}
  .l5tool .cta-final{margin-top:18px}

  /* Avoid heavy shadows on paper */
  .l5tool .card,.l5tool .kpi,.l5tool .dkpi,.l5tool .cand{box-shadow:none !important}
}
      ` }} />
      <div className="l5tool" ref={ref} dangerouslySetInnerHTML={{ __html: TOOL_HTML }} />
    </>
  );
}
