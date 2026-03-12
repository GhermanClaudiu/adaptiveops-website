/**
 * Migrate static blog posts from lib/content/blog.ts to Sanity.
 *
 * Usage:  node scripts/migrate-to-sanity.mjs
 *
 * Requires NEXT_PUBLIC_SANITY_PROJECT_ID, SANITY_API_TOKEN in .env.local
 */

import { createClient } from "@sanity/client";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

// ── Load .env.local ──────────────────────────────────────────────────
const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, "../.env.local");
const envContent = readFileSync(envPath, "utf-8");
const env = {};
for (const line of envContent.split("\n")) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("#")) continue;
  const eqIdx = trimmed.indexOf("=");
  if (eqIdx === -1) continue;
  env[trimmed.slice(0, eqIdx)] = trimmed.slice(eqIdx + 1);
}

const projectId = env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const token = env.SANITY_API_TOKEN;
const dataset = env.NEXT_PUBLIC_SANITY_DATASET || "production";

if (!projectId || !token) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_TOKEN in .env.local");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2024-01-01",
  useCdn: false,
});

// ── Blog posts (duplicated here to avoid TS import issues) ───────────
const blogPosts = [
  {
    slug: "what-is-operational-excellence",
    title: "What Is Operational Excellence and Why It Matters in Manufacturing",
    date: "2026-02-15",
    category: "Operational Excellence",
    excerpt:
      "Operational excellence is not a destination — it\u2019s a system. Learn why manufacturing organizations that build the right systems outperform those chasing quick fixes.",
    content: `Operational excellence is often misunderstood. Many organizations treat it as a goal \u2014 something to \u201cachieve\u201d and then move on. In reality, it\u2019s a management system. It\u2019s a way of running your operations so that every person, every process, and every tool works toward the same measurable outcomes.

## Why It Matters

In manufacturing, the difference between a well-run plant and a struggling one is rarely about technology or equipment. It\u2019s about systems. Specifically:

- **Do your people know what good performance looks like?** If your team leaders can\u2019t tell you today\u2019s OEE or yesterday\u2019s scrap rate, you have a visibility problem.
- **Do your processes prevent problems or just detect them?** Reactive quality management is expensive. Standardized processes with built-in checks catch issues before they become defects.
- **Do your managers coach or just direct?** The best-performing plants have managers who ask questions (Toyota Kata) rather than giving orders.

## The Three Pillars

At AdaptiveOps, we structure operational excellence around three pillars:

1. **People** \u2014 Training and developing your workforce from the shop floor up. Not theory, but practical skills they can apply tomorrow.
2. **Processes** \u2014 Implementing management systems (Daily Management, KPI cascading, problem solving routines) that create consistency.
3. **Technology** \u2014 Using digital tools (EMS, QMS, dashboards) to make performance visible and traceable.

## Where to Start

If you\u2019re starting from scratch, begin with visibility. You can\u2019t improve what you can\u2019t see. Implement a simple daily management routine: a 15-minute production meeting, 3-5 KPIs on a board, and a clear escalation path for problems.

Then build from there. Add problem-solving capability (A3, 5 Why). Train your leaders. Digitize when you\u2019re ready \u2014 not before.

The key insight: operational excellence is not about doing everything at once. It\u2019s about building systems, one layer at a time, that compound over months and years.`,
  },
  {
    slug: "daily-management-system-guide",
    title: "How to Build a Daily Management System That Actually Works",
    date: "2026-03-01",
    category: "Management Systems",
    excerpt:
      "Most daily management systems fail because they focus on meetings instead of behaviors. Here\u2019s how to build one that drives real performance improvement.",
    content: `A Daily Management System (DMS) is the backbone of any well-run manufacturing operation. Yet most attempts at implementing one fail within 6 months. Why? Because organizations focus on the visible parts (meetings, boards, KPIs) and ignore the behaviors that make them work.

## What a DMS Actually Is

A Daily Management System is a structured routine that ensures:

1. Performance is **visible** \u2014 everyone knows how yesterday went
2. Problems are **identified** quickly \u2014 within hours, not days
3. Actions are **assigned and tracked** \u2014 accountability is clear
4. Escalation is **systematic** \u2014 the right level handles the right problems

## The Typical Failure Mode

Here\u2019s what usually happens: A consultant or internal team designs a beautiful tiered meeting structure. Level 1 (team leader) at 7:00, Level 2 (area manager) at 8:00, Level 3 (plant manager) at 9:00. KPI boards are installed. Templates are created.

For the first 2-3 weeks, attendance is high. Then reality kicks in. Meetings run long. The same problems appear every day with no resolution. Managers start skipping. Within 3 months, it\u2019s dead.

## What Actually Works

**Keep meetings short and structured.** Level 1 should be 10 minutes maximum. Use a fixed agenda: Safety, Quality, Delivery, Cost \u2014 done. If a topic needs more than 2 minutes of discussion, it gets escalated or scheduled separately.

**Focus on deviations, not status updates.** Don\u2019t review every KPI. Only discuss what\u2019s RED. Green means the system is working \u2014 move on.

**Make the escalation path clear.** If a team leader can\u2019t solve it in 24 hours, it goes up. If an area manager can\u2019t solve it in 48 hours, it goes up again. No problem should sit unresolved for more than a week.

**Train the behavior, not just the format.** The hardest part of DMS is not the boards or the meetings. It\u2019s teaching managers to ask the right questions: \u201cWhat\u2019s the target? What\u2019s the actual? What\u2019s the gap? What\u2019s your next step?\u201d

This is where Toyota Kata and coaching skills become essential. A DMS without coaching capability is just a reporting system.

## Start Small

Don\u2019t implement all tiers at once. Start with one production area. Get Level 1 working consistently for 4 weeks before adding Level 2. Build the habit before scaling the system.

The goal is not a perfect system on day one. The goal is a system that improves every week.`,
  },
];

