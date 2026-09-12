# Quick reference — keep this open in a second tab

Repo: `farhanashrafdev/github-copilot-dev-days-demo` (private)

## Tabs to have open before you walk on

1. Slides
2. Repo → Code
3. `github.com/copilot`
4. **Issue #3** — Registration form accepts any text as an email address
5. **PR #6** — Centre the homepage sections *(our fix, for Copilot to review)*
6. Vercel preview URL of PR #6
7. Production site
8. [Agent Lab](https://copilot-dev-days.github.io/agent-lab-python/)

## The issues

| # | Title | Who fixes it |
|---|---|---|
| 1 | The website is missing that we do CT scans for cats | spare |
| 2 | Homepage content is not centred | **we did** → PR #6 |
| 3 | Registration form accepts any text as an email address | **Copilot, live** |
| 4 | Support dogs, not just cats | the "merge the dog" one |
| 5 | Empty appointment slots render as a blank card | spare |

## Step 1 — Explore the repo with Copilot

Open `github.com/copilot`, pick this repo, paste:

```
Explain this repository to me like I've just joined the engineering team.
What does it do, how is it structured, and what would you investigate first
before changing it?
```

## Step 2 — Hand issue #3 to the agent

Open **Issue #3** → right sidebar → **Assignees** → **Copilot** → **Assign**.

Leave the optional prompt empty. Say out loud:

> "Notice what I didn't tell it. Not which file. Not which function. I described
> the outcome."

Then walk away from it. It takes a few minutes.

## Step 3 — While it works: show the context

Open `.github/copilot-instructions.md`. Highlight:

- Forms must validate user input and show a clear message next to the field
- Any bug fix needs a test that fails before the fix
- Clinical safety: never invent a dosage figure

> "Everyone can buy Copilot. The differentiator is how well you've encoded how
> your engineering organisation thinks."

## Step 4 — Copilot reviews OUR code

Open **PR #6** → **Reviewers** → **Copilot** → **Request**. Under 30 seconds.

> "Copilot wrote code for us. Now — should Copilot review Copilot? Why not review
> me instead."

**What it should find:** the fix uses a global `section > div` CSS rule. It fixes
the homepage but reaches into every section on every page. The repo standard is a
utility class on the element that needs it. If it finds that, you say:

> "That's a real finding. I wrote that, and it's the kind of thing that fixes one
> page and quietly breaks another six months later."

If it finds nothing: *"Apparently Copilot trusts me today."* Move on.

## Step 5 — Back to the agent's PR

On Copilot's PR:

1. **Approve and run workflows** ← you must click this. Actions do not run on an
   agent's push until a human with write access allows it.
2. Watch lint · typecheck · test · build go green (~1 min)
3. Open the **Vercel preview URL**
4. Go to `/register`, type `asdasd` in the email field, press Register →
   it is now rejected
5. Merge → production updates

> "Don't tell me your code works. Give me the URL."

## Step 6 — The dog (if you have time)

Show **Issue #4**. Point at `lib/dosage.ts`:

> "The clinic has a signed-off medication figure for cats. Not for dogs. Watch
> whether the agent invents one or stops and asks. That difference is the whole
> reason a human still reviews this."

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
