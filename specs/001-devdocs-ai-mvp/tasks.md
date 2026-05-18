# Tasks: DevDocs AI MVP

**Branch**: `001-devdocs-ai-mvp`
**Input**: `specs/001-devdocs-ai-mvp/spec.md`, `plan.md`, `data-model.md`, `contracts/api-routes.md`
**Prerequisites**: All design documents complete ✅

**Format**: `[ID] [P?] [Story] Description`
- `[P]` = can run in parallel (no file conflicts with other [P] tasks in same phase)
- `[US#]` = maps task to user story for traceability
- Check off tasks as you complete them

---

## Phase 1: Project Setup (Week 1 — Days 1–2)

**Purpose**: Repository, tooling, CI, and environment configuration.
No user-facing functionality — just a deployable skeleton.

- [x] T001 Initialise Next.js 14 project with App Router: `npx create-next-app@14 devdocs-ai --typescript --tailwind --app --src-dir=false`
- [x] T002 [P] Install and configure shadcn/ui: `npx shadcn-ui@latest init`, add components: Button, Input, Tabs, Textarea, Badge, Toast, Dialog, Card, Separator
- [x] T003 [P] Install all dependencies: `@supabase/supabase-js @supabase/ssr @anthropic-ai/sdk zustand jszip react-markdown remark-gfm @uiw/react-codemirror @codemirror/lang-markdown posthog-js @sentry/nextjs`
- [x] T004 [P] Configure TypeScript: `strict: true`, `noImplicitAny: true`, `strictNullChecks: true` in `tsconfig.json`
- [x] T005 [P] Configure ESLint: `eslint-config-next` + `@typescript-eslint` rules, zero-warnings policy
- [x] T006 [P] Configure Prettier with Tailwind plugin
- [x] T007 [P] Create `.env.example` with all environment variables from plan.md documented (no values)
- [x] T008 Create `BACKLOG.md` — VS Code extension, MCP server, CLI, GitHub integration, team collab, documentation drift detection
- [x] T009 [P] Set up Vitest: `npm install -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/user-event`
- [x] T010 [P] Set up Playwright: `npm init playwright@latest` — configure for integration (component) + E2E test projects
- [x] T011 Set up GitHub Actions CI workflow (`.github/workflows/ci.yml`): unit tests, integration tests, TypeScript check, ESLint, Lighthouse CI
- [ ] T012 [P] Create Supabase project (staging + production environments)
- [ ] T013 [P] Install Supabase CLI, initialise local development: `supabase init`, link to staging project
- [ ] T014 Deploy skeleton to Vercel: connect GitHub repo, configure environment variables for staging, verify preview deployments work on PR

**Checkpoint**: Repository exists, CI runs on PR, Vercel preview deploys on PR, environment variables configured in Vercel dashboard.

---

## Phase 2: Database Foundation (Week 1 — Days 3–5)

**Purpose**: All database tables, indexes, RLS policies, and migrations applied.
Blocking prerequisite — no application code can be built without the schema.

**⚠️ CRITICAL**: No user story implementation can begin until this phase is complete.

- [x] T015 Write migration `001_create_profiles.sql`: profiles table + auto-create trigger (see data-model.md)
- [x] T016 [P] Write migration `002_create_projects.sql`: projects table + all indexes
- [x] T017 [P] Write migration `003_create_bundles.sql`: documentation_bundles + share_links tables + indexes
- [x] T018 Write migration `004_rls_policies.sql`: all RLS policies for all 4 tables (see data-model.md)
- [ ] T019 Apply all migrations to Supabase staging: `supabase db push` (MANUAL: requires Supabase project setup)
- [x] T020 Write RLS unit tests in `tests/unit/rls/`: verify users cannot read other users' projects, bundles, or share links via direct Supabase queries
- [ ] T021 Run RLS tests and verify all pass (MANUAL: requires Supabase project with migrations applied)
- [x] T022 Create Supabase client utilities: `lib/supabase/client.ts` (browser) + `lib/supabase/server.ts` (API routes, uses service role key)
- [ ] T023 [P] Configure Supabase Auth: enable email + Google OAuth provider in Supabase dashboard, add Google OAuth credentials (MANUAL)
- [ ] T021 Run RLS tests and verify all pass
- [ ] T022 Create Supabase client utilities: `lib/supabase/client.ts` (browser) + `lib/supabase/server.ts` (API routes, uses service role key)
- [ ] T023 [P] Configure Supabase Auth: enable email + Google OAuth provider in Supabase dashboard, add Google OAuth credentials

