/** Stitch project 6589043652244716622 — Vellum Academic Journal */
export const STITCH_PROJECT_ID = '6589043652244716622'

export const STITCH_CONTAINER_MAX = '1200px'

export const STITCH_SCREEN_SLUGS = [
  'landing',
  'login',
  'onboarding',
  'dashboard',
  'interview',
  'new-project-modal',
  'settings',
] as const

export type StitchScreenSlug = (typeof STITCH_SCREEN_SLUGS)[number]

export const STITCH_SCREEN_ROUTES: Record<StitchScreenSlug, string> = {
  landing: '/stitch-design/landing',
  login: '/stitch-design/login',
  onboarding: '/stitch-design/onboarding',
  dashboard: '/stitch-design/dashboard',
  interview: '/stitch-design/interview',
  'new-project-modal': '/stitch-design/new-project-modal',
  settings: '/stitch-design/settings',
}
