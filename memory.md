# Gamr Website Memory

Use this file as the project memory for future work. It should reduce guessing, prevent hallucinated architecture decisions, and preserve useful context between sessions.

## Last Updated

2026-06-02

## Current Documentation Work

- Created `memory.md` to track project facts, decisions, and progress.
- Replaced the placeholder Lovable README with a detailed project README based on the actual repo structure.
- Added standard documentation files:
  - `CONTRIBUTING.md`
  - `SECURITY.md`
  - `CHANGELOG.md`
  - `.env.example`
- No product source files were intentionally changed during this documentation pass.
- Existing uncommitted changes were present before this documentation work:
  - `src/components/EventsSection.tsx`
  - `src/components/PageHero.tsx`
  - `src/components/UpcomingSchedule.tsx`
  - `src/index.css`
  - `src/assets/session-business.jpg`
  - `src/assets/session-content.jpg`
  - `src/assets/session-gameplay.jpg`

## Project Identity

- Repository path: `/home/ebendttl/gamr-website`
- App name in `package.json`: `vite_react_shadcn_ts`
- Product identity: Gamr Africa website and ecosystem web app.
- The repo began as a Lovable/Vite project, but now contains a full React product surface.
- Lovable project URL: `https://lovable.dev/projects/17dc9bf1-4348-4f52-a91a-2171ec69ee0e`

## Verified Tech Stack

- Vite 5
- React 18
- TypeScript
- Tailwind CSS
- shadcn/ui and Radix UI primitives
- React Router DOM
- TanStack React Query
- Supabase JS
- TipTap editor
- Zustand
- Framer Motion
- GSAP
- D3, Recharts, Leaflet, React Leaflet
- Playwright
- ESLint

## Package Manager Notes

- `package-lock.json` exists and npm scripts are the documented default.
- `bun.lockb` also exists, likely from earlier work.
- Prefer npm unless the user explicitly asks to use Bun.

## Runtime Defaults

- Dev command: `npm run dev`
- Vite dev server URL: `http://localhost:8080`
- Vite config host: `::`
- Vite alias: `@` maps to `./src`

## Environment Variables

Known required variables:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

Important rule:

- Do not add private service keys to frontend code.
- Do not add Resend or other private API keys to `VITE_` variables.
- `src/services/emailService.ts` intentionally mocks email dispatch because real dispatch needs a secure backend endpoint.

## Major Routes

Routes are defined in `src/App.tsx`.

Public/company:

- `/`
- `/vision`
- `/mission`
- `/why-now`
- `/team`
- `/privacy`
- `/contact`

Ecosystem:

- `/gamrtag`
- `/claim-gamrtag`
- `/studios`
- `/carven`
- `/bracket`

Talent:

- `/gamers`
- `/creators`
- `/developers`

Industry:

- `/education`
- `/esports`
- `/gaming`
- `/youth-development`

Resources:

- `/case-studies`
- `/assets`

Insights:

- `/insights`
- `/insights/search`
- `/insights/:slug`
- `/insights/submit`
- `/insights/admin`
- `/insights/author/:slug`
- `/insights/stories/rising-esports`
- `/insights/os`
- `/insights/community-report`

Intelligence:

- `/insights/intelligence`
- `/insights/intelligence/map`
- `/insights/intelligence/dashboard`
- `/insights/intelligence/timeline`
- `/insights/intelligence/careers`

Auth/fallback:

- `/login`
- `*`

## Supabase Facts

Supabase client:

