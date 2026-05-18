# Stitch Design — Vellum Academic Journal

Pixel-faithful Next.js previews of Google Stitch project **6589043652244716622** (*Vellum Academic Journal* / DevDocs AI).

These routes are **design previews only** — not wired to Supabase, auth, or AI.

## Routes

| Screen | URL |
|--------|-----|
| Index | `/stitch-design` |
| Landing | `/stitch-design/landing` |
| Login | `/stitch-design/login` |
| Onboarding | `/stitch-design/onboarding` |
| Dashboard | `/stitch-design/dashboard` |
| Interview | `/stitch-design/interview` |

## Source archive

- `source/html/*.html` — Stitch HTML exports
- `source/screenshots/*.png` — reference screenshots
- `source/screens-meta.json` — download metadata
- `source/GOOGLE-STITCH-DESIGN-GUIDE.md` — design spec

## Regenerate pages

After updating HTML in `source/html/`:

```bash
node scripts/convert-stitch.mjs
```

## Implementation

- Pages: `app/stitch-design/*/page.tsx`
- Tokens: `lib/stitch/` (`stitch-*` Tailwind namespace)
- Layout: `app/stitch-design/layout.tsx` + `stitch.css`
