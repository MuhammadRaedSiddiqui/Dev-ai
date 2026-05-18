# Quickstart: DevDocs AI — Local Development

Get a working local dev environment in under 10 minutes.

## Prerequisites

- Node.js 20 LTS (`node --version` → `v20.x.x`)
- npm 10+
- Git
- Supabase CLI (`brew install supabase/tap/supabase` or see supabase.com/docs/guides/cli)
- A Supabase account (free tier)
- An Anthropic API key (`sk-ant-...`) for testing the interview

---

## Step 1: Clone & Install

```bash
git clone https://github.com/your-org/devdocs-ai.git
cd devdocs-ai
npm install
```

---

## Step 2: Configure Environment Variables

```bash
cp .env.example .env.local
```

Open `.env.local` and fill in the following:

| Variable | Where to get it |
|----------|----------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase dashboard → Project Settings → API → Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase dashboard → Project Settings → API → anon/public key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase dashboard → Project Settings → API → service_role key (**never expose client-side**) |
| `DEVDOCS_SYSTEM_PROMPT` | Copy from team 1Password vault → `DevDocs System Prompt v1` |

Leave `SENTRY_DSN`, `NEXT_PUBLIC_POSTHOG_KEY`, and Stripe variables empty for local dev.

---

## Step 3: Apply Database Migrations

```bash
# Link to your Supabase project (first time only)
supabase login
supabase link --project-ref YOUR_PROJECT_REF

# Apply all migrations
supabase db push

# Verify migrations applied
supabase db diff   # should show no diff if all migrations are up-to-date
```

---

## Step 4: Start Local Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

You should see the DevDocs AI landing page.

---

## Step 5: Create a Test Account

1. Go to [http://localhost:3000/signup](http://localhost:3000/signup)
2. Register with any email address
3. Check the email for a verification link (Supabase sends real emails even in dev — or disable email confirmation in Supabase dashboard → Authentication → Providers → Email for local dev)
4. Click the link → you're redirected to `/onboarding`

---

## Step 6: Validate the BYOK Flow

1. On `/onboarding`, enter your test Anthropic API key (`sk-ant-...`)
2. Click "Verify Key" — you should see a green success indicator
3. Create a project: name "Test Project", type "SaaS"
4. You'll be redirected to the interview screen

---

## Step 7: Run Tests

```bash
# Unit tests
npm run test

# Unit tests with coverage
npm run test:coverage

# Integration tests (requires Supabase staging project + env vars set)
npm run test:integration

# E2E tests (runs against localhost:3000)
npx playwright test
```

---

## Validation Checklist

Before raising a PR, verify each item manually:

- [ ] `npm run test` — all unit tests pass
- [ ] `npm run build` — TypeScript compiles with zero errors
- [ ] `npm run lint` — zero ESLint errors
- [ ] `npm run test:integration` — integration tests pass against staging Supabase
- [ ] Manually complete one interview end-to-end (any project type)
- [ ] Manually export a ZIP and verify it contains 11 files under `docs/`
- [ ] Lighthouse CI: run `npx lhci autorun` — all scores ≥ 85
- [ ] `npm audit` — zero critical or high vulnerabilities

---

## Common Issues

**"Invalid API key" on BYOK validation — but my key looks right**
Make sure the key starts with `sk-ant-api03-` (the current Anthropic key format). Older key formats starting with just `sk-ant-` may be from a deprecated account tier.

**Supabase RLS blocking my requests in dev**
Check you're logged in as the correct test user. RLS policies apply in dev exactly as they do in production. If testing cross-user access (to verify RLS blocks it), use two separate incognito windows with two different test accounts.

**`DEVDOCS_SYSTEM_PROMPT` missing — server returns 500 on `/api/session/init`**
The system prompt env var is required. It is in the team 1Password vault. Do not attempt to bypass it with a placeholder — the interview will produce garbage output without the full system prompt.

**Migrations fail with "relation already exists"**
Run `supabase db reset` (⚠️ this wipes your local dev database) then `supabase db push`. Only do this on your local dev database, never on staging or production.
