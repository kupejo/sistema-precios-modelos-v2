'use client'

import { useState, useEffect } from 'react'
import { Chatter } from '@/lib/dataService'
import { startFileCleanup } from '@/lib/uploadService'

// Import components
import { ChatterLayout } from '@/components/chatter/ChatterLayout'
import { ChatterDashboard } from '@/components/chatter/ChatterDashboard'
import { ChatterModels } from '@/components/chatter/ChatterModels'
import { ChatterTickets } from '@/components/chatter/ChatterTickets'
import { ChatterProfile } from '@/components/chatter/ChatterProfile'
import { ChatterLogin } from '@/components/chatter/ChatterLogin'
import { ChatterHistory } from '@/components/chatter/ChatterHistory'
import { ChatterViewer } from '@/components/chatter/ChatterViewer'
import { ChatterRequests } from '@/components/chatter/ChatterRequests'
import { NewsPanel } from '@/components/chatter/NewsPanel'

export type ChatterSection = 'dashboard' | 'models' | 'tickets' | 'profile' | 'history' | 'viewer' | 'requests' | 'news'

export default function ChatterPage() {
  const [activeSection, setActiveSection] = useState<ChatterSection>('dashboard')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentChatter, setCurrentChatter] = useState<Chatter | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Verificar si hay un chatter autenticado en localStorage
    const savedChatter = localStorage.getItem('chatter_user')
    if (savedChatter) {
      try {
        const chatter = JSON.parse(savedChatter)
        setCurrentChatter(chatter)
        setIsAuthenticated(true)
      } catch (error) {
        console.error('Error parsing saved chatter:', error)
        localStorage.removeItem('chatter_user')
      }
    }
    setLoading(false)
    
    // Iniciar sistema de limpieza automática de archivos
    const stopCleanup = startFileCleanup()
    
    // Cleanup function para detener el sistema cuando el componente se desmonte
    return () => {
      stopCleanup()
    }
  }, [])

  const handleLogin = (chatter: Chatter) => {
    setCurrentChatter(chatter)
    setIsAuthenticated(true)
    localStorage.setItem('chatter_user', JSON.stringify(chatter))
  }

  const handleLogout = () => {
    setCurrentChatter(null)
    setIsAuthenticated(false)
    localStorage.removeItem('chatter_user')
    setActiveSection('dashboard') // Reset to dashboard on logout
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <p>Cargando...</p>
      </div>
    )
  }

  if (!isAuthenticated || !currentChatter) {
    return <ChatterLogin onLogin={handleLogin} />
  }

  const renderSection = () => {
    if (!currentChatter) return null

    const handleNavigateToSection = (section: string) => {
      setActiveSection(section as ChatterSection)
    }

    switch (activeSection) {
      case 'dashboard':
        return <ChatterDashboard chatter={currentChatter} onNavigateToSection={handleNavigateToSection} />
      case 'models':
        return <ChatterModels chatter={currentChatter} onNavigateToSection={handleNavigateToSection} />
      case 'tickets':
        return <ChatterTickets chatter={currentChatter} onNavigateToSection={handleNavigateToSection} />
      case 'profile':
        return <ChatterProfile chatter={currentChatter} onLogout={handleLogout} />
      case 'history':
        return <ChatterHistory chatter={currentChatter} />
      case 'viewer':
        return <ChatterViewer chatter={currentChatter} />
      case 'requests':
        return <ChatterRequests chatter={currentChatter} />
      case 'news':
        return <NewsPanel chatterId={currentChatter.id} />
      default:
        return <ChatterDashboard chatter={currentChatter} onNavigateToSection={handleNavigateToSection} />
    }
  }

    const handleSectionChange = (section: string) => {
      setActiveSection(section as ChatterSection)
    }

    return (
      <ChatterLayout
        chatter={currentChatter}
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
        onLogout={handleLogout}
      >
        {renderSection()}
      </ChatterLayout>
    )
}