/**
 * ZIP Export Utilities
 *
 * Builds a ZIP file containing the documentation bundle.
 * All files are placed under a `docs/` directory.
 */

import JSZip from 'jszip'

export interface BundleFiles {
  'PLANNING.md': string
  'ARCHITECTURE.md': string
  'DATABASE.md': string
  'API-CONTRACTS.md': string
  'ENV-STRATEGY.md': string
  'AUTH.md': string
  'TESTING.md': string
  'MONITORING.md': string
  'FRONTEND.md': string
  'DEPLOYMENT.md': string
}

/**
 * Build a ZIP file from documentation bundle
 *
 * @param files - The 10 documentation files
 * @param readmeContent - Auto-generated README.md content
 * @param projectName - Project name for ZIP filename
 * @returns Blob containing the ZIP file
 */
export async function buildZip(
  files: BundleFiles,
  readmeContent: string,
  projectName: string
): Promise<Blob> {
  const zip = new JSZip()

  // Create docs folder
  const docsFolder = zip.folder('docs')

  if (!docsFolder) {
    throw new Error('Failed to create docs folder in ZIP')
  }

  // Add README.md
  docsFolder.file('README.md', readmeContent)

  // Add all 10 documentation files
  Object.entries(files).forEach(([filename, content]) => {
    docsFolder.file(filename, content)
  })

  // Generate ZIP blob
  const blob = await zip.generateAsync({ type: 'blob' })

  return blob
}

/**
 * Trigger browser download of ZIP file
 *
 * @param blob - ZIP file blob
 * @param projectName - Project name for filename
 */
export function downloadZip(blob: Blob, projectName: string): void {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url

  // Generate filename: devdocs-project-name-2026-05-07.zip
  const date = new Date().toISOString().split('T')[0]
  const sanitizedName = projectName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
  link.download = `devdocs-${sanitizedName}-${date}.zip`

  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)

  // Clean up object URL
  URL.revokeObjectURL(url)
}

/**
 * Validate that all required files are present
 */
export function validateBundleFiles(files: Partial<BundleFiles>): {
  valid: boolean
  missingFiles: string[]
} {
  const requiredFiles: (keyof BundleFiles)[] = [
    'PLANNING.md',
    'ARCHITECTURE.md',
    'DATABASE.md',
    'API-CONTRACTS.md',
    'ENV-STRATEGY.md',
    'AUTH.md',
    'TESTING.md',
    'MONITORING.md',
    'FRONTEND.md',
    'DEPLOYMENT.md',
  ]

  const missingFiles = requiredFiles.filter((file) => !files[file] || files[file].trim() === '')

  return {
    valid: missingFiles.length === 0,
    missingFiles,
  }
}
