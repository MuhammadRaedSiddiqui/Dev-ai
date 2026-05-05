# DevDocs AI — Project Documentation | v1.0 | Confidential

**DevDocs AI**

Complete Project Documentation

*AI-Powered Pre-Build Planning Assistant for Developers*

| Version **1.0 — Initial** | Approach **BYOK — Free Tier** |
| --- | --- |
| Target User **Junior Developers** | MVP Timeline **4—6 Weeks** |

Prepared: April 2026 | Status: Pre-Development | Classification: Confidential

---

# 1. Executive Summary

DevDocs AI is a conversational, AI-powered pre-build planning assistant designed specifically for developers — particularly junior and mid-level developers working in the agentic development era. The tool interviews developers about their project before a single line of code is written, surfaces every critical architectural and technical decision, and generates a complete documentation bundle that can be fed directly into AI coding agents such as Claude Code, Cursor, and Windsurf.

The problem DevDocs AI solves is well-documented: agentic coding tools waste enormous amounts of time and tokens when context is missing or decisions are left unresolved. Junior developers in particular skip critical planning steps — not because they are lazy, but because they do not yet know what they do not know. DevDocs AI acts as the senior developer they do not have access to, asking the right questions and producing the complete decision record before development begins.

> **Market Opportunity** No existing tool combines developer-first pre-build planning with AI-guided decision interviews and structured output for coding agents. Post-code documentation tools (DocuWriter.ai, Mintlify, Workik) solve the wrong half of the problem. PRD generators (Miro, Chisel, ChatPRD) are product-manager-first and do not cover architectural, schema, API, environment, or testing decisions. The gap is real and unoccupied.

## 1.1 Core Value Proposition

DevDocs AI converts a junior developer's rough project idea into a professional-grade documentation bundle in under 30 minutes, covering every decision that would otherwise be discovered the hard way mid-build. The output is structured markdown that any AI coding agent can consume as context, eliminating the token waste caused by undocumented architecture.

The BYOK (Bring Your Own Key) model eliminates API subscription costs during the validation and early growth phases entirely. Users supply their own Anthropic API key; DevDocs AI provides the intelligence layer — the structured interview logic, templates, and documentation generation — at zero marginal cost to the operator.

## 1.2 Strategic Positioning

| **Dimension** | **Position** |
| --- | --- |
| Category | Developer pre-build planning assistant |
| Primary user | Junior and mid-level developers, solo founders, bootcamp graduates |
| Secondary user | Small dev teams and agentic workflow users |
| Core problem | Missing or incomplete project planning causing rework, token waste, and broken builds |
| Core output | Structured markdown documentation bundle for AI coding agent consumption |
| Revenue model | Free with BYOK → Paid hosted tier → Team plan |
| Build approach | Lean MVP, validate before scaling |
| Biggest risk | Distribution — developers must feel the pain before first build, not after |

---

# 2. Problem Statement

Agentic development has changed how software is built. Developers now rely on AI coding agents (Claude Code, Cursor, Windsurf, GitHub Copilot) to write significant portions of their codebase. These tools work well when given rich context and clear architectural decisions. They fail — expensively — when the planning layer is absent.

## 2.1 The Three-Layer Pain

### Layer 1 — Planning and Documentation

Creating a complete project plan before development is the most exhausting and token-consuming part of agentic development. Developers must decide architecture, database choice, tech stack, deployment strategy, file structure, API design, testing approach, error handling, monitoring, and scalability — before writing code. Missing any one of these decisions causes rework that costs 3-10x the original planning time. Junior developers are most vulnerable because they do not know the complete decision checklist exists.

### Layer 2 — Backend

Ninety percent of errors and mishaps in agentic development originate in the backend layer. Schema design mistakes, authentication misconfigurations, missing migrations, absent rate limiting, poor error handling, and zero observability are all decisions that should have been documented before development began. An AI coding agent given an incomplete architecture brief will make plausible-but-wrong decisions that compound into structural problems.

### Layer 3 — Frontend

The most time-consuming visible part of development is UI that looks AI-generated. Decisions about design systems, component architecture, state management patterns, performance budgets, accessibility standards, and SEO strategy all need to be made before the first component is written. Without a documented design system, junior developers produce inconsistent UIs that require complete rebuilds.

## 2.2 Why Existing Tools Fail

The current tool landscape addresses documentation in two ways, both of which solve the wrong problem:

- Post-code documentation tools (DocuWriter.ai, Mintlify, Workik, GitBook) scan existing codebases and generate docs after the code is written. They are useful for maintenance, but they cannot prevent the architectural mistakes that occur during initial development.

- Pre-development PRD generators (Miro AI, Chisel, ChatPRD, QuillBot PRD) are designed for product managers. They generate user stories and feature requirements. They do not cover database schema design, API contract specification, environment strategy, authentication architecture, testing plans, or deployment decisions — the decisions that actually determine whether a codebase is healthy.

> **The Core Gap** No tool currently conducts a developer-first pre-build interview that surfaces every critical technical decision, recommends architecture based on constraints, and produces structured output optimised for AI coding agent consumption. That is the exact product DevDocs AI builds.

---

# 3. Product Definition

## 3.1 What DevDocs AI Does

