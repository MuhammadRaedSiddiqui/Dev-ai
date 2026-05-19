import { cn } from '@/lib/utils'
import { forwardRef } from 'react'

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ error, className, children, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={cn(
          'w-full bg-stitch-snow-white border text-stitch-ink-black font-stitch-body-md text-stitch-body-md py-3 px-3 rounded-stitch-input focus:outline-none focus:border-stitch-outline focus:ring-1 focus:ring-stitch-outline appearance-none cursor-pointer transition-colors',
          error && 'border-stitch-error',
          !error && 'border-stitch-parchment',
          className
        )}
        {...props}
      >
        {children}
      </select>
    )
  }
)

Select.displayName = 'Select'
