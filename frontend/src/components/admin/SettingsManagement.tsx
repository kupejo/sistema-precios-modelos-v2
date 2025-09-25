'use client'

import { useState, useEffect } from 'react'
import { ModernCard, ModernCardContent, ModernCardHeader, ModernCardTitle } from '@/components/ui/ModernCard'
import { ModernButton } from '@/components/ui/ModernButton'
import { getSystemSettings, updateSystemSettings, SystemSettings } from '@/lib/dataService'

export function SettingsManagement() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [settings, setSettings] = useState<SystemSettings>({
    systemName: '',
    systemDescription: '',
    emailNotifications: false,
    pushNotifications: false,
    sessionTimeout: 60,
    twoFactorAuth: false
  })

  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = async () => {
    try {
      setLoading(true)
      const settingsData = await getSystemSettings()
      setSettings(settingsData)
    } catch (error) {
      console.error('Error cargando configuración:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSaveGeneral = async () => {
    try {
      setSaving(true)
      await updateSystemSettings({
        systemName: settings.systemName,
        systemDescription: settings.systemDescription
      })
      alert('Configuración general guardada exitosamente')
    } catch (error) {
      console.error('Error guardando configuración:', error)
      alert('Error al guardar la configuración')
    } finally {
      setSaving(false)
    }
  }

  const handleSaveNotifications = async () => {
    try {
      setSaving(true)
      await updateSystemSettings({
        emailNotifications: settings.emailNotifications,
        pushNotifications: settings.pushNotifications
      })
      alert('Configuración de notificaciones guardada exitosamente')
    } catch (error) {
      console.error('Error guardando configuración:', error)
      alert('Error al guardar la configuración')
    } finally {
      setSaving(false)
    }
  }

  const handleSaveSecurity = async () => {
    try {
      setSaving(true)
      await updateSystemSettings({
        sessionTimeout: settings.sessionTimeout,
        twoFactorAuth: settings.twoFactorAuth
      })
      alert('Configuración de seguridad guardada exitosamente')
    } catch (error) {
      console.error('Error guardando configuración:', error)
      alert('Error al guardar la configuración')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Configuración del Sistema</h1>
          <p className="text-gray-400">Administra la configuración general</p>
        </div>
        
        <div className="animate-pulse">
          <div className="h-64 bg-gray-800 rounded-lg"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">Configuración del Sistema</h1>
        <p className="text-gray-400">Administra la configuración general del sistema</p>
      </div>

      {/* Settings Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ModernCard>
          <ModernCardHeader>
            <ModernCardTitle>Configuración General</ModernCardTitle>
          </ModernCardHeader>
          <ModernCardContent>
            <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Nombre del Sistema
                    </label>
                    <input
                      type="text"
                      value={settings.systemName}
                      onChange={(e) => setSettings((prev: SystemSettings) => ({ ...prev, systemName: e.target.value }))}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Descripción
                    </label>
                    <textarea
                      rows={3}
                      value={settings.systemDescription}
                      onChange={(e) => setSettings((prev: SystemSettings) => ({ ...prev, systemDescription: e.target.value }))}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>

                  <ModernButton 
                    variant="primary"
                    onClick={handleSaveGeneral}
                    disabled={saving}
                  >
                    {saving ? 'Guardando...' : 'Guardar Configuración'}
                  </ModernButton>
            </div>
          </ModernCardContent>
        </ModernCard>

        <ModernCard>
          <ModernCardHeader>
            <ModernCardTitle>Configuración de Notificaciones</ModernCardTitle>
          </ModernCardHeader>
          <ModernCardContent>
            <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-white">Notificaciones por Email</p>
                      <p className="text-xs text-gray-400">Recibir notificaciones por correo electrónico</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={settings.emailNotifications}
                        onChange={(e) => setSettings((prev: SystemSettings) => ({ ...prev, emailNotifications: e.target.checked }))}
                        className="sr-only peer" 
                      />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-white">Notificaciones Push</p>
                      <p className="text-xs text-gray-400">Recibir notificaciones en tiempo real</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={settings.pushNotifications}
                        onChange={(e) => setSettings((prev: SystemSettings) => ({ ...prev, pushNotifications: e.target.checked }))}
                        className="sr-only peer" 
                      />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <ModernButton 
                    variant="primary"
                    onClick={handleSaveNotifications}
                    disabled={saving}
                  >
                    {saving ? 'Guardando...' : 'Guardar Preferencias'}
                  </ModernButton>
            </div>
          </ModernCardContent>
        </ModernCard>

        <ModernCard>
          <ModernCardHeader>
            <ModernCardTitle>Configuración de Seguridad</ModernCardTitle>
          </ModernCardHeader>
          <ModernCardContent>
            <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Tiempo de Sesión (minutos)
                    </label>
                    <input
                      type="number"
                      value={settings.sessionTimeout}
                      onChange={(e) => setSettings((prev: SystemSettings) => ({ ...prev, sessionTimeout: parseInt(e.target.value) || 60 }))}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-white">Autenticación de Dos Factores</p>
                      <p className="text-xs text-gray-400">Requiere código adicional para acceder</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={settings.twoFactorAuth}
                        onChange={(e) => setSettings((prev: SystemSettings) => ({ ...prev, twoFactorAuth: e.target.checked }))}
                        className="sr-only peer" 
                      />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <ModernButton 
                    variant="primary"
                    onClick={handleSaveSecurity}
                    disabled={saving}
                  >
                    {saving ? 'Guardando...' : 'Actualizar Seguridad'}
                  </ModernButton>
            </div>
          </ModernCardContent>
        </ModernCard>

        <ModernCard>
          <ModernCardHeader>
            <ModernCardTitle>Información del Sistema</ModernCardTitle>
          </ModernCardHeader>
          <ModernCardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-gray-700">
                <span className="text-sm text-gray-400">Versión</span>
                <span className="text-sm text-white">v1.0.0</span>
              </div>
              
              <div className="flex justify-between items-center py-2 border-b border-gray-700">
                <span className="text-sm text-gray-400">Última Actualización</span>
                <span className="text-sm text-white">2024-01-15</span>
              </div>
              
              <div className="flex justify-between items-center py-2 border-b border-gray-700">
                <span className="text-sm text-gray-400">Uptime</span>
                <span className="text-sm text-white">99.9%</span>
              </div>
              
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-gray-400">Base de Datos</span>
                <span className="text-sm text-green-400">Conectada</span>
              </div>
            </div>
          </ModernCardContent>
        </ModernCard>
      </div>
    </div>
  )
}