- File: `src/integrations/supabase/client.ts`
- Uses `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
- Warns if credentials are missing.

Known tables:

- `gaming_profiles`
- `article_submissions`
- `gamr_subscribers`

Known storage bucket:

- `article_assets`

Known RPC functions from schema:

- `check_gamr_tag_available`
- `check_email_available`

Migration files currently present:

- `20240304140000_add_gamer_archetypes.sql`
- `20240304163000_add_phone_number.sql`
- `20240305104000_consolidated_onboarding_fix.sql`
- `20260327000000_create_article_submissions.sql`
- `20260327180000_enhance_article_submissions.sql`
- `20260409000000_add_subscriber_metadata.sql`
- `20260509172000_secure_rls_policies.sql`
- `20260509174700_public_approved_articles.sql`

## Insights Behavior

- Static insight data lives in `src/data/insights`.
- `src/data/insightsData.ts` exports `allInsights`, `caseStudies`, and `blogPosts`.
- `src/context/InsightsContext.tsx` initializes with static insights.
- Approved Supabase `article_submissions` are fetched and merged into the feed.
- Supabase articles win over static articles with the same slug.
- Feed is sorted newest first.
- Only one featured article is kept active after merging.
- If Supabase fails, the app intentionally keeps the static insight fallback.

Do not remove static insight fallback behavior unless replacing it with an intentional degraded-state strategy.

## GamrTag Onboarding Behavior

File:

- `src/pages/ClaimGamrTag.tsx`

Key facts:

- Multi-step onboarding has 5 steps.
- Session storage key: `gamr_onboarding_form_data`
- Checks GamrTag availability.
- Checks email availability.
- Uses phone validation.
- Supports popular games, custom games, platform, region, archetypes, play styles, and personality traits.
- Contains fallback insert behavior for schema cache or missing-column issues.
- Contains an error boundary for success profile rendering.

Important:

- The fallback insert behavior is intentional because some Supabase schemas may not have all newer columns applied or refreshed.

## Contributor Submission Behavior

Files:

- `src/pages/SubmitArticle.tsx`
- `src/components/ContributorForm.tsx`
- `src/pages/GamrNexusEditor.tsx`

Key facts:

- Draft storage key: `gamr_article_draft`
- Mock submissions storage key: `gamr_mock_submissions`
- Cover images upload to Supabase Storage bucket `article_assets`.
- Network upload failures can fall back to local object URLs.
- Network submission failures can create mock local submissions.
- The contributor form embeds Gamr Nexus Editor.

## Admin Behavior

Files:

- `src/pages/admin/SubmissionsAdmin.tsx`
- `src/context/AuthContext.tsx`
- `src/components/ProtectedRoute.tsx`

Key facts:

- Protected route: `/insights/admin`
- Current admin email: `olamide.michael@gamr.africa`
- Admin dashboard fetches article submissions and subscribers.
- It can approve, reject, feature, delete, and view content.
- It can mock email broadcasts through `emailService`.

Important:

- Frontend admin email checks are not sufficient production authorization.
- Supabase RLS or backend role checks should enforce sensitive operations.

## Gamr Nexus Editor Facts

File:

- `src/pages/GamrNexusEditor.tsx`

Related directories:

- `src/components/nexus-editor`
- `src/components/editor/extensions`
- `src/stores/editorStore.ts`

Key facts:

- Built with TipTap.
- Supports desktop ribbon UI and mobile layout.
- Local editor content key: `nx-editor-content`
- Autosaves every 30 seconds.
- Supports document stats, version snapshots, preview mode, focus mode, and formatting extensions.

## Tests And Verification

Known scripts:

- `npm run lint`
- `npm run build`
- `npm run schema:verify`
- `npm run test:e2e`
- `npm run verify:all`

Playwright:

- Config file: `playwright.config.ts`
- Test dir: `tests/e2e`
- Base URL: `http://localhost:8080`
- Web server: `npm run dev`
- Current E2E suite targets the Gamr onboarding flow.

Schema verification:

- File: `scripts/verify-db-schema.ts`
- Checks `gaming_profiles`.
- Missing newer columns are reported as non-blocking warnings.

Integration test:

- File: `tests/integration/claim_gamrtag.test.ts`
- Inserts a test profile, exercises fallback behavior, and cleans up by email.

## Documentation Decisions Made

- README should describe the real application, not the original Lovable starter template.
- README should document fallbacks and known constraints to prevent future accidental removal.
- `memory.md` should be treated as a living project memory and updated after meaningful implementation, architectural, migration, or debugging work.

## Rules For Future Agents

- Read `memory.md`, `README.md`, `package.json`, and relevant source files before making architecture claims.
- Use `CONTRIBUTING.md` for contribution and verification expectations.
- Use `SECURITY.md` before changing auth, admin, Supabase policies, secrets, storage, or email behavior.
- Preserve user changes in a dirty worktree.
- Do not assume Supabase schema completeness; check migrations and code fallbacks.
- Do not assume email sending is real; it is mocked in frontend code.
- Do not remove fallback behavior without understanding why it exists.
- Prefer npm unless directed otherwise.
- Use existing shadcn/ui, Tailwind, and component patterns.
- When changing public pages, verify responsive layout and text fit.
- When changing onboarding, run the Playwright onboarding suite when possible.
- When changing Supabase-backed behavior, check migrations and schema verification.

## Open Follow-Ups

- Decide whether to keep or remove old diagnostic output files.
- Decide whether to standardize exclusively on npm or Bun.
- Move email dispatch to a secure backend endpoint.
- Replace frontend-only admin role checks with backend or database-enforced authorization.
- Add tests for article submission, insights merge behavior, and admin moderation.
- Document exact Supabase migration application workflow for the deployed environment.
