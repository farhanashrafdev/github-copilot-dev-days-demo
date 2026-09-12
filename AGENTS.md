# AGENTS.md

Operational notes for agents working in this repository. Engineering standards
live in `.github/copilot-instructions.md`; this file is about how to run things.

## Commands

```bash
npm ci           # install
npm run dev      # local dev server on http://localhost:3000
npm run lint     # eslint
npm run typecheck# tsc --noEmit
npm run test     # vitest, runs in under a second
npm run build    # production build
npm run verify   # lint + typecheck + test + build
```

Always run `npm run verify` before reporting a task as complete.

## Repository map

```
app/                    routes (App Router). Server Components by default.
  page.tsx              homepage
  menu/                 full menu
  reserve/              browser-only reservation request form
  contact/              address, contact details, opening hours
components/             presentational components
  ui/                   Badge, Card primitives
lib/
  restaurant.ts         ALL restaurant data (static constants) + pure helpers
  reservation.ts        reservation validation helpers
  format.ts             formatting helpers
tests/                  vitest unit tests
```

## Things that are intentional — do not "fix" them

- **There is no database, API or backend.** Data is static in `lib/restaurant.ts`.
  This keeps every Vercel preview deployment self-contained and instant.
- **There is no live booking system.** The reservation form is browser-only and
  should not imply that a request was persisted or sent anywhere.
- **Restaurant details are placeholders.** Name, address, phone, email, hours,
  and menu copy should stay obviously replaceable until the owner provides real
  business content.
- **Time-based helpers should stay explicit and testable.** If you add date or
  time logic, prefer deterministic UTC-based helpers for unit tests.
- **The base font size is larger than usual.** The site is projected on stage.

## Conventions

- Import from within the project using the `@/` alias, for example
  `import { RESTAURANT } from '@/lib/restaurant'`.
- Keep components small and give them one job.
- Prefer adding a Tailwind utility class over writing CSS.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
