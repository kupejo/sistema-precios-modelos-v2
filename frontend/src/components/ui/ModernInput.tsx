'use client'

import { cn } from '@/lib/utils'

interface ModernInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  variant?: 'default' | 'filled' | 'outlined'
}

export function ModernInput({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  variant = 'default',
  className,
  ...props
}: ModernInputProps) {
  const variants = {
    default: 'bg-gray-700 border border-gray-600 focus:border-blue-400 focus:ring-4 focus:ring-blue-400/10 text-white placeholder-gray-400',
    filled: 'bg-gray-600 border border-gray-500 focus:border-blue-400 focus:ring-4 focus:ring-blue-400/10 text-white placeholder-gray-400',
    outlined: 'bg-transparent border-2 border-gray-600 focus:border-blue-400 focus:ring-4 focus:ring-blue-400/10 text-white placeholder-gray-400'
  }

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-300">
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {leftIcon}
          </div>
        )}
        
        <input
          className={cn(
            'w-full px-4 py-3 rounded-xl text-white placeholder-gray-400 transition-all duration-200',
            'focus:outline-none focus:ring-0',
            leftIcon && 'pl-10',
            rightIcon && 'pr-10',
            error && 'border-red-300 focus:border-red-500 focus:ring-red-500/10',
            variants[variant],
            className
          )}
          {...props}
        />
        
        {rightIcon && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {rightIcon}
          </div>
        )}
      </div>
      
      {error && (
        <div className="flex items-center gap-2 text-xs text-red-600">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </div>
      )}
      
      {helperText && !error && (
        <p className="text-xs text-gray-400">{helperText}</p>
      )}
    </div>
  )
}

interface ModernTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  helperText?: string
  variant?: 'default' | 'filled' | 'outlined'
}

export function ModernTextarea({
  label,
  error,
  helperText,
  variant = 'default',
  className,
  ...props
}: ModernTextareaProps) {
  const variants = {
    default: 'bg-gray-700 border border-gray-600 focus:border-blue-400 focus:ring-4 focus:ring-blue-400/10 text-white placeholder-gray-400',
    filled: 'bg-gray-600 border border-gray-500 focus:border-blue-400 focus:ring-4 focus:ring-blue-400/10 text-white placeholder-gray-400',
    outlined: 'bg-transparent border-2 border-gray-600 focus:border-blue-400 focus:ring-4 focus:ring-blue-400/10 text-white placeholder-gray-400'
  }

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-300">
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <textarea
        className={cn(
          'w-full px-4 py-3 rounded-xl text-slate-900 placeholder-slate-500 transition-all duration-200 resize-none',
          'focus:outline-none focus:ring-0',
          error && 'border-red-300 focus:border-red-500 focus:ring-red-500/10',
          variants[variant],
          className
        )}
        {...props}
      />
      
      {error && (
        <div className="flex items-center gap-2 text-xs text-red-600">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </div>
      )}
      
      {helperText && !error && (
        <p className="text-xs text-gray-400">{helperText}</p>
      )}
    </div>
  )
}
