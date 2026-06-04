# Contributing

Thanks for helping improve the Gamr Website. This document captures the working conventions for this repo so changes stay easy to review, test, and maintain.

## Before You Start

- Read `README.md` for setup, routes, scripts, Supabase behavior, and known constraints.
- Read `memory.md` for current project facts and decisions that should not be guessed.
- Check `git status --short` before editing. The worktree may contain user changes; preserve them unless explicitly asked to overwrite or remove them.
- Prefer small, focused changes over broad refactors.

## Local Setup

Install dependencies:

```sh
npm install
```

Create a local `.env` file:

```sh
cp .env.example .env
```

Then fill in:

```sh
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Start the app:

```sh
npm run dev
```

The local app runs at:

```text
http://localhost:8080
```

## Development Principles

- Use the existing React, TypeScript, Tailwind, shadcn/ui, and Radix patterns already present in the repo.
- Keep page changes responsive and verify that text does not overlap or overflow on mobile.
- Keep Supabase fallbacks in mind. Static insights, onboarding retry behavior, and local mock submissions are intentional degraded-state behavior.
- Do not expose private keys in frontend code or `VITE_` environment variables.
- Do not make email dispatch real in the frontend. `src/services/emailService.ts` is intentionally mocked until a secure backend endpoint exists.
- Prefer npm because `package-lock.json` is the current package lock.

## Recommended Verification

Run the checks that match the risk of your change.

For documentation-only changes:

```sh
git diff -- README.md memory.md CONTRIBUTING.md SECURITY.md CHANGELOG.md .env.example
```

For general frontend changes:

```sh
npm run lint
npm run build
```

For onboarding changes:

```sh
npm run schema:verify
npm run test:e2e
```

For Supabase-backed changes:

```sh
npm run schema:verify
```

Then inspect the relevant migration, table, policy, or fallback path manually.

## Pull Request Checklist

- The change is scoped to the requested behavior.
- User or unrelated work in the dirty worktree was preserved.
- README or `memory.md` was updated when project facts changed.
- `.env.example` was updated if new public environment variables were added.
- Sensitive values were not committed.
- Relevant checks were run, or the reason they were not run is documented.
- Supabase migrations were added or documented when schema behavior changed.

## Documentation Updates

Update `memory.md` after meaningful work that changes:

- Routes or product areas.
- Supabase schema, policies, storage buckets, or RPC behavior.
- Authentication or admin assumptions.
- Testing commands or verification requirements.
- Intentional fallbacks.
- Deployment or environment variable requirements.

Update `README.md` when a new contributor would need the information to set up, run, understand, or deploy the project.

