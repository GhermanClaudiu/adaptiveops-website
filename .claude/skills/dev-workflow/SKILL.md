---
name: dev-workflow
description: Development workflow rules for efficiency, debugging, and visual verification. Use this skill when taking screenshots, debugging visual issues, working with SVG diagrams, or when stuck on a repeated failure. Prevents common time-wasting patterns.
metadata:
  author: adaptiveops
  version: "1.0.0"
  argument-hint: <task-context>
---

# Development Workflow Skill

Rules and patterns learned from real development sessions. Follow these to avoid repeating costly mistakes.

## Screenshot Workflow (Puppeteer)

### Golden Rule: Use element.screenshot(), NOT clip coordinates

When you need a screenshot of a specific component:

```javascript
// CORRECT — always works
const element = await page.$('selector');
await element.screenshot({ path: 'screenshots/component.png' });

// WRONG — coordinates break with scroll, viewport changes, DPI scaling
await page.screenshot({ clip: { x: 830, y: 96, width: 420, height: 420 } });
```

**Why**: `page.screenshot({ clip })` coordinates are fragile — they shift with scroll position, viewport size, and device pixel ratio. `element.screenshot()` always captures the exact element regardless of page state.

### Finding the right element

```javascript
// By specific attribute
const el = await page.$('svg[viewBox="0 0 100 100"]');

// By parent container
const svg = await page.$('svg[viewBox="0 0 100 100"]');
const parent = await svg.evaluateHandle(el => el.closest('.relative'));
await parent.screenshot({ path: 'output.png' });

// By section content (when no unique selector exists)
const handle = await page.evaluateHandle(() => {
  const sections = document.querySelectorAll('section');
  for (const s of sections) {
    if (s.textContent.includes('Unique Text')) return s;
  }
  return null;
});
await handle.screenshot({ path: 'output.png' });
```

### Full workflow for visual verification

```javascript
const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 15000 });

  // 1. Scroll through page to trigger IntersectionObserver animations
  await page.evaluate(async () => {
    const delay = ms => new Promise(r => setTimeout(r, ms));
    let scrollTop = 0;
    while (scrollTop < document.body.scrollHeight) {
      scrollTop += window.innerHeight * 0.5;
      window.scrollTo(0, scrollTop);
      await delay(300);
    }
    await delay(500);
  });
  await new Promise(r => setTimeout(r, 2000));

  // 2. Scroll to target section
  await page.evaluate(() => {
    const sections = document.querySelectorAll('section');
    for (const s of sections) {
      if (s.textContent.includes('Target Text')) {
        s.scrollIntoView({ block: 'start' });
        return;
      }
    }
  });
  await new Promise(r => setTimeout(r, 1500));

  // 3. Take element screenshot (NOT clip)
  const el = await page.$('.target-selector');
  if (el) await el.screenshot({ path: 'screenshots/target.png' });

  await browser.close();
})();
```

### Dev server management

- **Start**: `cd adaptiveops-website && npx next dev -p 3000`
- **Kill after screenshots**: Always stop the dev server when done
  ```bash
  # Find and kill process on port
  netstat -ano | grep :3000 | grep LISTEN
  taskkill //PID <pid> //F
  ```
- **Port conflicts**: If 3000 is occupied, kill it before starting. Don't use alternate ports — screenshot scripts default to 3000

## Debugging Strategy: The 2-Attempt Rule

**After 2 failed attempts with the same approach, STOP and change strategy.**

### Pattern to avoid (time waster):
```
Attempt 1: clip { x: 450, y: 30 }   → wrong area
Attempt 2: clip { x: 680, y: 30 }   → still wrong
Attempt 3: clip { x: 790, y: 56 }   → still wrong  ← STOP HERE
Attempt 4: clip { x: 370, y: 40 }   → still wrong
Attempt 5: clip { x: 580, y: 20 }   → still wrong
Attempt 6: element.screenshot()      → works instantly
```

### Correct pattern:
```
Attempt 1: clip coordinates → wrong
Attempt 2: different clip   → still wrong
→ CHANGE APPROACH: use element.screenshot() → works
```

### Common strategy pivots:
| Stuck on | Pivot to |
|---|---|
| Clip coordinates not working | `element.screenshot()` |
| CSS not applying | Check if class exists, check specificity, check parent |
| Animation not triggering | Check IntersectionObserver threshold, scroll trigger |
| Element not found | Debug with `page.evaluate()` to log DOM state |
| Port busy | Kill process, don't try next port |

## Verify Before Edit

**Always take a screenshot BEFORE making changes** to understand the current state.

Wrong order:
1. Read code
2. Make edit based on assumption
3. Take screenshot
4. Realize edit was unnecessary

Correct order:
1. Read code
2. Take screenshot to see current state
3. Decide if edit is needed
4. Make edit only if needed
5. Take screenshot to verify

## SVG Circular Text Patterns

### Badge/seal design (text around a circle)

```jsx
<defs>
  {/* Top semicircle: left→right clockwise (text faces outward, readable from top) */}
  <path
    id="textTop"
    d="M 50,50 m -R,0 a R,R 0 1,1 {2*R},0"
    fill="none"
  />
  {/* Bottom semicircle: left→right counter-clockwise (text faces outward, readable from bottom) */}
  <path
    id="textBottom"
    d="M 50,50 m -R,0 a R,R 0 1,0 {2*R},0"
    fill="none"
  />
</defs>

<text>
  <textPath href="#textTop" startOffset="50%" textAnchor="middle">
    TOP TEXT
  </textPath>
</text>
<text>
  <textPath href="#textBottom" startOffset="50%" textAnchor="middle">
    BOTTOM TEXT
  </textPath>
</text>
```

Where `R` is the radius. Both paths start from the left point of the circle.

**Key rules**:
- `a R,R 0 1,1` = clockwise (top semicircle) → text reads left-to-right at top
- `a R,R 0 1,0` = counter-clockwise (bottom semicircle) → text reads left-to-right at bottom
- Both on SAME radius = same imaginary circle
- `startOffset="50%"` + `textAnchor="middle"` = centered on the arc

### Circular node placement

```jsx
{items.map((item, i) => {
  const angle = (i * (360 / items.length) - 90) * (Math.PI / 180); // -90 starts from top
  const x = 50 + radius * Math.cos(angle); // percentage coordinates
  const y = 50 + radius * Math.sin(angle);
  return (
    <div style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}>
      {/* node content */}
    </div>
  );
})}
```

### Avoiding text-node collisions
- Keep text radius (e.g., r=47) significantly larger than node radius (e.g., r=32)
- Minimum gap: text radius should be at least `nodeRadius + nodeSize/2 + 5` SVG units

## Color Matching

When matching colors from a logo or existing asset:
1. **Read the image** with Read tool — it renders visually
2. **Check design system** in CLAUDE.md for official color tokens
3. **Use exact tokens** — don't invent hex values from visual inspection
4. **Opacity matters**: `text-accent/70` (70% opacity) looks different from `text-accent` (100%)

## Communication

- Communicate in Romanian (per CLAUDE.md: "Limbă comunicare cu mine: Română")
- Keep updates concise — one sentence per change, not paragraphs
- Show screenshot results instead of describing them
