# Origin Design

**A Claude Code skill for building product apps with distinctive, non-generic visual identity.**

Most AI-generated interfaces look the same: Inter font, purple gradient on white, glass morphism panels, generic SaaS blue buttons. This skill was built to prevent that.

Origin Design starts from the product's own essence — its purpose, its users, what it promises — and derives a visual identity from those answers. Not from external references. Not from trend catalogs. From the product itself.

---

## What this skill is for

Product apps. Specifically:

- SaaS tools and platforms
- Dashboards and data products
- Internal tools
- Mobile and web apps with real users

**Not for:** landing pages, portfolios, or marketing sites. For those, other skills exist. This skill is built for interfaces people use daily.

---

## What makes it different

**Other design skills start with aesthetics.** They give you a catalog of styles, a set of font rules, a list of patterns to copy. The result is a product that looks like the catalog.

**This skill starts with the product.** Before writing a single line of code, it extracts five things:

1. What does this product actually solve?
2. Who uses it, and what emotional state do they arrive in?
3. What is the one action users do most?
4. What makes it different from everything else?
5. What type of product is it?

From those answers, the visual identity is derived — not chosen from a list. The color palette, the typography choices, the spacing density, the animation speed — all follow from the product's nature.

The goal is a product that looks like it could only be itself.

---

## What it covers

**SKILL.md** (always active)
- Product brief protocol — 5 required questions before any design decision
- Visual identity derivation — how to build from essence, not reference
- Complete color system — 3 layers, 15 tokens, rules for every token
- Typography system — 3 roles, mathematical scale, letter-spacing by size
- 4px spacing scale — 9 tokens, context rules, zero exceptions
- 8 required components — specification for every state
- 8 required states per component — and what breaks when each is missing
- UX patterns for product apps — navigation, forms, destructive actions, density
- Anti-patterns — 11 patterns with the reason each one fails
- Quality checklist — 30 items across identity, typography, spacing, UX, accessibility, loading states

**MOTION.md** (loaded on demand)
- Easing curve table with precise CSS values and correct use cases
- Duration by element weight and interaction type
- Standard motion patterns with implementation code
- GPU-acceleration rules (what you can and cannot animate)
- `prefers-reduced-motion` implementation

**ACCESSIBILITY.md** (loaded on demand)
- WCAG 2.1 AA contrast requirements by content type
- Focus state specification with contrast rules
- Keyboard navigation — complete key behavior table
- ARIA patterns — 8 required patterns with exact markup
- Semantic HTML structure requirements
- Touch target implementation
- Color independence — what counts as sufficient non-color signal
- 30-item accessibility checklist

**RESPONSIVE.md** (loaded on demand)
- 5-breakpoint system with device and strategy context
- Navigation adaptation patterns for mobile and desktop
- Fluid typography with clamp() values
- Touch interaction patterns — tap delay, swipe gestures, safe area insets
- Responsive image implementation
- Breakpoint testing reference (widths where bugs hide)
- Responsive checklist

---

## Installation

```bash
npx skills add https://github.com/[your-org]/origin-design
```

Or copy the folder directly to your project's `.claude/skills/` directory.

---

## How it activates

The skill activates automatically when you ask Claude to:
- Build a screen, component, or interface for an app
- Create a design system or visual identity for a product
- Design a dashboard, tool, or platform

When activated, Claude will ask the 5 brief questions before making any visual decision. This is intentional. Skipping the brief produces generic output — the brief is what makes the output specific.

---

## Philosophy

Generic design is not a skill gap. It is a process gap. When a model is asked to "design a dashboard", it has no product-specific information to work with — so it defaults to what it has seen most: the average of all dashboards. That average is Inter, blue buttons, and white space.

The brief is the solution. It gives the model a specific problem to solve, a specific person to design for, and a specific outcome to create. The visual identity that follows is not chosen — it is derived.

This is how human designers produce work that becomes reference rather than resemblance.

---

## Files

```
origin-design/
├── SKILL.md          The full skill — always loaded when active
├── MOTION.md         Animation specifications — loaded on demand
├── ACCESSIBILITY.md  Accessibility patterns — loaded on demand
├── RESPONSIVE.md     Responsive design rules — loaded on demand
└── README.md         This file
```

---

## License

MIT
