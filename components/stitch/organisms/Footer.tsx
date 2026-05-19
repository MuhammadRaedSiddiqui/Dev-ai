import { cn } from '@/lib/utils'
import Link from 'next/link'

export interface FooterProps {
  className?: string
}

export function Footer({ className }: FooterProps) {
  return (
    <footer
      className={cn(
        'bg-stitch-surface border-t border-stitch-parchment w-full mt-auto',
        className
      )}
    >
      <div className="flex flex-col md:flex-row justify-between items-center w-full px-stitch-gap-lg py-stitch-gap-md max-w-stitch-container-max mx-auto gap-stitch-gap-md text-center md:text-left">
        <div className="font-stitch-caption text-stitch-caption text-stitch-stone">
          © 2024 DevDocs AI. Scholarly Rigor for Modern Code.
        </div>
        <div className="flex flex-wrap justify-center gap-stitch-gap-md">
          <Link
            href="#"
            className="font-stitch-caption text-stitch-caption text-stitch-stone hover:text-stitch-terra-cotta underline transition-all duration-200"
          >
            Privacy Policy
          </Link>
          <Link
            href="#"
            className="font-stitch-caption text-stitch-caption text-stitch-stone hover:text-stitch-terra-cotta underline transition-all duration-200"
          >
            Terms of Service
          </Link>
          <Link
            href="#"
            className="font-stitch-caption text-stitch-caption text-stitch-stone hover:text-stitch-terra-cotta underline transition-all duration-200"
          >
            Documentation Guide
          </Link>
          <Link
            href="#"
            className="font-stitch-caption text-stitch-caption text-stitch-stone hover:text-stitch-terra-cotta underline transition-all duration-200"
          >
            Support
          </Link>
        </div>
      </div>
    </footer>
  )
}
