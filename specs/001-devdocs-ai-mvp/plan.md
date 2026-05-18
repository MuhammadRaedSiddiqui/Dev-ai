# Implementation Plan: DevDocs AI MVP

**Branch**: `001-devdocs-ai-mvp` | **Date**: 2026-04-01 | **Spec**: `specs/001-devdocs-ai-mvp/spec.md`

---

## Summary

DevDocs AI is a web application that conducts a structured AI interview with developers
before they begin building, then generates a 10-file markdown documentation bundle optimised
for AI coding agent consumption. The MVP uses a BYOK (Bring Your Own Key) model — all
Anthropic API calls are made client-side using the user's own key, stored only in browser
localStorage. Project sessions and documentation bundles are persisted to Supabase.
The system prompt (core IP) is served server-side only.

---

## Technical Context

**Language/Version**: TypeScript 5.x (strict mode)
**Framework**: Next.js 14 with App Router
**Primary Dependencies**: Anthropic SDK (client-side), Supabase JS v2, shadcn/ui, Tailwind CSS,
  JSZip, CodeMirror 6, react-markdown, PostHog, Sentry
**Storage**: Supabase PostgreSQL (managed), browser localStorage (API key only)
**Testing**: Vitest (unit), Playwright (integration + E2E)
**Target Platform**: Web (Vercel, Node.js 20 LTS runtime)
**Project Type**: Web application (Next.js monorepo — no separate backend process)
**Performance Goals**: Lighthouse CI ≥ 90 all categories; P95 API route latency < 3s (AI
  streaming excluded from SLO); First Contentful Paint < 1.5s on marketing pages
**Constraints**: Vercel hobby-tier function timeout (10s) — not a constraint since all AI
  calls are client-side; Supabase free tier row limits apply during validation phase
**Scale/Scope**: MVP targets 0–200 registered users in first 2 weeks of beta

---

## Architecture Decision Records

### ADR-001: Frontend Framework — Next.js 14 App Router

| | |
|---|---|
| **Decision** | Next.js 14 with App Router |
| **Alternatives considered** | Remix, SvelteKit, plain React + Vite |
| **Rationale** | SSR for SEO on marketing pages; CSR for app; React Server Components for initial load; mature ecosystem; likely team familiarity |
| **Trade-offs** | Heavier than Remix/SvelteKit; App Router learning curve. Acceptable given ecosystem. |
| **Consequences** | `/app/*` = App Router. `/` marketing = SSG. `/api/*` = server-side routes (non-AI only). |

### ADR-002: Database — Supabase (PostgreSQL)

| | |
|---|---|
| **Decision** | Supabase (PostgreSQL + Auth + RLS) |
| **Alternatives considered** | PlanetScale, Neon, self-hosted PostgreSQL, MongoDB |
| **Rationale** | PostgreSQL + auth + real-time + storage in one managed service; generous free tier; RLS eliminates auth bug category; Supabase Auth out-of-the-box |
| **Trade-offs** | Vendor dependency; free tier row/storage limits. Acceptable at MVP scale. |
| **Consequences** | All user data, projects, and bundles in Supabase PostgreSQL. Supabase Auth for all user management. |

### ADR-003: AI Integration — Client-side BYOK with claude-sonnet-4-6

| | |
|---|---|
| **Decision** | Client-side Anthropic SDK, BYOK model, `claude-sonnet-4-6` |
| **Alternatives considered** | Server-side proxy with operator key, OpenAI, Google Gemini |
| **Rationale** | BYOK = zero operator API cost during validation; client-side = no AI backend infra; Claude Sonnet 4.6 = best multi-turn technical reasoning at competitive price |
| **Trade-offs** | Adds onboarding friction (user must obtain API key). Mitigated by setup guide. |
| **Consequences** | No server-side AI infrastructure. Key in localStorage only. All interview logic client-side. System prompt injected via server-side session init endpoint. |

### ADR-004: Deployment — Vercel + Supabase managed

| | |
|---|---|
| **Decision** | Vercel for web app; Supabase managed for database |
| **Alternatives considered** | Netlify, Railway, Render, AWS Amplify |
| **Rationale** | Zero-config Next.js deployments; automatic PR preview environments; free hobby tier; git-push to production; Supabase is self-managing |
| **Trade-offs** | Vercel function timeout limits — not relevant since AI calls are client-side. |
| **Consequences** | Push to main → staging. Manual promotion to production after E2E gate. |

### ADR-005: State Management — React Context + Zustand (minimal)

| | |
|---|---|
| **Decision** | React Context for auth/user state; Zustand for interview session state |
| **Alternatives considered** | Redux, Jotai, server state only via Supabase real-time |
| **Rationale** | Interview session has complex branching state that benefits from a dedicated store. Auth state is well-served by Supabase's own context provider. |
| **Trade-offs** | Two state solutions. Acceptable given clear separation of concerns. |
| **Consequences** | `useSupabaseUser()` for auth. `useInterviewStore()` Zustand for interview state machine. |

