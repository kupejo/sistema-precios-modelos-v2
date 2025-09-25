'use client'

import { useState } from 'react'
import { ModernCard, ModernCardContent, ModernCardHeader, ModernCardTitle } from '@/components/ui/ModernCard'
import { ModernInput } from '@/components/ui/ModernInput'
import { ModernButton } from '@/components/ui/ModernButton'
import { Chatter, getChatters } from '@/lib/dataService'

interface ChatterLoginProps {
  onLogin: (chatter: Chatter) => void
}

export function ChatterLogin({ onLogin }: ChatterLoginProps) {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      console.log('🔍 ChatterLogin - Intentando login con:', formData.username)
      
      // Obtener todos los chatters del sistema
      const chatters = await getChatters()
      console.log('🔍 ChatterLogin - Chatters disponibles:', chatters)
      
      // Buscar el chatter por username
      const chatter = chatters.find(c => 
        c.username.toLowerCase() === formData.username.toLowerCase() && 
        c.is_active === true
      )
      
      console.log('🔍 ChatterLogin - Chatter encontrado:', chatter)
      
      if (chatter) {
        // Validar contraseña (en un sistema real aquí se haría hash comparison)
        if (chatter.password === formData.password) {
          console.log('🔍 ChatterLogin - Login exitoso para:', chatter.username)
          onLogin(chatter)
        } else {
          console.log('🔍 ChatterLogin - Contraseña incorrecta')
          setError('Contraseña incorrecta')
        }
      } else {
        console.log('🔍 ChatterLogin - Usuario no encontrado o inactivo')
        setError('Usuario no encontrado o cuenta inactiva')
      }
    } catch (error) {
      console.error('Error en login:', error)
      setError('Error al iniciar sesión. Intenta de nuevo.')
    }
    
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <ModernCard variant="elevated">
          <ModernCardHeader>
            <ModernCardTitle icon={
              <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            }>
              Iniciar Sesión - Chatter
            </ModernCardTitle>
          </ModernCardHeader>
          
          <ModernCardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg">
                  <p className="text-sm text-red-400">{error}</p>
                </div>
              )}

              <ModernInput
                label="Nombre de Usuario"
                value={formData.username}
                onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                placeholder="Ingresa tu usuario"
                leftIcon={
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                }
                required
              />

              <ModernInput
                label="Contraseña"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                placeholder="Ingresa tu contraseña"
                leftIcon={
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                }
                required
              />

              <ModernButton
                type="submit"
                variant="primary"
                size="lg"
                loading={loading}
                disabled={loading}
                className="w-full"
              >
                {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
              </ModernButton>
            </form>

            <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <h4 className="text-sm font-medium text-blue-400 mb-3 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Información de Login
              </h4>
              <div className="space-y-2">
                <p className="text-xs text-gray-400">
                  Usa las credenciales del chatter que creaste en el panel de admin.
                </p>
                <p className="text-xs text-gray-400">
                  El chatter debe estar activo para poder hacer login.
                </p>
              </div>
              <p className="text-xs text-gray-500 mt-3">
                Si no tienes un chatter creado, ve al panel de admin → Gestión de Chatters → Crear Chatter.
              </p>
            </div>
          </ModernCardContent>
        </ModernCard>
      </div>
    </div>
  )
}
