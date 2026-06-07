# CLAUDE.md

Guidance for AI assistants (Claude Code and compatible tools) working in this repository.

## Communication language

**All conversation with the user in the thread must be in Portuguese (pt-BR).** Replies, questions,
explanations, commit summaries reported back in chat, and any clarification — always in Portuguese.

This applies to communication only. **Repository content stays in English:** skill files
(`SKILL.md` and reference docs), template source and comments, `README.md`, commit messages, and
this file. English is the language of the distributed product, so do not translate committed
artifacts.

## What this repository is

**lzr-skills** is a distributable kit of **AI skills** and **project templates**, published by
Lizards Studios. It is *not* a runnable application — there is no root `package.json`, build step,
or test suite at the repository root. The deliverable is the content of the Markdown skill files and
the template scaffolds themselves.

The product thesis (see `README.md`): most AI-generated apps look and are built the same way. These
skills fix that at the root by deriving a product's visual identity from a product brief (not a style
catalog) and enforcing professional code patterns.

Consumers install skills with:

```bash
npx skills add https://github.com/Lizardsstudios/lzr-skills            # all skills, global
npx skills add https://github.com/Lizardsstudios/lzr-skills --project  # all skills, this project
npx skills add https://github.com/Lizardsstudios/lzr-skills --skill "origin-design"
```

Cursor / Windsurf / Codex / Gemini users copy `SKILL.md` content into their own rules files (manual install).

## Repository layout

```
.
├── README.md                      Public documentation, install instructions, compatibility matrix
├── skills/                        The AI skills (the primary product)
│   ├── origin-design/             Derives visual identity from a product brief
│   │   ├── SKILL.md               Main skill entry (loaded by default)
│   │   ├── ACCESSIBILITY.md       Reference — load only for a11y tasks
│   │   ├── MOTION.md              Reference — load only for animation tasks
│   │   ├── RESPONSIVE.md          Reference — load only for responsive/mobile tasks
│   │   └── README.md
│   ├── lzr-code-standards/        Professional coding patterns for web apps
│   │   └── SKILL.md
│   └── new-project/               End-to-end new-project wizard (uses the templates below)
│       └── SKILL.md
└── templates/                     Ready-to-use project scaffolds, copied into new projects
    ├── web/                       React 19 · Next.js 15 App Router · TS · Tailwind · React Query · Zod · Vitest · Playwright
    └── api/                       Node.js · Fastify · TS · Zod · Pino · Vitest
```

### How the pieces fit together

- **Skills** = behavior given to the AI. **Templates** = physical structure given to a project. They
  are designed to be used together, not interchangeably.
- `new-project` orchestrates everything: runs a product-brief wizard → hands the brief to
  `origin-design` to derive the visual identity → scaffolds the project from the right template →
  applies the design tokens.
- `lzr-code-standards` and `origin-design` then stay active during day-to-day development.

## Skill file conventions

Every skill is a folder under `skills/` containing a `SKILL.md` with YAML frontmatter:

```yaml
---
name: skill-name              # required — must match the folder name (this is the install name)
description: ...              # required — when the skill activates and what it does
command: skill-name          # optional — present only for slash-command skills (e.g. new-project)
---
```

Rules when editing skills:

- **`name` must equal the folder name.** It is the public install name (`--skill "<name>"`) and is
  referenced in `README.md`.
- Keep `description` action-oriented: it is the trigger text the host AI uses to decide when to load
  the skill.
- `origin-design` uses a **progressive-disclosure** pattern: `SKILL.md` is loaded by default;
  `ACCESSIBILITY.md`, `MOTION.md`, and `RESPONSIVE.md` are loaded only when a task needs that domain.
  Preserve this — do not inline the reference docs into `SKILL.md`.
- Skills are prose instructions for an AI, not code. Optimize for an LLM following them precisely:
  numbered phases, explicit "do not skip" gates, concrete right/wrong examples.

## Core conventions the skills enforce

When working *inside a generated project* (or editing the templates), these are the non-negotiable
rules from `lzr-code-standards` and `origin-design`. Keep template code consistent with them.

