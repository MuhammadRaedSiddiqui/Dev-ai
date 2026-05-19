import { cn } from '@/lib/utils'

interface SkeletonProps {
  className?: string
  variant?: 'text' | 'circular' | 'rectangular'
}

export function Skeleton({ className, variant = 'rectangular' }: SkeletonProps) {
  const variantStyles = {
    text: 'h-4 rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-stitch-DEFAULT',
  }

  return (
    <div
      className={cn(
        'animate-pulse bg-stitch-surface-container',
        variantStyles[variant],
        className
      )}
    />
  )
}

export function ProjectCardSkeleton() {
  return (
    <div className="bg-stitch-vellum-white border border-stitch-parchment p-stitch-gap-md flex flex-col min-h-[220px] rounded-stitch-DEFAULT">
      <div className="flex justify-between items-start mb-4">
        <Skeleton className="h-6 w-24" />
        <Skeleton variant="circular" className="w-6 h-6" />
      </div>

      <div className="mb-6 flex-grow">
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-full mb-1" />
        <Skeleton className="h-4 w-5/6" />
      </div>

      <div className="mt-auto pt-4 border-t border-stitch-parchment flex justify-between items-center">
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-4 w-24" />
      </div>
    </div>
  )
}

export function ChatMessageSkeleton({ isUser = false }: { isUser?: boolean }) {
  return (
    <div
      className={cn(
        'flex gap-stitch-gap-xs max-w-[85%]',
        isUser && 'self-end flex-row-reverse'
      )}
    >
      <Skeleton variant="circular" className="w-8 h-8 flex-shrink-0" />
      <div className="flex-1">
        <Skeleton className="h-16 w-full" />
      </div>
    </div>
  )
}

export function DashboardSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-stitch-gap-md">
      <ProjectCardSkeleton />
      <ProjectCardSkeleton />
      <ProjectCardSkeleton />
    </div>
  )
}