**Checkpoint**: All migrations applied to staging. RLS tests pass. Direct Supabase queries from a second user account confirm cross-user data access is blocked.

---

## Phase 3: User Story 6 — Authentication (Priority: P1, Blocking) (Week 2 — Days 1–2)

**Goal**: Users can register, verify email, log in with email or Google, and log out.
**Independent Test**: Register → verify → login → see empty dashboard → logout → login again ✅

### Unit Tests — Auth (write first, verify FAIL before implementing) ⚠️

- [ ] T024 [P] [US6] Unit test: auth guard middleware redirects unauthenticated users to `/login` with redirect param
- [ ] T025 [P] [US6] Unit test: auth guard allows authenticated users through

### Implementation — Auth

- [x] T026 [US6] Create Supabase Auth callback route: `app/api/auth/[...supabase]/route.ts` (handles OAuth + email verify redirects)
- [x] T027 [US6] Create login page `app/(marketing)/login/page.tsx`: email/password form + Google OAuth button
- [x] T028 [US6] Create sign-up page `app/(marketing)/signup/page.tsx`: email/password registration form
- [x] T029 [US6] Create `middleware.ts` at repo root: Vercel Edge auth guard (redirect unauthenticated → `/login`) + rate limiting (100 req/min/IP)
- [x] T030 [US6] Create app shell layout `app/(app)/layout.tsx`: auth check, nav bar with user name + sign out button
- [x] T031 [US6] Implement sign-out action: clear Supabase session + clear `localStorage` API key + redirect to `/`
- [ ] T032 [US6] Create "Check your email" confirmation page shown after sign-up
- [x] T033 [US6] Integration test `tests/integration/auth.test.ts`: full register → verify → login → logout flow

**Checkpoint**: A new test user account can register, verify email, log in, reach the (empty) app shell, and log out. Google OAuth works. RLS is active.

---

## Phase 4: User Story 1 — BYOK Setup & First Project (Priority: P1) (Week 2 — Days 3–5)

**Goal**: New user enters API key, validates it, creates first project, reaches interview screen.
**Independent Test**: After auth, user enters valid API key → validation succeeds → creates "Test SaaS" project → interview screen loads ✅

### Unit Tests — BYOK & Projects (write first, verify FAIL) ⚠️

- [ ] T034 [P] [US1] Unit test `tests/unit/anthropic/validation.test.ts`: key format validation (valid format, invalid format, quota exceeded, rate limited)
- [ ] T035 [P] [US1] Unit test: project creation API route returns 402 when free tier limit (3 projects) is reached

### Implementation — BYOK Setup

- [ ] T036 [US1] Create `lib/anthropic/validation.ts`: `validateKeyFormat(key: string)` + `testApiCall(key: string): Promise<ValidationResult>`
- [ ] T037 [US1] Create `components/onboarding/ApiKeyInput.tsx`: input field with format validation, "Verify Key" button, loading/success/error states, security explanation ("Your key never leaves your browser")
- [ ] T038 [US1] Implement localStorage key storage in `ApiKeyInput.tsx`: store on success, never send to any API route
- [ ] T039 [US1] Create `components/onboarding/ProjectTypeSelect.tsx`: 5 template cards (SaaS, API-only, Internal Tool, Mobile App, Landing Page) with icons and descriptions
- [ ] T040 [US1] Create onboarding page `app/(app)/onboarding/page.tsx`: 2-step flow (Step 1: API key setup, Step 2: project creation), progress indicator

