'use client'

import { cn } from '@/lib/utils'

interface ModernCheckboxProps {
  checked: boolean
  onChange: () => void
  label?: string
  className?: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'card' | 'minimal'
}

export function ModernCheckbox({ 
  checked, 
  onChange, 
  label, 
  className,
  size = 'md',
  variant = 'default'
}: ModernCheckboxProps) {
  const sizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  }

  const variants = {
    default: 'border-gray-600 hover:border-blue-400 focus:ring-blue-400/20',
    card: 'border-gray-500 hover:border-blue-300 focus:ring-blue-400/20',
    minimal: 'border-gray-500 hover:border-blue-400 focus:ring-blue-400/20'
  }

  const checkboxElement = (
    <div 
      className={cn(
        'relative flex items-center justify-center rounded-md border-2 transition-all duration-200 cursor-pointer',
        'focus:outline-none focus:ring-4',
        sizes[size],
        checked 
          ? 'bg-blue-600 border-blue-600 text-white' 
          : `bg-gray-700 ${variants[variant]}`,
        className
      )}
      onClick={onChange}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onChange()
        }
      }}
    >
      {checked && (
        <svg className="w-2 h-2" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      )}
    </div>
  )

  if (label) {
    return (
      <label className="flex items-center gap-3 cursor-pointer">
        {checkboxElement}
        <span className="text-sm text-gray-300">{label}</span>
      </label>
    )
  }

  return checkboxElement
}

interface ModernCheckboxCardProps {
  checked: boolean
  onChange: () => void
  title: string
  description?: string
  icon?: React.ReactNode
  className?: string
}

export function ModernCheckboxCard({
  checked,
  onChange,
  title,
  description,
  icon,
  className
}: ModernCheckboxCardProps) {
  return (
    <div 
      className={cn(
        'relative p-2 rounded-md border-2 transition-all duration-200 cursor-pointer group',
        checked 
          ? 'bg-blue-900/20 border-blue-600 shadow-sm' 
          : 'bg-gray-700 border-gray-600 hover:border-blue-400 hover:shadow-sm',
        className
      )}
      onClick={onChange}
    >
      <div className="flex items-start gap-2">
        <ModernCheckbox 
          checked={checked} 
          onChange={onChange}
          size="sm"
          variant="card"
        />
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1 mb-1">
            {icon && (
              <div className="text-gray-400 group-hover:text-blue-400 transition-colors">
                {icon}
              </div>
            )}
            <h4 className="text-xs font-medium text-white">{title}</h4>
          </div>
          {description && (
            <p className="text-xs text-gray-400">{description}</p>
          )}
        </div>
      </div>
    </div>
  )
}

interface ModernCheckboxGridProps {
  options: Array<{
    id: string
    label: string
    description?: string
    icon?: React.ReactNode
  }>
  selected: string[]
  onChange: (selected: string[]) => void
  className?: string
  columns?: 1 | 2 | 3 | 4
}

export function ModernCheckboxGrid({
  options,
  selected,
  onChange,
  className,
  columns = 2
}: ModernCheckboxGridProps) {
  const handleToggle = (id: string) => {
    if (selected.includes(id)) {
      onChange(selected.filter(item => item !== id))
    } else {
      onChange([...selected, id])
    }
  }

  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  }

  return (
    <div className={cn('grid gap-1', gridCols[columns], className)}>
      {options.map((option) => (
        <ModernCheckboxCard
          key={option.id}
          checked={selected.includes(option.id)}
          onChange={() => handleToggle(option.id)}
          title={option.label}
          description={option.description}
          icon={option.icon}
        />
      ))}
    </div>
  )
}
