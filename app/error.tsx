'use client'

import { useEffect } from 'react'
import { Button } from '@/components/stitch/atoms/Button'
import { Icon } from '@/components/stitch/atoms/Icon'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log error to error reporting service (Sentry)
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-stitch-vellum-white flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="w-16 h-16 bg-stitch-error-container rounded-full flex items-center justify-center mx-auto mb-6">
          <Icon
            name="error"
            filled
            size="xl"
            className="text-stitch-terra-cotta"
          />
        </div>

        <h1 className="font-stitch-h2 text-stitch-h2 text-stitch-ink-black mb-4">
          Something went wrong
        </h1>

        <p className="font-stitch-body-md text-stitch-body-md text-stitch-stone mb-6">
          We encountered an unexpected error. Please try again or contact support
          if the problem persists.
        </p>

        {error.digest && (
          <p className="font-stitch-caption text-stitch-caption text-stitch-stone mb-6">
            Error ID: {error.digest}
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button variant="primary" size="md" onClick={reset}>
            Try Again
          </Button>
          <Button
            variant="secondary"
            size="md"
            onClick={() => (window.location.href = '/dashboard')}
          >
            Go to Dashboard
          </Button>
        </div>
      </div>
    </div>
  )
}
