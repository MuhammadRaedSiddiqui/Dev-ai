import { cn } from '@/lib/utils'
import { forwardRef } from 'react'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: string // Material Symbol name
  error?: boolean
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ icon, error, className, ...props }, ref) => {
    return (
      <div className="relative">
        {icon && (
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-stitch-stone text-xl">
            {icon}
          </span>
        )}
        <input
          ref={ref}
          className={cn(
            'w-full bg-stitch-snow-white border text-stitch-ink-black font-stitch-body-md text-stitch-body-md py-3 px-3 rounded-stitch-input focus:outline-none focus:border-stitch-outline focus:ring-1 focus:ring-stitch-outline placeholder-stitch-stone transition-colors',
            icon && 'pl-10',
            error && 'border-stitch-error',
            !error && 'border-stitch-parchment',
            className
          )}
          {...props}
        />
      </div>
    )
  }
)

Input.displayName = 'Input'
