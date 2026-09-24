// src/components/ui/Badge.tsx
import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'gold' | 'green' | 'amber' | 'red' | 'neutral'
  className?: string
}

export function Badge({ children, variant = 'gold', className }: BadgeProps) {
  const variants = {
    gold: 'bg-amber-500/20 text-amber-400 border border-amber-500/30',
    green: 'bg-green-500/20 text-green-400 border border-green-500/30',
    amber: 'bg-amber-600/20 text-amber-300 border border-amber-600/30',
    red: 'bg-red-500/20 text-red-400 border border-red-500/30',
    neutral: 'bg-white/10 text-white/70 border border-white/20',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded text-xs font-medium',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