### Implementation — Project API Routes

- [ ] T041 [US1] Create `app/api/projects/route.ts`: `GET` (list projects) + `POST` (create project, enforce free tier 3-project limit)
- [ ] T042 [US1] Create `app/api/projects/[id]/route.ts`: `GET` (single project with interview_data) + `PATCH` (update) + `DELETE` (soft delete)
- [ ] T043 [US1] Integration test `tests/integration/projects.test.ts`: CRUD operations with authenticated user context + verify 402 on free tier limit

**Checkpoint**: Authenticated user can enter a valid Anthropic API key, see validation succeed, create a named SaaS project, and reach the interview screen (even if blank). Free tier limit returns 402 on 4th project attempt.

---

## Phase 5: User Story 2 — AI Planning Interview (Priority: P1) (Week 3)

**Goal**: User completes full 10-domain interview with streaming AI responses and live preview.
**Independent Test**: Complete solo-founder SaaS interview end-to-end — all 10 domains, AI gives opinionated recommendations, preview updates after each domain ✅

### Unit Tests — Interview State Machine (write first, verify FAIL) ⚠️

- [ ] T044 [P] [US2] Unit test `tests/unit/interview/store.test.ts`: all domain transitions (idle → planning → architecture → ... → complete), resume from mid-state, domain completion detection
- [ ] T045 [P] [US2] Unit test `tests/unit/anthropic/streaming.test.ts`: stream token accumulation, error handling (rate limit, quota, network)

### Implementation — System Prompt Skeleton (Blocker)

- [ ] T045a [US2] Write a skeleton `DEVDOCS_SYSTEM_PROMPT` in `.env.local` sufficient to drive all 10 interview domains — persona, domain ordering, completion signal format, and markdown output format per file. This does NOT need to be the final quality-tuned prompt (that is Phase 10), but it MUST be complete enough that the Phase 5 checkpoint (end-to-end interview + preview panel population) is a valid test. **The Phase 5 checkpoint is invalid without this task complete.** Store in Vercel staging env vars once agreed by team.

### Implementation — Session Init

- [ ] T046 [US2] Create `app/api/session/init/route.ts`: reads `DEVDOCS_SYSTEM_PROMPT` env var, returns it with model name + project type. Never expose to client bundle.

### Implementation — Interview State Machine

- [ ] T047 [US2] Create `lib/interview/domains.ts`: domain definitions, ordering, required sections per domain, display names
- [ ] T048 [US2] Create `lib/interview/completion.ts`: `detectDomainCompletion(message: string, domain: DomainId): boolean` — parses AI output for domain completion signal
- [ ] T049 [US2] Create `store/interview.ts` Zustand store: full state machine (currentDomain, completedDomains, domainContent, conversationHistory, status), `completeCurrentDomain()`, `resumeFromSaved()`, serialise to JSONB

### Implementation — Interview UI

- [ ] T050 [US2] Create `lib/anthropic/client.ts`: `createAnthropicClient(apiKey: string)` factory using BYOK key from localStorage
- [ ] T051 [US2] Create `lib/anthropic/streaming.ts`: `streamInterviewResponse()` — wraps Anthropic SDK streaming, yields tokens, detects completion signal, handles errors
- [ ] T052 [US2] Create `components/interview/StreamingMessage.tsx`: renders streaming tokens in real-time as they arrive
- [ ] T053 [US2] Create `components/interview/ChatPanel.tsx`: conversation thread, message input, send button, streaming message rendering
- [ ] T054 [US2] Create `components/interview/DomainProgress.tsx`: 10-domain progress bar, completed domains highlighted
- [ ] T055 [US2] Create `components/interview/PreviewPanel.tsx`: live documentation preview, sections populate as domains complete, react-markdown renderer
- [ ] T056 [US2] Create interview page `app/(app)/project/[id]/interview/page.tsx`: split-pane layout (ChatPanel left, PreviewPanel right), loads saved interview_data on mount for resume
- [ ] T057 [US2] Implement auto-save: on every domain completion, PATCH `/api/projects/[id]` with updated `interview_data`
- [ ] T058 [US2] Implement error states: API key invalid mid-interview → inline error with key update link; rate limit → inline retry with countdown; quota exceeded → inline explanation