// ── Markdown → Portable Text converter ───────────────────────────────
let keyCounter = 0;
function key() {
  return `k${++keyCounter}`;
}

/** Parse inline **bold** into spans with marks */
function parseInlineMarks(text) {
  const spans = [];
  const regex = /\*\*(.*?)\*\*/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    // Text before bold
    if (match.index > lastIndex) {
      spans.push({
        _type: "span",
        _key: key(),
        text: text.slice(lastIndex, match.index),
        marks: [],
      });
    }
    // Bold text
    spans.push({
      _type: "span",
      _key: key(),
      text: match[1],
      marks: ["strong"],
    });
    lastIndex = regex.lastIndex;
  }

  // Remaining text
  if (lastIndex < text.length) {
    spans.push({
      _type: "span",
      _key: key(),
      text: text.slice(lastIndex),
      marks: [],
    });
  }

  if (spans.length === 0) {
    spans.push({ _type: "span", _key: key(), text, marks: [] });
  }

  return spans;
}

function markdownToPortableText(markdown) {
  const blocks = [];
  const paragraphs = markdown.split("\n\n");

  for (const para of paragraphs) {
    const trimmed = para.trim();
    if (!trimmed) continue;

    // H2
    if (trimmed.startsWith("## ")) {
      blocks.push({
        _type: "block",
        _key: key(),
        style: "h2",
        markDefs: [],
        children: [{ _type: "span", _key: key(), text: trimmed.slice(3), marks: [] }],
      });
      continue;
    }

    // H3
    if (trimmed.startsWith("### ")) {
      blocks.push({
        _type: "block",
        _key: key(),
        style: "h3",
        markDefs: [],
        children: [{ _type: "span", _key: key(), text: trimmed.slice(4), marks: [] }],
      });
      continue;
    }

    // Bullet list
    if (trimmed.startsWith("- ")) {
      const items = trimmed.split("\n");
      for (const item of items) {
        const content = item.replace(/^-\s+/, "");
        blocks.push({
          _type: "block",
          _key: key(),
          style: "normal",
          listItem: "bullet",
          level: 1,
          markDefs: [],
          children: parseInlineMarks(content),
        });
      }
      continue;
    }

    // Numbered list
    if (/^\d+\.\s/.test(trimmed)) {
      const items = trimmed.split("\n");
      for (const item of items) {
        const content = item.replace(/^\d+\.\s+/, "");
        blocks.push({
          _type: "block",
          _key: key(),
          style: "normal",
          listItem: "number",
          level: 1,
          markDefs: [],
          children: parseInlineMarks(content),
        });
      }
      continue;
    }

    // Regular paragraph
    blocks.push({
      _type: "block",
      _key: key(),
      style: "normal",
      markDefs: [],
      children: parseInlineMarks(trimmed),
    });
  }

  return blocks;
}

// ── Migrate ──────────────────────────────────────────────────────────
async function migrate() {
  console.log(`Connecting to Sanity project ${projectId} / ${dataset}...\n`);

  for (const post of blogPosts) {
    const docId = `post-${post.slug}`;

    console.log(`Creating: "${post.title}"`);
    console.log(`  slug: ${post.slug}`);
    console.log(`  category: ${post.category}`);
    console.log(`  date: ${post.date}`);

    const body = markdownToPortableText(post.content);
    console.log(`  body blocks: ${body.length}`);

    const doc = {
      _id: docId,
      _type: "post",
      title: post.title,
      slug: { _type: "slug", current: post.slug },
      publishedAt: `${post.date}T00:00:00.000Z`,
      category: post.category,
      excerpt: post.excerpt,
      body,
    };

    // createOrReplace publishes directly (no draft prefix)
    await client.createOrReplace(doc);
    console.log(`  ✓ Published as ${docId}\n`);
  }

  console.log("Done! Both posts are now live in Sanity.");
}

migrate().catch((err) => {
  console.error("Migration failed:", err.message);
  process.exit(1);
});
