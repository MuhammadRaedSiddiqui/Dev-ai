import { cn } from '@/lib/utils'

export interface FormFieldProps {
  label: string
  labelStyle?: 'default' | 'caps'
  error?: string
  hint?: string
  required?: boolean
  children: React.ReactNode
  className?: string
}

export function FormField({
  label,
  labelStyle = 'default',
  error,
  hint,
  required,
  children,
  className,
}: FormFieldProps) {
  return (
    <div className={cn('space-y-2', className)}>
      <label
        className={cn(
          'block',
          labelStyle === 'caps'
            ? 'font-stitch-label-caps text-stitch-label-caps text-stitch-dusty-gray uppercase'
            : 'font-stitch-body-md text-stitch-body-md text-stitch-ink-black'
        )}
      >
        {label}
        {required && <span className="text-stitch-terra-cotta ml-1">*</span>}
      </label>
      {children}
      {error && (
        <p className="text-stitch-terra-cotta font-stitch-caption text-stitch-caption">
          {error}
        </p>
      )}
      {hint && !error && (
        <p className="text-stitch-stone font-stitch-caption text-stitch-caption">
          {hint}
        </p>
      )}
    </div>
  )
}
