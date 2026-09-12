# Copilot Escaped the IDE

A small, deliberately simple demo repository for a GitHub Copilot Dev Days
keynote. It exists to show one thing:

> You can take an issue, hand it to an agent, get a pull request, see it
> deployed to a preview URL, have it reviewed, and merge it — without opening
> an editor.

The application is now **The Copper Spoon**, a placeholder restaurant website.
It is front-end only on purpose: no database, no API, no authentication. Menu
content, opening hours, and reservation messaging all come from static files in
`lib/`. That keeps every preview deployment instant and self-contained, so the
demo is about the workflow rather than about infrastructure.

## The demo loop

```
GitHub Issue
   → assign to Copilot            (agent investigates the repo)
   → Copilot opens a Pull Request
   → "Approve and run workflows"  (a deliberate human gate)
   → GitHub Actions: lint · typecheck · test · build
   → Vercel builds a unique Preview Deployment
   → open the Preview URL and check the change with your own eyes
   → request a review from Copilot
   → merge
   → main deploys to production
```

And the other direction, which is the more interesting half:

```
A human fixes an issue
   → opens a Pull Request
   → Copilot reviews the human's code
```

## What the app contains

- **Home** — hero copy, highlighted dishes, and opening-hours summary
- **Menu** — a static typed menu grouped by category
- **Reserve** — a browser-only reservation request form with client-side
  validation and no backend submission
- **Contact** — placeholder address, phone, email, and opening hours

All restaurant branding, menu items, and contact details are placeholders for
the owner to replace before launch.

## Running it

```bash
npm ci
npm run dev      # http://localhost:3000
npm run verify   # lint + typecheck + test + build
```

## How Copilot is configured here

| File | Purpose |
|---|---|
| `.github/copilot-instructions.md` | The team's engineering standards for this front-end-only restaurant app |
| `AGENTS.md` | Operational notes: commands, repository map, and what not to "fix" |
| `.github/agents/frontend-reviewer.agent.md` | A read-only custom agent that reviews front-end changes adversarially |
| `.github/workflows/ci.yml` | Lint, typecheck, test and build on every pull request |
| `.github/workflows/copilot-setup-steps.yml` | Pre-installs dependencies in the agent's environment so it starts faster |

There is still one important rule in `.github/copilot-instructions.md` worth
reading before you watch a demo: keep the site front-end only. Do not sneak in
a database, API, authentication, or a fake backend booking flow when static
data and browser-only interactions are the point of the exercise.

## Stage documentation

- [`docs/DEMO_RUNBOOK.md`](docs/DEMO_RUNBOOK.md) — the minute-by-minute run
- [`demo/QUICK_REFERENCE.md`](demo/QUICK_REFERENCE.md) — the one page to keep open in a second tab
- [`docs/VERCEL_SETUP.md`](docs/VERCEL_SETUP.md) — connecting Vercel, and the preview-URL setting that will otherwise ruin the demo

## Go deeper

This repository is a **20-minute demonstration**, not a course. The official
hands-on lab is where you should actually build something:

**[GitHub Copilot Dev Days Agent Lab](https://copilot-dev-days.github.io/agent-lab-python/)**

It complements this repo rather than competing with it: the lab teaches you to
author instructions, agents and workflows from scratch. This repo just shows you
what the finished loop feels like, quickly, on a projector.

---

The Copper Spoon is fictional. Every menu item, address, phone number, email
address, and opening hour in this repository is placeholder demo data.
