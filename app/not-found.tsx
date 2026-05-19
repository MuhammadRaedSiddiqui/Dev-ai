'use client'

import { Button } from '@/components/stitch/atoms/Button'
import { Icon } from '@/components/stitch/atoms/Icon'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-stitch-vellum-white flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="w-16 h-16 bg-stitch-surface-container rounded-full flex items-center justify-center mx-auto mb-6">
          <Icon
            name="search_off"
            size="xl"
            className="text-stitch-stone"
          />
        </div>

        <h1 className="font-stitch-display text-stitch-display text-stitch-ink-black mb-4">
          404
        </h1>

        <h2 className="font-stitch-h3 text-stitch-h3 text-stitch-ink-black mb-4">
          Page Not Found
        </h2>

        <p className="font-stitch-body-md text-stitch-body-md text-stitch-stone mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <Link href="/dashboard">
          <Button variant="primary" size="md">
            Go to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  )
}
