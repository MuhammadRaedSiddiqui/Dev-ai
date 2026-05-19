import { cn } from '@/lib/utils'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  icon?: string // Material Symbol name
  iconPosition?: 'left' | 'right'
  loading?: boolean
  children?: React.ReactNode
}

export function Button({
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  loading = false,
  disabled,
  className,
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center gap-2 font-stitch-body-md text-stitch-body-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed'

  const variantStyles = {
    primary:
      'bg-stitch-ink-black text-stitch-snow-white hover:bg-stitch-graphite',
    secondary:
      'bg-transparent border border-stitch-parchment text-stitch-ink-black hover:bg-stitch-surface-container-low',
    ghost:
      'bg-transparent text-stitch-ink-black hover:bg-stitch-surface-container-low',
    danger:
      'bg-transparent border border-stitch-terra-cotta text-stitch-terra-cotta hover:bg-stitch-error-container/20',
  }

  const sizeStyles = {
    sm: 'px-4 py-2 text-stitch-body-sm rounded-stitch-DEFAULT',
    md: 'px-6 py-3 rounded-stitch-DEFAULT',
    lg: 'px-8 py-4 text-stitch-body-lg rounded-stitch-DEFAULT',
  }

  return (
    <button
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <span className="material-symbols-outlined animate-spin">
          progress_activity
        </span>
      )}
      {!loading && icon && iconPosition === 'left' && (
        <span className="material-symbols-outlined text-[20px]">{icon}</span>
      )}
      {children}
      {!loading && icon && iconPosition === 'right' && (
        <span className="material-symbols-outlined text-[20px]">{icon}</span>
      )}
    </button>
  )
}
