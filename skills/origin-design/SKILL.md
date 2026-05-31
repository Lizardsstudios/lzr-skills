---
name: origin-design
description: Creates distinctive, production-grade product app interfaces by deriving visual identity from the product's own essence — not from external references or aesthetic trends. Use whenever building screens, components, or flows for web apps, SaaS products, dashboards, or mobile apps. Avoids all AI-slop aesthetics by starting from the product's purpose, users, and differentiators.
---

# Origin Design

> **For product apps.** Not landing pages. Not portfolios. This skill builds interfaces for products people use daily — dashboards, SaaS tools, internal tools, mobile apps.

The visual identity of every product must emerge from its own essence: what it solves, who uses it, and what it promises. Never from external references, trend catalogs, or aesthetic imitation.

---

## Section 0 — Product Brief (REQUIRED before any code)

Do not write a single line of code before completing this section. Do not choose a color, font, or layout before completing this section.

Extract these five things from the conversation context. If any is missing, ask for it — one question at a time, not as a list:

### 0.1 — Real Purpose

What does this product solve in one sentence? Not marketing language. The real job it does for real people.

**Wrong:** "A platform that empowers teams to collaborate seamlessly."
**Right:** "Eliminates the manual export-import loop between two legacy systems clients use every day."

If you cannot state the purpose without buzzwords, ask again.

### 0.2 — User Profile

Who uses this product, and in what state do they arrive?

- Technical level: first-time user / occasional / power user
- Frequency: daily tool / occasional reference / one-time setup
- Emotional state when opening: rushed / focused / anxious / curious / overwhelmed

The emotional state directly determines spacing density, color saturation, and animation speed. A user who arrives anxious needs calm — generous spacing, low saturation, no sudden motion.

### 0.3 — Core Job

What is the one action users perform most? Not the most impressive feature — the most repeated action. This action must be the fastest path in the interface.

### 0.4 — Differentiator

What does this product do that no direct competitor does? Does that differentiator need to be visible in the interface, or is it invisible infrastructure?

### 0.5 — Product Type

Choose exactly one:

| Type | Definition | Design implication |
|---|---|---|
| **Tool** | User comes to complete a task, then leaves | Task-first layout, minimal chrome, clear exit paths |
| **Platform** | User lives inside it for extended sessions | Dense navigation, persistent context, fast scanning |
| **Service** | User consumes results produced elsewhere | Data-forward layout, strong hierarchy, reporting patterns |
| **Companion** | User returns for an ongoing relationship | Welcoming tone, progress visibility, reduced cognitive load |

Do not proceed without all five answers.

---

## Section 1 — Visual Identity

Identity is derived from the brief, not chosen from a catalog. Follow this sequence without shortcuts.

### 1.1 — Assign Emotional Tone

From the brief, assign one primary tone and one secondary tone. These two tones govern every visual decision that follows.

| Tone | What it signals | Translates to |
|---|---|---|
| **Precision** | Errors are costly here | High contrast, tight spacing, monospace for data |
| **Trust** | Users depend on this for something important | Conservative palette, clear labels, strong hierarchy |
| **Efficiency** | Users want to finish and leave | Dense UI, clear actions, minimal decoration |
| **Calm** | Users arrive stressed or overwhelmed | Generous spacing, low-saturation palette, slow transitions |
| **Authority** | Product is the expert | Bold typography, structured layout, confident accent color |
| **Focus** | One thing at a time, nothing competing | Minimal chrome, maximum signal-to-noise ratio |

### 1.2 — Color System

**Architecture: 3 layers. Exactly 3. No more.**

Adding a fourth layer means one of the three is being misused. Find and fix the misuse instead of adding a layer.

**Layer 1 — Base (surfaces and borders)**

