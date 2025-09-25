'use client'

import { cn } from '@/lib/utils'

interface ModernCardProps {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'elevated' | 'outlined'
}

export function ModernCard({ children, className, variant = 'default' }: ModernCardProps) {
  const variants = {
    default: 'bg-gray-800 border border-gray-700 shadow-sm',
    elevated: 'bg-gray-800 border border-gray-700 shadow-lg shadow-gray-900/50',
    outlined: 'bg-gray-800 border-2 border-gray-700 shadow-none'
  }

  return (
    <div className={cn(
      'rounded-2xl p-6 transition-all duration-200',
      variants[variant],
      className
    )}>
      {children}
    </div>
  )
}

interface ModernCardHeaderProps {
  children: React.ReactNode
  className?: string
}

export function ModernCardHeader({ children, className }: ModernCardHeaderProps) {
  return (
    <div className={cn('mb-2', className)}>
      {children}
    </div>
  )
}

interface ModernCardTitleProps {
  children: React.ReactNode
  className?: string
  icon?: React.ReactNode
}

export function ModernCardTitle({ children, className, icon }: ModernCardTitleProps) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      {icon && (
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-sm">
          {icon}
        </div>
      )}
      <div>
        <h3 className="text-lg font-semibold text-white">{children}</h3>
      </div>
    </div>
  )
}

interface ModernCardDescriptionProps {
  children: React.ReactNode
  className?: string
}

export function ModernCardDescription({ children, className }: ModernCardDescriptionProps) {
  return (
    <p className={cn('text-sm text-gray-300 mt-2', className)}>
      {children}
    </p>
  )
}

interface ModernCardContentProps {
  children: React.ReactNode
  className?: string
}

export function ModernCardContent({ children, className }: ModernCardContentProps) {
  return (
    <div className={cn('space-y-2', className)}>
      {children}
    </div>
  )
}
