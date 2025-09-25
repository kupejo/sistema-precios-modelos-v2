'use client'

import { cn } from '@/lib/utils'

interface CompactCheckboxProps {
  checked: boolean
  onChange: () => void
  className?: string
}

export function CompactCheckbox({ checked, onChange, className }: CompactCheckboxProps) {
  return (
    <div 
      className={cn(
        "w-2.5 h-2.5 border rounded-sm cursor-pointer transition-all duration-150",
        checked 
          ? "bg-blue-500 border-blue-500" 
          : "bg-gray-600 border-gray-400 hover:border-gray-300",
        className
      )}
      onClick={onChange}
    >
      {checked && (
        <div className="w-full h-full flex items-center justify-center">
          <i className="fas fa-check text-white text-xs leading-none"></i>
        </div>
      )}
    </div>
  )
}
