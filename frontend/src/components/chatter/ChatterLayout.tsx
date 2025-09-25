'use client'

import { useState } from 'react'
import { ChatterHeader } from './ChatterHeader'
import { ChatterSidebar } from './ChatterSidebar'
import { Chatter } from '@/lib/dataService'

interface ChatterLayoutProps {
  children: React.ReactNode
  activeSection: string
  onSectionChange: (section: string) => void
  chatter: Chatter
  onLogout: () => void
}

export function ChatterLayout({ 
  children, 
  activeSection, 
  onSectionChange, 
  chatter, 
  onLogout 
}: ChatterLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <ChatterHeader
        onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
        sidebarCollapsed={sidebarCollapsed}
        chatter={chatter}
        onLogout={onLogout}
        onNavigateToSection={onSectionChange}
      />

      <div className="flex">
        {/* Sidebar */}
        <ChatterSidebar
          activeSection={activeSection}
          onSectionChange={onSectionChange}
          collapsed={sidebarCollapsed}
          chatter={chatter}
        />

        {/* Main Content */}
        <main className={`flex-1 transition-all duration-300 ${
          sidebarCollapsed ? 'ml-16' : 'ml-64'
        }`}>
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
