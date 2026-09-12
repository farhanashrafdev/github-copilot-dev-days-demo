# The Copper Spoon — engineering standards

The Copper Spoon is a front-end restaurant website. This file tells Copilot how
this team expects work to be done here. Keep changes small and reviewable.

## What this project is

A front-end only Next.js App Router application. There is no database, no API
and no authentication. Every page renders from static data in `lib/`.
Do not introduce a database, an ORM, an API route or a backend service.

## Stack

- Next.js (App Router) with React Server Components. Add `'use client'` only when
  a component genuinely needs browser state.
- TypeScript in strict mode. No `any`. No non-null assertions (`!`).
- Tailwind CSS v4 utility classes for all styling.
- Vitest for unit tests.

## Frontend

- Layout and spacing are done with Tailwind utility classes on the element that
  needs them. Do not add global CSS rules that reach into elements by tag or
  descendant selector — they fix one page and quietly change others.
- Page content sits in a horizontally centred container. The pattern used across
  this codebase is `mx-auto max-w-6xl px-6`.
- Every interactive element needs a visible focus style, an accessible label and
  a text alternative for any icon or emoji.
- Forms must validate user input and show a clear, specific message next to the
  field that is wrong. Never accept obviously invalid data silently.
- Keep text sizes large. This site is projected in conference rooms.

## Testing

- Any behaviour change needs a test. Any bug fix needs a test that fails before
  the fix and passes after it.
- Test observable behaviour, not implementation details.
- Tests live in `tests/` and must stay fast. The whole suite runs in under a
  second and is executed live during presentations.

## Business data safety

This is the one rule in this repository that is not negotiable.

- Keep the site front-end only. Do not add a database, API route, auth flow,
  payment flow, or backend reservation system to make the demo feel "real".
- Restaurant branding, address, phone number, email address, opening hours, and
  menu entries may be placeholders. Keep them clearly static and avoid implying
  that a reservation has been stored or confirmed by a real system.
- If a task needs real business details that were not provided, leave clear
  placeholders in the UI and say in your pull request that the owner must
  replace them.

## Pull requests

- One concern per pull request.
- Explain what changed and why, and state what you verified.
- Run `npm run lint`, `npm run typecheck`, `npm run test` and `npm run build`
  before saying the work is done.
- Never commit secrets, tokens or `.env` files.

## Code review

When reviewing a pull request in this repository, structure the review as:

1. **Correctness** — does it do what the issue asked, and nothing more?
2. **Frontend quality** — accessibility, focus states, responsive behaviour, and
   whether styling is scoped to the element that needs it.
3. **Tests** — is the change covered, and would the test have caught the bug?
4. **Business data safety** — flag any change that introduces backend behaviour,
   hides placeholder data, or implies real reservation persistence.

Label each finding with a severity of High, Medium or Low.
