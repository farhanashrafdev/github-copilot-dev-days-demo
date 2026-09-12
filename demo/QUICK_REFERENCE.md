# Quick reference — keep this open in a second tab

Repo: `farhanashrafdev/github-copilot-dev-days-demo` (private)

## Tabs to have open before you walk on

1. Slides
2. Repo → Code
3. `github.com/copilot`
4. Current issue / PR for the restaurant rebuild
5. Vercel preview URL of that PR
6. Production site
7. [Agent Lab](https://copilot-dev-days.github.io/agent-lab-python/)

## Current app routes

| Route | What to show |
|---|---|
| `/` | Hero, highlighted dishes, placeholder hours |
| `/menu` | Full menu grouped by category |
| `/reserve` | Client-side reservation form validation |
| `/contact` | Placeholder address, phone, email, and opening hours |

## Step 1 — Explore the repo with Copilot

Open `github.com/copilot`, pick this repo, paste:

```
Explain this repository to me like I've just joined the engineering team.
What does it do, how is it structured, and what would you investigate first
before changing it?
```

## Step 2 — Hand the current issue to the agent

Open the active issue → right sidebar → **Assignees** → **Copilot** →
**Assign**.

Leave the optional prompt empty. Say out loud:

> "Notice what I didn't tell it. Not which file. Not which function. I described
> the outcome."

Then walk away from it. It takes a few minutes.

## Step 3 — While it works: show the context

Open `.github/copilot-instructions.md`. Highlight:

- Forms must validate user input and show a clear message next to the field
- Any bug fix needs a test that fails before the fix
- Business data safety: keep the site front-end only and keep placeholders clear

> "Everyone can buy Copilot. The differentiator is how well you've encoded how
> your engineering organisation thinks."

## Step 4 — Copilot reviews OUR code

Open the current PR → **Reviewers** → **Copilot** → **Request**. Under 30
seconds.

> "Copilot wrote code for us. Now — should Copilot review Copilot? Why not review
> me instead."

Use the review to talk about:

1. **Correctness** — does the app now match the restaurant brief?
2. **Frontend quality** — accessible focus styles, readable text, scoped
   Tailwind utilities
3. **Tests** — menu, hours, pricing, and reservation validation
4. **Business data safety** — no backend, no fake persistence, placeholders stay
   explicit

## Step 5 — Back to the agent's PR

On Copilot's PR:

1. **Approve and run workflows** ← you must click this. Actions do not run on an
   agent's push until a human with write access allows it.
2. Watch lint · typecheck · test · build go green (~1 min)
3. Open the **Vercel preview URL**
4. Go to `/reserve`, submit invalid fields, and confirm the page shows specific
   inline error messages
5. Merge → production updates

> "Don't tell me your code works. Give me the URL."

## Step 6 — Placeholder swap (if you have time)

Point at `lib/restaurant.ts`:

> "The branding, address, phone number, email address, hours, and menu are all
> static placeholders. The owner can replace them without changing the app
> structure."

## Recovery

| Problem | Do this |
|---|---|
| Agent still running | Open PR #6 and keep talking; come back to it |
| Vercel slow | Open the production site instead |
| Actions won't start | You missed **Approve and run workflows** in the merge box |
| Preview asks you to log in | Vercel Deployment Protection is on — see `docs/VERCEL_SETUP.md` |
| Everything is broken | `npm run dev` locally and demo the site + the issues |

## Commands (only if you must)

```bash
npm run dev       # local site
npm run verify    # lint + typecheck + test + build
```
