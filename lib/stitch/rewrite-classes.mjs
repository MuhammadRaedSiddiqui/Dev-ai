/** Rewrites Stitch Tailwind classes to stitch-* namespaced tokens */

const COLOR_TOKENS = [
  'ink-black',
  'on-primary-fixed-variant',
  'tertiary-fixed-dim',
  'surface-dim',
  'tertiary-fixed',
  'secondary-fixed',
  'primary-fixed-dim',
  'inverse-primary',
  'surface-container',
  'on-primary-container',
  'outline-variant',
  'on-error',
  'inverse-surface',
  'stone',
  'primary-fixed',
  'surface',
  'primary',
  'primary-container',
  'on-tertiary-fixed',
  'terra-cotta',
  'inverse-on-surface',
  'on-secondary-container',
  'vellum-white',
  'outline',
  'surface-container-low',
  'parchment',
  'onyx',
  'pale-azure',
  'surface-tint',
  'on-secondary',
  'error-container',
  'background',
  'surface-container-lowest',
  'surface-container-highest',
  'secondary',
  'surface-container-high',
  'on-primary-fixed',
  'tertiary',
  'on-primary',
  'secondary-container',
  'dusty-gray',
  'graphite',
  'surface-bright',
  'on-tertiary-fixed-variant',
  'on-background',
  'on-secondary-fixed',
  'secondary-fixed-dim',
  'on-secondary-fixed-variant',
  'on-error-container',
  'snow-white',
  'tertiary-container',
  'error',
  'surface-variant',
  'on-surface',
  'on-tertiary',
  'on-surface-variant',
  'on-tertiary-container',
]

const SPACING_TOKENS = ['gap-lg', 'section-xl', 'container-max', 'gap-md', 'unit', 'gap-xs']

const FONT_FAMILY_TOKENS = [
  'h3',
  'caption',
  'h4',
  'label-caps',
  'body-md',
  'body-sm',
  'display',
  'body-lg',
  'h2',
]

const FONT_SIZE_TOKENS = FONT_FAMILY_TOKENS

const COLOR_PREFIXES = [
  'bg',
  'text',
  'border',
  'ring',
  'divide',
  'from',
  'to',
  'via',
  'fill',
  'stroke',
  'decoration',
  'placeholder',
  'caret',
  'accent',
]

/** outline-* color utilities only (not outline-none) */
const OUTLINE_COLOR_VARIANTS = ['', 'hover:', 'focus:', 'active:']

const VARIANT_PREFIXES = ['', 'hover:', 'focus:', 'active:', 'group-hover:', 'peer-focus:']

/** @param {string} classString */
export function rewriteStitchClasses(classString) {
  if (!classString) return classString

  let result = classString
    .replace(/\bActive:/g, 'active:')
    .replace(/\brounded-DEFAULT\b/g, 'rounded-stitch-DEFAULT')
    .replace(/\bmax-w-container-max\b/g, 'max-w-stitch-container-max')

  for (const spacing of SPACING_TOKENS) {
    const patterns = [
      [`\\bgap-${spacing}\\b`, `gap-stitch-${spacing}`],
      [`\\bp-${spacing}\\b`, `p-stitch-${spacing}`],
      [`\\bpx-${spacing}\\b`, `px-stitch-${spacing}`],
      [`\\bpy-${spacing}\\b`, `py-stitch-${spacing}`],
      [`\\bpt-${spacing}\\b`, `pt-stitch-${spacing}`],
      [`\\bpb-${spacing}\\b`, `pb-stitch-${spacing}`],
      [`\\bpl-${spacing}\\b`, `pl-stitch-${spacing}`],
      [`\\bpr-${spacing}\\b`, `pr-stitch-${spacing}`],
      [`\\bm-${spacing}\\b`, `m-stitch-${spacing}`],
      [`\\bmx-${spacing}\\b`, `mx-stitch-${spacing}`],
      [`\\bmy-${spacing}\\b`, `my-stitch-${spacing}`],
      [`\\bmt-${spacing}\\b`, `mt-stitch-${spacing}`],
      [`\\bmb-${spacing}\\b`, `mb-stitch-${spacing}`],
      [`\\bml-${spacing}\\b`, `ml-stitch-${spacing}`],
      [`\\bmr-${spacing}\\b`, `mr-stitch-${spacing}`],
      [`\\bspace-y-${spacing}\\b`, `space-y-stitch-${spacing}`],
      [`\\bspace-x-${spacing}\\b`, `space-x-stitch-${spacing}`],
    ]
    for (const [pattern, replacement] of patterns) {
      result = result.replace(new RegExp(pattern, 'g'), replacement)
    }
  }

  for (const token of FONT_FAMILY_TOKENS) {
    result = result.replace(new RegExp(`\\bfont-${token}\\b`, 'g'), `font-stitch-${token}`)
  }

  for (const token of FONT_SIZE_TOKENS) {
    result = result.replace(new RegExp(`\\btext-${token}\\b`, 'g'), `text-stitch-${token}`)
  }

  for (const color of COLOR_TOKENS) {
    for (const variant of VARIANT_PREFIXES) {
      for (const prefix of COLOR_PREFIXES) {
        const from = `${variant}${prefix}-${color}`
        const to = `${variant}${prefix}-stitch-${color}`
        result = result.replace(new RegExp(`\\b${escapeRegex(from)}\\b`, 'g'), to)
      }
      const importantFrom = `${variant}!${prefix}-${color}`
      const importantTo = `${variant}!${prefix}-stitch-${color}`
      result = result.replace(new RegExp(escapeRegex(importantFrom), 'g'), importantTo)
    }
    for (const variant of OUTLINE_COLOR_VARIANTS) {
      const from = `${variant}outline-${color}`
      const to = `${variant}outline-stitch-${color}`
      result = result.replace(new RegExp(`\\b${escapeRegex(from)}\\b`, 'g'), to)
    }
  }

  return result
}

/** @param {string} s */
function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}
