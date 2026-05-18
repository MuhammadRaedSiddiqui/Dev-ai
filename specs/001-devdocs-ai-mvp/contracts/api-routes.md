# API Contracts: DevDocs AI MVP

**Branch**: `001-devdocs-ai-mvp` | **Date**: 2026-04-01

All routes under `/api/*` are Next.js App Router route handlers.
Authentication: Supabase session cookie on all routes unless marked `[PUBLIC]`.
Rate limiting: 100 req/min per IP via Vercel Edge Middleware on all routes.
Error format: `{ "error": "string", "code": "ERROR_CODE" }`

---

## POST /api/session/init

**Purpose**: Returns the system prompt session token. Called once per interview session
to retrieve the server-side system prompt. The actual Anthropic API call is made client-side.

**Auth**: Required (authenticated user)

**Request**: `POST /api/session/init`
```json
{ "projectId": "uuid" }
```

**Response 200**:
```json
{
  "systemPrompt": "You are a senior developer...",
  "model": "claude-sonnet-4-6",
  "projectType": "saas"
}
```

**Response 404**: Project not found or does not belong to user
**Response 401**: Not authenticated

**Notes**: `systemPrompt` is read from `DEVDOCS_SYSTEM_PROMPT` env var. It is NEVER cached
client-side or stored in localStorage. The client uses it to initialise the Anthropic SDK
conversation and discards it after the session ends.

**⚠️ Network transmission clarification**: The system prompt IS transmitted over the network
in this response body — from the DevDocs AI server to the user's browser. This is intentional
and unavoidable for client-side AI calls. The security guarantee is that it is transmitted
only to the authenticated owner of that session (enforced by Supabase auth check on this route),
and never stored client-side beyond the in-memory lifetime of that interview session. It is NOT
transmitted to Anthropic separately — it is sent as part of the normal Anthropic API request
payload from the client. Developers must not attempt to cache, log, or persist the `systemPrompt`
field anywhere in client code.

---

## GET /api/projects

**Purpose**: List all active projects for the authenticated user.

**Auth**: Required

**Query params**: None (soft-deleted projects automatically excluded by RLS)

**Response 200**:
```json
{
  "projects": [
    {
      "id": "uuid",
      "name": "My SaaS",
      "status": "in_progress",
      "project_type": "saas",
      "created_at": "2026-04-01T10:00:00Z",
      "updated_at": "2026-04-01T12:00:00Z"
    }
  ]
}
```

**Notes**: `interview_data` is NOT returned in list — only in single project fetch. Ordered by `updated_at DESC`.

---

## POST /api/projects

**Purpose**: Create a new project.

**Auth**: Required

**Request**:
```json
{
  "name": "My SaaS Project",
  "project_type": "saas"
}
```

**Validation**:
- `name`: required, 1–100 chars, non-empty after trim
- `project_type`: required, one of `saas | api | internal_tool | mobile | landing_page | other`

**Response 201**:
```json
{
  "id": "uuid",
  "name": "My SaaS Project",
  "status": "in_progress",
  "project_type": "saas",
  "created_at": "2026-04-01T10:00:00Z"
}
```

**Response 402**: Free tier project limit reached
```json
{ "error": "Free tier limit reached. Upgrade to Pro for unlimited projects.", "code": "FREE_TIER_LIMIT" }
```

---

## GET /api/projects/[id]

**Purpose**: Retrieve a single project including `interview_data`.

**Auth**: Required (RLS enforces ownership)

**Response 200**:
```json
{
  "id": "uuid",
  "name": "My SaaS Project",
  "status": "in_progress",
  "project_type": "saas",
  "interview_data": { ... },
  "created_at": "...",
  "updated_at": "..."
}
```

**Response 404**: Project not found or does not belong to user

---

## PATCH /api/projects/[id]

**Purpose**: Update project name, status, or interview_data.

**Auth**: Required

**Request** (all fields optional):
```json
{
  "name": "Updated Name",
  "status": "complete",
  "interview_data": { ... }
}
```

**Response 200**: Updated project object (same shape as GET /api/projects/[id])
**Response 404**: Not found

---

## DELETE /api/projects/[id]