---

## Constitution Check

| Gate | Status | Notes |
|------|--------|-------|
| BYOK key never server-side | ✅ PASS | Architecture enforces client-side only. CSP restricts outbound origins. |
| System prompt server-side only | ✅ PASS | Served via `/api/session/init` — never in client bundle. |
| RLS on all tables | ✅ PASS | All migrations include RLS policies. Tested with direct Supabase queries. |
| Soft deletes | ✅ PASS | `deleted_at` column on projects. No hard delete in MVP. |
| TypeScript strict | ✅ PASS | `strict: true` in `tsconfig.json` from project init. |
| Accessibility CI gate | ✅ PASS | Lighthouse CI + axe on every PR. Zero critical violations required. |
| Scope lock | ✅ PASS | Feature list fixed. Backlog items documented, not implemented. |

---

## Project Structure

### Documentation (this feature)

```text
.specify/specs/001-devdocs-ai-mvp/
├── spec.md              ← Feature specification (user stories + requirements)
├── plan.md              ← This file
├── data-model.md        ← Database schema + RLS policies
├── contracts/
│   ├── auth.md          ← Auth route contracts
│   ├── projects.md      ← Project CRUD contracts
│   ├── bundles.md       ← Bundle save/retrieve contracts
│   ├── export.md        ← ZIP export contract
│   ├── share.md         ← Share link contract
│   └── session.md       ← AI session init contract
└── tasks.md             ← Ordered task list
```

### Source Code

```text
devdocs-ai/
├── app/                          # Next.js App Router
│   ├── (marketing)/              # SSG marketing pages
│   │   ├── page.tsx              # Landing page
│   │   └── layout.tsx
│   ├── (app)/                    # CSR app shell (requires auth)
│   │   ├── layout.tsx            # App shell with nav + auth guard
│   │   ├── onboarding/
│   │   │   └── page.tsx          # BYOK setup + first project creation
│   │   ├── dashboard/
│   │   │   └── page.tsx          # Project list dashboard
│   │   ├── project/
│   │   │   └── [id]/
│   │   │       ├── interview/
│   │   │       │   └── page.tsx  # Interview chat + live preview
│   │   │       └── review/
│   │   │           └── page.tsx  # Bundle review + export
│   │   └── share/
│   │       └── [token]/
│   │           └── page.tsx      # Read-only share view
│   └── api/                      # Next.js API routes (server-side only)
│       ├── auth/
│       │   └── [...supabase]/
│       │       └── route.ts      # Supabase Auth callbacks
│       ├── session/
│       │   └── init/
│       │       └── route.ts      # Injects system prompt (server-side only)
│       ├── projects/
│       │   ├── route.ts          # GET list, POST create
│       │   └── [id]/
│       │       ├── route.ts      # PATCH update, DELETE soft-delete
│       │       └── bundle/
│       │           └── route.ts  # GET retrieve, POST save bundle
│       ├── export/
│       │   └── [id]/
│       │       └── route.ts      # GET: generate + stream ZIP
│       └── share/
│           └── route.ts          # POST: create share token
│
├── components/                   # shadcn/ui + custom components
│   ├── ui/                       # shadcn/ui primitives
│   ├── interview/
│   │   ├── ChatPanel.tsx         # Conversation thread
│   │   ├── PreviewPanel.tsx      # Live documentation preview
│   │   ├── DomainProgress.tsx    # 10-domain progress indicator
│   │   └── StreamingMessage.tsx  # Token-streaming message bubble
│   ├── review/
│   │   ├── BundleEditor.tsx      # Split-pane markdown editor
│   │   ├── FileTab.tsx           # Per-file tab component
│   │   └── ExportButton.tsx      # ZIP export trigger
│   ├── dashboard/
│   │   ├── ProjectCard.tsx       # Project list item
│   │   └── EmptyState.tsx        # New user empty dashboard
│   └── onboarding/
│       ├── ApiKeyInput.tsx       # Key entry + validation
│       └── ProjectTypeSelect.tsx # Template / type picker
│
├── lib/
│   ├── supabase/
│   │   ├── client.ts             # Browser Supabase client
│   │   └── server.ts             # Server Supabase client (API routes)
│   ├── anthropic/
│   │   ├── client.ts             # BYOK Anthropic client factory
│   │   ├── streaming.ts          # Stream handling utilities
│   │   └── validation.ts         # API key format + test call validation
│   ├── interview/
│   │   ├── store.ts              # Zustand interview state machine
│   │   ├── domains.ts            # Domain definitions + ordering
│   │   └── completion.ts         # Domain completion detection
│   ├── export/
│   │   ├── zip.ts                # JSZip bundle builder
│   │   └── readme.ts             # Auto-generated README.md builder
│   ├── analytics/
│   │   └── events.ts             # PostHog event tracking wrappers
│   └── utils/
│       ├── markdown.ts           # Markdown sanitisation utilities
│       └── rls.ts                # RLS policy test helpers
│
├── store/
│   └── interview.ts              # Zustand store definition
│
├── middleware.ts                 # Vercel Edge: auth guard + rate limiting
│
├── tests/
│   ├── unit/
│   │   ├── anthropic/            # Key validation, streaming utils
│   │   ├── interview/            # State machine branching logic
│   │   ├── export/               # ZIP generation, README builder
│   │   └── rls/                  # RLS policy assertions
│   ├── integration/
│   │   ├── projects.test.ts      # Project CRUD via API routes
│   │   ├── bundles.test.ts       # Bundle save + retrieve
│   │   ├── share.test.ts         # Share link + read-only access
│   │   └── auth.test.ts          # Registration + login flow
│   └── e2e/
│       ├── happy-path.spec.ts    # Full registration → export flow
│       ├── byok-failure.spec.ts  # Invalid key + quota error flows
│       └── resume.spec.ts        # Close + resume interview
│
├── supabase/
│   └── migrations/
│       ├── 001_create_profiles.sql
│       ├── 002_create_projects.sql
│       ├── 003_create_bundles.sql
│       └── 004_rls_policies.sql
│
├── .env.example                  # All required env vars documented
├── CLAUDE.md                     # AI agent rules (this project)
├── memory/constitution.md        # Project governing principles
└── BACKLOG.md                    # Post-MVP ideas (not to be implemented during MVP)
```

