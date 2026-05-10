'use client'

import { useState } from 'react'

interface ExportButtonProps {
  projectId: string
  projectName: string
  disabled?: boolean
}

/**
 * ExportButton Component
 *
 * Triggers ZIP download of the documentation bundle.
 * Shows loading state during generation.
 */
export default function ExportButton({ projectId, projectName, disabled }: ExportButtonProps) {
  const [exporting, setExporting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleExport = async () => {
    setExporting(true)
    setError(null)

    try {
      const response = await fetch(`/api/export/${projectId}`)

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to export bundle')
      }

      // Get the blob
      const blob = await response.blob()

      // Trigger download
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url

      // Get filename from Content-Disposition header or generate one
      const contentDisposition = response.headers.get('Content-Disposition')
      const filenameMatch = contentDisposition?.match(/filename="(.+)"/)
      const filename = filenameMatch
        ? filenameMatch[1]
        : `devdocs-${projectName}-${new Date().toISOString().split('T')[0]}.zip`

      link.download = filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } catch (err) {
      console.error('Export error:', err)
      setError(err instanceof Error ? err.message : 'Failed to export bundle')
    } finally {
      setExporting(false)
    }
  }

  return (
    <div className="space-y-2">
      <button
        onClick={handleExport}
        disabled={disabled || exporting}
        className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
      >
        {exporting ? 'Generating ZIP...' : '📦 Export ZIP'}
      </button>

      {error && (
        <div className="rounded-md bg-destructive/10 p-2 text-xs text-destructive">
          {error}
        </div>
      )}
    </div>
  )
}