**Purpose**: Soft-delete a project (sets `deleted_at`).

**Auth**: Required

**Response 200**:
```json
{ "success": true, "deleted_at": "2026-04-01T12:00:00Z" }
```

**Response 404**: Not found

**Notes**: Hard delete is NOT supported in MVP. The `deleted_at` column is set. The project
disappears from RLS-filtered queries but data is preserved for potential undo.

---

## GET /api/projects/[id]/bundle

**Purpose**: Retrieve the latest documentation bundle for a project.

**Auth**: Required

**Response 200**:
```json
{
  "id": "uuid",
  "project_id": "uuid",
  "version": 1,
  "files": {
    "PLANNING.md": "# Planning\n...",
    "ARCHITECTURE.md": "# Architecture\n...",
    "DATABASE.md": "...",
    "API-CONTRACTS.md": "...",
    "ENV-STRATEGY.md": "...",
    "AUTH.md": "...",
    "TESTING.md": "...",
    "MONITORING.md": "...",
    "FRONTEND.md": "...",
    "DEPLOYMENT.md": "..."
  },
  "generated_at": "2026-04-01T12:00:00Z",
  "model_used": "claude-sonnet-4-6"
}
```

**Response 404**: No bundle exists yet for this project

---

## POST /api/projects/[id]/bundle

**Purpose**: Save or update the documentation bundle for a project.

**Auth**: Required

**Request**:
```json
{
  "files": {
    "PLANNING.md": "# Planning\n...",
    "ARCHITECTURE.md": "...",
    "DATABASE.md": "...",
    "API-CONTRACTS.md": "...",
    "ENV-STRATEGY.md": "...",
    "AUTH.md": "...",
    "TESTING.md": "...",
    "MONITORING.md": "...",
    "FRONTEND.md": "...",
    "DEPLOYMENT.md": "..."
  },
  "model_used": "claude-sonnet-4-6"
}
```

**Validation**: All 10 file keys must be present. Values must be non-empty strings.

**Response 201** (new bundle): Bundle object
**Response 200** (update existing): Bundle object with incremented `version`

---

## GET /api/export/[id]

**Purpose**: Generate and stream a ZIP download of the documentation bundle.

**Auth**: Required

**Response**: `application/zip` stream
- Filename: `devdocs-[project-name]-[date].zip`
- Contents:
  ```
  docs/
    README.md          (auto-generated index)
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
  ```

**Response 404**: Project or bundle not found
**Response 409**: Bundle is incomplete (fewer than 10 files) — returns error with list of missing files

**Notes**: ZIP is generated server-side from the stored bundle JSONB. The `docs/README.md`
is generated dynamically by `lib/export/readme.ts` and is NOT stored in the `files` JSONB.

---

## POST /api/share

**Purpose**: Create a read-only share link for a bundle.

**Auth**: Required

**Request**:
```json
{ "bundle_id": "uuid" }
```

**Response 201**:
```json
{
  "token": "abc123xyz...",
  "url": "https://app.devdocs.ai/share/abc123xyz",
  "created_at": "2026-04-01T12:00:00Z"
}
```

**Response 403**: Bundle does not belong to the authenticated user

---

## GET /share/[token] [PUBLIC]

**Purpose**: Read-only view of a shared documentation bundle. This is a Next.js page route,
not an API route. The page fetches bundle data via Supabase anon key using the token.

**Auth**: None required

**Behaviour**:
- Reads `share_links` table by token (RLS allows anon read)
- Reads `documentation_bundles` via `bundles_select_via_share` policy
- Renders read-only bundle view — all edit controls hidden
- No Supabase write operations possible (RLS + anon key prevent writes)

**Response**: Full read-only bundle page
**404 page**: Token not found or expired

---

## Auth Routes (Supabase)

Handled by `app/api/auth/[...supabase]/route.ts` — Supabase Auth callback handler.

| Route | Method | Purpose |
|-------|--------|---------|
| `/api/auth/callback` | GET | OAuth callback (Google) and email verification redirect |
| `/api/auth/confirm` | GET | Email confirmation token exchange |

All auth session management is handled by Supabase Auth. The application does not implement
its own session tokens.
