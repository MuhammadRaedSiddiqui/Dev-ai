# DevDocs AI — Comprehensive Testing Guide

**Version:** 1.0  
**Last Updated:** 2026-05-07  
**Phases Covered:** 1-6 (Setup through Bundle Export)

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Environment Setup](#environment-setup)
3. [Manual Testing](#manual-testing)
4. [Automated Testing](#automated-testing)
5. [Test Data](#test-data)
6. [Troubleshooting](#troubleshooting)
7. [CI/CD Testing](#cicd-testing)

---

## Prerequisites

### Required Accounts & Tools

- **Supabase Account** (free tier) — https://supabase.com
- **Anthropic API Key** — https://console.anthropic.com/settings/keys
- **Node.js 20 LTS** — `node --version` should show v20.x.x
- **Git** — For version control
- **Modern Browser** — Chrome, Firefox, or Edge (latest version)

### Optional Tools

- **Supabase CLI** — For local database management
- **Playwright** — For E2E tests (installed via npm)
- **Postman/Insomnia** — For API testing

---

## Environment Setup

### 1. Clone and Install

```bash
git clone <repository-url>
cd devdocs-ai
npm install
```

### 2. Create Supabase Project

1. Go to https://supabase.com/dashboard
2. Click "New Project"
3. Fill in:
   - **Name:** devdocs-ai-staging
   - **Database Password:** (generate strong password)
   - **Region:** Choose closest to you
4. Wait for project to provision (~2 minutes)

### 3. Apply Database Migrations

**Option A: Via Supabase Dashboard (Recommended for first-time setup)**

1. Go to SQL Editor in Supabase Dashboard
2. Copy content from `supabase/migrations/001_create_profiles.sql`
3. Paste and click "Run"
4. Repeat for migrations 002, 003, 004 in order

**Option B: Via Supabase CLI**

```bash
# Install Supabase CLI (if not already installed)
npm install -g supabase

# Login
supabase login

# Link to your project
supabase link --project-ref YOUR_PROJECT_REF

# Push migrations
supabase db push
```

### 4. Configure Authentication

In Supabase Dashboard:

1. Go to **Authentication → Providers**
2. Enable **Email** provider
3. **Disable** "Confirm email" for testing (re-enable for production)
4. Set **Site URL** to `http://localhost:3000`
5. Add **Redirect URLs:**
   - `http://localhost:3000/api/auth/callback`
   - `http://localhost:3000`

### 5. Create Environment Variables

Create `.env.local`:

```bash
# Supabase (from Project Settings → API)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# System Prompt (copy from SYSTEM_PROMPT_SKELETON.md)
DEVDOCS_SYSTEM_PROMPT="You are a senior software architect..."
```

**⚠️ Important:** Copy the entire content from `SYSTEM_PROMPT_SKELETON.md` into the `DEVDOCS_SYSTEM_PROMPT` variable (as a single line or use multi-line string syntax).

### 6. Verify Setup

```bash
# Start dev server
npm run dev

# In another terminal, run tests
npm run test

# Check build
npm run build
```

If all commands succeed, setup is complete!

---

## Manual Testing

### Test Suite 1: Authentication Flow

**Objective:** Verify user registration, email verification, login, and logout.

#### Test 1.1: User Registration

1. Navigate to http://localhost:3000
2. Click "Sign Up" (or go to `/signup`)
3. Enter test email: `test@example.com`
4. Enter password: `TestPassword123!`
5. Click "Sign up"

**Expected Result:**
- ✅ "Check your email" message appears
- ✅ No errors displayed

**Verify in Supabase:**
- Go to Authentication → Users
- New user should appear with email `test@example.com`
- Status: "Waiting for verification" (if email confirmation enabled)

#### Test 1.2: Email Verification

**If email confirmation is DISABLED (recommended for testing):**
- User is automatically verified
- Skip to Test 1.3

**If email confirmation is ENABLED:**
1. Check Supabase logs: Authentication → Logs
2. Find verification email sent
3. Copy verification link
4. Open in browser

**Expected Result:**
- ✅ Redirected to `/onboarding`
- ✅ User is now logged in

#### Test 1.3: Login

1. Go to `/login`
2. Enter email: `test@example.com`
3. Enter password: `TestPassword123!`
4. Click "Sign in"

**Expected Result:**
- ✅ Redirected to `/dashboard`
- ✅ User email shown in navigation
- ✅ "Sign out" button visible

#### Test 1.4: Logout

1. Click "Sign out" button in navigation
2. Observe behavior

**Expected Result:**
- ✅ Redirected to `/login`
- ✅ Session cleared
- ✅ Attempting to access `/dashboard` redirects to `/login`

#### Test 1.5: Auth Guard (Middleware)

1. While logged out, try to access: `/dashboard`
2. Observe behavior

**Expected Result:**
- ✅ Redirected to `/login?redirect=/dashboard`
- ✅ After login, redirected back to `/dashboard`

---

### Test Suite 2: BYOK Setup & Project Creation

**Objective:** Verify API key validation and project creation flow.

**Prerequisites:** Logged in as test user

#### Test 2.1: Onboarding - API Key Validation (Valid Key)

1. Navigate to `/onboarding`
2. Enter a valid Anthropic API key (starts with `sk-ant-`)
3. Click "Verify Key"

**Expected Result:**
- ✅ "Verifying..." loading state shown
- ✅ After ~2-3 seconds: "✓ API key verified successfully"
- ✅ Automatically advances to Step 2 (Project Creation)

**Verify:**
- Open browser DevTools → Application → Local Storage
- Key `anthropic_api_key` should contain your API key

#### Test 2.2: Onboarding - API Key Validation (Invalid Key)

1. Clear localStorage or use incognito window
2. Go to `/onboarding`
3. Enter invalid key: `sk-ant-invalid-key-12345`
4. Click "Verify Key"

**Expected Result:**
- ✅ Error message: "Invalid API key. Please check your key and try again."
- ✅ Does NOT advance to Step 2

#### Test 2.3: Onboarding - API Key Validation (Format Error)

1. Enter key without correct prefix: `invalid-format`
2. Click "Verify Key"

**Expected Result:**
- ✅ Error message: "API key must start with sk-ant-"
- ✅ No API call made (check Network tab)

#### Test 2.4: Project Creation

1. Complete API key validation (Step 1)
2. On Step 2, enter project name: "Test SaaS Project"
3. Select project type: "SaaS Application"
4. Click "Create Project"

**Expected Result:**
- ✅ "Creating project..." loading state
- ✅ Redirected to `/project/{id}/interview`
- ✅ Interview page loads

**Verify in Supabase:**
- Go to Table Editor → projects
- New project should exist with:
  - `name`: "Test SaaS Project"
  - `project_type`: "saas"
  - `status`: "in_progress"
  - `user_id`: matches your user ID

#### Test 2.5: Free Tier Limit

1. Create 3 projects total
2. Attempt to create a 4th project

**Expected Result:**
- ✅ Error: "Free tier limit reached. Upgrade to Pro for unlimited projects."
- ✅ HTTP 402 status code
- ✅ Project NOT created in database

---

### Test Suite 3: AI Interview

**Objective:** Verify streaming conversation, domain completion, and auto-save.

**Prerequisites:** 
- Valid API key configured
- Project created
- On interview page (`/project/{id}/interview`)

#### Test 3.1: Interview Initialization

1. Observe interview page on load

**Expected Result:**
- ✅ Left panel: Chat interface with empty state message
- ✅ Right panel: Preview panel with "Documentation Preview" empty state
- ✅ Left sidebar: Domain progress showing 10 domains, none complete
- ✅ "Planning & Scope" highlighted as current domain

#### Test 3.2: Send First Message

1. In chat input, type: "I'm building a SaaS for project management. Need MVP in 3 months. Solo founder."
2. Press Enter or click "Send"

**Expected Result:**
- ✅ User message appears in chat (right-aligned, blue background)
- ✅ "Sending..." button state
- ✅ After ~2-3 seconds: AI response starts streaming
- ✅ Tokens appear in real-time (word by word)
- ✅ Blinking cursor shown during streaming

#### Test 3.3: Domain Completion Detection

1. Continue conversation until AI completes first domain
2. AI should output: `[DOMAIN_COMPLETE: planning]`

**Expected Result:**
- ✅ Right panel updates with "Planning & Scope" content
- ✅ Left sidebar: "Planning & Scope" marked complete (✓)
- ✅ Next domain ("Architecture") becomes current
- ✅ Progress shows "1 / 10 domains"

#### Test 3.4: Auto-Save

1. Complete at least one domain
2. Wait 2 seconds
3. Check Supabase: Table Editor → projects → your project

**Expected Result:**
- ✅ `interview_data` JSONB field populated with:
  - `status`: "interviewing"
  - `currentDomain`: "architecture" (or next domain)
  - `completedDomains`: ["planning"]
  - `domainContent`: { "planning": "# Planning..." }
  - `conversationHistory`: array of messages

#### Test 3.5: Resume Interview

1. While mid-interview, close browser tab
2. Reopen browser
3. Navigate to same project interview page

**Expected Result:**
- ✅ Interview resumes from last saved state
- ✅ All previous messages visible in chat
- ✅ Completed domains shown in preview panel
- ✅ Current domain highlighted correctly

#### Test 3.6: Error Handling - Invalid API Key

1. Clear localStorage (removes API key)
2. Try to send a message

**Expected Result:**
- ✅ Error message: "No API key found. Please configure your Anthropic API key."

#### Test 3.7: Error Handling - Rate Limit

**Note:** This test requires actually hitting rate limits, which may not be practical.

**Simulated Test:**
- Verify error handling code exists in `lib/anthropic/streaming.ts`
- Check that 429 errors show: "Rate limit exceeded. Please wait a moment and try again."

---

### Test Suite 4: Bundle Review & Export

**Objective:** Verify documentation review, ZIP export, and share links.

**Prerequisites:** Interview completed (all 10 domains)

#### Test 4.1: Navigate to Review Page

1. After completing interview, click "Review" or navigate to `/project/{id}/review`

**Expected Result:**
- ✅ Review page loads
- ✅ All 10 file tabs visible (Planning, Architecture, Database, etc.)
- ✅ First tab (Planning) active by default
- ✅ Content rendered as formatted markdown

#### Test 4.2: Tab Navigation

1. Click each of the 10 tabs
2. Verify content loads for each

**Expected Result:**
- ✅ Each tab shows different content
- ✅ Markdown rendered correctly (headers, lists, code blocks)
- ✅ No empty tabs (all 10 domains completed)

#### Test 4.3: ZIP Export

1. Click "📦 Export ZIP" button
2. Wait for download

**Expected Result:**
- ✅ "Generating ZIP..." loading state
- ✅ ZIP file downloads: `devdocs-test-saas-project-2026-05-07.zip`
- ✅ File size: ~50-200 KB (depending on content)

**Verify ZIP Contents:**
1. Extract ZIP file
2. Check structure:

```
docs/
├── README.md
├── PLANNING.md
├── ARCHITECTURE.md
├── DATABASE.md
├── API-CONTRACTS.md
├── ENV-STRATEGY.md
├── AUTH.md
├── TESTING.md
├── MONITORING.md
├── FRONTEND.md
└── DEPLOYMENT.md
```

**Expected Result:**
- ✅ 11 files total (10 docs + README)
- ✅ All files under `docs/` directory
- ✅ README.md contains project name and links to all files
- ✅ All 10 documentation files have content (not empty)

#### Test 4.4: Share Link Creation

1. On review page, click "🔗 Share" button
2. Wait for link generation

**Expected Result:**
- ✅ "Creating..." loading state
- ✅ Share link appears: `http://localhost:3000/share/{token}`
- ✅ Token is 64 characters (hex)
- ✅ "Copy" button available

#### Test 4.5: Copy Share Link

1. Click "Copy" button
2. Paste into notepad

**Expected Result:**
- ✅ Button changes to "✓ Copied" for 2 seconds
- ✅ Full URL copied to clipboard

#### Test 4.6: Access Share Link (Authenticated)

1. Copy share link
2. Open in same browser (still logged in)
3. Navigate to share link

**Expected Result:**
- ✅ Read-only view loads
- ✅ All 10 tabs visible
- ✅ Content rendered correctly
- ✅ No edit controls visible
- ✅ Header shows "🔗 Shared Link" badge

#### Test 4.7: Access Share Link (Unauthenticated)

1. Copy share link
2. Open in incognito/private window (not logged in)
3. Navigate to share link

**Expected Result:**
- ✅ Page loads WITHOUT requiring login
- ✅ All content visible
- ✅ Read-only view (no edit/export buttons)
- ✅ Footer shows "Created with DevDocs AI"

#### Test 4.8: Invalid Share Token

1. Navigate to: `http://localhost:3000/share/invalid-token-12345`

**Expected Result:**
- ✅ 404 Not Found page

---

### Test Suite 5: Dashboard & Project Management

**Objective:** Verify project listing and management.

**Prerequisites:** At least 2 projects created

#### Test 5.1: Dashboard Empty State

1. Create new user account
2. Navigate to `/dashboard`

**Expected Result:**
- ✅ Empty state message: "No projects yet"
- ✅ "Create Project" button visible
- ✅ Explanation of what documentation bundles are

#### Test 5.2: Dashboard with Projects

1. Login as user with existing projects
2. Navigate to `/dashboard`

**Expected Result:**
- ✅ All projects listed
- ✅ Each project shows:
  - Project name
  - Project type badge
  - Status (in progress / complete)
  - Last modified date
- ✅ Sorted by most recently modified

#### Test 5.3: Project Soft Delete

**Note:** This feature is implemented in the API but UI may not be complete yet.

**API Test:**
```bash
curl -X DELETE http://localhost:3000/api/projects/{project-id} \
  -H "Cookie: {your-session-cookie}"
```

**Expected Result:**
- ✅ HTTP 200 response
- ✅ `deleted_at` timestamp set in database
- ✅ Project no longer appears in dashboard (RLS filters it out)

---

## Automated Testing

### Unit Tests

**Location:** `tests/unit/`

**Run all unit tests:**
```bash
npm run test
```

**Run specific test file:**
```bash
npm run test tests/unit/anthropic/validation.test.ts
```

**Run with coverage:**
```bash
npm run test:coverage
```

**Expected Coverage (Target: 80%+):**
- `lib/anthropic/validation.ts` — 90%+
- `lib/interview/domains.ts` — 100%
- `lib/interview/completion.ts` — 85%+
- `lib/export/zip.ts` — 80%+
- `lib/export/readme.ts` — 90%+

### Integration Tests

**Location:** `tests/integration/`

**Prerequisites:**
- Supabase staging project configured
- Environment variables set

**Run integration tests:**
```bash
npm run test:integration
```

**Tests Included:**
- `auth.test.ts` — Registration, login, logout flow
- `projects.test.ts` — Project CRUD operations
- `bundles.test.ts` — Bundle save/retrieve
- `share.test.ts` — Share link creation and access

**Note:** Integration tests require valid Supabase credentials and will create/delete test data.

### E2E Tests

**Location:** `tests/e2e/`

**Prerequisites:**
- Application running on `http://localhost:3000`
- Supabase configured
- Valid test user credentials

**Run E2E tests:**
```bash
# Start dev server in one terminal
npm run dev

# Run E2E tests in another terminal
npm run test:e2e
```

**Tests Included:**
- `happy-path.spec.ts` — Full flow: register → interview → export
- `byok-failure.spec.ts` — Invalid key handling
- `resume.spec.ts` — Interview resume after browser close

**Run specific E2E test:**
```bash
npx playwright test tests/e2e/happy-path.spec.ts
```

**Debug E2E tests:**
```bash
npx playwright test --debug
```

---

## Test Data

### Test User Accounts

Create these test accounts for different scenarios:

| Email | Password | Purpose |
|-------|----------|---------|
| `test-free@example.com` | `Test123!` | Free tier user (3 project limit) |
| `test-complete@example.com` | `Test123!` | User with completed projects |
| `test-empty@example.com` | `Test123!` | New user (empty dashboard) |

### Test API Keys

**Valid Test Key:**
- Use your actual Anthropic API key
- Keep quota in mind (each interview uses ~10-20K tokens)

**Invalid Test Keys:**
- `sk-ant-invalid-format` — Format error
- `sk-ant-api03-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx` — Invalid key (correct format)

### Test Projects

Create projects with different states:

1. **In Progress** — Interview started but not complete
2. **Complete** — All 10 domains finished
3. **Empty** — Just created, no interview data

---

## Troubleshooting

### Common Issues

#### Issue: "Unauthorized" errors on all API calls

**Symptoms:**
- All API routes return 401
- User appears logged in but requests fail

**Solution:**
1. Check Supabase session cookie in DevTools
2. Verify `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are correct
3. Try logging out and back in
4. Clear cookies and localStorage

#### Issue: RLS blocking legitimate requests

**Symptoms:**
- User can't see their own projects
- "Not found" errors for owned resources

**Solution:**
1. Verify RLS policies applied correctly
2. Check user_id matches in database
3. Test with Supabase SQL Editor:
```sql
SELECT * FROM projects WHERE user_id = 'your-user-id';
```

#### Issue: Interview not streaming

**Symptoms:**
- Message sent but no response
- Blank assistant message

**Solution:**
1. Check browser console for errors
2. Verify API key is valid and has quota
3. Check Network tab for failed requests
4. Verify `DEVDOCS_SYSTEM_PROMPT` is set

#### Issue: ZIP export fails

**Symptoms:**
- "Incomplete bundle" error
- ZIP download fails

**Solution:**
1. Verify all 10 domains completed
2. Check bundle in database has all files
3. Check browser console for errors
4. Verify JSZip is installed: `npm list jszip`

#### Issue: Share link returns 404

**Symptoms:**
- Share link created but accessing returns 404

**Solution:**
1. Verify share_links table has entry
2. Check RLS policy allows unauthenticated read
3. Verify token matches exactly (case-sensitive)
4. Check bundles_select_via_share RLS policy exists

### Database Debugging

**Check user exists:**
```sql
SELECT * FROM profiles WHERE id = 'user-id';
```

**Check projects for user:**
```sql
SELECT * FROM projects 
WHERE user_id = 'user-id' 
AND deleted_at IS NULL;
```

**Check bundle exists:**
```sql
SELECT id, project_id, version, generated_at 
FROM documentation_bundles 
WHERE project_id = 'project-id';
```

**Check share links:**
```sql
SELECT * FROM share_links WHERE bundle_id = 'bundle-id';
```

### Reset Test Data

**Clear all test data:**
```sql
-- Delete in order (respects foreign keys)
DELETE FROM share_links WHERE created_by = 'test-user-id';
DELETE FROM documentation_bundles WHERE project_id IN (
  SELECT id FROM projects WHERE user_id = 'test-user-id'
);
DELETE FROM projects WHERE user_id = 'test-user-id';
DELETE FROM profiles WHERE id = 'test-user-id';
-- Finally delete from auth.users in Supabase Dashboard
```

---

## CI/CD Testing

### GitHub Actions

**Location:** `.github/workflows/ci.yml`

**Triggers:**
- Push to `main` or feature branches
- Pull requests to `main`

**Jobs:**
1. **test** — Unit tests, TypeScript check, ESLint, build
2. **integration-tests** — Integration tests (requires secrets)

**Required Secrets:**
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `DEVDOCS_SYSTEM_PROMPT`

### Pre-Deployment Checklist

Before deploying to production:

- [ ] All unit tests passing
- [ ] All integration tests passing
- [ ] E2E happy path test passing
- [ ] Build succeeds with no errors
- [ ] ESLint zero errors
- [ ] TypeScript zero errors
- [ ] Lighthouse CI ≥ 90 (all categories)
- [ ] Manual smoke test completed
- [ ] Database migrations applied to production
- [ ] Environment variables configured in Vercel
- [ ] RLS policies verified in production database

---

## Test Metrics

### Success Criteria

**Phase 1-6 Testing Complete When:**
- ✅ All 5 manual test suites pass
- ✅ Unit test coverage ≥ 80%
- ✅ All integration tests pass
- ✅ Happy path E2E test passes
- ✅ No critical bugs in issue tracker
- ✅ Build succeeds on CI

### Known Limitations (MVP)

- Share links never expire (expires_at always NULL)
- No bundle versioning UI (only latest version shown)
- No project search/filter on dashboard
- No bulk operations (delete multiple projects)
- No email notifications
- No analytics dashboard

---

## Next Steps

After completing this testing guide:

1. **Fix any failing tests** — All tests should pass before Phase 7
2. **Document bugs** — Create issues for any bugs found
3. **Update test data** — Keep test accounts and projects fresh
4. **Phase 7: Dashboard** — Implement project list UI
5. **Phase 8: Templates** — Add project template system

---

## Prompt Evaluation Testing

**⚠️ CRITICAL:** Per CLAUDE.md, no code that calls the Anthropic API may be merged unless the system prompt passes all archetype graders. This is a **merge blocker**.

### System Prompt Location

The master system prompt is stored in:
- **Environment Variable:** `DEVDOCS_SYSTEM_PROMPT`
- **Template:** `SYSTEM_PROMPT_SKELETON.md`

### Test Archetype Graders

**Location:** `tests/prompts/`

These graders test the system prompt against 5 project archetypes to ensure quality output.

#### Archetype 1: Solo Founder SaaS

**Profile:**
- Solo founder
- SaaS application
- 3-month deadline
- PostgreSQL database
- Moderate backend experience

**Test File:** `tests/prompts/archetype-1-solo-saas.test.ts`

**Pass Criteria:**
- ✅ Output includes complete database schema
- ✅ Recommends appropriate tech stack for solo developer
- ✅ Addresses 3-month timeline constraints
- ✅ Includes authentication strategy
- ✅ Suggests MVP scope reduction where appropriate

**Run Test:**
```bash
npm run test:prompt -- archetype-1
```

#### Archetype 2: Bootcamp Graduate Internal Tool

**Profile:**
- Bootcamp graduate
- Internal tool (not public-facing)
- 2-week deadline
- No backend experience
- Small user base (<50 users)

**Test File:** `tests/prompts/archetype-2-bootcamp-internal.test.ts`

**Pass Criteria:**
- ✅ Recommends beginner-friendly stack (e.g., Supabase over custom backend)
- ✅ Avoids complex architectural patterns
- ✅ Includes clear deployment instructions
- ✅ Suggests no-code/low-code alternatives where appropriate
- ✅ Addresses 2-week timeline with realistic scope

**Run Test:**
```bash
npm run test:prompt -- archetype-2
```

#### Archetype 3: API-Only Service

**Profile:**
- Small team (2-3 developers)
- API-only service (no frontend)
- Needs authentication and rate limiting
- Moderate traffic expected
- 6-week timeline

**Test File:** `tests/prompts/archetype-3-api-service.test.ts`

**Pass Criteria:**
- ✅ Focuses on API design (no frontend recommendations)
- ✅ Includes authentication/authorization strategy
- ✅ Recommends rate limiting approach
- ✅ Includes API documentation strategy
- ✅ Addresses scalability concerns

**Run Test:**
```bash
npm run test:prompt -- archetype-3
```

#### Archetype 4: Mobile App with Offline Support

**Profile:**
- React Native mobile app
- Needs offline support
- No existing backend
- Solo developer
- 4-month timeline

**Test File:** `tests/prompts/archetype-4-mobile-offline.test.ts`

**Pass Criteria:**
- ✅ Recommends offline-first architecture
- ✅ Includes data sync strategy
- ✅ Suggests appropriate backend (e.g., Firebase, Supabase)
- ✅ Addresses mobile-specific concerns (battery, storage)
- ✅ Includes conflict resolution strategy

**Run Test:**
```bash
npm run test:prompt -- archetype-4
```

#### Archetype 5: Landing Page + Waitlist

**Profile:**
- Simple landing page
- Email waitlist collection
- No database needed (or minimal)
- Solo founder
- 1-week deadline

**Test File:** `tests/prompts/archetype-5-landing.test.ts`

**Pass Criteria:**
- ✅ Recommends simple stack (static site + form service)
- ✅ Does NOT over-engineer (no complex backend)
- ✅ Includes email collection strategy
- ✅ Suggests analytics integration
- ✅ Addresses 1-week timeline

**Run Test:**
```bash
npm run test:prompt -- archetype-5
```

### Running All Prompt Tests

```bash
# Run all archetype graders
npm run test:prompt

# Run with verbose output
npm run test:prompt -- --verbose

# Run specific archetype
npm run test:prompt -- archetype-1
```

### Prompt Evaluation Workflow

When modifying `DEVDOCS_SYSTEM_PROMPT`:

1. **Identify Failure** — Which archetype is failing? What specific criterion?
2. **Minimal Change** — Adjust the smallest part of the prompt that addresses the failure
3. **Re-run Graders** — All 5 archetypes must pass
4. **Regression Check** — Ensure previously passing archetypes still pass
5. **Document Change** — Note what was changed and why in commit message

**Example Workflow:**

```bash
# 1. Make change to SYSTEM_PROMPT_SKELETON.md
# 2. Update .env.local with new prompt
# 3. Run graders
npm run test:prompt

# 4. If failures, analyze output
npm run test:prompt -- archetype-2 --verbose

# 5. Adjust prompt, repeat until all pass
# 6. Commit only when all 5 archetypes pass
```

### Manual Prompt Quality Check

Beyond automated graders, manually verify:

1. **Completeness** — Does output cover all 10 domains?
2. **Relevance** — Is advice tailored to user's context?
3. **Actionability** — Can a developer implement from this documentation?
4. **Consistency** — Do recommendations across domains align?
5. **Scope Appropriateness** — Does it match the stated timeline/resources?

---

## Security Testing

### Authentication Security

#### Test: Session Hijacking Prevention

1. Login as user A
2. Copy session cookie
3. Open incognito window
4. Manually set cookie
5. Try to access user A's projects

**Expected Result:**
- ✅ Supabase validates session server-side
- ✅ Session expires after timeout
- ✅ Cannot access without valid session

#### Test: BYOK Security

1. Open DevTools → Application → Local Storage
2. Verify API key is stored locally
3. Check Network tab for all API calls
4. Verify API key is NEVER sent to DevDocs AI servers

**Expected Result:**
- ✅ API key only in localStorage
- ✅ API key only sent to `api.anthropic.com`
- ✅ No DevDocs AI endpoint receives the key

#### Test: RLS Bypass Attempt

**Using Supabase SQL Editor:**

```sql
-- Try to access another user's project
SELECT * FROM projects WHERE user_id != 'your-user-id';
```

**Expected Result:**
- ✅ Returns empty result (RLS blocks)
- ✅ Cannot see other users' data

#### Test: SQL Injection

1. Create project with name: `'; DROP TABLE projects; --`
2. Verify project created safely

**Expected Result:**
- ✅ Name stored as literal string
- ✅ No SQL execution
- ✅ Tables intact

#### Test: XSS Prevention

1. Create project with name: `<script>alert('XSS')</script>`
2. View project in dashboard
3. View in share link

**Expected Result:**
- ✅ Script tags rendered as text, not executed
- ✅ No alert popup
- ✅ Content sanitized

### API Security

#### Test: Rate Limiting

**Requires:** Rate limiting middleware configured

```bash
# Send 150 requests in 1 minute
for i in {1..150}; do
  curl http://localhost:3000/api/projects
done
```

**Expected Result:**
- ✅ First 100 requests succeed (200 OK)
- ✅ Requests 101-150 return 429 Too Many Requests
- ✅ Rate limit resets after 1 minute

#### Test: Unauthorized Access

```bash
# Try to access API without authentication
curl http://localhost:3000/api/projects

# Try to access another user's project
curl http://localhost:3000/api/projects/{other-user-project-id}
```

**Expected Result:**
- ✅ First request: 401 Unauthorized
- ✅ Second request: 404 Not Found (RLS hides it)

### Environment Variable Security

#### Test: Secrets Not Exposed

1. Build production bundle: `npm run build`
2. Search bundle for secrets:

```bash
# Search for service role key
grep -r "SUPABASE_SERVICE_ROLE_KEY" .next/

# Search for system prompt
grep -r "DEVDOCS_SYSTEM_PROMPT" .next/
```

**Expected Result:**
- ✅ Service role key NOT in client bundle
- ✅ System prompt NOT in client bundle
- ✅ Only `NEXT_PUBLIC_*` vars in client code

---

## Performance Testing

### Page Load Performance

#### Test: Initial Page Load

**Tool:** Lighthouse CI

```bash
npm run lighthouse -- http://localhost:3000
```

**Target Scores:**
- Performance: ≥ 90
- Accessibility: ≥ 90
- Best Practices: ≥ 90
- SEO: ≥ 85

#### Test: Interview Page Load Time

1. Open DevTools → Network tab
2. Navigate to `/project/{id}/interview`
3. Measure time to interactive

**Expected Result:**
- ✅ First Contentful Paint: < 1.5s
- ✅ Time to Interactive: < 3s
- ✅ Total page size: < 500 KB

### Streaming Performance

#### Test: Message Streaming Latency

1. Send message in interview
2. Measure time to first token

**Expected Result:**
- ✅ First token appears within 2-3 seconds
- ✅ Tokens stream smoothly (no long pauses)
- ✅ UI remains responsive during streaming

#### Test: Large Conversation Performance

1. Complete full interview (10 domains, ~50 messages)
2. Scroll through conversation
3. Send new message

**Expected Result:**
- ✅ Scrolling remains smooth (60 fps)
- ✅ New message sends without delay
- ✅ Memory usage stable (< 200 MB)

### Database Performance

#### Test: Project List Query Time

**Using Supabase SQL Editor:**

```sql
EXPLAIN ANALYZE
SELECT * FROM projects 
WHERE user_id = 'test-user-id' 
AND deleted_at IS NULL
ORDER BY updated_at DESC;
```

**Expected Result:**
- ✅ Query time: < 50ms
- ✅ Uses index on user_id
- ✅ No sequential scans

#### Test: Bundle Retrieval Time

```sql
EXPLAIN ANALYZE
SELECT * FROM documentation_bundles 
WHERE project_id = 'test-project-id'
ORDER BY version DESC
LIMIT 1;
```

**Expected Result:**
- ✅ Query time: < 100ms
- ✅ Uses index on project_id

---

## Accessibility Testing

### Keyboard Navigation

#### Test: Tab Navigation

1. Navigate to any page
2. Press Tab repeatedly
3. Verify focus moves through all interactive elements

**Expected Result:**
- ✅ All buttons/links reachable via Tab
- ✅ Focus indicator visible
- ✅ Logical tab order (top to bottom, left to right)
- ✅ No keyboard traps

#### Test: Form Submission via Keyboard

1. Navigate to login form
2. Use Tab to move between fields
3. Press Enter to submit

**Expected Result:**
- ✅ Form submits on Enter
- ✅ No mouse required

### Screen Reader Testing

**Tool:** NVDA (Windows) or VoiceOver (Mac)

#### Test: Page Structure

1. Enable screen reader
2. Navigate to dashboard
3. Use heading navigation (H key in NVDA)

**Expected Result:**
- ✅ Page title announced
- ✅ Headings in logical order (h1 → h2 → h3)
- ✅ Landmarks identified (nav, main, footer)

#### Test: Form Labels

1. Navigate to login form
2. Tab to email field
3. Verify label is announced

**Expected Result:**
- ✅ "Email" label announced
- ✅ "Password" label announced
- ✅ Error messages announced

### Color Contrast

**Tool:** axe DevTools browser extension

1. Install axe DevTools
2. Navigate to any page
3. Run accessibility scan

**Expected Result:**
- ✅ Zero critical violations
- ✅ All text meets WCAG AA contrast ratio (4.5:1)
- ✅ Interactive elements distinguishable

### Automated Accessibility Testing

```bash
# Run axe-core tests
npm run test:a11y

# Run on specific page
npm run test:a11y -- /dashboard
```

**Expected Result:**
- ✅ Zero violations on all pages
- ✅ All images have alt text
- ✅ All forms have labels

---

## Browser Compatibility Testing

### Supported Browsers

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Manual Browser Testing

Test on each supported browser:

1. **Authentication Flow** — Register, login, logout
2. **Interview Streaming** — Verify streaming works
3. **ZIP Export** — Download and extract
4. **Share Links** — Access and view

**Known Issues:**
- Safari < 14: Streaming may not work (ReadableStream support)
- Firefox: ZIP download may prompt differently

### Mobile Browser Testing

Test on mobile devices:

1. **iOS Safari** — iPhone/iPad
2. **Chrome Mobile** — Android

**Test Cases:**
- Responsive layout (no horizontal scroll)
- Touch interactions work
- Forms usable on mobile keyboard
- ZIP export works on mobile

---

## Load Testing

**⚠️ Note:** Load testing should be done on staging, not production.

### Concurrent Users Test

**Tool:** Artillery or k6

**Test Scenario:**
- 50 concurrent users
- Each creates a project
- Each sends 5 interview messages
- Duration: 5 minutes

**Expected Result:**
- ✅ All requests succeed (< 1% error rate)
- ✅ Average response time: < 2s
- ✅ No database connection pool exhaustion

### Anthropic API Rate Limit Handling

**Test Scenario:**
- Send 100 messages rapidly
- Trigger Anthropic rate limit (429)

**Expected Result:**
- ✅ Error message shown to user
- ✅ Retry logic kicks in (exponential backoff)
- ✅ No data loss

---

## Regression Testing Checklist

Before each release, verify:

### Core Flows
- [ ] User can register and login
- [ ] User can create a project
- [ ] Interview completes all 10 domains
- [ ] ZIP export downloads successfully
- [ ] Share link works (authenticated and unauthenticated)

### Edge Cases
- [ ] Invalid API key shows error
- [ ] Free tier limit enforced (3 projects)
- [ ] Resume interview after browser close
- [ ] Large conversation (50+ messages) performs well
- [ ] Concurrent interviews in multiple tabs

### Security
- [ ] RLS prevents cross-user access
- [ ] API key never sent to DevDocs AI servers
- [ ] XSS attempts sanitized
- [ ] Rate limiting active

### Performance
- [ ] Lighthouse score ≥ 90
- [ ] First token appears within 3s
- [ ] Dashboard loads in < 2s

---

**Questions or Issues?**

- Check `IMPLEMENTATION_STATUS.md` for current progress
- Review `CLAUDE.md` for project rules
- See `BACKLOG.md` for post-MVP features