Derive from emotional tone:
- **Warm tone (calm, trust, companion):** grays with brown or beige undertones
- **Cold tone (precision, efficiency, authority):** grays with blue or slate undertones
- **Dark-first (focus, authority, power tools):** start from near-black (#0f0f0f to #1a1a1a)

```
--bg              Page background
--surface         Cards, panels, input backgrounds
--surface-raised  Dropdowns, tooltips, popovers, modals
--border          Subtle dividers, default borders
--border-strong   Emphasized dividers, active and focused borders
```

**Layer 2 — Text (4 tokens, no exceptions)**

```
--text-primary    Main content — must achieve 7:1 contrast on --bg
--text-secondary  Labels, captions, helper text — must achieve 4.5:1 on --bg
--text-disabled   Non-interactive text — 3:1 minimum, never on interactive elements
--text-inverse    Text placed on colored or dark backgrounds
```

**Layer 3 — Identity and Action (6 tokens)**

```
--accent          Product identity color — maximum 3 appearances per screen
--accent-hover    10–15% darker than --accent
--action          Primary buttons and interactive links exclusively
--action-hover    10–15% darker than --action
--danger          Destructive actions and error states exclusively
--success         Confirmation and positive system states exclusively
```

Rules that never change:
- `--accent` appears at most 3 times per screen. It signals identity, not interaction.
- `--action` is for things the user clicks to make something happen. Never decorative.
- `--danger` and `--success` are system states only.

### 1.3 — Typography

**Three roles. Three intentional choices. No defaults.**

**Role 1 — Display:** page titles, hero numbers, empty state headlines.
Priority: personality and presence. Never: Inter, Roboto, Arial, Space Grotesk, system fonts.

**Role 2 — Interface:** labels, buttons, navigation, form fields.
Priority: legibility at 12–14px under cognitive load.

**Role 3 — Body:** descriptions, help text, long-form content.
Priority: reading comfort at 14–16px.

**Scale (base 16px, 1.25 ratio):**

```
--text-xs:   0.75rem  / 12px  — metadata, timestamps
--text-sm:   0.875rem / 14px  — body, form fields
--text-base: 1rem     / 16px  — primary body
--text-lg:   1.125rem / 18px  — H3
--text-xl:   1.375rem / 22px  — H2
--text-2xl:  1.875rem / 30px  — H1
--text-3xl:  2.75rem  / 44px  — Display
```

No functional text below `--text-xs` (12px). Letter spacing: Display -0.04em → Body 0 → Labels +0.10em.

### 1.4 — Spacing

Base 4px. 9 tokens. No raw values outside this scale.

```
--s1: 4px  --s2: 8px  --s3: 12px  --s4: 16px  --s5: 24px
--s6: 32px  --s7: 48px  --s8: 64px  --s9: 96px
```

| Context | Token range |
|---|---|
| Gap between elements inside a component | --s2 to --s3 |
| Padding inside a component | --s3 to --s5 |
| Gap between components | --s5 to --s6 |
| Spacing between major sections | --s7 to --s9 |

---

## Section 2 — Required Components

Every product app must have all of these defined before launch.

### 2.1 — Button
5 variants: Primary (max 1/screen), Secondary, Ghost, Outline, Danger (always requires confirmation).
4 sizes: xs/28px, sm/32px, md/36px, lg/40px. All 44px touch target on mobile.
States: default → hover → active → focus-visible → loading → disabled.

### 2.2 — Input Field
States: default → focus → filled → disabled → error.
Error sits below the field, never in a toast. Validates on blur. Label always visible above field.

### 2.3 — Card
Variants: default, interactive, selected, loading skeleton.
Skeleton must match exact dimensions of loaded content.

### 2.4 — Data Table
States: loading (skeleton), empty, populated, row-hover.
Row actions on hover only. Empty state follows Section 2.7.

### 2.5 — Modal
Maximum 2 footer actions. Title is imperative. Destructive modal names the specific item.
Focus trapped while open. ESC returns focus to trigger.

### 2.6 — Toast
4 variants: success (auto 4s), error (manual dismiss), warning, info (auto 4s).
Never for form validation errors.

### 2.7 — Empty State
Required: visual + headline + supporting text + action button (when applicable).
"No records found" is not an empty state.

### 2.8 — Loading State
Skeleton: when content shape is known — must replicate exact structure.
Spinner: when unknown — always with context text nearby.

---

## Section 3 — Required States

| State | Consequence when missing |
|---|---|
| Default | — always exists |
| Hover | User doesn't know the element is interactive |
| Focus | App inaccessible to keyboard users |
| Active / Pressed | User taps twice assuming first tap failed |
| Loading | User submits twice; duplicate records |
| Disabled | User taps, nothing happens, confusion |
| Error | User doesn't know the action failed |
| Success | User repeats the action unnecessarily |

Focus state: 3px solid ring, --accent or --action color, 2px offset, minimum 3:1 contrast.

---

## Section 4 — UX Patterns

**One Primary per screen.** If two seem necessary, the screen has two purposes — split it.

**Navigation.** Global and contextual navigation always visually separated. Active state unambiguous. Back uses history — never a hardcoded destination.

**Forms.** Validate on blur. Submit disabled during submission only. On error: return focus to first failed field.

**Destructive actions.** Danger button + confirmation modal naming the specific item + typed confirmation for high-consequence actions.

**Density by product type:**

| Type | Internal gap | Component padding |
|---|---|---|
| Tool | --s3 | --s4 |
| Platform | --s2 | --s3 |
| Service | --s4 | --s5 |
| Companion | --s3 | --s5 |

---

## Section 5 — Anti-Patterns

❌ **Generic fonts (Inter, Roboto, Arial, Space Grotesk)** — signal "AI-generated" to any designer.
❌ **Purple gradient on white** — the most recognizable AI design signature of 2025–2026.
❌ **Glass morphism** — overused to the point of being a cliché, not a choice.
❌ **Two Primary buttons on one screen** — forces the user to decide what the product should decide.
❌ **Toast for form validation errors** — error appears where the user is not looking.
❌ **Modal with 3+ footer actions** — if three options are needed, it is not a modal.
❌ **Raw pixel values outside the 4px scale** — breaks the visual rhythm the system creates.
❌ **Skeleton with wrong dimensions** — causes layout shift on load.
❌ **Icon-only buttons without `aria-label`** — ambiguous for screen reader users.
❌ **Designing to look like another product** — products that look like others never become references.

---

## Section 6 — Quality Checklist

**Identity:** visual identity from brief ✓ · 3-layer color system ✓ · --accent max 3/screen ✓

**Typography:** non-generic fonts in all 3 roles ✓ · scale tokens only ✓ · contrast ratios pass ✓

**Spacing:** 4px scale only ✓ · zero raw pixel values ✓

**Components:** all 8 required ✓ · all 8 states per component ✓

**UX:** 1 Primary/screen ✓ · validate on blur ✓ · destructive confirmations ✓ · history navigation ✓

**Accessibility:** focus states visible ✓ · aria-label on icon buttons ✓ · sequential headings ✓ · 44px touch targets ✓ · prefers-reduced-motion ✓ · no color-only information ✓

**States:** loading within 300ms ✓ · empty states complete ✓ · skeleton dimensions match ✓

---

## Reference Files

Load only when the task requires the specific domain:

- **MOTION.md** — animations, transitions, micro-interactions
- **ACCESSIBILITY.md** — keyboard navigation, screen readers, ARIA, contrast
- **RESPONSIVE.md** — multiple screen sizes, mobile layouts, touch patterns
