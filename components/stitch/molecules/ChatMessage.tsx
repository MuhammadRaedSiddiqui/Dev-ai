import { cn } from '@/lib/utils'
import { Avatar } from '../atoms/Avatar'

export interface ChatMessageProps {
  role: 'user' | 'assistant'
  content: string
  timestamp?: number
  streaming?: boolean
}

export function ChatMessage({
  role,
  content,
  streaming = false,
}: ChatMessageProps) {
  const isUser = role === 'user'

  return (
    <div
      className={cn(
        'flex gap-stitch-gap-xs max-w-[85%]',
        isUser && 'self-end flex-row-reverse'
      )}
    >
      <Avatar
        size="sm"
        fallback={isUser ? 'person' : 'psychology'}
        className={cn(
          'flex-shrink-0',
          !isUser && 'bg-stitch-ink-black text-stitch-snow-white'
        )}
      />
      <div
        className={cn(
          'border p-stitch-gap-xs px-stitch-gap-md rounded-lg',
          isUser
            ? 'bg-stitch-surface-container-low border-stitch-parchment rounded-tr-none'
            : 'bg-stitch-vellum-white border-stitch-parchment rounded-tl-none'
        )}
      >
        <p className="font-stitch-body-md text-stitch-body-md text-stitch-ink-black">
          {content}
          {streaming && (
            <span className="inline-block w-[2px] h-[16px] bg-stitch-ink-black animate-blink align-middle ml-1" />
          )}
        </p>
      </div>
    </div>
  )
}
