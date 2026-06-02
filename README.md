# LZR Skills

<p align="center">
  <em>Product-first AI skills. Unique design. Professional code. Zero generic output.</em>
</p>

<p align="center">
  <a href="https://github.com/Lizardsstudios/lzr-skills/stargazers"><img src="https://img.shields.io/github/stars/Lizardsstudios/lzr-skills?style=for-the-badge&logo=github&labelColor=1e293b&color=fbbf24" alt="GitHub stars"/></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-fbbf24?style=for-the-badge&labelColor=1e293b" alt="MIT License"/></a>
  <a href="#installation"><img src="https://img.shields.io/badge/Works_with-Claude_·_Cursor_·_Windsurf_·_Codex_·_Gemini_·_Antigravity-111827?style=for-the-badge&labelColor=1e293b" alt="Compatible AI tools"/></a>
</p>

---

Most AI-generated apps look the same: Inter font, purple gradient on white, generic SaaS blue buttons. The code underneath follows the same shortcuts that create technical debt.

**LZR Skills fixes this at the root.**

Before writing a single line of code, the AI asks five questions about the product — who uses it, what it solves, what feeling it should create. Visual identity is derived from those answers, not from a style catalog. The result is an app that looks like it was designed for that product specifically.

---

## What you get

- **Unique visual identity** — derived from the product brief, never from trends or references to other brands
- **Professional code** — patterns recognized as correct by any senior engineer
- **Complete project setup** — folder structure, version control, review workflow, automated board — in one command
- **Mandatory states** — every component ships with loading, empty, error, and success states
- **Accessibility built in** — contrast, keyboard navigation, screen readers, touch targets — not optional

---

## Compatibility

| AI Tool | Support | Install method |
|---|---|---|
| **Claude Code** | ✅ Native | `npx skills add` — see below |
| **Cursor** | ✅ Manual | Copy skill content to `.cursor/rules/` |
| **Windsurf** | ✅ Manual | Copy skill content to `.windsurf/rules/` |
| **Codex** | ✅ Manual | Paste skill content as system context |
| **Gemini CLI** | ✅ Manual | Paste skill content as system context |
| **Antigravity** | ✅ Native | `/skills add` — see below |

---

## Installation

### Install all skills at once (recommended)

**Global — available in every project on your machine:**
```bash
npx skills add https://github.com/Lizardsstudios/lzr-skills
```

**Project only — available in the current project folder:**
```bash
npx skills add https://github.com/Lizardsstudios/lzr-skills --project
```

### Install a single skill

**Global:**
```bash
npx skills add https://github.com/Lizardsstudios/lzr-skills --skill "origin-design"
npx skills add https://github.com/Lizardsstudios/lzr-skills --skill "lzr-code-standards"
npx skills add https://github.com/Lizardsstudios/lzr-skills --skill "new-project"
```

**Project only:**
```bash
npx skills add https://github.com/Lizardsstudios/lzr-skills --skill "origin-design" --project
```

### Manual installation (Cursor, Windsurf, Codex, Gemini)

1. Open the skill folder you want (e.g. `skills/origin-design/`)
2. Copy the content of `SKILL.md`
3. Paste into your tool's rules file:
   - **Cursor:** `.cursor/rules/design.mdc`
   - **Windsurf:** `.windsurf/rules/design.md`
   - **Codex / Gemini:** system prompt or context file
4. Repeat for `skills/lzr-code-standards/`

### Antigravity

```bash
/skills add https://github.com/Lizardsstudios/lzr-skills
```

---

## What's included

This repository is a complete kit: **skills** that guide your AI, and **templates** that give your project a professional physical structure from day one.

### Skills

| Skill | Install name | What it does |
|---|---|---|
| [origin-design](./skills/origin-design/) | `origin-design` | Derives visual identity from the product brief. Covers colors, typography, spacing, 8 required components, UX patterns, motion, accessibility and responsiveness. |
| [lzr-code-standards](./skills/lzr-code-standards/) | `lzr-code-standards` | Professional coding patterns for web apps. Data fetching, layered architecture, visual tokens in code, navigation, security. |
| [new-project](./skills/new-project/) | `new-project` | Creates a complete new project using the templates below — folder structure, repository, branches, review workflow — preceded by a product brief wizard that feeds the design skill. |

### Templates

Ready-to-use project bases. No internal references, no proprietary dependencies — works for anyone.

| Template | Folder | Stack |
|---|---|---|
| **Web app** | [templates/web](./templates/web/) | React 19 · Next.js 15 App Router · TypeScript · Tailwind CSS · React Query · Zod · Vitest · Playwright |
| **Backend service** | [templates/api](./templates/api/) | Node.js · Fastify · TypeScript · Zod · Pino · Vitest |

Both templates include:
- Quality hooks that run on every commit (lint, type check, tests)
- CI/CD workflow that runs on every push
- Commit message convention enforcement
- CSS token system ready for the `origin-design` palette
- Folder structure that matches the `lzr-code-standards` patterns

### How skills and templates work together

The templates give the project its physical structure. The skills give the AI the behavior to work correctly inside it. Neither replaces the other — they are designed to be used together.

When you run `/new-project`, the `new-project` skill:
1. Runs the product brief wizard (5 questions)
2. Creates the project from the right template
3. Hands the brief to `origin-design` to propose the visual identity

The template starts with neutral placeholder colors. The design skill replaces them with colors derived from the product.

### Which do I need?

- **Starting a new project?** → `/new-project` (wizard + template + design identity)
- **Building a screen in an existing project?** → `origin-design`
- **Working on any web codebase?** → `lzr-code-standards`
- **Want everything?** → install all three skills + clone the template you need

---

## How to use

### Starting a new project

```
/new-project my-app web
```

The skill will:
1. Ask what you're building (app, site, or service)
2. Ask 5 questions about the product
3. Create the full project structure
4. Propose a unique visual identity based on your answers

### Building a screen in an existing project

Just ask:
```
"Create the invoice list screen"
"Build the user settings panel"
"Design the empty state for the dashboard"
```

With `origin-design` active, the AI will ask about the product before making any visual decision.

### On an existing codebase

If you already have a project, `lzr-code-standards` will enforce professional patterns as you build — data fetching, component states, visual tokens, navigation.

---

## Why this exists

Design skills available today start from style catalogs. The output looks like the catalog.

This approach starts from the opposite direction: understand the product first, derive the visual identity from its purpose, users, and promise. The result is an app that could only be itself — not a reference to something else.

The goal is that products built with these skills can one day become references, not copies.

---

## Contributing

Found something that should work differently? Have a pattern that should be here?

Open an issue or submit a pull request. Improvements with clear reasoning are welcome.

---

## License

MIT — use, modify, and distribute freely.