**Checkpoint**: A test user can complete all 10 interview domains for a SaaS project. The AI gives opinionated, constraint-aware recommendations. Preview panel populates after each domain. Closing and reopening the browser resumes from the last completed domain.

---

## Phase 6: User Story 3 — Bundle Review & Export (Priority: P1) (Week 4 — Days 1–3)

**Goal**: User reviews generated bundle in split-pane editor, edits files, exports ZIP.
**Independent Test**: Open completed project → review all 10 files in split-pane → edit ARCHITECTURE.md → click Export ZIP → verify ZIP contains 11 files under docs/ ✅

### Unit Tests — Export (write first, verify FAIL) ⚠️

- [ ] T059 [P] [US3] Unit test `tests/unit/export/zip.test.ts`: ZIP generation from mock bundle data, verify all 11 files present, correct paths (`docs/PLANNING.md` etc.)
- [ ] T060 [P] [US3] Unit test `tests/unit/export/readme.test.ts`: README.md generation with correct project name, date, and all 10 file links

### Implementation — Bundle API Routes

- [ ] T061 [US3] Create `app/api/projects/[id]/bundle/route.ts`: `GET` (retrieve latest bundle) + `POST` (save/update bundle, validate all 10 keys present)
- [ ] T062 [US3] Create `app/api/export/[id]/route.ts`: build ZIP from stored bundle JSONB using `lib/export/zip.ts`, stream as `application/zip`
- [ ] T063 [US3] Create `lib/export/zip.ts`: JSZip bundle builder, places all files under `docs/` path
- [ ] T064 [US3] Create `lib/export/readme.ts`: auto-generates `docs/README.md` from project name, completion date, and file descriptions
- [ ] T065 [US3] Integration test `tests/integration/bundles.test.ts`: save bundle → retrieve → verify structure

### Implementation — Bundle Review UI

- [ ] T066 [US3] Create `components/review/BundleEditor.tsx`: split-pane with CodeMirror 6 (markdown mode) on right, react-markdown preview on left, real-time sync
- [ ] T067 [US3] Create `components/review/FileTab.tsx`: tab component for each of 10 files, active state, unsaved changes indicator
- [ ] T068 [US3] Create `components/review/ExportButton.tsx`: triggers GET `/api/export/[id]`, handles streaming download, shows progress
- [ ] T069 [US3] Create `components/review/RegenerateButton.tsx`: triggers re-run of AI for single file using stored interview_data, updates only that file in bundle
- [ ] T070 [US3] Create review page `app/(app)/project/[id]/review/page.tsx`: file tabs, split-pane editor, Export ZIP button, Share button, Regenerate per file
- [ ] T071 [US3] Implement bundle save on edit: debounced PATCH to `/api/projects/[id]/bundle` 2s after last keystroke

### Implementation — Share Links

- [ ] T072 [US3] Create `app/api/share/route.ts`: generate cryptographically random token, insert into share_links, return share URL
- [ ] T073 [US3] Create read-only share page `app/share/[token]/page.tsx`: fetch bundle via Supabase anon key + token, render all files read-only, no edit controls
- [ ] T074 [US3] Integration test `tests/integration/share.test.ts`: create share link → access via unauthenticated request → verify read-only (attempt write → verify blocked)

**Checkpoint**: User can review all 10 files, edit markdown with live preview, export a valid ZIP with 11 files under docs/, and create a share link that works when opened in an incognito browser without login.

---