DevDocs AI is a web application with an optional VS Code extension. The core experience is a structured, conversational interview that a developer completes before starting any development work. The AI asks targeted questions about the project, processes the answers using a senior-developer reasoning system, and generates a complete documentation bundle.

The documentation bundle is a set of structured markdown files designed to be added to the root of a project repository and read by any AI coding agent as project context. With this context present, the coding agent begins development with full architectural knowledge, eliminating the trial-and-error that consumes most of the tokens in an agentic session.

## 3.2 The Documentation Bundle Output

Every completed DevDocs AI session produces the following files:

| File | Contents |
| --- | --- |
| PLANNING.md | Project scope, MVP definition, out-of-scope items, success metrics, timeline, budget assumptions |
| ARCHITECTURE.md | Architecture decision record (ADR), tech stack with justifications, system diagram description, component responsibilities |
| DATABASE.md | Database choice with justification, full schema design, migration strategy, indexing plan, soft delete policy |
| API-CONTRACTS.md | OpenAPI-style endpoint definitions, request/response shapes, versioning strategy, authentication requirements per route |
| ENV-STRATEGY.md | Environment list (local/staging/prod), secrets management approach, .env structure, CI/CD gate definitions |
| AUTH.md | AuthN vs AuthZ architecture, provider choice, session strategy, token storage, RBAC model |
| TESTING.md | Testing pyramid breakdown, tool choices, test database strategy, coverage targets, CI integration |
| MONITORING.md | Four golden signals implementation, alert thresholds, logging structure, error tracking, health check endpoints |
| FRONTEND.md | Design token definitions, component architecture, state management pattern, performance budget, a11y targets, SEO strategy |
| DEPLOYMENT.md | Hosting platform choice, deployment method, environment promotion workflow, rollback strategy, scaling triggers |

## 3.3 The Interview Flow

The AI interview follows a structured branching logic. Early answers determine which follow-up questions are asked. The interview takes approximately 15-30 minutes for a typical project and is designed to feel like a conversation with a senior developer, not a form.

- Project type and scope — what are you building, for whom, and by when?
- Team and budget constraints — solo or team, commercial or personal, budget range?
- Scale assumptions — expected users at launch, 3 months, 1 year?
- Tech familiarity — which parts of the stack are you comfortable with?
- Architecture recommendations — based on above, AI recommends architecture with justification
- Database design session — schema walkthrough, indexing decisions, migration strategy
- API contract definition — endpoint listing, authentication strategy, versioning
- Environment and secrets strategy — deployment targets, CI/CD requirements
- Frontend approach — framework choice, design system setup, performance targets
- Testing and monitoring plan — tool selection, coverage targets, observability setup

> **Key Differentiator** The interview is opinionated, not neutral. For a solo founder with a 3-month deadline and moderate backend experience, the system recommends a monolith over microservices and explains why. For a team with a scaling product, it recommends different choices. The AI acts as a senior developer thinking partner, not a documentation formatter.

## 3.4 BYOK Architecture

DevDocs AI uses a Bring Your Own Key (BYOK) model for all AI functionality. Users enter their Anthropic API key in the application settings. All API calls are made client-side, directly from the user's browser to the Anthropic API. The key is stored in the browser's localStorage and is never transmitted to DevDocs AI servers.

This architecture has several strategic advantages for the early stage:

- Zero API costs for the operator — users pay for their own AI usage
- Self-selecting user base — users who obtain an API key are serious and engaged
- Full product available free during validation — no artificial feature gates needed
- Clear path to hosted tier — offer key management as a paid convenience feature later

> **Security Commitment** User API keys are stored exclusively in the user's own browser localStorage. They are never sent to DevDocs AI servers, never logged, and never used for any purpose other than making Anthropic API calls on the user's behalf. This is stated explicitly in the UI and in the privacy policy.

---

# 4. Technical Architecture

## 4.1 Architecture Decision Record

This section documents the architectural decisions for DevDocs AI itself, following the ADR format that the product teaches developers to use.

### ADR-001: Frontend Framework

