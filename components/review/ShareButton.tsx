'use client'

import { useState } from 'react'

interface ShareButtonProps {
  bundleId: string
}

/**
 * ShareButton Component
 *
 * Creates a share link for the documentation bundle.
 * Shows the generated URL and allows copying to clipboard.
 */
export default function ShareButton({ bundleId }: ShareButtonProps) {
  const [loading, setLoading] = useState(false)
  const [shareUrl, setShareUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const handleCreateShare = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/share', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bundle_id: bundleId }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to create share link')
      }

      const data = await response.json()
      setShareUrl(data.url)
    } catch (err) {
      console.error('Share error:', err)
      setError(err instanceof Error ? err.message : 'Failed to create share link')
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = async () => {
    if (shareUrl) {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  if (shareUrl) {
    return (
      <div className="space-y-2">
        <div className="rounded-md border border-border bg-muted p-3">
          <div className="mb-2 text-xs font-medium text-muted-foreground">Share Link</div>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={shareUrl}
              readOnly
              className="flex-1 rounded border border-input bg-background px-2 py-1 text-xs"
            />
            <button
              onClick={handleCopy}
              className="rounded-md bg-primary px-3 py-1 text-xs font-medium text-primary-foreground hover:bg-primary/90"
            >
              {copied ? '✓ Copied' : 'Copy'}
            </button>
          </div>
        </div>
        <button
          onClick={() => setShareUrl(null)}
          className="text-xs text-muted-foreground hover:underline"
        >
          Create new link
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <button
        onClick={handleCreateShare}
        disabled={loading}
        className="w-full rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent disabled:opacity-50"
      >
        {loading ? 'Creating...' : '🔗 Share'}
      </button>

      {error && (
        <div className="rounded-md bg-destructive/10 p-2 text-xs text-destructive">
          {error}
        </div>
      )}
    </div>
  )
}
