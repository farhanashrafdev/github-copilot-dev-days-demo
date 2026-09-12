# Copilot Escaped the IDE

A small, deliberately simple demo repository for a GitHub Copilot Dev Days
keynote. It exists to show one thing:

> You can take an issue, hand it to an agent, get a pull request, see it deployed
> to a preview URL, have it reviewed, and merge it — without opening an editor.

The application is **Whiskers & Co.**, a cat-only veterinary clinic website.
It is front-end only on purpose: no database, no API, no authentication. That
keeps every preview deployment instant and self-contained, so the demo is about
the workflow rather than about infrastructure.

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

## The seeded issues

The repository ships with a small backlog of real, self-contained problems. Each
one is visible in the browser within a couple of clicks, and each one is small
enough for an agent to finish.

| Issue | What you see | Good for |
|---|---|---|
| Homepage content is not centred | The homepage hugs the left edge while every other page is centred | A human fix that Copilot then reviews |
| Registration form accepts any text as an email | Type `asdasd` into the email field and it registers you | A clean Copilot fix |
| Support dogs, not just cats | The clinic is cat-only everywhere in the UI and the type system | A larger Copilot task with a real constraint |
| Empty appointment slots render as a blank card | Slots with no bookings show nothing at all | A small warm-up task |

## Running it

```bash
npm ci
npm run dev      # http://localhost:3000
npm run verify   # lint + typecheck + test + build
```

## How Copilot is configured here

| File | Purpose |
|---|---|
| `.github/copilot-instructions.md` | The team's engineering standards, including one hard clinical-safety rule |
| `AGENTS.md` | Operational notes: commands, repository map, and what not to "fix" |
| `.github/agents/frontend-reviewer.agent.md` | A read-only custom agent that reviews front-end changes adversarially |
| `.github/workflows/ci.yml` | Lint, typecheck, test and build on every pull request |
| `.github/workflows/copilot-setup-steps.yml` | Pre-installs dependencies in the agent's environment so it starts faster |

There is one rule in `.github/copilot-instructions.md` worth reading before you
watch a demo: `lib/dosage.ts` holds medication figures signed off by a named
veterinarian for cats only. An agent asked to "support dogs" runs straight into
it. Whether it invents a number or stops and asks is the most interesting thing
that happens in the whole talk.

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

Whiskers & Co. is fictional. Every patient, owner and clinical figure in this
repository is synthetic demo data.