| Decision | Next.js 14 with App Router |
| --- | --- |
| Alternatives considered | Remix, SvelteKit, plain React + Vite |
| Rationale | Next.js provides SSR for SEO on marketing pages, CSR for the app itself, file-based routing, and a mature ecosystem. App Router gives React Server Components for initial page loads. The team is likely already familiar with React. |
| Trade-offs | Heavier than Remix or SvelteKit. App Router has a learning curve. Acceptable given ecosystem maturity and hiring pool. |
| Consequences | All pages under /app/* use App Router. Marketing pages under / use SSG. API routes in /api/* handle server-side operations that do not involve the Anthropic API. |

### ADR-002: Database

| Decision | Supabase (PostgreSQL) |
| --- | --- |
| Alternatives considered | PlanetScale, Neon, self-hosted PostgreSQL, MongoDB |
| Rationale | Supabase provides PostgreSQL, authentication, real-time, and storage in a single managed service with a generous free tier. Built-in row-level security eliminates an entire category of auth bugs. Supabase Auth handles the user management layer out of the box. |
| Trade-offs | Vendor dependency. Free tier has row and storage limits. Acceptable at the scale DevDocs AI will operate during validation. |
| Consequences | All user data, project sessions, and documentation bundles stored in Supabase PostgreSQL. Supabase Auth used for all user management. |

### ADR-003: AI Integration

| Decision | Client-side Anthropic SDK with BYOK, claude-sonnet-4-6 model |
| --- | --- |
| Alternatives considered | Server-side proxy with operator key, OpenAI, Google Gemini |
| Rationale | BYOK eliminates API cost risk entirely during validation. Client-side calls mean zero backend infrastructure required for AI features. Claude Sonnet 4.6 provides the best multi-turn reasoning quality for technical interviews at competitive pricing. |
| Trade-offs | Users must obtain and manage their own API key. Adds friction to onboarding. Mitigated by clear setup instructions and a 5-minute key setup guide. |
| Consequences | No server-side AI infrastructure. Anthropic API key stored in browser localStorage. All interview logic runs client-side. |

### ADR-004: Deployment

| Decision | Vercel for web app, Supabase managed for database |
| --- | --- |
| Alternatives considered | Netlify, Railway, Render, AWS Amplify |
| Rationale | Vercel is the natural deployment target for Next.js with zero-config deployments, automatic preview environments per PR, and a free hobby tier. Supabase is self-managing. Together, zero infrastructure maintenance during early stage. |
| Trade-offs | Vercel hobby tier has function timeout limits. Acceptable since no long-running server functions are needed (AI calls are client-side). |
| Consequences | git push to main triggers production deployment. PRs get preview deployments automatically. |

## 4.2 System Architecture Diagram Description

The DevDocs AI system has three logical layers:

- **Client Layer** — Next.js application running in the user's browser. Contains all interview UI, documentation editor, and export functionality. Makes direct calls to the Anthropic API using the user's BYOK key. Communicates with the Supabase backend for session persistence and user management.

- **Backend Layer** — Supabase project providing PostgreSQL database, row-level security, authentication, and real-time subscriptions. Handles user accounts, saved project sessions, and shared documentation. No custom server-side application logic in the MVP.

- **AI Layer** — Anthropic API accessed directly from the client. The system prompt encodes the senior developer interview logic, recommendation engine, and documentation formatting rules. claude-sonnet-4-6 used for all completions.

## 4.3 Database Schema

### Users Table

Managed by Supabase Auth. Extended with a profiles table for app-specific user data.

| **Column** | **Type / Constraint** | **Description** |
| --- | --- | --- |
| id | uuid, PK | Supabase Auth user ID |
| display_name | text | User's chosen display name |
| api_key_hash | text, nullable | SHA-256 hash of API key for verification (key itself never stored server-side) |
| plan | text, default 'free' | Subscription tier: free, pro, team |
| created_at | timestamptz | Account creation timestamp |
| updated_at | timestamptz | Last profile update |

### Projects Table

| **Column** | **Type / Constraint** | **Description** |
| --- | --- | --- |
| id | uuid, PK | Project identifier |
| user_id | uuid, FK → profiles.id | Owning user |
| name | text, not null | Project display name |
| status | text, default 'in_progress' | in_progress, complete, archived |
| project_type | text | saas, api, internal_tool, mobile, other |
| interview_data | jsonb | Full interview Q&A stored as JSON |
| created_at | timestamptz | Project creation timestamp |
| updated_at | timestamptz | Last modification timestamp |
| deleted_at | timestamptz, nullable | Soft delete timestamp |

### Documentation Bundles Table

| **Column** | **Type / Constraint** | **Description** |
| --- | --- | --- |
| id | uuid, PK | Bundle identifier |
| project_id | uuid, FK → projects.id | Parent project |
| version | integer, default 1 | Bundle version number |
| files | jsonb | Object keyed by filename, value is markdown content |
| generated_at | timestamptz | Generation timestamp |
| model_used | text | AI model used for generation |

All tables include Row Level Security (RLS) policies ensuring users can only read and write their own data. The deleted_at column on projects enables soft deletes — no project data is permanently deleted until the user explicitly purges it.

## 4.4 API Routes

Since AI calls are client-side, server-side API routes are minimal. The following routes exist in Next.js /api/:

| **Route** | **Purpose** | **Methods** |
| --- | --- | --- |
| /api/auth/* | Supabase Auth callbacks | GET / POST |
| /api/projects | List, create, update, delete projects | GET / POST / PATCH / DELETE |
| /api/projects/[id]/bundle | Save or retrieve documentation bundle | GET / POST |
| /api/export/[id] | Generate ZIP download of documentation bundle | GET |
| /api/share/[id] | Create shareable read-only project link | POST |

## 4.5 AI System Prompt Architecture

The AI interview is controlled by a master system prompt that encodes the senior developer persona and the complete decision framework. The system prompt is the core intellectual property of DevDocs AI. It is structured in four parts:

- **Persona definition** — instructs the model to behave as a senior developer with 10+ years experience, direct communication style, and opinionated recommendations based on constraints
- **Interview protocol** — the complete decision tree, branching logic, and question ordering for all 10 documentation domains
- **Recommendation engine** — heuristics for recommending architecture, database, auth, and deployment options based on project type, team size, budget, and scale assumptions
- **Output format specification** — strict markdown format for each of the 10 documentation files, with required sections, heading hierarchy, and example content

> **IP Protection Note** The system prompt is the primary competitive moat of DevDocs AI. It should be treated as a trade secret. It is served from the server side as part of each API call setup, never exposed to the client. Users supply the API key; the server supplies the system prompt in a lightweight backend function.

---

# 5. Product Features (MVP)

The MVP contains the minimum feature set required to validate the core hypothesis: that developers will use an AI planning interview before starting a project, and that the output improves their development experience.

## 5.1 Feature List — MVP

| **Feature** | **Description** | **Priority** |
| --- | --- | --- |
| AI Planning Interview | Core 10-domain structured interview with branching logic and opinionated recommendations | Must Have |
| BYOK API Key Setup | Secure browser-side key storage with validation and setup guide | Must Have |
| Documentation Bundle Generation | Auto-generation of all 10 markdown documentation files from interview data | Must Have |
| Bundle Editor | In-app markdown editor to review and edit each generated file before export | Must Have |
| ZIP Export | Download complete documentation bundle as a ZIP file for immediate repo use | Must Have |
| Project Dashboard | List of saved projects with status indicators and quick access to bundles | Must Have |
| User Authentication | Email/password and Google OAuth via Supabase Auth | Must Have |
| Project Templates | 5 starter templates: SaaS, API-only, Internal Tool, Mobile App, Landing Page | Should Have |
| Shareable Project Link | Read-only link to share a documentation bundle with a team member or client | Should Have |
| Regenerate Section | Re-run the AI for a single documentation file without redoing the full interview | Should Have |
| Copy to Clipboard | One-click copy of any documentation file for pasting into existing docs | Nice to Have |
| Dark Mode | Full dark mode support | Nice to Have |

## 5.2 Feature List — Post-MVP

These features are explicitly out of scope for the MVP. They will be considered once the core product is validated with paying users.

- VS Code extension — reads the documentation bundle from the workspace and surfaces context inline while coding
- MCP server — exposes the documentation bundle to Claude Code and other MCP-compatible agents as project context
- CLI tool — devdocs init to run the planning interview from the terminal before opening an IDE
- GitHub integration — auto-commit the documentation bundle to the repo on project completion
- Team collaboration — real-time multi-user editing of documentation bundles with role-based permissions
- Hosted tier — operator-managed API key so users do not need their own Anthropic account
- Documentation drift detection — compare a completed documentation bundle against actual codebase and flag discrepancies

---

# 6. Frontend Design System

## 6.1 Design Principles

DevDocs AI is a tool, not a consumer product. The UI should communicate competence, clarity, and trust. The target user is a developer — they will notice and respect a well-structured, minimal interface more than a polished consumer aesthetic. Aim for the quality level of Linear.app or Vercel Dashboard: clean, purposeful, dense information without clutter.

## 6.2 Design Tokens

| **Token** | **Value** |
| --- | --- |
| Primary font | Inter (self-hosted, subset to Latin only) |
| Monospace font | JetBrains Mono (for code and documentation preview) |
| Base font size | 15px body, 13px secondary, 12px labels |
| Line height | 1.6 body, 1.4 compact |
| Primary colour | #2563EB (Blue 600) |
| Background | #FFFFFF light / #0F172A dark |
| Surface | #F8FAFC light / #1E293B dark |
| Border | #E2E8F0 light / #334155 dark |
| Text primary | #0F172A light / #F1F5F9 dark |
| Text secondary | #64748B light / #94A3B8 dark |
| Success | #16A34A |
| Warning | #D97706 |
| Danger | #DC2626 |
| Border radius | 6px components, 8px cards, 12px modals |
| Shadow | 0 1px 3px rgba(0,0,0,0.1) cards, 0 4px 12px rgba(0,0,0,0.15) elevated |

## 6.3 Key Screens

### Onboarding / Key Setup Screen

First screen new users see after email verification. Contains: a clear explanation of BYOK and why the key never leaves their browser; a link to the Anthropic API key creation page; an input field with key format validation; and a 'Verify Key' button that makes a test API call. Progress indicator shows step 1 of 2 (key setup, then start first project).

### Interview Screen

The main product experience. Left panel: conversation thread between the user and the AI interviewer. Right panel: live preview of the documentation bundle being built, updating as answers are processed. Each domain (Planning, Architecture, Database...) is represented as a section that fills in as the interview progresses. A progress indicator at the top shows completion percentage across all 10 domains.

### Documentation Review Screen

After the interview completes, the user reviews the generated bundle. Tab navigation for each of the 10 files. Each file displayed in a split-pane: rendered markdown preview on the left, editable raw markdown on the right. Regenerate button per file. Export ZIP button in the top-right corner. Share link button for read-only access.

### Project Dashboard

List view of all user projects. Each project card shows: project name, type badge, status (in progress / complete), last modified date, and quick actions (open, share, delete). Empty state includes a strong CTA to start the first project with a clear explanation of what it produces.

## 6.4 Accessibility Requirements

- WCAG 2.1 AA compliance across all screens
- Full keyboard navigation — all interactive elements reachable via Tab, activated via Enter/Space
- Screen reader compatible — all form inputs labelled, all icons have aria-label, all status changes announced via aria-live
- Colour contrast minimum 4.5:1 for all body text, 3:1 for large text and UI components
- Focus indicators visible on all interactive elements
- No auto-playing media or animations that cannot be paused

---

# 7. Build Plan

The project is structured in four phases. Phases 1 and 2 constitute the MVP. Phases 3 and 4 are post-validation growth features. Each phase has defined deliverables and a go/no-go criterion before proceeding.

## Phase 1: Foundation | Weeks 1–2

**Goal:** Working application skeleton with authentication, BYOK setup, and basic project creation.

**Deliverables:** Next.js project with App Router. Supabase project configured with schema, RLS policies, and Auth. BYOK key setup screen with validation. User registration and login (email + Google OAuth). Basic project dashboard (create, list, delete projects). Vercel deployment with preview environments.

**Tech tasks:** npm create next-app, install shadcn/ui and Tailwind. Configure Supabase client. Write and apply all database migrations. Implement RLS policies. Configure Supabase Auth with Google provider. Build BYOK setup flow with client-side key storage and validation. Deploy to Vercel.

**Go / No-Go:** A user can register, enter their API key, and see an empty project dashboard. The API key validation test call succeeds.

## Phase 2: Core Product — Interview & Bundle | Weeks 3–5

**Goal:** Complete end-to-end flow from interview through documentation bundle generation and export.

**Deliverables:** AI interview chat interface with streaming responses. Full 10-domain system prompt. Live documentation bundle preview panel. Bundle editor with per-file markdown editing. ZIP export. Share link generation. Project templates (5 types). Regenerate section functionality.

**Tech tasks:** Implement Anthropic SDK client-side with streaming. Build conversation state machine for interview branching logic. Write master system prompt and validate against 20 test projects. Build split-pane documentation editor. Implement ZIP generation using JSZip. Build share link with read-only Supabase RLS policy. Add project templates as seed data.

**Go / No-Go:** A developer completes the full interview for a real project, generates a documentation bundle, edits two files, and exports the ZIP. Time to completion under 30 minutes. Output passes review by 3 external developers.

## Phase 3: Polish & Distribution | Weeks 6–8

**Goal:** Public launch readiness. Performance, SEO, error handling, onboarding, and feedback loop.

**Deliverables:** Landing page with strong SEO. Onboarding tutorial for first-time users. Error handling for API key issues, quota exhaustion, and network failures. Loading states and skeleton screens throughout. Lighthouse score above 90 on all Core Web Vitals. Analytics integration. Feedback widget. Dark mode.

**Tech tasks:** Build marketing landing page with SSG. Add structured data (JSON-LD). Configure Sentry for error tracking. Add Posthog for product analytics. Implement all loading/error/empty states. Performance audit and bundle optimisation. Accessibility audit with axe DevTools.

**Go / No-Go:** Lighthouse score above 90 on performance, accessibility, best practices, SEO. Zero critical accessibility violations. All error states handled gracefully.

## Phase 4: Monetisation & Growth | Weeks 9–12

**Goal:** Paid tier launch and VS Code extension beta.

**Deliverables:** Stripe integration for Pro plan ($12/month). Hosted tier (operator API key, no BYOK required for Pro users). VS Code extension beta (reads bundle from workspace). CLI tool beta (devdocs init). Team plan with shared projects. Usage analytics dashboard for users.

**Tech tasks:** Integrate Stripe with Supabase webhooks for subscription management. Build operator key management system. Develop VS Code extension with Extension API. Build CLI with Node.js. Implement team invitations and shared project permissions.

**Go / No-Go:** First paid subscriber within 2 weeks of Pro tier launch. 10 VS Code extension installs within first month.

---

# 8. Testing Strategy

## 8.1 Testing Philosophy

DevDocs AI follows the 70/20/10 testing pyramid. The majority of tests are fast, isolated unit tests. A smaller number of integration tests verify that the system components work together correctly. A small suite of end-to-end tests covers the critical user paths that, if broken, would prevent a user from getting value from the product.

## 8.2 Unit Testing

All utility functions, state management logic, and pure components are unit tested using Vitest. Target coverage: 80% of all utility functions and state management code.

- Interview state machine — test all branching logic transitions with representative inputs
- Documentation generation utilities — test markdown formatting, section assembly, and token counting
- API key validation — test format validation, successful call, quota exceeded, invalid key error states
- Export utilities — test ZIP generation with mock documentation bundle data
- RLS policy validation — test that users cannot read other users' projects via direct Supabase queries

## 8.3 Integration Testing

Integration tests verify that the Next.js API routes, Supabase database, and client-side state work together correctly. Using Playwright component tests and Supabase test project.

- Project CRUD — create, read, update, delete projects via API routes with authenticated user context
- Bundle save and retrieve — save a documentation bundle and retrieve it with correct structure
- Share link — create share link, access via unauthenticated request, verify read-only access
- Authentication flow — register, verify email, login, logout, Google OAuth callback

## 8.4 End-to-End Testing

E2E tests use Playwright and run against a staging environment connected to a dedicated test Supabase project. These tests cover the complete critical user paths.

- Happy path — register, set up API key, complete full interview, generate bundle, edit one file, export ZIP
- BYOK failure path — invalid API key entered, error state shown, user corrected and retried
- Quota exceeded path — API key with zero quota, quota exceeded error handled gracefully
- Resume interview — start interview, close browser, reopen, interview resumes from last point

## 8.5 CI/CD Testing Gate

All tests run automatically via GitHub Actions on every pull request. The following gates must pass before merge is permitted:

- All unit tests passing
- All integration tests passing
- TypeScript compilation with zero errors
- ESLint with zero errors
- Lighthouse CI score above 85 on all categories
- No new critical or serious axe accessibility violations

---

# 9. Security

## 9.1 API Key Security

The BYOK architecture requires explicit guarantees about how user API keys are handled. These guarantees must be technically enforced, not just stated in a privacy policy.

- Keys stored exclusively in the user's browser localStorage — never in a cookie, never in a URL parameter
- All Anthropic API calls made client-side — the key never traverses DevDocs AI servers
- Content Security Policy configured to restrict which origins JavaScript can make requests to — only anthropic.com and supabase.co are whitelisted
- No server-side logging of request headers that could capture a key accidentally
- Key validation is done via a minimal test API call — the key itself is not sent to DevDocs AI for validation

## 9.2 Data Security

- All Supabase tables protected by Row Level Security policies — enforced at the database layer, not just application layer
- All data encrypted in transit via TLS 1.3
- All data encrypted at rest via Supabase's default AES-256 encryption
- No PII beyond email address collected in MVP — display name is optional
- Share links provide read-only access enforced by RLS — shared users cannot modify documents
- Soft deletes used for all user data — hard purge only on explicit user request

## 9.3 Application Security

- All user inputs sanitised before storage — no raw HTML stored in the database
- CSRF protection via Supabase Auth's built-in CSRF tokens
- Rate limiting on all API routes via Vercel Edge Middleware — 100 requests per minute per IP
- Dependency audit on every CI run via npm audit — critical vulnerabilities block deployment
- No secrets in client-side code — system prompt served from server function, never exposed to browser

---

# 10. Monitoring & Observability

## 10.1 The Four Golden Signals

| **Signal** | **Implementation** |
| --- | --- |
| Latency | P50 and P95 response times for API routes. Alert if P95 exceeds 3 seconds. AI streaming responses excluded from latency SLO — streaming is expected to take 10-30 seconds. |
| Traffic | Requests per minute per route. Tracked via Vercel Analytics. Baseline established in first 2 weeks post-launch. |
| Errors | 5xx error rate per route. Alert if error rate exceeds 1% over 5 minutes. All errors reported to Sentry with full context. |
| Saturation | Supabase connection pool utilisation. Alert at 80% utilisation. Monitor free tier row count approaching limits. |

## 10.2 Product Analytics

Posthog used for product analytics with privacy-preserving configuration (no IP tracking, no cross-site tracking). Key events tracked:

- api_key_configured — user successfully sets up their Anthropic key
- interview_started — user begins a planning interview
- interview_completed — user completes all interview domains
- bundle_generated — documentation bundle successfully generated
- bundle_exported — user downloads the ZIP export
- bundle_shared — user creates a share link
- section_regenerated — user regenerates a single documentation section

The primary activation metric is bundle_exported: a user who downloads their documentation bundle has received value from the product. All funnel analysis tracks conversion from interview_started to bundle_exported.

## 10.3 Error Tracking

Sentry configured with the following settings:

- Source maps uploaded on every Vercel deployment for readable stack traces
- User context attached to all errors (user ID only, no email)
- API errors from Anthropic (quota exceeded, invalid key, rate limit) caught and reported as warning-level, not error-level, since these are expected user configuration issues
- Replay sessions enabled for errors — allows seeing exactly what the user did before the error occurred

---

# 11. Deployment Strategy

## 11.1 Environment Setup

| **Environment** | **URL** | **Purpose** |
| --- | --- | --- |
| Local | localhost:3000 | Developer machines. .env.local file. Connects to dedicated dev Supabase project. |
| Preview | *.vercel.app | Auto-deployed per PR. Connects to staging Supabase project. Used for QA and design review. |
| Staging | staging.devdocs.ai | Promoted from main branch after PR merge. Full E2E tests run here before production promotion. |
| Production | app.devdocs.ai | Manual promotion from staging after E2E gate passes. Zero-downtime deployments via Vercel. |

## 11.2 Deployment Pipeline

- Developer opens PR — preview environment auto-deployed, unit and integration tests run
- PR approved and merged to main — staging environment updated
- Automated E2E test suite runs against staging
- If E2E passes — manual production promotion via Vercel dashboard (one click)
- If E2E fails — notification sent, deployment blocked, bug fix required

## 11.3 Environment Variables

The following environment variables must be configured in each environment. All secrets managed via Vercel's encrypted environment variables. Never committed to version control.

| **Variable** | **Purpose** | **Scope** |
| --- | --- | --- |
| NEXT_PUBLIC_SUPABASE_URL | Supabase project URL | All environments |
| NEXT_PUBLIC_SUPABASE_ANON_KEY | Supabase public anon key | All environments |
| SUPABASE_SERVICE_ROLE_KEY | Supabase service role key | Server-side only |
| DEVDOCS_SYSTEM_PROMPT | Master AI interview system prompt | Server-side only |
| SENTRY_DSN | Sentry error tracking endpoint | Staging + Production |
| NEXT_PUBLIC_POSTHOG_KEY | PostHog analytics key | Production only |
| STRIPE_SECRET_KEY | Stripe payments (Phase 4) | Server-side only |
| STRIPE_WEBHOOK_SECRET | Stripe webhook validation (Phase 4) | Server-side only |

## 11.4 Rollback Strategy

Vercel maintains deployment history. Rollback to any previous deployment is possible in under 60 seconds via the Vercel dashboard. Supabase database migrations are written to be non-destructive — columns are added, never dropped in production without a deprecation period. If a migration causes issues, the application is rolled back first, then the migration is reversed in the next deployment.

---

# 12. Monetisation Strategy

## 12.1 Pricing Tiers

| **Tier** | **Price** | **Includes** |
| --- | --- | --- |
| Free (BYOK) | $0 forever | 3 projects, all 10 documentation domains, all templates, ZIP export, share links. User supplies their own Anthropic API key. |
| Pro | $12/month | Unlimited projects, hosted tier (no API key needed), priority AI processing, project versioning, PDF export, email support. |
| Team | $35/seat/month | Everything in Pro + team workspaces, shared projects, admin dashboard, SSO, audit logs, dedicated support. |

## 12.2 BYOK to Hosted Conversion Path

The free BYOK tier serves two strategic purposes: it eliminates operator cost during validation, and it provides a natural conversion trigger. Users who regularly use DevDocs AI will accumulate Anthropic API costs on their personal key. When those costs exceed $12/month, Pro becomes economically rational. The hosted tier is positioned as convenience and simplicity, not as a capability gate.

> **Pricing Philosophy** Never gate the core value of the product behind a paywall. The free BYOK tier should be genuinely useful and complete. Pro users pay for convenience (hosted key), capacity (unlimited projects), and productivity features (versioning, PDF export). This builds trust and drives word-of-mouth from satisfied free users.

## 12.3 Revenue Projections

Conservative projections based on a 3% free-to-paid conversion rate at 6 months post-launch:

| **Milestone** | **Target** | **MRR Range** |
| --- | --- | --- |
| Month 1–2 | 0 paying users | Validation phase. Free with BYOK only. Focus on 100 active users. |
| Month 3 | 15–30 Pro users | $180–360 MRR. Pro tier launched. Strong product-market fit signal required. |
| Month 6 | 80–150 Pro users | $960–1,800 MRR. First Team plan customers. VS Code extension driving discovery. |
| Month 12 | 300–600 Pro users | $3,600–7,200 MRR. Mix of Pro and Team. Possible enterprise inquiries. |

---

# 13. Go-to-Market Strategy

## 13.1 Target Customer Profile

**Primary:** Junior and mid-level developers (0–3 years experience) who are actively building projects with AI coding assistants. They are likely learning through personal projects, bootcamp graduates, or early-career professionals at small companies. They feel the pain of broken builds caused by missing planning but do not have access to a senior developer mentor.

**Secondary:** Solo founders and indie hackers building SaaS products or tools. They are experienced enough to know they need documentation but too time-constrained to write it manually.

## 13.2 Distribution Channels

- VS Code Marketplace — the highest-leverage channel. Developers who install the extension will use the product inside their daily workflow. Target: listed in marketplace on Phase 3 launch.
- SEO content — articles targeting 'how to plan a SaaS project', 'architecture decision record template', 'how to structure a project for Claude Code'. These capture developers at the exact moment they are searching for what DevDocs AI provides.
- Developer communities — r/webdev, r/learnprogramming, Indie Hackers, Dev.to, Hacker News Show HN. Authentic product demos, not promotional posts.
- Twitter/X developer community — short-form content showing the before/after of a planning session. Target: developers building in public.
- YouTube tutorials — 'How to plan your SaaS project in 30 minutes with AI' format. High discovery potential for the target audience.

## 13.3 Launch Plan

- **Soft launch (Week 6)** — share with 20 developer contacts for private testing. Gather feedback. No public announcement.
- **Beta launch (Week 8)** — post in Indie Hackers, r/webdev, and on Twitter. Goal: 200 registered users in first week. Offer lifetime Pro access to first 50 users who provide detailed feedback.
- **Product Hunt launch (Week 10)** — coordinated Product Hunt listing after stabilising the product based on beta feedback. Target: Top 5 Product of the Day.
- **Content launch (Month 3)** — first SEO article published. Guest post on a developer newsletter (Bytes.dev, TLDR). VS Code extension listed.

## 13.4 Key Metrics to Track

| **Metric** | **Definition and Target** |
| --- | --- |
| Activation rate | % of registered users who complete one full interview and export a bundle. Target: above 40%. |
| Time to value | Minutes from registration to first bundle export. Target: under 30 minutes. |
| 7-day retention | % of users who return within 7 days of first session. Target: above 25%. |
| Free to paid conversion | % of active free users who upgrade to Pro within 60 days. Target: above 3%. |
| NPS score | Measured via in-app survey at 14 days post-activation. Target: above 40. |
| Word of mouth ratio | % of new users who came from referral. Target: above 20% by month 6. |

---

# 14. Risk Register

| **Risk** | **Severity** | **Mitigation** |
| --- | --- | --- |
| Pre-discovery adoption | HIGH | Developers only feel the pain of bad planning after a build fails. Getting them to use a planning tool BEFORE starting is the core distribution challenge. Mitigate: SEO targeting 'how to plan' searches, not 'how to document'. VS Code extension surfaced in-workflow. Compelling landing page that makes the pain visible. |
| BYOK friction | MEDIUM | Requiring an Anthropic API key adds onboarding friction. New users who do not already have a key will drop off. Mitigate: 5-minute setup guide with screenshots. Test the flow with 10 non-technical users before launch. Consider a very limited free hosted trial (10 interview messages) to reduce barrier. |
| System prompt quality | MEDIUM | The quality of the documentation output depends entirely on the system prompt. A weak system prompt produces generic docs that developers will not trust or use. Mitigate: test system prompt against 30 diverse project types before launch. Iterate based on feedback from first 50 users. Version-control the system prompt and A/B test improvements. |
| Competitor entry | MEDIUM | A well-funded competitor (Vercel, Linear, a16z-backed startup) could enter this space. Mitigate: the system prompt and decision tree are a genuine moat. Distribution through VS Code marketplace and SEO content creates a defensible position. Build community and brand loyalty before a larger player notices. |
| Anthropic pricing changes | LOW | If Anthropic raises API pricing significantly, BYOK users may reduce usage. Mitigate: the hosted tier absorbs this risk for paying customers. Free tier users bear their own API costs — pricing changes affect them directly but not the operator. |
| Scope creep during build | HIGH | The temptation to add features mid-build is the most likely cause of a delayed or failed MVP. Mitigate: hard MVP feature lock after Phase 1 kickoff. Any new ideas logged in a backlog, not acted upon until Phase 3. Weekly review against the scope definition in this document. |

---

# 15. Open Questions & Decisions Deferred

These questions are deliberately deferred until after MVP validation. They require real user data to answer correctly. Making these decisions before validation would be premature optimisation.

- What is the right free tier project limit? 3 projects may be too restrictive (users never experience the full value) or too generous (no reason to upgrade). To be validated with cohort data at month 3.
- Should the VS Code extension be Phase 3 or Phase 4? If early beta users strongly request it, pull forward. If usage patterns show users are satisfied with the web export, keep as Phase 4.
- Is the 10-file documentation bundle the right output format? Some users may want a single consolidated document instead of 10 files. Validate with first 50 users — offer toggle if split is clear.
- Should there be a free hosted trial (limited API calls) to reduce BYOK friction? Risk: cost. Benefit: lower onboarding drop-off. Decision: evaluate after first 2 weeks of beta data.
- What is the right monetisation moment? Prompting free users to upgrade too early kills trust. Too late and they never convert. Test the upgrade prompt timing with A/B experiments at month 3.
- Is $12/month the right Pro price? Comparable tools charge $15–30. If BYOK users are regularly spending more than $12/month on API costs, they will upgrade. Monitor average API spend per active user in months 2–3.

---

# 16. Appendices

## Appendix A: Competitor Summary

| **Tool** | **Category** | **Gap vs DevDocs AI** |
| --- | --- | --- |
| DocuWriter.ai | Post-code docs | Scans codebase, generates code comments and API refs. No pre-build planning. |
| Mintlify | Post-code docs | Beautiful public developer docs. Repo sync. No planning assistance. |
| Workik | Post-code docs | Auto-syncs docs with code changes. API and schema docs. No planning. |
| GitBook | Knowledge base | Collaborative docs with Git sync. AI focused on search. No planning. |
| Miro AI PRD | Pre-dev (PM) | PRD generation from whiteboard. Product-manager focused. Not developer decisions. |
| Chisel / ChatPRD | Pre-dev (PM) | AI-assisted PRDs. User stories and features. Not technical architecture. |
| devplan.com | Pre-dev (dev) | Closest competitor. Idea to PRD to build plan. Early stage, limited traction. |
| GTPlanner | Pre-dev (dev) | Open-source. Natural language to technical docs for Cursor/Windsurf. No hosted product. |

## Appendix B: Technology Stack Summary

| **Layer** | **Technology** |
| --- | --- |
| Frontend framework | Next.js 14 (App Router) |
| UI components | shadcn/ui + Tailwind CSS |
| AI SDK | Anthropic SDK (client-side, BYOK) |
| AI Model | claude-sonnet-4-6 |
| Database | Supabase (PostgreSQL) |
| Authentication | Supabase Auth (email + Google OAuth) |
| Hosting | Vercel |
| ZIP export | JSZip |
| Error tracking | Sentry |
| Product analytics | PostHog |
| Testing — unit | Vitest |
| Testing — e2e | Playwright |
| CI/CD | GitHub Actions + Vercel |
| Payments (Phase 4) | Stripe |
| Markdown editor | CodeMirror 6 with markdown mode |
| Markdown preview | react-markdown with remark plugins |

## Appendix C: Documentation Bundle File Structure

The following file structure is generated at the root of the user's project repository when they export the documentation bundle ZIP:

```
docs/
  PLANNING.md
  ARCHITECTURE.md
  DATABASE.md
  API-CONTRACTS.md
  ENV-STRATEGY.md
  AUTH.md
  TESTING.md
  MONITORING.md
  FRONTEND.md
  DEPLOYMENT.md
  README.md  (index linking to all files)
```

The README.md at the root of the docs/ directory is generated automatically and provides a one-paragraph summary of the project, a table linking to all 10 documentation files with a one-line description of each, and the completion date of the planning session. This is the file an AI coding agent should be directed to read first.

---

*End of Document*

*DevDocs AI | Page*
