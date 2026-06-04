# Gamr Website

Gamr Website is the public web experience for Gamr Africa. It is a Vite, React, TypeScript, Tailwind CSS, and shadcn/ui application that presents Gamr's ecosystem, talent programs, industry pages, insights content, GamrTag onboarding, contributor submissions, and admin review workflows.

The codebase began from a Lovable/Vite scaffold, but it is now a larger product surface with Supabase-backed data flows, static fallback content, Playwright coverage for onboarding, and a custom TipTap-powered editor called Gamr Nexus Editor.

## Table of Contents

- [Project Purpose](#project-purpose)
- [Core Product Areas](#core-product-areas)
- [Tech Stack](#tech-stack)
- [Repository Structure](#repository-structure)
- [Supporting Documentation](#supporting-documentation)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Supabase Data Model](#supabase-data-model)
- [Application Routes](#application-routes)
- [Content And Insights Flow](#content-and-insights-flow)
- [GamrTag Onboarding Flow](#gamrtag-onboarding-flow)
- [Admin And Authentication](#admin-and-authentication)
- [Gamr Nexus Editor](#gamr-nexus-editor)
- [Testing And Verification](#testing-and-verification)
- [Deployment](#deployment)
- [Development Notes](#development-notes)
- [Known Constraints](#known-constraints)
- [Future Work Ideas](#future-work-ideas)

## Project Purpose

This app acts as the web front door for the Gamr Africa ecosystem. It supports:

- Public storytelling about Gamr's mission, vision, team, and why the company exists.
- Ecosystem pages for GamrTag, Studios, Carven, and Bracket.
- Talent pages for gamers, creators, and developers.
- Industry pages for education, esports, gaming, and youth development.
- Resource pages for case studies, brand assets, and contact.
- Insights publishing for editorial posts, case studies, community stories, and intelligence views.
- GamrTag profile claiming and onboarding.
- Article contributor submissions.
- Admin review, approval, featuring, deletion, subscriber review, and newsletter broadcast mock flow.

## Core Product Areas

### Public Website

The public routes are assembled in `src/App.tsx` and use reusable page and section components from `src/components`. The site is largely component-driven and styled with Tailwind CSS plus app-level CSS in `src/index.css` and `src/App.css`.

### Insights

Insights combine local static article data with approved Supabase article submissions. Static content lives under `src/data/insights`. Runtime merging happens in `src/context/InsightsContext.tsx`.

The app intentionally falls back to static insights if Supabase is unavailable. This fallback is part of the product behavior and should not be removed without replacing it with a better offline or degraded-state strategy.

### GamrTag

The GamrTag onboarding page is implemented in `src/pages/ClaimGamrTag.tsx`. It is a multi-step profile claim flow with availability checks, profile details, gaming preferences, gamer DNA selection, session storage persistence, and a success profile summary.

### Contributor Submissions

The public contributor flow is implemented through `src/pages/SubmitArticle.tsx` and `src/components/ContributorForm.tsx`. It lets contributors submit articles, upload optional cover images, and draft content through the embedded Gamr Nexus Editor.

The form saves drafts in `localStorage` using `gamr_article_draft`. If Supabase is unreachable, it can store mock submissions in `localStorage` under `gamr_mock_submissions` so the UI can still demonstrate the flow.

### Admin Review

The admin submissions dashboard is implemented in `src/pages/admin/SubmissionsAdmin.tsx` and protected by `src/components/ProtectedRoute.tsx`. It supports reviewing submissions, changing status, featuring approved articles, deleting articles, viewing subscribers, and sending mocked email broadcasts.

### Gamr Nexus Editor

`src/pages/GamrNexusEditor.tsx` implements a rich editor built on TipTap with desktop and mobile layouts. It supports document formatting, ribbons, sidebars, local autosave, version snapshots, stats, and embedded usage inside the contributor form.

## Tech Stack

- Runtime and build: Vite 5
- UI framework: React 18
- Language: TypeScript
- Styling: Tailwind CSS, app CSS, shadcn/ui, Radix UI primitives
- Routing: React Router DOM
- Data fetching and caching: TanStack React Query
- Backend integration: Supabase JavaScript client
- Rich text editor: TipTap
- Motion and interaction: Framer Motion, GSAP
- Icons: Lucide React, React Icons
- Visualization and maps: Recharts, D3, Leaflet, React Leaflet
- Forms and validation: React Hook Form, Zod, libphonenumber-js, react-phone-input-2
- Testing: Playwright, TSX scripts, ESLint
- Deployment target: Vercel or Lovable publish

## Repository Structure

```text
.
|-- README.md
|-- memory.md
|-- package.json
|-- vite.config.ts
|-- playwright.config.ts
|-- components.json
|-- public/
|   |-- robots.txt
|   |-- favicon.ico
|   `-- assets/
|-- assets/
|   `-- content.md
|-- css/
|   `-- styles.css
|-- scripts/
|   |-- add-20-articles.ts
|   |-- migrate-insights.ts
|   `-- verify-db-schema.ts
|-- src/
|   |-- App.tsx
|   |-- main.tsx
|   |-- index.css
|   |-- App.css
|   |-- assets/
|   |-- components/
|   |-- context/
|   |-- data/
|   |-- hooks/
|   |-- integrations/
|   |-- lib/
|   |-- pages/
|   |-- services/
|   |-- stores/
|   `-- utils/
|-- supabase/
|   |-- schema.sql
|   `-- migrations/
`-- tests/
    |-- e2e/
    `-- integration/
```

Important directories:

- `src/pages`: route-level React pages.
- `src/components`: shared UI, page sections, domain components, editor components, and shadcn/ui primitives.
- `src/components/ui`: shadcn/ui components.
- `src/components/nexus-editor`: desktop and mobile editor UI.
- `src/context`: authentication and insights providers.
- `src/data`: local content and data registries.
- `src/integrations/supabase`: Supabase client setup.
- `src/services`: frontend service wrappers, currently including mocked email dispatch.
- `src/stores`: Zustand editor state.
- `supabase/migrations`: database migration history.
- `tests/e2e`: Playwright browser tests.
- `tests/integration`: direct Supabase integration checks.

## Supporting Documentation

- `memory.md`: living project memory for facts, decisions, and future-agent context.
- `CONTRIBUTING.md`: contribution workflow, verification expectations, and documentation update rules.
- `SECURITY.md`: secret handling, Supabase security notes, admin caveats, and email dispatch guidance.
- `CHANGELOG.md`: dated record of notable project changes.
- `.env.example`: safe local environment template.

## Getting Started

### Prerequisites

Install Node.js and npm. This project currently uses npm scripts and has a `package-lock.json`. A `bun.lockb` also exists from earlier work, but npm is the safest default because the scripts and lockfile are npm-oriented.

Recommended:

- Node.js 18 or newer
- npm 9 or newer

### Install Dependencies

```sh
npm install
```

### Configure Environment

Create a `.env` file in the project root. You can start from the included template:

```sh
cp .env.example .env
```

Then fill in:

```sh
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

The app can render parts of the public experience without Supabase, but onboarding, submissions, admin data, schema verification, and integration tests need these variables.

### Start The Development Server

```sh
npm run dev
```

The Vite dev server is configured in `vite.config.ts` to run on:

```text
http://localhost:8080
```

The server host is set to `::`, which allows local and network access depending on the environment.

### Build For Production

```sh
npm run build
```

### Preview A Production Build

```sh
npm run preview
```

## Environment Variables

Required for Supabase-backed behavior:

| Variable | Purpose |
| --- | --- |
| `VITE_SUPABASE_URL` | Supabase project URL used by the frontend and scripts. |
| `VITE_SUPABASE_ANON_KEY` | Supabase anonymous key used by the frontend and scripts. |

Other environment-related behavior:

- `CI` changes Playwright retry, worker, and server reuse behavior.
- Email dispatch is intentionally mocked in `src/services/emailService.ts`; no frontend email API key should be added there.

Security note: never expose private service role keys, Resend API keys, or other server-only secrets through `VITE_` variables. Vite embeds `VITE_` variables into the frontend bundle.

## Available Scripts

From `package.json`:

| Script | Command | Purpose |
| --- | --- | --- |
| `dev` | `vite` | Starts the local dev server. |
| `build` | `vite build` | Creates a production build in `dist`. |
| `build:dev` | `vite build --mode development` | Creates a development-mode build. |
| `lint` | `eslint .` | Runs ESLint across the repo. |
| `preview` | `vite preview` | Serves the built output locally. |
| `test:e2e` | `playwright test` | Runs Playwright end-to-end tests. |
| `setup:e2e` | `npx playwright install-deps && npx update-browserslist-db@latest && npx playwright install chromium` | Installs browser dependencies for Playwright. |
| `schema:verify` | `tsx scripts/verify-db-schema.ts` | Checks Supabase `gaming_profiles` schema compatibility. |
| `verify:all` | `npm run schema:verify && npm run test:e2e` | Runs schema verification and E2E tests. |

Additional standalone scripts and diagnostics exist in the root, including `check-schema.ts`, `list-columns.ts`, and `test-email-check*.ts`. Treat these as targeted diagnostics rather than polished product scripts unless they are updated and documented.

## Supabase Data Model

The base schema is in `supabase/schema.sql`. Migration files in `supabase/migrations` represent follow-up changes:

- `20240304140000_add_gamer_archetypes.sql`
- `20240304163000_add_phone_number.sql`
- `20240305104000_consolidated_onboarding_fix.sql`
- `20260327000000_create_article_submissions.sql`
- `20260327180000_enhance_article_submissions.sql`
- `20260409000000_add_subscriber_metadata.sql`
- `20260509172000_secure_rls_policies.sql`
- `20260509174700_public_approved_articles.sql`

### `gaming_profiles`

Used by the GamrTag onboarding flow. Important fields include:

- `gamr_tag`
- `email`
- `first_name`
- `last_name`
- `display_name`
- `phone_number`
- `country`
- `favorite_games`
- `platform`
- `gaming_region`
- `gamer_archetype`
- `play_style`
- `personality_traits`
- newer array fields such as `gamer_archetypes` and `play_styles`

The onboarding code includes fallback logic for schema cache or missing-column issues around newer fields. The verification script treats missing newer columns as a warning so E2E tests can still proceed.

### `article_submissions`

Used by public contributor submissions and admin review. Important fields include:

- `name`
- `email`
- `title`
- `category`
- `content`
- `status`
- `featured`
- `slug`
- `cover_image`
- `excerpt`
- `tags`
- `read_time`
- `author_slug`
- `created_at`

Approved submissions are merged into the public insights feed. Supabase articles take priority over static articles with the same slug.

### `gamr_subscribers`

Used by the admin dashboard subscriber tab and broadcast flow. Subscriber metadata was added through the 20260409 migration.

### Storage

The contributor form uploads article cover images to a Supabase Storage bucket named:

```text
article_assets
```

If upload fails due to network errors, the UI falls back to a local object URL for preview/demo continuity.

## Application Routes

Routes are defined in `src/App.tsx`.

### Public And Company

| Route | Page |
| --- | --- |
| `/` | Home / index |
| `/vision` | Vision |
| `/mission` | Mission |
| `/why-now` | Why Now |
| `/team` | Team |
| `/privacy` | Privacy Policy |
| `/contact` | Contact |

### Ecosystem

| Route | Page |
| --- | --- |
| `/gamrtag` | GamrTag ecosystem page |
| `/claim-gamrtag` | GamrTag claim/onboarding flow |
| `/studios` | Studios |
| `/carven` | Carven |
| `/bracket` | Bracket |

### Talent

| Route | Page |
| --- | --- |
| `/gamers` | Gamers |
| `/creators` | Creators |
| `/developers` | Developers |

### Industry

| Route | Page |
| --- | --- |
| `/education` | Education |
| `/esports` | Esports |
| `/gaming` | Gaming |
| `/youth-development` | Youth Development |

### Resources

| Route | Page |
| --- | --- |
| `/case-studies` | Case Studies |
| `/assets` | Brand/assets page |

### Insights

| Route | Page |
| --- | --- |
| `/insights` | Insights index |
| `/insights/search` | Insights search |
| `/insights/:slug` | Individual insight article |
| `/insights/submit` | Contributor submission flow |
| `/insights/admin` | Protected submissions admin dashboard |
| `/insights/author/:slug` | Author profile |
| `/insights/stories/rising-esports` | Rising Esports story |
| `/insights/os` | InsightOS |
| `/insights/community-report` | Community report form |

### Intelligence

| Route | Page |
| --- | --- |
| `/insights/intelligence` | Intelligence hub |
| `/insights/intelligence/map` | Map page |
| `/insights/intelligence/dashboard` | Dashboard page |
| `/insights/intelligence/timeline` | Timeline page |
| `/insights/intelligence/careers` | Careers page |

### Authentication And Fallback

| Route | Page |
| --- | --- |
| `/login` | Login |
| `*` | Not Found |

## Content And Insights Flow

Static insights are defined in:

```text
src/data/insightsData.ts
src/data/insights/authors.ts
src/data/insights/caseStudies.ts
src/data/insights/blogsPart1.ts
src/data/insights/blogsPart2.ts
src/data/insights/queenOfVenus.ts
```

Runtime behavior in `src/context/InsightsContext.tsx`:

1. Initialize the feed with local static insights.
2. Query Supabase `article_submissions` for rows where `status = approved`.
3. Convert approved submissions into the local `Insight` shape.
4. Resolve author data using `author_slug` first, then submitter name lookup.
5. Use a community contributor fallback author if no match exists.
6. Generate excerpts, cover images, read time, slugs, tags, and metadata as needed.
7. Merge Supabase and static content, letting Supabase content win on duplicate slugs.
8. Sort newest first by `publishedAt`.
9. Ensure only one featured article remains active.
10. Keep static content visible if Supabase is unreachable or returns no approved articles.

## GamrTag Onboarding Flow

Implemented in `src/pages/ClaimGamrTag.tsx`.

The flow has five steps:

1. Choose a GamrTag.
2. Enter personal details.
3. Add gaming profile information.
4. Select gamer DNA traits.
5. View success profile summary.

Key behavior:

- Uses `check_gamr_tag_available` RPC when possible.
- Uses email availability checks to prevent duplicate registration.
- Persists in-progress form data to `sessionStorage` under `gamr_onboarding_form_data`.
- Scrolls to top on step change.
- Uses `react-phone-input-2` and `libphonenumber-js` for phone input and validation.
- Supports popular game selection plus custom games.
- Handles schema differences by retrying inserts with fallback data if newer columns are unavailable.
- Uses an error boundary around the success summary to avoid a blank screen after successful submission.

## Admin And Authentication

Authentication state lives in `src/context/AuthContext.tsx`.

Current admin behavior:

- Admin status is determined by a hard-coded email:

```text
olamide.michael@gamr.africa
```

- `/insights/admin` is wrapped in `ProtectedRoute`.
- Supabase auth session state is observed through `supabase.auth.onAuthStateChange`.

Important security note:

The hard-coded admin email is a frontend convenience and should not be treated as complete authorization. Supabase Row Level Security policies must enforce any real admin-only data operations. For production-grade access control, move admin role checks to database policies, JWT claims, or backend endpoints.

## Gamr Nexus Editor

Implemented in `src/pages/GamrNexusEditor.tsx` and related files under:

```text
src/components/nexus-editor
src/components/editor/extensions
src/stores/editorStore.ts
```

The editor uses TipTap extensions for:

- StarterKit editing primitives
- Font family, font size, line height, color, highlight, underline
- Text alignment and indentation
- Images, links, YouTube embeds
- Task lists
- Tables
- Superscript and subscript
- Character count and document stats

State and UX features:

- Desktop ribbon interface.
- Mobile editor layout.
- Focus mode, preview mode, minimized state, zoom, tab state, and sidebars.
- Local autosave every 30 seconds.
- Manual save shortcut with `Ctrl/Cmd+S`.
- Local content persistence under `nx-editor-content`.
- Version snapshots in the editor store.

## Testing And Verification

### Lint

```sh
npm run lint
```

### Production Build

```sh
npm run build
```

### Schema Verification

```sh
npm run schema:verify
```

This script checks the Supabase `gaming_profiles` table. Missing newer onboarding columns currently produce a non-blocking warning because the app has fallback insert behavior.

### End-To-End Tests

```sh
npm run test:e2e
```

Playwright config:

- Test directory: `tests/e2e`
- Browser project: Chromium desktop
- Base URL: `http://localhost:8080`
- Web server command: `npm run dev`
- Screenshots on failure
- Trace on first retry

The current E2E suite covers the Gamr onboarding flow:

- GamrTag entry and continuation.
- Step 2 form validation.
- Duplicate email validation.
- Unique randomized email validation.
- Full onboarding to success page.

### Full Verification

```sh
npm run verify:all
```

This runs schema verification first and then Playwright E2E tests.

### Integration Test

There is a direct Supabase integration test at:

```text
tests/integration/claim_gamrtag.test.ts
```

It inserts a test profile into `gaming_profiles`, exercises fallback behavior for schema cache/missing-column errors, and cleans up the test user by email.

## Deployment

### Vercel

This app can be deployed to Vercel as a Vite React project.

Typical Vercel setup:

- Framework preset: Vite
- Build command: `npm run build`
- Output directory: `dist`
- Environment variables:
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY`

`vercel.json` is present in the repo and should be reviewed before changing routing behavior.

### Lovable

The original Lovable project URL is:

```text
https://lovable.dev/projects/17dc9bf1-4348-4f52-a91a-2171ec69ee0e
```

Lovable can still be used to edit and publish the app if the project remains connected.

## Development Notes

- Prefer npm for dependency work because `package-lock.json` is current.
- The Vite alias `@` points to `./src`.
- shadcn/ui components live in `src/components/ui`.
- Use existing component and styling patterns before adding new abstractions.
- Keep Supabase fallbacks in mind when changing onboarding or insights.
- Do not put private API keys in frontend code or `VITE_` variables.
- Email dispatch is mocked by design until a secure backend endpoint exists.
- Static insights are not dead data; they are the app's fallback and seed content.
- The app has local generated or diagnostic files such as `build_log.txt`, `build_output*.txt`, `test_output*.log`, `screenshot.png`, and Playwright report directories. Be careful not to treat these as source code.
- There are currently uncommitted changes in some source files and image assets. Preserve user work unless explicitly asked to reset or overwrite it.

## Known Constraints

- Supabase availability affects onboarding checks, submissions, admin data, and schema verification.
- The admin check is currently frontend-based and should be backed by stronger database or backend authorization for production.
- Email broadcasts and welcome emails are mocked in the frontend service.
- The contributor form can fall back to local mock submissions when network calls fail.
- Some standalone root scripts are diagnostics and may require cleanup before being treated as formal test commands.
- The project has both `package-lock.json` and `bun.lockb`; avoid switching package managers casually.

## Future Work Ideas

- Move email dispatch to a secure backend endpoint or Supabase Edge Function.
- Replace hard-coded admin email with role-based authorization.
- Add automated tests for article submission and admin approval workflows.
- Add tests for the insights merge behavior.
- Document the exact Supabase migration application process once the deployment workflow is finalized.
- Add a clear `.env.example` file with non-secret placeholders.
- Consolidate root diagnostic scripts into a documented `scripts/diagnostics` area.
- Add CI that runs lint, build, schema verification against a safe test database, and Playwright.
