#!/usr/bin/env node
/**
 * Converts stitch-design/source/html/*.html → app/stitch-design/{slug}/page.tsx
 * Run: node scripts/convert-stitch.mjs
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { rewriteStitchClasses } from '../lib/stitch/rewrite-classes.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')
const HTML_DIR = path.join(ROOT, 'stitch-design', 'source', 'html')
const OUT_DIR = path.join(ROOT, 'app', 'stitch-design')

const SLUGS = fs
  .readdirSync(HTML_DIR)
  .filter((f) => f.endsWith('.html'))
  .map((f) => f.replace(/\.html$/, ''))
  .sort()

const VOID_TAGS = new Set([
  'area',
  'base',
  'br',
  'col',
  'embed',
  'hr',
  'img',
  'input',
  'link',
  'meta',
  'param',
  'source',
  'track',
  'wbr',
])

function extractBody(html) {
  const bodyOpen = html.match(/<body[^>]*>/i)
  if (!bodyOpen) throw new Error('No <body> found')
  const start = bodyOpen.index + bodyOpen[0].length
  const end = html.lastIndexOf('</body>')
  if (end === -1) throw new Error('No </body> found')
  const bodyClassMatch = bodyOpen[0].match(/class="([^"]*)"/)
  const bodyClass = bodyClassMatch ? bodyClassMatch[1] : ''
  const inner = html.slice(start, end).trim()
  return { bodyClass, inner }
}

function extractStyles(html) {
  const styles = []
  const re = /<style[^>]*>([\s\S]*?)<\/style>/gi
  let m
  while ((m = re.exec(html)) !== null) {
    if (!m[1].includes('tailwind.config')) styles.push(m[1].trim())
  }
  return styles
}

function convertAttributes(tag) {
  let result = tag
  result = result.replace(/\sclass="/g, ' className="')
  result = result.replace(/\sclass='/g, " className='")
  result = result.replace(/\bviewbox=/gi, 'viewBox=')
  result = result.replace(/\bclip-rule=/gi, 'clipRule=')
  result = result.replace(/\bfill-rule=/gi, 'fillRule=')
  result = result.replace(/\bstroke-width=/gi, 'strokeWidth=')
  result = result.replace(/\bstroke-linecap=/gi, 'strokeLinecap=')
  result = result.replace(/\bstroke-linejoin=/gi, 'strokeLinejoin=')
  result = result.replace(/\bfill-opacity=/gi, 'fillOpacity=')
  result = result.replace(/\bstop-color=/gi, 'stopColor=')
  result = result.replace(/\bstop-opacity=/gi, 'stopOpacity=')
  result = result.replace(/\sfor="/g, ' htmlFor="')
  result = result.replace(/\sfor='/g, " htmlFor='")
  result = result.replace(/\btabindex=/gi, 'tabIndex=')
  result = result.replace(/\sreadonly=""/gi, ' readOnly')
  result = result.replace(/\sreadonly=''/gi, ' readOnly')
  result = result.replace(/\sreadonly\b/gi, ' readOnly')
  result = result.replace(/\sautocomplete=/gi, ' autoComplete=')
  result = result.replace(/\smaxlength=/gi, ' maxLength=')
  result = result.replace(/\sminlength=/gi, ' minLength=')
  result = result.replace(/\srowspan=/gi, ' rowSpan=')
  result = result.replace(/\scolspan=/gi, ' colSpan=')
  result = result.replace(/\srequired=""/gi, ' required')
  result = result.replace(/\srequired=''/gi, ' required')
  result = result.replace(/\sdisabled=""/gi, ' disabled')
  result = result.replace(/\schecked=""/gi, ' checked')
  result = result.replace(/\sselected=""/gi, ' selected')
  return result
}

function rewriteClassAttrs(html) {
  return html.replace(/className="([^"]*)"/g, (_, classes) => {
    return `className="${rewriteStitchClasses(classes)}"`
  })
}

function convertImgToNextImage(html) {
  return html.replace(/<img\s+([^>]*)\/?>/gi, (match, attrs) => {
    const srcMatch = attrs.match(/\ssrc="([^"]+)"/)
    const altMatch = attrs.match(/\salt="([^"]*)"/)
    const classMatch = attrs.match(/\sclassName="([^"]*)"/)
    if (!srcMatch) return match
    const src = srcMatch[1]
    const alt = altMatch ? altMatch[1].replace(/"/g, '&quot;') : ''
    const className = classMatch ? classMatch[1] : ''
    const wMatch = attrs.match(/\swidth="(\d+)"/)
    const hMatch = attrs.match(/\sheight="(\d+)"/)
    const width = wMatch ? wMatch[1] : '40'
    const height = hMatch ? hMatch[1] : '40'
    return `<Image src="${src}" alt="${alt}" width={${width}} height={${height}} className="${className}" />`
  })
}

function convertInlineStyles(html) {
  return html.replace(/\sstyle="([^"]*)"/g, (_, styleStr) => {
    const trimmed = styleStr.trim().replace(/;$/, '')
    if (!trimmed) return ''
    const props = trimmed.split(';').filter(Boolean)
    const entries = props.map((prop) => {
      const colon = prop.indexOf(':')
      if (colon === -1) return null
      const key = prop.slice(0, colon).trim()
      const value = prop.slice(colon + 1).trim()
      const camelKey = key.replace(/-([a-z])/g, (_, c) => c.toUpperCase())
      return `${camelKey}: '${value.replace(/'/g, "\\'")}'`
    }).filter(Boolean)
    if (entries.length === 0) return ''
    return ` style={{ ${entries.join(', ')} }}`
  })
}

function fixMiscAttrs(html) {
  return html
    .replace(/\sdisabled="true"/g, ' disabled')
    .replace(/\sdisabled="false"/g, '')
    .replace(/\sdata-weight="/g, ' data-weight="')
}

function selfCloseVoidTags(html) {
  return html.replace(/<(\w+)([^>]*?)>/gi, (full, tag, rest) => {
    const lower = tag.toLowerCase()
    if (!VOID_TAGS.has(lower)) return full
    if (full.endsWith('/>')) return full
    return `<${tag}${rest} />`
  })
}

function htmlToJsx(inner) {
  let jsx = inner
  jsx = convertAttributes(jsx)
  jsx = rewriteClassAttrs(jsx)
  jsx = convertImgToNextImage(jsx)
  jsx = convertInlineStyles(jsx)
  jsx = fixMiscAttrs(jsx)
  jsx = selfCloseVoidTags(jsx)
  jsx = jsx.replace(/Don't/g, "Don&apos;t")
  jsx = jsx.replace(/<!--([\s\S]*?)-->/g, '{/*$1*/}')
  return jsx
}