**Code (`lzr-code-standards/SKILL.md`):**
1. All server data fetching uses **React Query** — never `useState` + `useEffect`. Query keys live in
   `src/lib/query-keys.ts`. Mutations use optimistic updates.
2. Backend uses **layered architecture**: interface → adapter (client injected, never instantiated) →
   composition root. Authorization lives in the service layer, never the adapter.
3. **No hardcoded colors/sizes** — use design tokens via Tailwind (`bg-action`, `p-s4`, etc.).
   Placeholders use `--text-placeholder`, never `--text-secondary`.
4. Back navigation uses `router.back()` (history), never a hardcoded route.
5. No bare HTML UI elements (`<button>`, `<input>`) — always system components.
6. Multi-tenant: `super_admin` is an explicit role; never `IS NULL OR company_id = ...` in RLS.
7. **Zero tolerance**: no TS errors, no lint warnings, no failing tests, no build failures before push.

**Design (`origin-design/SKILL.md`):**
- Visual identity is derived from the product brief, never copied from another product or trend.
- 3-layer color system (surfaces / text / identity+action) — exactly 3 layers.
- 4px spacing scale, `--s1`–`--s9`; typography scale `--text-xs`–`--text-3xl`.
- 8 required components, each with all 8 states (default/hover/focus/active/loading/disabled/error/success).
- Banned: Inter/Roboto/Arial/Space Grotesk, purple-gradient-on-white, glass morphism, two Primary
  buttons per screen, toast for form validation.

## Templates

The templates are reference scaffolds that get copied into new projects. They are not part of a
workspace and are not built from this repo's root. Each is a self-contained project with its own
`package.json`.

- **web** uses `pnpm` (pinned `packageManager: pnpm@10.22.0`), Node `>=20`.
- **api** is ESM (`"type": "module"`), Node `>=20`.

Shared scripts (run from inside a template directory, after `pnpm install`):

| Script | Purpose |
|---|---|
| `pnpm dev` | Run the dev server |
| `pnpm build` | Production build |
| `pnpm typecheck` | `tsc --noEmit` — must be zero errors |
| `pnpm lint` / `pnpm lint:fix` | ESLint |
| `pnpm format` / `pnpm format:check` | Prettier |
| `pnpm test` / `pnpm test:watch` | Vitest |
| `pnpm test:e2e` | Playwright (web only) |

Quality gates are wired via **husky** + **lint-staged** + **commitlint**:

- `pre-commit` → `pnpm lint-staged` (ESLint + Prettier on staged files)
- `pre-push` → `pnpm typecheck && pnpm test`
- `commit-msg` → `pnpm commitlint --edit` (Conventional Commits, `@commitlint/config-conventional`)
- CI (`.github/workflows/ci.yml`, web): typecheck → lint → test → build on push/PR to `main`/`develop`

When editing template source, match the existing folder structure (`src/lib`, `src/features`,
`src/components/ui`, `src/shared`, etc.) and the code conventions above.

## Working in this repository (meta)

This repo itself has **no build, no install, and no test harness at the root**. Changes here are
edits to Markdown skills and template files. To validate work:

- For **skill edits**: verify the frontmatter `name` still matches the folder, that `README.md`'s
  skill/install tables stay accurate, and that examples remain internally consistent.
- For **template edits**: there is no root toolchain. If you need to run a template's scripts, `cd`
  into that template directory and `pnpm install` there first. Keep template code aligned with the
  `lzr-code-standards` and `origin-design` rules — the templates are meant to be exemplary.
- Keep `README.md` and this file in sync with any structural change (new skill, renamed skill, new
  template, new reference doc).

### Git workflow

- The repository's integration branch is `develop` (this is also the default branch the templates'
  CI targets, alongside `main`).
- Use **Conventional Commits** for messages (`feat:`, `fix:`, `docs:`, `chore:`, etc.) — the
  templates enforce this, and the repo follows the same convention.
- Do **not** open a pull request unless explicitly asked.
