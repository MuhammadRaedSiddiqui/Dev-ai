import { cn } from '@/lib/utils'

export interface BadgeProps {
  variant?: 'default' | 'in-progress' | 'complete' | 'archived'
  children: React.ReactNode
  className?: string
}

export function Badge({
  variant = 'default',
  children,
  className,
}: BadgeProps) {
  const baseStyles =
    'inline-flex items-center px-2 py-1 rounded-full font-stitch-label-caps text-stitch-label-caps uppercase tracking-wide'

  const variantStyles = {
    default:
      'bg-stitch-surface-container-high border border-stitch-parchment text-stitch-ink-black',
    'in-progress': 'gap-2 text-stitch-terra-cotta',
    complete: 'gap-2 text-stitch-ink-black',
    archived: 'gap-2 text-stitch-stone',
  }

  return (
    <span className={cn(baseStyles, variantStyles[variant], className)}>
      {variant === 'in-progress' && (
        <div className="w-2 h-2 rounded-full bg-stitch-terra-cotta" />
      )}
      {variant === 'complete' && (
        <div className="w-2 h-2 rounded-full bg-stitch-outline" />
      )}
      {variant === 'archived' && (
        <div className="w-2 h-2 rounded-full bg-stitch-stone" />
      )}
      {children}
    </span>
  )
}
