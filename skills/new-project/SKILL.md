---
name: new-project
description: Creates a complete new project from scratch — wizard, design system, visual preview, folder structure, repository, branches, database setup. Triggers on "new project", "new app", "new site", or "/new-project". Guides any user — beginner or experienced — through every decision needed to start a professional project.
command: new-project
---

# New Project

This skill guides the creation of a complete project from zero to first commit. It works for any user — someone who has never built an app before will get the same professional result as an experienced developer.

The process has three phases:
1. **Understand** — the wizard collects everything needed to make the right decisions
2. **Design** — a visual identity is derived from the product brief and presented for approval
3. **Build** — structure, code, and database are created after the design is approved

Do not skip phases. Do not start building before the design is approved.

---

## Phase 1 — Product Wizard

Ask every question below **one at a time**, in order. Never show all questions at once. Wait for the answer before asking the next one.

Every question includes an explanation. Read the explanation to the user before asking. Do not assume they know what the terms mean.

---

### Question 0 — What are we building?

> **Before you answer:** each option creates a different kind of project with different needs.
>
> - **Web app** — a tool or platform people use in their browser to get things done: manage, create, track, collaborate. Has user accounts, stores data, does things.
> - **Website** — a page that presents something: a company, a product, a portfolio, a blog. People read it. It rarely changes. It usually doesn't store anything.
> - **Mobile app** — runs on a phone, installed as an app from a store or directly.
> - **Background service** — works without a visible interface, connecting or automating things between other systems. The user never sees a screen.
> - **Combination** — more than one of the above. Describe what combination.

*"What are we building?"*

→ If **website**: skip Questions 6, 7, 8. Keep Questions 9, 10, 11.
→ If **background service**: skip Questions 6, 7, 9, 10. Keep Questions 8, 11.
→ For all others: ask all remaining questions.

---

### Question 1 — Real purpose

*"What does this product solve, in one sentence? Not marketing language — what does it actually do for the people who use it."*

> **Example of a bad answer:** "A platform that empowers teams to collaborate seamlessly."
> **Example of a good answer:** "Eliminates the manual copy-paste between two systems our clients use every day."
>
> If the answer uses words like "empower", "seamlessly", "ecosystem", or "synergy" — ask again. Those words describe feelings, not functions.

---

### Question 2 — Who uses it

*"Who will use this product? Tell me: how comfortable they are with technology (beginner / intermediate / expert), how often they use it (every day / occasionally / once), and what state they arrive in — rushed, calm, or anxious."*

> **Why this matters:** a person who arrives anxious needs calm — generous spacing, low-saturation colors, slow animations. A power user who comes every day needs density — more information per screen, faster navigation. The visual design changes completely based on this answer.

---

### Question 3 — The main action

*"What is the one thing users will do most often? Not the most impressive feature — the most repeated action."*

> **Example:** in an invoicing app, the most impressive feature might be automatic tax calculation — but the most repeated action is "create new invoice". That action gets the shortest path in the interface.

---

### Question 4 — The differentiator

*"What does this product do that no direct competitor does? And does that need to be visible on screen, or is it something that happens behind the scenes?"*

---

### Question 5 — Feeling

*"How should the product make the user feel? Choose one word: confident, calm, fast, in control, excited, professional, playful."*

> This word governs the visual tone — colors, animations, spacing, typography choices. It's not decoration. It's direction.

---

### Question 6 — User profiles

> **Before you answer:** some products have only one type of user — everyone sees the same things and can do the same things. Other products have different profiles — for example, a manager who can approve things that a regular employee created, or an admin who sees everything while a client sees only their own data.
>
> This decision is hard to change later because it affects how access and permissions are built throughout the entire project.

*"Does this product have more than one type of user with different levels of access?"*

- **One profile** — everyone does the same things, sees the same screens
- **Two profiles** — for example: admin + regular user, manager + employee, company + client
- **Three or more profiles** — describe who they are

---

### Question 7 — Number of companies

