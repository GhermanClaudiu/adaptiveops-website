---
name: adaptiveops-frontend
description: Build and review frontend components for AdaptiveOps corporate website. Use this skill before creating or modifying any page, component, or visual element. Enforces brand design system, corporate aesthetics, accessibility, performance, and visual verification via screenshots.
metadata:
  author: adaptiveops
  version: "1.0.0"
  argument-hint: <component-or-page>
---

# AdaptiveOps Frontend Skill

This skill guides the creation and review of frontend components for the AdaptiveOps corporate website — a Romanian training, coaching, and digital solutions company for manufacturing and automotive industries.

## Before Writing Any Code

1. **Read the design system** from `CLAUDE.md` — colors, typography, component specs
2. **Read content files** from `lib/content/` — never hardcode text in components
3. **Check `public/`** for existing assets (logos, images) before using placeholders
4. **Identify the target** — which page/component, what section, what purpose

## Design System (Strict)

### Colors — use ONLY these
```
Primary:    #0B1F3B   (dark backgrounds, header, hero sections)
Accent:     #2F80ED   (primary buttons, links, highlights)
Secondary:  #10B981   (positive elements, success indicators)
Dark:       #111827
Mid:        #6B7280
Light:      #F3F4F6   (light section backgrounds)
White:      #FFFFFF
Border:     #E5E7EB
Body text:  #374151
```

Never invent new brand colors. Never use default Tailwind palette colors (indigo-500, blue-600, etc.) as primary.

### Typography — Inter only
```
Font: Inter (Google Fonts) — all weights
H1: 48–56px, font-bold, tracking-tight
H2: 36–40px, font-bold
H3: 24–28px, font-semibold
Body: 16–18px, font-normal, leading-relaxed (1.7)
Small: 14px, text-gray-500
```

### Components
- **Primary buttons**: bg-[#2F80ED] text-white rounded-lg px-6 py-3 hover:bg-[#2563EB] focus-visible:ring-2 active:scale-[0.98]
- **Secondary buttons**: border-[#2F80ED] text-[#2F80ED] bg-transparent rounded-lg px-6 py-3 hover:bg-[#2F80ED]/10
- **Cards**: bg-white border border-[#E5E7EB] shadow-sm rounded-xl hover:shadow-md transition-shadow
- **Dark sections**: bg-[#0B1F3B] text-white
- **Light sections**: bg-[#F3F4F6] text-[#111827]

## Corporate Aesthetic Rules

### DO — Professional & Industrial
- Clean, structured layouts with clear visual hierarchy
- Generous whitespace between sections (py-16 md:py-24)
- Subtle entrance animations (fade-up, opacity transitions)
- Count-up animations on statistics (EUR 3.2M, 51%, 30%, 20+)
- Consistent spacing tokens throughout
- Professional photography placeholders or geometric/abstract industrial visuals
- Trust indicators: stats, certifications, client logos

### DON'T — Avoid These
- Flashy/maximalist animations, parallax, or scroll-jacking
- Glassmorphism, neon gradients, or trendy effects
- Generic stock photo aesthetics
- Buzzwords or vague copy — use real numbers and concrete results
- Purple/pink gradients, rainbow effects
- Decorative elements without purpose

## Animation Guidelines

### Subtle & Professional
```
- Entrance: opacity 0→1 + translateY(20px→0), duration 600ms, ease-out
- Stagger: 80-120ms delay between sibling elements
- Stats count-up: duration 2s, triggered on scroll into view
- Hover transitions: duration 200-300ms on transform and opacity only
- NEVER use transition-all
- NEVER use bouncy/spring animations on a corporate site
```

### Scroll-Triggered Animations
- Use Intersection Observer for entrance animations
- Trigger once (don't re-animate on scroll back)
- Keep animations subtle — the content is the hero, not the animation

## Interactive States (Mandatory)

Every clickable element MUST have all three:
1. **hover** — visual feedback (color shift, shadow, slight scale)
2. **focus-visible** — keyboard accessibility (ring-2 outline)
3. **active** — click feedback (scale-[0.98] or darker shade)

## Accessibility Checklist

- Color contrast: minimum 4.5:1 for body text, 3:1 for large text
- All images: meaningful `alt` text or `aria-hidden` for decorative
- Form inputs: visible labels, error states, focus indicators
- Keyboard navigation: logical tab order, skip links
- Semantic HTML: proper heading hierarchy (h1→h2→h3), landmarks, lists
- ARIA attributes only when HTML semantics are insufficient

## Responsive Design (Mobile-First)

```
Default (mobile):  < 768px  — single column, stacked layouts
md (tablet):       ≥ 768px  — 2 columns where appropriate
lg (desktop):      ≥ 1024px — full layout, max-w-7xl container
```

- Touch targets: minimum 44x44px on mobile
- No horizontal scroll on any breakpoint
- Navigation: hamburger menu on mobile, full nav on desktop
- Images: responsive sizes, lazy loading

## Performance Rules

- Images: use Next.js `<Image>` with proper width/height, lazy load below fold
- Fonts: Inter via `next/font/google` with `display: swap`
- Components: prefer server components, use `'use client'` only when needed
- No unused dependencies or large libraries for simple effects
- CSS animations over JS animations where possible

## SEO Requirements

Every page must export metadata:
```typescript
export const metadata: Metadata = {
  title: 'Page Title | AdaptiveOps',
  description: 'Unique description under 160 characters',
  openGraph: {
    title: 'Page Title | AdaptiveOps',
    description: 'Same or adapted description',
  },
}
```

## Shadow System (Layered, Not Flat)

```
Resting:   shadow-sm (cards default)
Hover:     shadow-md (cards on hover)
Elevated:  shadow-lg (modals, dropdowns)
```

Use color-tinted shadows where possible:
```css
shadow-[0_4px_14px_rgba(47,128,237,0.08)]  /* accent-tinted */
shadow-[0_4px_14px_rgba(11,31,59,0.10)]    /* primary-tinted */
```

## Visual Verification Workflow

After creating or modifying any visual component:

1. Ensure dev server runs: `npm run dev` (port 3000)
2. Take screenshot: `node screenshot.mjs http://localhost:3000/page [label]`
   - Generates desktop (1440px) + mobile (390px) automatically
   - Saved to `screenshots/` with auto-increment
3. Read screenshot with Read tool and verify:
   - [ ] Colors match design system exactly
   - [ ] Typography hierarchy is correct
   - [ ] Spacing is consistent and generous
   - [ ] Interactive states visible on hover elements
   - [ ] Mobile layout stacks properly, no overflow
   - [ ] Dark sections have proper contrast
   - [ ] Cards, buttons match component specs
4. Fix issues and re-screenshot until correct

## Tone of Voice (for any copy/text)

- Direct, practical, results-oriented
- Use real numbers: "EUR 3.2M savings", "51% efficiency increase"
- Speak the language of production people, not corporate consultants
- Key phrases: "Built from the shop floor up", "We don't just advise. We implement."
- Never use: empty buzzwords, vague promises, agency jargon

## File Structure

```
components/
├── layout/      → Header, Footer
├── home/        → Hero, Pillars, Benefits, CTABanner
├── shared/      → Button, SectionHeader, Card (reusable)
└── forms/       → ContactForm
lib/content/     → Static data (programs, solutions)
app/             → Pages with metadata exports
public/          → Logo, assets
```

Keep components small and reusable. Each component does one thing well.
