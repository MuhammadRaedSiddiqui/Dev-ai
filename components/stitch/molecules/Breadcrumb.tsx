import { cn } from '@/lib/utils'
import Link from 'next/link'

export interface BreadcrumbItem {
  label: string
  href?: string
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn(
        'font-stitch-caption text-stitch-caption text-stitch-dusty-gray',
        className
      )}
    >
      <ol className="flex items-center space-x-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1

          return (
            <li key={index} className="flex items-center space-x-2">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="hover:text-stitch-ink-black transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={cn(
                    isLast && 'text-stitch-ink-black',
                    isLast && 'aria-current="page"'
                  )}
                >
                  {item.label}
                </span>
              )}
              {!isLast && (
                <span className="text-stitch-parchment" aria-hidden="true">
                  /
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
