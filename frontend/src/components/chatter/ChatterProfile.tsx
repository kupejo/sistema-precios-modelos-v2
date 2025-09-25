'use client'

import { useState } from 'react'
import { ModernCard, ModernCardContent, ModernCardHeader, ModernCardTitle } from '@/components/ui/ModernCard'
import { ModernInput } from '@/components/ui/ModernInput'
import { ModernButton } from '@/components/ui/ModernButton'
import { Chatter } from '@/lib/dataService'
import { ChangePasswordModal } from './ChangePasswordModal'
import { ExportDataModal } from './ExportDataModal'
import { ContactSupportModal } from './ContactSupportModal'

interface ChatterProfileProps {
  chatter: Chatter
  onLogout: () => void
}

export function ChatterProfile({ chatter, onLogout }: ChatterProfileProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    fullname: chatter.fullname,
    email: chatter.email,
    username: chatter.username
  })
  const [showChangePassword, setShowChangePassword] = useState(false)
  const [showExportData, setShowExportData] = useState(false)
  const [showContactSupport, setShowContactSupport] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSave = async () => {
    try {
      setLoading(true)
      
      // Aquí harías la llamada a la API para actualizar el perfil
      console.log('Actualizando perfil:', formData)
      
      // Simular actualización
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setIsEditing(false)
      
    } catch (error) {
      console.error('Error actualizando perfil:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    setFormData({
      fullname: chatter.fullname,
      email: chatter.email,
      username: chatter.username
    })
    setIsEditing(false)
  }

  const handleChangePassword = () => {
    setShowChangePassword(true)
  }

  const handleExportData = () => {
    setShowExportData(true)
  }

  const handleContactSupport = () => {
    setShowContactSupport(true)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">Mi Perfil</h1>
        <p className="text-gray-400">Gestiona tu información personal y configuración</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Info */}
        <div className="lg:col-span-2 space-y-6">
          <ModernCard variant="elevated">
            <ModernCardHeader>
              <div className="flex items-center justify-between">
                <ModernCardTitle icon={
                  <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                }>
                  Información Personal
                </ModernCardTitle>
                {!isEditing && (
                  <ModernButton
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditing(true)}
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Editar
                  </ModernButton>
                )}
              </div>
            </ModernCardHeader>
            
            <ModernCardContent className="space-y-4">
              <ModernInput
                label="Nombre Completo"
                value={formData.fullname}
                onChange={(e) => setFormData(prev => ({ ...prev, fullname: e.target.value }))}
                disabled={!isEditing}
                variant={isEditing ? 'default' : 'filled'}
              />

              <ModernInput
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                disabled={!isEditing}
                variant={isEditing ? 'default' : 'filled'}
              />

              <ModernInput
                label="Nombre de Usuario"
                value={formData.username}
                onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                disabled={true} // El username no se puede cambiar
                variant="filled"
                helperText="El nombre de usuario no se puede modificar"
              />

              {isEditing && (
                <div className="flex gap-3 pt-4">
                  <ModernButton
                    variant="primary"
                    onClick={handleSave}
                    loading={loading}
                    disabled={loading}
                  >
                    Guardar Cambios
                  </ModernButton>
                  <ModernButton
                    variant="secondary"
                    onClick={handleCancel}
                    disabled={loading}
                  >
                    Cancelar
                  </ModernButton>
                </div>
              )}
            </ModernCardContent>
          </ModernCard>

          {/* Account Stats */}
          <ModernCard variant="elevated">
            <ModernCardHeader>
              <ModernCardTitle icon={
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              }>
                Estadísticas de Cuenta
              </ModernCardTitle>
            </ModernCardHeader>
            
            <ModernCardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white mb-1">
                    {chatter.model_ids.length}
                  </div>
                  <div className="text-sm text-gray-400">Modelos Asignados</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white mb-1">
                    {new Date(chatter.created_at).toLocaleDateString()}
                  </div>
                  <div className="text-sm text-gray-400">Miembro Desde</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white mb-1">
                    {chatter.is_active ? 'Activo' : 'Inactivo'}
                  </div>
                  <div className="text-sm text-gray-400">Estado de Cuenta</div>
                </div>
              </div>
            </ModernCardContent>
          </ModernCard>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Profile Picture */}
          <ModernCard variant="elevated">
            <ModernCardContent className="text-center p-6">
              <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">
                  {chatter.fullname.charAt(0).toUpperCase()}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-1">{chatter.fullname}</h3>
              <p className="text-sm text-gray-400">@{chatter.username}</p>
              <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs mt-2 ${
                chatter.is_active 
                  ? 'bg-green-500/20 text-green-400' 
                  : 'bg-red-500/20 text-red-400'
              }`}>
                <div className={`w-2 h-2 rounded-full ${
                  chatter.is_active ? 'bg-green-400' : 'bg-red-400'
                }`}></div>
                {chatter.is_active ? 'Activo' : 'Inactivo'}
              </div>
            </ModernCardContent>
          </ModernCard>

          {/* Quick Actions */}
          <ModernCard variant="elevated">
            <ModernCardHeader>
              <ModernCardTitle icon={
                <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              }>
                Acciones Rápidas
              </ModernCardTitle>
            </ModernCardHeader>
            
            <ModernCardContent className="space-y-3">
              <ModernButton
                variant="outline"
                size="sm"
                className="w-full justify-start"
                onClick={handleChangePassword}
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Cambiar Contraseña
              </ModernButton>
              
              <ModernButton
                variant="outline"
                size="sm"
                className="w-full justify-start"
                onClick={handleExportData}
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Exportar Datos
              </ModernButton>
              
              <ModernButton
                variant="outline"
                size="sm"
                className="w-full justify-start"
                onClick={handleContactSupport}
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z" />
                </svg>
                Contactar Soporte
              </ModernButton>
            </ModernCardContent>
          </ModernCard>

          {/* Danger Zone */}
          <ModernCard variant="outlined" className="border-red-500/30">
            <ModernCardHeader>
              <ModernCardTitle icon={
                <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              }>
                Zona de Peligro
              </ModernCardTitle>
            </ModernCardHeader>
            
            <ModernCardContent>
              <p className="text-sm text-gray-400 mb-4">
                Estas acciones son permanentes y no se pueden deshacer.
              </p>
              
              <ModernButton
                variant="outline"
                size="sm"
                className="w-full text-red-400 border-red-500/30 hover:bg-red-500/10"
                onClick={onLogout}
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Cerrar Sesión
              </ModernButton>
            </ModernCardContent>
          </ModernCard>
        </div>
      </div>

      {/* Modales */}
      {showChangePassword && (
        <ChangePasswordModal
          onClose={() => setShowChangePassword(false)}
          onSuccess={() => {
            setShowChangePassword(false)
            // Aquí podrías mostrar un mensaje de éxito
          }}
        />
      )}

      {showExportData && (
        <ExportDataModal
          chatter={chatter}
          onClose={() => setShowExportData(false)}
        />
      )}

      {showContactSupport && (
        <ContactSupportModal
          chatter={chatter}
          onClose={() => setShowContactSupport(false)}
          onSuccess={() => {
            setShowContactSupport(false)
            // Aquí podrías mostrar un mensaje de éxito
          }}
        />
      )}
    </div>
  )
}
