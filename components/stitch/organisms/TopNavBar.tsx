import { cn } from '@/lib/utils'
import Link from 'next/link'
import { Button } from '../atoms/Button'

export interface TopNavBarProps {
  variant?: 'marketing' | 'app'
  className?: string
}

export function TopNavBar({ variant = 'marketing', className }: TopNavBarProps) {
  return (
    <header
      className={cn(
        'bg-stitch-surface border-b border-stitch-parchment w-full top-0 sticky z-50',
        className
      )}
    >
      <div className="flex justify-between items-center w-full px-stitch-gap-lg max-w-stitch-container-max mx-auto h-16">
        <div className="flex items-center gap-stitch-gap-md">
          <Link
            href="/"
            className="font-stitch-display text-stitch-h3 font-normal text-stitch-ink-black"
          >
            DevDocs AI
          </Link>
          {variant === 'marketing' && (
            <nav className="hidden md:flex items-center gap-stitch-gap-md ml-stitch-gap-lg">
              <Link
                href="#"
                className="font-stitch-body-md text-stitch-body-md text-stitch-stone hover:text-stitch-terra-cotta transition-colors duration-200"
              >
                Workspace
              </Link>
              <Link
                href="#"
                className="font-stitch-body-md text-stitch-body-md text-stitch-stone hover:text-stitch-terra-cotta transition-colors duration-200"
              >
                Documentation
              </Link>
              <Link
                href="#"
                className="font-stitch-body-md text-stitch-body-md text-stitch-stone hover:text-stitch-terra-cotta transition-colors duration-200"
              >
                Project Hub
              </Link>
              <Link
                href="#"
                className="font-stitch-body-md text-stitch-body-md text-stitch-stone hover:text-stitch-terra-cotta transition-colors duration-200"
              >
                Resources
              </Link>
            </nav>
          )}
        </div>
        <div className="flex items-center gap-stitch-gap-md">
          <Link
            href="/login"
            className="hidden md:inline-block font-stitch-label-caps text-stitch-label-caps text-stitch-ink-black hover:text-stitch-terra-cotta transition-colors duration-200 uppercase"
          >
            Sign In
          </Link>
          <Link href="/signup">
            <Button variant="primary" size="sm">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
