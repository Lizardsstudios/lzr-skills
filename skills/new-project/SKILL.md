---
name: new-project
description: Creates a complete new project — folder structure, repository, branches, review workflow — preceded by a product brief wizard that feeds the design skill. Use when starting any new web app, site, or backend service. Triggers automatically on "new project", "new app", "new site", or "/new-project".
command: new-project
---

# New Project

Starts a new project the right way: product brief first, then structure, then design identity.

This skill does not invent conventions or patch template bugs. It executes what varies per project: the product brief, folder structure, repository setup, and the handoff to the design skill.

---

## Product Brief Wizard (REQUIRED before any technical step)

The wizard collects the product brief. Without it, the project gets correct technical structure but generic visual identity. The wizard is what makes each project visually unique.

Ask the questions below **one at a time**, in order. Never present them as a list — the user needs to think through each answer separately.

### Question 0 — What are we building?

Present these options:
- Web app (platform, tool, management dashboard)
- Website (institutional, landing page, blog)
- Mobile app
- Backend service (automation, agent, integration — no UI)
- Combination (describe)

**If "backend service":** skip questions 1–5. Go directly to the technical flow — services have no UI and the design skill does not apply.

**For all others:** continue with the questions below.

### Question 1 — Real purpose

"What does this product solve, in one sentence? Not marketing language — what does it actually do for the people who use it."

Example of a bad answer: "A platform that empowers teams to collaborate."
Example of a good answer: "Eliminates the manual copy-paste between two systems our clients use every day."

If the answer sounds like marketing copy, ask again.

### Question 2 — User profile

"Who will use this? Tell me: their technical level (beginner / intermediate / expert), how often they use it (every day / sometimes / once), and what state they arrive in — rushed, calm, anxious?"

This answer determines visual density, color saturation, and animation speed.

### Question 3 — Core action

"What is the one thing users will do most often? Not the most impressive feature — the most repeated action."

This determines what must be the fastest path in the interface.

### Question 4 — Differentiator

"What does this product do that no direct competitor does? And does that need to be visible on screen, or is it invisible infrastructure?"

### Question 5 — Feeling

"How should the product make the user feel: confident? Calm? Fast? In control? Excited? Pick one word."

### After all 5 answers

1. Present a one-line brief summary for the user to confirm.
2. With confirmation, proceed to the technical questions (name, visibility).
3. After completing all technical steps, hand the brief to the **origin-design** skill:

```
Product brief for origin-design:

Type: [answer 0]
Purpose: [answer 1]
User: [answer 2]
Core action: [answer 3]
Differentiator: [answer 4]
Desired feeling: [answer 5]

Based on this brief, propose the visual identity for the project following the origin-design skill rules. Derive the palette, typography, tone, and density from this product — not from external references.
```

---

## Technical Flow

### Step 1 — Validate parameters

Ask the user:
- Project name (lowercase, hyphens only — e.g. `my-app`)
- Type: `web` or `api`
- GitHub organization or username
- Visibility: `public` or `private`
- Local parent directory

### Step 2 — Create repository

```bash
gh repo create <org>/<name> \
  --template <template-repo> \
  --<public|private> \
  --clone
```

Templates:
- `web` → use your web template or scaffold with the standard structure below
- `api` → use your API template or scaffold with the standard structure below

**Standard web folder structure (if no template):**
```
src/
├── app/            # pages and routing
├── components/
│   └── ui/         # system components
├── hooks/          # custom hooks
├── lib/
│   ├── query-keys.ts
│   ├── query-config.ts
│   └── query-invalidation.ts
├── services/       # business logic
├── types/          # TypeScript types
└── styles/
    └── globals.css # CSS tokens
```

**Standard API folder structure (if no template):**
```
src/
├── config/         # environment and logging
├── features/       # feature modules (controller + service + repository)
├── shared/
│   ├── middleware/ # auth, error handling, rate limiting
│   └── types/      # shared types
└── index.ts
```

### Step 3 — Create branches

```bash
git checkout -b develop
git push -u origin develop
gh repo edit --default-branch develop
```

Branch strategy:
- `main` — production (protected, merges via PR only)
- `develop` — integration (default, receives feature branches)
- `feat/<topic>` — new features
- `fix/<topic>` — bug fixes

### Step 4 — Install dependencies

```bash
npm install
```

### Step 5 — Configure environment

```bash
cp .env.example .env.local
```

Remind the user to fill in `.env.local` with real credentials before running.

### Step 6 — Initial commit

```bash
git add -A
git commit -m "chore: initialize project <name>"
git push origin develop
```

### Step 7 — Confirm to user

```
Project <name> created.

Local:          <local-directory>
GitHub:         https://github.com/<org>/<name>
Type:           <web|api>
Default branch: develop

Next steps:
1. cd <local-directory>
2. Fill in .env.local with real credentials
3. npm run dev
```

---

## After setup — design handoff

Once the project is created, trigger the origin-design skill with the product brief collected in the wizard. The design skill will propose:

- Color palette derived from the product's purpose and user emotional state
- Typography choices that reflect the product's tone
- Spacing density appropriate for the product type
- Visual identity specific to this product — not borrowed from another

This is the step that makes every project look like itself.
