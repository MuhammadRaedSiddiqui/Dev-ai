import Link from 'next/link'
import { STITCH_SCREEN_ROUTES, STITCH_SCREEN_SLUGS } from '@/lib/stitch/constants'

const LABELS: Record<(typeof STITCH_SCREEN_SLUGS)[number], string> = {
  landing: 'Landing Page',
  login: 'Login Page',
  onboarding: 'Onboarding (API Key)',
  dashboard: 'Dashboard',
  interview: 'Interview Workspace',
}

export default function StitchDesignIndexPage() {
  return (
    <main className="min-h-screen bg-stitch-vellum-white p-stitch-gap-lg">
      <div className="mx-auto max-w-stitch-container-max">
        <h1 className="font-stitch-display text-stitch-h2 text-stitch-ink-black mb-2">
          Stitch Design Previews
        </h1>
        <p className="font-stitch-body-md text-stitch-body-md text-stitch-graphite mb-stitch-gap-lg">
          Vellum Academic Journal — project 6589043652244716622. Static design previews only.
        </p>
        <ul className="space-y-stitch-gap-xs">
          {STITCH_SCREEN_SLUGS.map((slug) => (
            <li key={slug}>
              <Link
                href={STITCH_SCREEN_ROUTES[slug]}
                className="font-stitch-body-lg text-stitch-body-lg text-stitch-ink-black underline hover:text-stitch-terra-cotta"
              >
                {LABELS[slug]}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}
