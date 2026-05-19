'use client'

import { createContext, useContext, useState, useCallback } from 'react'
import { Icon } from '../atoms/Icon'
import { Button } from '../atoms/Button'
import { cn } from '@/lib/utils'

interface Toast {
  id: string
  message: string
  type: 'success' | 'error' | 'info' | 'warning'
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
}

interface ToastContextType {
  toasts: Toast[]
  showToast: (toast: Omit<Toast, 'id'>) => void
  hideToast: (id: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const showToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substring(7)
    const newToast = { ...toast, id }

    setToasts((prev) => [...prev, newToast])

    // Auto-dismiss after duration (default 5s)
    const duration = toast.duration ?? 5000
    if (duration > 0) {
      setTimeout(() => {
        hideToast(id)
      }, duration)
    }
  }, [])

  const hideToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ toasts, showToast, hideToast }}>
      {children}
      <ToastContainer toasts={toasts} onClose={hideToast} />
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within ToastProvider')
  }
  return context
}

function ToastContainer({
  toasts,
  onClose,
}: {
  toasts: Toast[]
  onClose: (id: string) => void
}) {
  if (toasts.length === 0) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-md">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onClose={onClose} />
      ))}
    </div>
  )
}

function ToastItem({
  toast,
  onClose,
}: {
  toast: Toast
  onClose: (id: string) => void
}) {
  const typeStyles = {
    success: 'bg-stitch-surface border-stitch-outline',
    error: 'bg-stitch-error-container border-stitch-terra-cotta',
    info: 'bg-stitch-surface-container-low border-stitch-outline',
    warning: 'bg-stitch-secondary-fixed border-stitch-terra-cotta',
  }

  const iconNames = {
    success: 'check_circle',
    error: 'error',
    info: 'info',
    warning: 'warning',
  }

  const iconColors = {
    success: 'text-stitch-ink-black',
    error: 'text-stitch-terra-cotta',
    info: 'text-stitch-stone',
    warning: 'text-stitch-terra-cotta',
  }

  return (
    <div
      className={cn(
        'flex items-start gap-3 p-4 border rounded-stitch-DEFAULT shadow-lg animate-in slide-in-from-right',
        typeStyles[toast.type]
      )}
    >
      <Icon
        name={iconNames[toast.type]}
        filled
        size="md"
        className={cn('mt-0.5', iconColors[toast.type])}
      />
      <div className="flex-1 min-w-0">
        <p className="font-stitch-body-sm text-stitch-body-sm text-stitch-ink-black">
          {toast.message}
        </p>
        {toast.action && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              toast.action?.onClick()
              onClose(toast.id)
            }}
            className="mt-2 -ml-2"
          >
            {toast.action.label}
          </Button>
        )}
      </div>
      <button
        onClick={() => onClose(toast.id)}
        className="text-stitch-stone hover:text-stitch-ink-black transition-colors"
      >
        <Icon name="close" size="sm" />
      </button>
    </div>
  )
}
