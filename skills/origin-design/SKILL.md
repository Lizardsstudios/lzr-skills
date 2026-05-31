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

Two-tone combination examples:
- Medical tool: Precision + Trust → dark neutral base, 1 accent used only for critical actions
- Personal finance: Calm + Trust → warm gray base, muted green as the identity accent
- Internal analytics: Efficiency + Authority → cold neutral base, bold single-color accent

### 1.2 — Color System

**Architecture: 3 layers. Exactly 3. No more.**

Adding a fourth layer means one of the three is being misused. Find and fix the misuse instead of adding a layer.

**Layer 1 — Base (surfaces and borders)**

These 5 tokens define all backgrounds and separators. Derive them from the emotional tone:

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
--text-disabled   Non-interactive text — 3:1 minimum
--text-inverse    Text placed on colored or dark backgrounds
```

Rule: `--text-disabled` is never used on interactive elements. Its contrast (3:1) does not meet accessibility requirements for anything the user must read to act.

**Layer 3 — Identity and Action (6 tokens)**

```
--accent          Product identity color — maximum 3 appearances per screen
--accent-hover    10–15% darker than --accent
--action          Primary buttons and interactive links exclusively
--action-hover    10–15% darker than --action
--danger          Destructive actions and error states exclusively
--success         Confirmation and positive system states exclusively
```

**Rules that never change:**

- `--accent` signals product identity, not interaction. It appears at most 3 times per screen (logo, key metric, one accent element).
- `--action` is for things the user clicks to make something happen. Never decorative.
- `--danger` and `--success` are system states. They communicate what happened, not how the product looks.
- `--accent` and `--action` can be the same color only if the product identity IS the primary action. Otherwise they must differ.

### 1.3 — Typography

**Three roles. Three intentional choices. No defaults.**

Before selecting fonts, answer from the brief: does this product communicate precision, warmth, authority, or creativity? The answer determines which category of font to look for.

**Role 1 — Display**
Used for: page titles, hero numbers, empty state headlines, section headers.
Priority: personality and presence. Legibility is secondary.
Must be: unexpected, characterful, intentional.
Never: Inter, Roboto, Arial, Space Grotesk, system fonts as primary.

**Role 2 — Interface**
Used for: labels, buttons, navigation items, form fields, table headers.
Priority: legibility at 12–14px under cognitive load.
Must be: functional but not neutral. Still expresses a point of view.
May be: the same as Display or different — decide based on whether they complement.

**Role 3 — Body**
Used for: descriptions, help text, tooltips, long-form content.
Priority: reading comfort at 14–16px for extended periods.
Must be: optimized for line lengths of 60–75 characters.

**Scale (base 16px, 1.25 ratio):**

```
--text-xs:   0.75rem  / 12px  — metadata, timestamps, legal fine print
--text-sm:   0.875rem / 14px  — body text, form fields, table cells
--text-base: 1rem     / 16px  — primary body, descriptions
--text-lg:   1.125rem / 18px  — H3 equivalent, card titles
--text-xl:   1.375rem / 22px  — H2 equivalent, section headers
--text-2xl:  1.875rem / 30px  — H1 equivalent, page titles
--text-3xl:  2.75rem  / 44px  — Display, hero numbers, empty state titles
```

No functional text ever goes below `--text-xs` (12px / 0.75rem). Labels must be readable under stress.

**Letter spacing by size:**

```
Display:         -0.04em  (tighter — large text needs tighter tracking)
H1 (2xl):        -0.03em
H2 (xl):         -0.02em
H3 (lg):         -0.01em
Body (base, sm): 0        (default)
Labels (mono):   +0.10em  (looser — small caps and mono need air)
```

**Line height by role:**

```
Display and H1: 1.0–1.1   (tight — headlines don't need room to breathe)
H2 and H3:     1.2–1.3
Body:           1.6–1.7   (generous — sustained reading requires space)
Labels:         1.4–1.5
```

### 1.4 — Spacing

Base 4px. 9 tokens. No raw values outside this scale.

```
--s1:  4px   Micro gaps — icon to icon, between tag chips
--s2:  8px   Icon + text gap, tight internal spacing
--s3:  12px  Default gap inside components
--s4:  16px  Standard component padding, button horizontal padding
--s5:  24px  Card padding, section internal spacing
--s6:  32px  Container padding, gap between major components
--s7:  48px  Page-level padding, large section gap
--s8:  64px  Generous section spacing
--s9:  96px  Major section breaks, hero bottom margin
```

**When to use which:**

| Context | Token range |
|---|---|
| Gap between elements inside a component | --s2 to --s3 |
| Padding inside a component | --s3 to --s5 |
| Gap between components on the screen | --s5 to --s6 |
| Spacing between major page sections | --s7 to --s9 |

Never write `padding: 13px`. Never write `margin: 7px`. If the design needs 13px, the design needs --s3 (12px) or --s4 (16px) and one of them is the right answer.

---

## Section 2 — Required Components

Every product app must have all of these defined before launch. Each one is required because each one will be encountered by real users. Missing any is a product that is not finished.

### 2.1 — Button

**5 variants with strict semantic purpose:**

| Variant | Purpose | Rule |
|---|---|---|
| **Primary** | The most important action on the screen | Maximum 1 visible per screen at any time |
| **Secondary** | Alternative action of lower weight | Never used for the main action |
| **Ghost** | Minimum visual presence, tertiary importance | For actions that are available but not recommended |
| **Outline** | Bordered, secondary contexts and toolbars | When Secondary would be too strong |
| **Danger** | Destructive and irreversible actions only | Always requires a confirmation step before executing |

**4 sizes:**

```
xs — 28px height  Dense tables and inline toolbars
sm — 32px height  Compact UIs and tight spaces
md — 36px height  Default for most product interfaces
lg — 40px height  Hero areas and onboarding flows
```

On mobile, all sizes achieve 44px minimum touch target through tap area extension.

**All states must be defined:**
default → hover → active/pressed → focus-visible → loading → disabled

**Non-negotiable rules:**
- A loading button disables interaction and shows a spinner. It does not change size or shift layout.
- A button with only an icon and no visible text must have `aria-label` describing the action.
- A Danger button never stands alone as the only available action. There must always be a cancel or safe path.

### 2.2 — Input Field

**Required states:** default → focus → filled → disabled → error

**Non-negotiable rules:**
- Error message sits directly below the failed field. Never in a toast. The user's eyes are on the form, not the corner of the screen.
- Validation fires on blur (when focus leaves the field), not on submit.
- Placeholder text uses `--text-placeholder` token. Using `--text-secondary` or `--text-disabled` here fails contrast requirements.
- The field label is always visible above the field. Labels that disappear when the user starts typing are navigation failures.
- Error state always uses: `--danger` color + error icon + descriptive text message. Color alone is insufficient (8% of men have color blindness).

### 2.3 — Card

**Required variants:** default, interactive (clickable), selected, loading (skeleton)

**Rules:**
- Background: `--surface`
- Default border: 1px solid `--border`
- Hover (interactive card): border shifts to `--border-strong`. No shadow.
- Selected: border shifts to `--accent`, background shifts to a tinted surface.
- Padding: `--s5` (24px) standard. `--s4` (16px) for compact density.
- Skeleton card must have the exact same height, width, and internal structure as the loaded card.

### 2.4 — Data Table

**Required states:** loading (skeleton rows), empty, populated, row-hover

**Non-negotiable rules:**
- Row actions (edit, delete, etc.) appear on row hover only. Never always visible — they create noise in data-heavy tables.
- The active sort column shows both a directional icon and a visual change in the column header.
- Empty state is not the text "No records found". It follows the empty state specification in Section 2.7.
- Skeleton rows match the count and column structure of real data rows.
- Checkbox selection column (if present) has a select-all header checkbox.

### 2.5 — Modal

**Maximum 2 actions in the footer.** Primary action on the right. Cancel or dismiss on the left.

**Non-negotiable rules:**
- Always closeable via: X button in header, ESC key, click outside the modal — EXCEPT destructive confirmation modals, which require explicit choice.
- Modal title is imperative mood: "Delete Account". Never a question: "Are you sure you want to delete this account?".
- A destructive confirmation modal names the specific item: "Delete 'Project Alpha'" — not "Delete this project".
- While open, keyboard focus is trapped inside the modal. ESC returns focus to the element that triggered the modal.
- If the modal contains a form, the primary action is disabled during submission.

### 2.6 — Toast / Notification

**4 semantic variants:** success, error, warning, info

**Rules:**
- Success and info auto-dismiss after 4 seconds.
- Error stays visible until the user dismisses it. An error that disappears before the user reads it is a support ticket waiting to happen.
- Position: top-right on desktop, top-center on mobile.
- Used for: async operation results (save completed, export ready, sync failed).
- Never used for: form field validation errors (those belong in the field), blocking messages that require a decision (those need a modal).

### 2.7 — Empty State

Every list, table, feed, or data container must have an empty state. No component may show a blank area or the text "No results".

**Required elements:**
1. Visual: an icon or illustration relevant to the content type
2. Headline: explains the situation in plain language
3. Supporting text: gives context ("You have no invoices yet" vs "Invoices will appear here once you create them")
4. Action button (if the user can do something): direct path to resolve the emptiness

**Test:** would a first-time user understand what to do next when they see this? If not, the empty state is not complete.

### 2.8 — Loading State

Every operation that waits for a response must show feedback within 300ms.

**Skeleton:** when the shape of the content is known (lists, tables, cards). The skeleton must replicate the exact structure of the real content — same number of rows, same column widths, same card dimensions.

**Spinner:** when the shape of the content is unknown (page transitions, background processes). A spinner never appears alone. It must be accompanied by context text ("Loading your transactions…").

**Rule:** no white flash, no layout shift when content arrives. The skeleton prevents both.

---

## Section 3 — Required States for Every Interactive Component

A state that is not defined will eventually be encountered. There are no theoretical users — only real ones.

| State | What it communicates | Consequence when missing |
|---|---|---|
| **Default** | Component at rest | — always exists |
| **Hover** | This element can be interacted with | User does not know it is clickable |
| **Focus** | Keyboard cursor is here | App is inaccessible to keyboard users |
| **Active / Pressed** | The interaction registered | User taps twice assuming the first tap failed |
| **Loading** | Async work is in progress | User submits twice; duplicate records |
| **Disabled** | Action unavailable in this context | User taps; nothing happens; confusion |
| **Error** | Something went wrong | User does not know the action failed |
| **Success** | Action completed | User repeats the action unnecessarily |

**Focus state specification:**
- Visible ring: 3px solid, `--accent` or `--action` color
- Offset: 2px from the element boundary
- Contrast against background: minimum 3:1
- Never hidden, never `outline: none` without a replacement

---

## Section 4 — UX Patterns for Product Apps

### 4.1 — One Primary Action Per Screen

Every screen has exactly one most important action. That action uses the Primary button.

If two Primary buttons seem necessary, the screen is doing two jobs. Separate the jobs.

Secondary, ghost, and outline buttons carry all other actions without competing for attention.

### 4.2 — Navigation Rules

**Global navigation** (where in the product am I?) and **contextual navigation** (what can I do here?) are always visually separated. They never share the same visual hierarchy.

Active state in navigation is unambiguous. Not just slightly bolder. Not just underlined. Unmistakably active.

Back navigation uses the browser or app history. It never hardcodes a destination. A user who navigated to a screen through a search result must return to the search result, not to the home screen.

### 4.3 — Form Patterns

- One form, one purpose. Unrelated fields do not share a form.
- Required fields: if most fields are required, mark what is optional (one marker vs. many).
- Validation fires on blur. Never on every keystroke (annoying). Never only on submit (too late).
- Submit button is disabled during submission only — not before.
- On success: navigate away or show explicit success state. Never leave the form in its submitted state looking unchanged.
- On any error: return keyboard focus to the first failed field. The user should not have to hunt for the problem.

### 4.4 — Destructive Actions

Any action that permanently removes data, removes access, or cannot be undone requires:

1. **Danger variant button** to signal the weight of the action
2. **Confirmation modal** naming the specific item: "Delete 'Q4 Revenue Report'" not "Delete this item"
3. **For high-consequence actions** (deleting an account, removing all data): a typed confirmation where the user types the item name or the word "delete"

"Are you sure? Yes / No" is not a confirmation pattern. It is a rubber stamp. Users click through it without reading.

### 4.5 — Density by Product Type

Product type determines the default spacing scale:

| Product type | Internal gap | Component padding | Page padding |
|---|---|---|---|
| **Tool** | --s3 (12px) | --s4 (16px) | --s7 (48px) |
| **Platform** | --s2 (8px) | --s3 (12px) | --s6 (32px) |
| **Service** | --s4 (16px) | --s5 (24px) | --s7 (48px) |
| **Companion** | --s3 (12px) | --s5 (24px) | --s7 (48px) |

Density is a design decision, not an accident. Never mix densities within the same product without an explicit and justified reason.

---

## Section 5 — Anti-Patterns

Each rule exists because of real and recurring failures. Understanding the reason allows judgment in edge cases.

❌ **Generic fonts as primary (Inter, Roboto, Arial, Space Grotesk, system fonts)**
These fonts signal "generated by AI" to any designer who reviews the work. The product goal is to look intentionally designed. Use fonts with personality and specificity.

❌ **Purple gradient on white background**
The most recognizable signature of AI-generated interfaces as of 2025–2026. It signals the absence of intentional design decisions. Never.

❌ **Glass morphism (frosted panel backgrounds)**
Overused to the point of being a visual shortcut rather than a design choice. It adds visual complexity without adding information.

❌ **Two Primary buttons on the same screen**
Destroys action hierarchy. Forces the user to decide which action the product considers more important — which is the product's job, not the user's. If two primaries seem necessary, the screen has two purposes. Separate them.

❌ **Toast notification for form field validation errors**
The error message appears in one location while the user's attention is in another. The connection between cause and message is lost. Form errors belong in the field where the error occurred.

❌ **Modal with 3 or more footer actions**
Three choices create the paralysis of selection. If three options are genuinely needed, the decision is complex enough to warrant its own screen, not a modal.

❌ **Spacing outside the 4px scale**
A single exception (padding: 13px) is invisible to the user but visible to every designer who reads the code. Worse, it breaks the rhythm that makes the interface feel coherent. Rhythm is felt before it is named.

❌ **Empty state with only text**
Text-only empty states ("No results found") communicate failure, not possibility. Every empty state is an opportunity to communicate what the product does and give the user a clear next step.

❌ **Skeleton with wrong dimensions**
A skeleton that differs in shape from the content it represents causes layout shift on load. Layout shift destroys perceived performance. The skeleton is a wireframe of the real content — same height, same structure.

❌ **Icon-only buttons with no accessible label**
Icons are ambiguous under cognitive load, for color-blind users, and for screen reader users. `aria-label` is not optional for any button without visible text.

❌ **Designing the interface to look like another product**
"I want it to look like [other product]" is a request to build the visual identity of someone else's product. The visual identity of this product must come from this product's essence. Products that look like other products do not become references — they remain comparisons.

---

## Section 6 — Quality Checklist

Run every item on this list before considering any interface complete.

**Product Identity**
- [ ] Does the visual identity emerge from this product's brief answers — not from an external reference?
- [ ] Can the emotional tone (from Section 1.1) be named and traced to the brief?
- [ ] Does the color system have exactly 3 layers?
- [ ] Does `--accent` appear 3 or fewer times per screen?

**Typography**
- [ ] Are all three font roles filled with non-generic, intentional choices?
- [ ] Is every text size a token from the defined scale? Zero raw pixel values.
- [ ] Does every text + background combination pass its required contrast ratio?
- [ ] Labels use `--text-secondary`, never `--text-disabled` (contrast failure for interactive elements).

**Spacing**
- [ ] Is every spacing value a token from the 4px scale?
- [ ] Zero raw pixel values in any padding, margin, or gap property?

**Components**
- [ ] All 8 required components defined: Button, Input, Card, Table, Modal, Toast, Empty State, Loading?
- [ ] All 8 states defined for every interactive component?

**UX**
- [ ] Exactly 1 Primary button per screen?
- [ ] All form fields validate on blur, not on submit?
- [ ] All destructive actions require explicit confirmation?
- [ ] Back navigation uses history — zero hardcoded destinations?
- [ ] Every form returns focus to the first error field on failure?

**Accessibility**
- [ ] All interactive elements have visible focus states (3px ring, 3:1 contrast minimum)?
- [ ] All icon-only buttons have `aria-label`?
- [ ] Heading hierarchy is sequential (h1 → h2 → h3, no level skipped)?
- [ ] All interactive elements have a minimum 44×44px touch target?
- [ ] `prefers-reduced-motion` is respected in all transitions and animations?
- [ ] No information is conveyed by color alone (always color + icon + text)?

**Loading and Empty States**
- [ ] Every async operation has a loading state visible within 300ms?
- [ ] Every data container has an empty state with visual + headline + supporting text + action?
- [ ] Skeleton dimensions match the exact structure of real content?

---

## Reference Files

Load these only when the task requires their specific domain. Loading all of them at once wastes context budget.

- **MOTION.md** — Load when designing animations, hover transitions, page transitions, or any timed interaction
- **ACCESSIBILITY.md** — Load when verifying keyboard navigation, screen reader compatibility, ARIA patterns, or contrast
- **RESPONSIVE.md** — Load when adapting layouts to mobile, designing breakpoint behavior, or defining touch patterns