**Structure Decision**: Web application layout (Next.js monorepo). No separate backend process —
server-side logic lives exclusively in `app/api/` routes. AI calls are all client-side.
Database migrations in `supabase/migrations/` applied via Supabase CLI.

---

## Phase 0: Research Notes

### System Prompt Architecture
The master system prompt (`DEVDOCS_SYSTEM_PROMPT`) is the core IP. It must:
- Define a senior developer persona with 10+ years experience and direct, opinionated style
- Encode the complete 10-domain decision tree with branching logic
- Include a recommendation engine: for each domain, surface the recommended choice
  based on project type, team size, budget, and scale constraints
- Specify exact markdown output format for each of the 10 documentation files
- Be validated against 5 project archetypes before beta (see CLAUDE.md)

The system prompt is injected via `/api/session/init` — a lightweight server route that
reads the env var and returns it in a session token. The client uses this token to initialise
the Anthropic SDK conversation. The prompt itself never appears in the client bundle.

### Interview State Machine
Each interview has 10 domains. The state machine tracks:
- `currentDomain: DomainId` — which domain is active
- `completedDomains: DomainId[]` — which domains are done
- `domainContent: Record<DomainId, string>` — generated content per domain
- `conversationHistory: Message[]` — full chat history
- `status: 'idle' | 'interviewing' | 'complete'`

Domain completion is detected when the AI signals it (via a structured completion token in
the system prompt output format). On detection, the corresponding bundle section populates.
The full state is serialised to `interview_data` JSONB on Supabase on every domain completion.

### Streaming Implementation
Anthropic SDK streaming via `anthropic.messages.stream()`. Tokens are yielded via a
`ReadableStream` and consumed by the `ChatPanel` component using `useEffect` + `useState`.
The streaming message bubble shows tokens as they arrive. Stream errors are caught and
surface a retry option.

### ZIP Export
JSZip generates the bundle client-side from the `DocumentationBundle.files` JSONB. The
auto-generated `docs/README.md` is constructed in `lib/export/readme.ts` from the project
name, completion date, and a one-line description per file. All files are placed under a
`docs/` directory path within the ZIP.

---

## Phase 1: Design Artefacts

See:
- `specs/001-devdocs-ai-mvp/data-model.md` — full schema + RLS policies
- `specs/001-devdocs-ai-mvp/contracts/` — all API route contracts

---

## Environment Variables

| Variable | Purpose | Scope |
|----------|---------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | All environments |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase public anon key | All environments |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role (API routes) | Server-side only |
| `DEVDOCS_SYSTEM_PROMPT` | Master AI interview system prompt | Server-side only |
| `SENTRY_DSN` | Sentry error tracking | Staging + Production |
| `NEXT_PUBLIC_POSTHOG_KEY` | PostHog analytics | Production only |
| `STRIPE_SECRET_KEY` | Stripe payments | Phase 4 only |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook validation | Phase 4 only |

**Rule**: All secrets use Vercel encrypted environment variables. `.env.example` documents
all variables with descriptions. `.env.local` is gitignored. Never commit secrets.