## Phase 7: User Story 4 — Project Dashboard (Priority: P2) (Week 4 — Days 4–5)

**Goal**: User sees all their projects, navigates between them, soft-deletes projects.
**Independent Test**: Create 3 projects in different states → dashboard shows all 3 with correct status badges → soft-delete one → it disappears from dashboard (deleted_at set) ✅

- [ ] T075 [US4] Create `components/dashboard/ProjectCard.tsx`: project name, type badge, status indicator, last modified, quick actions (open, delete)
- [ ] T076 [US4] Create `components/dashboard/EmptyState.tsx`: illustrated empty state with strong CTA explaining what a documentation bundle is
- [ ] T077 [US4] Create dashboard page `app/(app)/dashboard/page.tsx`: fetch all projects via GET `/api/projects`, render ProjectCard grid, sort by updated_at DESC
- [ ] T078 [US4] Implement soft-delete flow: confirm dialog → DELETE `/api/projects/[id]` → remove from UI + 5-second undo toast
- [ ] T079 [US4] Implement undo: on undo click within 5s, PATCH project `deleted_at: null` to restore

**Checkpoint**: Dashboard shows all user projects correctly. Soft-delete works with undo. Empty state is shown for new users.

---

## Phase 8: User Story 5 — Project Templates (Priority: P2) (Week 5 — Day 1)

**Goal**: 5 project type templates pre-configure the interview opening.
**Independent Test**: Select SaaS template → interview opens with pre-written SaaS context message → AI picks up template in first response ✅

- [ ] T080 [US5] Create `lib/interview/templates.ts`: define 5 template objects (SaaS, API-only, Internal Tool, Mobile App, Landing Page), each with: `id`, `name`, `description`, `openingMessage: string`, `aiHints: string`
- [ ] T081 [US5] Update `ProjectTypeSelect` component to display template cards with descriptions
- [ ] T082 [US5] Update interview page: on load, if template is set, pre-populate chat input with `template.openingMessage`, user can edit before sending
- [ ] T083 [US5] Validate: for API-only template, AI skips frontend domain and focuses on REST/GraphQL, rate limiting, versioning

**Checkpoint**: All 5 templates load the correct pre-written opening message. API-only template correctly skips frontend domain.

---

## Phase 9: Analytics & Error Tracking (Week 5 — Days 2–3)

**Purpose**: Instrument the product to measure activation and diagnose issues.

- [ ] T084 [P] Configure Sentry: `npx @sentry/wizard@latest -i nextjs`, configure source maps, user context (user ID only, no email), Anthropic API errors as warning-level
- [ ] T085 [P] Configure PostHog: install `posthog-js`, create `lib/analytics/events.ts` with typed wrappers for all 7 events: `api_key_configured`, `interview_started`, `interview_completed`, `bundle_generated`, `bundle_exported`, `bundle_shared`, `section_regenerated`
- [ ] T086 Fire `api_key_configured` event on successful API key validation in `ApiKeyInput.tsx`
- [ ] T087 Fire `interview_started` event when user sends first interview message
- [ ] T088 Fire `interview_completed` event when all 10 domains are marked complete
- [ ] T089 Fire `bundle_generated` event when bundle is first saved to Supabase
- [ ] T090 Fire `bundle_exported` event when ZIP download is triggered
- [ ] T091 Fire `bundle_shared` event when share link is created
- [ ] T092 Fire `section_regenerated` event when a single file is regenerated
- [ ] T092a [P] Integration test `tests/integration/analytics.test.ts`: stub PostHog and run the complete happy-path flow (register → BYOK → create project → complete interview → export ZIP → share); assert all 7 events fire in order with correct properties (`api_key_configured`, `interview_started`, `interview_completed`, `bundle_generated`, `bundle_exported`, `bundle_shared`, `section_regenerated`). Use Playwright + PostHog test mode (`posthog.debug()`). This test is the contract between implementation and analytics — if an event is missing or misfired, analytics data is silently wrong in production.

---