> **Before you answer:** some products are used by one organization only — internal tools, personal projects, or products built for a single client. Others are used by multiple companies simultaneously, each with their own separate data — like an invoicing tool that different businesses subscribe to independently.
>
> **This is the most important architectural decision in the entire wizard.** It changes the database structure fundamentally and is very difficult to reverse after building has started.
>
> - **One company only** — all users belong to the same organization. Data is shared.
> - **Multiple companies** — each company has its own account, its own users, its own data. One company can never see another company's data.

*"Will this product be used by one organization or by multiple separate companies?"*

---

### Question 8 — How users get in

> **Before you answer:** this defines how people prove who they are before using the product.
>
> - **Open** — anyone can access without creating an account. No login.
> - **Sign up** — users create their own account with email and password.
> - **Invitation only** — users can only join if someone already inside sends them an invitation.
> - **Corporate login** — the company manages access through their own identity system (Google Workspace, Microsoft 365, etc.). Users log in with their work account.

*"How will users access this product?"*

---

### Question 9 — Dark mode

> **Before you answer:** some products offer a dark version of their interface — dark backgrounds, lighter text — in addition to the standard light version. This is a significant design decision because it doubles the color system work.
>
> - **Light only** — simpler to build, works for most products
> - **Light and dark** — users choose which they prefer. More work to build, but many users strongly prefer dark mode
> - **Dark only** — common for monitoring tools, developer tools, products used in low-light environments

*"Does this product need a dark mode?"*

---

### Question 10 — Project structure

> **Before you answer:** this decides whether the visible interface and the data processing logic live in the same project or in separate ones.
>
> - **Everything together** — the screens and the data logic live in one project. Simpler, easier to develop, works for most cases. Recommended when in doubt.
> - **Separated** — the screens in one project, the data logic in another. Makes sense when different parts grow at different speeds, when there will be multiple apps (web + mobile + API) consuming the same data, or when different teams manage different parts.
>
> **When unsure: choose everything together.** Separating later is possible. Merging what was separated is painful.

*"Should everything live in one project, or should the interface and data logic be separate?"*

---

### Question 11 — Storing information

> **Before you answer:** every app that remembers things needs a place to store them. Without a database, everything the user does disappears when they close the browser — like a notepad that erases itself.
>
> **You need a database if your app:**
> - Saves user registrations or any kind of account
> - Keeps records, orders, history, or any information between sessions
> - Lets users come back and find their work where they left it
> - Has more than one person accessing the same information
>
> **You do NOT need a database if your app:**
> - Is a calculator, converter, or tool that only processes and shows results
> - Is a presentation page that never changes
> - Stores everything only on the user's device and never needs to share

*"Will your app need to store information permanently?"*

- **Yes, it will store information** → continue to database setup below
- **No, it doesn't need to store anything** → skip database setup
- **I'm not sure** → answer these two questions: Does the user need to log in? Does the app remember anything between sessions? If yes to either → it needs a database.

**If yes — database connector check:**

Silently check if the Supabase MCP connector is configured in the user's environment.

→ **If configured:** confirm to the user and continue.

→ **If not configured:** say:

> "You don't have the database connector set up yet. This connector lets your AI work directly with your database — creating tables, writing queries, managing data — without leaving your editor.
>
> Would you like me to install and configure it for you now? It takes less than a minute."

- **Yes** → install and configure automatically, confirm when done, continue
- **No** → note that database features won't be available until configured manually, provide the setup link, continue

---

## Phase 1 Summary

After all questions are answered, present a one-paragraph summary:

> "Here's what we're building: [type] — [purpose in one sentence]. It's used by [user profile] who arrives [emotional state]. The main action is [core action]. [Differentiator if visible]. The product should feel [feeling]. [Structure note]. [Auth note]. [Database note]."

Ask: *"Does this sound right? Any corrections before we continue?"*

Wait for confirmation before proceeding to Phase 2.

---

## Phase 2 — Design System

After the brief is confirmed, derive the visual identity and create two files.

### Step 1 — Derive the identity

From the brief answers, determine:

