'use client'

import { useState, useEffect } from 'react'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { AdminDashboard } from '@/components/admin/AdminDashboard'
import { ModelsManagement } from '@/components/admin/ModelsManagement'
import { ChattersManagement } from '@/components/admin/ChattersManagement'
import { TicketsManagement } from '@/components/admin/TicketsManagement'
import { TagsManagement } from '@/components/admin/TagsManagement'
import { NewsManagement } from '@/components/admin/NewsManagement'
import { SettingsManagement } from '@/components/admin/SettingsManagement'

export type AdminSection = 'dashboard' | 'models' | 'chatters' | 'tickets' | 'tags' | 'news' | 'settings'

export default function AdminPage() {
  const [activeSection, setActiveSection] = useState<AdminSection>('dashboard')
  const [isLoading, setIsLoading] = useState(true)
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  useEffect(() => {
    // Simular carga inicial
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Escuchar cambios en localStorage para refrescar cuando se crean nuevos modelos
  useEffect(() => {
    const handleStorageChange = () => {
      const newModelCreated = localStorage.getItem('newModelCreated')
      if (newModelCreated) {
        // Limpiar el flag y refrescar
        localStorage.removeItem('newModelCreated')
        setRefreshTrigger(prev => prev + 1)
      }
    }

    // Escuchar cambios en localStorage
    window.addEventListener('storage', handleStorageChange)
    
    // También verificar al cargar la página
    handleStorageChange()

    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Cargando panel de administración...</p>
        </div>
      </div>
    )
  }

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <AdminDashboard />
      case 'models':
        return <ModelsManagement refreshTrigger={refreshTrigger} />
      case 'chatters':
        return <ChattersManagement refreshTrigger={refreshTrigger} />
      case 'tickets':
        return <TicketsManagement refreshTrigger={refreshTrigger} />
      case 'tags':
        return <TagsManagement refreshTrigger={refreshTrigger} />
      case 'news':
        return <NewsManagement />
      case 'settings':
        return <SettingsManagement />
      default:
        return <AdminDashboard />
    }
  }

  // const handleRefresh = () => {
  //   setRefreshTrigger(prev => prev + 1)
  // }

  return (
    <AdminLayout 
      activeSection={activeSection} 
      onSectionChange={setActiveSection}
      refreshTrigger={refreshTrigger}
    >
      {renderSection()}
    </AdminLayout>
  )
}
