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
  patients/             patient list and patient detail
  register/             new patient registration form
  schedule/             clinic day schedule
components/             presentational components
  ui/                   Badge, Card primitives
lib/
  clinic.ts             ALL clinic data (static constants) + pure helpers
  dosage.ts             medication figures — see "Clinical safety"
  format.ts             date and pluralisation helpers
  types.ts              domain types, including `Species`
tests/                  vitest unit tests
```

## Things that are intentional — do not "fix" them

- **There is no database, API or backend.** Data is static in `lib/clinic.ts`.
  This keeps every Vercel preview deployment self-contained and instant.
- **`lib/dosage.ts` only has a figure for cats.** That is a clinical constraint,
  not an oversight. Read the "Clinical safety" section of
  `.github/copilot-instructions.md` before touching it.
- **Times and dates are hard-coded and formatted in UTC** so the rendered output
  is identical everywhere. Do not switch to `new Date()` or local time.
- **The base font size is larger than usual.** The site is projected on stage.

## Conventions

- Import from within the project using the `@/` alias, for example
  `import { PATIENTS } from '@/lib/clinic'`.
- Keep components small and give them one job.
- Prefer adding a Tailwind utility class over writing CSS.
