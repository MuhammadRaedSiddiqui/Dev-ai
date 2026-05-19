import { cn } from '@/lib/utils'
import Image from 'next/image'

export interface AvatarProps {
  src?: string
  alt?: string
  size?: 'sm' | 'md' | 'lg'
  fallback?: string // Icon name or initials
  className?: string
}

export function Avatar({
  src,
  alt = '',
  size = 'md',
  fallback = 'person',
  className,
}: AvatarProps) {
  const sizeStyles = {
    sm: 'w-8 h-8 text-[18px]',
    md: 'w-10 h-10 text-[20px]',
    lg: 'w-12 h-12 text-[24px]',
  }

  const baseStyles =
    'rounded-full flex items-center justify-center overflow-hidden border border-stitch-parchment'

  if (src) {
    return (
      <div className={cn(baseStyles, sizeStyles[size], className)}>
        <Image
          src={src}
          alt={alt}
          width={size === 'sm' ? 32 : size === 'md' ? 40 : 48}
          height={size === 'sm' ? 32 : size === 'md' ? 40 : 48}
          className="object-cover w-full h-full"
        />
      </div>
    )
  }

  // Check if fallback is initials (2 characters) or icon name
  const isInitials = fallback.length <= 2

  return (
    <div
      className={cn(
        baseStyles,
        sizeStyles[size],
        'bg-stitch-surface-container-high',
        className
      )}
    >
      {isInitials ? (
        <span className="font-stitch-body-sm text-stitch-body-sm text-stitch-ink-black font-medium uppercase">
          {fallback}
        </span>
      ) : (
        <span
          className={cn(
            'material-symbols-outlined text-stitch-ink-black',
            sizeStyles[size]
          )}
        >
          {fallback}
        </span>
      )}
    </div>
  )
}