function formatJsx(jsx, indent = 6) {
  const pad = ' '.repeat(indent)
  return jsx
    .split('\n')
    .map((line) => (line.trim() ? pad + line : line))
    .join('\n')
}

function slugToPascalCase(slug) {
  return slug
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('')
}

function generatePage(slug, bodyClass, inner, hasImage) {
  const jsx = formatJsx(htmlToJsx(inner))
  const rewrittenBodyClass = rewriteStitchClasses(bodyClass)
  const imageImport = hasImage ? "import Image from 'next/image'\n\n" : ''
  const title = slugToPascalCase(slug)

  return `${imageImport}export default function Stitch${title}Page() {
  return (
    <div className="${rewrittenBodyClass}">
${jsx}
    </div>
  )
}
`
}

function collectGlobalStyles(allStyles) {
  const seen = new Set()
  const blocks = []
  for (const styles of allStyles) {
    for (const block of styles) {
      if (!seen.has(block)) {
        seen.add(block)
        blocks.push(block)
      }
    }
  }
  return blocks.join('\n\n')
}

function main() {
  const allStyles = []

  for (const slug of SLUGS) {
    const htmlPath = path.join(HTML_DIR, `${slug}.html`)
    if (!fs.existsSync(htmlPath)) {
      console.error(`Missing ${htmlPath}`)
      process.exit(1)
    }
    const html = fs.readFileSync(htmlPath, 'utf8')
    allStyles.push(extractStyles(html))

    const { bodyClass, inner } = extractBody(html)
    const hasImage = html.includes('<img')
    const pageContent = generatePage(slug, bodyClass, inner, hasImage)
    const outPath = path.join(OUT_DIR, slug, 'page.tsx')
    fs.mkdirSync(path.dirname(outPath), { recursive: true })
    fs.writeFileSync(outPath, pageContent, 'utf8')
    console.log(`Wrote ${outPath}`)
  }

  const cssPath = path.join(ROOT, 'app', 'stitch-design', 'stitch.css')
  if (!fs.existsSync(cssPath)) {
    const defaultCss = `.stitch-scope .material-symbols-outlined {
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}

.stitch-scope .custom-input,
.stitch-scope .custom-radius {
  border-radius: 9.6px;
}

@keyframes stitch-fadeIn {
  from { opacity: 0.7; }
  to { opacity: 1; }
}

@keyframes stitch-blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

.stitch-scope .animate-fadeIn {
  animation: stitch-fadeIn 100ms ease-out forwards;
}

.stitch-scope .animate-blink {
  animation: stitch-blink 500ms ease-in-out infinite;
}
`
    fs.writeFileSync(cssPath, defaultCss, 'utf8')
    console.log(`Created ${cssPath}`)
  }
}

main()