## Phase 10: System Prompt Development (Week 5 — Days 4–5)

**Purpose**: Write, validate, and lock the master interview system prompt.

- [ ] T093 Write initial master system prompt (minimum 4-part structure: persona + interview protocol + recommendation engine + output format) in `DEVDOCS_SYSTEM_PROMPT` env var
- [ ] T094 Create `tests/prompts/` directory: one test file per archetype (5 total)
- [ ] T095 [P] Write PASS/FAIL grader for archetype 1: solo SaaS founder — verify monolith recommended for solo 3-month timeline, full schema generated, auth provider recommended with justification
- [ ] T096 [P] Write PASS/FAIL grader for archetype 2: bootcamp graduate, internal tool — verify complexity appropriate, not over-engineered, clear deployment instructions
- [ ] T097 [P] Write PASS/FAIL grader for archetype 3: small team, API-only — verify no frontend domain, rate limiting covered, versioning strategy present
- [ ] T098 [P] Write PASS/FAIL grader for archetype 4: mobile app — verify no web hosting in DEPLOYMENT.md, React Native considerations in FRONTEND.md
- [ ] T099 [P] Write PASS/FAIL grader for archetype 5: landing page + waitlist — verify minimal schema (email collection only), no complex auth recommended
- [ ] T100 Run all 5 graders against system prompt, iterate until all PASS

**Checkpoint**: System prompt passes all 5 archetype graders. Output for each archetype is reviewed by at least 1 external developer.

---

## Phase 11: Marketing Landing Page & SEO (Week 6 — Days 1–2)

**Purpose**: Public-facing landing page with SSG for SEO discoverability.

- [ ] T101 Create landing page `app/(marketing)/page.tsx`: headline, problem statement, before/after comparison, feature list, CTA (Sign Up + "Watch Demo")
- [ ] T102 [P] Add JSON-LD structured data for SoftwareApplication schema on landing page
- [ ] T103 [P] Create `sitemap.ts` Next.js sitemap for marketing pages
- [ ] T104 [P] Configure `robots.txt`
- [ ] T105 Add Open Graph + Twitter meta tags to marketing layout
- [ ] T106 Set up `next/font` with Inter (self-hosted, Latin subset) and JetBrains Mono

---

## Phase 12: Polish, Accessibility & Performance (Week 6 — Days 3–5)

**Purpose**: Production-readiness. All error states, loading states, accessibility, performance.

- [ ] T107 Implement all loading states: skeleton screens for dashboard, interview panel, review page
- [ ] T108 [P] Implement all empty states: empty dashboard, no bundle yet (interview not completed)
- [ ] T109 [P] Implement all error boundaries: interview crash → show error with retry; bundle load fail → show retry
- [ ] T110 [P] Implement dark mode: Tailwind `dark:` classes throughout, system preference detection, manual toggle
- [ ] T111 Run axe DevTools accessibility audit on all 5 key screens — fix all critical violations
- [ ] T112 [P] Add `aria-label` to all icon-only buttons, `aria-live` to interview streaming area, all form inputs labelled
- [ ] T113 [P] Run Lighthouse CI on landing page + dashboard: target ≥ 90 all categories. Fix any score below 90.
- [ ] T114 Run `npm audit` — fix all critical and high vulnerabilities
- [ ] T115 [P] Performance: audit JS bundle size with `@next/bundle-analyzer`. Lazy-load CodeMirror (dynamic import, client-side only).
- [ ] T116 Write E2E test `tests/e2e/happy-path.spec.ts`: full flow register → BYOK setup → complete interview → edit bundle → export ZIP
- [ ] T117 [P] Write E2E test `tests/e2e/byok-failure.spec.ts`: invalid key → error shown → corrected → retry succeeds
- [ ] T118 [P] Write E2E test `tests/e2e/resume.spec.ts`: start interview → close browser → reopen → interview resumes correctly

---

## Phase 13: Edge Case Coverage (Week 6 — alongside Phase 12)

