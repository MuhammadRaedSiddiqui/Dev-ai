const { stitchColors, stitchSpacing, stitchFontSize, stitchFontFamily } = require('./tokens.cjs')

function prefixColors(colors, prefix) {
  return Object.fromEntries(
    Object.entries(colors).map(([key, value]) => [`${prefix}-${key}`, value])
  )
}

function prefixFontSize(sizes, prefix) {
  return Object.fromEntries(
    Object.entries(sizes).map(([key, value]) => [`${prefix}-${key}`, value])
  )
}

function prefixFontFamily(families, prefix) {
  return Object.fromEntries(
    Object.entries(families).map(([key, value]) => [`${prefix}-${key}`, value])
  )
}

function prefixSpacing(spacing, prefix) {
  return Object.fromEntries(
    Object.entries(spacing).map(([key, value]) => [`${prefix}-${key}`, value])
  )
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: prefixColors(stitchColors, 'stitch'),
      spacing: prefixSpacing(stitchSpacing, 'stitch'),
      maxWidth: {
        'stitch-container-max': stitchSpacing['container-max'],
      },
      fontSize: prefixFontSize(stitchFontSize, 'stitch'),
      fontFamily: {
        ...prefixFontFamily(stitchFontFamily, 'stitch'),
        'stitch-sans': ['var(--font-stitch-inter)', 'Inter', 'sans-serif'],
        'stitch-serif': ['var(--font-stitch-lora)', 'Lora', 'serif'],
      },
      borderRadius: {
        'stitch-DEFAULT': '0.25rem',
        'stitch-lg': '0.5rem',
        'stitch-xl': '0.75rem',
        'stitch-full': '9999px',
        'stitch-input': '9.6px',
      },
    },
  },
}