**Emotional tone** (from Questions 2 + 5):
- Rushed user + "fast" feeling → efficiency tone: dense layout, high contrast, minimal decoration
- Anxious user + "calm" feeling → calm tone: generous spacing, muted palette, slow transitions
- Expert user + "professional" → authority tone: bold typography, structured layout
- Beginner user + "confident" → trust tone: conservative palette, clear labels, strong hierarchy

**Color temperature** (from tone):
- Efficiency / Authority → cold grays (blue-slate undertones)
- Calm / Trust → warm grays (beige-brown undertones)
- Playful / Excited → start from a vivid hue, build neutrals around it

**Density** (from Question 2 frequency + product type):
- Platform used daily → compact: --s2/--s3 gaps
- Tool used occasionally → comfortable: --s3/--s4 gaps
- Site → spacious: --s4/--s5 gaps

**Dark mode** (from Question 9):
- Include or exclude dark mode tokens accordingly

### Step 2 — Create PRODUCT-IDENTITY.md

Create this file at the project root:

```markdown
# Product Identity — [Product Name]

> This file defines the essence of this product. It does not change unless the product's
> purpose, audience, or market position changes. It is read at the start of every session
> to maintain consistency across all design and code decisions.

## Purpose
[One sentence — the real job this product does]

## User
[Who uses it, how often, in what emotional state]

## Core Action
[The most repeated action — what gets the shortest path]

## Differentiator
[What no competitor does — and whether it shows on screen]

## Feeling
[The one word that governs tone]

## Product Type
[Tool / Platform / Service / Companion / Website]

## Access Model
[Open / Sign up / Invitation / Corporate login]

## Scope
[Single company / Multi-company]

## Structure
[Everything together / Separated]
```

### Step 3 — Create DESIGN-SYSTEM.md

Create this file at the project root. This is the living document — it evolves as the product evolves.

```markdown
# Design System — [Product Name]

> This file is the single source of truth for all visual decisions in this project.
> Every screen, component, and interaction follows these rules.
> When a visual decision changes, this file is updated first.

## Emotional Tone
Primary: [tone]
Secondary: [tone]

## Color System

### Layer 1 — Surfaces
--bg:             [value]  /* page background */
--surface:        [value]  /* cards, panels */
--surface-raised: [value]  /* dropdowns, modals */
--border:         [value]  /* subtle dividers */
--border-strong:  [value]  /* active borders */

### Layer 2 — Text
--text-primary:   [value]  /* 7:1 contrast on --bg */
--text-secondary: [value]  /* 4.5:1 contrast on --bg */
--text-disabled:  [value]  /* 3:1 — non-interactive only */
--text-inverse:   [value]  /* on colored backgrounds */

### Layer 3 — Identity and Action
--accent:         [value]  /* product identity — max 3/screen */
--accent-hover:   [value]
--action:         [value]  /* primary buttons and links */
--action-hover:   [value]
--danger:         [value]  /* destructive actions */
--success:        [value]  /* positive states */

[If dark mode: repeat all tokens under ## Dark Mode]

## Typography

### Fonts
Display:   [font name] — [why this font for this product]
Interface: [font name] — [why this font for this product]
Body:      [font name] — [why this font for this product]

### Scale
--text-xs:   0.75rem  / 12px
--text-sm:   0.875rem / 14px
--text-base: 1rem     / 16px
--text-lg:   1.125rem / 18px
--text-xl:   1.375rem / 22px
--text-2xl:  1.875rem / 30px
--text-3xl:  2.75rem  / 44px

## Spacing
Base: 4px
--s1: 4px  --s2: 8px  --s3: 12px  --s4: 16px  --s5: 24px
--s6: 32px  --s7: 48px  --s8: 64px  --s9: 96px

Default density: [compact / comfortable / spacious]

## Border Radius
--r-sm:  [value]  /* inputs, badges, chips */
--r-md:  [value]  /* cards, panels */
--r-lg:  [value]  /* modals, large containers */
--r-full: 9999px  /* pills, avatars */

## Shadows
--shadow-sm: [value]  /* subtle lift */
--shadow-md: [value]  /* cards on hover */
--shadow-lg: [value]  /* modals, dropdowns */

## Components
[For each component: variant names, size names, which tokens each state uses]

## Decision Log
[Date] — [What changed] — [Why] — [Scope: global or this element only]
```