**Purpose**: Implement the specific edge cases defined in spec.md. These are not polish — they are
specified failure modes that MUST be handled before beta launch.

- [ ] T119 [US1] Display warning when BYOK key validation succeeds but the key's account email differs from the registered account email — fetch `GET https://api.anthropic.com/v1/users/me` during validation, compare domains (not full emails), show advisory banner: "This key belongs to a different Anthropic account. Usage will be charged to that account." Non-blocking — user can proceed.
- [ ] T120 [US2/US3] Generate placeholder content when AI returns an empty or whitespace-only output for a domain — in `lib/interview/completion.ts`, detect empty domain content after stream closes; substitute a structured placeholder per domain (e.g. `# Architecture\n\n> ⚠️ Content could not be generated for this section. Please use /Regenerate to retry, or edit manually.\n`). Empty files in the exported ZIP are a spec violation (see edge cases in spec.md).
- [ ] T121 [US2/US3] Detect and warn about concurrent edits across multiple browser tabs — on interview and review pages, use Supabase Realtime `presence` channel scoped to `project:[id]`; if a second tab joins, display a persistent non-blocking banner in both tabs: "This project is open in another tab. The last save wins — editing in both tabs may cause data loss." No automatic merge or locking in MVP.
- [ ] T122 [US3] Implement markdown parsing fallback in `components/review/BundleEditor.tsx` — wrap `react-markdown` render in an error boundary; on parse/render error, display the raw markdown string in a `<pre>` block with a visible warning: "Preview could not render — showing raw markdown." The editor pane remains functional so the user can still edit and export.

**Checkpoint**: All 4 edge cases manually verified against the scenarios in spec.md Edge Cases section.

**Final Checkpoint**: All E2E tests pass on staging. Lighthouse CI ≥ 90. Zero critical axe violations. Sentry reports zero unhandled errors in staging smoke test. System prompt passes all 5 graders.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies — start immediately
- **Phase 2 (Database)**: Requires Phase 1 complete — BLOCKS all user story phases
- **Phase 3 (Auth)**: Requires Phase 2 complete
- **Phase 4 (BYOK + Projects)**: Requires Phase 3 complete
- **Phase 5 (Interview)**: Requires Phase 4 complete
- **Phase 6 (Bundle/Export)**: Requires Phase 5 complete
- **Phases 7–8 (Dashboard, Templates)**: Can run in parallel with Phase 6
- **Phases 9–10 (Analytics, Prompt)**: Can run in parallel with Phases 7–8
- **Phases 11–12 (Marketing, Polish)**: Run last — require all features complete

### Parallel Opportunities

- All `[P]`-tagged tasks within the same phase can run simultaneously
- Phase 7 (Dashboard) and Phase 8 (Templates) can be built in parallel with Phase 6
- System prompt development (Phase 10) can begin in parallel with Phase 5

### Implementation Strategy — Solo Developer

Follow strictly in order: 1 → 2 → 3 → 4 → 5 → 6 → 7 → 8 → 9 → 10 → 11 → 12.
Each phase has a checkpoint — do not advance until the checkpoint passes.
Phase 5 (Interview) is the longest and riskiest phase — allocate extra time for system prompt iteration.

### Implementation Strategy — Two Developers

- Dev A: Phases 1 → 2 → 3 → 4 → 5 (core interview flow)
- Dev B: Phases 1 → 2 → 3 → then Phases 7, 8, 11 in parallel with Dev A's Phase 5 and 6

---

## Notes

- Mark tasks complete with `[x]` as you finish them
- Commit after each logical group (e.g. all Phase 2 migrations in one commit)
- Each phase checkpoint must pass before proceeding — do not skip checkpoints
- If scope creep arises, add to `BACKLOG.md`, do not implement during MVP
- The system prompt (Phase 10) should be iterated in parallel with user testing — start early
- Vercel preview deploys on every PR — share preview URLs for design feedback before merging
