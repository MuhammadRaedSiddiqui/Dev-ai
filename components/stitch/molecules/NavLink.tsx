import { cn } from '@/lib/utils'
import Link from 'next/link'
import { Icon } from '../atoms/Icon'

export interface NavLinkProps {
  href: string
  icon?: string
  active?: boolean
  children: React.ReactNode
  className?: string
}

export function NavLink({
  href,
  icon,
  active = false,
  children,
  className,
}: NavLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        'flex items-center gap-3 px-3 py-2 rounded-none transition-all duration-200 font-stitch-body-sm text-stitch-body-sm',
        active
          ? 'text-stitch-ink-black font-bold bg-stitch-surface-container translate-x-1'
          : 'text-stitch-stone hover:bg-stitch-surface-container-low',
        className
      )}
    >
      {icon && (
        <Icon
          name={icon}
          size="md"
          filled={active}
          className={active ? 'text-stitch-ink-black' : 'text-stitch-stone'}
        />
      )}
      <span>{children}</span>
    </Link>
  )
}
