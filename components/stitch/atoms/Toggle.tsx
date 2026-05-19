import { cn } from '@/lib/utils'

export interface ToggleProps {
  checked: boolean
  onChange: (checked: boolean) => void
  disabled?: boolean
  className?: string
}

export function Toggle({
  checked,
  onChange,
  disabled = false,
  className,
}: ToggleProps) {
  return (
    <label
      className={cn(
        'relative inline-flex items-center cursor-pointer',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      <input
        type="checkbox"
        className="sr-only peer"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
      />
      <div className="w-11 h-6 bg-stitch-parchment peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-stitch-snow-white after:border-stitch-parchment after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-stitch-ink-black" />
    </label>
  )
}
