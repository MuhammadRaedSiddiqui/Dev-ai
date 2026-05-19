import { cn } from '@/lib/utils'
import { Icon } from '../atoms/Icon'

export interface DomainProgressItemProps {
  label: string
  status: 'completed' | 'active' | 'pending'
  onClick?: () => void
  className?: string
}

export function DomainProgressItem({
  label,
  status,
  onClick,
  className,
}: DomainProgressItemProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex items-center gap-stitch-unit p-stitch-unit rounded-[9.6px] transition-colors w-full text-left',
        status === 'completed' &&
          'bg-stitch-surface-container-low border border-stitch-parchment',
        status === 'active' &&
          'bg-stitch-surface border-l-2 border-l-ink-black',
        status === 'pending' && 'hover:bg-stitch-surface-container-low',
        className
      )}
    >
      {status === 'completed' && (
        <Icon
          name="check_circle"
          filled
          size="md"
          className="text-stitch-terra-cotta"
        />
      )}
      {status === 'active' && (
        <Icon
          name="radio_button_unchecked"
          size="md"
          className="text-stitch-ink-black"
        />
      )}
      {status === 'pending' && (
        <Icon
          name="radio_button_unchecked"
          size="md"
          className="text-stitch-stone"
        />
      )}
      <span
        className={cn(
          'font-stitch-body-sm text-stitch-body-sm',
          status === 'completed' &&
            'text-stitch-ink-black line-through opacity-50',
          status === 'active' && 'text-stitch-ink-black font-semibold',
          status === 'pending' && 'text-stitch-stone'
        )}
      >
        {label}
      </span>
    </button>
  )
}