### Step 4 — Generate design-preview.html

Generate a single self-contained HTML file at the project root that visually renders the complete design system. This file has no external dependencies — all CSS is inline.

The preview must show:

1. **Identity header** — product name, one-line purpose, feeling word
2. **Color palette** — every token as a colored swatch with its name and value
3. **Typography** — all 7 scale levels in both Display and Interface fonts, with size and weight labels
4. **Buttons** — all 5 variants (Primary, Secondary, Ghost, Outline, Danger) in all 4 sizes, all states
5. **Input field** — all states (default, focus, filled, error, disabled)
6. **Card** — default and hover states
7. **Badges** — all 5 semantic variants
8. **Spacing** — visual ruler showing all 9 tokens
9. **Border radius** — all 4 values as visual samples
10. **Shadows** — all 3 levels as visual samples
11. **If dark mode:** a toggle that switches the entire preview between light and dark

After generating the file, say:

> "The design system is ready. Open **design-preview.html** in your browser to review it.
>
> Everything you see — colors, fonts, buttons, spacing — is what every screen in this project will use. Look at each section and tell me:
> - Does the color palette feel right for [product name]?
> - Do the fonts match the [feeling] tone we're going for?
> - Is the overall direction correct?
>
> Once you approve, I'll start building. If anything needs adjusting, tell me what and I'll update both the design system and the preview."

Wait for approval before proceeding to Phase 3.

---

## Design Change Protocol

At any point during development, if the user requests a visual change — a color, a font, a component style, a spacing — before applying it, ask:

> "This change affects [what changed]. Should this apply to the entire project (updating the design system for all screens), or is this an exception for this specific element only?"

- **Entire project** → update the token in DESIGN-SYSTEM.md, update globals.css, log the decision in the Decision Log with date and reason. All screens using that token update automatically.
- **This element only** → apply as a one-off override. Do not change the design system. Note it as an exception in a code comment.

Never apply a visual change without asking this question first.

---

## Phase 3 — Build

Only after the design system is approved.

### Step 1 — Create project structure

Based on Question 0 (type) and Question 10 (structure), create the correct template:

- **Web app, everything together** → use the web template
- **Web app, separated** → use the web template for the interface project, api template for the service project
- **Background service** → use the api template
- **Website** → use the web template

Create the folder structure silently. Do not describe each file being created — just confirm when done.

### Step 2 — Apply the design system

Copy all token values from DESIGN-SYSTEM.md into `src/styles/globals.css`. Replace all placeholder values.

Copy PRODUCT-IDENTITY.md and DESIGN-SYSTEM.md into the project root.

### Step 3 — Repository setup

Create the repository. Set up branches:
- `main` — production (protected)
- `develop` — integration (default branch)

### Step 4 — Database structure (if applicable)

Based on the wizard answers, create the initial database structure:

- **Single company + sign up** → users table with profile, authentication setup
- **Multi-company + sign up** → companies table, users table with company relationship, row-level security policies
- **Invitation only** → add invitations table
- **Corporate login** → configure OAuth provider

Create the initial schema files in the database folder. These are not applied automatically — confirm with the user before applying.

### Step 5 — Confirm to user

```
Project [name] created.

Local:         [local-directory]
Repository:    [github-url]
Branch:        develop

Design system: DESIGN-SYSTEM.md ✓
Identity:      PRODUCT-IDENTITY.md ✓
Preview:       design-preview.html ✓ (open to review anytime)

Database:      [configured / not applicable]
Connector:     [installed / not installed — link to setup]

Ready to build. What screen should we start with?
```

---

## Consistency Rules (always active)

Once a project has PRODUCT-IDENTITY.md and DESIGN-SYSTEM.md, these rules apply in every session:

1. **Read both files at the start of every session** before making any design or code decision.
2. **Never choose a color, font, or spacing value** that is not in the design system.
3. **Never create a new token** without adding it to DESIGN-SYSTEM.md first.
4. **Always ask the propagation question** before applying any visual change.
5. **Log every design decision** in the Decision Log with date, what changed, why, and scope.
