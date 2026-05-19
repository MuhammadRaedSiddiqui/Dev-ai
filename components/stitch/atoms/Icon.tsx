import { cn } from '@/lib/utils'

export interface IconProps {
  name: string // Material Symbol name
  filled?: boolean
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

export function Icon({
  name,
  filled = false,
  size = 'md',
  className,
}: IconProps) {
  const sizeStyles = {
    sm: 'text-[16px]',
    md: 'text-[20px]',
    lg: 'text-[24px]',
    xl: 'text-[32px]',
  }

  return (
    <span
      className={cn('material-symbols-outlined', sizeStyles[size], className)}
      style={filled ? { fontVariationSettings: "'FILL' 1" } : undefined}
    >
      {name}
    </span>
  )
}
