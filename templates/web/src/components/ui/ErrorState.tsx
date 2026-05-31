import { AlertCircle } from 'lucide-react'
import { cn } from '@/utils/utils'

interface ErrorStateProps {
  title?: string
  message?: string
  className?: string
  onRetry?: () => void
}

export function ErrorState({
  title = 'Something went wrong',
  message = 'An unexpected error occurred. Please try again.',
  className,
  onRetry,
}: ErrorStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center gap-s4 py-s9 text-center', className)}>
      <AlertCircle className="h-10 w-10 text-danger" aria-hidden="true" />
      <div className="space-y-s2">
        <p className="text-base font-semibold text-text-primary">{title}</p>
        <p className="text-sm text-text-secondary">{message}</p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="rounded-md bg-action px-s4 py-s2 text-sm font-medium text-text-inverse hover:bg-action-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-action"
        >
          Try again
        </button>
      )}
    </div>
  )
}
