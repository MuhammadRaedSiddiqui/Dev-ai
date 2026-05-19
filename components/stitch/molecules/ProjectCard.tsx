import { cn } from '@/lib/utils'
import { Badge } from '../atoms/Badge'
import { Icon } from '../atoms/Icon'

export interface ProjectCardProps {
  id: string
  name: string
  type: string
  status: 'in_progress' | 'complete' | 'archived'
  description: string
  updatedAt: string
  onOpen: (id: string) => void
  onDelete?: (id: string) => void
  className?: string
}

export function ProjectCard({
  id,
  name,
  type,
  status,
  description,
  updatedAt,
  onOpen,
  onDelete,
  className,
}: ProjectCardProps) {
  const statusVariant =
    status === 'in_progress'
      ? 'in-progress'
      : status === 'complete'
        ? 'complete'
        : 'archived'

  const statusLabel =
    status === 'in_progress'
      ? 'In Progress'
      : status === 'complete'
        ? 'Complete'
        : 'Archived'

  return (
    <article
      className={cn(
        'group bg-stitch-vellum-white border border-stitch-parchment p-stitch-gap-md flex flex-col min-h-[220px] rounded-stitch-DEFAULT hover:border-stitch-outline transition-colors duration-300 cursor-pointer',
        className
      )}
      onClick={() => onOpen(id)}
    >
      <div className="flex justify-between items-start mb-4">
        <Badge variant="default">{type}</Badge>
        {onDelete && (
          <button
            className="text-stitch-stone hover:text-stitch-ink-black transition-colors rounded-stitch-DEFAULT"
            onClick={(e) => {
              e.stopPropagation()
              onDelete(id)
            }}
          >
            <Icon name="more_horiz" />
          </button>
        )}
      </div>

      <div className="mb-6 flex-grow">
        <h3 className="font-stitch-h3 text-stitch-h3 text-stitch-ink-black mb-2">
          {name}
        </h3>
        <p className="font-stitch-body-sm text-stitch-body-sm text-stitch-stone line-clamp-2">
          {description}
        </p>
      </div>

      <div className="mt-auto pt-4 border-t border-stitch-parchment flex justify-between items-center">
        <Badge variant={statusVariant}>{statusLabel}</Badge>
        <span className="font-stitch-caption text-stitch-caption text-stitch-stone">
          {updatedAt}
        </span>
      </div>
    </article>
  )
}
