# Feature Specification: DevDocs AI — MVP

**Feature Branch**: `001-devdocs-ai-mvp`
**Created**: 2026-04-01
**Status**: Draft
**Input**: Full project documentation — DevDocs_AI_Project.md v1.0

---

## User Scenarios & Testing

### User Story 1 — BYOK Setup & First Project Creation (Priority: P1)

A newly registered developer completes email verification, lands on the BYOK setup screen,
reads the security explanation, enters their Anthropic API key, validates it with a test call,
and creates their first project — arriving at an empty interview screen ready to begin.

**Why this priority**: This is the entry gate to all product value. Nothing else works without a
valid API key and a project context. It is also the highest-friction moment in the onboarding
flow — getting a user through this successfully is the foundation of all activation metrics.

**Independent Test**: A new user can register, enter a valid Anthropic API key, see the
validation succeed, create a named project of type "SaaS", and reach the interview screen —
with the project persisted to Supabase under their user ID — without any other feature being built.

**Acceptance Scenarios**:

1. **Given** a newly verified user lands on `/onboarding`, **When** they enter a valid Anthropic
   API key and click "Verify Key", **Then** a test API call succeeds, a success indicator is shown,
   the key is saved to `localStorage` only (never to any server), and the user is redirected to
   project creation.

2. **Given** a user enters an invalid API key format, **When** they click "Verify Key",
   **Then** a format validation error is shown immediately (before any API call) explaining the
   expected format (`sk-ant-...`).

3. **Given** a user enters a correctly-formatted but quota-exhausted key, **When** the test call
   returns a quota error, **Then** a clear error message explains the key is valid but has no
   quota, with a link to the Anthropic billing page.

4. **Given** a verified user on the project creation screen, **When** they enter a project name
   and select a project type (SaaS / API / Internal Tool / Mobile / Landing Page), **Then** a
   project is created in Supabase with `status: in_progress`, the user is redirected to the
   interview screen, and the project appears on their dashboard.

5. **Given** a user returns to the app after closing their browser, **When** they log in again,
   **Then** their API key is restored from `localStorage` (if same browser/device) and their
   projects are visible on the dashboard.

---

### User Story 2 — Complete AI Planning Interview (Priority: P1)

A developer with an active project enters the interview screen and completes a structured
10-domain conversation with the AI, answering questions about their project across planning,
architecture, database, API, environment, auth, testing, monitoring, frontend, and deployment.
The right panel updates in real-time as each domain is completed.

**Why this priority**: This is the core product experience. Without a complete interview, there
is no documentation bundle, no value delivered, and no activation metric recorded.

**Independent Test**: A user can complete all 10 interview domains for a "solo founder building
a SaaS with PostgreSQL and a 3-month deadline" project type, with the AI providing opinionated
recommendations and the documentation preview updating after each domain completes.

**Acceptance Scenarios**:

1. **Given** a user on the interview screen, **When** they send their first message describing
   their project, **Then** the AI (using the master system prompt and the user's BYOK key)
   responds with the first domain questions, and streaming tokens appear in real-time in the
   conversation panel.

2. **Given** a user is in the Architecture domain, **When** they describe a solo project with
   a 3-month deadline and moderate backend experience, **Then** the AI recommends a monolith
   over microservices with a written justification specific to their constraints — not a generic
   recommendation.

3. **Given** a user completes a domain (e.g. Database), **When** the AI signals domain
   completion, **Then** the corresponding section in the right-panel documentation preview
   populates with the structured content for that domain.

4. **Given** a user mid-interview closes their browser, **When** they return and open the
   project, **Then** the interview resumes from the last completed domain, and all previously
   completed sections are visible in the preview panel.

5. **Given** a user completes all 10 interview domains, **When** the final domain is submitted,
   **Then** the interview is marked complete, the full documentation bundle preview is visible,
   and the user is prompted to proceed to the Documentation Review screen.

6. **Given** the user's API key has been rate-limited mid-interview, **When** the Anthropic API
   returns a rate-limit error, **Then** the UI shows a clear inline error (not a blank screen or
   crash), explains the situation, and allows the user to retry after the limit resets.

---

### User Story 3 — Documentation Bundle Review & Export (Priority: P1)

After completing the interview, a developer reviews the 10 generated documentation files in a
split-pane editor (rendered preview left, editable markdown right), makes inline edits, and
exports the complete bundle as a ZIP file ready to drop into the root of their project repository.

**Why this priority**: The ZIP export is the primary activation metric (`bundle_exported` event).
A user who downloads their bundle has received the core value of the product. This story must
be independently testable before any growth or monetisation work begins.

**Independent Test**: Given a completed interview, a user can open each of the 10 documentation
files in the split-pane editor, edit one file's raw markdown and see the rendered preview update,
click "Export ZIP" and receive a valid ZIP containing 11 files (10 docs + README.md index) named
correctly and placed under a `docs/` directory.

**Acceptance Scenarios**:

1. **Given** a completed interview, **When** the user arrives on the Documentation Review screen,
   **Then** all 10 documentation files are present as tabs (PLANNING, ARCHITECTURE, DATABASE,
   API-CONTRACTS, ENV-STRATEGY, AUTH, TESTING, MONITORING, FRONTEND, DEPLOYMENT), each populated
   with content generated from the interview answers.

2. **Given** the user selects the DATABASE tab, **When** the split-pane loads, **Then** the left
   pane shows rendered markdown with correct heading hierarchy, and the right pane shows editable
   raw markdown that, when modified, updates the left pane preview in real-time.

3. **Given** the user clicks "Regenerate" on a specific file (e.g. ARCHITECTURE), **When** the
   regeneration completes, **Then** only that file is regenerated using the stored interview data
   — the other 9 files are unchanged.

4. **Given** the user clicks "Export ZIP", **When** the download completes, **Then** the ZIP
   contains a `docs/` directory with all 10 `.md` files plus a `docs/README.md` index file
   linking to all 10 files with one-line descriptions and the session completion date.

5. **Given** the user clicks "Share", **When** the share link is created, **Then** a read-only
   URL is generated. When opened in an incognito browser (unauthenticated), the documentation bundle is visible
   but no edit controls are present, and no Supabase write operations are possible.

---

### User Story 4 — Project Dashboard Management (Priority: P2)

A developer with multiple projects can view all their projects on a dashboard, see status
indicators, access any project's bundle, and delete or archive a project.

**Why this priority**: Required for returning user retention. A user building more than one
project needs to navigate between them. Retention (7-day return rate target: 25%) depends on
a usable dashboard.

**Independent Test**: A user with 3 projects (one complete, one in progress, one archived) sees
all three on the dashboard with correct status badges, can click into any project to continue
the interview or review the documentation bundle, and can soft-delete a project which removes it from the
dashboard (but `deleted_at` is set, not a hard delete).

**Acceptance Scenarios**:

1. **Given** a user with saved projects, **When** they visit `/dashboard`, **Then** all projects
   are listed with: project name, type badge, status indicator (in progress / complete / archived),
   and last modified date — sorted by most recently modified.

2. **Given** an empty dashboard (new user), **When** the user sees the empty state, **Then** a
   clear CTA is visible explaining what a documentation bundle is and prompting them to start
   their first project.

3. **Given** a user clicks "Delete" on a project, **When** they confirm the deletion prompt,
   **Then** `deleted_at` is set on the project (soft delete), the project is removed from the
   dashboard view, and a toast confirms deletion with an "Undo" option valid for 5 seconds.

---

### User Story 5 — Project Templates (Priority: P2)

A developer starting a new project can select from 5 pre-defined starter templates (SaaS,
API-only, Internal Tool, Mobile App, Landing Page) that pre-configure the interview with
sensible defaults, reducing the time to first meaningful AI response.

**Why this priority**: Templates reduce the blank-page problem and improve time-to-value
(target: under 30 minutes from registration to first bundle export).

**Independent Test**: Selecting the "SaaS" template pre-populates the first interview message
with a structured description of a SaaS project, the user can edit it or send as-is, and the
AI correctly picks up the template context in its first response.

**Acceptance Scenarios**:

1. **Given** a user on the project creation screen, **When** they select "SaaS" template,
   **Then** the interview screen opens with a pre-written opening message that includes the
   key SaaS project attributes (multi-tenant, user auth, subscription billing awareness),
   which the user can edit before sending.

2. **Given** a user selects a template, **When** they begin the interview, **Then** the AI's
   first domain response is appropriately tailored to the template type (e.g. for API-only:
   skips frontend questions, focuses on REST vs GraphQL, rate limiting, versioning).

---

### User Story 6 — Authentication (Priority: P1, Blocking)

A developer can register with email/password or Google OAuth, verify their email, log in,
and log out. Sessions are persisted across browser closes.

**Why this priority**: Blocking prerequisite for all other user stories. Cannot build
any personalised experience, save any data, or show a dashboard without auth.

**Independent Test**: A new user can register with email, verify via the emailed link, log in,
see their (empty) dashboard, log out, and log back in — with Supabase Auth handling the full
session lifecycle, and RLS enforcing that they can only see their own projects.

**Acceptance Scenarios**:

1. **Given** a new visitor on `/`, **When** they click "Sign Up" and enter email + password,
   **Then** a verification email is sent, and the UI shows a "Check your email" confirmation.

2. **Given** a user clicks the verification link in their email, **When** the link is valid and
   unexpired, **Then** they are redirected to `/onboarding` and their account is active.

3. **Given** a logged-in user, **When** they click "Sign Out", **Then** their Supabase session
   is invalidated, `localStorage` API key is cleared, and they are redirected to `/`.

4. **Given** a user tries to access `/dashboard` without being logged in, **When** the page
   loads, **Then** they are redirected to `/login` with the intended URL preserved as a
   redirect parameter.

---

### Edge Cases

- User enters an Anthropic API key with correct format but from a different Anthropic account
  that has never been used — the validation test call succeeds (key is valid), but usage will
  accumulate on that account. The UI must make this transparent.
- User completes interview but closes the tab before the bundle is fully generated — on return,
  the interview_data is persisted in Supabase but the documentation bundle may be incomplete. The UI must
  detect this and offer a "Resume generation" option.
- User attempts to export ZIP with 0 bytes in one documentation file (AI generated empty output
  for a domain) — ZIP export must still succeed, but the affected file must contain a placeholder
  explaining the content could not be generated, not an empty file.
- User hits the free tier 3-project limit — on creating a 4th project, a clear upgrade prompt
  is shown. The project is NOT silently created and then locked.
- Two browser tabs open on the same project — the last write wins via Supabase real-time
  updates. No data corruption, but the user is warned if a conflict is detected.
- Interview answer causes the AI to output malformed markdown — the preview renderer must
  handle malformed markdown gracefully (display raw text fallback) rather than crashing.

---

## Requirements

### Functional Requirements

- **FR-001**: System MUST store Anthropic API keys exclusively in browser `localStorage` — never
  transmitted to or stored on DevDocs AI servers.
- **FR-002**: System MUST validate API key format (`sk-ant-...`) client-side before making any
  API call.
- **FR-003**: System MUST make all Anthropic API calls client-side with the user's BYOK key,
  injecting `DEVDOCS_SYSTEM_PROMPT` from a server-side endpoint per session initialisation.
  The system prompt is fetched once per project load and cached in memory for the duration of
  that browser session only — it is not persisted to localStorage, IndexedDB, or any client-side
  store, and is discarded when the tab is closed or the session ends.
- **FR-004**: System MUST support streaming responses from the Anthropic API and render tokens
  in real-time in the interview chat panel. Streaming latency (time from token received to DOM
  update) MUST be < 100ms P95. Visible token rendering MUST begin within 2 seconds of request
  initiation.
- **FR-005**: System MUST persist interview conversation state (`interview_data` JSONB) to
  Supabase on every domain completion, enabling resume on browser close.
- **FR-006**: System MUST generate all 10 documentation files from completed interview data.
- **FR-007**: System MUST allow regeneration of individual documentation files without
  repeating the full interview.
- **FR-008**: System MUST export the documentation bundle as a ZIP containing a `docs/` directory
  with 10 `.md` files plus a generated `docs/README.md` index.
- **FR-009**: System MUST enforce Row Level Security on all Supabase tables — users can only
  access their own data.
- **FR-010**: System MUST soft-delete projects (`deleted_at` timestamp) — never hard-delete
  without an explicit user purge action.
- **FR-011**: System MUST generate read-only share links enforced by Supabase RLS — shared
  viewers cannot write. In MVP, all share links are permanent (no expiry) and can only be
  revoked by the owning user via manual deletion. Link expiration configuration, bulk revocation,
  and per-link permission scoping are explicitly deferred to post-MVP (see BACKLOG.md).
- **FR-012**: System MUST apply rate limiting of 100 requests per minute per IP on all
  Next.js API routes. When limit is exceeded, return HTTP 429 (Too Many Requests) with
  `Retry-After` header indicating seconds until reset, and JSON body:
  `{"error": "rate_limit_exceeded", "retry_after": <seconds>}`.
- **FR-013**: System MUST provide 5 project templates: SaaS, API-only, Internal Tool,
  Mobile App, Landing Page.
- **FR-014**: System MUST track the following PostHog events: `api_key_configured`,
  `interview_started`, `interview_completed`, `bundle_generated`, `bundle_exported`,
  `bundle_shared`, `section_regenerated`.
- **FR-015**: System MUST limit free tier accounts to 3 active projects. The limit applies
  only to projects where `deleted_at IS NULL` — soft-deleted projects do not count toward the
  limit. On reaching the limit, display an upgrade prompt before allowing a 4th project to be
  created. The project is NOT silently created and then locked.
- **FR-016**: System MUST handle Anthropic API errors (invalid key, quota exceeded, rate limit)
  with clear user-facing messages and Sentry warning-level reports (not error-level).

### Key Entities

- **User (profiles)**: A registered developer. Has a plan (free/pro/team), optional display name,
  and an API key hash for verification purposes. API key itself never stored server-side.
- **Project**: A pre-build planning session. Has a type, status, and stores the full interview
  Q&A as JSONB (`interview_data`). Soft-deletable. Belongs to one User.
- **DocumentationBundle**: The 10-file output generated from a completed Project interview.
  Stores all file content as JSONB keyed by filename. Versioned (integer). Belongs to one Project.

---

## Success Criteria

### Measurable Outcomes

- **SC-001**: Activation rate — ≥ 40% of registered users complete one full interview and
  export a bundle within their first session.
- **SC-002**: Time to value — median time from registration to first `bundle_exported` event
  is under 30 minutes. Measured as wall-clock time including user reading, thinking, and typing
  time — not just system processing time. Tracked via PostHog event timestamps between
  `signed_up` and `bundle_exported`.
- **SC-003**: 7-day retention — ≥ 25% of activated users return within 7 days of first session.
- **SC-004**: Output quality — ≥ 3 out of 5 external developers reviewing a generated bundle
  rate it as "production-ready" or "needs only minor edits" in the beta feedback survey.
  Evaluation rubric: (1) All 10 files present and non-empty, (2) Architecture recommendations
  match stated constraints (timeline/team size/budget), (3) Database schema includes all
  entities mentioned in requirements, (4) No generic/placeholder content ("TODO", "configure
  as needed" without specifics), (5) Deployment instructions are runnable without additional
  research.
- **SC-005**: System prompt quality — the master system prompt passes all PASS/FAIL graders
  for all 5 defined project archetypes before beta launch.
- **SC-006**: Performance — Lighthouse CI score ≥ 90 on performance, accessibility, best
  practices, and SEO on all public-facing pages at launch.
- **SC-007**: Error handling — zero unhandled exceptions visible to users in production Sentry
  in the first 2 weeks post-beta launch.
- **SC-008**: Free-to-paid conversion — ≥ 3% of active free users upgrade to Pro within 60
  days of Pro tier launch (Phase 4).
