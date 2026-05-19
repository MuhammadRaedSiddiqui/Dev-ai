import { cn } from '@/lib/utils'
import { forwardRef } from 'react'

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ error, className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          'w-full bg-stitch-snow-white border text-stitch-ink-black font-stitch-body-md text-stitch-body-md py-3 px-3 rounded-stitch-input focus:outline-none focus:border-stitch-outline focus:ring-1 focus:ring-stitch-outline placeholder-stitch-stone transition-colors resize-none',
          error && 'border-stitch-error',
          !error && 'border-stitch-parchment',
          className
        )}
        {...props}
      />
    )
  }
)

Textarea.displayName = 'Textarea'
